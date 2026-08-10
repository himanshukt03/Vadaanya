"use client";

import React from "react";

const vmaItems = [
  {
    id: "vision",
    badge: "VISION",
    title: "Our Vision",
    desc: "Make a world where every talented student gets chances, guidance, and grows into success.",
  },
  {
    id: "mission",
    badge: "MISSION",
    title: "Our Mission",
    desc: "Help underprivileged talented students study well, give support, and help them succeed and settle in life.",
  },
  {
    id: "approach",
    badge: "APPROACH",
    title: "Our Approach",
    desc: "Give scholarships, guidance, laptops, financial support, and mentorship, so students can learn, grow, and succeed.",
  },
];

export default function VisionMissionApproach() {
  return (
    <section className="vad-section" style={{ padding: "28px 0", background: "#f8fafc", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
      <div className="vad-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "18px",
          }}
        >
          {vmaItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#ffffff",
                borderRadius: "14px",
                padding: "20px 22px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 10px rgba(10, 16, 48, 0.03)",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.borderColor = "var(--vad-gold-dark, #d97706)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(10, 16, 48, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.boxShadow = "0 2px 10px rgba(10, 16, 48, 0.03)";
              }}
            >
              {/* Top Accent Gold Line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: "linear-gradient(90deg, var(--vad-gold-dark, #d97706) 0%, #f2a712 100%)",
                }}
              />

              <div style={{ marginBottom: "8px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "1.2px",
                    color: "var(--vad-gold-dark, #d97706)",
                    display: "block",
                    textTransform: "uppercase",
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  {item.badge}
                </span>
                <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 800, color: "#0a1030", lineHeight: 1.2 }}>
                  {item.title}
                </h3>
              </div>

              <p style={{ margin: 0, fontSize: "13.5px", color: "#475569", lineHeight: 1.55, fontWeight: 500 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
