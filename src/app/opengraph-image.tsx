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
            gap: "18px",
            maxWidth: "1020px",
            position: "relative",
            marginTop: "-20px",
          }}
        >
          {/* Official Logo (Bigger) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt="Vadaanya Janaa Society Logo"
            width={600}
            height={150}
            style={{
              objectFit: "contain",
            }}
          />

          {/* Tagline directly below logo (Extra Bold & Bigger: "Be the one, for the change") */}
          <div
            style={{
              fontSize: "42px",
              fontWeight: 900,
              color: "#f2a712",
              letterSpacing: "0.5px",
              marginTop: "4px",
            }}
          >
            Be the one, for the change
          </div>

          {/* Description (Bigger, Bolder & Readable across India) */}
          <div
            style={{
              fontSize: "30px",
              color: "#ffffff",
              lineHeight: 1.4,
              fontWeight: 700,
              maxWidth: "1020px",
              display: "flex",
              textAlign: "center",
            }}
          >
            Empowering government-school students through talent tests, financial assistance, scholarships & mentorship across India since 2010.
          </div>
        </div>

        {/* Bottom Details — Anchored at the bottom (Crisp White Text & Bigger) */}
        <div
          style={{
            position: "absolute",
            bottom: "28px",
            display: "flex",
            alignItems: "center",
            gap: "32px",
            fontSize: "20px",
            color: "#ffffff",
            fontWeight: 700,
          }}
        >
          <span style={{ color: "#f2a712", fontWeight: 900, fontSize: "22px" }}>vadaanya.org</span>
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
