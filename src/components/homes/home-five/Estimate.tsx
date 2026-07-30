"use client"
import Link from "next/link"
import Arrow from "@/components/common/Arrow"

const Estimate = () => {
   const handleContactScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (typeof window !== 'undefined' && window.location.pathname === '/') {
         e.preventDefault();
         document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
         window.history.pushState(null, '', '/#contact');
      }
   };
   return (
      <section id="investors" className="section-py-130" style={{ backgroundColor: "#FAFAFA" }}>
         <div className="container">
            <div className="row align-items-start">
               <div className="col-lg-6 mb-40 mb-lg-0">
                  <div>
                     <span style={{ color: "var(--tg-theme-primary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", fontSize: "13px", marginBottom: "12px", display: "inline-block" }}>Investors</span>
                     <h2 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700, color: "#1A1A1A", marginBottom: "20px", letterSpacing: "-0.5px", lineHeight: 1.15 }}>Partner with 100exNextGen</h2>
                     <p style={{ fontSize: "17px", color: "#555", lineHeight: 1.7, marginBottom: "32px", maxWidth: "480px" }}>
                        We are curating a network of family offices and strategic funds. Join us to design the governance and support structure for our first cohort of companies.
                     </p>
                     <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "36px" }}>
                        {[
                           { icon: "💎", title: "Access", desc: "Exclusive deal flow in high-growth sectors." },
                           { icon: "🔍", title: "Transparency", desc: "Clear governance and rigorous market benchmarking." },
                           { icon: "📊", title: "Growth", desc: "Co-investment rights and structured value creation." },
                        ].map((item, i) => (
                           <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                              <div style={{ width: "48px", height: "48px", background: "#fff", border: "1px solid #eee", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>{item.icon}</div>
                              <div>
                                 <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#1A1A1A", marginBottom: "4px" }}>{item.title}</h4>
                                 <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                     <Link href="/#contact" className="tg-btn tg-btn-seven" onClick={handleContactScroll}>Start a conversation <Arrow /></Link>
                  </div>
               </div>
               <div className="col-lg-6">
                  <div style={{ background: "#fff", borderRadius: "16px", padding: "40px", border: "1px solid #eee", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
                     <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0,71,255,0.08)", borderRadius: "100px", padding: "6px 16px", marginBottom: "20px" }}>
                        <span style={{ width: "6px", height: "6px", background: "var(--tg-theme-primary)", borderRadius: "50%", display: "inline-block" }} />
                        <span style={{ color: "var(--tg-theme-primary)", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Where we are now</span>
                     </div>
                     <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#1A1A1A", marginBottom: "12px" }}>Building the Founding Circle</h3>
                     <p style={{ fontSize: "15px", color: "#666", lineHeight: 1.7, marginBottom: "28px" }}>
                        We prioritize transparency and long-term compounding over vanity metrics. Partner with us to define the playbook.
                     </p>
                     <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px 0" }}>
                        {["Shape our investment thesis.", "Access vetted, high-potential deals.", "Collaborate on transparent milestones."].map((item, i) => (
                           <li key={i} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", fontSize: "15px", color: "#444" }}>
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                                 <circle cx="9" cy="9" r="9" fill="rgba(0,71,255,0.1)" />
                                 <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="#0047FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              {item}
                           </li>
                        ))}
                     </ul>
                     <Link href="/#contact" className="tg-btn tg-btn-seven" style={{ background: "transparent", border: "1px solid var(--tg-theme-primary)", color: "var(--tg-theme-primary)" }} onClick={handleContactScroll}>
                        Join the founding LP circle <Arrow />
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Estimate
