import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/vadaanya/Navbar";
import FoundersPage, { TeamTabLoader } from "@/components/vadaanya/FoundersPage";
import Footer from "@/components/vadaanya/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";
import { getFounderProfile, getAwards } from "@/lib/sanity/queries";

import JsonLd, { getBreadcrumbJsonLd } from "@/components/common/JsonLd";

export const metadata: Metadata = {
  title: "Team Vadaanya",
  description:
    "Meet Team Vadaanya led by Founder Ashok Padapati and dedicated volunteers working to educate deserving students across India.",
  keywords: ["Team Vadaanya", "Founder & Leadership Team", "Vadaanya volunteers", "Ashok Padapati", "education NGO team India"],
  alternates: { canonical: "https://vadaanya.org/team-vadaanya" },
  openGraph: {
    title: "Team Vadaanya | Vadaanya",
    description:
      "Meet Team Vadaanya, dedicated mentors and volunteers empowering government school students since 2010.",
    url: "https://vadaanya.org/team-vadaanya",
    siteName: "Vadaanya Janaa Society",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://vadaanya.org/og-image.png",
        secureUrl: "https://vadaanya.org/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Team Vadaanya Mentors and Volunteers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Team Vadaanya | Vadaanya",
    description: "Meet Team Vadaanya, dedicated mentors and volunteers empowering government school students since 2010.",
    images: ["https://vadaanya.org/og-image.png"],
  },
};

function TeamPageSkeleton() {
  return (
    <>
      <section className="vad-page-hero vad-section--deep">
        <div className="vad-container vad-page-hero__inner">
          <span className="vad-eyebrow">Our People</span>
          <h1 className="vad-page-hero__title">
            Team <span className="vad-page-hero__accent">Vadaanya</span>
          </h1>
          <p className="vad-page-hero__lead">
            A collective movement of dedicated volunteers, mentors, and leadership empowering government school students across India.
          </p>
        </div>
      </section>

      <section
        className="vad-section vad-section--paper"
        style={{
          padding: "clamp(18px, 2.5vw, 28px) 0",
          borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="vad-container">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "4px",
                background: "#ffffff",
                borderRadius: "9999px",
                boxShadow: "0 4px 18px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.03)",
                border: "1px solid rgba(0, 0, 0, 0.08)",
                gap: "3px",
              }}
            >
              <span
                style={{
                  padding: "8px 24px",
                  borderRadius: "9999px",
                  fontSize: "14px",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, var(--vad-navy-950), var(--vad-navy-800))",
                  color: "#ffffff",
                }}
              >
                Founder
              </span>
              <span
                style={{
                  padding: "8px 24px",
                  borderRadius: "9999px",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#475569",
                }}
              >
                Team
              </span>
            </div>
          </div>
        </div>
      </section>

      <TeamTabLoader />
    </>
  );
}

export default async function Page() {
  const founderProfile = await getFounderProfile();
  const awards = await getAwards();

  // Ensure we always have a valid founder profile fallback
  const safeFounderProfile = founderProfile || {
    id: "fallback-founder",
    name: "Ashok Padapati",
    role: "QA Lead, OpenText",
    linkedInUrl: "https://www.linkedin.com/in/ashok-padapati-67277b50/",
    imageUrl: "/ashok_founder.jpeg",
    bioParagraphs: [
      "Ashok Padapati is an Engineering graduate from SASTRA University with over 16 years of experience in the IT industry. He currently works in a Quality Assurance leadership role, bringing technical expertise and team guidance to Vadaanya.",
      "Growing up in Kothacheruvu, Andhra Pradesh, Ashok developed a strong passion for education and social entrepreneurship. In 2010, alongside a dedicated founding group of friends who pledged 0.5% of their monthly salaries, he established Vadaanya to support deserving students from financially disadvantaged backgrounds.",
      "For over 15 years, Ashok has guided Vadaanya as part of a collective team effort. Working closely with volunteers, mentors, and regional coordinators, the entire Vadaanya team unites to provide scholarships, talent development, and financial assistance to government school students.",
    ],
  };

  const breadcrumbLd = getBreadcrumbJsonLd([
    { name: "Home", url: "https://vadaanya.org" },
    { name: "Team Vadaanya", url: "https://vadaanya.org/team-vadaanya" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <Navbar />
      <main id="top">
        <Suspense fallback={<TeamPageSkeleton />}>
          <FoundersPage founderProfile={safeFounderProfile} awards={awards} />
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
