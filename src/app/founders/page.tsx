import type { Metadata } from "next";
import Navbar from "@/components/vadaanya/Navbar";
import FoundersPage from "@/components/vadaanya/FoundersPage";
import Footer from "@/components/vadaanya/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";

export const metadata: Metadata = {
  title: "Founder & President — Ashok Padapati",
  description: "Meet Ashok Padapati, the Founder & President of Vadaanya Janaa Society. From a village in Andhra Pradesh to leading a statewide education non-profit serving 15,000+ students across AP & Telangana.",
  keywords: ["Ashok Padapati", "Vadaanya founder", "education social entrepreneur India", "Vadaanya Janaa Society president", "NGO founder AP"],
  alternates: { canonical: "/founders" },
};

const Page = () => {
  return (
    <>
      <Navbar />
      <main id="top">
        <FoundersPage />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Page;
