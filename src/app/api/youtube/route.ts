import { NextResponse } from "next/server";

export interface YouTubeVideoItem {
  id: string;
  videoId: string;
  title: string;
  description: string;
  published: string;
}

export async function GET() {
  try {
    const channelId = "UCGmVXFI9vYfoiJojRE_kC5A";
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

    const res = await fetch(rssUrl, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch RSS" }, { status: 500 });
    }

    const xml = await res.text();
    const entries: YouTubeVideoItem[] = [];
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;

    while ((match = entryRegex.exec(xml)) !== null) {
      const entryContent = match[1];
      const videoIdMatch = entryContent.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
      const titleMatch = entryContent.match(/<title>(.*?)<\/title>/);
      const descMatch = entryContent.match(/<media:description>([\s\S]*?)<\/media:description>/);
      const pubMatch = entryContent.match(/<published>(.*?)<\/published>/);

      if (videoIdMatch && titleMatch) {
        const title = titleMatch[1].replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
        const description = descMatch ? descMatch[1].trim().replace(/&amp;/g, "&") : "";

        entries.push({
          id: videoIdMatch[1],
          videoId: videoIdMatch[1],
          title: title,
          description: description,
          published: pubMatch ? pubMatch[1] : "",
        });
      }
    }

    return NextResponse.json({ videos: entries });
  } catch (error) {
    console.error("YouTube RSS API route error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
