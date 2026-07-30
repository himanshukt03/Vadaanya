const TermsOfServiceArea = () => {
  const lastUpdated = "April 4, 2025";

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
              <p>By accessing or using the 100exNextGen website (<strong>100exnextgen.com</strong>), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use this website. These Terms apply to all visitors, founders, investors, partners, and any other users of the site.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>2. About 100exNextGen</h2>
              <p>100exNextGen is a venture-building and investment platform based in Bangalore, India. Our website provides information about our investment thesis, portfolio, team, events, and ways to engage with us. Nothing on this website constitutes financial, legal, or investment advice.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>3. Intellectual Property</h2>
              <p>All content on this website — including text, graphics, logos, images, and code — is the property of 100exNextGen or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>4. Use of the Website</h2>
              <p>You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You must not:</p>
              <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
                <li style={{ marginBottom: "8px" }}>Use the site to distribute spam, malware, or other harmful content.</li>
                <li style={{ marginBottom: "8px" }}>Attempt to gain unauthorised access to any part of the site or its servers.</li>
                <li style={{ marginBottom: "8px" }}>Scrape or harvest data from the site without our prior written consent.</li>
                <li style={{ marginBottom: "8px" }}>Impersonate 100exNextGen or any of its team members.</li>
              </ul>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>5. No Investment Advice</h2>
              <p>The information provided on this website is for general informational purposes only and does not constitute an offer, solicitation, or recommendation to buy or sell any securities or investment products. Any investment involves risk, and past performance is not indicative of future results. Please consult a qualified financial advisor for investment decisions.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>6. Third-Party Links</h2>
              <p>Our website may contain links to third-party websites for your convenience. We have no control over the content, privacy practices, or availability of those sites and are not responsible for any harm arising from your use of them.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>7. Disclaimer of Warranties</h2>
              <p>The website is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We do not warrant that the site will be uninterrupted, error-free, or free of viruses. To the fullest extent permitted by applicable law, we disclaim all warranties, including but not limited to implied warranties of merchantability and fitness for a particular purpose.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>8. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, 100exNextGen and its directors, employees, and affiliates shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of or inability to use this website.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>9. Governing Law</h2>
              <p>These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka, India.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>10. Changes to These Terms</h2>
              <p>We reserve the right to update these Terms at any time. Changes will be posted on this page with an updated effective date. Your continued use of the website after any changes constitutes your acceptance of the new Terms.</p>

              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginTop: "40px", marginBottom: "12px" }}>11. Contact Us</h2>
              <p>If you have any questions about these Terms of Service, please reach out to us:</p>
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

export default TermsOfServiceArea;
