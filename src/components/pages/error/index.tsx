import Navbar from "@/components/vadaanya/Navbar";
import ErrorArea from "./ErrorArea";
import Footer from "@/components/vadaanya/Footer";

const NotFound = () => {
   return (
      <>
         <Navbar />
         <main id="top" className="main-area fix" style={{ paddingTop: "100px" }}>
            <ErrorArea />
         </main>
         <Footer />
      </>
   );
};

export default NotFound;
