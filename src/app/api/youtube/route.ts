import { NextResponse } from "next/server";

const CHANNEL_HANDLE = "vadaanyajanaasociety9272";
const CHANNEL_URL = `https://www.youtube.com/@${CHANNEL_HANDLE}/videos`;

export interface YouTubeVideoItem {
  id: string;
  videoId: string;
  title: string;
  description: string;
  published: string;
  thumbnail: string;
}

export async function GET() {
  try {
    // Fetch the channel's /videos page — YouTube embeds all video data in ytInitialData
    const res = await fetch(CHANNEL_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`Channel page fetch failed: ${res.status}`);
      return NextResponse.json({ videos: [] }, { status: 502 });
    }

    const html = await res.text();

    // Extract ytInitialData JSON blob
    const marker = "var ytInitialData = ";
    const start = html.indexOf(marker);
    if (start === -1) {
      console.error("ytInitialData not found in page");
      return NextResponse.json({ videos: [] }, { status: 502 });
    }

    // Find the end of the JSON object
    let depth = 0;
    let inString = false;
    let escape = false;
    let jsonEnd = -1;
    const jsonStart = start + marker.length;

    for (let i = jsonStart; i < html.length; i++) {
      const ch = html[i];
      if (escape) { escape = false; continue; }
      if (ch === "\\" && inString) { escape = true; continue; }
      if (ch === '"') { inString = !inString; continue; }
      if (inString) continue;
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) { jsonEnd = i + 1; break; }
      }
    }

    if (jsonEnd === -1) {
      console.error("Failed to find end of ytInitialData JSON");
      return NextResponse.json({ videos: [] }, { status: 502 });
    }

    const ytData = JSON.parse(html.slice(jsonStart, jsonEnd));

    // Navigate to the video grid — structure varies but this path is stable
    const tabs: unknown[] =
      ytData?.contents?.twoColumnBrowseResultsRenderer?.tabs ?? [];

    let videoItems: unknown[] = [];

    for (const tab of tabs) {
      const tabRenderer = (tab as Record<string, unknown>)?.tabRenderer as Record<string, unknown> | undefined;
      if (!tabRenderer) continue;

      const title = (tabRenderer.title as string | undefined)?.toLowerCase();
      if (title !== "videos" && title !== "home") continue;

      // Try videos tab content
      const content = tabRenderer.content as Record<string, unknown> | undefined;
      const richGrid = content?.richGridRenderer as Record<string, unknown> | undefined;
      if (richGrid?.contents) {
        videoItems = richGrid.contents as unknown[];
        break;
      }

      // Try section list renderer (home tab)
      const sectionList = content?.sectionListRenderer as Record<string, unknown> | undefined;
      const sections = (sectionList?.contents as unknown[]) ?? [];
      for (const section of sections) {
        const items =
          (section as Record<string, unknown>)?.itemSectionRenderer
          ?? (section as Record<string, unknown>)?.shelfRenderer;
        if (items) {
          const inner = (items as Record<string, unknown>)?.contents as unknown[] ?? [];
          if (inner.length > 0) { videoItems = inner; break; }
        }
      }
      if (videoItems.length) break;
    }

    const videos: YouTubeVideoItem[] = [];

    for (const item of videoItems) {
      if (videos.length >= 8) break;

      const it = item as Record<string, unknown>;
      const richItem = it?.richItemRenderer as Record<string, unknown> | undefined;
      const content = richItem?.content as Record<string, unknown> | undefined;

      let videoId: string | undefined;
      let title = "";
      let thumbnail = "";
      let published = "";
      let description = "";

      // --- NEW: lockupViewModel (current YouTube desktop layout) ---
      const lvm = content?.lockupViewModel as Record<string, unknown> | undefined;
      if (lvm) {
        const lvmAny = lvm as any;
        videoId = lvmAny?.rendererContext?.commandContext?.onTap?.innertubeCommand?.watchEndpoint?.videoId as string | undefined;

        if (!videoId) continue;

        const meta = (lvm.metadata as Record<string, unknown>)
          ?.lockupMetadataViewModel as Record<string, unknown> | undefined;
        const metaAny = meta as any;

        title = metaAny?.title?.content as string || "";

        // Thumbnails from new sources array
        const thumbSources = (lvm as any)?.contentImage?.thumbnailViewModel?.image;
        const sources = (thumbSources?.sources as { url: string; width: number }[]) ?? [];
        thumbnail =
          sources.find((t) => t.width >= 480)?.url ||
          sources[sources.length - 1]?.url ||
          `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

        // Published text from metadata rows
        const metadataRows = metaAny?.metadata?.contentMetadataViewModel?.metadataRows as Array<Record<string, unknown>> | undefined;
        for (const row of metadataRows ?? []) {
          const parts = (row?.metadataParts as Array<Record<string, unknown>>) ?? [];
          for (const part of parts) {
            const text = (part?.text as Record<string, unknown>)?.content as string;
            if (text && /\b(ago|day|week|month|year|hour|minute|today|yesterday)\b/i.test(text)) {
              published = text;
            }
          }
        }
      }
      // --- LEGACY: videoRenderer (older YouTube layout) ---
      else {
        const videoRenderer =
          content?.videoRenderer ?? it?.videoRenderer;
        if (!videoRenderer) continue;

        const vr = videoRenderer as Record<string, unknown>;
        videoId = vr.videoId as string | undefined;
        if (!videoId) continue;

        const titleRuns = ((vr.title as Record<string, unknown>)?.runs as { text: string }[]) ?? [];
        title = titleRuns.map((r) => r.text).join("") ||
          ((vr.title as Record<string, unknown>)?.simpleText as string) ||
          "";

        const thumbList =
          ((vr.thumbnail as Record<string, unknown>)?.thumbnails as { url: string; width: number }[]) ?? [];
        thumbnail =
          thumbList.find((t) => t.width >= 480)?.url ||
          thumbList[thumbList.length - 1]?.url ||
          `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

        published =
          ((vr.publishedTimeText as Record<string, unknown>)?.simpleText as string) ?? "";

        const descRuns =
          ((vr.descriptionSnippet as Record<string, unknown>)?.runs as { text: string }[]) ?? [];
        description = descRuns.map((r) => r.text).join("");
      }

      if (!title) continue;

      videos.push({
        id: videoId,
        videoId,
        title,
        description,
        published,
        thumbnail,
      });
    }

    return NextResponse.json({ videos });
  } catch (error) {
    console.error("YouTube scrape error:", error);
    return NextResponse.json({ videos: [], error: String(error) }, { status: 500 });
  }
}
