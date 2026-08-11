import type { Metadata } from "next";
import Navbar from "@/components/vadaanya/Navbar";
import FoundersPage from "@/components/vadaanya/FoundersPage";
import Footer from "@/components/vadaanya/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";
import { getFounderProfile, getAwards } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Founders & Team",
  description: "Meet Team Vadaanya, a collective movement of dedicated volunteers, mentors, and leadership empowering government school students across Andhra Pradesh & Telangana.",
  keywords: ["Team Vadaanya", "Vadaanya volunteers", "Ashok Padapati", "education NGO team India", "Vadaanya Janaa Society leadership"],
  alternates: { canonical: "/founders" },
};

export default async function Page() {
  const founderProfile = await getFounderProfile();
  const awards = await getAwards();

  // Ensure we always have a valid founder profile fallback
  const safeFounderProfile = founderProfile || {
    id: "fallback-founder",
    name: "Ashok Padapati",
    role: "Lead QA Engineer, OpenText",
    linkedInUrl: "https://www.linkedin.com/in/ashok-padapati-67277b50/",
    imageUrl: "/ashok_founder.jpeg",
    bioParagraphs: [
      "Ashok Padapati is an Engineering graduate from SASTRA University with over 16 years of experience in the IT industry. He currently works in a Quality Assurance leadership role, bringing technical expertise and team guidance to Vadaanya.",
      "Growing up in Kothacheruvu, Andhra Pradesh, Ashok developed a strong passion for education and social entrepreneurship. In 2010, alongside a dedicated founding group of friends who pledged 0.5% of their monthly salaries, he established Vadaanya to support deserving students from financially disadvantaged backgrounds.",
      "For over 15 years, Ashok has guided Vadaanya as part of a collective team effort. Working closely with volunteers, mentors, and regional coordinators, the entire Vadaanya team unites to provide scholarships, talent development, and financial assistance to government school students.",
    ],
  };

  return (
    <>
      <Navbar />
      <main id="top">
        <FoundersPage founderProfile={safeFounderProfile} awards={awards} />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
