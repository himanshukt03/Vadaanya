import Navbar from "@/components/vadaanya/Navbar";
import HeroCarouselClient from "@/components/vadaanya/HeroCarouselClient";
import StatsStrip from "@/components/vadaanya/StatsStrip";
import AboutSection from "@/components/vadaanya/AboutSection";
import WhatWeDoSection from "@/components/vadaanya/WhatWeDoSection";
import TimelineSection from "@/components/vadaanya/TimelineSection";
import DonateCTA from "@/components/vadaanya/DonateCTA";
import Footer from "@/components/vadaanya/Footer";
import { getHeroSlides } from "@/lib/sanity/queries";

const HomeFive = async () => {
  const slides = await getHeroSlides();

  return (
    <>
      <Navbar />
      <main id="top">
        <HeroCarouselClient initialSlides={slides} />
        <StatsStrip />
        <AboutSection />
        <TimelineSection />
        <WhatWeDoSection />
        <DonateCTA />
      </main>
      <Footer />
    </>
  );
};

export default HomeFive;
