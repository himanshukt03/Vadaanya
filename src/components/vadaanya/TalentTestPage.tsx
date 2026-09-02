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
import TalentTestPdfViewer from "./TalentTestPdfViewer";
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
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34" />
    <path d="M6 4h12v7a6 6 0 0 1-12 0V4Z" />
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
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="vad-talent-page">
      {/* ───────────────────────────────────────────────
          SECTION 1: LIVE UPDATES SCROLLING TICKER
          ─────────────────────────────────────────────── */}
      <div className="vad-tt-ticker" aria-label="Live announcements">
        <div className="vad-tt-ticker__badge">
          <span className="vad-tt-ticker__pulse" aria-hidden="true" />
          <span>LATEST UPDATES</span>
        </div>
        <div className="vad-tt-ticker__marquee">
          <div className="vad-tt-ticker__track">
            <span className="vad-tt-ticker__item">
              📢 <strong>NEW:</strong> 5-Year Question Papers & Solutions Booklet (2021–2025) released!{" "}
              <button onClick={() => setIsPdfOpen(true)} className="vad-tt-ticker__link">
                [Preview Booklet PDF]
              </button>
            </span>
            <span className="vad-tt-ticker__divider">✦</span>
            <span className="vad-tt-ticker__item">
              🎯 Pre-registrations for the <strong>2026 Srinivasa Ramanujan Talent Test</strong> are open.{" "}
              <button onClick={() => setIsRegModalOpen(true)} className="vad-tt-ticker__link">
                [Pre-Register Free]
              </button>
            </span>
            <span className="vad-tt-ticker__divider">✦</span>
            <span className="vad-tt-ticker__item">
              🏆 <strong>15,000+</strong> government school students tested across 5 completed cycles (2021–2025).
            </span>
            <span className="vad-tt-ticker__divider">✦</span>
            <span className="vad-tt-ticker__item">
              🌟 <strong>3 Talent Test Alumni</strong> successfully cracked IIT-JEE Advanced into IITs.
            </span>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────
          SECTION 2: HERO SECTION (NAVY DEEP WITH IMAGE OVERLAY)
          ─────────────────────────────────────────────── */}
      <section
        className="vad-page-hero vad-section--deep"
        style={{
          padding: "clamp(60px, 6vw, 96px) 0 clamp(36px, 4vw, 56px)",
          backgroundImage:
            "linear-gradient(rgba(6, 11, 34, 0.82), rgba(6, 11, 34, 0.94)), url('/events/Digital Teaching at High School/01-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="vad-container vad-page-hero__inner">
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <span className="vad-eyebrow" style={{ color: "var(--vad-gold, #f2a712)" }}>
              ★ THE FLAGSHIP PROGRAMME · 2021–2025
            </span>
            <h1 className="vad-page-hero__title" style={{ fontSize: "clamp(28px, 4.2vw, 52px)", margin: "14px 0 16px" }}>
              The Srinivasa Ramanujan <br />
              <span className="vad-page-hero__accent" style={{ color: "var(--vad-gold, #f2a712)" }}>
                Talent Test
              </span>
            </h1>
            <p className="vad-page-hero__lead" style={{ color: "#e2e8f0", fontSize: "clamp(15px, 1.2vw, 17px)", maxWidth: "660px", margin: "0 auto 28px" }}>
              Identifying promising minds in rural government schools, providing 100-page analytical study material, and rewarding 500+ deserving students with cash prizes, scholarships, and IIT mentorship.
            </p>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginBottom: "40px" }}>
              <button
                onClick={() => setIsPdfOpen(true)}
                className="vad-btn vad-btn--gold"
              >
                <BookOpenIcon />
                <span>Download 5-Year Booklet (PDF)</span>
              </button>
              <button
                onClick={() => setIsRegModalOpen(true)}
                className="vad-btn vad-btn--outline"
              >
                <span>Pre-Register for 2026 Test →</span>
              </button>
            </div>
          </div>

          {/* 4 Clean Impact Badges */}
          <div className="vad-tt-stats__grid">
            {talentTestStats.map((st, i) => (
              <div key={i} className="vad-tt-stats__card">
                <span className="vad-tt-stats__num">{st.value}</span>
                <span className="vad-tt-stats__lbl">{st.label}</span>
                <span className="vad-tt-stats__sub">{st.sublabel}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 3: 5-YEAR QUESTION BOOKLET (LIGHT PAPER BACKGROUND)
          ─────────────────────────────────────────────── */}
      <section id="booklet" className="vad-section vad-section--paper">
        <div className="vad-container">
          <div className="vad-tt-booklet__wrapper">
            {/* Left Column: Booklet Details */}
            <div className="vad-head vad-head--light" style={{ textAlign: "left" }}>
              <span className="vad-eyebrow vad-eyebrow--dark">OFFICIAL QUESTION BANK</span>
              <h2>5-Year Question Papers & Solutions (2021–2025)</h2>
              <div style={{ width: "48px", height: "3px", background: "var(--vad-gold-dark, #d97706)", margin: "10px 0 16px", borderRadius: "2px" }} />
              <p className="vad-lead" style={{ color: "var(--vad-ink-soft)", marginBottom: "18px" }}>
                We compiled five full years of Srinivasa Ramanujan Talent Test examination papers into a single 100-page bilingual study guide. Built to help students develop analytical and non-verbal reasoning skills from Class 6 onward.
              </p>

              <div className="vad-tt-booklet__features">
                <div className="vad-tt-booklet__feat" style={{ color: "var(--vad-ink)" }}>
                  <span className="vad-tt-booklet__feat-icon">✓</span>
                  <span>5 Complete Solved Exam Editions (2021, 2022, 2023, 2024, 2025)</span>
                </div>
                <div className="vad-tt-booklet__feat" style={{ color: "var(--vad-ink)" }}>
                  <span className="vad-tt-booklet__feat-icon">✓</span>
                  <span>Bilingual Question Formats (Telugu & English side-by-side)</span>
                </div>
                <div className="vad-tt-booklet__feat" style={{ color: "var(--vad-ink)" }}>
                  <span className="vad-tt-booklet__feat-icon">✓</span>
                  <span>Covers Logical Reasoning, Mental Ability, Math & Science</span>
                </div>
              </div>

              <div className="vad-tt-booklet__actions" style={{ marginTop: "24px" }}>
                <a
                  href="/talent-test/vadaanya-talent-test-booklet.pdf"
                  download="Vadaanya-TalentTest-5Year-Booklet(2021-2025).pdf"
                  className="vad-btn vad-btn--navy"
                >
                  <DownloadIcon />
                  <span>Download Free PDF (4.4 MB)</span>
                </a>

                <button
                  onClick={() => setIsPdfOpen(true)}
                  className="vad-btn vad-btn--gold"
                >
                  <BookOpenIcon />
                  <span>Preview Booklet In-Browser</span>
                </button>
              </div>
            </div>

            {/* Right Column: Visual Booklet Card */}
            <div className="vad-tt-booklet__visual">
              <div
                className="vad-tt-booklet__cover-card"
                onClick={() => setIsPdfOpen(true)}
                role="button"
                tabIndex={0}
                aria-label="Preview Booklet Online"
              >
                <div className="vad-tt-booklet__cover-inner">
                  <div className="vad-tt-booklet__logo-box">
                    <span className="vad-tt-booklet__society-title">VADAANYA JANAA SOCIETY</span>
                    <span className="vad-tt-booklet__doc-title">5-YEAR QUESTION PAPERS BOOKLET</span>
                    <span className="vad-tt-booklet__doc-years">2021 · 2022 · 2023 · 2024 · 2025</span>
                  </div>
                  <div className="vad-tt-booklet__meta-row">
                    <span>100+ Pages</span>
                    <span>Bilingual (TE/EN)</span>
                    <span>Free Download</span>
                  </div>
                </div>
                <span className="vad-tt-booklet__click-hint" style={{ color: "#cbd5e1" }}>
                  Click to View Interactive Reader ↗
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 4: HOW THE TEST WORKS (WARM GREY BACKGROUND)
          ─────────────────────────────────────────────── */}
      <section id="how-it-works" className="vad-section vad-section--grey">
        <div className="vad-container">
          <div className="vad-head vad-head--center vad-head--light" style={{ marginBottom: "40px" }}>
            <span className="vad-eyebrow vad-eyebrow--center vad-eyebrow--dark">THE ANNUAL CYCLE</span>
            <h2>How the Talent Test Works</h2>
            <p className="vad-lead">
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
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 5: RECOGNITION BUILT FOR EQUITY (LIGHT PAPER)
          ─────────────────────────────────────────────── */}
      <section id="equity" className="vad-section vad-section--paper">
        <div className="vad-container">
          <div className="vad-head vad-head--center vad-head--light" style={{ marginBottom: "40px" }}>
            <span className="vad-eyebrow vad-eyebrow--center vad-eyebrow--dark">FAIR EVALUATION</span>
            <h2>Recognition, Built for Equity</h2>
            <p className="vad-lead">
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
          <div className="vad-about__split" style={{ marginTop: "40px", alignItems: "center", gap: "24px" }}>
            <div className="vad-about__visual" style={{ width: "100%" }}>
              <Image
                src="/events/Brostal Event Vizag/01.jpg"
                alt="Talent Test Prize Distribution Ceremony"
                width={700}
                height={380}
                className="vad-about__img"
                style={{ borderRadius: "18px", boxShadow: "0 16px 36px rgba(10, 16, 48, 0.12)", objectFit: "cover", width: "100%", height: "300px" }}
              />
              <div className="vad-about__float vad-about__float--tr" style={{ background: "var(--vad-gold-dark, #d97706)", color: "#ffffff", fontWeight: 700 }}>
                ~280 Awards / Cycle
              </div>
            </div>

            <div className="vad-head vad-head--light" style={{ textAlign: "left" }}>
              <span className="vad-eyebrow vad-eyebrow--dark">GRASSROOTS INCLUSION</span>
              <h3 style={{ fontSize: "22px", fontWeight: 800, color: "var(--vad-ink)", margin: "0 0 10px" }}>
                Empowering Every Government School
              </h3>
              <p className="vad-lead" style={{ fontSize: "14px", color: "var(--vad-ink-soft)", margin: 0 }}>
                By guaranteeing that District Top 20 winners don&apos;t crowd out Mandal toppers, and Mandal toppers don&apos;t take School prizes, every single participating school receives its own recognized champion with medals and certificates presented at morning school assemblies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 6: HALL OF FAME (DEEP NAVY SECTION FOR PRESTIGE)
          ─────────────────────────────────────────────── */}
      <section id="hall-of-fame" className="vad-section vad-section--deep vad-tt-fame">
        <div className="vad-container">
          <div className="vad-head vad-head--center" style={{ marginBottom: "40px" }}>
            <span className="vad-eyebrow vad-eyebrow--center" style={{ color: "var(--vad-gold, #f2a712)" }}>
              NATIONAL ACADEMIC SUCCESS
            </span>
            <h2 style={{ color: "#ffffff" }}>From Government Classrooms to IITs</h2>
            <p className="vad-lead" style={{ color: "#cbd5e1" }}>
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

          {/* Testimonial Quote Box */}
          <div className="vad-tt-fame__testimonials-box">
            <h3 className="vad-tt-fame__testimonials-title">What Students and Parents Say</h3>
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
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 7: FOLDER-BASED PHOTO ARCHIVES (LIGHT PAPER)
          ─────────────────────────────────────────────── */}
      <TalentTestGallery albums={galleryAlbums} />

      {/* ───────────────────────────────────────────────
          SECTION 8: 5-YEAR EVOLUTION ROADMAP (WARM GREY)
          ─────────────────────────────────────────────── */}
      <section id="roadmap" className="vad-section vad-section--grey vad-tt-roadmap">
        <div className="vad-container">
          <div className="vad-head vad-head--center vad-head--light" style={{ marginBottom: "40px" }}>
            <span className="vad-eyebrow vad-eyebrow--center vad-eyebrow--dark">TRACK RECORD</span>
            <h2>5-Year Evolution (2021 → 2026)</h2>
            <p className="vad-lead">
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
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 9: 2026 PRE-REGISTRATION & DONATION SECTION (NAVY DEEP)
          ─────────────────────────────────────────────── */}
      <section id="register" className="vad-section vad-section--deep vad-tt-support">
        <div className="vad-container">
          <div className="vad-tt-support__wrapper">
            {/* Left Column: 2026 Pre-Registration */}
            <div className="vad-head" style={{ textAlign: "left" }}>
              <span className="vad-eyebrow" style={{ color: "var(--vad-gold, #f2a712)" }}>
                2026 REGISTRATIONS
              </span>
              <h2 style={{ color: "#ffffff" }}>Pre-Register for Talent Test 2026</h2>
              <p className="vad-lead" style={{ color: "#cbd5e1", marginBottom: "20px" }}>
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
                  href="/talent-test/vadaanya-talent-test-booklet.pdf"
                  download="Vadaanya-TalentTest-5Year-Booklet.pdf"
                  className="vad-btn vad-btn--outline"
                >
                  <DownloadIcon />
                  <span>Download Solved Booklet</span>
                </a>
              </div>

              <div className="vad-tt-support__legal-note" style={{ color: "#94a3b8" }}>
                <span>🛡️ 80G & 12A Certified NGO</span>
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
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 10: FAQS (LIGHT PAPER)
          ─────────────────────────────────────────────── */}
      <section id="faqs" className="vad-section vad-section--paper vad-tt-faqs">
        <div className="vad-container">
          <div className="vad-head vad-head--center vad-head--light" style={{ marginBottom: "36px" }}>
            <span className="vad-eyebrow vad-eyebrow--center vad-eyebrow--dark">FAQ</span>
            <h2>Frequently Asked Questions</h2>
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
                  <span style={{ color: "var(--vad-ink, #0a1030)" }}>{faq.question}</span>
                  <span className="vad-tt-faqs__chevron">
                    <ChevronDownIcon />
                  </span>
                </button>
                {openFaqIndex === idx && (
                  <div className="vad-tt-faqs__answer">
                    <p style={{ color: "var(--vad-ink-soft, #475569)" }}>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PDF Modal */}
      <TalentTestPdfViewer
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
      />

      {/* Pre-Registration Modal */}
      <TalentTestRegistrationModal
        isOpen={isRegModalOpen}
        onClose={() => setIsRegModalOpen(false)}
      />
    </div>
  );
}
