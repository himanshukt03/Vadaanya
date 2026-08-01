import Navbar from "@/components/vadaanya/Navbar";
import TermsOfServiceArea from "./TermsOfServiceArea";
import Footer from "@/components/vadaanya/Footer";

const TermsOfService = () => {
   return (
      <>
         <Navbar />
         <main id="top" className="main-area fix" style={{ paddingTop: "100px" }}>
            <TermsOfServiceArea />
         </main>
         <Footer />
      </>
   );
};

export default TermsOfService;
