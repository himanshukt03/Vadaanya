"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => formPayload.append(key, value));

      const response = await fetch("https://api.lazyforms.com/f/6c4b2c5c-7683-4748-b7d1-af379844800a", {
        method: "POST",
        body: formPayload,
        headers: {
          "Accept": "application/json"
        }
      });
      
      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitStatus("idle"), 4000);
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes vad-spin { 100% { transform: rotate(360deg); } }
        .vad-spin { animation: vad-spin 1s linear infinite; }
      `}</style>
      
      {/* Page Hero Band (Matching compact page hero style) */}
      <section className="vad-page-hero vad-section--deep">
        <div className="vad-container vad-page-hero__inner">
          <span className="vad-eyebrow" style={{ color: "var(--vad-gold)" }}>Get In Touch</span>
          <h1 className="vad-page-hero__title">
            Get in <span className="vad-page-hero__accent">Touch</span>
          </h1>
          <p className="vad-page-hero__lead" style={{ marginTop: "12px", fontSize: "16.5px", maxWidth: "580px", margin: "12px auto 0", color: "#ffffff" }}>
            Whether you're looking to partner with us, volunteer, or just want to say hello, we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="vad-section vad-section--paper" style={{ padding: "48px 0 72px" }}>
        <div className="vad-container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px",
            alignItems: "flex-start",
          }}>
            
            {/* Left: Contact Details (Space-Saving Compact Cards) */}
            <div>
              <h2 style={{ fontSize: "26px", color: "var(--vad-navy-950)", fontFamily: "var(--vad-font-display)", fontWeight: 800, marginBottom: "12px" }}>
                Contact Information
              </h2>
              <p style={{ color: "var(--vad-ink-soft)", fontSize: "14.5px", lineHeight: 1.6, marginBottom: "24px" }}>
                Have questions about our initiatives or want to get involved? Reach out to us using the form, or connect with us directly below.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Detail Item: Address */}
                <div style={{
                  background: "#ffffff",
                  borderRadius: "14px",
                  padding: "16px 18px",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start"
                }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(242, 167, 18, 0.12)", color: "var(--vad-gold-deep)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 3px", fontSize: "15.5px", color: "var(--vad-navy-950)", fontWeight: 700 }}>Our Location</h3>
                    <p style={{ margin: 0, color: "var(--vad-ink-soft)", fontSize: "13.5px", lineHeight: 1.5 }}>
                      <strong style={{ color: "var(--vad-navy-950)" }}>VADAANYA JANAA SOCIETY</strong><br />
                      Flat no: 528, Road no: 15, Vasantha Nagar, Kukatpally Housing Board Colony, Hyderabad – 500072
                    </p>
                  </div>
                </div>

                {/* Detail Item: Email */}
                <div style={{
                  background: "#ffffff",
                  borderRadius: "14px",
                  padding: "16px 18px",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start"
                }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(242, 167, 18, 0.12)", color: "var(--vad-gold-deep)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 3px", fontSize: "15.5px", color: "var(--vad-navy-950)", fontWeight: 700 }}>Email Us</h3>
                    <p style={{ margin: 0, color: "var(--vad-ink-soft)", fontSize: "13.5px", lineHeight: 1.5 }}>
                      <a href="mailto:vadaanyasociety@gmail.com" style={{ color: "var(--vad-gold-deep)", textDecoration: "none", fontWeight: 700 }}>vadaanyasociety@gmail.com</a>
                    </p>
                  </div>
                </div>

                {/* Detail Item: Phone */}
                <div style={{
                  background: "#ffffff",
                  borderRadius: "14px",
                  padding: "16px 18px",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start"
                }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(242, 167, 18, 0.12)", color: "var(--vad-gold-deep)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 3px", fontSize: "15.5px", color: "var(--vad-navy-950)", fontWeight: 700 }}>Call / WhatsApp</h3>
                    <p style={{ margin: 0, color: "var(--vad-ink-soft)", fontSize: "13.5px", lineHeight: 1.5 }}>
                      <a href="tel:+918109598109" style={{ color: "var(--vad-gold-deep)", textDecoration: "none", fontWeight: 700 }}>+91 8109598109</a> 
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div style={{ 
              background: "#ffffff", 
              borderRadius: "20px", 
              padding: "28px 30px", 
              boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.06)"
            }}>
              <h3 style={{ fontSize: "20px", color: "var(--vad-navy-950)", fontFamily: "var(--vad-font-display)", fontWeight: 800, marginBottom: "18px", marginTop: 0 }}>
                Send us a message
              </h3>
              
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                
                {/* Form Group: Name */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="name" style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--vad-navy-950)" }}>Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: `1px solid ${errors.name ? "red" : "rgba(10, 16, 48, 0.12)"}`,
                      background: "#fdfdfd",
                      fontSize: "14px",
                      fontFamily: "var(--vad-font-body)",
                      outline: "none",
                      transition: "all 0.3s ease"
                    }}
                    onFocus={(e) => { if(!errors.name) { e.currentTarget.style.borderColor = "var(--vad-gold)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(242, 167, 18, 0.15)"; } }}
                    onBlur={(e) => { if(!errors.name) { e.currentTarget.style.borderColor = "rgba(10, 16, 48, 0.12)"; e.currentTarget.style.boxShadow = "none"; } }}
                  />
                  {errors.name && <span style={{ color: "red", fontSize: "12px" }}>{errors.name}</span>}
                </div>

                {/* Form Group: Email */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="email" style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--vad-navy-950)" }}>Email Address</label>
                  <input 
                    type="text" 
                    id="email" 
                    name="email" 
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: `1px solid ${errors.email ? "red" : "rgba(10, 16, 48, 0.12)"}`,
                      background: "#fdfdfd",
                      fontSize: "14px",
                      fontFamily: "var(--vad-font-body)",
                      outline: "none",
                      transition: "all 0.3s ease"
                    }}
                    onFocus={(e) => { if(!errors.email) { e.currentTarget.style.borderColor = "var(--vad-gold)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(242, 167, 18, 0.15)"; } }}
                    onBlur={(e) => { if(!errors.email) { e.currentTarget.style.borderColor = "rgba(10, 16, 48, 0.12)"; e.currentTarget.style.boxShadow = "none"; } }}
                  />
                  {errors.email && <span style={{ color: "red", fontSize: "12px" }}>{errors.email}</span>}
                </div>
                
                {/* Form Group: Subject */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="subject" style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--vad-navy-950)" }}>Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: `1px solid ${errors.subject ? "red" : "rgba(10, 16, 48, 0.12)"}`,
                      background: "#fdfdfd",
                      fontSize: "14px",
                      fontFamily: "var(--vad-font-body)",
                      outline: "none",
                      transition: "all 0.3s ease"
                    }}
                    onFocus={(e) => { if(!errors.subject) { e.currentTarget.style.borderColor = "var(--vad-gold)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(242, 167, 18, 0.15)"; } }}
                    onBlur={(e) => { if(!errors.subject) { e.currentTarget.style.borderColor = "rgba(10, 16, 48, 0.12)"; e.currentTarget.style.boxShadow = "none"; } }}
                  />
                  {errors.subject && <span style={{ color: "red", fontSize: "12px" }}>{errors.subject}</span>}
                </div>

                {/* Form Group: Message */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="message" style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--vad-navy-950)" }}>Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4}
                    placeholder="Your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: `1px solid ${errors.message ? "red" : "rgba(10, 16, 48, 0.12)"}`,
                      background: "#fdfdfd",
                      fontSize: "14px",
                      fontFamily: "var(--vad-font-body)",
                      outline: "none",
                      transition: "all 0.3s ease",
                      resize: "vertical"
                    }}
                    onFocus={(e) => { if(!errors.message) { e.currentTarget.style.borderColor = "var(--vad-gold)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(242, 167, 18, 0.15)"; } }}
                    onBlur={(e) => { if(!errors.message) { e.currentTarget.style.borderColor = "rgba(10, 16, 48, 0.12)"; e.currentTarget.style.boxShadow = "none"; } }}
                  ></textarea>
                  {errors.message && <span style={{ color: "red", fontSize: "12px" }}>{errors.message}</span>}
                </div>

                {/* Submit Status Error */}
                {submitStatus === "error" && (
                  <div style={{ padding: "10px", background: "rgba(220, 53, 69, 0.1)", color: "#dc3545", borderRadius: "8px", fontSize: "13px", fontWeight: 600 }}>
                    Something went wrong, please try again.
                  </div>
                )}

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={isSubmitting || submitStatus === "success"}
                  style={{
                    marginTop: "6px",
                    padding: "14px",
                    background: submitStatus === "success" ? "var(--vad-gold)" : "var(--vad-navy-950)",
                    color: submitStatus === "success" ? "var(--vad-navy-950)" : "white",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "15px",
                    fontWeight: 700,
                    cursor: (isSubmitting || submitStatus === "success") ? "default" : "pointer",
                    boxShadow: submitStatus === "success" ? "none" : "0 8px 18px rgba(10, 16, 48, 0.18)",
                    transition: "all 0.3s ease",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    opacity: isSubmitting ? 0.8 : 1
                  }}
                  onMouseEnter={(e) => { 
                    if (!isSubmitting && submitStatus !== "success") {
                      e.currentTarget.style.transform = "translateY(-2px)"; 
                      e.currentTarget.style.boxShadow = "0 12px 24px rgba(10, 16, 48, 0.25)"; 
                      e.currentTarget.style.background = "var(--vad-navy-800)"; 
                    }
                  }}
                  onMouseLeave={(e) => { 
                    if (!isSubmitting && submitStatus !== "success") {
                      e.currentTarget.style.transform = "translateY(0)"; 
                      e.currentTarget.style.boxShadow = "0 8px 18px rgba(10, 16, 48, 0.18)"; 
                      e.currentTarget.style.background = "var(--vad-navy-950)"; 
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="vad-spin">
                        <line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                      </svg>
                      Sending...
                    </>
                  ) : submitStatus === "success" ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Submitted
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </>
                  )}
                </button>
              </form>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}
