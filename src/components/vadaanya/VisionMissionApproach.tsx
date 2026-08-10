"use client";

import React from "react";

const vmaItems = [
  {
    id: "vision",
    title: "Our Vision",
    desc: "Make a world where every talented student gets chances, guidance, and grows into success.",
  },
  {
    id: "mission",
    title: "Our Mission",
    desc: "Help underprivileged talented students study well, give support, and help them succeed and settle in life.",
  },
  {
    id: "approach",
    title: "Our Approach",
    desc: "Give scholarships, guidance, laptops, financial support, and mentorship, so students can learn, grow, and succeed.",
  },
];

export default function VisionMissionApproach() {
  return (
    <section className="vad-section" style={{ padding: "36px 0 44px", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
      <div className="vad-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "22px",
          }}
        >
          {vmaItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "24px 26px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 14px rgba(10, 16, 48, 0.03)",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "var(--vad-gold-dark, #d97706)";
                e.currentTarget.style.boxShadow = "0 10px 24px rgba(10, 16, 48, 0.07)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(10, 16, 48, 0.03)";
              }}
            >
              <h3 style={{ margin: "0 0 10px", fontSize: "18px", fontWeight: 800, color: "#0a1030", lineHeight: 1.25 }}>
                {item.title}
              </h3>
              
              <div
                style={{
                  width: "36px",
                  height: "3px",
                  background: "var(--vad-gold-dark, #d97706)",
                  borderRadius: "2px",
                  marginBottom: "14px",
                }}
              />

              <p style={{ margin: 0, fontSize: "14px", color: "#475569", lineHeight: 1.6, fontWeight: 500 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
