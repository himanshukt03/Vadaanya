import Image from 'next/image';

export default function DonateCTA() {
  return (
    <section id="donate" className="vad-section vad-donate-new">
      <div className="vad-donate-new__bg">
        <Image 
          src="/vadaanya_team.jpeg" 
          alt="Graduates" 
          fill 
          style={{ objectFit: 'cover' }}
        />
        <div className="vad-donate-new__scrim"></div>
      </div>
      
      <div className="vad-container vad-donate-new__content">
        <div className="vad-head vad-head--center vad-head--light vad-donate-new__header">
          <h2 style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 800, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.02em", color: "var(--vad-gold)" }}>
            Join the Movement
          </h2>
          <p style={{ fontSize: "clamp(14px, 1.3vw, 16px)", lineHeight: 1.55, maxWidth: "720px", margin: "0 auto", color: "rgba(255,255,255,0.9)" }}>
            For 15 years, Vadaanya Janaa Society has been transforming lives through education. Your contribution directly funds scholarships, tuition, and mentorship — the building blocks of a brighter future.
          </p>
        </div>

        <div className="vad-donate-new__grid">
          {/* Left: Impact */}
          <div className="vad-donate-new__impact">
            <h3 className="vad-donate-new__percent">0.5%</h3>
            <p className="vad-donate-new__impact-text">
              OF YOUR CONTRIBUTION<br/>
              CAN MAKE A STUDENT'S<br/>
              <span className="vad-text-glow">FUTURE BRIGHT</span>
            </p>
          </div>

          {/* Right: Bank Details Card */}
          <div className="vad-donate-new__bank-card">
            <h4 className="vad-donate-new__bank-title">Donation options & bank details</h4>
            <div className="vad-donate-new__bank-info">
              <div className="vad-bank-row">
                <span className="vad-bank-label">Bank</span>
                <span className="vad-bank-value">HDFC Bank</span>
              </div>
              <div className="vad-bank-row">
                <span className="vad-bank-label">A/C No.</span>
                <span className="vad-bank-value">50100011179771</span>
              </div>
              <div className="vad-bank-row">
                <span className="vad-bank-label">Name</span>
                <span className="vad-bank-value">VADAANYA JANAA SOCIETY</span>
              </div>
              <div className="vad-bank-row">
                <span className="vad-bank-label">IFSC</span>
                <span className="vad-bank-value">HDFC0000545</span>
              </div>
              <div className="vad-bank-row">
                <span className="vad-bank-label">Branch</span>
                <span className="vad-bank-value">Hitec City, Hyderabad</span>
              </div>
            </div>
            
            <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <p style={{ margin: 0, fontSize: "13.5px", color: "rgba(255,255,255,0.7)", textAlign: "center", fontStyle: "italic", lineHeight: 1.5 }}>
                Donate to the Foundation and avail tax benefits under Sections 80G and 12A.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
