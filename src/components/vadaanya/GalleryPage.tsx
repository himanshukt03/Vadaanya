"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { galleryEvents, GalleryEvent } from "@/data/vadaanya/GalleryData";

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ChevronLeft = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRight = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export default function GalleryPage() {
  const [activeEvent, setActiveEvent] = useState<GalleryEvent | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Prevent background scrolling when a modal or lightbox is open
  useEffect(() => {
    if (activeEvent || lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeEvent, lightboxIndex]);

  const handleNextImage = () => {
    if (!activeEvent || lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % activeEvent.images.length);
  };

  const handlePrevImage = () => {
    if (!activeEvent || lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + activeEvent.images.length) % activeEvent.images.length);
  };

  // Keyboard navigation for lightbox
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
    <>
      {/* 1. Page Hero Section */}
      <section className="vad-page-hero vad-section--deep" style={{ paddingBottom: "clamp(48px, 6vw, 72px)" }}>
        <div className="vad-container vad-page-hero__inner">
          <span className="vad-eyebrow" style={{ color: "var(--vad-gold)" }}>Our Gallery</span>
          <h1 className="vad-page-hero__title" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>
            Moments of <span className="vad-page-hero__accent">Impact</span>
          </h1>
          <p className="vad-page-hero__lead" style={{ marginTop: "16px", fontSize: "18px", maxWidth: "600px", margin: "16px auto 0" }}>
            Explore the events, drives, and milestones that have shaped our journey over the years.
          </p>
        </div>
      </section>

      {/* 2. Events Grid */}
      <section className="vad-section vad-section--paper" style={{ padding: "80px 0" }}>
        <div className="vad-container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "40px"
          }}>
            {galleryEvents.map((event) => (
              <div 
                key={event.id}
                onClick={() => setActiveEvent(event)}
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                  cursor: "pointer",
                  border: "1px solid rgba(0,0,0,0.04)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.06)";
                }}
              >
                <div style={{ position: "relative", width: "100%", height: "240px" }}>
                  <Image
                    src={event.coverImage}
                    alt={event.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "20px",
                    background: "linear-gradient(transparent, rgba(10, 16, 48, 0.9))",
                    color: "white"
                  }}>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--vad-gold)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {event.date}
                    </span>
                  </div>
                </div>
                <div style={{ padding: "24px" }}>
                  <h3 style={{ margin: 0, fontSize: "18px", color: "var(--vad-navy-950)", fontWeight: 700, lineHeight: 1.4 }}>
                    {event.title}
                  </h3>
                  <p style={{ margin: "12px 0 0", fontSize: "14px", color: "var(--vad-ink-soft)", display: "flex", alignItems: "center", gap: "6px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    {event.images.length} Photos
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Event Images Drawer/Modal */}
      {activeEvent && (
        <div style={{
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
          WebkitBackdropFilter: "blur(10px)"
        }}>
          {/* Header */}
          <div style={{
            position: "sticky",
            top: 0,
            background: "rgba(10, 16, 48, 0.8)",
            padding: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 10,
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
          }}>
            <div>
              <p style={{ margin: 0, color: "var(--vad-gold)", fontSize: "14px", fontWeight: 700 }}>{activeEvent.date}</p>
              <h2 style={{ margin: "4px 0 0", color: "white", fontSize: "24px", fontWeight: 700 }}>{activeEvent.title}</h2>
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
                transition: "background 0.2s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            >
              <CloseIcon />
            </button>
          </div>

          {/* Image Grid inside Event */}
          <div className="vad-container" style={{ padding: "40px 20px", width: "100%" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
              width: "100%"
            }}>
              {activeEvent.images.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1/1",
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "zoom-in",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                  }}
                >
                  <Image
                    src={img}
                    alt={`${activeEvent.title} - Image ${idx + 1}`}
                    fill
                    style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Full-screen Lightbox */}
      {lightboxIndex !== null && activeEvent && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.98)",
          zIndex: 2000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
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
              transition: "background 0.2s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          >
            <CloseIcon />
          </button>

          {/* Prev Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
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
              transition: "background 0.2s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          >
            <ChevronLeft />
          </button>

          {/* Main Image Container */}
          <div style={{ position: "relative", width: "90%", height: "90%", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setLightboxIndex(null)}>
            <div style={{ position: "relative", maxWidth: "100%", maxHeight: "100%", width: "auto", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={(e) => e.stopPropagation()}>
               <img 
                 src={activeEvent.images[lightboxIndex]} 
                 alt={`${activeEvent.title} view`} 
                 style={{
                   maxWidth: "100%",
                   maxHeight: "100%",
                   objectFit: "contain",
                   borderRadius: "8px",
                   boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
                 }} 
               />
            </div>
          </div>

          {/* Next Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
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
              transition: "background 0.2s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          >
            <ChevronRight />
          </button>
          
          {/* Bottom Counter */}
          <div style={{
            position: "absolute",
            bottom: "24px",
            color: "rgba(255,255,255,0.7)",
            fontSize: "15px",
            fontWeight: 600,
            letterSpacing: "0.1em"
          }}>
            {lightboxIndex + 1} / {activeEvent.images.length}
          </div>
        </div>
      )}
    </>
  );
}
