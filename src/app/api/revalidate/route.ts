import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;

    // Verify Sanity webhook signature if secret is provided
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      req,
      secret,
      true // Delay slightly so Sanity CDN finishes processing
    );

    if (secret && !isValidSignature) {
      return new Response("Invalid webhook signature", { status: 401 });
    }

    // Instantly purge cache for root layout and all pages
    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: body?._type || "unknown",
    });
  } catch (err) {
    return new Response((err as Error).message, { status: 500 });
  }
}
