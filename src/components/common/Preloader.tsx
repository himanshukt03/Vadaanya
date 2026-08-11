"use client";
import { useEffect } from "react";
import Image from "next/image";

/**
 * Preloader — controls the static #vad-static-preloader div that is
 * server-rendered in layout.tsx. It's already visible from the very
 * first paint; this component just fades it out and removes it once
 * the page is ready, or skips it entirely on return visits.
 */
const Preloader = () => {
  useEffect(() => {
    const overlay = document.getElementById("vad-static-preloader");
    if (!overlay) return;

    // Check if user has already visited this session
    let hasVisited = false;
    try {
      hasVisited = !!sessionStorage.getItem("vadaanya_visited");
    } catch {
      // sessionStorage blocked (private mode etc.) — treat as first visit
    }

    if (hasVisited) {
      // Return visit: remove the overlay immediately with no delay
      overlay.remove();
      return;
    }

    // First visit: mark session and add the logo before fading out
    try {
      sessionStorage.setItem("vadaanya_visited", "true");
    } catch { /* ignore */ }

    // Inject logo into the static overlay (can't do this server-side)
    const logoWrap = document.createElement("div");
    logoWrap.id = "vad-static-preloader__logo";
    logoWrap.style.cssText =
      "display:flex;align-items:center;justify-content:center;animation:vadPreloadPulse 1.4s ease-in-out infinite alternate;";
    const img = document.createElement("img");
    img.src = "/logos/PPT-logo.png";
    img.alt = "Vadaanya Janaa Society";
    img.style.cssText = "height:42px;width:auto;object-fit:contain;";
    logoWrap.appendChild(img);
    overlay.appendChild(logoWrap);

    const dismiss = () => {
      overlay.classList.add("is-fading");
      setTimeout(() => overlay.remove(), 260);
    };

    // Fade out once page is fully loaded, with a short guaranteed minimum
    if (document.readyState === "complete") {
      const t = setTimeout(dismiss, 350);
      return () => clearTimeout(t);
    } else {
      let fired = false;
      const handle = () => {
        if (fired) return;
        fired = true;
        dismiss();
      };
      window.addEventListener("load", handle, { once: true });
      const fallback = setTimeout(handle, 600);
      return () => {
        window.removeEventListener("load", handle);
        clearTimeout(fallback);
      };
    }
  }, []);

  // This component renders nothing — it only controls the static DOM element
  return null;
};

export default Preloader;
