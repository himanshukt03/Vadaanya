import Navbar from "@/components/vadaanya/Navbar";
import HeroCarouselClient from "@/components/vadaanya/HeroCarouselClient";
import StatsStrip from "@/components/vadaanya/StatsStrip";
import AboutSection from "@/components/vadaanya/AboutSection";
import TimelineSection from "@/components/vadaanya/TimelineSection";
import SuccessStoriesGrid from "@/components/vadaanya/SuccessStoriesGrid";
import DonateCTA from "@/components/vadaanya/DonateCTA";
import Footer from "@/components/vadaanya/Footer";
import { getHeroSlides, getSuccessStories, getMilestones } from "@/lib/sanity/queries";

const HomeFive = async () => {
  const slides = await getHeroSlides();
  const stories = await getSuccessStories();
  const milestones = await getMilestones();

  return (
    <>
      <Navbar />
      <main id="top">
        <div className="vad-hero-viewport">
          <HeroCarouselClient initialSlides={slides} />
          <StatsStrip />
        </div>
        <AboutSection />
        <TimelineSection milestones={milestones} />
        <SuccessStoriesGrid stories={stories} />
        <DonateCTA />
      </main>
      <Footer />
    </>
  );
};

export default HomeFive;
