import type { Metadata } from "next";
import Navbar from "@/components/vadaanya/Navbar";
import TalentTestPage from "@/components/vadaanya/TalentTestPage";
import Footer from "@/components/vadaanya/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";

export const metadata: Metadata = {
  title: "The Srinivasa Ramanujan Talent Test — Vadaanya Janaa Society",
  description: "Once a year, thousands of government-school students across Anantapur and Sri Sathya Sai districts sit a single exam — and the ones who shine are recognised, rewarded and remembered. Register for the talent test and get your hall ticket instantly.",
  keywords: [
    "Srinivasa Ramanujan Talent Test",
    "Vadaanya Talent Test",
    "Talent Test Hall Ticket",
    "Government School Talent Test Andhra Pradesh",
    "Class 9 Class 10 Talent Exam",
    "Sri Sathya Sai Anantapur Talent Test",
    "DSC SGT Talent Exam",
  ],
  alternates: { canonical: "/talent-test" },
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main id="top">
        <TalentTestPage />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
