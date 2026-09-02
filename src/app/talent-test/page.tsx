import type { Metadata } from "next";
import Navbar from "@/components/vadaanya/Navbar";
import TalentTestPage from "@/components/vadaanya/TalentTestPage";
import Footer from "@/components/vadaanya/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";
import { getTalentTestGalleryEvents } from "@/lib/sanity/queries";
import JsonLd, { getBreadcrumbJsonLd, getTalentTestJsonLd } from "@/components/common/JsonLd";

export const metadata: Metadata = {
  title: "Vadaanya Talent Test",
  description:
    "Annual talent test for rural government school students across Andhra Pradesh & Telangana. Download 5-Year Question Papers & Solutions Booklet (2021-2025), view 3-tier awards, IIT alumni, and pre-register for 2026.",
  keywords: [
    "Vadaanya Talent Test",
    "Talent Test Question Papers Booklet",
    "Government School Talent Test India",
    "Sri Sathya Sai Anantapur Talent Test",
    "Talent Test Hall Ticket",
  ],
  alternates: { canonical: "https://vadaanya.org/talent-test" },
  openGraph: {
    title: "Vadaanya Talent Test | 5 Years of Grassroots Impact",
    description:
      "15,000+ students tested, 500+ rewarded, 3 IIT-JEE selections. Download 5-year question paper booklet and explore photo archives.",
    url: "https://vadaanya.org/talent-test",
    siteName: "Vadaanya Janaa Society",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://vadaanya.org/talent_test.jpg",
        width: 1200,
        height: 630,
        alt: "Vadaanya Talent Test - Vadaanya Janaa Society",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vadaanya Talent Test | Vadaanya Janaa Society",
    description: "15,000+ students tested, 500+ rewarded, 3 IIT-JEE selections. Download question papers booklet & explore photo archives.",
    images: ["https://vadaanya.org/talent_test.jpg"],
  },
};

export default async function Page() {
  const galleryAlbums = await getTalentTestGalleryEvents();

  const breadcrumbLd = getBreadcrumbJsonLd([
    { name: "Home", url: "https://vadaanya.org" },
    { name: "Talent Test", url: "https://vadaanya.org/talent-test" },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumbLd, getTalentTestJsonLd()]} />
      <Navbar />
      <main id="top">
        <TalentTestPage galleryAlbums={galleryAlbums} />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
