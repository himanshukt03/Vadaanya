import Navbar from "@/components/vadaanya/Navbar";
import AboutPage from "@/components/vadaanya/AboutPage";
import Footer from "@/components/vadaanya/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";

export const metadata = {
  title: "About Vadaanya Janaa Society — From Dreams to Degrees",
  description:
    "Vadaanya Janaa Society is a non-profit established in Nov 2010 (Reg. No. 1433/2010) dedicated to improving living standards of the destitute and needy through education — from schooling to graduation.",
  keywords:
    "About Vadaanya, Vadaanya Janaa Society, education NGO Andhra Pradesh, non-profit India, scholarship NGO, Right to Education",
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
