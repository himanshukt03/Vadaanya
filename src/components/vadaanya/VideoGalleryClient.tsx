"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export interface VideoData {
  id: string;
  videoId: string;
  title: string;
  description: string;
  published?: string;
  thumbnail?: string;
}

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: "18px", height: "18px", fill: "#ffffff" }}>
    <polygon points="6 4 18 12 6 20 6 4" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: "32px", height: "32px" }}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" fill="#FF0000" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#ffffff" />
  </svg>
);

const VideoSkeletonGrid = () => (
  <div className="vad-media-grid" style={{ marginBottom: "36px" }}>
    {Array.from({ length: 8 }).map((_, idx) => (
      <div
        key={idx}
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
          border: "1px solid rgba(0,0,0,0.06)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="vad-skeleton-shimmer" style={{ width: "100%", height: "150px" }} />
        <div style={{ padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
          <div className="vad-skeleton-shimmer" style={{ width: "85%", height: "18px", borderRadius: "6px" }} />
          <div className="vad-skeleton-shimmer" style={{ width: "100%", height: "14px", borderRadius: "4px" }} />
          <div className="vad-skeleton-shimmer" style={{ width: "60%", height: "14px", borderRadius: "4px" }} />
        </div>
      </div>
    ))}
  </div>
);

const EmptyState = () => (
  <div
    style={{
      textAlign: "center",
      padding: "60px 20px",
      color: "var(--vad-ink-soft)",
      marginBottom: "36px",
    }}
  >
    <YouTubeIcon />
    <p style={{ marginTop: "16px", fontSize: "15px" }}>
      Could not load videos right now.{" "}
      <a
        href="https://www.youtube.com/@vadaanyajanaasociety9272"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "var(--vad-navy-700)", fontWeight: 600 }}
      >
        Visit our YouTube channel
      </a>{" "}
      to watch the latest.
    </p>
  </div>
);

export default function VideoGalleryClient() {
  const [videoList, setVideoList] = useState<VideoData[]>([]);
  const [loading, setLoading]     = useState(true);
  const [activeId, setActiveId]   = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    fetch("/api/youtube")
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        if (Array.isArray(data.videos)) {
          setVideoList(data.videos.slice(0, 8));
        }
      })
      .catch((err) => {
        console.warn("Failed to load YouTube videos:", err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  const closeModal = () => setActiveId(null);

  // Use the RSS-provided thumbnail; fall back to img.youtube.com hqdefault
  const thumbUrl = (video: VideoData) =>
    video.thumbnail || `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;

  return (
    <>
      {loading ? (
        <VideoSkeletonGrid />
      ) : videoList.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="vad-media-grid" style={{ marginBottom: "36px" }}>
          {videoList.map((video) => (
            <div
              key={video.videoId}
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                border: "1px solid rgba(0,0,0,0.06)",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
              }}
              onClick={() => setActiveId(video.videoId)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
              }}
            >
              {/* Thumbnail */}
              <div style={{ position: "relative", width: "100%", height: "150px" }}>
                <Image
                  src={thumbUrl(video)}
                  alt={video.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  unoptimized
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.45)",
                      backdropFilter: "blur(6px)",
                      WebkitBackdropFilter: "blur(6px)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
                      paddingLeft: "3px",
                    }}
                  >
                    <PlayIcon />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3
                  style={{
                    margin: "0 0 8px",
                    fontSize: "14.5px",
                    fontWeight: 800,
                    color: "var(--vad-navy-950)",
                    lineHeight: 1.35,
                  }}
                >
                  {video.title}
                </h3>
                {video.description && (
                  <p
                    style={{
                      margin: 0,
                      fontSize: "13px",
                      color: "var(--vad-ink-soft)",
                      lineHeight: 1.5,
                      flex: 1,
                    }}
                  >
                    {video.description.length > 80
                      ? `${video.description.substring(0, 80)}…`
                      : video.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* YouTube Channel Subscribe Strip */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "24px 30px",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1, minWidth: "280px" }}>
          <div style={{ flexShrink: 0 }}>
            <YouTubeIcon />
          </div>
          <div>
            <h4 style={{ margin: "0 0 4px", fontSize: "17px", fontWeight: 800, color: "var(--vad-navy-950)" }}>
              Subscribe to our YouTube channel to see more
            </h4>
            <span style={{ fontSize: "13.5px", color: "var(--vad-ink-soft)" }}>
              Watch student journeys, event highlights and more.
            </span>
          </div>
        </div>
        <a
          href="https://www.youtube.com/@vadaanyajanaasociety9272"
          target="_blank"
          rel="noopener noreferrer"
          className="vad-btn vad-btn--gold"
          style={{ padding: "12px 24px" }}
        >
          Visit Channel
        </a>
      </div>

      {/* Lightbox Video Player Modal */}
      {activeId && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,16,48,0.92)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backdropFilter: "blur(8px)",
          }}
          onClick={closeModal}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "840px",
              aspectRatio: "16 / 9",
              background: "#000",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              aria-label="Close video player"
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                zIndex: 10,
                background: "rgba(0,0,0,0.7)",
                color: "#ffffff",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                fontSize: "18px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeId}?autoplay=1&rel=0`}
              title="YouTube video player"
              style={{ width: "100%", height: "100%", border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
