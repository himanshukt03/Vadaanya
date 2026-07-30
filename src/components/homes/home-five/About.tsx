"use client"
import Link from "next/link"
import Image from "next/image"
import Arrow from "@/components/common/Arrow"

const About = () => {
   const handleContactScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (typeof window !== 'undefined' && window.location.pathname === '/') {
         e.preventDefault();
         document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
         window.history.pushState(null, '', '/#contact');
      }
   };

   return (
      <section id="about" className="about__area-six section-py-130" style={{ backgroundColor: "#FFFFFF" }}>
         <div className="container">
            <div className="row align-items-center">
               <div className="col-lg-6 mb-40">
                  <div className="about__content-six">
                     <div className="section__title mb-25">
                        <span className="sub-title" style={{
                           color: "var(--tg-theme-primary)",
                           fontWeight: 600,
                           textTransform: "uppercase",
                           letterSpacing: "2px",
                           fontSize: "13px",
                           marginBottom: "12px",
                           display: "inline-block",
                        }}>Who We Are</span>
                        <h2 className="title" style={{
                           fontSize: "clamp(32px, 4vw, 48px)",
                           color: "#1A1A1A",
                           lineHeight: 1.15,
                           marginBottom: "24px",
                           fontWeight: 700,
                           letterSpacing: "-1px",
                        }}>A New Breed of <br />Holding Company</h2>
                     </div>
                     <p style={{ fontSize: "17px", color: "#555", lineHeight: 1.7, marginBottom: "16px" }}>
                        100exNextGen serves as a growth partner for revenue-stage enterprises and early-stage Space-Tech founders, providing the strategic velocity required to scale high-potential ventures.
                     </p>
                     <p style={{ fontSize: "17px", color: "#555", lineHeight: 1.7, marginBottom: "32px" }}>
                        Our mission is to empower visionaries across these sectors with the infrastructure and expertise necessary to transform established momentum into breakthrough global success.
                     </p>
                     <Link href="/#contact" className="tg-btn tg-btn-seven" onClick={handleContactScroll}>Explore Our Model <Arrow /></Link>
                  </div>
               </div>
               <div className="col-lg-6">
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                     {[
                        { num: "01", title: "Vision", desc: "We identify high-potential businesses before the market does, positioning for exponential returns.", color: "#0047FF" },
                        { num: "02", title: "Velocity", desc: "Speed is our competitive edge. We move fast, deploy capital efficiently, and scale relentlessly.", color: "#1565C0" },
                        { num: "03", title: "Partnership", desc: "We're builders, not just investors. We roll up our sleeves and work alongside founders.", color: "#2E7D32" },
                     ].map((card, i) => (
                        <div key={i} className="about-card" style={{
                           background: "#fff",
                           border: "1px solid #f0f0f0",
                           borderRadius: "12px",
                           padding: "28px 30px",
                           display: "flex",
                           alignItems: "flex-start",
                           gap: "20px",
                           transition: "all 0.3s ease",
                           cursor: "default",
                           borderLeft: `4px solid ${card.color}`,
                        }}>
                           <div style={{
                              fontSize: "36px",
                              fontWeight: 800,
                              color: card.color,
                              opacity: 0.2,
                              lineHeight: 1,
                              minWidth: "48px",
                           }}>{card.num}</div>
                           <div>
                              <h4 style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a1a", marginBottom: "8px" }}>{card.title}</h4>
                              <p style={{ fontSize: "15px", color: "#666", lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Founder & CEO Section */}
            <div style={{
               marginTop: "100px",
               paddingTop: "80px",
               borderTop: "1px solid #f0f0f0",
            }}>
               <div className="row align-items-center">
                  <div className="col-lg-5 mb-40 mb-lg-0">
                     <div style={{ position: "relative" }}>
                        <div className="ceo-image-wrapper" style={{
                           position: "relative",
                           width: "100%",
                           overflow: "hidden",
                           boxShadow: "0 30px 60px rgba(0,0,0,0.1)",
                        }}>
                           <Image
                              src="/rameshvram.jpg"
                              alt="Ramesh VRAM - Founder & CEO"
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              style={{ objectFit: "cover", objectPosition: "top center" }}
                           />
                           <div style={{
                              position: "absolute", inset: 0,
                              background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent 50%)",
                           }} />
                        </div>
                        {/* Name tag overlay */}
                        <div style={{
                           position: "absolute",
                           bottom: "24px", left: "24px", right: "24px",
                           background: "rgba(255,255,255,0.95)",
                           backdropFilter: "blur(10px)",
                           padding: "18px 24px",
                           borderRadius: "14px",
                           boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
                           display: "flex", alignItems: "center", justifyContent: "space-between",
                           zIndex: 2,
                        }}>
                           <div>
                              <h4 style={{ fontSize: "18px", fontWeight: 700, color: "#1A1A1A", marginBottom: "2px" }}>
                                 Ramesh VRAM
                              </h4>
                              <p style={{ fontSize: "13px", color: "var(--tg-theme-primary)", fontWeight: 600, margin: 0 }}>
                                 Founder & CEO
                              </p>
                           </div>
                           <a
                              href="https://www.linkedin.com/in/rameshvram/"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Ramesh VRAM LinkedIn"
                              style={{
                                 width: "40px", height: "40px",
                                 background: "#0A66C2",
                                 borderRadius: "10px",
                                 display: "flex", alignItems: "center", justifyContent: "center",
                                 transition: "all 0.3s ease",
                                 boxShadow: "0 4px 12px rgba(10,102,194,0.3)",
                              }}
                           >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                                 <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                              </svg>
                           </a>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-7">
                     <div style={{ paddingLeft: "20px" }}>
                        <span style={{
                           color: "var(--tg-theme-primary)", fontWeight: 600,
                           textTransform: "uppercase", letterSpacing: "2px",
                           fontSize: "13px", display: "inline-block", marginBottom: "12px",
                        }}>Leadership</span>
                        <h2 style={{
                           fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700,
                           color: "#1A1A1A", marginBottom: "24px", letterSpacing: "-0.5px",
                        }}>Founder & CEO</h2>
                        <p style={{ fontSize: "17px", color: "#555", lineHeight: 1.8, marginBottom: "20px" }}>
                           Ramesh VRAM doesn&apos;t just build companies — he scales them into forces of nature.
                        </p>
                        <p style={{ fontSize: "16px", color: "#555", lineHeight: 1.8, marginBottom: "20px" }}>
                           From boardroom strategy to boots-on-ground execution, Ramesh VRAM operates at a rare intersection: the visionary who also delivers. He has shaped breakthrough business models, unlocked multimillion-dollar investments, and driven stakeholder value not through theory — but through results you can measure.
                        </p>
                        <p style={{ fontSize: "16px", color: "#555", lineHeight: 1.8, marginBottom: "20px" }}>
                           What sets him apart is his global operating DNA — Australia, Brazil, India, Malaysia, Singapore, the USA. He doesn&apos;t just understand cross-market expansion; he lives it. This gives founders and investors something most advisors can&apos;t offer: the clarity to dream boldly and the operational rigor to make it real, across borders, cultures, and economies.
                        </p>
                        <p style={{ fontSize: "16px", color: "#555", lineHeight: 1.8, marginBottom: "28px" }}>
                           If exponential organizations are built at the intersection of vision, capital, and relentless execution — Ramesh VRAM has made that his address.
                        </p>

                     </div>
                  </div>
               </div>
            </div>

            <style jsx>{`
               .about-card:hover {
                  transform: translateY(-3px);
                  box-shadow: 0 12px 30px rgba(0,0,0,0.06) !important;
                  border-color: transparent !important;
               }
               .ceo-image-wrapper {
                  height: 520px;
                  border-radius: 24px;
               }
               @media (max-width: 991px) {
                  .ceo-image-wrapper {
                     height: 400px;
                     border-radius: 12px;
                  }
               }
            `}</style>
         </div>
      </section>
   )
}

export default About
