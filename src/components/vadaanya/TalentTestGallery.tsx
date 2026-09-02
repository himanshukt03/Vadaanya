"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import type { TalentTestGalleryItem } from "@/lib/sanity/queries";

interface TalentTestGalleryProps {
  albums: TalentTestGalleryItem[];
}

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function TalentTestGallery({ albums = [] }: TalentTestGalleryProps) {
  const [activeEvent, setActiveEvent] = useState<TalentTestGalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Lock background scroll when modal or lightbox is open
  useEffect(() => {
    if (activeEvent || lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeEvent, lightboxIndex]);

  const handleNextImage = () => {
    if (!activeEvent || lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % activeEvent.images.length);
  };

  const handlePrevImage = () => {
    if (!activeEvent || lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + activeEvent.images.length) % activeEvent.images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "Escape") setLightboxIndex(null);
        if (e.key === "ArrowRight") handleNextImage();
        if (e.key === "ArrowLeft") handlePrevImage();
      } else if (activeEvent) {
        if (e.key === "Escape") setActiveEvent(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <section id="gallery" className="vad-section vad-section--paper">
      <div className="vad-container">
        {/* Section Header */}
        <div className="vad-head vad-head--center vad-head--light" style={{ marginBottom: "36px" }}>
          <span className="vad-eyebrow vad-eyebrow--center vad-eyebrow--dark">PHOTO ARCHIVES</span>
          <h2>Exam Days & Prize Distribution Gallery</h2>
          <p className="vad-lead">
            Explore photo archives from every edition of the Vadaanya Talent Test — from energetic OMR exam halls to grand state felicitation ceremonies.
          </p>
        </div>

        {/* Gallery Cards Grid: 4 in desktop, 3 in tablet, 2 in phone */}
        <div className="vad-talent-gallery-grid">
          {albums.map((event, idx) => (
            <div
              key={event.id}
              onClick={() => setActiveEvent(event)}
              className="vad-talent-gallery-card"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveEvent(event);
                }
              }}
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                cursor: "pointer",
                border: "1px solid rgba(0,0,0,0.06)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 14px 32px rgba(10,16,48,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
              }}
            >
              {/* Card Cover Image */}
              <div className="vad-talent-gallery-cover">
                <Image
                  src={event.coverImage}
                  alt={event.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                  quality={85}
                  placeholder={event.blurDataUrl ? "blur" : "empty"}
                  blurDataURL={event.blurDataUrl}
                  priority={idx < 4}
                  loading={idx < 4 ? "eager" : "lazy"}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "10px 12px",
                    background: "linear-gradient(transparent, rgba(10, 16, 48, 0.9))",
                    color: "white",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "var(--vad-gold, #f2a712)", fontWeight: 700 }}>
                    {event.date || event.year || "Talent Test Edition"}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "15.5px",
                    color: "var(--vad-navy-950, #070e27)",
                    fontWeight: 800,
                    lineHeight: 1.35,
                  }}
                >
                  {event.title}
                </h3>
                <p
                  style={{
                    margin: "10px 0 0",
                    fontSize: "13px",
                    color: "var(--vad-ink-soft, #64748b)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  {event.images.length} Photos (Click to View)
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Images Drawer / Modal Grid (Matching Gallery Media Page) */}
      {activeEvent && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(10, 16, 48, 0.95)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
          role="dialog"
          aria-modal="true"
          aria-label={activeEvent.title}
        >
          {/* Sticky Header */}
          <div
            style={{
              position: "sticky",
              top: 0,
              background: "rgba(10, 16, 48, 0.85)",
              padding: "20px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 10,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div>
              <p style={{ margin: 0, color: "var(--vad-gold, #f2a712)", fontSize: "13.5px", fontWeight: 700 }}>
                {activeEvent.date || activeEvent.year || "Talent Test Edition"}
              </p>
              <h2 style={{ margin: "4px 0 0", color: "white", fontSize: "22px", fontWeight: 700 }}>
                {activeEvent.title}
              </h2>
            </div>
            <button
              onClick={() => setActiveEvent(null)}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "none",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              aria-label="Close event gallery"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Image Grid Inside Event */}
          <div className="vad-container" style={{ padding: "30px 16px", width: "100%" }}>
            <div className="vad-event-modal-grid">
              {activeEvent.images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className="vad-gallery-thumb-wrap"
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1/1",
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "zoom-in",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setLightboxIndex(idx);
                    }
                  }}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <Image
                    src={(activeEvent.thumbnails && activeEvent.thumbnails[idx]) || img}
                    alt={`${activeEvent.title} - Image ${idx + 1}`}
                    fill
                    sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 250px"
                    quality={85}
                    loading={idx < 6 ? "eager" : "lazy"}
                    style={{ objectFit: "cover" }}
                    className="vad-gallery-thumb"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Full-screen Lightbox */}
      {lightboxIndex !== null && activeEvent && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.98)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Full screen photo view"
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2010,
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            aria-label="Close photo view"
          >
            <CloseIcon />
          </button>

          {/* Prev Button */}
          {activeEvent.images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              style={{
                position: "absolute",
                left: "24px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2010,
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              aria-label="Previous photo"
            >
              <ChevronLeft />
            </button>
          )}

          {/* Main Image Container */}
          <div
            style={{
              position: "relative",
              width: "90%",
              height: "90%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setLightboxIndex(null)}
          >
            <div
              style={{
                position: "relative",
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeEvent.images[lightboxIndex]}
                alt={`${activeEvent.title} - photo ${lightboxIndex + 1}`}
                width={2400}
                height={1600}
                quality={95}
                unoptimized
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "8px",
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                }}
              />
            </div>
          </div>

          {/* Next Button */}
          {activeEvent.images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              style={{
                position: "absolute",
                right: "24px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2010,
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              aria-label="Next photo"
            >
              <ChevronRight />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
