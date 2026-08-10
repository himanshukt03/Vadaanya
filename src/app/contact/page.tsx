import type { Metadata } from "next";
import Navbar from "@/components/vadaanya/Navbar";
import ContactPage from "@/components/vadaanya/ContactPage";
import Footer from "@/components/vadaanya/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Vadaanya Janaa Society. Whether you want to donate, partner for CSR, volunteer as a mentor, or learn more about our scholarship programs — we'd love to hear from you.",
  keywords: ["contact Vadaanya", "donate education NGO", "volunteer Hyderabad", "CSR partnership India", "education charity contact"],
  alternates: { canonical: "/contact" },
};

const page = () => {
  return (
    <>
      <Navbar />
      <main id="top">
        <ContactPage />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default page;