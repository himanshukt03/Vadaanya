"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

interface AwardItem {
  id: string;
  title: string;
  imageUrl: string;
}

interface FounderProfile {
  id: string;
  name: string;
  role: string;
  linkedInUrl?: string;
  imageUrl: string;
  bioParagraphs: string[];
}

interface FoundersPageProps {
  founderProfile: FounderProfile;
  awards: AwardItem[];
}

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function FoundersPage({ founderProfile, awards }: FoundersPageProps) {
  const awardsSwiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (awardsSwiperRef.current && !awardsSwiperRef.current.destroyed) {
        awardsSwiperRef.current.update();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {/* Page Hero Band */}
      <section className="vad-page-hero vad-section--deep">
        <div className="vad-container vad-page-hero__inner">
          <span className="vad-eyebrow">Our People</span>
          <h1 className="vad-page-hero__title">
            Team <span className="vad-page-hero__accent">Vadaanya</span>
          </h1>
          <p className="vad-page-hero__lead">
            A collective movement of dedicated volunteers, mentors, and leadership empowering government school students across India.
          </p>
        </div>
      </section>

      {/* 1. Voluntary Service & Collective Impact */}
      <section className="vad-section vad-section--paper" style={{ padding: "60px 0" }}>
        <div className="vad-container">
          <div style={{ maxWidth: "1060px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "40px" }}>
            {/* Left: Text Content */}
            <div style={{ flex: "1 1 480px" }}>
              <span className="vad-eyebrow vad-eyebrow--dark">Voluntary Service &amp; Collective Impact</span>
              <h2 style={{ fontSize: "clamp(22px, 2.4vw, 32px)", margin: "10px 0 12px", color: "var(--vad-navy-950)", fontWeight: 800, fontFamily: "var(--vad-font-display)", lineHeight: 1.15 }}>
                Driven by Purpose, <span style={{ color: "var(--vad-gold-deep)" }}>Powered by Volunteers</span>
              </h2>
              <div style={{ width: "50px", height: "3px", background: "var(--vad-gold-deep)", margin: "14px 0 20px", borderRadius: "2px" }}></div>
              <p style={{ fontSize: "16.5px", color: "var(--vad-ink)", lineHeight: 1.8, marginBottom: "16px" }}>
                At Vadaanya Janaa Society, our strength lies in a united community of professionals, educators, and youth who serve entirely out of passion. Every volunteer, mentor, and regional coordinator contributes their time, skills, and energy without receiving any monetary compensation or financial remuneration.
              </p>
              <p style={{ fontSize: "16.5px", color: "var(--vad-ink)", lineHeight: 1.8 }}>
                By keeping our operational model purely voluntary, we ensure that every resource directly benefits deserving students from underprivileged backgrounds. Together, our team works hand in hand to conduct talent tests, provide scholarships, distribute digital learning tools, and mentor young minds toward higher education and self-reliance.
              </p>
            </div>

            {/* Right: Team Image */}
            <div style={{ flex: "1 1 380px", position: "relative" }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "4/3.2", borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)" }}>
                <Image
                  src="/team_vadaanya.avif"
                  alt="Team Vadaanya Volunteers"
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Meet the Founder & Collective Leadership */}
      <section className="vad-section" style={{ background: "#f8fafc", padding: "60px 0", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        <div className="vad-container">
          <div style={{ maxWidth: "1060px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "50px" }}>
            {/* Left: Compact image with soft shadow and floating card */}
            <div style={{ flex: "1 1 360px", position: "relative" }}>
              <div style={{ position: "relative", borderRadius: "26px", overflow: "hidden", boxShadow: "0 24px 48px rgba(0, 0, 0, 0.12)", aspectRatio: "4/4.6", maxWidth: "390px", margin: "0 auto" }}>
                <Image
                  src={founderProfile.imageUrl}
                  alt={founderProfile.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 390px"
                  style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.5s ease" }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                />
              </div>
              {/* Floating glassmorphism card */}
              <div style={{
                position: "absolute",
                bottom: "-18px",
                right: "0",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(16px)",
                padding: "16px 24px",
                borderRadius: "18px",
                boxShadow: "0 16px 32px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                gap: "18px",
                border: "1px solid rgba(255,255,255,0.8)",
                zIndex: 2,
                maxWidth: "90%",
                margin: "0 auto",
                left: "0",
                width: "fit-content"
              }}>
                <div>
                  <p style={{ margin: 0, fontFamily: "var(--vad-font-display)", fontWeight: 800, fontSize: "16px", color: "var(--vad-navy-950)" }}>
                    {founderProfile.name}
                  </p>
                  <p style={{ margin: "2px 0 0", fontSize: "12px", fontWeight: 600, color: "var(--vad-gold-deep)" }}>
                    {founderProfile.role}
                  </p>
                </div>
                {founderProfile.linkedInUrl && (
                <a
                  href={founderProfile.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${founderProfile.name} on LinkedIn`}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: "38px", height: "38px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #0a66c2, #004182)",
                    color: "white", boxShadow: "0 6px 14px rgba(10, 102, 194, 0.3)",
                    transition: "transform 0.3s ease",
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zm2-7a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
                  </svg>
                </a>
                )}
              </div>
            </div>

            {/* Right: Bio text framed to emphasize team effort */}
            <div style={{ flex: "1 1 480px", padding: "10px 0" }}>
              <h2 style={{ fontSize: "clamp(24px, 2.6vw, 36px)", margin: "0", fontFamily: "var(--vad-font-display)", fontWeight: 800, color: "var(--vad-navy-950)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                Meet the <span style={{ color: "var(--vad-gold)" }}>Founder</span>
              </h2>
              <div style={{ width: "48px", height: "3px", background: "var(--vad-gold-deep)", margin: "14px 0", borderRadius: "2px" }}></div>
              {founderProfile.bioParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  style={{
                    fontSize: "16.5px",
                    color: "var(--vad-ink)",
                    lineHeight: 1.8,
                    marginBottom: index < founderProfile.bioParagraphs.length - 1 ? "16px" : "0",
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Idea — 0.5% Can Change a Life */}
      <section className="vad-section vad-section--paper" style={{ padding: "60px 0" }}>
        <div className="vad-container">
          <div style={{ maxWidth: "1060px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "40px" }}>
            
            {/* Left Column: Text Content */}
            <div style={{ flex: "1 1 480px" }}>
              <span className="vad-eyebrow vad-eyebrow--dark">The Idea</span>
              <h2 style={{ fontSize: "clamp(22px, 2.4vw, 32px)", margin: "10px 0 14px", color: "var(--vad-navy-950)", fontWeight: 800, fontFamily: "var(--vad-font-display)", lineHeight: 1.15 }}>
                THE IDEA, <span style={{ color: "var(--vad-gold-deep)" }}>0.5% Can Change a Life</span>
              </h2>
              <div style={{ width: "50px", height: "3px", background: "var(--vad-gold-deep)", margin: "14px 0 20px", borderRadius: "2px" }}></div>
              <p style={{ fontSize: "16.5px", color: "var(--vad-ink)", lineHeight: 1.8, marginBottom: "16px" }}>
                Vadaanya started in 2010 with a small group of friends who decided to contribute 0.5% of their monthly salary to support students in need. There was no office or staff, just a group of people who wanted to help students.
              </p>
              <p style={{ fontSize: "16.5px", color: "var(--vad-ink)", lineHeight: 1.8, marginBottom: "16px" }}>
                Fifteen years later, the same 0.5% model remains the foundation of Vadaanya. Engineers, teachers, government officers, and other professionals contribute a small part of their income and volunteer their time.
              </p>
              <p style={{ fontSize: "16.5px", color: "var(--vad-ink)", lineHeight: 1.8 }}>
                Many students once supported by Vadaanya are now giving back and helping others. Together, small contributions have helped Vadaanya support thousands of students.
              </p>
            </div>

            {/* Right Column: Image matching text height */}
            <div style={{ flex: "1 1 380px", position: "relative" }}>
              <div style={{ position: "relative", width: "100%", maxWidth: "390px", aspectRatio: "4/4.2", borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)" }}>
                <Image
                  src="/team vadaanya/5.jpg"
                  alt="0.5% Can Change a Life"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Taking Rural Talent to the World */}
      <section className="vad-section" style={{ background: "#f8fafc", padding: "30px 0", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        <div className="vad-container">
          <div style={{ maxWidth: "1060px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "36px" }}>
            
            {/* Left Column: Image matching site design (wider size) */}
            <div style={{ flex: "1 1 450px", position: "relative" }}>
              <div style={{ position: "relative", width: "100%", maxWidth: "460px", aspectRatio: "4/3", borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)" }}>
                <Image
                  src="/team vadaanya/6.jpg"
                  alt="Taking Rural Talent to the World"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Right Column: Text Content matching website design system */}
            <div style={{ flex: "1 1 480px" }}>
              <span className="vad-eyebrow vad-eyebrow--dark">Global Mentorship</span>
              <h2 style={{ fontSize: "clamp(22px, 2.4vw, 32px)", margin: "10px 0 14px", color: "var(--vad-navy-950)", fontWeight: 800, fontFamily: "var(--vad-font-display)", lineHeight: 1.15 }}>
                Taking Rural Talent <span style={{ color: "var(--vad-gold-deep)" }}>to the World</span>
              </h2>
              <div style={{ width: "50px", height: "3px", background: "var(--vad-gold-deep)", margin: "14px 0 20px", borderRadius: "2px" }}></div>

              <p style={{ fontSize: "16.5px", color: "var(--vad-ink)", lineHeight: 1.8, marginBottom: "16px" }}>
                Ashok also works as a <strong>student mentor</strong> with the International Startup Foundation (ISF), supporting its Junicorn programme for young, first-time founders.
              </p>
              <p style={{ fontSize: "16.5px", color: "var(--vad-ink)", lineHeight: 1.8 }}>
                He mentors students from rural backgrounds, helping them develop their business ideas and prepare pitch decks. In May 2025, he travelled with the batch to the <strong>USA</strong>, where the students presented their ideas at Texas State University.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Recognition & Honors — Carousel */}
      <section className="vad-section vad-section--paper" style={{ padding: "48px 0 60px", background: "#ffffff" }}>
        <div className="vad-container">
          <div className="vad-head" style={{ textAlign: "center", marginBottom: "32px" }}>
            <span className="vad-eyebrow vad-eyebrow--dark">Recognition</span>
            <h2 style={{ color: "#0a1030", fontSize: "clamp(24px, 2.6vw, 36px)", fontWeight: 800 }}>
              Awards &amp; <span style={{ color: "var(--vad-gold-dark, #d97706)" }}>Honors</span>
            </h2>
            <div style={{ width: "48px", height: "3px", background: "var(--vad-gold-dark, #d97706)", margin: "14px auto 0", borderRadius: "2px", opacity: 0.8 }}></div>
          </div>

          {/* Carousel Wrapper */}
          <div style={{ position: "relative", width: "100%" }}>
            <Swiper
              className="vad-awards__swiper"
              modules={[Navigation, Autoplay]}
              spaceBetween={16}
              slidesPerView={4}
              loop={awards.length > 4}
              observer={true}
              observeParents={true}
              resizeObserver={true}
              updateOnWindowResize={true}
              autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              onSwiper={(swiper) => {
                awardsSwiperRef.current = swiper;
                if (swiper && !swiper.destroyed) {
                  swiper.update();
                }
              }}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 10 },
                520: { slidesPerView: 2, spaceBetween: 12 },
                768: { slidesPerView: 3, spaceBetween: 14 },
                1024: { slidesPerView: 4, spaceBetween: 16 },
              }}
              style={{ width: "100%", padding: "4px 0 8px" }}
            >
              {awards.map((award, index) => (
                <SwiperSlide key={award.id} style={{ height: "auto" }}>
                  <div
                    style={{
                      background: "#ffffff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0 4px 16px rgba(10, 16, 48, 0.04)",
                      transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                      cursor: "default",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column" as const,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.borderColor = "var(--vad-gold-dark, #d97706)";
                      e.currentTarget.style.boxShadow = "0 14px 30px rgba(10, 16, 48, 0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.boxShadow = "0 4px 16px rgba(10, 16, 48, 0.04)";
                    }}
                  >
                    <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 10", overflow: "hidden", background: "#f1f5f9" }}>
                      <Image
                        src={award.imageUrl}
                        alt={award.title}
                        fill
                        sizes="(max-width: 480px) 90vw, (max-width: 700px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                        loading={index === 0 ? "eager" : "lazy"}
                        priority={index === 0}
                      />
                    </div>
                    <div style={{ padding: "18px 20px", flex: 1, display: "flex", alignItems: "center" }}>
                      <p style={{ color: "#0f172a", fontSize: "15px", lineHeight: 1.5, fontWeight: 700, margin: 0 }}>
                        {award.title}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Arrows — light theme */}
            <div className="vad-awards__nav" style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "24px" }}>
              <button
                onClick={() => awardsSwiperRef.current?.slidePrev()}
                aria-label="Previous awards"
                style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  border: "1.5px solid #cbd5e1", background: "#ffffff",
                  color: "#0f172a", display: "flex", alignItems: "center",
                  justifyContent: "center", cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--vad-gold-dark, #d97706)"; e.currentTarget.style.color = "var(--vad-gold-dark, #d97706)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#cbd5e1"; e.currentTarget.style.color = "#0f172a"; }}
              >
                <ArrowLeft />
              </button>
              <button
                onClick={() => awardsSwiperRef.current?.slideNext()}
                aria-label="Next awards"
                style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  border: "1.5px solid #cbd5e1", background: "#ffffff",
                  color: "#0f172a", display: "flex", alignItems: "center",
                  justifyContent: "center", cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--vad-gold-dark, #d97706)"; e.currentTarget.style.color = "var(--vad-gold-dark, #d97706)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#cbd5e1"; e.currentTarget.style.color = "#0f172a"; }}
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
