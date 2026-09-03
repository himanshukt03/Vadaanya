"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import {
  talentTestStats,
  iitAlumni,
  talentTestFaqs,
} from "@/data/vadaanya/TalentTestData";
import TalentTestRegistrationModal from "./TalentTestRegistrationModal";
import TalentTestGallery from "./TalentTestGallery";
import type { TalentTestGalleryItem } from "@/lib/sanity/queries";

interface TalentTestPageProps {
  galleryAlbums?: TalentTestGalleryItem[];
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


const conciseHowItWorks = [
  {
    step: "01",
    title: "Free Registration",
    desc: "Government school students register online or via school headmasters at zero fee.",
  },
  {
    step: "02",
    title: "Study Material",
    desc: "Free 100-page bilingual analytical reasoning booklets & solved previous year papers.",
  },
  {
    step: "03",
    title: "OMR Examination",
    desc: "Standardized offline exam held at designated government mandal examination centers.",
  },
  {
    step: "04",
    title: "Fast OMR Scoring",
    desc: "Automated optical scanner evaluation ensuring 100% fair, transparent, same-day verification.",
  },
  {
    step: "05",
    title: "3-Tier Awards",
    desc: "District, mandal, and school toppers recognized with direct cash awards, trophies, and medals.",
  },
  {
    step: "06",
    title: "Long-Term Sponsorship",
    desc: "Top scholars receive intermediate college tuition, IIT-JEE coaching fees, laptops, and mentorship.",
  },
];

export default function TalentTestPage({ galleryAlbums = [] }: TalentTestPageProps) {
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const pdfUrl = "/talent-test/vadaanya-talent-test-booklet.pdf";
  const announcementsSwiperRef = useRef<SwiperType | null>(null);

  const liveAnnouncements = [
    {
      id: "booklet",
      title: "5-Year Solved Booklet (2021–2025)",
      desc: "Official 100-page bilingual question papers & solutions booklet.",
      actionLabel: "Open PDF Booklet in New Tab ↗",
      actionType: "link" as const,
      href: pdfUrl,
    },
    {
      id: "registration",
      title: "2026 Pre-Registrations Open",
      desc: "Free entry for government school students from Class 6 to 10.",
      actionLabel: "Pre-Register Free →",
      actionType: "modal" as const,
    },
    {
      id: "iit-scholars",
      title: "3 Scholars in Premier IITs",
      desc: "Jugesh (AIR 377), Thulasi (AIR 2619), & Yaswanth (AIR 3563) secured national ranks.",
      actionLabel: "View IIT Alumni →",
      actionType: "anchor" as const,
      href: "#alumni",
    },
    {
      id: "state-awards",
      title: "State-Level Merit Felicitations",
      desc: "Top 10 rankers receive merit laptops, certificates & cash scholarship awards.",
      actionLabel: "View Photo Archives →",
      actionType: "anchor" as const,
      href: "#gallery",
    },
    {
      id: "pattern",
      title: "Standardized OMR Exam Pattern",
      desc: "Simulates national competitive entrance exams for government school students.",
      actionLabel: "How It Works →",
      actionType: "anchor" as const,
      href: "#how-it-works",
    },
  ];

  return (
    <div className="vad-talent-page">
      {/* ───────────────────────────────────────────────
          SECTION 1: TOP BANNER (SOLID DEEP NAVY - NO IMAGE BACKDROP)
          ─────────────────────────────────────────────── */}
      <section
        className="vad-page-hero vad-section--deep"
        style={{
          padding: "clamp(55px, 4.5vw, 75px) 0 clamp(24px, 2vw, 32px)",
        }}
      >
        <div className="vad-container vad-page-hero__inner">
          <span className="vad-eyebrow">The Flagship Initiative · 2021–2025</span>
          <h1 className="vad-page-hero__title">
            Vadaanya <span className="vad-page-hero__accent">Talent Test</span>
          </h1>
          <p className="vad-page-hero__lead" style={{ color: "#ffffff" }}>
            An annual standardized examination recognizing, rewarding, and nurturing rural government school talent from Class 6 to 10.
          </p>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 2: ABOUT THE TALENT TEST + HORIZONTAL ANNOUNCEMENTS BAR
          ─────────────────────────────────────────────── */}
      <section className="vad-section vad-section--paper" style={{ padding: "60px 0" }}>
        <div className="vad-container">
          <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
            {/* Split Row: Left Details & Right Full-Span Image */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "48px" }}>
              {/* Left Column: Decreased / Concise Text & Single CTA */}
              <div style={{ flex: "1 1 480px" }}>
                <span className="vad-eyebrow vad-eyebrow--dark">Our Annual Flagship Exam</span>
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
                  About the Talent Test
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

                <p style={{ fontSize: "16px", color: "var(--vad-ink)", lineHeight: 1.75, marginBottom: "16px" }}>
                  For five consecutive years (2021–2025), Vadaanya Janaa Society has conducted the <strong>Vadaanya Talent Test</strong> — an offline, standardized OMR examination provided 100% free of charge to thousands of government school students across Andhra Pradesh and Telangana.
                </p>

                <p style={{ fontSize: "16px", color: "var(--vad-ink)", lineHeight: 1.75, marginBottom: "26px" }}>
                  Over <strong>15,000 students</strong> have taken part, with <strong>500+ deserving scholars</strong> awarded district and mandal cash prizes, trophies, and continuous scholarships all the way from rural village classrooms to premier institutions like IITs and NITs.
                </p>

                <div>
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vad-btn vad-btn--gold"
                  >
                    <BookOpenIcon />
                    <span>Open 5-Year Booklet (PDF) ↗</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Image Aligned to the Entirety of the Section */}
              <div style={{ flex: "1 1 440px", position: "relative" }}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4 / 3.1",
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <Image
                    src="/talent-test/talent_hero.jpg"
                    alt="Students taking the Vadaanya Talent Test"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 480px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>

            {/* Horizontal Announcements (Carousel on Desktop/Tablet, Compact List on Mobile) */}
            <div className="vad-announcements-box">
              {/* Header: Title only, clean and simple */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "14px",
                  borderBottom: "1px solid #f1f5f9",
                  paddingBottom: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span className="vad-tt-feed-panel__pulse" aria-hidden="true" />
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "var(--vad-gold-dark, #d97706)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Live Announcements
                  </span>
                </div>
              </div>

              {/* 1. DESKTOP / TABLET VIEW: Carousel with Side Arrows */}
              <div className="vad-announcements-desktop">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    position: "relative",
                  }}
                >
                  {/* Left Side Arrow */}
                  <button
                    type="button"
                    onClick={() => announcementsSwiperRef.current?.slidePrev()}
                    aria-label="Previous announcement"
                    style={{
                      flexShrink: 0,
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      color: "#334155",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--vad-navy-950, #0a1030)";
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.borderColor = "var(--vad-navy-950, #0a1030)";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#f8fafc";
                      e.currentTarget.style.color = "#334155";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  {/* Swiper Slider */}
                  <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
                    <Swiper
                      modules={[Navigation, Autoplay]}
                      spaceBetween={14}
                      slidesPerView={3}
                      loop={true}
                      autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                      onSwiper={(swiper) => {
                        announcementsSwiperRef.current = swiper;
                      }}
                      breakpoints={{
                        0: { slidesPerView: 1, spaceBetween: 10 },
                        600: { slidesPerView: 2, spaceBetween: 12 },
                        960: { slidesPerView: 3, spaceBetween: 14 },
                      }}
                      style={{ width: "100%" }}
                    >
                      {liveAnnouncements.map((item) => (
                        <SwiperSlide key={item.id} style={{ height: "auto" }}>
                          <div
                            style={{
                              background: "#f8fafc",
                              padding: "14px 16px",
                              borderRadius: "14px",
                              border: "1px solid #e2e8f0",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              height: "100%",
                              minHeight: "128px",
                              boxSizing: "border-box",
                              transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#ffffff";
                              e.currentTarget.style.borderColor = "#cbd5e1";
                              e.currentTarget.style.boxShadow = "0 6px 16px rgba(10, 16, 48, 0.08)";
                              e.currentTarget.style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "#f8fafc";
                              e.currentTarget.style.borderColor = "#e2e8f0";
                              e.currentTarget.style.boxShadow = "none";
                              e.currentTarget.style.transform = "translateY(0)";
                            }}
                          >
                            <div>
                              <strong
                                style={{
                                  display: "block",
                                  fontSize: "13px",
                                  color: "var(--vad-navy-950, #0a1030)",
                                  marginBottom: "5px",
                                  lineHeight: 1.35,
                                  fontWeight: 700,
                                }}
                              >
                                {item.title}
                              </strong>
                              <p
                                style={{
                                  fontSize: "12px",
                                  color: "#64748b",
                                  margin: "0 0 10px",
                                  lineHeight: 1.45,
                                }}
                              >
                                {item.desc}
                              </p>
                            </div>

                            {item.actionType === "modal" ? (
                              <button
                                type="button"
                                onClick={() => setIsRegModalOpen(true)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  padding: 0,
                                  fontSize: "11.5px",
                                  fontWeight: 700,
                                  color: "var(--vad-gold-dark, #d97706)",
                                  cursor: "pointer",
                                  textAlign: "left",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "4px",
                                }}
                              >
                                {item.actionLabel}
                              </button>
                            ) : item.actionType === "link" ? (
                              <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  fontSize: "11.5px",
                                  fontWeight: 700,
                                  color: "var(--vad-gold-dark, #d97706)",
                                  textDecoration: "none",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "4px",
                                }}
                              >
                                {item.actionLabel}
                              </a>
                            ) : (
                              <a
                                href={item.href}
                                style={{
                                  fontSize: "11.5px",
                                  fontWeight: 700,
                                  color: "var(--vad-gold-dark, #d97706)",
                                  textDecoration: "none",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "4px",
                                }}
                              >
                                {item.actionLabel}
                              </a>
                            )}
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  {/* Right Side Arrow */}
                  <button
                    type="button"
                    onClick={() => announcementsSwiperRef.current?.slideNext()}
                    aria-label="Next announcement"
                    style={{
                      flexShrink: 0,
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      color: "#334155",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--vad-navy-950, #0a1030)";
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.borderColor = "var(--vad-navy-950, #0a1030)";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#f8fafc";
                      e.currentTarget.style.color = "#334155";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 2. MOBILE VIEW: Compact List */}
              <div className="vad-announcements-mobile">
                {liveAnnouncements.map((item) => (
                  <div key={item.id} className="vad-announcement-mobile-card">
                    <h3 className="vad-announcement-mobile-card__title">
                      {item.title}
                    </h3>
                    <p className="vad-announcement-mobile-card__desc">
                      {item.desc}
                    </p>
                    <div className="vad-announcement-mobile-card__action">
                      {item.actionType === "modal" ? (
                        <button
                          type="button"
                          onClick={() => setIsRegModalOpen(true)}
                        >
                          {item.actionLabel}
                        </button>
                      ) : item.actionType === "link" ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.actionLabel}
                        </a>
                      ) : (
                        <a href={item.href}>
                          {item.actionLabel}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 3: 4 STAT BADGES (DARK BLUE SECTION)
          ─────────────────────────────────────────────── */}
      <section className="vad-section vad-section--deep" style={{ padding: "48px 0" }}>
        <div className="vad-container">
          <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
            <div className="vad-tt-stats__grid">
              {talentTestStats.map((st, i) => (
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
              <span className="vad-eyebrow vad-eyebrow--dark">OFFICIAL QUESTION BANK</span>
              <h2
                style={{
                  fontSize: "clamp(22px, 2.4vw, 32px)",
                  margin: "10px 0 12px",
                  color: "var(--vad-navy-950)",
                  fontWeight: 800,
                  fontFamily: "var(--vad-font-display)",
                  lineHeight: 1.2,
                }}
              >
                5-Year Question Papers &amp; Solutions (2021–2025)
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
                We compiled five full years of Vadaanya Talent Test examination papers into a single 100-page bilingual study guide. Built to help students develop analytical and non-verbal reasoning skills from Class 6 onward.
              </p>

              <div className="vad-tt-booklet__features" style={{ marginBottom: "24px" }}>
                <div className="vad-tt-booklet__feat" style={{ color: "var(--vad-ink)", fontSize: "14.5px" }}>
                  <span className="vad-tt-booklet__feat-icon">✓</span>
                  <span>5 Complete Solved Exam Editions (2021, 2022, 2023, 2024, 2025)</span>
                </div>
                <div className="vad-tt-booklet__feat" style={{ color: "var(--vad-ink)", fontSize: "14.5px" }}>
                  <span className="vad-tt-booklet__feat-icon">✓</span>
                  <span>Bilingual Question Formats (Telugu &amp; English side-by-side)</span>
                </div>
                <div className="vad-tt-booklet__feat" style={{ color: "var(--vad-ink)", fontSize: "14.5px" }}>
                  <span className="vad-tt-booklet__feat-icon">✓</span>
                  <span>Covers Logical Reasoning, Mental Ability, Math &amp; Science</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
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
                  download="Vadaanya-TalentTest-5Year-Booklet(2021-2025).pdf"
                  className="vad-btn vad-btn--navy"
                >
                  <DownloadIcon />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>

            {/* Right Column: Taller Image talent_test.jpg displaying complete artwork */}
            <div style={{ flex: "1 1 360px", maxWidth: "390px", width: "100%", margin: "0 auto" }}>
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
                    aspectRatio: "3 / 3.7",
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
                    border: "1px solid rgba(0, 0, 0, 0.06)",
                    transition: "transform 0.4s ease, box-shadow 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.boxShadow = "0 24px 48px rgba(10, 16, 48, 0.18)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.12)";
                  }}
                >
                  <Image
                    src="/talent_test.jpg"
                    alt="Vadaanya Talent Test 5-Year Question Papers Booklet"
                    fill
                    sizes="(max-width: 768px) 100vw, 390px"
                    priority
                    style={{ objectFit: "contain", background: "#0a1030" }}
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 5: HOW THE TEST WORKS (CONCISE 6-STEP CARDS)
          ─────────────────────────────────────────────── */}
      <section id="how-it-works" className="vad-section vad-section--grey vad-how-it-works-section" style={{ padding: "60px 0" }}>
        <div className="vad-container">
          <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
            <div className="vad-head vad-head--center vad-head--light" style={{ marginBottom: "32px" }}>
              <span className="vad-eyebrow vad-eyebrow--center vad-eyebrow--dark">THE ANNUAL CYCLE</span>
              <h2
                style={{
                  fontSize: "clamp(22px, 2.4vw, 32px)",
                  margin: "10px 0 12px",
                  color: "var(--vad-navy-950)",
                  fontWeight: 800,
                  fontFamily: "var(--vad-font-display)",
                  lineHeight: 1.2,
                }}
              >
                How the Talent Test Works
              </h2>
              <p className="vad-lead" style={{ fontSize: "16px", color: "var(--vad-ink-soft)", maxWidth: "680px", margin: "0 auto" }}>
                A structured six-step cycle connecting free student registration to long-term collegiate support.
              </p>
            </div>

            {/* Desktop View: 6 Elevated Cards Grid */}
            <div className="vad-how-it-works-grid">
              {conciseHowItWorks.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    padding: "22px 24px",
                    border: "1px solid rgba(0, 0, 0, 0.07)",
                    boxShadow: "0 4px 16px rgba(10, 16, 48, 0.04)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "var(--vad-gold-dark, #d97706)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Step {item.step}
                  </span>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 800,
                      color: "var(--vad-navy-950, #0a1030)",
                      margin: 0,
                      fontFamily: "var(--vad-font-display)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--vad-ink-soft, #475569)", margin: 0, lineHeight: 1.55 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Mobile View: Concise 6-Step List (Minimal scrolling) */}
            <div className="vad-how-it-works-mobile">
              {conciseHowItWorks.map((item, idx) => (
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
      <section id="equity" className="vad-section vad-section--grey" style={{ padding: "60px 0" }}>
        <div className="vad-container">
          <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
            <div className="vad-head" style={{ textAlign: "left", marginBottom: "28px" }}>
              <span className="vad-eyebrow vad-eyebrow--dark">FAIR EVALUATION</span>
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
                Recognition, Built for Equity
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
              <p style={{ fontSize: "16px", color: "var(--vad-ink-soft, #475569)", lineHeight: 1.75, margin: 0 }}>
                Introduced in 2024, this three-tier model recognises that a strong score in a drought-prone mandal deserves the same respect as one from a resource-rich area. Roughly <strong>280 non-overlapping prizes</strong> are awarded each cycle.
              </p>
            </div>

            {/* Elevated Unified 3-Tier Cards (Responsive & Concise on Mobile) */}
            <div className="vad-equity-grid">
              {/* Card 1 */}
              <div className="vad-equity-tier-card">
                <div className="vad-equity-tier-card__bar" />
                <div>
                  <div className="vad-equity-tier-card__badge">
                    Tier 1
                  </div>
                  <h3 className="vad-equity-tier-card__title">
                    District Top 20
                  </h3>
                  <p className="vad-equity-tier-card__desc">
                    Best across all mandals; no mandal repeats
                  </p>
                </div>

                <div className="vad-equity-tier-card__reward-box">
                  <span className="vad-equity-tier-card__reward-label">
                    Reward
                  </span>
                  <div className="vad-equity-tier-card__reward-val">
                    ₹15,000 – ₹25,000
                  </div>
                  <span className="vad-equity-tier-card__reward-sub">
                    Trophy &amp; Merit Certificate
                  </span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="vad-equity-tier-card">
                <div className="vad-equity-tier-card__bar" />
                <div>
                  <div className="vad-equity-tier-card__badge">
                    Tier 2
                  </div>
                  <h3 className="vad-equity-tier-card__title">
                    Mandal Topper (40)
                  </h3>
                  <p className="vad-equity-tier-card__desc">
                    Top scorer per mandal, not already above
                  </p>
                </div>

                <div className="vad-equity-tier-card__reward-box">
                  <span className="vad-equity-tier-card__reward-label">
                    Reward
                  </span>
                  <div className="vad-equity-tier-card__reward-val">
                    ₹5,000
                  </div>
                  <span className="vad-equity-tier-card__reward-sub">
                    Trophy &amp; Merit Certificate
                  </span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="vad-equity-tier-card">
                <div className="vad-equity-tier-card__bar" />
                <div>
                  <div className="vad-equity-tier-card__badge">
                    Tier 3
                  </div>
                  <h3 className="vad-equity-tier-card__title">
                    School Topper (~250)
                  </h3>
                  <p className="vad-equity-tier-card__desc">
                    One topper per school, not already above
                  </p>
                </div>

                <div className="vad-equity-tier-card__reward-box">
                  <span className="vad-equity-tier-card__reward-label">
                    Reward
                  </span>
                  <div className="vad-equity-tier-card__reward-val">
                    ₹500 – ₹1,000
                  </div>
                  <span className="vad-equity-tier-card__reward-sub">
                    Trophy &amp; Merit Certificate
                  </span>
                </div>
              </div>
            </div>

            {/* Real Prize Distribution Image Banner */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "40px" }}>
              <div style={{ flex: "1 1 460px" }}>
                <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", borderRadius: "20px", overflow: "hidden", boxShadow: "0 16px 36px rgba(0, 0, 0, 0.1)" }}>
                  <Image
                    src="/talent-test/talent_test_image.JPG"
                    alt="Talent Test Prize Distribution Ceremony"
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>

              <div style={{ flex: "1 1 420px" }}>
                <span className="vad-eyebrow vad-eyebrow--dark">GRASSROOTS INCLUSION</span>
                <h3 style={{ fontSize: "22px", fontWeight: 800, color: "var(--vad-navy-950)", fontFamily: "var(--vad-font-display)", margin: "10px 0 12px" }}>
                  Empowering Every Government School
                </h3>
                <div
                  style={{
                    width: "50px",
                    height: "3px",
                    background: "var(--vad-gold-deep)",
                    margin: "12px 0 16px",
                    borderRadius: "2px",
                  }}
                />
                <p style={{ fontSize: "15.5px", color: "var(--vad-ink)", lineHeight: 1.75, margin: 0 }}>
                  By guaranteeing that District Top 20 winners don&apos;t crowd out Mandal toppers, and Mandal toppers don&apos;t take School prizes, every single participating school receives its own recognized champion with medals and certificates presented at morning school assemblies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 7: HALL OF FAME (IIT RANKERS)
          ─────────────────────────────────────────────── */}
      <section id="hall-of-fame" className="vad-section vad-section--deep vad-tt-fame" style={{ padding: "60px 0" }}>
        <div className="vad-container">
          <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
            <div className="vad-head vad-head--center" style={{ marginBottom: "36px" }}>
              <span className="vad-eyebrow vad-eyebrow--center" style={{ color: "var(--vad-gold, #f2a712)" }}>
                NATIONAL ACADEMIC SUCCESS
              </span>
              <h2
                style={{
                  fontSize: "clamp(24px, 2.6vw, 36px)",
                  margin: "10px 0 12px",
                  color: "#ffffff",
                  fontWeight: 800,
                  fontFamily: "var(--vad-font-display)",
                  lineHeight: 1.2,
                }}
              >
                From Government Classrooms to IITs
              </h2>
              <p className="vad-lead" style={{ color: "#94a3b8", fontSize: "16px", maxWidth: "680px", margin: "0 auto", lineHeight: 1.6 }}>
                Vadaanya Talent Test scholars who proved that rural government-school students can crack India&apos;s toughest entrance exams with the right mentorship.
              </p>
            </div>

            <div className="vad-scholar-grid">
              {iitAlumni.map((alum, idx) => (
                <div key={idx} className="vad-scholar-card">
                  <div className="vad-scholar-card__rank-row">
                    <span className="vad-scholar-card__air">{alum.airRank}</span>
                    <span className="vad-scholar-card__cat">{alum.categoryRank}</span>
                  </div>

                  <h3 className="vad-scholar-card__name">{alum.name}</h3>
                  <span className="vad-scholar-card__college">{alum.college}</span>

                  {alum.quote && (
                    <p className="vad-scholar-card__quote">
                      &ldquo;{alum.quote}&rdquo;
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 8: FOLDER-BASED PHOTO ARCHIVES (LIGHT PAPER)
          ─────────────────────────────────────────────── */}
      <TalentTestGallery albums={galleryAlbums} />

      {/* ───────────────────────────────────────────────
          SECTION 9: 2026 PRE-REGISTRATION CTA
          ─────────────────────────────────────────────── */}
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
              Pre-Register for Talent Test 2026
            </h2>
            <p className="vad-lead" style={{ color: "#cbd5e1", fontSize: "16px", maxWidth: "660px", margin: "0 auto 24px", lineHeight: 1.6 }}>
              100% free for government school students from Class 6 to 10. Pre-register now to receive exam center locations, study materials, and SMS hall ticket alerts.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", marginBottom: "24px" }}>
              <button
                onClick={() => setIsRegModalOpen(true)}
                className="vad-btn vad-btn--gold"
              >
                <span>Pre-Register Free (Online) →</span>
              </button>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="vad-btn vad-btn--outline"
              >
                <BookOpenIcon />
                <span>Open Solved Booklet ↗</span>
              </a>
            </div>

            <div className="vad-tt-support__legal-note" style={{ color: "#94a3b8", justifyContent: "center" }}>
              <span>🛡️ 80G &amp; 12A Certified NGO</span>
              <span>• NGO Darpan ID: TS/2024/0396868</span>
              <span>• CSR ID: CSR00071897</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 10: FAQS (LIGHT PAPER)
          ─────────────────────────────────────────────── */}
      <section id="faqs" className="vad-section vad-section--paper vad-tt-faqs" style={{ padding: "60px 0" }}>
        <div className="vad-container">
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div className="vad-head vad-head--center vad-head--light" style={{ marginBottom: "36px" }}>
              <span className="vad-eyebrow vad-eyebrow--center vad-eyebrow--dark">FAQ</span>
              <h2
                style={{
                  fontSize: "clamp(22px, 2.4vw, 32px)",
                  margin: "10px 0 12px",
                  color: "var(--vad-navy-950)",
                  fontWeight: 800,
                  fontFamily: "var(--vad-font-display)",
                  lineHeight: 1.2,
                }}
              >
                Frequently Asked Questions
              </h2>
            </div>

            <div className="vad-tt-faqs__list">
              {talentTestFaqs.map((faq, idx) => (
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

      {/* Pre-Registration Modal */}
      <TalentTestRegistrationModal
        isOpen={isRegModalOpen}
        onClose={() => setIsRegModalOpen(false)}
      />
    </div>
  );
}
