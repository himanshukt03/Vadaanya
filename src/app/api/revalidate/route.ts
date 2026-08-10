import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

const REVALIDATE_TYPES = [
  "heroSlide",
  "newsArticle",
  "galleryEvent",
  "printMediaCollection",
  "successStory",
];

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;

    if (secret) {
      const { isValidSignature, body } = await parseBody<{ _type?: string }>(
        req,
        secret,
        true
      );
      if (!isValidSignature) {
        return new Response("Invalid webhook signature", { status: 401 });
      }
      revalidatePath("/", "layout");
      if (body?._type && (REVALIDATE_TYPES.includes(body._type) || body._type === "newsArticle" || body._type === "galleryEvent" || body._type === "printMediaCollection" || body._type === "successStory")) {
        revalidatePath("/gallery", "page");
        revalidatePath("/success-stories", "page");
      }
      return NextResponse.json({
        revalidated: true,
        now: Date.now(),
        type: body?._type || "unknown",
      });
    }

    // Failsafe: If no secret is configured in env variables, revalidate cache directly
    revalidatePath("/", "layout");
    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: "Cache purged without secret verification",
    });
  } catch (err) {
    // Secondary Failsafe: Purge cache even if payload parsing had a warning
    try {
      revalidatePath("/", "layout");
    } catch (_) {}
    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      error: (err as Error).message,
    });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "Revalidate webhook endpoint active",
    timestamp: new Date().toISOString(),
  });
}
