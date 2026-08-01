import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export const alt = "Vadaanya Janaa Society — From Dreams to Degrees";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Read logo and background image from public/ and convert to base64 data URLs
  const logoPath = path.join(process.cwd(), "public", "logos", "PPT-logo.png");
  const logoBuffer = fs.readFileSync(logoPath);
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  const bgPath = path.join(process.cwd(), "public", "vadaanya-bg.jpg");
  const bgBuffer = fs.readFileSync(bgPath);
  const bgSrc = `data:image/jpeg;base64,${bgBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#060b22",
          fontFamily: "sans-serif",
          position: "relative",
          padding: "50px 60px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Background Image: vadaanya-bg.jpg */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgSrc}
          alt="Background"
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "630px",
            objectFit: "cover",
          }}
        />

        {/* Dark Navy Overlay for contrast and softness */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(6, 11, 34, 0.72)",
            display: "flex",
          }}
        />

        {/* Top Gold Accent Line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #f2a712 0%, #ffd066 50%, #f2a712 100%)",
            display: "flex",
          }}
        />

        {/* Centered Hero Group (Logo + Tagline + Description tightly grouped) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "14px",
            maxWidth: "900px",
            position: "relative",
            marginTop: "-20px",
          }}
        >
          {/* Official Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt="Vadaanya Janaa Society Logo"
            width={460}
            height={115}
            style={{
              objectFit: "contain",
            }}
          />

          {/* Tagline directly below logo */}
          <div
            style={{
              fontSize: "30px",
              fontWeight: 800,
              color: "#f2a712",
              letterSpacing: "0.5px",
              marginTop: "2px",
            }}
          >
            From Dreams to Degrees
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "20px",
              color: "rgba(255, 255, 255, 0.9)",
              lineHeight: 1.6,
              fontWeight: 400,
              maxWidth: "860px",
              display: "flex",
              textAlign: "center",
            }}
          >
            Empowering government-school students through talent tests, financial assistance, scholarships & mentorship across Andhra Pradesh & Telangana since 2010.
          </div>
        </div>

        {/* Bottom Details — Anchored at the bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "35px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
            fontSize: "15px",
            color: "rgba(255, 255, 255, 0.6)",
            fontWeight: 500,
          }}
        >
          <span style={{ color: "#f2a712", fontWeight: 700, fontSize: "16px" }}>vadaanya.org</span>
          <span>·</span>
          <span>80G & 12A Certified</span>
          <span>·</span>
          <span>AP Reg. 498/2010</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
