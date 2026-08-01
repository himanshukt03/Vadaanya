"use client";

import Image from "next/image";

const VisionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{width: 54, height: 54, color: "var(--vad-gold)"}}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3" />
    <line x1="12" y1="2" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" />
  </svg>
);

const MissionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{width: 54, height: 54, color: "var(--vad-gold)"}}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const ApproachIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{width: 54, height: 54, color: "var(--vad-gold)"}}>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero header */}
      <section 
        className="vad-page-hero vad-section--deep"
        style={{ 
          backgroundImage: "linear-gradient(rgba(10, 16, 48, 0.85), rgba(10, 16, 48, 0.95)), url('/vadaanya_team.jpeg')",
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
          <p className="vad-page-hero__lead">
            A non-profit organization established in November 2010, registered under the
            Andhra Pradesh Societies Registration Act, 2001 (Reg. No. 1433/2010).
          </p>
        </div>
      </section>

      {/* 2. About Vadaanya (Mission & Purpose) */}
      <section className="vad-section vad-section--paper">
        <div className="vad-container">
          <div className="vad-about__split" style={{ alignItems: "center", gap: "60px" }}>
            
            <div className="vad-head vad-head--light" style={{ textAlign: "left" }}>
              <span className="vad-eyebrow vad-eyebrow--dark">Our Mission & Purpose</span>
              <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)" }}>ABOUT VADAANYA</h2>
              <div style={{ width: "60px", height: "4px", background: "var(--vad-gold-deep)", margin: "24px 0", borderRadius: "2px" }}></div>
              <p className="vad-lead" style={{ color: "var(--vad-ink-soft)", marginBottom: "16px" }}>
                For 15 years, we have operated on a simple belief: <strong style={{ color: "var(--vad-ink)" }}>every child with a will to learn deserves a chance.</strong>
              </p>
              <p className="vad-lead" style={{ color: "var(--vad-ink-soft)" }}>
                 What began as a small band of volunteers is today a community expanding access to education—from school benches to classrooms, and from dreams to degrees.
              </p>
              <p className="vad-lead" style={{ color: "var(--vad-ink-soft)", marginTop: "16px" }}>
                 Our work goes beyond charity. Through scholarships, teaching drives, and continuous mentorship, we aim to create tangible pathways to livelihoods and new futures. None of this would be possible without our dedicated volunteers, partner schools, and generous supporters who believe that education is the ultimate engine of change.
              </p>
            </div>

            <div className="vad-about__visual">
              <Image
                src="/vadaanya_team.jpeg"
                alt="About Vadaanya Team"
                width={600}
                height={500}
                priority
                className="vad-about__img"
                style={{ borderRadius: "24px", boxShadow: "0 24px 48px rgba(10, 16, 48, 0.15)", objectFit: "cover" }}
              />
              <div className="vad-about__float vad-about__float--tr" style={{ background: "var(--vad-navy-700)", color: "white", fontWeight: 700 }}>
                15+ Years
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Vision / Mission / Approach */}
      <section className="vad-section vad-section--deep">
        <div className="vad-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            
            {/* Vision */}
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "48px 32px", transition: "transform 0.3s ease, border-color 0.3s ease", cursor: "default" }}
                 onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = "rgba(242, 167, 18, 0.4)"; }}
                 onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
            >
              <VisionIcon />
              <h3 style={{ color: "white", marginTop: "24px", marginBottom: "16px", fontSize: "20px", fontWeight: 700, letterSpacing: "0.1em" }} className="vad-about-card__title--green">VISION</h3>
              <p style={{ color: "var(--vad-on-navy-muted)", fontSize: "15.5px", lineHeight: 1.6, margin: 0 }}>Make a world where every talented student gets chances, guidance, and grows into success.</p>
            </div>
            
            {/* Mission */}
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "48px 32px", transition: "transform 0.3s ease, border-color 0.3s ease", cursor: "default" }}
                 onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = "rgba(242, 167, 18, 0.4)"; }}
                 onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
            >
              <MissionIcon />
              <h3 style={{ color: "white", marginTop: "24px", marginBottom: "16px", fontSize: "20px", fontWeight: 700, letterSpacing: "0.1em" }} className="vad-about-card__title--green">MISSION</h3>
              <p style={{ color: "var(--vad-on-navy-muted)", fontSize: "15.5px", lineHeight: 1.6, margin: 0 }}>Help underprivileged talented students study well, give support, and help them succeed and settle in life.</p>
            </div>
            
            {/* Approach */}
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "48px 32px", transition: "transform 0.3s ease, border-color 0.3s ease", cursor: "default" }}
                 onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = "rgba(242, 167, 18, 0.4)"; }}
                 onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
            >
              <ApproachIcon />
              <h3 style={{ color: "white", marginTop: "24px", marginBottom: "16px", fontSize: "20px", fontWeight: 700, letterSpacing: "0.1em" }} className="vad-about-card__title--green">APPROACH</h3>
              <p style={{ color: "var(--vad-on-navy-muted)", fontSize: "15.5px", lineHeight: 1.6, margin: 0 }}>Give scholarships, guidance, laptops, financial support, and mentorship, so students can learn, grow, and succeed.</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* 4. Impact & Recognition */}
      <section className="vad-section vad-section--paper">
        <div className="vad-container">
          <div className="vad-head vad-head--center" style={{ marginBottom: "60px" }}>
            <span className="vad-eyebrow vad-eyebrow--dark">Our Impact</span>
            <h2>Real Impact, Independently Noticed</h2>
            <div style={{ width: "60px", height: "4px", background: "var(--vad-navy-700)", margin: "24px auto 0", borderRadius: "2px" }}></div>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px" }}>
            
            {/* Left Column: Testimonials */}
            <div>
               <h3 style={{ fontSize: "24px", color: "var(--vad-navy-950)", marginBottom: "32px", fontWeight: 700, display: "flex", alignItems: "center", gap: "12px" }}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--vad-gold-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                 What Students and Parents Say
               </h3>
               
               <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                 <div style={{ padding: "32px", background: "#ffffff", borderRadius: "16px", border: "1px solid var(--vad-line-ink)", boxShadow: "0 12px 24px -6px rgba(10, 16, 48, 0.05)", position: "relative" }}>
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--vad-gold-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", top: "24px", right: "24px", opacity: 0.1, width: "48px", height: "48px" }}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path></svg>
                   <p style={{ fontStyle: "italic", fontSize: "16px", color: "var(--vad-navy-800)", margin: "0 0 16px 0", lineHeight: 1.6, position: "relative", zIndex: 1 }}>
                     &quot;I got sponsorship through the Vadaanya Talent Test. Now in Intermediate, my fees are covered, and I&apos;m preparing for IIT-JEE Mains.&quot;
                   </p>
                   <div>
                     <p style={{ fontWeight: 700, color: "var(--vad-ink)", margin: 0, fontSize: "14px" }}>Yashwanth Kumar Reddy</p>
                     <p style={{ fontSize: "13px", color: "var(--vad-gold-deep)", margin: "4px 0 0 0", fontWeight: 600 }}>Beneficiary</p>
                   </div>
                 </div>

                 <div style={{ padding: "32px", background: "#ffffff", borderRadius: "16px", border: "1px solid var(--vad-line-ink)", boxShadow: "0 12px 24px -6px rgba(10, 16, 48, 0.05)", position: "relative" }}>
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--vad-gold-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", top: "24px", right: "24px", opacity: 0.1, width: "48px", height: "48px" }}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path></svg>
                   <p style={{ fontStyle: "italic", fontSize: "16px", color: "var(--vad-navy-800)", margin: "0 0 16px 0", lineHeight: 1.6, position: "relative", zIndex: 1 }}>
                     &quot;Thanks to Vadaanya&apos;s tuition support, my son could focus on his studies without worrying about fees.&quot;
                   </p>
                   <div>
                     <p style={{ fontWeight: 700, color: "var(--vad-ink)", margin: 0, fontSize: "14px" }}>Anjinappa</p>
                     <p style={{ fontSize: "13px", color: "var(--vad-gold-deep)", margin: "4px 0 0 0", fontWeight: 600 }}>Parent</p>
                   </div>
                 </div>
               </div>
            </div>

            {/* Right Column: Recognition */}
            <div>
               <h3 style={{ fontSize: "24px", color: "var(--vad-navy-950)", marginBottom: "32px", fontWeight: 700, display: "flex", alignItems: "center", gap: "12px" }}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--vad-gold-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                 Recognition Along the Way
               </h3>
               
               <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                 {[
                   'Featured as a Change Leader on Telugu talk show "Unstoppable"',
                   'Yuva Bharat Gaurav Award (Bharatiya Vikas Sangam)',
                   'CSR Summit Recognition for digital education',
                   'Special invitee to AP Governor\'s Raj Bhavan "At Home" event'
                 ].map((item, i) => (
                   <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "16px", padding: "24px", background: "rgba(242, 167, 18, 0.05)", borderRadius: "12px", border: "1px solid rgba(242, 167, 18, 0.2)" }}>
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--vad-gold-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                     <span style={{ color: "var(--vad-navy-800)", fontSize: "16px", lineHeight: 1.5, fontWeight: 500 }}>{item}</span>
                   </li>
                 ))}
               </ul>
            </div>
            
          </div>
        </div>
      </section>

      {/* 5. Registration + CTA — dark */}
      <section className="vad-section vad-section--deep">
        <div className="vad-container vad-about__cta">
          <div className="vad-about__cta-text">
            <span className="vad-eyebrow">Get Involved</span>
            <h2 className="vad-about__cta-title">
              Support a child&apos;s journey from <span style={{ color: "var(--vad-gold)" }}>Class 1 to Graduation</span>
            </h2>
            <p className="vad-about__cta-desc">
              Vadaanya Janaa Society is registered under the Andhra Pradesh Societies
              Registration Act, 2001 (Reg. No. 1433/2010). Your contribution is eligible for
              80G tax exemption.
            </p>
            <div className="vad-about__cta-btns">
              <a href="/" className="vad-btn vad-btn--gold">
                Donate Now
                <span className="vad-arrow" aria-hidden="true">&rarr;</span>
              </a>
              <a href="/contact" className="vad-btn vad-btn--outline">
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
              <div><dt>Location</dt><dd>Andhra Pradesh, India</dd></div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
