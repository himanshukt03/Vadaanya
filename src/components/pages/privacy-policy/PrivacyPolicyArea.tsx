const PrivacyPolicyArea = () => {
  const lastUpdated = "August 1, 2025";

  return (
    <section style={{ padding: "100px 0 80px", background: "#fff" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div style={{ marginBottom: "48px" }}>
              <span style={{ color: "var(--tg-theme-primary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", fontSize: "13px", display: "inline-block", marginBottom: "12px" }}>Legal</span>
              <h1 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, color: "#1A1A1A", marginBottom: "12px", letterSpacing: "-1px" }}>Privacy Policy</h1>
              <p style={{ fontSize: "14px", color: "#888" }}>Last updated: {lastUpdated}</p>
            </div>

            <div style={{ fontSize: "16px", lineHeight: 1.8, color: "#444" }}>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>1. Who We Are</h2>
              <p>Vadaanya Janaa Society (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is a non-profit organization registered in November 2010 (Reg. No. 1433/2010) in India. We operate the website at <strong>vadaanya.org</strong>. For questions about this policy, please contact us at <a href="mailto:info@vadaanya.org" style={{ color: "var(--tg-theme-primary)" }}>info@vadaanya.org</a>.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>2. Information We Collect</h2>
              <p>We may collect the following categories of information:</p>
              <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
                <li style={{ marginBottom: "8px" }}><strong>Contact & Application information</strong> – name, email address, phone number, school details, and scholarship application details when you submit forms on our website.</li>
                <li style={{ marginBottom: "8px" }}><strong>Usage data</strong> – pages visited, time spent, referring URL, browser type, and device type, collected automatically via cookies and analytics tools.</li>
                <li style={{ marginBottom: "8px" }}><strong>Communications</strong> – any messages or documents you share with us directly regarding donations, volunteering, or scholarships.</li>
              </ul>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
                <li style={{ marginBottom: "8px" }}>Process scholarship applications, talent test hall tickets, and exam results.</li>
                <li style={{ marginBottom: "8px" }}>Respond to enquiries, volunteer applications, and donation requests.</li>
                <li style={{ marginBottom: "8px" }}>Improve our website, content, and education programs.</li>
                <li style={{ marginBottom: "8px" }}>Comply with legal obligations under 80G/12A tax exemption requirements.</li>
              </ul>
              <p>We do <strong>not</strong> sell your personal data to third parties.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>4. Cookies</h2>
              <p>We use essential cookies to ensure the website functions correctly and analytical tools to understand how visitors interact with our site. You can disable cookies in your browser settings; however, some features may not work as expected.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>5. Data Sharing</h2>
              <p>We may share your data with trusted third-party service providers solely for operating our organization and delivering student services. These providers are contractually obligated to keep your data secure and confidential. We may also disclose data when required by law or court order.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>6. Data Retention</h2>
              <p>We retain personal data only as long as necessary to fulfil the purposes for which it was collected, or as required by applicable Indian law and non-profit record-keeping requirements.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>7. Your Rights</h2>
              <p>You have the right to access, correct, or delete any personal data we hold about you. To exercise any of these rights, email us at <a href="mailto:info@vadaanya.org" style={{ color: "var(--tg-theme-primary)" }}>info@vadaanya.org</a>.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>8. Security</h2>
              <p>We implement industry-standard technical and organizational measures to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>9. Contact Us</h2>
              <p>If you have any questions or concerns about this Privacy Policy, please contact:</p>
              <address style={{ fontStyle: "normal", background: "#f8f8f8", borderRadius: "10px", padding: "20px 24px", marginTop: "12px" }}>
                <strong>Vadaanya Janaa Society</strong><br />
                Flat No. 528, Road No. 15, Vasantha Nagar, KPHB Colony,<br />
                Hyderabad – 500072, Telangana, India<br />
                Email: <a href="mailto:info@vadaanya.org" style={{ color: "var(--tg-theme-primary)" }}>info@vadaanya.org</a>
              </address>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyArea;
