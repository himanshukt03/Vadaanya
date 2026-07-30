import { videos as fallbackVideos } from "@/data/vadaanya/VideosData";
import VideoGalleryClient, { VideoData } from "./VideoGalleryClient";

async function getLatestVideos(): Promise<VideoData[]> {
  try {
    const channelId = "UCGmVXFI9vYfoiJojRE_kC5A";
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

    const res = await fetch(rssUrl, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn("Failed to fetch YouTube RSS, using fallback videos");
      return fallbackVideos.map(v => ({ ...v, id: String(v.id) }));
    }

    const xml = await res.text();
    const entries: VideoData[] = [];
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;

    while ((match = entryRegex.exec(xml)) !== null && entries.length < 6) {
      const entryContent = match[1];
      const videoIdMatch = entryContent.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
      const titleMatch = entryContent.match(/<title>(.*?)<\/title>/);
      const descMatch = entryContent.match(/<media:description>([\s\S]*?)<\/media:description>/);
      const pubMatch = entryContent.match(/<published>(.*?)<\/published>/);

      if (videoIdMatch && titleMatch) {
        const title = titleMatch[1];
        const description = descMatch ? descMatch[1].trim() : "";
        
        // Skip likely shorts
        const isShort = title.toLowerCase().includes("#shorts") || description.toLowerCase().includes("#shorts");
        
        if (!isShort) {
          entries.push({
            id: videoIdMatch[1],
            videoId: videoIdMatch[1],
            title: title,
            description: description,
            published: pubMatch ? pubMatch[1] : "",
          });
        }
      }
    }

    // If all were shorts and we got 0, fallback.
    return entries.length > 0 ? entries.slice(0, 6) : fallbackVideos.map(v => ({ ...v, id: String(v.id) }));
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return fallbackVideos.map(v => ({ ...v, id: String(v.id) }));
  }
}

export default async function VideoGallery() {
  const latestVideos = await getLatestVideos();

  return (
    <section id="videos" className="vad-section vad-section--paper">
      <div className="vad-container">
        <div className="vad-head vad-head--center vad-head--light">
          <span className="vad-eyebrow vad-eyebrow--dark">Media</span>
          <h2>
            Watch Our{" "}
            <span style={{ color: "var(--vad-navy-700)" }}>Story Unfold</span>
          </h2>
          <p className="vad-lead">
            Events, testimonials, government recognition, and community moments — all captured in these films.
          </p>
        </div>

        <VideoGalleryClient videos={latestVideos} />
      </div>
    </section>
  );
}
