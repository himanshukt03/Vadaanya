"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Society", href: "#whatwedo" },
  { label: "Team Vadaanya", href: "#team" },
  { label: "Gallery", href: "#stories" },
  { label: "Contact Us", href: "#contact" },
];

// Simple scroll helper for same-page anchors
function scrollTo(href: string) {
  if (typeof window === "undefined") return;
  if (href.startsWith("#")) {
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);

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

  const handleNavLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setMenuOpen(false);
      setTimeout(() => scrollTo(href), menuOpen ? 420 : 0);
    }
  };

  return (
    <>
      <header className={`vad-nav${scrolled ? " is-scrolled" : ""}`} role="banner">
        <div className="vad-nav__inner">
          {/* Brand */}
          <Link href="/" className="vad-nav__brand" aria-label="Vadaanya Janaa Society — Home">
            <Image
              src="/Logo.png"
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
                  <a
                    href={item.href}
                    role="menuitem"
                    onClick={(e) => handleNavLink(e, item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="vad-nav__actions">
            <a
              href="#donate"
              className="vad-btn vad-btn--gold"
              onClick={(e) => handleNavLink(e, "#donate")}
            >
              Donate
            </a>
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
          <a
            key={item.label}
            href={item.href}
            tabIndex={menuOpen ? 0 : -1}
            onClick={(e) => handleNavLink(e, item.href)}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#donate"
          className="vad-btn vad-btn--gold"
          tabIndex={menuOpen ? 0 : -1}
          onClick={(e) => handleNavLink(e, "#donate")}
        >
          Donate Now →
        </a>
      </nav>
    </>
  );
}
