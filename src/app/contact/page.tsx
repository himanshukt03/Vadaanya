import type { Metadata } from "next";
import Navbar from "@/components/vadaanya/Navbar";
import ContactPage from "@/components/vadaanya/ContactPage";
import Footer from "@/components/vadaanya/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";

import JsonLd, { getBreadcrumbJsonLd } from "@/components/common/JsonLd";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Vadaanya Janaa Society in Hyderabad, India. Contact us for donations, CSR partnerships, or volunteer opportunities.",
  keywords: ["contact Vadaanya", "donate education NGO", "volunteer Hyderabad", "CSR partnership India"],
  alternates: { canonical: "https://vadaanya.org/contact" },
  openGraph: {
    title: "Contact Us | Vadaanya",
    description:
      "Get in touch for donations, CSR partnerships, or volunteer opportunities to empower government-school students.",
    url: "https://vadaanya.org/contact",
  },
};

const page = () => {
  const breadcrumbLd = getBreadcrumbJsonLd([
    { name: "Home", url: "https://vadaanya.org" },
    { name: "Contact Us", url: "https://vadaanya.org/contact" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbLd} />
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