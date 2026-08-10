import type { Metadata } from "next";
import Navbar from "@/components/vadaanya/Navbar";
import AboutPage from "@/components/vadaanya/AboutPage";
import Footer from "@/components/vadaanya/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";

export const metadata: Metadata = {
  title: "About Us — Our Mission, History & Impact",
  description: "Vadaanya Janaa Society is a non-profit established in November 2010 (Reg. No. 1433/2010) dedicated to improving living standards of the destitute and needy through education — from Class 1 to graduation across Andhra Pradesh & Telangana.",
  keywords: ["About Vadaanya", "Vadaanya Janaa Society", "education NGO Andhra Pradesh", "non-profit India", "scholarship NGO", "Right to Education", "80G certified NGO", "12A registered trust"],
  alternates: { canonical: "/about" },
};

const page = () => {
  return (
    <>
      <Navbar />
      <main id="top">
        <AboutPage />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default page;
