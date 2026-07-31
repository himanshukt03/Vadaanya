"use client";

import Image from "next/image";

export default function FoundersPage() {
  return (
    <>
      {/* Page Hero Band */}
      <section className="vad-page-hero vad-section--deep" style={{ paddingBottom: "clamp(48px, 6vw, 72px)" }}>
        <div className="vad-container vad-page-hero__inner">
          <span className="vad-eyebrow">Leadership</span>
          <h1 className="vad-page-hero__title" style={{ fontSize: "clamp(28px, 4.5vw, 52px)" }}>
            Meet the <span className="vad-page-hero__accent">Founder</span>
          </h1>
          <p className="vad-page-hero__lead" style={{ marginTop: "12px", fontSize: "16px" }}>
            The driving force behind Vadaanya's mission and vision.
          </p>
        </div>
      </section>

      {/* 1. Profile Redesign */}
      <section className="vad-section vad-section--paper" style={{ padding: "80px 0" }}>
        <div className="vad-container">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "60px" }}>
            {/* Left: Beautiful large image with soft shadow and floating card */}
            <div style={{ flex: "1 1 400px", position: "relative" }}>
              <div style={{ position: "relative", borderRadius: "30px", overflow: "hidden", boxShadow: "0 30px 60px rgba(0, 0, 0, 0.12)", aspectRatio: "4/5", maxWidth: "460px", margin: "0 auto" }}>
                <Image
                  src="/Ashok.jpg"
                  alt="Ashok Padapati"
                  fill
                  style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.5s ease" }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                />
              </div>
              {/* Floating glassmorphism card */}
              <div style={{
                position: "absolute",
                bottom: "-20px",
                right: "0",
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(16px)",
                padding: "20px 28px",
                borderRadius: "20px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                border: "1px solid rgba(255,255,255,0.8)",
                zIndex: 2,
                maxWidth: "90%",
                margin: "0 auto",
                left: "0",
                width: "fit-content"
              }}>
                <div>
                  <p style={{ margin: 0, fontFamily: "var(--vad-font-display)", fontWeight: 800, fontSize: "18px", color: "var(--vad-navy-950)" }}>
                    Ashok Padapati
                  </p>
                  <p style={{ margin: "4px 0 0", fontSize: "13px", fontWeight: 600, color: "var(--vad-gold-deep)" }}>
                    Lead QA Engineer, OpenText
                  </p>
                </div>
                <a
                  href="https://www.linkedin.com/in/ashok-padapati-67277b50/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ashok Padapati on LinkedIn"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: "44px", height: "44px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #0a66c2, #004182)",
                    color: "white", boxShadow: "0 8px 16px rgba(10, 102, 194, 0.3)",
                    transition: "transform 0.3s ease",
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zm2-7a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: Bio text styled elegantly */}
            <div style={{ flex: "1 1 500px", padding: "20px 0" }}>
              <h2 style={{ fontSize: "clamp(36px, 5vw, 52px)", margin: "0", fontFamily: "var(--vad-font-display)", fontWeight: 800, color: "var(--vad-navy-950)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                Founder & <span style={{ color: "var(--vad-gold)" }}>President</span>
              </h2>
              <div style={{ width: "60px", height: "4px", background: "var(--vad-gold-deep)", margin: "28px 0", borderRadius: "2px" }}></div>
              <p style={{ fontSize: "17px", color: "var(--vad-ink)", lineHeight: 1.8 }}>
                Ashok Padapati was born in Kothacheruvu, a village in India, into a middle-class family. With his father working as a coconut merchant and his mother as a homemaker, he grew up with a bold vision to contribute to society.
              </p>
              <p style={{ marginTop: "16px", fontSize: "17px", color: "var(--vad-ink)", lineHeight: 1.8 }}>
                He now successfully balances his career and NGO work. His journey reflects a seamless blend of personal success and an unwavering dedication to social change.
              </p>
              
              <div style={{ 
                marginTop: "40px", 
                padding: "32px", 
                background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
                borderRadius: "24px",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 12px 24px -10px rgba(0,0,0,0.05)",
                position: "relative",
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--vad-gold)" style={{ opacity: 0.15, position: "absolute", top: "24px", left: "24px" }}>
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p style={{ fontSize: "17px", color: "var(--vad-navy-950)", fontStyle: "italic", lineHeight: 1.7, fontWeight: 500, margin: 0, position: "relative", zIndex: 1, paddingLeft: "12px" }}>
                  "Education is not just about getting degrees. It's about giving everyone the same chance to grow, no matter where they live or how poor they are."
                </p>
                <p style={{ marginTop: "16px", fontSize: "13px", fontWeight: 800, color: "var(--vad-gold-deep)", letterSpacing: "0.1em", paddingLeft: "12px", margin: "16px 0 0" }}>
                  — ASHOK PADAPATI
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Timeline — redesigned, visible running line */}
      <section className="vad-section" style={{ background: "var(--vad-navy-950)", padding: "48px 0", position: "relative", overflow: "hidden" }}>
        {/* Background ambient glow */}
        <div style={{ position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(242,167,18,0.06) 0%, rgba(10,16,48,0) 70%)", pointerEvents: "none" }}></div>
        
        <div className="vad-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="vad-head" style={{ textAlign: "center", marginBottom: "32px" }}>
            <span className="vad-eyebrow" style={{ color: "var(--vad-gold)" }}>Experience</span>
            <h2 style={{ color: "#ffffff", fontSize: "clamp(28px, 4vw, 40px)" }}>Professional Timeline</h2>
            <div style={{ width: "60px", height: "4px", background: "var(--vad-gold)", margin: "20px auto 0", borderRadius: "2px", opacity: 0.5 }}></div>
          </div>
          
          <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative" }}>
            {/* The running line */}
            <div style={{ 
              position: "absolute", 
              left: "14px", 
              top: "20px", 
              bottom: "40px", 
              width: "4px", 
              background: "linear-gradient(to bottom, var(--vad-gold), rgba(242,167,18,0.1))",
              borderRadius: "2px"
            }}></div>

            {[
              { period: "2025 – Present", role: "Lead Quality Assurance Engineer", org: "OpenText, Hyderabad", current: true, icon: "M21 13.255v-7.255l-9-5-9 5v7.255c0 4.14 3.321 7.745 9 9.745 5.679-2 9-5.605 9-9.745z" },
              { period: "2018 – 2025", role: "QA Lead", org: "NCR Voyix", current: false, icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" },
              { period: "2010 – 2018", role: "Quality Specialist", org: "HCL Technologies", current: false, icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
              { period: "2006 – 2010", role: "B.Tech, Electrical & Electronics Engineering", org: "SASTRA University, Thanjavur", current: false, icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" },
            ].map((item, i) => (
              <div key={i} style={{
                position: "relative",
                paddingLeft: "52px",
                paddingBottom: i === 3 ? "0" : "20px",
                display: "flex",
                flexDirection: "column",
              }}>
                {/* Timeline Node */}
                <div style={{
                  position: "absolute",
                  left: "2px",
                  top: "0",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: item.current ? "var(--vad-gold)" : "var(--vad-navy-800)",
                  border: item.current ? "2px solid var(--vad-navy-950)" : "2px solid var(--vad-navy-950)",
                  boxShadow: item.current ? "0 0 0 4px rgba(242, 167, 18, 0.2)" : "0 0 0 3px rgba(255, 255, 255, 0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2,
                  transition: "transform 0.3s ease",
                }}>
                  <svg viewBox="0 0 24 24" fill={item.current ? "var(--vad-navy-950)" : "rgba(255,255,255,0.5)"} style={{ width: "12px", height: "12px" }}>
                    <path d={item.icon} />
                  </svg>
                </div>

                {/* Content Card */}
                <div style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  padding: "16px 20px",
                  borderRadius: "16px",
                  transition: "all 0.3s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(6px)"; e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"; e.currentTarget.style.borderColor = "rgba(242, 167, 18, 0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)"; }}>
                  <span style={{ 
                    display: "inline-block", 
                    padding: "4px 12px", 
                    background: item.current ? "rgba(242, 167, 18, 0.15)" : "rgba(255, 255, 255, 0.08)", 
                    color: item.current ? "var(--vad-gold)" : "#a0aec0", 
                    borderRadius: "20px", 
                    fontSize: "11px", 
                    fontWeight: 800, 
                    letterSpacing: "0.08em",
                    marginBottom: "10px"
                  }}>
                    {item.period}
                  </span>
                  <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", color: "#ffffff", fontWeight: 700 }}>{item.role}</h3>
                  <p style={{ margin: 0, fontSize: "14px", color: "#a0aec0" }}>{item.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How it Started - Separate section with distinct styling */}
      <section className="vad-section vad-section--paper" style={{ padding: "100px 0" }}>
        <div className="vad-container">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "stretch", gap: "60px" }}>
            
            {/* Text element */}
            <div style={{ flex: "1 1 500px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span className="vad-eyebrow vad-eyebrow--dark">Origins</span>
              <h2 style={{ fontSize: "clamp(36px, 5vw, 48px)", margin: "16px 0 24px", color: "var(--vad-navy-950)", fontWeight: 800, lineHeight: 1.1, fontFamily: "var(--vad-font-display)" }}>
                How It <span style={{ color: "var(--vad-gold-deep)" }}>Started</span>
              </h2>
              <div style={{ width: "60px", height: "4px", background: "var(--vad-gold)", margin: "24px 0", borderRadius: "2px" }}></div>
              <p style={{ fontSize: "18px", color: "var(--vad-ink)", lineHeight: 1.8, marginBottom: "20px" }}>
                In 2010, Ashok and a group of friends began donating 0.5% of their salaries every month. What started as a small, humble commitment quickly grew into a larger vision.
              </p>
              <p style={{ fontSize: "18px", color: "var(--vad-ink)", lineHeight: 1.8 }}>
                This collective effort blossomed into the <strong>Vadaanya Janaa Society</strong>—a fully registered non-profit organization focused heavily on bringing quality education and opportunities to underprivileged children.
              </p>
            </div>

            {/* Visual element */}
            <div style={{ flex: "1 1 400px", position: "relative", minHeight: "400px" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "30px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
                <Image
                  src="/about-2.jpg"
                  alt="How it started"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Real Impact - Separate section with distinct styling */}
      <section className="vad-section" style={{ background: "#f8fafc", padding: "100px 0", borderTop: "1px solid rgba(0,0,0,0.05)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
        <div className="vad-container">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "stretch", gap: "60px" }}>
            
            {/* Visual element */}
            <div style={{ flex: "1 1 400px", position: "relative", minHeight: "400px" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "30px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
                <Image
                  src="/hero-3.jpg"
                  alt="Real Impact"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Text element */}
            <div style={{ flex: "1 1 500px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span className="vad-eyebrow vad-eyebrow--dark">Results</span>
              <h2 style={{ fontSize: "clamp(36px, 5vw, 48px)", margin: "16px 0 24px", color: "var(--vad-navy-950)", fontWeight: 800, lineHeight: 1.1, fontFamily: "var(--vad-font-display)" }}>
                Real <span style={{ color: "var(--vad-gold-deep)" }}>Impact</span>
              </h2>
              <div style={{ width: "60px", height: "4px", background: "var(--vad-gold)", margin: "24px 0", borderRadius: "2px" }}></div>
              <p style={{ fontSize: "18px", color: "var(--vad-ink)", lineHeight: 1.8, marginBottom: "20px" }}>
                Our reach extends across rural AP & Telangana, ensuring that geographical boundaries don't limit educational potential.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "30px 0 0 0", display: "flex", flexDirection: "column", gap: "20px" }}>
                {[
                  "15,000+ students evaluated through our talent tests.",
                  "400+ students supported with direct funding and laptops.",
                  "Alumni successfully serving as Group-1 officers, CAs, and professionals."
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start", background: "white", padding: "20px", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.02)" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(242,167,18,0.1)", color: "var(--vad-gold-deep)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span style={{ fontSize: "16px", color: "var(--vad-navy-950)", fontWeight: 600, lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Awards & Honors — dark section */}
      <section className="vad-section vad-section--deep">
        <div className="vad-container">
          <div className="vad-head" style={{ textAlign: "center", marginBottom: "60px" }}>
            <span className="vad-eyebrow">Recognition</span>
            <h2 style={{ color: "var(--vad-on-navy)", fontSize: "clamp(32px, 4vw, 48px)" }}>
              Awards &amp; <span style={{ color: "var(--vad-gold)" }}>Honors</span>
            </h2>
            <div style={{ width: "60px", height: "4px", background: "var(--vad-gold)", margin: "24px auto 0", borderRadius: "2px", opacity: 0.5 }}></div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>
            {[
              {
                title: 'Featured as a Change Leader on Telugu talk show "Unstoppable"',
                image: "/hero-6.jpg",
              },
              {
                title: '"Yuva Bharat Gaurav" Award by Bharatiya Vikas Sangam',
                image: "/about-1.jpg",
              },
              {
                title: "CSR Summit Recognition for pioneering digital education initiatives",
                image: "/JAN_3626 (1).jpg",
              },
              {
                title: "Special invitee to AP Governor's Raj Bhavan \"At Home\" event",
                image: "/hero-1.jpg",
              },
            ].map((award, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "24px",
                  overflow: "hidden",
                  transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.4s ease, box-shadow 0.4s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.transform = "translateY(-10px)"; 
                  e.currentTarget.style.borderColor = "rgba(242, 167, 18, 0.5)"; 
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.transform = "translateY(0)"; 
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; 
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Image
                  src={award.image}
                  alt={award.title}
                  width={400}
                  height={220}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <div style={{ padding: "28px" }}>
                  <p style={{ color: "var(--vad-on-navy)", fontSize: "17px", lineHeight: 1.6, fontWeight: 600, margin: 0 }}>
                    {award.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </>
  );
}
