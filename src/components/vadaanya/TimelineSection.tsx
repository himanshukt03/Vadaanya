import React from 'react';
import type { MilestoneItem } from '@/lib/sanity/queries';
import { milestonesData } from '@/data/vadaanya/MilestonesData';

interface TimelineSectionProps {
  milestones?: MilestoneItem[];
}

export default function TimelineSection({ milestones }: TimelineSectionProps) {
  const displayMilestones = (milestones && milestones.length > 0)
    ? milestones
    : milestonesData.map((m, idx) => ({ id: String(m.id || idx + 1), year: m.year, desc: m.desc }));

  return (
    <section className="vad-timeline-section">
      <div className="vad-container">
        
        <div className="vad-head vad-head--center" style={{ marginBottom: "24px" }}>
          <span className="vad-eyebrow vad-eyebrow--dark">OUR JOURNEY over the years</span>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 800, marginTop: "6px", letterSpacing: "-0.5px", color: "#0a1030" }}>
            Key <span style={{ color: "var(--vad-gold-dark, #d97706)" }}>Milestones</span>
          </h2>
        </div>

        <div className="vad-timeline-grid">
          {displayMilestones.map((item, idx) => (
            <div className="vad-timeline-item" key={item.id || idx}>
              <div className="vad-timeline-year-wrapper">
                <span className="vad-timeline-year">{item.year}</span>
              </div>
              <p className="vad-timeline-desc">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
