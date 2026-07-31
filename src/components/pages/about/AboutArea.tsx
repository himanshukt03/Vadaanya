import React from 'react';
import Image from 'next/image';

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

const AboutArea = () => {
  return (
    <section className="vad-about-vadaanya">
      <div className="vad-about-vadaanya__top">
        <div className="vad-container">
          <h2 className="vad-about-vadaanya__title">ABOUT VADAANYA</h2>
          <div className="vad-about-vadaanya__line"></div>
          <p className="vad-about-vadaanya__text">
            Vadaanya Janaa Society is a non-profit registered in November 2010 that works to improve living standards by expanding access to education for under-privileged children from schooling to graduation following the principle of the Right to Education.
          </p>
          <br />
          <p className="vad-about-vadaanya__text">
            Fifteen years ago we set out with a simple belief — every child with a will to learn deserves a chance. Vadaanya began as a small band of volunteers and today stands as a community that has kept that belief alive through scholarships, teaching drives and mentorship. Our work is not about charity — it’s about creating pathways: from school benches to classrooms, and from dreams to degrees. None of this would be possible without our volunteers, partner schools and the generous support of people who believe in education as the engine of change. Join us in this next chapter — your small monthly contribution can turn a child’s quiet hope into a degree, a livelihood, and a new future.
          </p>
          
          <div style={{ marginTop: "40px", padding: "24px", background: "rgba(255,255,255,0.03)", borderRadius: "8px", borderLeft: "4px solid var(--vad-gold)", maxWidth: "900px" }}>
             <p style={{ fontStyle: "italic", fontSize: "18px", color: "var(--vad-gold)", margin: "0 0 16px 0" }}>
               &quot;Education is the bridge from dreams to degrees.&quot;
             </p>
             <p style={{ fontWeight: 700, color: "white", margin: 0, letterSpacing: "0.05em" }}>
               ASHOK PADAPATI
             </p>
             <p style={{ fontSize: "14px", color: "var(--vad-on-navy-muted)", margin: 0 }}>
               FOUNDING PRESIDENT
             </p>
          </div>
        </div>
      </div>
      
      <div className="vad-about-vadaanya__bottom">
        <Image 
          src="/JAN_3626 (1).jpg" 
          alt="Students holding certificates" 
          fill 
          style={{ objectFit: 'cover' }}
          className="vad-about-vadaanya__bg"
        />
        
        <div className="vad-container vad-about-vadaanya__cards">
          <div className="vad-about-card">
            <VisionIcon />
            <h3 className="vad-about-card__title vad-about-card__title--green">VISION</h3>
            <p className="vad-about-card__desc">Make a world where every talented student gets chances, guidance, and grows into success.</p>
          </div>
          <div className="vad-about-card">
            <MissionIcon />
            <h3 className="vad-about-card__title vad-about-card__title--green">MISSION</h3>
            <p className="vad-about-card__desc">Help underprivileged talented students study well, give support, and help them succeed and settle in life.</p>
          </div>
          <div className="vad-about-card">
            <ApproachIcon />
            <h3 className="vad-about-card__title vad-about-card__title--green">APPROACH</h3>
            <p className="vad-about-card__desc">Give scholarships, guidance, laptops, financial support, and mentorship, so students can learn, grow, and succeed.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutArea;
