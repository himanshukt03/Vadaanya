"use client"

const Service = () => {
   const services = [
      { id: 1, num: "01", title: "Strategic Capital Deployment", desc: "Flexible funding aligned to growth milestones, not rigid timelines.", icon: "flaticon-briefcase" },
      { id: 2, num: "02", title: "Synergy Creation", desc: "Portfolio companies benefit from best-practice transfer and operational support.", icon: "flaticon-diamond" },
      { id: 3, num: "03", title: "Enterprise Networks", desc: "Immediate access to global partners, mentors, and industry experts.", icon: "flaticon-money" },
      { id: 4, num: "04", title: "Mission-Driven Growth", desc: "We prioritize impact, sustainability, and unbounded ambition.", icon: "flaticon-startup" },
   ];

   return (
      <section id="model" className="section-py-130" style={{ backgroundColor: "#F5F7F9" }}>
         <div className="container">
            <div className="row justify-content-center mb-60">
               <div className="col-lg-7">
                  <div className="text-center">
                     <span style={{ color: "var(--tg-theme-primary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", fontSize: "13px", marginBottom: "12px", display: "inline-block" }}>Our Model</span>
                     <h2 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700, color: "#1A1A1A", marginBottom: "16px", letterSpacing: "-0.5px" }}>Exponential Scaling Framework</h2>
                     <p style={{ fontSize: "17px", color: "#666", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
                        100exNextGen unlocks rapid scaling through proven pillars that have generated outsized returns for our stakeholders.
                     </p>
                  </div>
               </div>
            </div>
            <div className="row gutter-y-30 justify-content-center">
               {services.map((item) => (
                  <div key={item.id} className="col-xl-3 col-lg-6 col-md-6">
                     <div className="service-card" style={{
                        background: "#fff", padding: "40px 30px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.04)",
                        transition: "all 0.35s ease", height: "100%", position: "relative", overflow: "hidden",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.03)"
                     }}>
                        <div style={{
                           position: "absolute", top: "0", right: "0",
                           width: "80px", height: "80px", background: "linear-gradient(135deg, transparent 50%, rgba(0,71,255,0.03) 50%)"
                        }} />
                        <span style={{ position: "absolute", top: "24px", right: "24px", fontSize: "42px", fontWeight: 800, color: "rgba(0,0,0,0.04)", lineHeight: 1 }}>{item.num}</span>

                        <div style={{ marginBottom: "24px", color: "var(--tg-theme-primary)", fontSize: "48px", transition: "transform 0.3s ease" }} className="icon-wrap">
                           <i className={item.icon}></i>
                        </div>
                        <h3 style={{ fontSize: "19px", fontWeight: 700, marginBottom: "14px", color: "#1A1A1A", lineHeight: 1.3 }}>{item.title}</h3>
                        <p style={{ fontSize: "15px", lineHeight: 1.65, color: "#666", marginBottom: 0 }}>{item.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
            <style jsx>{`
               .service-card:hover {
                  transform: translateY(-8px);
                  box-shadow: 0 20px 40px rgba(0,71,255,0.08) !important;
                  border-color: transparent !important;
               }
               .service-card:hover .icon-wrap {
                   transform: scale(1.1);
               }
            `}</style>
         </div>
      </section>
   )
}

export default Service
