import Navbar from "@/components/vadaanya/Navbar";
import PrivacyPolicyArea from "./PrivacyPolicyArea";
import Footer from "@/components/vadaanya/Footer";

const PrivacyPolicy = () => {
   return (
      <>
         <Navbar />
         <main id="top" className="main-area fix" style={{ paddingTop: "100px" }}>
            <PrivacyPolicyArea />
         </main>
         <Footer />
      </>
   );
};

export default PrivacyPolicy;
