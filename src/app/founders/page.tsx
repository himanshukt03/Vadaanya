import Navbar from "@/components/vadaanya/Navbar";
import FoundersPage from "@/components/vadaanya/FoundersPage";
import Footer from "@/components/vadaanya/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";

export const metadata = {
  title: "Founder & President — Vadaanya Janaa Society",
  description: "Learn about Ashok Padapati, the Founder and President of Vadaanya Janaa Society.",
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
