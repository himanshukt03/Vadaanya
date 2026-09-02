"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  talentTestStats,
  howItWorksSteps,
  equityTiers,
  iitAlumni,
  talentTestTestimonials,
  talentTestMilestones,
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

const QrIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="5" height="5" x="3" y="3" rx="1" />
    <rect width="5" height="5" x="16" y="3" rx="1" />
    <rect width="5" height="5" x="3" y="16" rx="1" />
    <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
    <path d="M21 21v.01" />
    <path d="M12 7v3a2 2 0 0 1-2 2H7" />
    <path d="M3 12h.01" />
    <path d="M12 3h.01" />
    <path d="M12 16v.01" />
    <path d="M16 12h1" />
    <path d="M21 12v.01" />
    <path d="M12 21v-1" />
  </svg>
);

export default function TalentTestPage({ galleryAlbums = [] }: TalentTestPageProps) {
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const pdfUrl = "/talent-test/vadaanya-talent-test-booklet.pdf";

  return (
    <div className="vad-talent-page">
      {/* ───────────────────────────────────────────────
          SECTION 1: TOP BANNER (MATCHING ABOUT & SUCCESS STORIES PAGES)
          ─────────────────────────────────────────────── */}
      <section
        className="vad-page-hero vad-section--deep"
        style={{
          padding: "clamp(50px, 4vw, 70px) 0 clamp(20px, 1.8vw, 28px)",
          backgroundImage:
            "linear-gradient(rgba(10, 16, 48, 0.72), rgba(10, 16, 48, 0.85)), url('/events/Digital Teaching at High School/01-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="vad-container vad-page-hero__inner">
          <span className="vad-eyebrow">The Flagship Initiative · 2021–2025</span>
          <h1 className="vad-page-hero__title">
            Srinivasa Ramanujan <span className="vad-page-hero__accent">Talent Test</span>
          </h1>
          <p className="vad-page-hero__lead" style={{ color: "#ffffff" }}>
            An annual standardized examination recognizing, rewarding, and nurturing rural government school talent from Class 6 to 10.
          </p>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 2: ABOUT THE TALENT TEST + LIVE ANNOUNCEMENTS SIDE PANEL
          ─────────────────────────────────────────────── */}
      <section className="vad-section vad-section--paper" style={{ padding: "50px 0" }}>
        <div className="vad-container">
          <div style={{ maxWidth: "1060px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "40px" }}>
            {/* Left Column: Details & Overview */}
            <div style={{ flex: "1 1 500px" }}>
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

              <p style={{ fontSize: "16px", color: "var(--vad-ink)", lineHeight: 1.75, marginBottom: "14px" }}>
                For five consecutive years (2021–2025), Vadaanya Janaa Society has conducted the <strong>Srinivasa Ramanujan Talent Test</strong> — an offline, standardized OMR examination provided 100% free of charge to thousands of government school students across Andhra Pradesh and Telangana.
              </p>

              <p style={{ fontSize: "16px", color: "var(--vad-ink)", lineHeight: 1.75, marginBottom: "14px" }}>
                Over <strong>15,000 students</strong> have taken part, with <strong>500+ deserving scholars</strong> awarded district and mandal cash prizes, trophies, and continuous scholarships all the way from rural village classrooms to premier institutions like IITs and NITs.
              </p>

              <p style={{ fontSize: "16px", color: "var(--vad-ink)", lineHeight: 1.75, marginBottom: "24px" }}>
                We also distribute free 100-page bilingual study booklets covering logical reasoning, mental ability, math, and science to build analytical confidence before the exam.
              </p>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vad-btn vad-btn--gold"
                >
                  <BookOpenIcon />
                  <span>Open 5-Year Booklet (PDF) ↗</span>
                </a>

                <button
                  onClick={() => setIsRegModalOpen(true)}
                  className="vad-btn vad-btn--navy"
                >
                  <span>Pre-Register for 2026 Test →</span>
                </button>
              </div>
            </div>

            {/* Right Column: Featured Image + Live Announcements Side Panel */}
            <div style={{ flex: "1 1 420px", display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Featured Image */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", borderRadius: "20px", overflow: "hidden", boxShadow: "0 16px 36px rgba(0, 0, 0, 0.1)" }}>
                <Image
                  src="/events/Digital Teaching at High School/01-1.jpg"
                  alt="Students taking the Srinivasa Ramanujan Talent Test"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 420px"
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Live Updates & Announcements Panel on the right */}
              <div className="vad-tt-feed-panel">
                <div className="vad-tt-feed-panel__header">
                  <div className="vad-tt-feed-panel__badge">
                    <span className="vad-tt-feed-panel__pulse" aria-hidden="true" />
                    <span>LIVE ANNOUNCEMENTS</span>
                  </div>
                  <span className="vad-tt-feed-panel__sub-lbl">2026 Cycle & Archives</span>
                </div>

                <div className="vad-tt-feed-panel__list">
                  {/* Item 1 */}
                  <div className="vad-tt-feed-panel__item">
                    <div className="vad-tt-feed-panel__icon">📢</div>
                    <div className="vad-tt-feed-panel__body">
                      <strong>5-Year Solved Booklet (2021–2025) Released</strong>
                      <p>View the official 100-page bilingual question papers & solutions booklet.</p>
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="vad-tt-feed-panel__link"
                      >
                        Open PDF Booklet in New Tab ↗
                      </a>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="vad-tt-feed-panel__item">
                    <div className="vad-tt-feed-panel__icon">🎯</div>
                    <div className="vad-tt-feed-panel__body">
                      <strong>2026 Pre-Registrations Now Open</strong>
                      <p>Free entry for government school students from Class 6 to 10.</p>
                      <button onClick={() => setIsRegModalOpen(true)} className="vad-tt-feed-panel__link">
                        Pre-Register Free →
                      </button>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="vad-tt-feed-panel__item">
                    <div className="vad-tt-feed-panel__icon">🌟</div>
                    <div className="vad-tt-feed-panel__body">
                      <strong>3 Talent Test Scholars in IITs</strong>
                      <p>Jugesh (AIR 377), Thulasi (AIR 2619), &amp; Yaswanth (AIR 3563) secured national ranks.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 3: 4 STAT BADGES (CLEAN LIGHT GREY SECTION)
          ─────────────────────────────────────────────── */}
      <section className="vad-section vad-section--grey" style={{ padding: "40px 0" }}>
        <div className="vad-container">
          <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
            <div className="vad-tt-stats__grid">
              {talentTestStats.map((st, i) => (
                <div key={i} className="vad-tt-stats__card vad-tt-stats__card--light">
                  <span className="vad-tt-stats__num" style={{ color: "var(--vad-gold-dark, #d97706)" }}>
                    {st.value}
                  </span>
                  <span className="vad-tt-stats__lbl" style={{ color: "var(--vad-ink, #0a1030)" }}>
                    {st.label}
                  </span>
                  <span className="vad-tt-stats__sub" style={{ color: "var(--vad-ink-soft, #64748b)" }}>
                    {st.sublabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 4: 5-YEAR QUESTION BOOKLET (REFINED SQUARE IMAGE & TIGHT SPACING)
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
                We compiled five full years of Srinivasa Ramanujan Talent Test examination papers into a single 100-page bilingual study guide. Built to help students develop analytical and non-verbal reasoning skills from Class 6 onward.
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
                  <span>Open Booklet in New Tab ↗</span>
                </a>

                <a
                  href={pdfUrl}
                  download="Vadaanya-TalentTest-5Year-Booklet(2021-2025).pdf"
                  className="vad-btn vad-btn--navy"
                >
                  <DownloadIcon />
                  <span>Download Free PDF (4.4 MB)</span>
                </a>
              </div>
            </div>

            {/* Right Column: Square Image talent_test.jpg with Elegant Styling */}
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
                    aspectRatio: "1 / 1",
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
                    alt="Srinivasa Ramanujan Talent Test 5-Year Question Papers Booklet"
                    fill
                    sizes="(max-width: 768px) 100vw, 390px"
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
          SECTION 5: HOW THE TEST WORKS (WARM GREY BACKGROUND)
          ─────────────────────────────────────────────── */}
      <section id="how-it-works" className="vad-section vad-section--grey" style={{ padding: "60px 0" }}>
        <div className="vad-container">
          <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
            <div className="vad-head vad-head--center vad-head--light" style={{ marginBottom: "36px" }}>
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
                A structured six-step journey connecting student registration to long-term collegiate support — offline, OMR-based, and built for a level playing field.
              </p>
            </div>

            <div className="vad-tt-steps__grid">
              {howItWorksSteps.map((step, idx) => (
                <div key={idx} className="vad-tt-steps__card vad-tt-steps__card--light">
                  <div className="vad-tt-steps__header">
                    <span className="vad-tt-steps__num" style={{ color: "var(--vad-gold-dark, #d97706)" }}>
                      {step.step}
                    </span>
                    <span className="vad-tt-steps__badge vad-tt-steps__badge--light">
                      {step.badge}
                    </span>
                  </div>
                  <h3 className="vad-tt-steps__title" style={{ color: "var(--vad-ink, #0a1030)" }}>
                    {step.title}
                  </h3>
                  <p className="vad-tt-steps__tagline" style={{ color: "var(--vad-gold-deep, #b45309)" }}>
                    {step.tagline}
                  </p>
                  <p className="vad-tt-steps__desc" style={{ color: "var(--vad-ink-soft, #475569)" }}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Multiplier Loop Banner */}
            <div className="vad-tt-steps__cycle-note vad-tt-steps__cycle-note--light">
              <span className="vad-tt-steps__cycle-icon" style={{ color: "var(--vad-gold-dark, #d97706)" }}>
                ↺
              </span>
              <p style={{ color: "var(--vad-ink, #0a1030)" }}>
                <strong>The Self-Sustaining Cycle:</strong> Stage 6 flows directly back into Stage 1 — successful talent test alumni return as mentors, invigilators, and donors, growing the program every year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 6: RECOGNITION BUILT FOR EQUITY (LIGHT PAPER)
          ─────────────────────────────────────────────── */}
      <section id="equity" className="vad-section vad-section--paper" style={{ padding: "60px 0" }}>
        <div className="vad-container">
          <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
            <div className="vad-head vad-head--center vad-head--light" style={{ marginBottom: "36px" }}>
              <span className="vad-eyebrow vad-eyebrow--center vad-eyebrow--dark">FAIR EVALUATION</span>
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
                Recognition, Built for Equity
              </h2>
              <p className="vad-lead" style={{ fontSize: "16px", color: "var(--vad-ink-soft)", maxWidth: "720px", margin: "0 auto" }}>
                Introduced in 2024, this three-tier model recognises that a strong score in a drought-prone mandal deserves the same respect as one from a resource-rich area. Roughly <strong>280 non-overlapping prizes</strong> are awarded each cycle.
              </p>
            </div>

            {/* 3 Tier Cards */}
            <div className="vad-tt-equity__grid">
              {equityTiers.map((tier, idx) => (
                <div
                  key={idx}
                  className={`vad-tt-equity__card vad-tt-equity__card--light vad-tt-equity__card--${tier.badgeColor}`}
                >
                  <div className="vad-tt-equity__badge">{tier.tier}</div>
                  <h3 className="vad-tt-equity__title" style={{ color: "var(--vad-ink, #0a1030)" }}>
                    {tier.title}
                  </h3>
                  <p className="vad-tt-equity__qualifier" style={{ color: "var(--vad-ink-soft, #475569)" }}>
                    {tier.qualifier}
                  </p>

                  <div className="vad-tt-equity__reward-box vad-tt-equity__reward-box--light">
                    <span className="vad-tt-equity__reward-lbl">Award Amount</span>
                    <span className="vad-tt-equity__reward-val" style={{ color: tier.accentColor }}>
                      {tier.reward}
                    </span>
                    <span className="vad-tt-equity__reward-winners" style={{ color: "var(--vad-ink-soft, #475569)" }}>
                      {tier.winnerCount}
                    </span>
                  </div>

                  <ul className="vad-tt-equity__perks">
                    {tier.perks.map((p, pIdx) => (
                      <li key={pIdx} style={{ color: "var(--vad-ink, #1e293b)" }}>
                        <span className="vad-tt-equity__check">✓</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Real Prize Distribution Image Banner */}
            <div style={{ marginTop: "48px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "40px" }}>
              <div style={{ flex: "1 1 480px" }}>
                <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", borderRadius: "20px", overflow: "hidden", boxShadow: "0 16px 36px rgba(0, 0, 0, 0.1)" }}>
                  <Image
                    src="/events/Brostal Event Vizag/01.jpg"
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
          SECTION 7: HALL OF FAME & WHAT PARENTS SAY (DEEP NAVY SECTION)
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
                  fontSize: "clamp(22px, 2.4vw, 34px)",
                  margin: "10px 0 12px",
                  color: "#ffffff",
                  fontWeight: 800,
                  fontFamily: "var(--vad-font-display)",
                  lineHeight: 1.2,
                }}
              >
                From Government Classrooms to IITs
              </h2>
              <p className="vad-lead" style={{ color: "#cbd5e1", fontSize: "16px", maxWidth: "720px", margin: "0 auto" }}>
                Jugesh Kumar (AIR 377), Thulasi Karthik (AIR 2619) and Yaswanth Kumar (AIR 3563) — Vadaanya Talent Test alumni who proved that rural government-school talent can conquer India&apos;s toughest entrance exams with the right mentorship.
              </p>
            </div>

            <div className="vad-tt-fame__grid">
              {iitAlumni.map((alum, idx) => (
                <div key={idx} className="vad-tt-fame__card">
                  <div className="vad-tt-fame__rank-badge">{alum.airRank}</div>
                  <div className="vad-tt-fame__cat-rank">{alum.categoryRank}</div>

                  <div className="vad-tt-fame__avatar">
                    <span className="vad-tt-fame__initials">
                      {alum.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>

                  <h3 className="vad-tt-fame__name">{alum.name}</h3>
                  <span className="vad-tt-fame__college">{alum.college}</span>
                  <p className="vad-tt-fame__bio">{alum.bio}</p>

                  {alum.quote && (
                    <blockquote className="vad-tt-fame__quote">
                      &ldquo;{alum.quote}&rdquo;
                    </blockquote>
                  )}
                </div>
              ))}
            </div>

            {/* Dedicated "What Parents Say" Section */}
            <div className="vad-tt-fame__testimonials-box" style={{ marginTop: "48px" }}>
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <span style={{ fontSize: "11.5px", fontWeight: 800, color: "var(--vad-gold, #f2a712)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  PARENT REFLECTIONS
                </span>
                <h3 className="vad-tt-fame__testimonials-title" style={{ margin: "6px 0 0", fontSize: "22px" }}>
                  What Parents Say
                </h3>
              </div>
              <div className="vad-tt-fame__testimonials-grid">
                {talentTestTestimonials.map((t, idx) => (
                  <div key={idx} className="vad-tt-fame__test-card">
                    <p className="vad-tt-fame__test-quote">&ldquo;{t.quote}&rdquo;</p>
                    <div className="vad-tt-fame__test-meta">
                      <strong>{t.author}</strong>
                      <span>{t.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 8: FOLDER-BASED PHOTO ARCHIVES (LIGHT PAPER)
          ─────────────────────────────────────────────── */}
      <TalentTestGallery albums={galleryAlbums} />

      {/* ───────────────────────────────────────────────
          SECTION 9: 5-YEAR EVOLUTION ROADMAP (WARM GREY)
          ─────────────────────────────────────────────── */}
      <section id="roadmap" className="vad-section vad-section--grey vad-tt-roadmap" style={{ padding: "60px 0" }}>
        <div className="vad-container">
          <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
            <div className="vad-head vad-head--center vad-head--light" style={{ marginBottom: "36px" }}>
              <span className="vad-eyebrow vad-eyebrow--center vad-eyebrow--dark">TRACK RECORD</span>
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
                5-Year Evolution (2021 → 2026)
              </h2>
              <p className="vad-lead" style={{ fontSize: "16px", color: "var(--vad-ink-soft)", maxWidth: "680px", margin: "0 auto" }}>
                Over five years, the talent test has grown from a handful of rural high schools to an institution serving thousands of students annually across Andhra Pradesh and Telangana.
              </p>
            </div>

            <div className="vad-tt-roadmap__timeline">
              {talentTestMilestones.map((m, idx) => (
                <div key={idx} className="vad-tt-roadmap__item">
                  <div className="vad-tt-roadmap__year-node vad-tt-roadmap__year-node--light">
                    <span>{m.year}</span>
                  </div>
                  <div className="vad-tt-roadmap__content vad-tt-roadmap__content--light">
                    <div className="vad-tt-roadmap__header">
                      <h3 style={{ color: "var(--vad-ink)" }}>{m.title}</h3>
                      {m.metrics && (
                        <span className="vad-tt-roadmap__metric vad-tt-roadmap__metric--light">
                          {m.metrics}
                        </span>
                      )}
                    </div>
                    <p style={{ color: "var(--vad-ink-soft)" }}>{m.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 10: 2026 PRE-REGISTRATION & DONATION SECTION (NAVY DEEP)
          ─────────────────────────────────────────────── */}
      <section id="register" className="vad-section vad-section--deep vad-tt-support" style={{ padding: "60px 0" }}>
        <div className="vad-container">
          <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
            <div className="vad-tt-support__wrapper">
              {/* Left Column: 2026 Pre-Registration */}
              <div className="vad-head" style={{ textAlign: "left" }}>
                <span className="vad-eyebrow" style={{ color: "var(--vad-gold, #f2a712)" }}>
                  2026 REGISTRATIONS
                </span>
                <h2
                  style={{
                    fontSize: "clamp(22px, 2.4vw, 32px)",
                    margin: "10px 0 12px",
                    color: "#ffffff",
                    fontWeight: 800,
                    fontFamily: "var(--vad-font-display)",
                    lineHeight: 1.2,
                  }}
                >
                  Pre-Register for Talent Test 2026
                </h2>
                <p className="vad-lead" style={{ color: "#cbd5e1", fontSize: "16px", marginBottom: "20px" }}>
                  100% free for government school students from Class 6 to 10. Pre-register now to receive exam center locations, study materials, and SMS hall ticket alerts.
                </p>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "24px" }}>
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

                <div className="vad-tt-support__legal-note" style={{ color: "#94a3b8" }}>
                  <span>🛡️ 80G &amp; 12A Certified NGO</span>
                  <span>• NGO Darpan ID: TS/2024/0396868</span>
                  <span>• CSR ID: CSR00071897</span>
                </div>
              </div>

              {/* Right Column: Support / Donate QR Card */}
              <div className="vad-tt-support__qr-box">
                <div className="vad-tt-support__qr-card">
                  <div className="vad-tt-support__qr-header">
                    <QrIcon />
                    <span>Sponsor a Student / Award</span>
                  </div>
                  <div className="vad-tt-support__upi-display" style={{ marginBottom: "16px" }}>
                    <span className="vad-tt-support__upi-id">UPI ID: vadaanyasociety@sbi</span>
                    <span className="vad-tt-support__upi-hint">₹1,000 sponsors 1 student · ₹5,000 funds 1 Mandal Award</span>
                  </div>
                  <Link href="/#donate" className="vad-btn vad-btn--gold" style={{ width: "100%", justifyContent: "center" }}>
                    Donate Online &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 11: FAQS (LIGHT PAPER)
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
