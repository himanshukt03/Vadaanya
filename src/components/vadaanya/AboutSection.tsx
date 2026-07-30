import Image from "next/image";

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

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
              <p className="vad-lead" style={{ color: "var(--vad-ink-soft)" }}>
                Vadaanya Janaa Society was founded on a single conviction: every child, regardless of birth, deserves access to quality education. We walk alongside students from Class 1 through post-graduation.
              </p>
            </div>

            {/* Feature List */}
            <ul className="vad-about__features" aria-label="Key highlights">
              <li>
                <div className="vad-about__feature-icon">
                  <CheckIcon />
                </div>
                <div>
                  <h3>Right to Education</h3>
                  <p>Financial support for schooling is not charity but justice, ensuring no child stops learning due to economic hardship.</p>
                </div>
              </li>
              <li>
                <div className="vad-about__feature-icon">
                  <CheckIcon />
                </div>
                <div>
                  <h3>Vadaanya Talent Test</h3>
                  <p>A statewide examination endorsed by the AP Education Ministry to identify and nurture merit in rural communities.</p>
                </div>
              </li>
            </ul>

            <div style={{ marginTop: "36px", display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <a href="#whatwedo" className="vad-btn vad-btn--navy">
                Our Programmes <span className="vad-arrow" aria-hidden="true">→</span>
              </a>
              <a href="#donate" className="vad-btn vad-btn--outline-dark">
                Support a Student
              </a>
            </div>
          </div>

          {/* Visual Content */}
          <div className="vad-about__visual">
            <Image
              src="/JAN_3626 (1).jpg"
              alt="Vadaanya team with students"
              width={600}
              height={500}
              className="vad-about__img"
            />
            
            {/* Top Right Floating Badge */}
            <div className="vad-about__float vad-about__float--tr">
              Education For All
            </div>

            {/* Bottom Left Floating Card */}
            <div className="vad-about__float-card">
              <div className="vad-about__float-icon">
                <RocketIcon />
              </div>
              <div>
                <strong>5,000+</strong>
                <span>STUDENTS SUPPORTED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
