"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import {
  talentTestStats as defaultStats,
  talentTestFaqs as defaultFaqs,
} from "@/data/vadaanya/TalentTestData";
import TalentTestGallery from "./TalentTestGallery";
import type {
  TalentTestGalleryItem,
  TalentTestPageData,
  TalentTestScholarData,
  TalentTestAboutImage,
  TalentTestAnnouncement,
} from "@/lib/sanity/queries";
import {
  fallbackTalentTestAnnouncements,
  fallbackHowItWorksSteps,
  fallbackEquityTiers,
  fallbackIitScholars,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

interface TalentTestPageProps {
  galleryAlbums?: TalentTestGalleryItem[];
  talentTestData?: TalentTestPageData;
}

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const BookOpenIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const stepIcons: React.ReactNode[] = [
  // 1. Free Registration - Pen
  <svg key="pen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </svg>,
  // 2. Study Material - Open Book
  <svg key="book" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>,
  // 3. OMR Examination - Exam Sheet
  <svg key="exam" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="m9 14 2 2 4-4" />
  </svg>,
  // 4. Fast OMR Scoring - Scan / Verification
  <svg key="scan" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <path d="m9 12 2 2 4-4" />
  </svg>,
  // 5. 3-Tier Awards - Trophy / Award
  <svg key="award" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1h10v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34" />
    <path d="M18 4H6v7a6 6 0 0 0 12 0V4Z" />
  </svg>,
  // 6. Long-Term Sponsorship - Graduation Cap
  <svg key="sponsor" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>,
];

function renderFormattedText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={idx}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function ScholarCard({ alum }: { alum: TalentTestScholarData }) {
  // Clean redundant student name if it was accidentally typed into the college field in CMS
  let collegeText = alum.college || "";
  if (collegeText.includes(" - ")) {
    const [firstPart, ...rest] = collegeText.split(" - ");
    const firstName = alum.name.trim().split(" ")[0].toLowerCase();
    const lastName = alum.name.trim().split(" ").slice(-1)[0].toLowerCase();
    if (firstPart.toLowerCase().includes(firstName) || firstPart.toLowerCase().includes(lastName)) {
      collegeText = rest.join(" - ").trim();
    }
  }
  if (collegeText.startsWith("IT - ")) {
    collegeText = collegeText.replace("IT - ", "IIT - ");
  }

  return (
    <div className="vad-scholar-card">
      {alum.imageUrl && (
        <div className="vad-scholar-card__image-wrap">
          <Image
            src={alum.imageUrl}
            alt={alum.name}
            fill
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 270px"
            style={{ objectFit: "cover" }}
            placeholder={alum.blurDataUrl ? "blur" : "empty"}
            blurDataURL={alum.blurDataUrl}
          />
        </div>
      )}

      <div className="vad-scholar-card__content">
        <div className="vad-scholar-card__rank-row">
          <span className="vad-scholar-card__air">{alum.airRank}</span>
          {alum.categoryRank && (
            <span className="vad-scholar-card__cat">{alum.categoryRank}</span>
          )}
        </div>

        <h3
          className="vad-scholar-card__name"
          style={{
            whiteSpace: "nowrap",
            fontSize: alum.name.length > 20 ? "13.5px" : alum.name.length > 16 ? "14.5px" : "15.5px",
          }}
        >
          {alum.name}
        </h3>
        <span className="vad-scholar-card__college">{collegeText}</span>
      </div>
    </div>
  );
}

export default function TalentTestPage({
  galleryAlbums = [],
  talentTestData,
}: TalentTestPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const scholarSwiperRef = useRef<SwiperType | null>(null);
  const mobileScholarSwiperRef = useRef<SwiperType | null>(null);
  const [activeAboutIdx, setActiveAboutIdx] = useState(0);

  const aboutEyebrow = talentTestData?.aboutEyebrow || "Our Annual Flagship Exam";
  const aboutTitle = talentTestData?.aboutTitle || "About the Talent Test";
  const aboutParagraphs =
    talentTestData?.aboutParagraphs && talentTestData.aboutParagraphs.length > 0
      ? talentTestData.aboutParagraphs
      : [
          "For five consecutive years (2021–2025), Vadaanya Janaa Society has conducted the **Vadaanya Talent Test** — an offline, standardized OMR examination provided 100% free of charge to thousands of government school students across Andhra Pradesh and Telangana.",
          "Over **15,000 students** have taken part, with **500+ deserving scholars** awarded district and mandal cash prizes, trophies, and continuous scholarships all the way from rural village classrooms to premier institutions like IITs and NITs.",
        ];

  const defaultAboutImages: TalentTestAboutImage[] = [
    {
      url: "/talent-test/talent_hero.jpg",
      alt: "Students taking the Vadaanya Talent Test",
    },
    {
      url: "/talent-test/talent_header_bg.jpg",
      alt: "Vadaanya Talent Test 2022 Felicitation Ceremony",
    },
    {
      url: "/talent-test/talent_test_image.JPG",
      alt: "Government school students writing the Talent Test",
    },
  ];

  const aboutImages =
    talentTestData?.aboutImages && talentTestData.aboutImages.length > 0
      ? talentTestData.aboutImages
      : defaultAboutImages;

  useEffect(() => {
    if (aboutImages.length <= 1) return;
    const timer = setInterval(() => {
      setActiveAboutIdx((prev) => (prev + 1) % aboutImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [aboutImages.length]);

  const prevAboutImage = () => {
    setActiveAboutIdx((prev) => (prev === 0 ? aboutImages.length - 1 : prev - 1));
  };

  const nextAboutImage = () => {
    setActiveAboutIdx((prev) => (prev + 1) % aboutImages.length);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const pdfUrl = "/talent-test/Vadaanya-talent-test-2021-2025.pdf";
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const announcementsList =
    talentTestData?.announcements && talentTestData.announcements.length > 0
      ? talentTestData.announcements
      : fallbackTalentTestAnnouncements;

  useEffect(() => {
    const updateVisible = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 992) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxAnnouncementIdx = Math.max(0, announcementsList.length - visibleCards);

  useEffect(() => {
    if (announcementIdx > maxAnnouncementIdx) {
      setAnnouncementIdx(maxAnnouncementIdx);
    }
  }, [maxAnnouncementIdx, announcementIdx]);

  const nextAnnouncement = () => {
    setAnnouncementIdx((prev) => (prev >= maxAnnouncementIdx ? 0 : prev + 1));
  };

  const prevAnnouncement = () => {
    setAnnouncementIdx((prev) => (prev <= 0 ? maxAnnouncementIdx : prev - 1));
  };

  useEffect(() => {
    if (maxAnnouncementIdx <= 0 || carouselPaused) return;
    const timer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev >= maxAnnouncementIdx ? 0 : prev + 1));
    }, 5500);
    return () => clearInterval(timer);
  }, [maxAnnouncementIdx, carouselPaused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) nextAnnouncement();
      else prevAnnouncement();
    }
    setTouchStartX(null);
  };

  const getAnnouncementImage = (item: TalentTestAnnouncement, index: number) => {
    if (item.image) {
      if (typeof item.image === "string") return item.image;
      if (typeof item.image === "object") {
        try {
          const u = urlFor(item.image).width(640).height(420).fit("crop").auto("format").quality(85).url();
          if (u) return u;
        } catch {
          if (item.image.asset?.url) return item.image.asset.url;
        }
      }
    }
    const defaultImages = [
      "/talent-test/talent_test_booklet_image.jpg",
      "/events/Digital Teaching at High School/01-1.jpg",
      "/Ashok.jpg",
      "/events/Brostal Event Vizag/01.jpg",
      "/talent_test.jpg",
    ];
    return defaultImages[index % defaultImages.length];
  };

  const getAnnouncementDate = (item: TalentTestAnnouncement, index: number) => {
    const defaultDates = ["01 Feb 2025", "15 Jan 2025", "20 Dec 2024", "05 Dec 2024", "18 Nov 2024"];
    if (item.date && /\d/.test(item.date)) return item.date;
    return defaultDates[index % defaultDates.length];
  };

  const statsList =
    talentTestData?.stats && talentTestData.stats.length > 0
      ? talentTestData.stats
      : defaultStats;

  const howItWorksSteps =
    talentTestData?.howItWorksSteps && talentTestData.howItWorksSteps.length > 0
      ? talentTestData.howItWorksSteps
      : fallbackHowItWorksSteps;

  const equityTiersList =
    talentTestData?.equityTiers && talentTestData.equityTiers.length > 0
      ? talentTestData.equityTiers
      : fallbackEquityTiers;

  const scholarsList =
    talentTestData?.iitScholars && talentTestData.iitScholars.length > 0
      ? talentTestData.iitScholars
      : fallbackIitScholars;

  const faqsList =
    talentTestData?.faqs && talentTestData.faqs.length > 0
      ? talentTestData.faqs
      : defaultFaqs;

  return (
    <div className="vad-talent-page">
      {/* ───────────────────────────────────────────────
          SECTION 1: TOP BANNER (WITH TALENT TEST BACKDROP IMAGE)
          ─────────────────────────────────────────────── */}
      <section
        className="vad-page-hero vad-section--deep"
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "clamp(58px, 5.5vw, 95px) 0 clamp(28px, 2.8vw, 48px)",
        }}
      >
        {/* Backdrop Layer 1: Blurred background fill (desktop only) */}
        <div className="vad-hero-bg-blur">
          <Image
            src="/talent-test/talent_test_banner.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
              filter: "blur(20px) brightness(0.40)",
              transform: "scale(1.15)",
            }}
          />
        </div>

        {/* Backdrop Layer 2: Main Image (Edge-to-edge on mobile, side padding + mask on desktop) */}
        <div className="vad-hero-bg-main" style={{ opacity: 0.82 }}>
          <Image
            src="/talent-test/talent_test_banner.jpeg"
            alt="Talent Test Header Background"
            fill
            priority
            sizes="100vw"
          />
        </div>

        {/* Backdrop Layer 3: Dark Vignette Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            background: "linear-gradient(90deg, rgba(6, 11, 34, 0.85) 0%, rgba(6, 11, 34, 0.65) 50%, rgba(6, 11, 34, 0.85) 100%)",
            pointerEvents: "none",
          }}
        />

        <div className="vad-container vad-page-hero__inner" style={{ position: "relative", zIndex: 3, textAlign: "center" }}>
          <span className="vad-eyebrow">The Flagship Initiative</span>
          <h1 className="vad-page-hero__title" style={{ textShadow: "0 2px 14px rgba(0, 0, 0, 0.6)" }}>
            Vadaanya <span className="vad-page-hero__accent">Talent Test</span>
          </h1>
          <p className="vad-page-hero__lead" style={{ color: "#ffffff", textShadow: "0 1px 8px rgba(0, 0, 0, 0.7)" }}>
            An annual standardized examination recognizing, rewarding, and nurturing rural government school talent from Class 9 to 10.
          </p>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 2: LATEST NEWS & UPDATES (CAROUSEL CARDS)
          ─────────────────────────────────────────────── */}
      <section className="vad-section vad-section--grey vad-news-section">
        <div className="vad-container">
          <div style={{ maxWidth: "1220px", margin: "0 auto" }}>
            {/* Section Header: Matches Website Standard Eyebrow & Title */}
            <div className="vad-head vad-head--center vad-head--light" style={{ marginBottom: "14px" }}>
              <span className="vad-eyebrow vad-eyebrow--center vad-eyebrow--dark">
                News &amp; Updates
              </span>
              <h2
                style={{
                  fontSize: "clamp(22px, 2.3vw, 32px)",
                  margin: "4px 0 0",
                  color: "var(--vad-navy-950)",
                  fontWeight: 800,
                  fontFamily: "var(--vad-font-display)",
                  lineHeight: 1.2,
                }}
              >
                Latest News &amp; Updates
              </h2>
            </div>

            {/* Carousel Row with Desktop Side Arrows & Cards Viewport */}
            <div
              className="vad-news-carousel"
              onMouseEnter={() => setCarouselPaused(true)}
              onMouseLeave={() => setCarouselPaused(false)}
            >
              {/* Desktop Left Arrow Button */}
              <button
                type="button"
                onClick={prevAnnouncement}
                aria-label="Previous announcement"
                className="vad-news-carousel__arrow vad-news-carousel__arrow--desktop vad-news-carousel__arrow--prev"
                disabled={announcementsList.length <= visibleCards}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Viewport & Track */}
              <div
                className="vad-news-carousel__viewport"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="vad-news-carousel__track"
                  style={{
                    transform: `translateX(-${announcementIdx * (100 / visibleCards)}%)`,
                    transition: "transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)",
                  }}
                >
                  {announcementsList.map((item, idx) => {
                    const imgSrc = getAnnouncementImage(item, idx);
                    const dateText = getAnnouncementDate(item, idx);
                    let href = item.href || "#booklet";
                    if (
                      href === "/talent-test/vadaanya-talent-test-booklet.pdf" ||
                      href === "/talent-test/Vadaanya-Q.Papers(2021-25)_Booklet.pdf" ||
                      (href.toLowerCase().includes("booklet") && href.toLowerCase().endsWith(".pdf"))
                    ) {
                      href = pdfUrl;
                    }
                    const isExternal = href.startsWith("http") || href.endsWith(".pdf");

                    return (
                      <div
                        key={`${idx}-${item.title}`}
                        className="vad-news-carousel__slide"
                        style={{
                          flex: `0 0 ${100 / visibleCards}%`,
                          maxWidth: `${100 / visibleCards}%`,
                        }}
                      >
                        <a
                          href={href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className="vad-news-card-link"
                        >
                          <article className="vad-news-card">
                            {/* Card Content */}
                            <div className="vad-news-card__body">
                              <div className="vad-news-card__header">
                                <span className="vad-news-card__date">
                                  {dateText}
                                </span>
                                <span className="vad-news-card__badge">
                                  <span className="vad-news-card__red-dot" />
                                  Update
                                </span>
                              </div>
                              <h3 className="vad-news-card__title">
                                {item.title}
                              </h3>
                              <p className="vad-news-card__desc">
                                {item.desc}
                              </p>

                              {/* Card Action Link & Arrow */}
                              <div className="vad-news-card__action-row">
                                <span className="vad-news-card__action-btn" aria-hidden="true">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                  </svg>
                                </span>
                                {item.actionLabel && (
                                  <span className="vad-news-card__action-label">
                                    {item.actionLabel}
                                  </span>
                                )}
                              </div>
                            </div>
                          </article>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Desktop Right Arrow Button */}
              <button
                type="button"
                onClick={nextAnnouncement}
                aria-label="Next announcement"
                className="vad-news-carousel__arrow vad-news-carousel__arrow--desktop vad-news-carousel__arrow--next"
                disabled={announcementsList.length <= visibleCards}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* Bottom Controls: Dots on desktop, and Arrows + Dots on mobile */}
            <div className="vad-news-carousel__controls">
              {/* Mobile Prev Arrow */}
              <button
                type="button"
                onClick={prevAnnouncement}
                aria-label="Previous announcement"
                className="vad-news-carousel__arrow vad-news-carousel__arrow--mobile vad-news-carousel__arrow--prev"
                disabled={announcementsList.length <= visibleCards}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Pagination Dots */}
              {maxAnnouncementIdx > 0 && (
                <div className="vad-news-carousel__dots">
                  {Array.from({ length: maxAnnouncementIdx + 1 }).map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => setAnnouncementIdx(dotIdx)}
                      className={`vad-news-carousel__dot ${dotIdx === announcementIdx ? "is-active" : ""}`}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Mobile Next Arrow */}
              <button
                type="button"
                onClick={nextAnnouncement}
                aria-label="Next announcement"
                className="vad-news-carousel__arrow vad-news-carousel__arrow--mobile vad-news-carousel__arrow--next"
                disabled={announcementsList.length <= visibleCards}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 3: ABOUT THE TALENT TEST
          ─────────────────────────────────────────────── */}
      <section className="vad-section" style={{ padding: "46px 0 54px", backgroundColor: "#ffffff" }}>
        <div className="vad-container">
          <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
            {/* Split Row: Left Details & Right Full-Span Image Slideshow */}
            <div className="vad-about-split">
              {/* Left Column: Text */}
              <div>
                <span className="vad-eyebrow vad-eyebrow--dark">{aboutEyebrow}</span>
                <h2
                  style={{
                    fontSize: "clamp(22px, 2.4vw, 32px)",
                    margin: "10px 0 12px",
                    color: "var(--vad-navy-950)",
                    fontWeight: 800,
                    fontFamily: "var(--vad-font-display)",
                    lineHeight: 1.15,
                  }}
                >
                  {aboutTitle}
                </h2>
                <div
                  style={{
                    width: "50px",
                    height: "3px",
                    background: "var(--vad-gold-deep)",
                    margin: "14px 0 20px",
                    borderRadius: "2px",
                  }}
                />

                {aboutParagraphs.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    style={{
                      fontSize: "16px",
                      color: "var(--vad-ink)",
                      lineHeight: 1.75,
                      marginBottom: pIdx === aboutParagraphs.length - 1 ? 0 : "16px",
                    }}
                  >
                    {renderFormattedText(para)}
                  </p>
                ))}
              </div>

              {/* Right Column: Shuffling Fade-in/out Image Slideshow */}
              <div style={{ position: "relative", width: "100%" }}>
                <div className="vad-about-slideshow">
                  {aboutImages.map((img, imgIdx) => (
                    <div
                      key={imgIdx}
                      className={`vad-about-slideshow__slide ${imgIdx === activeAboutIdx ? "is-active" : ""}`}
                    >
                      <Image
                        src={img.url}
                        alt={img.alt || "Vadaanya Talent Test photo"}
                        fill
                        priority={imgIdx === 0}
                        sizes="(max-width: 768px) 100vw, 600px"
                        placeholder={img.blurDataUrl ? "blur" : "empty"}
                        blurDataURL={img.blurDataUrl}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </div>

                {/* Subtle Manual Arrows & Progress Dots Placed Outside the Image Box */}
                {aboutImages.length > 1 && (
                  <div className="vad-about-slideshow-nav">
                    <button
                      type="button"
                      onClick={prevAboutImage}
                      aria-label="Previous photo"
                      className="vad-about-slideshow-nav__btn"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>

                    <div className="vad-about-slideshow-nav__dots">
                      {aboutImages.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveAboutIdx(idx)}
                          aria-label={`Go to slide ${idx + 1}`}
                          className={`vad-about-slideshow-nav__dot ${idx === activeAboutIdx ? "is-active" : ""}`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={nextAboutImage}
                      aria-label="Next photo"
                      className="vad-about-slideshow-nav__btn"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 3: 4 STAT BADGES (DARK BLUE SECTION)
          ─────────────────────────────────────────────── */}
      <section className="vad-section vad-section--deep" style={{ padding: "26px 0" }}>
        <div className="vad-container">
          <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
            <div className="vad-tt-stats__grid">
              {statsList.map((st, i) => (
                <div key={i} className="vad-tt-stats__card">
                  <span className="vad-tt-stats__num" style={{ color: "var(--vad-gold, #f2a712)" }}>
                    {st.value}
                  </span>
                  <span className="vad-tt-stats__lbl" style={{ color: "#ffffff" }}>
                    {st.label}
                  </span>
                  <span className="vad-tt-stats__sub" style={{ color: "#94a3b8" }}>
                    {st.sublabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 4: 5-YEAR QUESTION BOOKLET (TALLER IMAGE HEIGHT WITH COMPLETE ARTWORK)
          ─────────────────────────────────────────────── */}
      <section id="booklet" className="vad-section vad-section--paper" style={{ padding: "60px 0" }}>
        <div className="vad-container">
          <div
            style={{
              maxWidth: "1060px",
              margin: "0 auto",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "40px",
            }}
          >
            {/* Left Column: Booklet Details */}
            <div style={{ flex: "1 1 480px" }}>
              <span className="vad-eyebrow vad-eyebrow--dark">OFFICIAL QUESTION BOOKLET</span>
              <h2
                style={{
                  fontSize: "clamp(14px, 2.1vw, 29px)",
                  margin: "10px 0 12px",
                  color: "var(--vad-navy-950)",
                  fontWeight: 800,
                  fontFamily: "var(--vad-font-display)",
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                }}
              >
                5-Year Question Paper Booklet (2021–2025)
              </h2>
              <div
                style={{
                  width: "50px",
                  height: "3px",
                  background: "var(--vad-gold-deep)",
                  margin: "14px 0 20px",
                  borderRadius: "2px",
                }}
              />
              <p style={{ fontSize: "16px", color: "var(--vad-ink)", lineHeight: 1.75, marginBottom: "18px" }}>
                We compiled five years of Vadaanya Talent Test question papers into a single 100-page bilingual booklet. It helps students from Classes 6 to 9 prepare for the Talent Test, which is conducted for students of Classes 9 and 10.
              </p>

              <div className="vad-tt-booklet__features" style={{ marginBottom: "24px" }}>
                <div className="vad-tt-booklet__feat" style={{ color: "var(--vad-ink)", fontSize: "14.5px" }}>
                  <span className="vad-tt-booklet__feat-icon">✓</span>
                  <span>5 Complete Exam Editions (2021, 2022, 2023, 2024, 2025)</span>
                </div>
                <div className="vad-tt-booklet__feat" style={{ color: "var(--vad-ink)", fontSize: "14.5px" }}>
                  <span className="vad-tt-booklet__feat-icon">✓</span>
                  <span>Bilingual Questions &amp; Answer Keys (Telugu &amp; English)</span>
                </div>
                <div className="vad-tt-booklet__feat" style={{ color: "var(--vad-ink)", fontSize: "14.5px" }}>
                  <span className="vad-tt-booklet__feat-icon">✓</span>
                  <span>Syllabus covering Logical Reasoning, Mental Ability, Mathematics &amp; Science</span>
                </div>
              </div>

              <div className="vad-tt-booklet__btn-row">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vad-btn vad-btn--gold"
                >
                  <BookOpenIcon />
                  <span>Open Booklet↗</span>
                </a>

                <a
                  href={pdfUrl}
                  download="Vadaanya-talent-test-2021-2025.pdf"
                  className="vad-btn vad-btn--navy"
                >
                  <DownloadIcon />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>

            {/* Right Column: Booklet Cover Artwork */}
            <div style={{ flex: "1 1 290px", maxWidth: "310px", width: "100%", margin: "0 auto" }}>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", width: "100%", textDecoration: "none" }}
                title="Click to Open 5-Year Question Papers Booklet in a new tab"
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1236 / 1609",
                    borderRadius: "18px",
                    overflow: "hidden",
                    boxShadow: "0 16px 36px rgba(0, 0, 0, 0.14)",
                    border: "1px solid rgba(0, 0, 0, 0.08)",
                    transition: "transform 0.35s ease, box-shadow 0.35s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.025) translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 22px 44px rgba(10, 16, 48, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1) translateY(0)";
                    e.currentTarget.style.boxShadow = "0 16px 36px rgba(0, 0, 0, 0.14)";
                  }}
                >
                  <Image
                    src="/talent-test/talent_test_booklet_image.jpg"
                    alt="Vadaanya Talent Test 5-Year Question Papers Booklet"
                    fill
                    sizes="(max-width: 768px) 100vw, 310px"
                    priority
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 5: HOW THE TEST WORKS (GREY BACKGROUND, CONCISE 6-STEP CARDS)
          ─────────────────────────────────────────────── */}
      <section id="how-it-works" className="vad-section vad-how-it-works-section" style={{ padding: "40px 0 44px", background: "#edf0f6" }}>
        <div className="vad-container">
          <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
            <div className="vad-head vad-head--center vad-head--light" style={{ marginBottom: "32px" }}>
              <span className="vad-eyebrow vad-eyebrow--center vad-eyebrow--dark">
                {talentTestData?.howItWorksEyebrow || "THE ANNUAL CYCLE"}
              </span>
              <h2
                style={{
                  fontSize: "clamp(24px, 2.6vw, 36px)",
                  margin: "10px 0 0",
                  color: "var(--vad-navy-950)",
                  fontWeight: 800,
                  fontFamily: "var(--vad-font-display)",
                  lineHeight: 1.2,
                }}
              >
                {talentTestData?.howItWorksHeading || "How the Talent Test Works"}
              </h2>
            </div>

            {/* Desktop View: 6 Elevated Cards Grid */}
            <div className="vad-how-it-works-grid">
              {howItWorksSteps.map((item, idx) => (
                <div key={idx} className="vad-step-card">
                  <div className="vad-step-card__header">
                    <span className="vad-step-card__badge">
                      Step {item.step}
                    </span>
                    <span className="vad-step-card__icon" aria-hidden="true">
                      {stepIcons[idx % stepIcons.length]}
                    </span>
                  </div>
                  <h3 className="vad-step-card__title">
                    {item.title}
                  </h3>
                  <p className="vad-step-card__desc">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Mobile View: Concise 6-Step List (Minimal scrolling) */}
            <div className="vad-how-it-works-mobile">
              {howItWorksSteps.map((item, idx) => (
                <div key={idx} className="vad-how-it-works-mobile__item">
                  <span className="vad-how-it-works-mobile__step">{item.step}</span>
                  <div className="vad-how-it-works-mobile__content">
                    <strong>{item.title}</strong>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 6: RECOGNITION BUILT FOR EQUITY (ELEVATED CARDS ON SOFT GREY)
          ─────────────────────────────────────────────── */}
      <section id="equity" className="vad-section vad-equity-section" style={{ padding: "54px 0 52px" }}>
        <div className="vad-container">
          <div style={{ maxWidth: "1220px", margin: "0 auto" }}>
            <div className="vad-head" style={{ textAlign: "left", marginBottom: "30px" }}>
              <span className="vad-eyebrow vad-eyebrow--dark">
                {talentTestData?.equityEyebrow || "FAIR EVALUATION"}
              </span>
              <h2
                style={{
                  fontSize: "clamp(24px, 2.6vw, 36px)",
                  margin: "10px 0 14px",
                  color: "var(--vad-navy-950, #0a1030)",
                  fontWeight: 800,
                  fontFamily: "var(--vad-font-display)",
                  lineHeight: 1.2,
                }}
              >
                {talentTestData?.equityHeading || "Recognition, Built for Equity"}
              </h2>
              <div
                style={{
                  width: "50px",
                  height: "3px",
                  background: "var(--vad-gold-deep)",
                  margin: "12px 0 16px",
                  borderRadius: "2px",
                }}
              />
              <p style={{ fontSize: "16px", color: "var(--vad-ink-soft, #475569)", lineHeight: 1.75, margin: 0, maxWidth: "860px" }}>
                {talentTestData?.equityDescription || "Introduced in 2024, this four-tier model recognises that a strong score in a drought-prone mandal deserves the same respect as one from a resource-rich area. Roughly 280 non-overlapping prizes and digital certificates for all participants are awarded each cycle."}
              </p>
            </div>

            {/* Elevated Unified 3-Tier Cards */}
            <div className="vad-equity-grid">
              {equityTiersList.map((tierItem, idx) => (
                <div key={idx} className="vad-equity-tier-card">
                  <div className="vad-equity-tier-card__bar" />
                  <div>
                    <div className="vad-equity-tier-card__header-row">
                      <div className="vad-equity-tier-card__badge">
                        {tierItem.tier}
                      </div>
                      {tierItem.medal && (
                        <span className="vad-equity-tier-card__medal-icon" title={tierItem.tier}>
                          {tierItem.medal}
                        </span>
                      )}
                    </div>
                    <h3 className="vad-equity-tier-card__title">
                      {tierItem.title}
                    </h3>
                    <p className="vad-equity-tier-card__desc">
                      {tierItem.desc}
                    </p>
                  </div>

                  <div className="vad-equity-tier-card__reward-box">
                    <span className="vad-equity-tier-card__reward-label">
                      Reward
                    </span>
                    <div className="vad-equity-tier-card__reward-val">
                      {tierItem.rewardVal}
                    </div>
                    {tierItem.rewardSub && (
                      <span className="vad-equity-tier-card__reward-sub">
                        {tierItem.rewardSub}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 7: HALL OF FAME (IIT RANKERS)
          ─────────────────────────────────────────────── */}
      <section id="hall-of-fame" className="vad-section vad-section--deep vad-tt-fame" style={{ padding: "22px 0 38px" }}>
        <div id="alumni" style={{ position: "relative", top: "-80px" }} />
        <div className="vad-container">
          <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
            <div className="vad-head vad-head--center" style={{ marginBottom: "24px" }}>
              <span className="vad-eyebrow vad-eyebrow--center" style={{ color: "var(--vad-gold, #f2a712)" }}>
                {talentTestData?.iitEyebrow || "NATIONAL ACADEMIC SUCCESS"}
              </span>
              <h2
                style={{
                  fontSize: "clamp(24px, 2.6vw, 36px)",
                  margin: "6px 0 0",
                  color: "#ffffff",
                  fontWeight: 800,
                  fontFamily: "var(--vad-font-display)",
                  lineHeight: 1.2,
                }}
              >
                {talentTestData?.iitHeading || "From Government Classrooms to IITs"}
              </h2>
            </div>

            {/* Mobile View (< 768px): Always a carousel just like home page success stories */}
            <div className="vad-scholars-mobile-carousel">
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={12}
                slidesPerView={1.3}
                loop={false}
                autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                onSwiper={(swiper) => {
                  mobileScholarSwiperRef.current = swiper;
                }}
                breakpoints={{
                  0: { slidesPerView: 1.25, spaceBetween: 10 },
                  440: { slidesPerView: 1.8, spaceBetween: 12 },
                  600: { slidesPerView: 2.3, spaceBetween: 14 },
                }}
                className="vad-scholars-swiper"
              >
                {scholarsList.map((alum, idx) => (
                  <SwiperSlide key={`mob-${idx}`} style={{ height: "auto" }}>
                    <ScholarCard alum={alum} />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Mobile Navigation Controls */}
              <div className="vad-scholars-nav vad-scholars-nav--mobile">
                <button
                  type="button"
                  onClick={() => {
                    if (mobileScholarSwiperRef.current?.isBeginning) {
                      mobileScholarSwiperRef.current.slideTo(scholarsList.length - 1);
                    } else {
                      mobileScholarSwiperRef.current?.slidePrev();
                    }
                  }}
                  aria-label="Previous scholar"
                  className="vad-scholars-nav-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (mobileScholarSwiperRef.current?.isEnd) {
                      mobileScholarSwiperRef.current.slideTo(0);
                    } else {
                      mobileScholarSwiperRef.current?.slideNext();
                    }
                  }}
                  aria-label="Next scholar"
                  className="vad-scholars-nav-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Desktop View (>= 768px): Normal cards if <= 4, Carousel if >= 5 */}
            <div className="vad-scholars-desktop-view">
              {scholarsList.length <= 4 ? (
                <div className={`vad-scholar-grid vad-scholar-grid--${scholarsList.length}`}>
                  {scholarsList.map((alum, idx) => (
                    <ScholarCard key={`desk-${idx}`} alum={alum} />
                  ))}
                </div>
              ) : (
                <div className="vad-scholars-carousel-wrapper" style={{ position: "relative", width: "100%" }}>
                  <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={18}
                    slidesPerView={4}
                    loop={false}
                    autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    onSwiper={(swiper) => {
                      scholarSwiperRef.current = swiper;
                    }}
                    breakpoints={{
                      768: { slidesPerView: 3, spaceBetween: 16 },
                      1024: { slidesPerView: 4, spaceBetween: 18 },
                    }}
                    className="vad-scholars-swiper"
                  >
                    {scholarsList.map((alum, idx) => (
                      <SwiperSlide key={`desk-slide-${idx}`} style={{ height: "auto" }}>
                        <ScholarCard alum={alum} />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Navigation Controls */}
                  <div className="vad-scholars-nav">
                    <button
                      type="button"
                      onClick={() => {
                        if (scholarSwiperRef.current?.isBeginning) {
                          scholarSwiperRef.current.slideTo(scholarsList.length - 1);
                        } else {
                          scholarSwiperRef.current?.slidePrev();
                        }
                      }}
                      aria-label="Previous scholar"
                      className="vad-scholars-nav-btn"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (scholarSwiperRef.current?.isEnd) {
                          scholarSwiperRef.current.slideTo(0);
                        } else {
                          scholarSwiperRef.current?.slideNext();
                        }
                      }}
                      aria-label="Next scholar"
                      className="vad-scholars-nav-btn"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 8: FOLDER-BASED PHOTO ARCHIVES (LIGHT PAPER)
          ─────────────────────────────────────────────── */}
      <TalentTestGallery albums={galleryAlbums} />

      {/* ───────────────────────────────────────────────
          SECTION 9: 2026 PRE-REGISTRATION CTA (Temporarily commented out for future use)
          ─────────────────────────────────────────────── */}
      {/*
      <section id="register" className="vad-section vad-section--deep vad-tt-support" style={{ padding: "60px 0" }}>
        <div className="vad-container">
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <span className="vad-eyebrow" style={{ color: "var(--vad-gold, #f2a712)", justifyContent: "center" }}>
              2026 REGISTRATIONS
            </span>
            <h2
              style={{
                fontSize: "clamp(24px, 2.6vw, 36px)",
                margin: "10px 0 14px",
                color: "#ffffff",
                fontWeight: 800,
                fontFamily: "var(--vad-font-display)",
                lineHeight: 1.2,
              }}
            >
              Talent Test 2026 Preparation & Details
            </h2>
            <p className="vad-lead" style={{ color: "#cbd5e1", fontSize: "16px", maxWidth: "660px", margin: "0 auto 24px", lineHeight: 1.6 }}>
              100% free for government school students from Class 9 to 10. Access exam syllabi, 5-year solved question banks, and reach out to our team for test center inquiries.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", marginBottom: "24px" }}>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="vad-btn vad-btn--gold"
              >
                <BookOpenIcon />
                <span>Open Solved Booklet (PDF) ↗</span>
              </a>
              <Link
                href="/contact"
                className="vad-btn vad-btn--outline"
              >
                <span>Contact Us for Details →</span>
              </Link>
            </div>

            <div className="vad-tt-support__legal-note" style={{ color: "#94a3b8", justifyContent: "center" }}>
              <span>🛡️ 80G &amp; 12A Certified NGO</span>
              <span>• NGO Darpan ID: TS/2024/0396868</span>
              <span>• CSR ID: CSR00071897</span>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* ───────────────────────────────────────────────
          SECTION 10: FAQS (GREYER BACKGROUND, WHITE ACCORDIONS)
          ─────────────────────────────────────────────── */}
      <section id="faqs" className="vad-section vad-tt-faqs" style={{ padding: "40px 0 54px", borderTop: "1px solid #e2e8f0", background: "#edf0f6" }}>
        <div className="vad-container">
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div className="vad-head vad-head--center vad-head--light" style={{ marginBottom: "26px" }}>
              <h2
                style={{
                  fontSize: "clamp(24px, 2.6vw, 36px)",
                  margin: "0 0 12px",
                  color: "var(--vad-navy-950)",
                  fontWeight: 800,
                  fontFamily: "var(--vad-font-display)",
                  lineHeight: 1.2,
                }}
              >
                {talentTestData?.faqHeading || "Frequently Asked Questions"}
              </h2>
            </div>

            <div className="vad-tt-faqs__list">
              {faqsList.map((faq, idx) => (
                <div
                  key={idx}
                  className={`vad-tt-faqs__item vad-tt-faqs__item--light ${openFaqIndex === idx ? "is-open" : ""}`}
                >
                  <button
                    className="vad-tt-faqs__question-btn vad-tt-faqs__question-btn--light"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={openFaqIndex === idx}
                  >
                    <span style={{ color: "var(--vad-ink, #0a1030)", fontSize: "16px", fontWeight: 700 }}>{faq.question}</span>
                    <span className="vad-tt-faqs__chevron">
                      <ChevronDownIcon />
                    </span>
                  </button>
                  {openFaqIndex === idx && (
                    <div className="vad-tt-faqs__answer">
                      <p style={{ color: "var(--vad-ink-soft, #475569)", fontSize: "15px", lineHeight: 1.7 }}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
