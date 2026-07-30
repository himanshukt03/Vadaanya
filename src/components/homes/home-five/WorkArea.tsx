"use client"
import Image from "next/image"

import work_img from "@/assets/img/project/h5_project_img02.jpg"

const WorkArea = () => {
    const founders_data = [
        { id: 1, icon: "flaticon-idea", title: "Early Stage / Deep Tech Focus", desc: "Building in AI, Infrastructure, or Climate." },
        { id: 2, icon: "flaticon-handshake", title: "Open to Partnership", desc: "Values governance and active support." },
        { id: 3, icon: "flaticon-growth", title: "Sustainable Growth", desc: "Prioritizing real value over hype." },
    ];

    return (
        <section className="section-py-130" style={{ backgroundColor: "#FFFFFF", position: "relative", overflow: "hidden" }}>
            {/* Subtle Dotted Grid Background */}
            <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
                backgroundSize: "24px 24px",
                opacity: 0.6,
                zIndex: 1,
            }} />

            <div className="container" style={{ position: "relative", zIndex: 3 }}>
                <div className="row align-items-center">
                    <div className="col-lg-6 mb-40 mb-lg-0 order-lg-1 order-2">
                        {/* Image with similar shape to ChooseArea but mirrored */}
                        <div style={{ position: "relative", paddingRight: "30px" }}>
                            <div className="custom-image-wrapper" style={{
                                position: "relative",
                                width: "100%",
                                borderRadius: "200px 0 200px 200px",
                                overflow: "hidden",
                                boxShadow: "0 30px 60px rgba(0,0,0,0.1)",
                                zIndex: 2,
                            }}>
                                <Image
                                    src={work_img}
                                    alt="Founders We Want"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    style={{ objectFit: "cover" }}
                                />
                                <div style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "linear-gradient(to top, rgba(0,0,0,0.2), transparent 50%)"
                                }} />
                            </div>

                            {/* Decorative Circle Behind */}
                            <div style={{
                                position: "absolute", bottom: "-20px", left: "-20px",
                                width: "150px", height: "150px",
                                borderRadius: "50%",
                                background: "rgba(0,71,255,0.08)",
                                zIndex: 1,
                            }} />
                        </div>
                    </div>

                    <div className="col-lg-6 order-lg-2 order-1">
                        <div style={{ paddingLeft: "20px" }}>
                            <span style={{ color: "var(--tg-theme-primary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", fontSize: "13px", marginBottom: "12px", display: "inline-block" }}>Application Track</span>
                            <h2 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.5px", marginBottom: "24px" }}>Founders We Want</h2>
                            <p style={{ fontSize: "17px", color: "#666", marginBottom: "40px", lineHeight: 1.7 }}>
                                We look for visionaries who are ready to build the next generation of infrastructure. Our ideal founders are:
                            </p>

                            <div className="founders-list">
                                {founders_data.map((item) => (
                                    <div key={item.id} style={{
                                        display: "flex", alignItems: "flex-start", gap: "20px", marginBottom: "24px",
                                        background: "#fff", padding: "20px 24px", borderRadius: "16px", border: "1px solid #f0f0f0",
                                        boxShadow: "0 4px 15px rgba(0,0,0,0.02)", transition: "all 0.3s ease",
                                        borderLeft: "4px solid transparent"
                                    }} className="founder-item">
                                        <div style={{
                                            width: "48px", height: "48px", background: "rgba(0,71,255,0.06)", borderRadius: "12px",
                                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0,
                                            color: "var(--tg-theme-primary)"
                                        }}>
                                            <i className={item.icon}></i>
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "6px", color: "#1A1A1A" }}>{item.title}</h3>
                                            <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#666", marginBottom: 0 }}>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
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
               .founder-item:hover {
                  transform: translateX(5px);
                  box-shadow: 0 10px 30px rgba(0,0,0,0.06) !important;
                  border-color: rgba(0,71,255,0.15) !important;
                  border-left-color: var(--tg-theme-primary) !important;
               }
            `}</style>
            </div>
        </section>
    )
}

export default WorkArea
