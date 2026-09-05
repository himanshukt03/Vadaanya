"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface MenuItem {
  label: string;
  href: string;
  external?: boolean;
}

const menuItems: MenuItem[] = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Team Vadaanya", href: "/team-vadaanya" },
  { label: "Talent Test", href: "/talent-test" },
  { label: "Media", href: "/gallery" },
  { label: "Contact us", href: "/contact" },
];

// Simple scroll helper for same-page anchors
function scrollTo(href: string) {
  if (typeof window === "undefined") return;
  if (href.startsWith("#")) {
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
}

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: "17px", height: "17px" }}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: "17px", height: "17px" }}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: "17px", height: "17px" }}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: "17px", height: "17px" }}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: "17px", height: "17px" }}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Handle hash scrolling when coming from another page
  useEffect(() => {
    if (pathname === "/" && typeof window !== "undefined" && window.location.hash) {
      setTimeout(() => {
        scrollTo(window.location.hash);
      }, 500); // Wait for DOM to render
    }
  }, [pathname]);

  const handleNavLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") || href.startsWith("#")) {
      const hash = href.includes("#") ? href.substring(href.indexOf("#")) : href;
      if (pathname === "/") {
        e.preventDefault();
        setMenuOpen(false);
        setTimeout(() => scrollTo(hash), menuOpen ? 420 : 0);
      } else {
        setMenuOpen(false);
      }
    } else {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <header className={`vad-nav${scrolled ? " is-scrolled" : ""}`} role="banner">
        <div className="vad-nav__inner">
          {/* Brand */}
          <Link href="/" className="vad-nav__brand" aria-label="Vadaanya Janaa Society — Home">
            <Image
              src="/logos/PPT-logo.png"
              alt="Vadaanya Janaa Society"
              width={280}
              height={70}
              priority
              style={{ objectFit: "contain", width: "auto", height: "auto", maxWidth: "100%" }}
            />
          </Link>

          {/* Desktop links */}
          <nav aria-label="Primary navigation">
            <ul className="vad-nav__links" role="menubar">
              {menuItems.map((item) => (
                <li key={item.label} role="none">
                  {item.external ? (
                    <a
                      href={item.href}
                      role="menuitem"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      role="menuitem"
                      onClick={(e) => handleNavLink(e, item.href)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="vad-nav__actions">
            <Link
              href="/#donate"
              className="vad-btn vad-btn--gold"
              onClick={(e) => handleNavLink(e, "/#donate")}
            >
              Donate
            </Link>
            {/* Hamburger */}
            <button
              ref={burgerRef}
              className={`vad-nav__burger${menuOpen ? " is-open" : ""}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="vad-mmenu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <nav
        id="vad-mmenu"
        className={`vad-mmenu${menuOpen ? " is-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {menuItems.map((item) => (
          item.external ? (
            <a
              key={item.label}
              href={item.href}
              tabIndex={menuOpen ? 0 : -1}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
            </a>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              tabIndex={menuOpen ? 0 : -1}
              onClick={(e) => handleNavLink(e, item.href)}
            >
              {item.label}
            </Link>
          )
        ))}
        <Link
          href="/#donate"
          className="vad-btn vad-btn--gold"
          tabIndex={menuOpen ? 0 : -1}
          onClick={(e) => handleNavLink(e, "/#donate")}
        >
          Donate Now →
        </Link>

        {/* Mobile social links below Donate button */}
        <div
          style={{
            marginTop: "20px",
            paddingTop: "16px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <a
            href="https://www.facebook.com/people/Vadaanya-Janaa-Society/100064704815056/"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={menuOpen ? 0 : -1}
            aria-label="Facebook"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--vad-gold-soft)",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            <FacebookIcon />
          </a>
          <a
            href="https://x.com/VadaanyaJanaa"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={menuOpen ? 0 : -1}
            aria-label="Twitter"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--vad-gold-soft)",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            <TwitterIcon />
          </a>
          <a
            href="https://www.instagram.com/vadaanya_janaa_society/"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={menuOpen ? 0 : -1}
            aria-label="Instagram"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--vad-gold-soft)",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.linkedin.com/company/vadaanya-janaa-society/"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={menuOpen ? 0 : -1}
            aria-label="LinkedIn"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--vad-gold-soft)",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://www.youtube.com/@vadaanyajanaasociety9272"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={menuOpen ? 0 : -1}
            aria-label="YouTube"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--vad-gold-soft)",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            <YouTubeIcon />
          </a>
        </div>
      </nav>
    </>
  );
}
