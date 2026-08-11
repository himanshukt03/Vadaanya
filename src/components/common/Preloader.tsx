"use client";
import { useEffect, useState, useLayoutEffect } from "react";
import Image from "next/image";

/**
 * Preloader — handles the initial loading screen with a spinner and logo.
 * Uses React state and CSS visibility to avoid DOM manipulation issues
 * that cause "insertBefore" and "removeChild" errors when navigating.
 */

// Custom hook to safely handle client-side only effects
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [hasVisited, setHasVisited] = useState(false);

  useIsomorphicLayoutEffect(() => {
    // Check if user has already visited this session
    let visited = false;
    try {
      visited = !!sessionStorage.getItem("vadaanya_visited");
    } catch {
      // sessionStorage blocked (private mode etc.) — treat as first visit
    }

    setHasVisited(visited);

    // If returning visitor, skip the preloader entirely
    if (visited) {
      setIsVisible(false);
      return;
    }

    // First visit: mark session
    try {
      sessionStorage.setItem("vadaanya_visited", "true");
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    // If not visible, nothing to do
    if (!isVisible) return;

    const dismiss = () => {
      setIsFading(true);
      // Remove from DOM after fade animation completes
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 260);
      return () => clearTimeout(timeout);
    };

    // Fade out once page is fully loaded, with a short guaranteed minimum
    if (document.readyState === "complete") {
      const timeout = setTimeout(dismiss, 350);
      return () => clearTimeout(timeout);
    } else {
      let fired = false;
      const handle = () => {
        if (fired) return;
        fired = true;
        dismiss();
      };

      window.addEventListener("load", handle, { once: true });
      // Fallback timeout in case load event doesn't fire
      const fallback = setTimeout(handle, 600);

      return () => {
        window.removeEventListener("load", handle);
        clearTimeout(fallback);
      };
    }
  }, [isVisible]);

  // Don't render anything if not visible
  if (!isVisible) return null;

  return (
    <div
      id="vad-preloader"
      aria-label="Loading"
      aria-live="polite"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "#0a1030",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
        transition: "opacity 0.25s ease",
        opacity: isFading ? 0 : 1,
        pointerEvents: isFading ? "none" : "auto",
      }}
    >
      {/* Spinner */}
      <div
        style={{
          width: "50px",
          height: "50px",
          border: "4px solid rgba(242,167,18,0.15)",
          borderLeftColor: "#f2a712",
          borderRadius: "50%",
          animation: "vadSpin 0.75s linear infinite",
        }}
      />

      {/* Logo */}
      {!hasVisited && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "vadPulse 1.4s ease-in-out infinite alternate",
          }}
        >
          <Image
            src="/logos/PPT-logo.png"
            alt="Vadaanya Janaa Society"
            width={120}
            height={42}
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      )}

      {/* Inline keyframes for animations */}
      <style jsx global>{`
        @keyframes vadSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes vadPulse {
          from { opacity: 0.4; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
