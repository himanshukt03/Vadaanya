import Image from "next/image";

const objectives = [
  "To help the poor and needy by providing basic necessities such as food, clothing & shelter.",
  "To transform the education system by providing an equal platform to all children irrespective of their status, but based only on their zeal to learn.",
  "To assist and support other organizations that strive for the cause of visually challenged, old aged, orphaned and AIDS affected people.",
  "To make people realize that it is incumbent on them to serve the society & thereby the nation.",
  "To bring awareness in the society about the importance of education, health and hygiene.",
  "To provide financial aid to social organizations suffering due to lack of funds.",
  "To promote this organization throughout the country and to encourage the youth and people of all age groups to actively participate in the process, thereby serving a noble cause.",
];

const pillars = [
  {
    icon: "education",
    title: "Education Support",
    desc: "To transform the education system by offering opportunities and financial assistance to all children irrespective of their status, but based only on their zeal to learn.",
  },
  {
    icon: "collaboration",
    title: "Collaboration",
    desc: "To assist and support other organizations that strive for the cause of visually challenged, old aged, orphaned and AIDS affected people.",
  },
  {
    icon: "ecosystem",
    title: "Development Ecosystem",
    desc: "To design and nurture a social entrepreneurship model that is sustainable and ensures availability of financial resources for taking up various organizational programs.",
  },
];

const EduIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);
const CollabIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const EcoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const pillarIcons: Record<string, React.FC> = {
  education: EduIcon,
  collaboration: CollabIcon,
  ecosystem: EcoIcon,
};

export default function AboutPage() {
  return (
    <>
      {/* Hero header */}
      <section className="vad-page-hero vad-section--deep">
        <div className="vad-container vad-page-hero__inner">
          <span className="vad-eyebrow">About Vadaanya Janaa Society</span>
          <h1 className="vad-page-hero__title">
            From Dreams to <span className="vad-page-hero__accent">Degrees</span>
          </h1>
          <p className="vad-page-hero__lead">
            A non-profit organization established in November 2010, registered under the
            Andhra Pradesh Societies Registration Act, 2001 (Reg. No. 1433/2010).
          </p>
        </div>
      </section>

      {/* Origin story with image */}
      <section className="vad-section vad-section--paper">
        <div className="vad-container">
          <div className="vad-about__split">
            <div className="vad-head vad-head--light">
              <span className="vad-eyebrow vad-eyebrow--dark">How It Started</span>
              <h2>
                A Better India, <span style={{ color: "var(--vad-navy-700)" }}>One Child at a Time</span>
              </h2>
              <p className="vad-lead" style={{ color: "var(--vad-ink-soft)" }}>
                Watching the motherland carry many needy and under-privileged people, we felt
                it incumbent on us to carry a part of the burden on ourselves. Thus Vadaanya
                Janaa Society was born — realizing that helping the country is not a burden
                but a pleasure that gives immense satisfaction to all the hearts associated
                with it.
              </p>
              <p className="vad-lead" style={{ color: "var(--vad-ink-soft)" }}>
                VJS is the brainchild of people who share a similar ideology and aspiration
                to reach out to the society for a social cause — people who have nothing but
                one thought in their mind: <strong style={{ color: "var(--vad-ink)" }}>&ldquo;A Better India.&rdquo;</strong>
              </p>
              <p className="vad-about__pullquote">
                &ldquo;The team of Vadaanya consists mainly of youth from different walks of life.&rdquo;
              </p>
            </div>
            <div className="vad-about__visual">
              <Image
                src="/about-1.jpg"
                alt="Vadaanya Janaa Society team with students"
                width={600}
                height={500}
                className="vad-about__img"
              />
              <div className="vad-about__float vad-about__float--tr">
                Since 2010
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission — dark navy split */}
      <section className="vad-section vad-section--navy">
        <div className="vad-container">
          <div className="vad-vm-grid">
            <article className="vad-vm-card">
              <div className="vad-vm-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className="vad-vm-card__title">Our Vision</h3>
              <p className="vad-vm-card__desc">
                Vadaanya was formed to envisage a society wherein the living standards of
                the destitute and the needy will be greatly improved — achieved through
                providing better resources and mobilizing public participation. It aims to
                greatly improve access to education among lower strata of the society by
                offering adequate opportunities and financial support to deserving
                candidates from their schooling to graduation, in line with the principle of
                <strong> Right to Education.</strong>
              </p>
            </article>

            <article className="vad-vm-card">
              <div className="vad-vm-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2l.5-.5a5.4 5.4 0 0 0 1-1.5L19 7.5c2-2 3-4.5 3-4.5s-2.5 1-4.5 3L7.5 16c-.5.4-1 .7-1.5 1z" />
                  <path d="m12 15-3-3" />
                </svg>
              </div>
              <h3 className="vad-vm-card__title">Our Mission</h3>
              <p className="vad-vm-card__desc">
                Vadaanya intends to achieve the outlined objectives in a phased manner with
                primary focus on providing education opportunities based on merit by funding
                scholarships, sponsoring tuition fees and collaborating with various
                education institutions for offering free seats. In addition, it would
                support orphanages, old age homes and similar organizations with financial
                and manpower support whenever needed, and nurture a social entrepreneurship
                model to ensure sustainable generation of resources.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Objectives — light grey */}
      <section className="vad-section vad-section--grey">
        <div className="vad-container">
          <div className="vad-head vad-head--center vad-head--light">
            <span className="vad-eyebrow vad-eyebrow--dark">What We Stand For</span>
            <h2>Our Objectives</h2>
            <p className="vad-lead" style={{ maxWidth: "720px", margin: "20px auto 0" }}>
              Seven commitments that guide every programme, partnership and decision we make.
            </p>
          </div>
          <div className="vad-objectives-grid">
            {objectives.map((obj, i) => (
              <article key={i} className="vad-objective">
                <span className="vad-objective__num">{String(i + 1).padStart(2, "0")}</span>
                <p className="vad-objective__text">{obj}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do — 3 pillars on white */}
      <section className="vad-section vad-section--paper">
        <div className="vad-container">
          <div className="vad-head vad-head--center vad-head--light">
            <span className="vad-eyebrow vad-eyebrow--dark">Our Work</span>
            <h2>What We Do</h2>
          </div>
          <div className="vad-scaling-grid vad-about__pillars">
            {pillars.map((p) => {
              const Icon = pillarIcons[p.icon];
              return (
                <div key={p.title} className="vad-scaling-card">
                  <div className="vad-scaling-icon-wrapper">
                    <Icon />
                  </div>
                  <h3 className="vad-scaling-title">{p.title}</h3>
                  <p className="vad-scaling-desc">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Registration + CTA — dark */}
      <section className="vad-section vad-section--deep">
        <div className="vad-container vad-about__cta">
          <div className="vad-about__cta-text">
            <span className="vad-eyebrow">Get Involved</span>
            <h2 className="vad-about__cta-title">
              Support a child&apos;s journey from <span>Class 1 to Graduation</span>
            </h2>
            <p className="vad-about__cta-desc">
              Vadaanya Janaa Society is registered under the Andhra Pradesh Societies
              Registration Act, 2001 (Reg. No. 1433/2010). Your contribution is eligible for
              80G tax exemption.
            </p>
            <div className="vad-about__cta-btns">
              <a href="/" className="vad-btn vad-btn--gold">
                Donate Now
                <span className="vad-arrow" aria-hidden="true">&rarr;</span>
              </a>
              <a href="/#contact" className="vad-btn vad-btn--outline">
                Contact Us
              </a>
            </div>
          </div>
          <div className="vad-about__reg-card">
            <p className="vad-about__reg-title">Registration Details</p>
            <dl className="vad-about__reg-list">
              <div><dt>Registered</dt><dd>November 2010</dd></div>
              <div><dt>Act</dt><dd>AP Societies Registration Act, 2001</dd></div>
              <div><dt>Reg. No.</dt><dd>1433/2010</dd></div>
              <div><dt>Location</dt><dd>Andhra Pradesh, India</dd></div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
