import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

const REVALIDATE_TYPES = [
  "heroSlide",
  "newsArticle",
  "galleryEvent",
  "printMediaCollection",
  "campaignPoster",
  "successStory",
  "talentTestPage",
];

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;

    if (!secret) {
      return new Response("Webhook secret not configured", { status: 500 });
    }

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

    if (body?._type === "talentTestPage") {
      revalidatePath("/talent-test", "page");
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: body?._type || "unknown",
    });
  } catch (err) {
    return NextResponse.json(
      {
        revalidated: false,
        now: Date.now(),
        error: (err as Error).message,
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "Revalidate webhook endpoint active",
    timestamp: new Date().toISOString(),
  });
}
