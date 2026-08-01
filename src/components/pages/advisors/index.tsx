import Navbar from "@/components/vadaanya/Navbar";
import AdvisorsArea from "./AdvisorsArea";
import Footer from "@/components/vadaanya/Footer";

const Advisors = () => {
    return (
        <>
            <Navbar />
            <main id="top" className="main-area fix" style={{ paddingTop: "100px" }}>
                <AdvisorsArea />
            </main>
            <Footer />
        </>
    );
};

export default Advisors;
