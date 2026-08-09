"use client";

import Image from "next/image";

export default function TalentTestPage() {
  return (
    <div className="vad-talent-page">
      {/* Page Hero Section */}
      <section
        style={{
          background: "linear-gradient(180deg, #060b22 0%, #0c1438 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(86px, 7vw, 110px) 0 clamp(36px, 4vw, 54px)",
          color: "#ffffff",
          boxSizing: "border-box",
          position: "relative",
          minHeight: "calc(100vh - 74px)",
        }}
      >
        <div className="vad-container" style={{ width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px", alignItems: "center" }}>
            
            {/* Left Column: Intro Text */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(242, 167, 18, 0.12)", border: "1px solid rgba(242, 167, 18, 0.3)", padding: "5px 12px", borderRadius: "100px", color: "var(--vad-gold)", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>
                <span>★</span> The Flagship
              </div>
              <h1 style={{ fontSize: "clamp(22px, 2.3vw, 34px)", fontWeight: 800, lineHeight: 1.15, margin: "0 0 12px", color: "#ffffff" }}>
                The Srinivasa Ramanujan <span style={{ color: "var(--vad-gold)" }}>Talent Test</span>
              </h1>
              <p style={{ fontSize: "clamp(13.5px, 1.05vw, 15px)", lineHeight: 1.55, color: "#cbd5e1", margin: "0", maxWidth: "520px" }}>
                Once a year, thousands of government-school students across Anantapur and Sri Sathya Sai districts sit a single exam — and the ones who shine are recognised, rewarded and remembered. In 2022 alone, 4,200 students wrote it across six centres in one Sunday.
              </p>
            </div>

            {/* Right Column: Poster Image */}
            <div style={{ position: "relative", width: "100%", maxWidth: "360px", margin: "0 auto", display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 48px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.12)", background: "#050a1e", width: "100%" }}>
                <Image
                  src="/talent_test.jpg"
                  alt="The Srinivasa Ramanujan Talent Test Poster"
                  width={400}
                  height={460}
                  priority
                  style={{ width: "100%", height: "auto", maxHeight: "420px", objectFit: "contain", display: "block" }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
