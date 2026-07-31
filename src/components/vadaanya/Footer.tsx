import Link from "next/link";
import Image from "next/image";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "What We Do", href: "/#whatwedo" },
  { label: "Success Stories", href: "/#stories" },
  { label: "Watch Videos", href: "/#videos" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact Us", href: "/contact" },
];

const programLinks = [
  { label: "Vadaanya Talent Test", href: "https://vadaanya.org/talent-test" },
  { label: "Scholarship Application", href: "https://vadaanya.org/apply" },
  { label: "Download Hall Ticket", href: "https://vadaanya.org/hall-ticket" },
  { label: "View Syllabus", href: "https://vadaanya.org/syllabus" },
  { label: "DSC Results", href: "https://vadaanya.org/dsc-results" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="vad-footer" id="contact">
      <div className="vad-container">
        <div className="vad-footer__top">
          {/* Brand column */}
          <div>
            <Link href="/" className="vad-footer__brand-word" aria-label="Vadaanya Janaa Society Home">
            <Image
              src="/logos/PPT-logo.png"
              alt="Vadaanya Janaa Society"
              width={180}
              height={45}
              style={{ objectFit: "contain", width: "180px", height: "auto", maxWidth: "100%" }}
            />
            </Link>
            <p className="vad-footer__desc">
              Vadaanya Janaa Society (Reg. No. 498/2010) — improving the living standards of the destitute and needy through education. From Class 1 to graduation, we walk beside every student we serve.
            </p>
            <div className="vad-footer__socials" aria-label="Social media links">
              <a
                href="https://www.facebook.com/people/Vadaanya-Janaa-Society/100064704815056/"
                target="_blank"
                rel="noopener noreferrer"
                className="vad-social-icon"
                aria-label="Vadaanya on Facebook (opens in new tab)"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://x.com/VadaanyaJanaa"
                target="_blank"
                rel="noopener noreferrer"
                className="vad-social-icon"
                aria-label="Vadaanya on X (opens in new tab)"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://www.instagram.com/vadaanya_janaa_society/"
                target="_blank"
                rel="noopener noreferrer"
                className="vad-social-icon"
                aria-label="Vadaanya on Instagram (opens in new tab)"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.linkedin.com/company/vadaanya-janaa-society/"
                target="_blank"
                rel="noopener noreferrer"
                className="vad-social-icon"
                aria-label="Vadaanya on LinkedIn (opens in new tab)"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://www.youtube.com/@vadaanyajanaasociety9272"
                target="_blank"
                rel="noopener noreferrer"
                className="vad-social-icon"
                aria-label="Vadaanya on YouTube (opens in new tab)"
              >
                <YouTubeIcon />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer quick links">
            <p className="vad-footer__col-title">Quick Links</p>
            <ul className="vad-footer__links">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

        </div>

        {/* Bottom bar */}
        <div className="vad-footer__bottom">
          <p style={{ margin: 0 }}>
            © {year} Vadaanya Janaa Society. All rights reserved.
          </p>
          <div className="vad-footer__regs" aria-label="Registration numbers">
            <span className="reg-chip">80G Certified</span>
            <span className="reg-chip">12A Certified</span>
            <span className="reg-chip">AP Reg. 498/2010</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
