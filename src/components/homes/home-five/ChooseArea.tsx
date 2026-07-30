"use client"
import Link from "next/link"
import Image from "next/image"
import Arrow from "@/components/common/Arrow"



const list_data = [
    { title: "Collaborative build", desc: "Operator-first support on strategy, product, and early traction." },
    { title: "Thesis-led capital", desc: "Checks aligned to a clear thesis rather than vanity metrics." },
];

const ChooseArea = () => {
    const handleContactScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (typeof window !== 'undefined' && window.location.pathname === '/') {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', '/#contact');
        }
    };
    return (
        <section id="portfolio" style={{
            backgroundColor: "#f4f6f8",
            padding: "120px 0",
            position: "relative",
            overflow: "hidden",
        }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 mb-50 mb-lg-0">
                        <div style={{ paddingRight: "40px" }}>
                            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, color: "#1A1A1A", marginBottom: "20px", letterSpacing: "-1px", lineHeight: 1.15 }}>Building our <br />Portfolio of Companies</h2>
                            <p style={{ fontSize: "18px", color: "#555", lineHeight: 1.7, marginBottom: "36px", maxWidth: "520px" }}>
                                We back founders building category-defining platforms. If you are ready for a hands-on partnership beyond just capital, let&apos;s talk.
                            </p>
                            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px 0" }}>
                                {list_data.map((item, i) => (
                                    <li key={i} style={{ marginBottom: "24px", display: "flex", alignItems: "flex-start", gap: "16px" }}>
                                        <div style={{
                                            minWidth: "32px", height: "32px", background: "var(--tg-theme-primary)", borderRadius: "50%",
                                            display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2px",
                                            boxShadow: "0 4px 10px rgba(0,71,255,0.25)"
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 11" fill="none">
                                                <path d="M12.091 2L5.091 9L1.90918 5.81818" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 style={{ color: "#1A1A1A", marginBottom: "6px", fontSize: "18px", fontWeight: 700 }}>{item.title}</h4>
                                            <p style={{ color: "#666", fontSize: "15px", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                                <Link href="/#contact" className="tg-btn tg-btn-seven" onClick={handleContactScroll}>Tell us about your company <Arrow /></Link>
                                <Link href="/founders" className="tg-btn tg-btn-seven outline-btn-custom">Explore our model</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        {/* Image Component with Irregular Shape */}
                        <div style={{ position: "relative", paddingLeft: "30px" }}>
                            <div className="custom-image-wrapper" style={{
                                position: "relative",
                                width: "100%",
                                borderRadius: "200px 200px 0 200px",
                                overflow: "hidden",
                                boxShadow: "0 30px 60px rgba(0,0,0,0.1)",
                            }}>
                                <Image
                                    src="/classmates-learning-together-group-study.jpg"
                                    alt="Building our First Cohort"
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

                            {/* Floating Stats Card */}
                            <div style={{
                                position: "absolute",
                                bottom: "60px",
                                left: "-10px",
                                background: "#fff",
                                padding: "24px 32px",
                                borderRadius: "16px",
                                boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                zIndex: 2,
                                border: "1px solid #f0f0f0"
                            }}>
                                <div style={{
                                    width: "50px", height: "50px", background: "rgba(0,71,255,0.1)",
                                    borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"
                                }}>
                                    <i className="flaticon-startup" style={{ color: "var(--tg-theme-primary)", fontSize: "24px" }}></i>
                                </div>
                                <div>
                                    <span style={{ fontSize: "28px", fontWeight: 800, color: "#1A1A1A", display: "block", lineHeight: 1 }}>100x</span>
                                    <span style={{ fontSize: "12px", color: "#666", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Growth Potential</span>
                                </div>
                            </div>

                            {/* Small Accent Badge */}
                            <div style={{
                                position: "absolute",
                                top: "40px",
                                right: "-20px",
                                background: "var(--tg-theme-primary)",
                                padding: "12px 20px",
                                borderRadius: "10px",
                                boxShadow: "0 10px 30px rgba(0,71,255,0.3)",
                                color: "#fff",
                                zIndex: 2,
                                fontSize: "14px",
                                fontWeight: 700,
                            }}>
                                Deep Tech Focus
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
            .custom-image-wrapper {
               height: 500px;
            }
            @media (max-width: 991px) {
               .custom-image-wrapper {
                  height: 350px;
               }
            }
            .outline-btn-custom {
               background: transparent !important;
               border: 1px solid #ccc !important;
               color: #555 !important;
               box-shadow: none !important;
            }
            .outline-btn-custom:hover {
               background: var(--tg-theme-secondary) !important;
               border-color: var(--tg-theme-secondary) !important;
               color: #fff !important;
            }
         `}</style>
        </section>
    )
}

export default ChooseArea
