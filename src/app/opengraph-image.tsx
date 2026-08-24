import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export const alt = "Vadaanya Janaa Society — Be the one, for the change";
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
          padding: "35px 45px",
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
            height: "8px",
            background: "linear-gradient(90deg, #f2a712 0%, #ffd066 50%, #f2a712 100%)",
            display: "flex",
          }}
        />

        {/* Centered Hero Group (Logo + Tagline + Description) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "14px",
            maxWidth: "1060px",
            position: "relative",
            marginTop: "-25px",
          }}
        >
          {/* Official Logo (Bigger & Prominent for large OG banner) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt="Vadaanya Janaa Society Logo"
            width={680}
            height={170}
            style={{
              objectFit: "contain",
            }}
          />

          {/* Tagline directly below logo (Tucked closer to logo & Extra Bold) */}
          <div
            style={{
              fontSize: "46px",
              fontWeight: 900,
              color: "#ffbe1a",
              letterSpacing: "0.4px",
              marginTop: "-16px",
              marginBottom: "4px",
              textShadow: "0 2px 12px rgba(0,0,0,0.8), 0 0 2px rgba(255,190,26,0.4)",
            }}
          >
            Be the one, for the change
          </div>

          {/* Description (Bigger, Bolder & Crisp White) */}
          <div
            style={{
              fontSize: "34px",
              color: "#ffffff",
              lineHeight: 1.35,
              fontWeight: 800,
              maxWidth: "1060px",
              display: "flex",
              textAlign: "center",
              textShadow: "0 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            Empowering government-school students through talent tests, financial assistance, scholarships & mentorship across India since 2010.
          </div>
        </div>

        {/* Bottom Details — Anchored at the bottom (Crisp White Text & Bigger) */}
        <div
          style={{
            position: "absolute",
            bottom: "26px",
            display: "flex",
            alignItems: "center",
            gap: "30px",
            fontSize: "23px",
            color: "#ffffff",
            fontWeight: 800,
            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
          }}
        >
          <span style={{ color: "#f2a712", fontWeight: 900, fontSize: "25px" }}>vadaanya.org</span>
          <span>·</span>
          <span>80G & 12A Certified</span>
          <span>·</span>
          <span>Reg. No. 1433/2010</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
