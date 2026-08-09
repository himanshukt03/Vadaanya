"use client";
import UseSticky from "@/hooks/UseSticky";
import { useState, useEffect } from "react";

const ScrollToTop = () => {
   const { sticky }: { sticky: boolean } = UseSticky();
   const [showScroll, setShowScroll] = useState(false);

   const scrollTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

   useEffect(() => {
      const checkScrollTop = () => {
         const hero = document.querySelector(".vad-hero");
         const isMobile = window.innerWidth <= 768;

         let minScroll = 400;
         if (hero) {
            const heroRect = hero.getBoundingClientRect();
            const heroBottomAbs = window.pageYOffset + heroRect.bottom;
            if (isMobile) {
               // On mobile, scroll to top MUST NOT appear anywhere on main hero section.
               // Only show after scrolling completely past the hero section.
               minScroll = heroBottomAbs - 20;
            } else {
               minScroll = Math.max(400, heroBottomAbs - 100);
            }
         } else {
            minScroll = isMobile ? 600 : 400;
         }

         const currentScroll = window.pageYOffset > minScroll;
         setShowScroll(prev => (prev !== currentScroll ? currentScroll : prev));
      };

      window.addEventListener("scroll", checkScrollTop, { passive: true });
      window.addEventListener("resize", checkScrollTop, { passive: true });
      checkScrollTop();

      return () => {
         window.removeEventListener("scroll", checkScrollTop);
         window.removeEventListener("resize", checkScrollTop);
      };
   }, []);

   return (
      <button
         onClick={scrollTop}
         className={`scroll__top scroll-to-target ${sticky && showScroll ? "open" : ""}`}
         aria-label="Scroll to top"
         data-target="html"
      >
         <i className="fas fa-chevron-up" aria-hidden="true"></i>
      </button>
   );
};

export default ScrollToTop;