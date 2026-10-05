import type { Metadata } from "next";
import Navbar from "@/components/vadaanya/Navbar";
import Footer from "@/components/vadaanya/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";
import TalentTestRegistration from "@/components/vadaanya/TalentTestRegistration";
import JsonLd, { getBreadcrumbJsonLd } from "@/components/common/JsonLd";

export const metadata: Metadata = {
  title: "Vadaanya Talent Test 2026 Registration | Free Online Student Entry",
  description:
    "Register online for Vadaanya Talent Test 2026. 100% free examination entry for Class 9 and 10 students across Anantapur and Sri Sathya Sai districts. Instant registration number generation.",
  keywords: [
    "Vadaanya Talent Test 2026 Registration",
    "Talent Test 2026 Online Application",
    "Anantapur Talent Test",
    "Sri Sathya Sai Talent Test",
    "Government School Scholarship Exam",
    "Vadaanya Janaa Society",
  ],
  alternates: { canonical: "https://vadaanya.org/talent-test2026" },
  openGraph: {
    title: "Vadaanya Talent Test 2026 Registration | Open Now",
    description:
      "100% Free Entry for Class 9 & 10 rural students across Anantapur and Sri Sathya Sai. Fast registration, instant confirmation, and hall ticket tracking.",
    url: "https://vadaanya.org/talent-test2026",
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
        alt: "Vadaanya Talent Test 2026 Registration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vadaanya Talent Test 2026 Registration",
    description: "Free registration for rural Class 9 & 10 students in Anantapur and Sri Sathya Sai districts.",
    images: ["https://vadaanya.org/og-image.png"],
  },
};

export default function Page() {
  const breadcrumbLd = getBreadcrumbJsonLd([
    { name: "Home", url: "https://vadaanya.org" },
    { name: "Talent Test", url: "https://vadaanya.org/talent-test" },
    { name: "2026 Registration", url: "https://vadaanya.org/talent-test2026" },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumbLd]} />
      <Navbar />
      <main id="top">
        <TalentTestRegistration />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
