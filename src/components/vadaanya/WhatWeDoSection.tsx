import { pillars } from "@/data/vadaanya/WhatWeDoData";
import React from "react";

// SVG icons for each pillar
const TalentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const ScholarshipsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const DigitalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const MentorshipIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const PrepIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const SchoolIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const icons: Record<string, React.FC> = {
  talent: TalentIcon,
  scholarships: ScholarshipsIcon,
  digital: DigitalIcon,
  mentorship: MentorshipIcon,
  prep: PrepIcon,
  school: SchoolIcon,
};

export default function WhatWeDoSection() {
  return (
    <section id="whatwedo" className="vad-section vad-section--paper" style={{ padding: "36px 0 56px", background: "#ffffff" }}>
      <div className="vad-container">
        <div className="vad-head vad-head--center vad-head--light">
          <span className="vad-eyebrow vad-eyebrow--dark">What We Do</span>
          <h2>
            Six ways we clear the path.
          </h2>
          <p className="vad-lead">
            Talent is spread evenly across villages. Opportunity is not. Each programme removes one barrier between a capable student and the future they&apos;ve earned.
          </p>
        </div>

        <div className="vad-scaling-grid">
          {pillars.map((pillar, index) => {
            const Icon = icons[pillar.icon];
            const num = (index + 1).toString().padStart(2, "0");
            return (
              <div key={pillar.id} className="vad-scaling-card">
                <div className="vad-scaling-number">{num}</div>
                <div className="vad-scaling-icon-wrapper">
                  <Icon />
                </div>
                <h3 className="vad-scaling-title">{pillar.title}</h3>
                <p className="vad-scaling-desc">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
