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
  { label: "What we do", href: "/#whatwedo" },
  { label: "Impact stories", href: "/#stories" },
  { label: "Talent Test", href: "/#talent" },
  { label: "Gallery", href: "/#videos" },
  { label: "Founder", href: "/founders" },
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
    if (href.startsWith("/#")) {
      if (pathname === "/") {
        e.preventDefault();
        setMenuOpen(false);
        const hash = href.substring(1);
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
                    <a
                      href={item.href}
                      role="menuitem"
                      onClick={(e) => handleNavLink(e, item.href)}
                    >
                      {item.label}
                    </a>
                  )}
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
            <a
              key={item.label}
              href={item.href}
              tabIndex={menuOpen ? 0 : -1}
              onClick={(e) => handleNavLink(e, item.href)}
            >
              {item.label}
            </a>
          )
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
