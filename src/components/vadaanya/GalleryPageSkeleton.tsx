export default function GalleryPageSkeleton() {
  return (
    <>
      {/* Hero Skeleton */}
      <section className="vad-page-hero vad-section--deep">
        <div className="vad-container vad-page-hero__inner">
          <span className="vad-eyebrow" style={{ color: "var(--vad-gold)" }}>
            Our Media
          </span>
          <h1 className="vad-page-hero__title">
            Vadaanya <span className="vad-page-hero__accent">Media</span>
          </h1>
          <p
            className="vad-page-hero__lead"
            style={{
              fontSize: "16.5px",
              maxWidth: "620px",
              margin: "12px auto 0",
              color: "#ffffff",
            }}
          >
            Explore our photo galleries, newspaper print media, news updates, and YouTube video highlights.
          </p>
        </div>
      </section>

      {/* Tabs + Skeleton Grid */}
      <section className="vad-section vad-section--paper" style={{ padding: "50px 0 80px" }}>
        <div className="vad-container">
          {/* Desktop Pill Tabs Container */}
          <div className="vad-media-tabs-desktop">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "5px",
                background: "#ffffff",
                borderRadius: "9999px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0,0,0,0.04)",
                border: "1px solid rgba(0, 0, 0, 0.08)",
                gap: "4px",
              }}
            >
              {["Gallery", "Print Media", "News Articles", "Youtube"].map((label) => (
                <span
                  key={label}
                  style={{
                    padding: "10px 24px",
                    borderRadius: "9999px",
                    fontSize: "14.5px",
                    fontWeight: 700,
                    display: "inline-block",
                    background:
                      label === "Gallery"
                        ? "linear-gradient(135deg, var(--vad-navy-950), var(--vad-navy-800))"
                        : "transparent",
                    color: label === "Gallery" ? "#ffffff" : "#475569",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Mobile Dropdown Selector */}
          <div className="vad-media-tabs-mobile">
            <div className="vad-media-select-wrap">
              <select
                aria-label="Select Media Category"
                defaultValue="gallery"
                className="vad-media-select"
              >
                <option value="gallery">Gallery</option>
                <option value="print">Print Media</option>
                <option value="news">News</option>
                <option value="youtube">Youtube</option>
              </select>
              <div className="vad-media-select-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>

          {/* 4 Skeleton Gallery Cards */}
          <div className="vad-media-grid">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                  border: "1px solid rgba(0,0,0,0.04)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  className="vad-skeleton-shimmer vad-media-card-img-wrap"
                  style={{ width: "100%", height: "170px" }}
                />
                <div className="vad-media-card-body" style={{ padding: "18px 20px" }}>
                  <div
                    className="vad-skeleton-shimmer"
                    style={{
                      width: "80%",
                      height: "18px",
                      borderRadius: "6px",
                      marginBottom: "10px",
                    }}
                  />
                  <div
                    className="vad-skeleton-shimmer"
                    style={{ width: "60%", height: "14px", borderRadius: "4px" }}
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
