import type { Metadata } from "next";
import Navbar from "@/components/vadaanya/Navbar";
import AboutPage from "@/components/vadaanya/AboutPage";
import Footer from "@/components/vadaanya/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";

import JsonLd, { getBreadcrumbJsonLd } from "@/components/common/JsonLd";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Vadaanya Janaa Society (Reg. No. 1433/2010), an 80G & 12A certified non-profit empowering underprivileged government school students across India.",
  keywords: ["About Vadaanya", "Vadaanya Janaa Society", "education NGO India", "non-profit India", "80G certified NGO"],
  alternates: { canonical: "https://vadaanya.org/about" },
  openGraph: {
    title: "About Us | Vadaanya",
    description:
      "Registered non-profit empowering government-school students across India since 2010.",
    url: "https://vadaanya.org/about",
  },
};

const page = () => {
  const breadcrumbLd = getBreadcrumbJsonLd([
    { name: "Home", url: "https://vadaanya.org" },
    { name: "About Us", url: "https://vadaanya.org/about" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbLd} />
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
