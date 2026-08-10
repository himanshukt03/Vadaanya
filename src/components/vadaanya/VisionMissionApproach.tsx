import React from "react";

const VisionIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const MissionIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const ApproachIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const vmaItems = [
  {
    id: "vision",
    badge: "VISION",
    title: "Our Vision",
    icon: VisionIcon,
    desc: "Make a world where every talented student gets chances, guidance, and grows into success.",
  },
  {
    id: "mission",
    badge: "MISSION",
    title: "Our Mission",
    icon: MissionIcon,
    desc: "Help underprivileged talented students study well, give support, and help them succeed and settle in life.",
  },
  {
    id: "approach",
    badge: "APPROACH",
    title: "Our Approach",
    icon: ApproachIcon,
    desc: "Give scholarships, guidance, laptops, financial support, and mentorship, so students can learn, grow, and succeed.",
  },
];

export default function VisionMissionApproach() {
  return (
    <section className="vad-section" style={{ padding: "32px 0", background: "#f8fafc", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
      <div className="vad-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "18px",
          }}
        >
          {vmaItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                style={{
                  background: "#ffffff",
                  borderRadius: "14px",
                  padding: "20px 22px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 3px 12px rgba(10, 16, 48, 0.03)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.borderColor = "var(--vad-gold-dark, #d97706)";
                  e.currentTarget.style.boxShadow = "0 8px 22px rgba(10, 16, 48, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.boxShadow = "0 3px 12px rgba(10, 16, 48, 0.03)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "10px",
                      background: "rgba(242, 167, 18, 0.12)",
                      color: "var(--vad-gold-dark, #d97706)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <IconComponent />
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "10.5px",
                        fontWeight: 800,
                        letterSpacing: "1px",
                        color: "var(--vad-gold-dark, #d97706)",
                        display: "block",
                        textTransform: "uppercase",
                        lineHeight: 1,
                        marginBottom: "3px",
                      }}
                    >
                      {item.badge}
                    </span>
                    <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "#0a1030", lineHeight: 1.2 }}>
                      {item.title}
                    </h3>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: "13.5px", color: "#475569", lineHeight: 1.5, fontWeight: 500 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
