"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import type { TalentTestGalleryItem } from "@/lib/sanity/queries";

interface TalentTestGalleryProps {
  albums: TalentTestGalleryItem[];
}

const FolderIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
  </svg>
);

const ImageIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function TalentTestGallery({ albums = [] }: TalentTestGalleryProps) {
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedSubCat, setSelectedSubCat] = useState<string>("all");
  const [activeAlbum, setActiveAlbum] = useState<TalentTestGalleryItem | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  // Available Years
  const years = ["all", "2024", "2023", "2022", "2021"];

  // Filter logic
  const filteredAlbums = albums.filter((album) => {
    const matchesYear = selectedYear === "all" || album.year === selectedYear || album.title.includes(selectedYear);
    const matchesSubCat =
      selectedSubCat === "all" ||
      (album.subCategory && album.subCategory.toLowerCase().includes(selectedSubCat.toLowerCase())) ||
      album.title.toLowerCase().includes(selectedSubCat.toLowerCase());
    return matchesYear && matchesSubCat;
  });

  // Modal keyboard navigation
  useEffect(() => {
    if (!activeAlbum) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveAlbum(null);
      if (e.key === "ArrowLeft") {
        setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : activeAlbum.images.length - 1));
      }
      if (e.key === "ArrowRight") {
        setActivePhotoIndex((prev) => (prev < activeAlbum.images.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeAlbum]);

  const openAlbum = (album: TalentTestGalleryItem) => {
    setActiveAlbum(album);
    setActivePhotoIndex(0);
  };

  return (
    <section id="gallery" className="vad-section vad-section--paper vad-tt-gallery">
      <div className="vad-container">
        {/* Section Header */}
        <div className="vad-head vad-head--center vad-head--light" style={{ marginBottom: "36px" }}>
          <span className="vad-eyebrow vad-eyebrow--center vad-eyebrow--dark">HISTORICAL ARCHIVES · 2021–2024</span>
          <h2>Exam Days & Prize Distribution Gallery</h2>
          <p className="vad-lead">
            Explore photo archives from every edition of the Srinivasa Ramanujan Talent Test — from energetic OMR exam halls to grand state felicitation ceremonies.
          </p>
        </div>

        {/* Year Filter Tabs */}
        <div className="vad-tt-gallery__filters">
          <div className="vad-tt-gallery__tabs" role="tablist" aria-label="Filter by year">
            {years.map((yr) => (
              <button
                key={yr}
                role="tab"
                aria-selected={selectedYear === yr}
                className={`vad-filter-btn ${selectedYear === yr ? "is-active" : ""}`}
                onClick={() => setSelectedYear(yr)}
              >
                <FolderIcon />
                <span>{yr === "all" ? "All Archives" : `${yr} Edition`}</span>
              </button>
            ))}
          </div>

          {/* Sub-Category Filter Chips */}
          <div className="vad-tt-gallery__sub-chips">
            <button
              className={`vad-tt-gallery__chip ${selectedSubCat === "all" ? "is-active" : ""}`}
              onClick={() => setSelectedSubCat("all")}
            >
              All Types
            </button>
            <button
              className={`vad-tt-gallery__chip ${selectedSubCat === "exam" ? "is-active" : ""}`}
              onClick={() => setSelectedSubCat("exam")}
            >
              Exam Day & Centers
            </button>
            <button
              className={`vad-tt-gallery__chip ${selectedSubCat === "prize" ? "is-active" : ""}`}
              onClick={() => setSelectedSubCat("prize")}
            >
              Prize Distributions
            </button>
          </div>
        </div>

        {/* Folder / Album Grid */}
        {filteredAlbums.length === 0 ? (
          <div className="vad-tt-gallery__empty">
            <p>No albums found for this filter. Please select "All Archives".</p>
          </div>
        ) : (
          <div className="vad-tt-gallery__grid">
            {filteredAlbums.map((album) => {
              const photoCount = (album.images && album.images.length > 0) ? album.images.length : 1;
              return (
                <article
                  key={album.id}
                  className="vad-tt-gallery__card"
                  onClick={() => openAlbum(album)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openAlbum(album);
                    }
                  }}
                  aria-label={`Open album: ${album.title}`}
                >
                  {/* Folder Cover */}
                  <div className="vad-tt-gallery__cover-box">
                    <Image
                      src={album.coverImage}
                      alt={album.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="vad-tt-gallery__cover-img"
                      unoptimized
                    />
                    <div className="vad-tt-gallery__cover-overlay" />

                    {/* Count Badge */}
                    <div className="vad-tt-gallery__badge">
                      <ImageIcon />
                      <span>{photoCount} Photos</span>
                    </div>

                    {/* Year Tag */}
                    {album.year && (
                      <div className="vad-tt-gallery__year-tag">
                        {album.year}
                      </div>
                    )}
                  </div>

                  {/* Album Info */}
                  <div className="vad-tt-gallery__info">
                    <span className="vad-tt-gallery__date">{album.date || "Talent Test Edition"}</span>
                    <h3 className="vad-tt-gallery__title">{album.title}</h3>
                    <div className="vad-tt-gallery__cta-row">
                      <span className="vad-tt-gallery__view-link">
                        Browse Album Photos <span>→</span>
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeAlbum && (
        <div
          className="vad-lightbox-modal"
          role="dialog"
          aria-modal="true"
          aria-label={activeAlbum.title}
          onClick={() => setActiveAlbum(null)}
        >
          <div
            className="vad-lightbox-modal__container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="vad-lightbox-modal__toolbar">
              <div className="vad-lightbox-modal__info">
                <span className="vad-lightbox-modal__counter">
                  Photo {activePhotoIndex + 1} of {activeAlbum.images.length || 1}
                </span>
                <h4 className="vad-lightbox-modal__album-title">{activeAlbum.title}</h4>
              </div>
              <button
                onClick={() => setActiveAlbum(null)}
                className="vad-lightbox-modal__close-btn"
                aria-label="Close Lightbox"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Stage / Main Image */}
            <div className="vad-lightbox-modal__stage">
              {activeAlbum.images && activeAlbum.images.length > 1 && (
                <button
                  onClick={() =>
                    setActivePhotoIndex((prev) =>
                      prev > 0 ? prev - 1 : activeAlbum.images.length - 1
                    )
                  }
                  className="vad-lightbox-modal__nav vad-lightbox-modal__nav--prev"
                  aria-label="Previous photo"
                >
                  <ChevronLeft />
                </button>
              )}

              <div className="vad-lightbox-modal__image-wrap">
                <Image
                  src={
                    activeAlbum.images && activeAlbum.images.length > 0
                      ? activeAlbum.images[activePhotoIndex]
                      : activeAlbum.coverImage
                  }
                  alt={`${activeAlbum.title} - Photo ${activePhotoIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="vad-lightbox-modal__img"
                  priority
                  unoptimized
                />
              </div>

              {activeAlbum.images && activeAlbum.images.length > 1 && (
                <button
                  onClick={() =>
                    setActivePhotoIndex((prev) =>
                      prev < activeAlbum.images.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="vad-lightbox-modal__nav vad-lightbox-modal__nav--next"
                  aria-label="Next photo"
                >
                  <ChevronRight />
                </button>
              )}
            </div>

            {/* Thumbnail Strip */}
            {activeAlbum.images && activeAlbum.images.length > 1 && (
              <div className="vad-lightbox-modal__thumbs">
                {activeAlbum.images.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    className={`vad-lightbox-modal__thumb-btn ${idx === activePhotoIndex ? "is-active" : ""}`}
                    onClick={() => setActivePhotoIndex(idx)}
                    aria-label={`Go to photo ${idx + 1}`}
                  >
                    <Image
                      src={imgSrc}
                      alt={`Thumb ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="vad-lightbox-modal__thumb-img"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
