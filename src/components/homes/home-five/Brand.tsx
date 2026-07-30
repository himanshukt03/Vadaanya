"use client"
import Image from "next/image"

const partners: { name: string; logo: string | null }[] = [
   { name: "Innovation ScaleUp Advisors", logo: "/logos/innovation-scale-logo-.png" },
   { name: "ReDefine Management Services", logo: "/logos/redefine.png" },
   { name: "IFIN Global", logo: "/logos/ifin-global.png" },
   { name: "ARAI Solutions", logo: "/logos/arai_new_5_black.png" },
   { name: "OneSpace Technologies", logo: "/logos/OneSpace+Logo_oWhiteAlpha.webp" },
   { name: "Harpy Aerospace", logo: "/logos/harpyaerospace_logo.jpg" },
   { name: "ISRO, IN-Space", logo: "/logos/Indian_Space_Research_Organisation_Logo.svg" },
   { name: "Plane Aerospace", logo: null },
   { name: "EON Elevators", logo: "/logos/eon.png" },
   { name: "Global TVS", logo: "/logos/tvs-vector-logo.png" },
];

const Brand = () => {
   return (
      <section className="section-py-80" style={{ backgroundColor: "#FFFFFF", position: "relative", paddingTop: "80px", paddingBottom: "100px", marginTop: "40px" }}>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-7 col-lg-8">
                  <div className="text-center" style={{ marginBottom: "56px" }}>
                     <span style={{ color: "var(--tg-theme-primary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", fontSize: "12px", marginBottom: "12px", display: "inline-block" }}>Our Network</span>
                     <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, color: "#1A1A1A", marginBottom: "14px", letterSpacing: "-0.5px" }}>Trusted Collaborators</h2>
                     <p style={{ fontSize: "16px", color: "#666", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>Partnering with industry leaders across aerospace, technology, and business services.</p>
                  </div>
               </div>
            </div>

            {/* Logo Grid - 5 columns */}
            <div className="brand-grid" style={{
               display: "grid",
               gridTemplateColumns: "repeat(5, 1fr)",
               gap: "0",
            }}>
               {partners.map((partner, i) => (
                  <div key={i} className="brand-item" style={{
                     display: "flex",
                     flexDirection: "column" as const,
                     alignItems: "center",
                     justifyContent: "center",
                     padding: "36px 20px",
                     borderRight: (i + 1) % 5 !== 0 ? "1px solid #eee" : "none",
                     borderBottom: i < 5 ? "1px solid #eee" : "none",
                     transition: "all 0.4s ease",
                     cursor: "default",
                     position: "relative",
                     minHeight: "100px",
                  }}>
                     {partner.logo ? (
                        <>
                           <Image
                              src={partner.logo}
                              alt={partner.name}
                              width={130}
                              height={45}
                              style={{
                                 objectFit: "contain",
                                 transition: "all 0.4s ease",
                                 height: "auto",
                                 width: "auto",
                              }}
                              className="brand-logo"
                           />
                           <span style={{ fontSize: "12px", fontWeight: 600, color: "#888", marginTop: "10px", textAlign: "center" }}>{partner.name}</span>
                        </>
                     ) : (
                        <span className="brand-text" style={{
                           fontSize: "15px",
                           fontWeight: 700,
                           color: "#555",
                           textAlign: "center",
                           letterSpacing: "0.5px",
                           transition: "all 0.4s ease",
                        }}>
                           {partner.name}
                        </span>
                     )}
                  </div>
               ))}
            </div>
         </div>

         <style jsx>{`
            :global(.brand-logo) {
               max-width: 160px !important;
               max-height: 65px !important;
            }
            .brand-item:hover {
               background: rgba(0, 71, 255, 0.02);
            }
            .brand-item:hover :global(.brand-logo) {
               filter: grayscale(0) !important;
               opacity: 1 !important;
               transform: scale(1.08);
            }
            .brand-item:hover :global(.brand-text) {
               opacity: 1 !important;
               color: var(--tg-theme-primary) !important;
            }
            @media (max-width: 991px) {
               :global(.brand-logo) {
                  max-width: 100px !important;
                  max-height: 30px !important;
               }
               :global(.brand-logo-small) {
                  max-width: 65px !important;
                  max-height: 32px !important;
               }
               .brand-grid {
                  grid-template-columns: repeat(3, 1fr) !important;
               }
               .brand-item {
                  border-bottom: 1px solid #eee !important;
               }
            }
            @media (max-width: 575px) {
               .brand-grid {
                  grid-template-columns: repeat(2, 1fr) !important;
               }
            }
         `}</style>
      </section>
   )
}

export default Brand
