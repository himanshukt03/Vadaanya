import Image from "next/image";
import { HomeAboutItem } from "@/lib/sanity/queries";

const RocketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2l.5-.5a5.4 5.4 0 0 0 1-1.5L19 7.5c2-2 3-4.5 3-4.5s-2.5 1-4.5 3L7.5 16c-.5.4-1 .7-1.5 1z" />
    <path d="m12 15-3-3" />
    <path d="m15 12-3-3" />
    <path d="M12 19v3" />
    <path d="M19 12h3" />
  </svg>
);

interface AboutSectionProps {
  data: HomeAboutItem;
}

export default function AboutSection({ data }: AboutSectionProps) {
  // Parse title to handle <span> tags for styling
  const renderTitle = () => {
    const parts = data.title.split(/<span>(.*?)<\/span>/);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is inside a <span> tag
        return (
          <span key={index} className="vad-text-navy">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section id="about" className="vad-section vad-section--paper">
      <div className="vad-container">
        <div className="vad-about__split">
          {/* Text Content */}
          <div className="vad-about__text">
            <div className="vad-head vad-head--light">
              <h2>{renderTitle()}</h2>
              <p className="vad-lead">
                {data.description}
              </p>
            </div>

            <div className="vad-about__actions">
              <a href="/about" className="vad-btn vad-btn--navy">
                Know More <span className="vad-arrow" aria-hidden="true">→</span>
              </a>
              <a href="#donate" className="vad-btn vad-btn--outline-dark">
                Support a Student
              </a>
            </div>
          </div>

          {/* Visual Content */}
          <div className="vad-about__visual">
            <Image
              src={data.imageUrl}
              alt="Vadaanya Talent Test & Gathering"
              width={600}
              height={450}
              className="vad-about__img"
              placeholder={data.blurDataUrl ? "blur" : undefined}
              blurDataURL={data.blurDataUrl}
            />

            {/* Bottom Left Floating Card */}
            <div className="vad-about__float-card">
              <div className="vad-about__float-icon">
                <RocketIcon />
              </div>
              <div>
                <strong>{data.statsLabel}</strong>
                <span>{data.statsText}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
