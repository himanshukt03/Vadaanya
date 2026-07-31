import Navbar from "@/components/vadaanya/Navbar";
import ContactPage from "@/components/vadaanya/ContactPage";
import Footer from "@/components/vadaanya/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";

export const metadata = {
  title: "Contact Us | Vadaanya Janaa Society",
  description: "Get in touch with Vadaanya Janaa Society. Whether you want to partner, volunteer, or say hello, we'd love to hear from you.",
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