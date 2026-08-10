"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useRef, useState, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import type { SuccessStoryItem } from "@/lib/sanity/queries";

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

interface SuccessStoriesGridProps {
  stories?: SuccessStoryItem[];
}

export default function SuccessStoriesGrid({ stories = [] }: SuccessStoriesGridProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [selectedStory, setSelectedStory] = useState<SuccessStoryItem | null>(null);

  // 6 total featured stories for the homepage carousel
  const featuredStories = stories.slice(0, 6);

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
    <section id="stories" className="vad-section vad-section--deep" style={{ padding: "48px 0 52px", background: "var(--vad-navy-950, #060b22)" }}>
      <div className="vad-container">
        {/* Header */}
        <div className="vad-head" style={{ textAlign: "center", marginBottom: "24px" }}>
          <span className="vad-eyebrow" style={{ color: "var(--vad-gold, #f2a712)" }}>Impact Stories</span>
          <h2 style={{ color: "#ffffff", fontSize: "clamp(24px, 3.2vw, 32px)", margin: "4px 0 8px", fontWeight: 800 }}>
            Students Who <span style={{ color: "var(--vad-gold, #f2a712)" }}>Made It</span>
          </h2>
          <p style={{ fontSize: "14.5px", color: "rgba(255, 255, 255, 0.75)", maxWidth: "640px", margin: "0 auto", lineHeight: 1.5 }}>
            These are not statistics — they are real people whose lives changed because they had support at the right moment.
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div className="vad-stories__carousel-wrapper" style={{ position: "relative", width: "100%" }}>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={4.6}
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
              0: { slidesPerView: 1.2, spaceBetween: 10 },
              440: { slidesPerView: 2.3, spaceBetween: 12 },
              700: { slidesPerView: 3.4, spaceBetween: 14 },
              960: { slidesPerView: 4.6, spaceBetween: 16 },
            }}
            className="vad-stories__swiper"
            style={{ width: "100%" }}
          >
            {featuredStories.map((story) => (
              <SwiperSlide key={story.id} style={{ height: "auto" }}>
                <article
                  onClick={() => setSelectedStory(story)}
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "14px",
                    overflow: "hidden",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
                    cursor: "pointer",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.35)";
                    e.currentTarget.style.borderColor = "var(--vad-gold, #f2a712)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.2)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                  }}
                >
                  {/* Slim Vertical Portrait Photo */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "3 / 3.1",
                      overflow: "hidden",
                      background: "#080e28",
                    }}
                  >
                    <Image
                      src={story.imageUrl}
                      alt={story.imageAlt}
                      fill
                      sizes="(max-width: 440px) 100vw, (max-width: 640px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  {/* Card Content Body */}
                  <div
                    style={{
                      padding: "10px 14px 12px",
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
                          fontSize: "14.5px",
                          fontWeight: 800,
                          margin: "0 0 2px",
                          lineHeight: 1.25,
                        }}
                      >
                        {story.name}
                      </h3>

                      <div
                        style={{
                          color: "var(--vad-gold, #f2a712)",
                          fontSize: "11.5px",
                          fontWeight: 700,
                          marginBottom: "4px",
                        }}
                      >
                        {story.occupation}
                      </div>

                      <p
                        style={{
                          fontSize: "11.5px",
                          color: "rgba(255, 255, 255, 0.75)",
                          lineHeight: 1.4,
                          margin: 0,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {story.shortCaption}
                      </p>
                    </div>

                    {/* Know More link */}
                    <div style={{ marginTop: "8px", paddingTop: "6px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                      <span
                        style={{
                          color: "var(--vad-gold, #f2a712)",
                          fontSize: "11.5px",
                          fontWeight: 700,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "3px",
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

          {/* Custom Navigation Arrows */}
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

        {/* View All Success Stories Button */}
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <a href="/success-stories" className="vad-btn vad-btn--gold" style={{ padding: "10px 22px", fontSize: "13.5px" }}>
            View All Success Stories →
          </a>
        </div>
      </div>

      {/* Clean Light-Themed Pop-up Modal */}
      {selectedStory && (
        <div className="vad-story-modal" onClick={closeModal} style={{ background: "rgba(15, 23, 42, 0.75)", backdropFilter: "blur(6px)" }}>
          <div className="vad-story-modal__content" onClick={(e) => e.stopPropagation()} style={{ background: "#ffffff", border: "1px solid #cbd5e1", color: "#0f172a" }}>
            {/* Close Button */}
            <button
              className="vad-story-modal__close"
              onClick={closeModal}
              style={{ background: "#f1f5f9", color: "#0f172a" }}
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
                    aspectRatio: "3 / 3.8",
                    borderRadius: "14px",
                    overflow: "hidden",
                    background: "#f1f5f9",
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
                  <h2 style={{ fontSize: "22px", fontWeight: 800, margin: "0 0 4px", color: "#0f172a" }}>
                    {selectedStory.name}
                  </h2>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--vad-gold-dark, #d97706)", marginBottom: "6px" }}>
                    {selectedStory.occupation}
                  </div>
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
                  <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>
                    Full Journey
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.65, color: "#334155", margin: 0 }}>
                    {selectedStory.fullStory}
                  </p>
                </div>

                {/* Student Quote */}
                {selectedStory.quote && (
                  <div>
                    <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>
                      What They Say About Vadaanya
                    </h3>
                    <blockquote
                      style={{
                        fontStyle: "italic",
                        fontSize: "14px",
                        color: "#0f172a",
                        background: "#f8fafc",
                        borderLeft: "3px solid var(--vad-gold-dark, #d97706)",
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
                  <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>
                    What Vadaanya Covered
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {selectedStory.covered.map((item, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: "#f1f5f9",
                          border: "1px solid #cbd5e1",
                          color: "#334155",
                          fontSize: "12.5px",
                          fontWeight: 600,
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
