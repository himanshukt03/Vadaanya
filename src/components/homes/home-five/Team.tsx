"use client"
import Image from "next/image"
import Link from "next/link"
import Arrow from "@/components/common/Arrow"



const Team = () => {
    const handleContactScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (typeof window !== 'undefined' && window.location.pathname === '/') {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', '/#contact');
        }
    };
    const partners_data = [
        { id: 1, title: "Access to Innovation", desc: "Connect with cutting-edge companies and emerging technologies.", icon: "flaticon-idea" },
        { id: 2, title: "Collaborative Marketing", desc: "Joint ventures and co-branded initiatives that amplify reach.", icon: "flaticon-megaphone" },
        { id: 3, title: "Industry Redefinition", desc: "Shape new standards and unlock unprecedented market opportunities.", icon: "flaticon-startup" },
    ];

    return (
        <section id="partners" className="section-py-130" style={{ backgroundColor: "#F8F9FA", position: "relative", overflow: "hidden" }}>
            {/* Subtle Gradient Shape */}
            <div style={{
                position: "absolute", top: "-20%", right: "-10%", width: "600px", height: "600px",
                background: "radial-gradient(circle, rgba(0,71,255,0.03) 0%, transparent 70%)",
                borderRadius: "50%", pointerEvents: "none", zIndex: 1
            }} />

            <div className="container" style={{ position: "relative", zIndex: 2 }}>
                <div className="row align-items-center">
                    {/* Image Side */}
                    <div className="col-lg-6 mb-50 mb-lg-0">
                        <div style={{ position: "relative", paddingRight: "20px" }}>
                            <div className="custom-image-wrapper" style={{
                                position: "relative",
                                width: "100%",
                                borderRadius: "0 200px 200px 0",
                                overflow: "hidden",
                                boxShadow: "0 30px 60px rgba(0,0,0,0.1)",
                            }}>
                                <Image
                                    src="/handshake-business-men-concept.jpg"
                                    alt="Collaborate for Scale"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    style={{ objectFit: "cover" }}
                                />
                                <div style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "linear-gradient(to top, rgba(0,0,0,0.25), transparent 50%)"
                                }} />
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="col-lg-6">
                        <div style={{ paddingLeft: "20px" }}>
                            <span style={{ color: "var(--tg-theme-primary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", fontSize: "13px", marginBottom: "12px", display: "inline-block" }}>Channel Partners</span>
                            <h2 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700, color: "#1A1A1A", marginBottom: "16px", letterSpacing: "-0.5px" }}>Collaborate for Scale</h2>
                            <p style={{ fontSize: "17px", color: "#666", marginBottom: "40px", lineHeight: 1.7, maxWidth: "480px" }}>
                                We see strategic partners as an extension of our growth engine. Join the scaling revolution.
                            </p>

                            <div className="partner-benefits">
                                {partners_data.map((item) => (
                                    <div key={item.id} className="partner-benefit-item" style={{
                                        display: "flex", alignItems: "flex-start", gap: "20px", marginBottom: "24px",
                                        background: "#fff", padding: "22px 24px", borderRadius: "16px", border: "1px solid #eff0f2",
                                        boxShadow: "0 4px 15px rgba(0,0,0,0.02)", transition: "all 0.3s ease",
                                    }}>
                                        <div style={{
                                            width: "52px", height: "52px", background: "rgba(0,71,255,0.06)", borderRadius: "14px",
                                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0,
                                            color: "var(--tg-theme-primary)"
                                        }}>
                                            <i className={item.icon}></i>
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "6px", color: "#1A1A1A" }}>{item.title}</h3>
                                            <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#666", marginBottom: 0 }}>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: "16px" }}>
                                <Link href="/#contact" className="tg-btn tg-btn-seven" onClick={handleContactScroll}>Become a Partner <Arrow /></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <style jsx>{`
               .custom-image-wrapper {
                  height: 520px;
               }
               @media (max-width: 991px) {
                  .custom-image-wrapper {
                     height: 350px;
                  }
               }
               .partner-benefit-item:hover {
                  transform: translateX(5px);
                  box-shadow: 0 10px 30px rgba(0,0,0,0.06) !important;
                  border-color: rgba(0,71,255,0.15) !important;
               }
            `}</style>
            </div>
        </section>
    )
}

export default Team
