const TermsOfServiceArea = () => {
  const lastUpdated = "August 1, 2025";

  return (
    <section style={{ padding: "100px 0 80px", background: "#fff" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div style={{ marginBottom: "48px" }}>
              <span style={{ color: "var(--tg-theme-primary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", fontSize: "13px", display: "inline-block", marginBottom: "12px" }}>Legal</span>
              <h1 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, color: "#1A1A1A", marginBottom: "12px", letterSpacing: "-1px" }}>Terms of Service</h1>
              <p style={{ fontSize: "14px", color: "#888" }}>Last updated: {lastUpdated}</p>
            </div>

            <div style={{ fontSize: "16px", lineHeight: 1.8, color: "#444" }}>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>1. Acceptance of Terms</h2>
              <p>By accessing or using the Vadaanya Janaa Society website (<strong>vadaanya.org</strong>), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use this website. These Terms apply to all visitors, donors, volunteers, partners, and any other users of the site.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>2. About Vadaanya Janaa Society</h2>
              <p>Vadaanya Janaa Society is a registered non-profit organization (Reg. No. 1433/2010) in India. Our website provides information about our educational programs, talent tests, scholarship applications, donation options, and ways to engage with our mission.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>3. Intellectual Property</h2>
              <p>All content on this website — including text, graphics, logos, images, syllabi, exam content, and code — is the property of Vadaanya Janaa Society or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>4. Use of the Website</h2>
              <p>You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You must not:</p>
              <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
                <li style={{ marginBottom: "8px" }}>Use the site to distribute spam, malware, or other harmful content.</li>
                <li style={{ marginBottom: "8px" }}>Attempt to gain unauthorized access to any part of the site or its servers.</li>
                <li style={{ marginBottom: "8px" }}>Scrape or harvest data from the site without our prior written consent.</li>
                <li style={{ marginBottom: "8px" }}>Impersonate Vadaanya Janaa Society or any of its team members.</li>
              </ul>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>5. Third-Party Links</h2>
              <p>Our website may contain links to third-party websites for your convenience. We have no control over the content, privacy practices, or availability of those sites and are not responsible for any harm arising from your use of them.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>6. Disclaimer of Warranties</h2>
              <p>The website is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We do not warrant that the site will be uninterrupted, error-free, or free of viruses.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>7. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, Vadaanya Janaa Society and its board members, volunteers, and partners shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of or inability to use this website.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>8. Governing Law</h2>
              <p>These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>9. Contact Us</h2>
              <p>If you have any questions about these Terms of Service, please reach out to us:</p>
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

export default TermsOfServiceArea;
