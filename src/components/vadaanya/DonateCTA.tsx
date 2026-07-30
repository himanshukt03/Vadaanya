export default function DonateCTA() {
  return (
    <section id="donate" className="vad-section vad-donate">
      <div className="vad-container">
        <div className="vad-donate__inner">
          {/* Left — appeal */}
          <div>
            <span className="vad-eyebrow">Make an Impact Today</span>
            <h2 className="vad-donate__tagline">
              Support a Child&apos;s Journey from{" "}
              <span>Class&nbsp;1 to Graduation</span>
            </h2>
            <p className="vad-donate__desc">
              A single scholarship can change the trajectory of an entire family. Vadaanya Janaa Society has distributed ₹800+ scholarships since 2010 — every rupee goes directly to a student&apos;s education costs: fees, books, uniforms, coaching and laptops.
            </p>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "28px" }}>
              <a
                href="https://vadaanya.org/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="vad-btn vad-btn--gold"
                aria-label="Donate to Vadaanya Janaa Society (opens in new tab)"
              >
                Donate Now
                <span className="vad-arrow" aria-hidden="true">→</span>
              </a>
              <a href="#contact" className="vad-btn vad-btn--outline">
                Become a Sponsor
              </a>
            </div>

            <div className="vad-donate__trust">
              <span className="chip">80G Tax Exemption</span>
              <span className="chip">12A Registered</span>
              <span className="chip">FCRA Registered</span>
              <span className="chip">AP Reg. No. 498/2010</span>
            </div>
          </div>

          {/* Right — bank details */}
          <div className="vad-donate__bank" role="region" aria-label="Bank transfer details">
            <p className="vad-donate__bank-title">Donate via Bank Transfer</p>

            {/* HDFC */}
            <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--vad-gold-soft)", marginBottom: "10px" }}>
              HDFC Bank
            </p>
            <table className="vad-bank-table" aria-label="HDFC Bank details">
              <tbody>
                <tr><td>Account Name</td><td>Vadaanya Janaa Society</td></tr>
                <tr><td>Account No.</td><td>50200XXXXXXXXXX</td></tr>
                <tr><td>IFSC Code</td><td>HDFC0001234</td></tr>
                <tr><td>Branch</td><td>Guntur, AP</td></tr>
              </tbody>
            </table>

            <hr className="vad-donate__separator" />

            {/* SBI */}
            <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--vad-green-soft)", marginBottom: "10px" }}>
              State Bank of India
            </p>
            <table className="vad-bank-table" aria-label="SBI Bank details">
              <tbody>
                <tr><td>Account Name</td><td>Vadaanya Janaa Society</td></tr>
                <tr><td>Account No.</td><td>32XXXXXXXXXXX</td></tr>
                <tr><td>IFSC Code</td><td>SBIN0001234</td></tr>
                <tr><td>Branch</td><td>Vijayawada, AP</td></tr>
              </tbody>
            </table>

            <p style={{ marginTop: "18px", fontSize: "12.5px", color: "var(--vad-on-navy-muted)", lineHeight: 1.5 }}>
              After transfer, email your transaction ID and name to{" "}
              <a href="mailto:donate@vadaanya.org" style={{ color: "var(--vad-gold-soft)" }}>
                donate@vadaanya.org
              </a>{" "}
              to receive your 80G donation receipt.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
