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
                [View Booklet PDF]
              </button>
            </span>
            <span className="vad-tt-ticker__divider">✦</span>
            <span className="vad-tt-ticker__item">
              🎯 Pre-registrations for the <strong>2026 Srinivasa Ramanujan Talent Test</strong> are now open.{" "}
              <button onClick={() => setIsRegModalOpen(true)} className="vad-tt-ticker__link">
                [Pre-Register Free]
              </button>
            </span>
            <span className="vad-tt-ticker__divider">✦</span>
            <span className="vad-tt-ticker__item">
              🏆 <strong>15,000+</strong> rural government school students tested across 5 completed cycles (2021–2025).
            </span>
            <span className="vad-tt-ticker__divider">✦</span>
            <span className="vad-tt-ticker__item">
              🌟 <strong>3 Talent Test Alumni</strong> successfully cracked IIT-JEE Advanced into IITs.
            </span>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────
          SECTION 2: FLAGSHIP HERO SECTION
          ─────────────────────────────────────────────── */}
      <section className="vad-tt-hero" aria-label="Talent Test introduction">
        <div className="vad-tt-hero__bg-overlay" aria-hidden="true" />
        <div className="vad-container vad-tt-hero__container">
          <div className="vad-tt-hero__content">
            {/* Flagship Badge */}
            <div className="vad-tt-hero__badge">
              <span>★</span> 5 YEARS OF IMPACT · 2021–2025
            </div>

            {/* Main Headline */}
            <h1 className="vad-tt-hero__title">
              The Srinivasa Ramanujan <br />
              <span className="vad-text-gold">Talent Test</span>
            </h1>

            {/* Lead Narrative */}
            <p className="vad-tt-hero__lead">
              Talent is distributed equally across society, but opportunity is not. Once every year, thousands of government school students sit an offline, standardized OMR examination — where promising minds in rural classrooms are recognized, rewarded, and propelled all the way from rural villages to IITs and NITs.
            </p>

            {/* CTA Action Row */}
            <div className="vad-tt-hero__ctas">
              <button
                onClick={() => setIsPdfOpen(true)}
                className="vad-btn vad-btn--gold vad-tt-hero__btn"
              >
                <BookOpenIcon />
                <span>Download 5-Year Booklet (PDF)</span>
              </button>

              <button
                onClick={() => setIsRegModalOpen(true)}
                className="vad-btn vad-btn--outline vad-tt-hero__btn"
              >
                <span>Pre-Register for 2026 Test →</span>
              </button>
            </div>
          </div>

          {/* 4 Stat Badges */}
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
          SECTION 3: 5-YEAR QUESTION PAPER BOOKLET
          ─────────────────────────────────────────────── */}
      <section id="booklet" className="vad-section vad-section--card vad-tt-booklet">
        <div className="vad-container">
          <div className="vad-tt-booklet__wrapper">
            <div className="vad-tt-booklet__text">
              <span className="vad-eyebrow">CURRICULUM & QUESTION BANK</span>
              <h2>Official 5-Year Question Papers & Solutions (2021–2025)</h2>
              <p className="vad-lead">
                Compiled into a single 100-page comprehensive study booklet for students, teachers, and school headmasters. Includes bilingual (Telugu & English) questions and solutions across Non-Verbal Reasoning, Mental Ability, Quantitative Aptitude, General Science, and Mathematics.
              </p>

              <div className="vad-tt-booklet__features">
                <div className="vad-tt-booklet__feat">
                  <span className="vad-tt-booklet__feat-icon">✓</span>
                  <span>5 Complete Sets of Solved Exam Papers (2021, 2022, 2023, 2024, 2025)</span>
                </div>
                <div className="vad-tt-booklet__feat">
                  <span className="vad-tt-booklet__feat-icon">✓</span>
                  <span>Bilingual Question Formats (Telugu & English side-by-side)</span>
                </div>
                <div className="vad-tt-booklet__feat">
                  <span className="vad-tt-booklet__feat-icon">✓</span>
                  <span>Full OMR Bubble Sheet Instructions & Practice Keys</span>
                </div>
              </div>

              <div className="vad-tt-booklet__actions">
                <a
                  href="/talent-test/Vadaanya-Q.Papers(2021-25)_Booklet.pdf"
                  download="Vadaanya-TalentTest-5Year-Booklet(2021-2025).pdf"
                  className="vad-btn vad-btn--gold"
                >
                  <DownloadIcon />
                  <span>Download Free PDF (Booklet)</span>
                </a>

                <button
                  onClick={() => setIsPdfOpen(true)}
                  className="vad-btn vad-btn--outline"
                >
                  <BookOpenIcon />
                  <span>Read In-Browser Viewer</span>
                </button>
              </div>
            </div>

            {/* Visual Preview Card */}
            <div className="vad-tt-booklet__visual">
              <div className="vad-tt-booklet__cover-card" onClick={() => setIsPdfOpen(true)}>
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
                <span className="vad-tt-booklet__click-hint">Click to Preview Booklet Online ↗</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 4: THE 6-STEP ANNUAL ARCHITECTURE
          ─────────────────────────────────────────────── */}
      <section id="how-it-works" className="vad-section vad-section--deep vad-tt-steps">
        <div className="vad-container">
          <div className="vad-head vad-head--center" style={{ marginBottom: "48px" }}>
            <span className="vad-eyebrow vad-eyebrow--center">CORE ARCHITECTURE</span>
            <h2>How the Talent Test Works, Every Year</h2>
            <p className="vad-lead">
              One structured, repeatable cycle executed annually — the same six connected steps that ensure a level playing field, fast evaluation, and long-term academic sustainment.
            </p>
          </div>

          <div className="vad-tt-steps__grid">
            {howItWorksSteps.map((step, idx) => (
              <div key={idx} className="vad-tt-steps__card">
                <div className="vad-tt-steps__header">
                  <span className="vad-tt-steps__num">{step.step}</span>
                  <span className="vad-tt-steps__badge">{step.badge}</span>
                </div>
                <h3 className="vad-tt-steps__title">{step.title}</h3>
                <p className="vad-tt-steps__tagline">{step.tagline}</p>
                <p className="vad-tt-steps__desc">{step.description}</p>
                <ul className="vad-tt-steps__list">
                  {step.details.map((d, dIdx) => (
                    <li key={dIdx}>
                      <span className="vad-tt-steps__bullet">▸</span> {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Loop Note */}
          <div className="vad-tt-steps__cycle-note">
            <span className="vad-tt-steps__cycle-icon">↺</span>
            <p>
              <strong>The Multiplier Cycle:</strong> Stage 6 (Sustain & Multiply) flows directly back into Stage 1 — successful alumni return as volunteer invigilators, mentors, and donors, expanding the base year after year.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 5: RECOGNITION BUILT FOR EQUITY (3 TIERS)
          ─────────────────────────────────────────────── */}
      <section id="equity" className="vad-section vad-section--navy vad-tt-equity">
        <div className="vad-container">
          <div className="vad-head vad-head--center" style={{ marginBottom: "48px" }}>
            <span className="vad-eyebrow vad-eyebrow--center">FAIR RECOGNITION</span>
            <h2>Recognition, Built for Equity</h2>
            <p className="vad-lead">
              Introduced in 2024, our three-tier model recognizes that a strong score in a drought-prone, remote mandal deserves the same respect as one from a resource-rich area. Roughly <strong>280 non-overlapping prizes</strong> are awarded each cycle.
            </p>
          </div>

          <div className="vad-tt-equity__grid">
            {equityTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`vad-tt-equity__card vad-tt-equity__card--${tier.badgeColor}`}
              >
                <div className="vad-tt-equity__badge">{tier.tier}</div>
                <h3 className="vad-tt-equity__title">{tier.title}</h3>
                <p className="vad-tt-equity__qualifier">{tier.qualifier}</p>

                <div className="vad-tt-equity__reward-box">
                  <span className="vad-tt-equity__reward-lbl">Reward</span>
                  <span className="vad-tt-equity__reward-val">{tier.reward}</span>
                  <span className="vad-tt-equity__reward-winners">{tier.winnerCount}</span>
                </div>

                <ul className="vad-tt-equity__perks">
                  {tier.perks.map((p, pIdx) => (
                    <li key={pIdx}>
                      <span className="vad-tt-equity__check">✓</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="vad-tt-equity__summary-box">
            <TrophyIcon />
            <p>
              <strong>280+ Non-Overlapping Awards per Cycle:</strong> By strictly excluding District Top 20 winners from Mandal prizes, and Mandal winners from School prizes, we maximize grassroots encouragement and touch hundreds of families across rural Andhra Pradesh and Telangana.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 6: HALL OF FAME (IIT-JEE SUCCESS STORIES)
          ─────────────────────────────────────────────── */}
      <section id="hall-of-fame" className="vad-section vad-section--deep vad-tt-fame">
        <div className="vad-container">
          <div className="vad-head vad-head--center" style={{ marginBottom: "48px" }}>
            <span className="vad-eyebrow vad-eyebrow--center">NATIONAL IMPACT</span>
            <h2>From Government Classrooms to IITs</h2>
            <p className="vad-lead">
              Meet our shining alumni who started at rural government school benches, took the Vadaanya Talent Test, received continuous sponsorship, and conquered India&apos;s toughest entrance exams.
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

          {/* Testimonials Quote Grid */}
          <div className="vad-tt-fame__testimonials-box">
            <h3 className="vad-tt-fame__testimonials-title">Voices from Students & Parents</h3>
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
          SECTION 7: FOLDER-BASED 2021-2024 PHOTO GALLERY
          ─────────────────────────────────────────────── */}
      <TalentTestGallery albums={galleryAlbums} />

      {/* ───────────────────────────────────────────────
          SECTION 8: 5-YEAR EVOLUTION ROADMAP (2021–2026)
          ─────────────────────────────────────────────── */}
      <section id="roadmap" className="vad-section vad-section--deep vad-tt-roadmap">
        <div className="vad-container">
          <div className="vad-head vad-head--center" style={{ marginBottom: "48px" }}>
            <span className="vad-eyebrow vad-eyebrow--center">JOURNEY SO FAR</span>
            <h2>5-Year Evolution Roadmap (2021 → 2026)</h2>
            <p className="vad-lead">
              Tracing our journey from a local high school test in 2021 to a statewide digital and offline evaluation movement.
            </p>
          </div>

          <div className="vad-tt-roadmap__timeline">
            {talentTestMilestones.map((m, idx) => (
              <div key={idx} className="vad-tt-roadmap__item">
                <div className="vad-tt-roadmap__year-node">
                  <span>{m.year}</span>
                </div>
                <div className="vad-tt-roadmap__content">
                  <div className="vad-tt-roadmap__header">
                    <h3>{m.title}</h3>
                    {m.metrics && (
                      <span className="vad-tt-roadmap__metric">{m.metrics}</span>
                    )}
                  </div>
                  <p>{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 9: 2026 PRE-REGISTRATION CTA BANNER
          ─────────────────────────────────────────────── */}
      <section id="register" className="vad-section vad-section--card vad-tt-cta-banner">
        <div className="vad-container">
          <div className="vad-tt-cta-banner__box">
            <div className="vad-tt-cta-banner__text">
              <span className="vad-eyebrow">UPCOMING 2026 CYCLE</span>
              <h2>Ready to Nominate or Participate in Talent Test 2026?</h2>
              <p className="vad-lead">
                Are you a government school headmaster, teacher, or student from Class 6 to 10? Pre-register today to receive exam notifications, free 100-page reasoning study materials, and direct hall ticket download alerts.
              </p>
            </div>
            <div className="vad-tt-cta-banner__actions">
              <button
                onClick={() => setIsRegModalOpen(true)}
                className="vad-btn vad-btn--gold vad-tt-cta-banner__btn"
              >
                <span>Pre-Register for 2026 (Free) →</span>
              </button>
              <a
                href="#booklet"
                className="vad-btn vad-btn--outline vad-tt-cta-banner__btn"
              >
                <span>View Question Papers Booklet</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          SECTION 10: SUPPORT A STUDENT / DONATE WITH QR
          ─────────────────────────────────────────────── */}
      <section id="support" className="vad-section vad-section--navy vad-tt-support">
        <div className="vad-container">
          <div className="vad-tt-support__wrapper">
            <div className="vad-tt-support__text">
              <span className="vad-eyebrow">SPONSOR AN AWARD</span>
              <h2>Support Rural Government School Scholars</h2>
              <p className="vad-lead">
                Your contribution directly funds student cash scholarships, study kits, high-speed OMR evaluations, and laptop grants for meritorious government school children.
              </p>

              <div className="vad-tt-support__tiers">
                <div className="vad-tt-support__tier-item">
                  <strong>₹1,000</strong>
                  <span>Sponsors testing, study booklet, and kit for 1 student</span>
                </div>
                <div className="vad-tt-support__tier-item">
                  <strong>₹5,000</strong>
                  <span>Funds 1 Mandal Champion cash scholarship & trophy</span>
                </div>
                <div className="vad-tt-support__tier-item">
                  <strong>₹15,000 – ₹25,000</strong>
                  <span>Funds 1 District Top Ranker long-term scholarship</span>
                </div>
              </div>

              <div className="vad-tt-support__legal-note">
                <span>🛡️ 80G & 12A Certified NGO</span>
                <span>• NGO Darpan ID: TS/2024/0396868</span>
                <span>• CSR ID: CSR00071897</span>
              </div>
            </div>

            <div className="vad-tt-support__qr-box">
              <div className="vad-tt-support__qr-card">
                <div className="vad-tt-support__qr-header">
                  <QrIcon />
                  <span>Scan to Donate via UPI</span>
                </div>
                <div className="vad-tt-support__qr-img-wrap">
                  {/* Fallback QR or standard UPI payment indicator */}
                  <div className="vad-tt-support__upi-display">
                    <span className="vad-tt-support__upi-id">UPI ID: vadaanyasociety@sbi</span>
                    <span className="vad-tt-support__upi-hint">Google Pay · PhonePe · Paytm · BHIM</span>
                  </div>
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
          SECTION 11: FREQUENTLY ASKED QUESTIONS (FAQS)
          ─────────────────────────────────────────────── */}
      <section id="faqs" className="vad-section vad-section--deep vad-tt-faqs">
        <div className="vad-container">
          <div className="vad-head vad-head--center" style={{ marginBottom: "40px" }}>
            <span className="vad-eyebrow vad-eyebrow--center">QUESTIONS & ANSWERS</span>
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="vad-tt-faqs__list">
            {talentTestFaqs.map((faq, idx) => (
              <div
                key={idx}
                className={`vad-tt-faqs__item ${openFaqIndex === idx ? "is-open" : ""}`}
              >
                <button
                  className="vad-tt-faqs__question-btn"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={openFaqIndex === idx}
                >
                  <span>{faq.question}</span>
                  <span className="vad-tt-faqs__chevron">
                    <ChevronDownIcon />
                  </span>
                </button>
                {openFaqIndex === idx && (
                  <div className="vad-tt-faqs__answer">
                    <p>{faq.answer}</p>
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
