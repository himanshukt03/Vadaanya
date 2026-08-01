"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface VideoData {
  id: string;
  videoId: string;
  title: string;
  description: string;
  published?: string;
}

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" style={{ fill: "#FF0000" }} />
  </svg>
);

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function VideoGalleryClient({ videos }: { videos: VideoData[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  // Fix initial hydration / SSR container measurement issue on desktop
  useEffect(() => {
    const timer = setTimeout(() => {
      if (swiperRef.current && !swiperRef.current.destroyed) {
        swiperRef.current.update();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const thumbUrl = (videoId: string) =>
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const closeModal = () => setActiveId(null);
  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  return (
    <>
      {/* Video Carousel */}
      <div className="vad-video__carousel-wrapper" style={{ width: "100%" }}>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={videos.length > 3}
          observer={true}
          observeParents={true}
          resizeObserver={true}
          updateOnWindowResize={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            if (swiper && !swiper.destroyed) {
              swiper.update();
            }
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="vad-video__swiper"
          style={{ width: "100%" }}
        >
          {videos.map((video) => (
            <SwiperSlide key={video.id}>
              <div className="vad-video-card">
                <div
                  className="vad-video-card__thumb"
                  role="button"
                  tabIndex={0}
                  aria-label={`Play video: ${video.title}`}
                  onClick={() => setActiveId(video.videoId)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveId(video.videoId)}
                >
                  <Image
                    src={thumbUrl(video.videoId)}
                    alt={`Thumbnail for ${video.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="vad-video-card__img"
                  />
                  <div className="vad-video-card__play" aria-hidden="true">
                    <div className="play-circle">
                      <PlayIcon />
                    </div>
                  </div>
                </div>

                <div className="vad-video-card__body">
                  <h3>{video.title}</h3>
                  {video.published && (
                    <span className="vad-video-card__date">
                      {new Date(video.published).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  )}
                  {video.description && <p>{video.description.substring(0, 80)}...</p>}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <div className="vad-video__nav">
          <button onClick={handlePrev} className="vad-video__arrow vad-video__arrow--prev" aria-label="Previous videos">
            <ArrowLeft />
          </button>
          <button onClick={handleNext} className="vad-video__arrow vad-video__arrow--next" aria-label="Next videos">
            <ArrowRight />
          </button>
        </div>
      </div>

      {/* YouTube channel CTA */}
      <div className="vad-video__yt-cta">
        <div className="vad-video__yt-icon" aria-hidden="true">
          <YouTubeIcon />
        </div>
        <div style={{ flex: 1 }}>
          <strong style={{ fontFamily: "var(--vad-font-display)", fontSize: "17px" }}>
            Subscribe to Vadaanya on YouTube
          </strong>
          <span style={{ display: "block", fontSize: "14px", marginTop: "2px" }}>
            Watch student journeys, event highlights and annual talent test coverage.
          </span>
        </div>
        <a
          href="https://www.youtube.com/@vadaanyajanaasociety9272"
          target="_blank"
          rel="noopener noreferrer"
          className="vad-btn vad-btn--gold"
          aria-label="Visit Vadaanya on YouTube (opens in new tab)"
        >
          Visit Channel
        </a>
      </div>

      {/* Lightbox modal */}
      <div
        className={`vad-video__modal${activeId ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Video player"
        onClick={closeModal}
      >
        <div className="vad-video__modal-inner" onClick={(e) => e.stopPropagation()}>
          <button
            className="vad-video__modal-close"
            onClick={closeModal}
            aria-label="Close video player"
          >
            ✕
          </button>
          {activeId && (
            <iframe
              src={`https://www.youtube.com/embed/${activeId}?autoplay=1&rel=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </>
  );
}
