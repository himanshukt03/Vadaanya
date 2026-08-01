"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useRef, useState, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import { stories, SuccessStory } from "@/data/vadaanya/SuccessStoriesData";

import "swiper/css";
import "swiper/css/navigation";

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

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function SuccessStoriesGrid() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);

  // Fix initial hydration / SSR container measurement issue on desktop
  useEffect(() => {
    const timer = setTimeout(() => {
      if (swiperRef.current && !swiperRef.current.destroyed) {
        swiperRef.current.update();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => setSelectedStory(null);

  return (
    <section id="stories" className="vad-section vad-section--deep">
      <div className="vad-container">
        <div className="vad-head" style={{ textAlign: "center", marginBottom: "35px" }}>
          <span className="vad-eyebrow">Impact Stories</span>
          <h2 style={{ color: "#fff", fontSize: "clamp(26px, 4vw, 38px)", margin: "10px 0" }}>
            Students Who <span style={{ color: "var(--vad-gold)" }}>Made It</span>
          </h2>
          <p className="vad-lead" style={{ maxWidth: "700px", margin: "0 auto" }}>
            These are not statistics — they are real people whose lives changed because they had support at the right moment.
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div className="vad-stories__carousel-wrapper" style={{ position: "relative", width: "100%" }}>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            observer={true}
            observeParents={true}
            resizeObserver={true}
            updateOnWindowResize={true}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              if (swiper && !swiper.destroyed) {
                swiper.update();
              }
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="vad-stories__swiper"
            style={{ width: "100%" }}
          >
            {stories.map((story) => (
              <SwiperSlide key={story.id} style={{ height: "auto" }}>
                <article
                  onClick={() => setSelectedStory(story)}
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backdropFilter: "blur(8px)",
                    cursor: "pointer",
                    transition: "transform 0.2s, border-color 0.2s",
                  }}
                >
                  {/* 1:1 Square Photo */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "1 / 1",
                      overflow: "hidden",
                      background: "#0f172a",
                    }}
                  >
                    <Image
                      src={story.imageUrl}
                      alt={story.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  {/* Card Content Body */}
                  <div
                    style={{
                      padding: "20px 22px 22px",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          color: "#ffffff",
                          fontSize: "19px",
                          fontWeight: 700,
                          margin: "0 0 4px",
                          lineHeight: 1.3,
                        }}
                      >
                        {story.name}
                      </h3>

                      <div
                        style={{
                          color: "var(--vad-gold)",
                          fontSize: "13.5px",
                          fontWeight: 600,
                          marginBottom: "10px",
                        }}
                      >
                        {story.occupation}
                      </div>

                      <p className="vad-story-card__desc">
                        {story.shortCaption}
                      </p>
                    </div>

                    {/* Know More link */}
                    <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                      <span
                        style={{
                          color: "var(--vad-gold)",
                          fontSize: "13.5px",
                          fontWeight: 700,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        Know More &rarr;
                      </span>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="vad-stories__nav">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="vad-stories__arrow vad-stories__arrow--prev"
              aria-label="Previous stories"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="vad-stories__arrow vad-stories__arrow--next"
              aria-label="Next stories"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Clean 2-Column Pop-up Modal */}
      {selectedStory && (
        <div className="vad-story-modal" onClick={closeModal}>
          <div className="vad-story-modal__content" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              className="vad-story-modal__close"
              onClick={closeModal}
              aria-label="Close story popup"
            >
              ✕
            </button>

            {/* 2-Column Layout */}
            <div className="vad-story-modal__grid">
              {/* LEFT COLUMN: Photo & Student Details */}
              <div className="vad-story-modal__left">
                {/* Photo */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1 / 1",
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "#050a1e",
                  }}
                >
                  <Image
                    src={selectedStory.imageUrl}
                    alt={selectedStory.imageAlt}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>

                {/* Details */}
                <div>
                  <h2 style={{ fontSize: "22px", fontWeight: 800, margin: "0 0 4px", color: "#ffffff" }}>
                    {selectedStory.name}
                  </h2>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--vad-gold)", marginBottom: "6px" }}>
                    {selectedStory.occupation}
                  </div>
                  {selectedStory.location && (
                    <div style={{ fontSize: "13px", color: "#94a3b8" }}>
                      📍 {selectedStory.location}
                    </div>
                  )}
                </div>

                {/* YouTube Link Button */}
                {selectedStory.videoUrl && (
                  <a
                    href={selectedStory.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      background: "#ff0000",
                      color: "#ffffff",
                      fontWeight: 700,
                      fontSize: "13.5px",
                      padding: "11px 20px",
                      borderRadius: "100px",
                      textDecoration: "none",
                      marginTop: "4px",
                      transition: "opacity 0.2s",
                    }}
                  >
                    <YouTubeIcon />
                    <span>Watch on YouTube</span>
                  </a>
                )}
              </div>

              {/* RIGHT COLUMN: Full Journey, Quote & Support */}
              <div className="vad-story-modal__right">
                {/* Full Journey */}
                <div>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", margin: "0 0 8px" }}>
                    Full Journey
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.65, color: "#cbd5e1", margin: 0 }}>
                    {selectedStory.fullStory}
                  </p>
                </div>

                {/* Student Quote */}
                {selectedStory.quote && (
                  <div>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", margin: "0 0 8px" }}>
                      What They Say About Vadaanya
                    </h3>
                    <blockquote
                      style={{
                        fontStyle: "italic",
                        fontSize: "14px",
                        color: "#ffffff",
                        background: "rgba(255, 255, 255, 0.05)",
                        borderLeft: "3px solid var(--vad-gold)",
                        padding: "14px 18px",
                        borderRadius: "0 10px 10px 0",
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      &ldquo;{selectedStory.quote}&rdquo;
                    </blockquote>
                  </div>
                )}

                {/* What Vadaanya Covered */}
                <div>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", margin: "0 0 8px" }}>
                    What Vadaanya Covered
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {selectedStory.covered.map((item, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: "rgba(255, 255, 255, 0.06)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          color: "#cbd5e1",
                          fontSize: "12.5px",
                          fontWeight: 500,
                          padding: "4px 12px",
                          borderRadius: "100px",
                        }}
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
