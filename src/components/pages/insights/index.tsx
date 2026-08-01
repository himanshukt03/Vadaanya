import Navbar from "@/components/vadaanya/Navbar";
import InsightsArea from "./InsightsArea";
import Footer from "@/components/vadaanya/Footer";

const Insights = () => {
   return (
      <>
         <Navbar />
         <main id="top" className="main-area fix" style={{ paddingTop: "100px" }}>
            <InsightsArea />
         </main>
         <Footer />
      </>
   );
};

export default Insights;
