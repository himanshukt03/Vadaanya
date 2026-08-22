import type { Metadata } from "next";
import Navbar from "@/components/vadaanya/Navbar";
import TalentTestPage from "@/components/vadaanya/TalentTestPage";
import Footer from "@/components/vadaanya/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";

import JsonLd, { getBreadcrumbJsonLd } from "@/components/common/JsonLd";

export const metadata: Metadata = {
  title: "Srinivasa Ramanujan Talent Test & Hall Ticket",
  description:
    "Register for the annual Srinivasa Ramanujan Talent Test for government school students across Anantapur and Sri Sathya Sai districts. Download hall tickets instantly.",
  keywords: [
    "Srinivasa Ramanujan Talent Test",
    "Vadaanya Talent Test",
    "Talent Test Hall Ticket",
    "Government School Talent Test Andhra Pradesh",
    "Sri Sathya Sai Anantapur Talent Test",
  ],
  alternates: { canonical: "https://vadaanya.org/talent-test" },
  openGraph: {
    title: "Srinivasa Ramanujan Talent Test | Vadaanya Janaa Society",
    description:
      "Annual talent test for government school students in Andhra Pradesh. Instant hall ticket download.",
    url: "https://vadaanya.org/talent-test",
  },
};

export default function Page() {
  const breadcrumbLd = getBreadcrumbJsonLd([
    { name: "Home", url: "https://vadaanya.org" },
    { name: "Talent Test", url: "https://vadaanya.org/talent-test" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <Navbar />
      <main id="top">
        <TalentTestPage />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
