export default function SuccessStoriesSkeleton() {
  return (
    <>
      {/* Hero Skeleton */}
      <section className="vad-page-hero vad-section--deep">
        <div className="vad-container vad-page-hero__inner">
          <span className="vad-eyebrow" style={{ color: "var(--vad-gold)" }}>
            Success Stories
          </span>
          <h1 className="vad-page-hero__title">
            Students Who <span className="vad-page-hero__accent">Made It</span>
          </h1>
          <p
            className="vad-page-hero__lead"
            style={{
              fontSize: "16.5px",
              maxWidth: "660px",
              margin: "12px auto 0",
              color: "#ffffff",
            }}
          >
            Loading inspiring stories of students whose lives were transformed through education and support...
          </p>
        </div>
      </section>

      {/* Cards Grid Skeleton */}
      <section className="vad-section vad-section--paper" style={{ padding: "50px 0 80px" }}>
        <div className="vad-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "24px",
              marginBottom: "44px",
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                style={{
                  background: "#ffffff",
                  borderRadius: "18px",
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                  border: "1px solid rgba(0,0,0,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  height: "430px",
                }}
              >
                {/* Image placeholder */}
                <div
                  style={{
                    width: "100%",
                    height: "270px",
                    background: "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite",
                  }}
                />
                {/* Content placeholder */}
                <div style={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      width: "70%",
                      height: "16px",
                      background: "#e5e7eb",
                      borderRadius: "4px",
                      marginBottom: "8px",
                    }}
                  />
                  <div
                    style={{
                      width: "45%",
                      height: "12px",
                      background: "#e5e7eb",
                      borderRadius: "4px",
                      marginBottom: "10px",
                    }}
                  />
                  <div
                    style={{
                      width: "100%",
                      height: "60px",
                      background: "#e5e7eb",
                      borderRadius: "4px",
                      flex: 1,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
