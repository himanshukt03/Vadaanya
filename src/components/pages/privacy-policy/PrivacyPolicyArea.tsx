const PrivacyPolicyArea = () => {
  const lastUpdated = "April 4, 2025";

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
              <p>100exNextGen ("we", "us", or "our") is a venture-building and investment platform headquartered in Bangalore, India. We operate the website at <strong>100exnextgen.com</strong>. For questions about this policy, please contact us at <a href="mailto:ram@100exnextgen.com" style={{ color: "var(--tg-theme-primary)" }}>ram@100exnextgen.com</a> or call <a href="tel:+919845845616" style={{ color: "var(--tg-theme-primary)" }}>+91 98458 45616</a>.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>2. Information We Collect</h2>
              <p>We may collect the following categories of information:</p>
              <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
                <li style={{ marginBottom: "8px" }}><strong>Contact information</strong> – name, email address, phone number, and company name when you submit our contact or application forms.</li>
                <li style={{ marginBottom: "8px" }}><strong>Usage data</strong> – pages visited, time spent, referring URL, browser type, and device type, collected automatically via cookies and analytics tools.</li>
                <li style={{ marginBottom: "8px" }}><strong>Communications</strong> – any messages or documents you share with us directly.</li>
              </ul>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
                <li style={{ marginBottom: "8px" }}>Respond to enquiries and evaluate partnership or investment opportunities.</li>
                <li style={{ marginBottom: "8px" }}>Improve our website, content, and services.</li>
                <li style={{ marginBottom: "8px" }}>Send updates or newsletters (only with your explicit consent).</li>
                <li style={{ marginBottom: "8px" }}>Comply with applicable legal obligations.</li>
              </ul>
              <p>We do <strong>not</strong> sell your personal data to third parties.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>4. Cookies</h2>
              <p>We use essential cookies to ensure the website functions correctly and analytical cookies (such as Google Analytics) to understand how visitors interact with our site. You can disable cookies in your browser settings; however, some features may not work as expected.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>5. Data Sharing</h2>
              <p>We may share your data with trusted third-party service providers (e.g., email platforms, analytics providers) solely for the purpose of operating our business. These providers are contractually obligated to keep your data secure and confidential. We may also disclose data when required by law or court order.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>6. Data Retention</h2>
              <p>We retain personal data only as long as necessary to fulfil the purposes for which it was collected, or as required by applicable law. Contact and application data is generally retained for up to 3 years.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>7. Your Rights</h2>
              <p>Depending on your jurisdiction, you may have the right to access, correct, or delete any personal data we hold about you. To exercise any of these rights, email us at <a href="mailto:ram@100exnextgen.com" style={{ color: "var(--tg-theme-primary)" }}>ram@100exnextgen.com</a>.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>8. Security</h2>
              <p>We implement industry-standard technical and organisational measures to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>9. Third-Party Links</h2>
              <p>Our website may contain links to third-party sites. We are not responsible for the privacy practices of those sites and encourage you to read their privacy policies.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>10. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. The revised version will be posted on this page with an updated date. Continued use of the site constitutes acceptance of the revised policy.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>11. Contact Us</h2>
              <p>If you have any questions or concerns about this Privacy Policy, please contact:</p>
              <address style={{ fontStyle: "normal", background: "#f8f8f8", borderRadius: "10px", padding: "20px 24px", marginTop: "12px" }}>
                <strong>100exNextGen</strong><br />
                Bangalore, India<br />
                Email: <a href="mailto:ram@100exnextgen.com" style={{ color: "var(--tg-theme-primary)" }}>ram@100exnextgen.com</a><br />
                Phone: <a href="tel:+919845845616" style={{ color: "var(--tg-theme-primary)" }}>+91 98458 45616</a>
              </address>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyArea;
