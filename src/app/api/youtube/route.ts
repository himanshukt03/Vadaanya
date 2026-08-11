import { NextResponse } from "next/server";

const CHANNEL_ID = "UCGmVXFI9vYfoiJojRE_kC5A";
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export interface YouTubeVideoItem {
  id: string;
  videoId: string;
  title: string;
  description: string;
  published: string;
  thumbnail: string;
}

function decodeXmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export async function GET() {
  try {
    const res = await fetch(RSS_URL, {
      headers: {
        // YouTube requires a browser-like User-Agent for RSS feeds
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      console.error(`YouTube RSS fetch failed: ${res.status} ${res.statusText}`);
      return NextResponse.json(
        { error: `RSS feed returned ${res.status}`, videos: [] },
        { status: 502 }
      );
    }

    const xml = await res.text();
    const entries: YouTubeVideoItem[] = [];
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;

    while ((match = entryRegex.exec(xml)) !== null) {
      const block = match[1];

      const videoIdMatch = block.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
      const titleMatch   = block.match(/<title>(.*?)<\/title>/);
      const descMatch    = block.match(/<media:description>([\s\S]*?)<\/media:description>/);
      const pubMatch     = block.match(/<published>(.*?)<\/published>/);
      const thumbMatch   = block.match(/<media:thumbnail[^>]+url="([^"]+)"/);

      if (!videoIdMatch || !titleMatch) continue;

      const videoId     = videoIdMatch[1].trim();
      const title       = decodeXmlEntities(titleMatch[1].trim());
      const description = descMatch ? decodeXmlEntities(descMatch[1].trim()) : "";
      const published   = pubMatch  ? pubMatch[1].trim() : "";
      // Prefer the RSS-provided thumbnail (higher quality), fall back to img.youtube.com
      const thumbnail   = thumbMatch
        ? thumbMatch[1]
        : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

      // Skip Shorts
      const lc = (title + " " + description).toLowerCase();
      if (lc.includes("#shorts") || lc.includes("#short")) continue;

      entries.push({ id: videoId, videoId, title, description, published, thumbnail });

      // Stop after 8 usable videos
      if (entries.length >= 8) break;
    }

    return NextResponse.json({ videos: entries });
  } catch (error) {
    console.error("YouTube RSS API error:", error);
    return NextResponse.json({ error: "Internal Server Error", videos: [] }, { status: 500 });
  }
}
