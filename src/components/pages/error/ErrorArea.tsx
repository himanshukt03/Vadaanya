import Link from "next/link";
import Arrow from "@/components/common/Arrow";

const ErrorArea = () => {
  return (
    <section
      style={{
        background: "#ffffff",
        padding: "100px 20px 120px",
        minHeight: "65vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div className="container">
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Minimal Tag */}
          <span
            style={{
              display: "inline-block",
              background: "#fff9eb",
              border: "1px solid #fce8b3",
              color: "#d97706",
              fontWeight: 700,
              fontSize: "12px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "6px 16px",
              borderRadius: "100px",
              marginBottom: "24px",
            }}
          >
            404 Error
          </span>

          {/* Big Solid 404 Number */}
          <h1
            style={{
              fontSize: "clamp(80px, 14vw, 130px)",
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              color: "#0a1030",
              margin: "0 0 20px",
              fontFamily: "var(--font-poppins), sans-serif",
            }}
          >
            404
          </h1>

          {/* Headline */}
          <h2
            style={{
              fontSize: "clamp(22px, 3vw, 32px)",
              fontWeight: 800,
              color: "#0a1030",
              margin: "0 0 14px",
              letterSpacing: "-0.02em",
            }}
          >
            Page not found
          </h2>

          {/* Subtext */}
          <p
            style={{
              fontSize: "16px",
              color: "#64748b",
              lineHeight: 1.6,
              margin: "0 0 36px",
              maxWidth: "460px",
            }}
          >
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          {/* Action Links */}
          <div
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#0a1030",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "14.5px",
                padding: "13px 28px",
                borderRadius: "100px",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
            >
              <span>Back to Homepage</span>
              <Arrow />
            </Link>

            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                color: "#0a1030",
                fontWeight: 600,
                fontSize: "14.5px",
                padding: "13px 28px",
                borderRadius: "100px",
                textDecoration: "none",
                transition: "border-color 0.2s",
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorArea;
