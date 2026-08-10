import type { Metadata } from "next";
import Navbar from "@/components/vadaanya/Navbar";
import FoundersPage from "@/components/vadaanya/FoundersPage";
import Footer from "@/components/vadaanya/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";

export const metadata: Metadata = {
  title: "Founders & Team",
  description: "Meet Team Vadaanya, a collective movement of dedicated volunteers, mentors, and leadership empowering government school students across Andhra Pradesh & Telangana.",
  keywords: ["Team Vadaanya", "Vadaanya volunteers", "Ashok Padapati", "education NGO team India", "Vadaanya Janaa Society leadership"],
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
