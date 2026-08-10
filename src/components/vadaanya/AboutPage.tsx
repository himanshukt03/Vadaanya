import Image from "next/image";
import WhatWeDoSection from "@/components/vadaanya/WhatWeDoSection";
import VisionMissionApproach from "@/components/vadaanya/VisionMissionApproach";

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero header */}
      <section 
        className="vad-page-hero vad-section--deep"
        style={{ 
          padding: "clamp(50px, 4vw, 70px) 0 clamp(20px, 1.8vw, 28px)",
          backgroundImage: "linear-gradient(rgba(10, 16, 48, 0.7), rgba(10, 16, 48, 0.82)), url('/vadaanya_team.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="vad-container vad-page-hero__inner">
          <span className="vad-eyebrow">About Vadaanya Janaa Society</span>
          <h1 className="vad-page-hero__title">
            From Dreams to <span className="vad-page-hero__accent">Degrees</span>
          </h1>
          <p className="vad-page-hero__lead" style={{ color: "#ffffff" }}>
            A non-profit organization established in November 2010, registered under the
            Andhra Pradesh Societies Registration Act, 2001 (Reg. No. 1433/2010).
          </p>
        </div>
      </section>

      {/* 2. About Vadaanya (Mission & Purpose) */}
      <section className="vad-section vad-section--paper" style={{ padding: "40px 0" }}>
        <div className="vad-container">
          <div className="vad-about__split" style={{ alignItems: "center", gap: "24px" }}>
            
            <div className="vad-head vad-head--light" style={{ textAlign: "left" }}>
              <span className="vad-eyebrow vad-eyebrow--dark">Our Mission & Purpose</span>
              <h2>ABOUT VADAANYA</h2>
              <div style={{ width: "48px", height: "3px", background: "var(--vad-gold-deep)", margin: "10px 0 14px", borderRadius: "2px" }}></div>
              <p className="vad-lead" style={{ color: "var(--vad-ink-soft)", marginBottom: "12px", fontSize: "14.5px" }}>
                For 15 years, we have operated on a simple belief: <strong style={{ color: "var(--vad-ink)" }}>every child with a will to learn deserves a chance.</strong>
              </p>
              <p className="vad-lead" style={{ color: "var(--vad-ink-soft)", marginBottom: "12px", fontSize: "14.5px" }}>
                 What began as a small band of volunteers is today a community expanding access to education—from school benches to classrooms, and from dreams to degrees.
              </p>
              <p className="vad-lead" style={{ color: "var(--vad-ink-soft)", fontSize: "14.5px" }}>
                 Our work goes beyond charity. Through scholarships, teaching drives, and continuous mentorship, we aim to create tangible pathways to livelihoods and new futures. None of this would be possible without our dedicated volunteers, partner schools, and generous supporters who believe that education is the ultimate engine of change.
              </p>
            </div>

            <div className="vad-about__visual">
              <Image
                src="/vadaanya_team.jpeg"
                alt="About Vadaanya Team"
                width={600}
                height={400}
                priority
                className="vad-about__img"
                style={{ borderRadius: "20px", boxShadow: "0 20px 40px rgba(10, 16, 48, 0.12)", objectFit: "cover" }}
              />
              <div className="vad-about__float vad-about__float--tr" style={{ background: "var(--vad-navy-700)", color: "white", fontWeight: 700 }}>
                15+ Years
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Vision, Mission & Approach */}
      <VisionMissionApproach />

      {/* 4. What We Do */}
      <WhatWeDoSection />

      {/* 5. Registration + CTA */}
      <section className="vad-section vad-section--paper" style={{ padding: "48px 0", background: "#ffffff" }}>
        <div className="vad-container vad-about__cta">
          <div className="vad-about__cta-text">
            <span className="vad-eyebrow vad-eyebrow--dark">Get Involved</span>
            <h2 className="vad-about__cta-title" style={{ color: "#0a1030" }}>
              Support a child&apos;s journey from <span style={{ color: "var(--vad-gold-dark, #d97706)" }}>Class 10 to Graduation</span>
            </h2>
            <p className="vad-about__cta-desc" style={{ color: "#475569" }}>
              Vadaanya Janaa Society is registered under the Andhra Pradesh Societies
              Registration Act, 2001 (Reg. No. 1433/2010). Your contribution is eligible for
              80G tax exemption.
            </p>
            <div className="vad-about__cta-btns">
              <a href="#donate" className="vad-btn vad-btn--gold">
                Donate Now
                <span className="vad-arrow" aria-hidden="true">&rarr;</span>
              </a>
              <a href="/contact" className="vad-btn vad-btn--navy">
                Contact Us
              </a>
            </div>
          </div>
          <div className="vad-about__reg-card">
            <p className="vad-about__reg-title">Registration Details</p>
            <dl className="vad-about__reg-list">
              <div><dt>Registered</dt><dd>November 2010</dd></div>
              <div><dt>Act</dt><dd>AP Societies Registration Act, 2001</dd></div>
              <div><dt>Reg. No.</dt><dd>1433/2010</dd></div>
              <div><dt>Location</dt><dd>Hyderabad, India</dd></div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
