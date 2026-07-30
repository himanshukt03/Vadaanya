"use client"
import Link from "next/link"
import Arrow from "@/components/common/Arrow"

const Cta = () => {
   const handleContactScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (typeof window !== 'undefined' && window.location.pathname === '/') {
         e.preventDefault();
         document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
         window.history.pushState(null, '', '/#contact');
      }
   };
   return (
      <section style={{
         background: "linear-gradient(135deg, #0D1117 0%, #161B22 50%, #0D1520 100%)",
         padding: "80px 0", position: "relative", overflow: "hidden",
      }}>
         <div style={{
            position: "absolute", top: "-50%", left: "50%", transform: "translateX(-50%)",
            width: "800px", height: "400px", background: "radial-gradient(circle, rgba(0,71,255,0.12) 0%, transparent 70%)",
            borderRadius: "50%", filter: "blur(60px)",
         }} />
         <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <div className="row align-items-center">
               <div className="col-lg-8">
                  <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: "0" }}>Ready to Scale? Join the 100exNextGen Ecosystem</h2>
               </div>
               <div className="col-lg-4 text-lg-end mt-lg-0 mt-4">
                  <Link href="/#contact" className="tg-btn tg-btn-seven" onClick={handleContactScroll}>Join the Ecosystem <Arrow /></Link>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Cta
