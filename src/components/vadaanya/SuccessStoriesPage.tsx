"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import type { SuccessStoryItem } from "@/lib/sanity/queries";

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" fill="#dc2626" stroke="none" />
  </svg>
);

interface SuccessStoriesPageProps {
  stories?: SuccessStoryItem[];
}

export default function SuccessStoriesPage({ stories = [] }: SuccessStoriesPageProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [initialCount, setInitialCount] = useState<number>(10);
  const [activeStory, setActiveStory] = useState<SuccessStoryItem | null>(null);

  // Dynamically calculate initial rows based on grid column breakpoints:
  // - > 1200px (5 cols) -> 10 items (2 rows)
  // - 901px - 1200px (4 cols) -> 8 items (2 rows)
  // - 641px - 900px (3 cols, iPad) -> 6 items (2 rows)
  // - <= 640px (2 cols, Phone & Small Tablet) -> 6 items (3 rows of 2 cards)
  useEffect(() => {
    const updateCount = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      if (w > 1200) {
        setInitialCount(10);
      } else if (w > 900) {
        setInitialCount(8);
      } else if (w > 640) {
        setInitialCount(6);
      } else {
        setInitialCount(6); // 3 rows * 2 cards on mobile = 6 items
      }
    };

    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (activeStory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeStory]);

  const visibleCount = isExpanded ? stories.length : initialCount;
  const displayedStories = stories.slice(0, visibleCount);
  const hasMore = !isExpanded && initialCount < stories.length;

  return (
    <>
      {/* 1. Page Hero Section */}
      <section className="vad-page-hero vad-section--deep">
        <div className="vad-container vad-page-hero__inner">
          <span className="vad-eyebrow" style={{ color: "var(--vad-gold)" }}>Success Stories</span>
          <h1 className="vad-page-hero__title">
            Students Who <span className="vad-page-hero__accent">Made It</span>
          </h1>
          <p className="vad-page-hero__lead" style={{ fontSize: "16.5px", maxWidth: "660px", margin: "12px auto 0", color: "#ffffff" }}>
            These are not statistics — they are real people whose lives changed because they had support at the right moment.
          </p>
        </div>
      </section>

      {/* 2. Success Stories Cards Grid Section */}
      <section className="vad-section vad-section--paper" style={{ padding: "50px 0 80px" }}>
        <div className="vad-container">
          
          <div className="vad-success-grid" style={{ marginBottom: hasMore ? "44px" : "0" }}>
            {displayedStories.map((story, index) => (
              <div
                key={story.id}
                className="vad-success-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
                }}
              >
                {/* Vertical Portrait Image Container */}
                <div style={{ position: "relative", width: "100%", aspectRatio: "3 / 3.1", overflow: "hidden", background: "#f1f5f9" }}>
                  <Image
                    src={story.imageUrl}
                    alt={story.imageAlt || story.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 640px) 50vw, (max-width: 900px) 33vw, (max-width: 1200px) 25vw, 320px"
                    quality={85}
                    placeholder={story.blurDataUrl ? "blur" : "empty"}
                    blurDataURL={story.blurDataUrl}
                    priority={index < 4}
                    loading={index < 4 ? "eager" : "lazy"}
                  />
                </div>

                {/* Content Body */}
                <div className="vad-success-card__body">
                  <h3 className="vad-success-card__title">
                    {story.name}
                  </h3>
                  <span className="vad-success-card__role">
                    {story.occupation}
                  </span>

                  <p className="vad-success-card__caption">
                    {story.shortCaption}
                  </p>

                  {/* Know More Button */}
                  <button
                    onClick={() => setActiveStory(story)}
                    className="vad-success-card__btn"
                  >
                    Know More →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View More Success Stories Button */}
          {hasMore && (
            <div style={{ textAlign: "center", marginTop: "36px" }}>
              <button
                onClick={() => setIsExpanded(true)}
                className="vad-btn vad-btn--gold"
                style={{ padding: "12px 32px", fontSize: "15px", cursor: "pointer" }}
              >
                View More ({stories.length - initialCount} More)
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 3. Detailed Modal for "Know More" (Tags styled with Website Blue background) */}
      {activeStory && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10, 16, 48, 0.88)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backdropFilter: "blur(6px)"
          }}
          onClick={() => setActiveStory(null)}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "680px",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#ffffff",
              borderRadius: "24px",
              padding: "32px",
              boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveStory(null)}
              aria-label="Close story"
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "rgba(0,0,0,0.06)",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1e293b"
              }}
            >
              <CloseIcon />
            </button>

            {/* Modal Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
              <div style={{ position: "relative", width: "84px", height: "105px", borderRadius: "14px", overflow: "hidden", flexShrink: 0 }}>
                <Image
                  src={activeStory.imageUrl}
                  alt={activeStory.name}
                  fill
                  sizes="120px"
                  quality={85}
                  placeholder={activeStory.blurDataUrl ? "blur" : "empty"}
                  blurDataURL={activeStory.blurDataUrl}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <h2 style={{ margin: "0 0 4px", fontSize: "22px", fontWeight: 800, color: "var(--vad-navy-950)" }}>
                  {activeStory.name}
                </h2>
                <p style={{ margin: 0, fontSize: "14.5px", fontWeight: 700, color: "var(--vad-gold-deep)" }}>
                  {activeStory.occupation}
                </p>
              </div>
            </div>

            {/* Quote if present */}
            {activeStory.quote && (
              <blockquote style={{
                margin: "0 0 20px",
                padding: "16px 20px",
                background: "rgba(242, 167, 18, 0.08)",
                borderLeft: "4px solid var(--vad-gold-deep)",
                borderRadius: "0 12px 12px 0",
                fontSize: "14.5px",
                fontStyle: "italic",
                color: "var(--vad-navy-950)",
                lineHeight: 1.5
              }}>
                "{activeStory.quote}"
              </blockquote>
            )}

            {/* Full Story Text */}
            <div style={{ marginBottom: "24px" }}>
              <h4 style={{ margin: "0 0 8px", fontSize: "15px", fontWeight: 700, color: "var(--vad-navy-950)" }}>
                The Journey & Support
              </h4>
              <p style={{ margin: 0, fontSize: "14px", color: "var(--vad-ink-soft)", lineHeight: 1.6 }}>
                {activeStory.fullStory}
              </p>
            </div>

            {/* Tags Covered (Styled with Website Navy Blue background) */}
            {activeStory.covered && activeStory.covered.length > 0 && (
              <div style={{ marginBottom: "24px" }}>
                <h4 style={{ margin: "0 0 10px", fontSize: "13.5px", fontWeight: 700, color: "var(--vad-navy-950)" }}>
                  Vadaanya Assistance Provided:
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {activeStory.covered.map((tag, idx) => (
                    <span key={idx} style={{
                      background: "linear-gradient(135deg, var(--vad-navy-950), var(--vad-navy-800))",
                      color: "var(--vad-gold)",
                      padding: "5px 14px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: 700,
                      boxShadow: "0 2px 8px rgba(7, 14, 39, 0.15)"
                    }}>
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Video link if available */}
            {activeStory.videoUrl && (
              <a
                href={activeStory.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "#dc2626",
                  textDecoration: "none",
                  background: "rgba(220, 38, 38, 0.08)",
                  padding: "8px 16px",
                  borderRadius: "20px"
                }}
              >
                <YouTubeIcon />
                Watch Video Story on YouTube
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
