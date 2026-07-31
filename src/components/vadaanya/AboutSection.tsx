import Image from "next/image";



const RocketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2l.5-.5a5.4 5.4 0 0 0 1-1.5L19 7.5c2-2 3-4.5 3-4.5s-2.5 1-4.5 3L7.5 16c-.5.4-1 .7-1.5 1z" />
    <path d="m12 15-3-3" />
    <path d="m15 12-3-3" />
    <path d="M12 19v3" />
    <path d="M19 12h3" />
  </svg>
);

export default function AboutSection() {
  return (
    <section id="about" className="vad-section vad-section--paper">
      <div className="vad-container">
        <div className="vad-about__split">
          {/* Text Content */}
          <div>
            <div className="vad-head vad-head--light">
              <h2>
                Turning a Government-School Child&apos;s Hope into a{" "}
                <span style={{ color: "var(--vad-navy-700)" }}>Degree</span>
              </h2>
              <p className="vad-lead" style={{ color: "var(--vad-ink-soft)", marginBottom: "24px" }}>
                We are a passionate community of volunteers dedicated to bridging the educational divide. By providing scholarships, mentorship, and essential resources like digital tools, we empower underprivileged students across Andhra Pradesh and Telangana to build a brighter, self-reliant future.
              </p>
            </div>

            <div style={{ marginTop: "36px", display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <a href="/about" className="vad-btn vad-btn--navy">
                Know More <span className="vad-arrow" aria-hidden="true">→</span>
              </a>
              <a href="#donate" className="vad-btn vad-btn--outline-dark">
                Support a Student
              </a>
            </div>
          </div>

          {/* Visual Content */}
          <div className="vad-about__visual" style={{ maxWidth: "520px", margin: "0 auto" }}>
            <Image
              src="/JAN_3626 (1).jpg"
              alt="Vadaanya team with students"
              width={600}
              height={500}
              className="vad-about__img"
            />

            {/* Bottom Left Floating Card */}
            <div className="vad-about__float-card">
              <div className="vad-about__float-icon">
                <RocketIcon />
              </div>
              <div>
                <strong>15k+</strong>
                <span>STUDENTS SUPPORTED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
