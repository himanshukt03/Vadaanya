"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import type {
  GalleryEventItem,
  PrintMediaCollectionItem,
  NewsArticleItem,
  CampaignPosterItem,
} from "@/lib/sanity/queries";
import dynamic from "next/dynamic";
import PublisherLogo from "./PublisherLogo";

const VideoGalleryClient = dynamic(() => import("./VideoGalleryClient"), {
  ssr: false,
});

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

const MediaSkeletonGrid = ({ count = 4, type = "gallery" }: { count?: number; type?: "gallery" | "print" | "news" | "posters" | "youtube" }) => {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: type === "print" 
        ? "repeat(auto-fit, minmax(280px, 360px))" 
        : "repeat(auto-fill, minmax(265px, 1fr))",
      justifyContent: type === "print" ? "center" : undefined,
      gap: type === "print" ? "28px" : "24px",
      width: "100%"
    }}>
      {Array.from({ length: count }).map((_, idx) => (
        <div 
          key={idx}
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
            border: "1px solid rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column"
          }}
        >
          {type !== "news" ? (
            <div className="vad-skeleton-shimmer" style={{ width: "100%", height: type === "print" ? "280px" : type === "posters" ? "340px" : "170px" }} />
          ) : null}

          <div style={{ padding: "22px 24px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              {type === "news" && (
                <div className="vad-skeleton-shimmer" style={{ width: "110px", height: "18px", borderRadius: "12px", marginBottom: "8px" }} />
              )}
              <div className="vad-skeleton-shimmer" style={{ width: type === "print" ? "65%" : "85%", height: "20px", borderRadius: "6px" }} />
              
              {type === "print" ? (
                <div className="vad-skeleton-shimmer" style={{ width: "50%", height: "14px", borderRadius: "4px", marginTop: "8px" }} />
              ) : type !== "news" ? (
                <div className="vad-skeleton-shimmer" style={{ width: "60%", height: "14px", borderRadius: "4px", marginTop: "8px" }} />
              ) : (
                <>
                  <div className="vad-skeleton-shimmer" style={{ width: "100%", height: "14px", borderRadius: "4px", marginTop: "8px" }} />
                  <div className="vad-skeleton-shimmer" style={{ width: "65%", height: "14px", borderRadius: "4px", marginTop: "6px" }} />
                </>
              )}
            </div>

            <div style={{
              marginTop: "18px",
              paddingTop: "14px",
              borderTop: "1px solid rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
              gap: "8px"
            }}>
              <div className="vad-skeleton-shimmer" style={{ width: "100px", height: "14px", borderRadius: "4px" }} />
              <div className="vad-skeleton-shimmer" style={{ width: "90px", height: "14px", borderRadius: "4px" }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

interface GalleryPageProps {
  galleryEvents?: GalleryEventItem[];
  printMediaCollections?: PrintMediaCollectionItem[];
  newsItems?: NewsArticleItem[];
  campaignPosters?: CampaignPosterItem[];
}

export default function GalleryPage({
  galleryEvents = [],
  printMediaCollections = [],
  newsItems = [],
  campaignPosters = [],
}: GalleryPageProps) {
  const [activeTab, setActiveTab] = useState<"gallery" | "print" | "news" | "posters" | "youtube">("gallery");
  const [activeEvent, setActiveEvent] = useState<GalleryEventItem | PrintMediaCollectionItem | null>(null);
  const [activePoster, setActivePoster] = useState<CampaignPosterItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Tab change handler with skeleton loader transition
  const handleTabChange = (tab: "gallery" | "print" | "news" | "posters" | "youtube") => {
    if (tab === activeTab) return;
    setIsLoading(true);
    setActiveTab(tab);
    setTimeout(() => {
      setIsLoading(false);
    }, 380);
  };

  // Prevent background scrolling when a modal or lightbox is open
  useEffect(() => {
    if (activeEvent || activePoster || lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeEvent, activePoster, lightboxIndex]);

  const handleNextImage = () => {
    if (!activeEvent || lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % activeEvent.images.length);
  };

  const handlePrevImage = () => {
    if (!activeEvent || lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + activeEvent.images.length) % activeEvent.images.length);
  };

  // Keyboard navigation for lightbox & poster modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "Escape") setLightboxIndex(null);
        if (e.key === "ArrowRight") handleNextImage();
        if (e.key === "ArrowLeft") handlePrevImage();
      } else if (activePoster) {
        if (e.key === "Escape") setActivePoster(null);
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
      <section className="vad-page-hero vad-section--deep">
        <div className="vad-container vad-page-hero__inner">
          <span className="vad-eyebrow" style={{ color: "var(--vad-gold)" }}>Our Media</span>
          <h1 className="vad-page-hero__title">
            Vadaanya <span className="vad-page-hero__accent">Media</span>
          </h1>
          <p className="vad-page-hero__lead" style={{ marginTop: "12px", fontSize: "16.5px", maxWidth: "620px", margin: "12px auto 0", color: "#ffffff" }}>
            Explore our photo galleries, newspaper print coverage, campaign posters, news updates, and YouTube video highlights.
          </p>
        </div>
      </section>

      {/* 2. Media Content Section with 5 Toggle Bars */}
      <section className="vad-section vad-section--paper" style={{ padding: "50px 0 80px" }}>
        <div className="vad-container">
          
          {/* Pill Tabs Container (Desktop & Mobile) */}
          <div className="vad-media-tabs-desktop">
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "5px",
              background: "#ffffff",
              borderRadius: "9999px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0,0,0,0.04)",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              gap: "4px"
            }}>
              <button
                type="button"
                onClick={() => handleTabChange("gallery")}
                style={{
                  padding: "10px 24px",
                  borderRadius: "9999px",
                  fontSize: "14.5px",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  background: activeTab === "gallery" ? "linear-gradient(135deg, var(--vad-navy-950), var(--vad-navy-800))" : "transparent",
                  color: activeTab === "gallery" ? "#ffffff" : "#475569",
                  boxShadow: activeTab === "gallery" ? "0 4px 14px rgba(7, 14, 39, 0.25)" : "none",
                }}
              >
                Gallery
              </button>

              <button
                type="button"
                onClick={() => handleTabChange("print")}
                style={{
                  padding: "10px 24px",
                  borderRadius: "9999px",
                  fontSize: "14.5px",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  background: activeTab === "print" ? "linear-gradient(135deg, var(--vad-navy-950), var(--vad-navy-800))" : "transparent",
                  color: activeTab === "print" ? "#ffffff" : "#475569",
                  boxShadow: activeTab === "print" ? "0 4px 14px rgba(7, 14, 39, 0.25)" : "none",
                }}
              >
                Print Media
              </button>

              <button
                type="button"
                onClick={() => handleTabChange("news")}
                style={{
                  padding: "10px 24px",
                  borderRadius: "9999px",
                  fontSize: "14.5px",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  background: activeTab === "news" ? "linear-gradient(135deg, var(--vad-navy-950), var(--vad-navy-800))" : "transparent",
                  color: activeTab === "news" ? "#ffffff" : "#475569",
                  boxShadow: activeTab === "news" ? "0 4px 14px rgba(7, 14, 39, 0.25)" : "none",
                }}
              >
                News Articles
              </button>

              <button
                type="button"
                onClick={() => handleTabChange("youtube")}
                style={{
                  padding: "10px 24px",
                  borderRadius: "9999px",
                  fontSize: "14.5px",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  background: activeTab === "youtube" ? "linear-gradient(135deg, var(--vad-navy-950), var(--vad-navy-800))" : "transparent",
                  color: activeTab === "youtube" ? "#ffffff" : "#475569",
                  boxShadow: activeTab === "youtube" ? "0 4px 14px rgba(7, 14, 39, 0.25)" : "none",
                }}
              >
                Youtube
              </button>

              <button
                type="button"
                onClick={() => handleTabChange("posters")}
                style={{
                  padding: "10px 24px",
                  borderRadius: "9999px",
                  fontSize: "14.5px",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  background: activeTab === "posters" ? "linear-gradient(135deg, var(--vad-navy-950), var(--vad-navy-800))" : "transparent",
                  color: activeTab === "posters" ? "#ffffff" : "#475569",
                  boxShadow: activeTab === "posters" ? "0 4px 14px rgba(7, 14, 39, 0.25)" : "none",
                }}
              >
                Campaign Posters
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Selector (replaces toggle buttons on mobile) */}
          <div className="vad-media-tabs-mobile">
            <div className="vad-media-select-wrap">
              <label htmlFor="vad-media-category-select" className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden" }}>
                Select Media Category
              </label>
              <select
                id="vad-media-category-select"
                value={activeTab}
                onChange={(e) => handleTabChange(e.target.value as "gallery" | "print" | "news" | "youtube" | "posters")}
                className="vad-media-select"
              >
                <option value="gallery">Gallery</option>
                <option value="print">Print Media</option>
                <option value="news">News Articles</option>
                <option value="youtube">Youtube</option>
                <option value="posters">Campaign Posters</option>
              </select>
              <div className="vad-media-select-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>

          {/* SKELETON LOADER STATE */}
          {isLoading ? (
            <MediaSkeletonGrid count={activeTab === "print" ? 2 : activeTab === "youtube" ? 8 : 4} type={activeTab} />
          ) : (
            <>
              {/* TAB 1: GALLERY */}
              {activeTab === "gallery" && (
                <div className="vad-media-grid">
                  {galleryEvents.map((event, idx) => (
                    <div 
                      key={event.id}
                      onClick={() => setActiveEvent(event)}
                      style={{
                        background: "#fff",
                        borderRadius: "16px",
                        overflow: "hidden",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                        cursor: "pointer",
                        border: "1px solid rgba(0,0,0,0.04)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
                      }}
                    >
                      <div className="vad-media-card-img-wrap" style={{ position: "relative", width: "100%", height: "170px" }}>
                        <Image
                          src={event.coverImage}
                          alt={event.title}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                          quality={85}
                          placeholder={event.blurDataUrl ? "blur" : "empty"}
                          blurDataURL={event.blurDataUrl}
                          priority={idx < 4}
                          loading={idx < 4 ? "eager" : "lazy"}
                        />
                        <div style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          padding: "10px 12px",
                          background: "linear-gradient(transparent, rgba(10, 16, 48, 0.9))",
                          color: "white"
                        }}>
                          <span style={{ fontSize: "12px", color: "var(--vad-gold)", fontWeight: 700 }}>{event.date}</span>
                        </div>
                      </div>

                      <div className="vad-media-card-body" style={{ padding: "18px 20px" }}>
                        <h3 className="vad-media-card-title" style={{ margin: 0, fontSize: "16.5px", color: "var(--vad-navy-950)", fontWeight: 800, lineHeight: 1.35 }}>
                          {event.title}
                        </h3>
                        <p className="vad-media-card-sub" style={{ margin: "10px 0 0", fontSize: "13.5px", color: "var(--vad-ink-soft)", display: "flex", alignItems: "center", gap: "6px" }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                          {event.images.length} Photos (Click to View)
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: PRINT MEDIA */}
              {activeTab === "print" && (
                <div className="vad-media-grid-print">
                  {printMediaCollections.map((collection, idx) => (
                    <div
                      key={collection.id}
                      onClick={() => setActiveEvent(collection)}
                      style={{
                        background: "#ffffff",
                        borderRadius: "16px",
                        overflow: "hidden",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                        cursor: "pointer",
                        border: "1px solid rgba(0,0,0,0.06)",
                        display: "flex",
                        flexDirection: "column",
                        transition: "all 0.3s cubic-bezier(0.22, 0.61, 0.36, 1)"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-6px)";
                        e.currentTarget.style.boxShadow = "0 16px 36px rgba(10, 16, 48, 0.12)";
                        e.currentTarget.style.borderColor = "rgba(10, 16, 48, 0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
                        e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)";
                      }}
                    >
                      <div className="vad-media-card-img-wrap" style={{ position: "relative", width: "100%", height: "235px", overflow: "hidden", background: "#f5f7fa" }}>
                        <Image
                          src={collection.coverImage}
                          alt={collection.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                          quality={85}
                          placeholder={collection.blurDataUrl ? "blur" : "empty"}
                          blurDataURL={collection.blurDataUrl}
                          style={{ objectFit: "cover", objectPosition: "top center" }}
                          priority={idx < 4}
                          loading={idx < 4 ? "eager" : "lazy"}
                        />
                        <div style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.12) 100%)",
                          pointerEvents: "none"
                        }} />
                      </div>
                      <div className="vad-media-card-body" style={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <div>
                          <h3 className="vad-media-card-title" style={{ margin: 0, fontSize: "17.5px", color: "var(--vad-navy-950)", fontWeight: 800, lineHeight: 1.3 }}>
                            {collection.title}
                          </h3>
                          {collection.language && (
                            <div style={{
                              margin: "5px 0 0",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "var(--vad-navy-700, #1E3080)",
                              letterSpacing: "0.01em"
                            }}>
                              {collection.language}
                            </div>
                          )}
                        </div>

                        <div style={{
                          marginTop: "16px",
                          paddingTop: "12px",
                          borderTop: "1px solid #f1f5f9",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between"
                        }}>
                          <span style={{ fontSize: "12.5px", color: "#64748b", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "6px" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                            {collection.images.length} Clippings
                          </span>
                          <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--vad-gold-deep)" }}>
                            View Gallery &rarr;
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: NEWS ARTICLES */}
              {activeTab === "news" && (
                <div className="vad-media-grid">
                  {newsItems.map((item, idx) => (
                    <div
                      key={item.id}
                      style={{
                        background: "#ffffff",
                        borderRadius: "16px",
                        padding: "24px",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                        border: "1px solid rgba(0,0,0,0.06)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        transition: "all 0.3s cubic-bezier(0.22, 0.61, 0.36, 1)"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-6px)";
                        e.currentTarget.style.boxShadow = "0 16px 36px rgba(10, 16, 48, 0.12)";
                        e.currentTarget.style.borderColor = "rgba(10, 16, 48, 0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
                        e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)";
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                          {item.publisher ? (
                            <PublisherLogo publisher={item.publisher} />
                          ) : (
                            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--vad-gold-deep)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              {item.tag || "Press Coverage"}
                            </span>
                          )}
                          {item.date && (
                            <span style={{ fontSize: "12.5px", color: "var(--vad-ink-soft)", fontWeight: 600 }}>
                              {item.date}
                            </span>
                          )}
                        </div>
                        <h3 className="vad-media-card-title" style={{ margin: "0 0 10px", fontSize: "15.5px", fontWeight: 800, color: "var(--vad-navy-950)", lineHeight: 1.35 }}>
                          {item.title}
                        </h3>
                        <p style={{ margin: "0 0 18px", fontSize: "13.5px", color: "var(--vad-ink-soft)", lineHeight: 1.5, flex: 1 }}>
                          {item.description}
                        </p>
                      </div>

                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "var(--vad-gold-deep)",
                            textDecoration: "none",
                            marginTop: "8px"
                          }}
                        >
                          {item.linkLabel || "Read Article"}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: YOUTUBE */}
              {activeTab === "youtube" && (
                <div style={{ width: "100%" }}>
                  <VideoGalleryClient />
                </div>
              )}

              {/* TAB 5: CAMPAIGN POSTERS */}
              {activeTab === "posters" && (
                <div className="vad-posters-grid">
                  {campaignPosters.map((poster) => (
                    <div
                      key={poster.id}
                      onClick={() => setActivePoster(poster)}
                      className="vad-poster-card"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActivePoster(poster);
                        }
                      }}
                    >
                      <div className="vad-poster-card__img-wrap">
                        <Image
                          src={poster.posterImage}
                          alt={poster.alt || poster.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 290px"
                          quality={85}
                          className="vad-poster-img"
                          placeholder={poster.blurDataUrl ? "blur" : "empty"}
                          blurDataURL={poster.blurDataUrl}
                        />
                      </div>

                      <div className="vad-poster-card__body">
                        <div className="vad-poster-card__header-row">
                          <h3 className="vad-poster-card__title">
                            {poster.title}
                          </h3>
                          {poster.date && (
                            <span className="vad-poster-card__date-badge">
                              {poster.date}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

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
              <p style={{ margin: 0, color: "var(--vad-gold)", fontSize: "14px", fontWeight: 700 }}>{(activeEvent as any).date || ""}</p>
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
        </div>
      )}

      {/* 5. Campaign Poster Detail Modal */}
      {activePoster && (
        <div
          className="vad-poster-modal-overlay"
          onClick={() => setActivePoster(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="poster-modal-title"
        >
          <div
            className="vad-poster-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePoster(null)}
              aria-label="Close poster details"
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                background: "rgba(10, 16, 48, 0.75)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                color: "#ffffff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 30,
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                transition: "background 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--vad-navy-950, #0a1030)";
                e.currentTarget.style.transform = "scale(1.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(10, 16, 48, 0.75)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <CloseIcon />
            </button>

            {/* Top / Center: Large Centered Poster Graphic */}
            <div
              style={{
                width: "100%",
                background: "linear-gradient(180deg, #060b1e 0%, #0d163a 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "28px 20px 20px",
                minHeight: "500px",
                height: "64vh",
                maxHeight: "68vh",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={activePoster.posterImage}
                  alt={activePoster.alt || activePoster.title}
                  fill
                  quality={95}
                  style={{
                    objectFit: "contain",
                    filter: "drop-shadow(0 14px 32px rgba(0,0,0,0.55))",
                  }}
                  sizes="(max-width: 768px) 100vw, 700px"
                  priority
                />
              </div>
            </div>

            {/* Bottom: Compact Title & Description Content (No Category, No Extra Buttons) */}
            <div
              style={{
                padding: "16px 24px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                background: "#ffffff",
                borderTop: "1px solid rgba(0, 0, 0, 0.06)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                <h2
                  id="poster-modal-title"
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "var(--vad-navy-950, #0a1030)",
                    lineHeight: 1.3,
                    flex: 1,
                  }}
                >
                  {activePoster.title}
                </h2>
                {activePoster.date && (
                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--vad-gold-dark, #d97706)",
                      fontWeight: 700,
                      background: "rgba(217, 119, 6, 0.1)",
                      border: "1px solid rgba(217, 119, 6, 0.22)",
                      padding: "3px 10px",
                      borderRadius: "9999px",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {activePoster.date}
                  </span>
                )}
              </div>

              {activePoster.description && (
                <div
                  style={{
                    fontSize: "14px",
                    color: "var(--vad-ink-soft, #475569)",
                    lineHeight: 1.55,
                    whiteSpace: "pre-line",
                    margin: 0,
                  }}
                >
                  {activePoster.description}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
