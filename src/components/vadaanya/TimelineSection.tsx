import React from 'react';

const timelineData = [
  {
    year: '2010',
    desc: 'Vadaanya Janaa Society was registered'
  },
  {
    year: '2012',
    desc: 'Launched digital initiatives, outreach programs, and workshops in government schools'
  },
  {
    year: '2015',
    desc: 'Introduced mentorship and tuition support for underprivileged students'
  },
  {
    year: '2018',
    desc: 'Started distributing laptops to students in need to support their education'
  },
  {
    year: '2019',
    desc: 'Our first student secured a state government job and settled in life'
  },
  {
    year: '2020',
    desc: 'Supplied oxygen cylinders during the COVID-19 crisis'
  },
  {
    year: '2021',
    desc: 'Conducted the first Talent Test across Andhra Pradesh & Telangana'
  },
  {
    year: '2023',
    desc: 'Started mock tests to prepare students for state government examinations'
  },
  {
    year: '2025',
    desc: 'Celebrating 15 years of transforming lives'
  }
];

export default function TimelineSection() {
  return (
    <section className="vad-timeline-section">
      <div className="vad-container">
        
        <div className="vad-head vad-head--center vad-head--light" style={{ marginBottom: "50px" }}>
          <span className="vad-eyebrow vad-eyebrow--dark">OUR JOURNEY over the years</span>
          <h2 style={{ fontSize: "clamp(30px, 5vw, 42px)", fontWeight: 800, marginTop: "12px", letterSpacing: "-1px", color: "white" }}>
            Key <span style={{ color: "var(--vad-gold)" }}>Milestones</span>
          </h2>
        </div>

        <div className="vad-timeline-grid">
          {timelineData.map((item, idx) => (
            <div className="vad-timeline-item" key={idx}>
              <div className="vad-timeline-year-wrapper">
                <span className="vad-timeline-year">{item.year}</span>
                <div className="vad-timeline-arrow"></div>
              </div>
              <p className="vad-timeline-desc">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
