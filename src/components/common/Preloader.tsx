"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const Preloader = () => {
  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    try {
      // Check if user has already visited in this session
      const hasVisited = sessionStorage.getItem("vadaanya_visited");
      if (hasVisited) {
        // Skip preloader completely for subsequent page views/navigations
        return;
      }

      // Mark first visit
      sessionStorage.setItem("vadaanya_visited", "true");
      setLoading(true);

      const hidePreloader = () => {
        setFadeOut(true);
        setTimeout(() => setLoading(false), 250);
      };

      // Quick fallback: fade out in 350ms if already loaded
      if (document.readyState === "complete") {
        const timer = setTimeout(hidePreloader, 350);
        return () => clearTimeout(timer);
      } else {
        const handleLoad = () => hidePreloader();
        window.addEventListener("load", handleLoad);
        const fallbackTimer = setTimeout(hidePreloader, 600);

        return () => {
          window.removeEventListener("load", handleLoad);
          clearTimeout(fallbackTimer);
        };
      }
    } catch {
      setLoading(false);
    }
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`vad-preloader ${fadeOut ? "is-fading" : ""}`}
      aria-label="Loading Vadaanya Janaa Society"
    >
      <div className="vad-preloader__content">
        <div className="vad-preloader__spinner" role="status">
          <span className="sr-only">Loading website...</span>
        </div>
        <div className="vad-preloader__logo">
          <Image
            src="/logos/PPT-logo.png"
            alt="Vadaanya Janaa Society"
            width={180}
            height={50}
            priority
            style={{ objectFit: "contain", width: "auto", height: "42px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
