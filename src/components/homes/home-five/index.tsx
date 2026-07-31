import Navbar from "@/components/vadaanya/Navbar";
import HeroCarousel from "@/components/vadaanya/HeroCarousel";
import StatsStrip from "@/components/vadaanya/StatsStrip";
import AboutSection from "@/components/vadaanya/AboutSection";
import WhatWeDoSection from "@/components/vadaanya/WhatWeDoSection";
import SuccessStoriesGrid from "@/components/vadaanya/SuccessStoriesGrid";
import VideoGallery from "@/components/vadaanya/VideoGallery";
import TimelineSection from "@/components/vadaanya/TimelineSection";
import DonateCTA from "@/components/vadaanya/DonateCTA";
import Footer from "@/components/vadaanya/Footer";

const HomeFive = () => {
  return (
    <>
      <Navbar />
      <main id="top">
        <HeroCarousel />
        <StatsStrip />
        <AboutSection />
        <TimelineSection />
        <WhatWeDoSection />
        <SuccessStoriesGrid />
        <VideoGallery />
        <DonateCTA />
      </main>
      <Footer />
    </>
  );
};

export default HomeFive;
