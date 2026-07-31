"use client";

import React, { useState } from "react";
import Image from "next/image";

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
      
      {/* Page Hero Band */}
      <section className="vad-page-hero vad-section--deep" style={{ paddingBottom: "clamp(48px, 6vw, 72px)" }}>
        <div className="vad-container vad-page-hero__inner">
          <span className="vad-eyebrow" style={{ color: "var(--vad-gold)" }}>Get In Touch</span>
          <h1 className="vad-page-hero__title" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>
            Let's Make a <span className="vad-page-hero__accent">Difference</span>
          </h1>
          <p className="vad-page-hero__lead" style={{ marginTop: "16px", fontSize: "18px", maxWidth: "600px", margin: "16px auto 0" }}>
            Whether you're looking to partner with us, volunteer, or just want to say hello, we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="vad-section vad-section--paper" style={{ padding: "80px 0" }}>
        <div className="vad-container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "60px",
            alignItems: "flex-start",
          }}>
            
            {/* Left: Contact Details */}
            <div>
              <h2 style={{ fontSize: "32px", color: "var(--vad-navy-950)", fontFamily: "var(--vad-font-display)", fontWeight: 800, marginBottom: "24px" }}>
                Contact Information
              </h2>
              <p style={{ color: "var(--vad-ink)", fontSize: "16px", lineHeight: 1.7, marginBottom: "40px" }}>
                Have questions about our initiatives or want to get involved? Reach out to us using the form, or connect with us directly through the information below.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                {/* Detail Item: Address */}
                <div style={{ display: "flex", gap: "20px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "16px", background: "rgba(242, 167, 18, 0.1)", color: "var(--vad-gold)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 4px", fontSize: "18px", color: "var(--vad-navy-950)", fontWeight: 700 }}>Our Location</h3>
                    <p style={{ margin: 0, color: "var(--vad-ink-soft)", fontSize: "15px", lineHeight: 1.6 }}>
                      VADAANYA JANAA SOCIETY<br />
                      Flat no: 528, Road no: 15, Vasantha Nagar, Kukatpally Housing Board Colony, Hyderabad – 500072
                    </p>
                  </div>
                </div>

                {/* Detail Item: Email */}
                <div style={{ display: "flex", gap: "20px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "16px", background: "rgba(242, 167, 18, 0.1)", color: "var(--vad-gold)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 4px", fontSize: "18px", color: "var(--vad-navy-950)", fontWeight: 700 }}>Email Us</h3>
                    <p style={{ margin: 0, color: "var(--vad-ink-soft)", fontSize: "15px", lineHeight: 1.6 }}>
                      <a href="mailto:vadaanyasociety@gmail.com" style={{ color: "var(--vad-navy-800)", textDecoration: "none" }}>vadaanyasociety@gmail.com</a>
                    </p>
                  </div>
                </div>

                {/* Detail Item: Phone */}
                <div style={{ display: "flex", gap: "20px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "16px", background: "rgba(242, 167, 18, 0.1)", color: "var(--vad-gold)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 4px", fontSize: "18px", color: "var(--vad-navy-950)", fontWeight: 700 }}>Call Us</h3>
                    <p style={{ margin: 0, color: "var(--vad-ink-soft)", fontSize: "15px", lineHeight: 1.6 }}>
                      <a href="https://vadaanya.org/contact-us/#" style={{ color: "var(--vad-navy-800)", textDecoration: "none" }}>+91 8109598109 (what's app messages only)</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div style={{ 
              background: "#ffffff", 
              borderRadius: "24px", 
              padding: "40px", 
              boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
              border: "1px solid rgba(0,0,0,0.03)"
            }}>
              <h3 style={{ fontSize: "24px", color: "var(--vad-navy-950)", fontFamily: "var(--vad-font-display)", fontWeight: 700, marginBottom: "24px", marginTop: 0 }}>
                Send us a message
              </h3>
              
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                
                {/* Form Group: Name */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label htmlFor="name" style={{ fontSize: "14px", fontWeight: 600, color: "var(--vad-navy-950)" }}>Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      padding: "16px 20px",
                      borderRadius: "12px",
                      border: `1px solid ${errors.name ? "red" : "rgba(10, 16, 48, 0.1)"}`,
                      background: "#fdfdfd",
                      fontSize: "15px",
                      fontFamily: "var(--vad-font-body)",
                      outline: "none",
                      transition: "all 0.3s ease"
                    }}
                    onFocus={(e) => { if(!errors.name) { e.currentTarget.style.borderColor = "var(--vad-gold)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(242, 167, 18, 0.15)"; } }}
                    onBlur={(e) => { if(!errors.name) { e.currentTarget.style.borderColor = "rgba(10, 16, 48, 0.1)"; e.currentTarget.style.boxShadow = "none"; } }}
                  />
                  {errors.name && <span style={{ color: "red", fontSize: "13px" }}>{errors.name}</span>}
                </div>

                {/* Form Group: Email */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label htmlFor="email" style={{ fontSize: "14px", fontWeight: 600, color: "var(--vad-navy-950)" }}>Email Address</label>
                  <input 
                    type="text" 
                    id="email" 
                    name="email" 
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      padding: "16px 20px",
                      borderRadius: "12px",
                      border: `1px solid ${errors.email ? "red" : "rgba(10, 16, 48, 0.1)"}`,
                      background: "#fdfdfd",
                      fontSize: "15px",
                      fontFamily: "var(--vad-font-body)",
                      outline: "none",
                      transition: "all 0.3s ease"
                    }}
                    onFocus={(e) => { if(!errors.email) { e.currentTarget.style.borderColor = "var(--vad-gold)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(242, 167, 18, 0.15)"; } }}
                    onBlur={(e) => { if(!errors.email) { e.currentTarget.style.borderColor = "rgba(10, 16, 48, 0.1)"; e.currentTarget.style.boxShadow = "none"; } }}
                  />
                  {errors.email && <span style={{ color: "red", fontSize: "13px" }}>{errors.email}</span>}
                </div>
                
                {/* Form Group: Subject */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label htmlFor="subject" style={{ fontSize: "14px", fontWeight: 600, color: "var(--vad-navy-950)" }}>Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                    style={{
                      padding: "16px 20px",
                      borderRadius: "12px",
                      border: `1px solid ${errors.subject ? "red" : "rgba(10, 16, 48, 0.1)"}`,
                      background: "#fdfdfd",
                      fontSize: "15px",
                      fontFamily: "var(--vad-font-body)",
                      outline: "none",
                      transition: "all 0.3s ease"
                    }}
                    onFocus={(e) => { if(!errors.subject) { e.currentTarget.style.borderColor = "var(--vad-gold)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(242, 167, 18, 0.15)"; } }}
                    onBlur={(e) => { if(!errors.subject) { e.currentTarget.style.borderColor = "rgba(10, 16, 48, 0.1)"; e.currentTarget.style.boxShadow = "none"; } }}
                  />
                  {errors.subject && <span style={{ color: "red", fontSize: "13px" }}>{errors.subject}</span>}
                </div>

                {/* Form Group: Message */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label htmlFor="message" style={{ fontSize: "14px", fontWeight: 600, color: "var(--vad-navy-950)" }}>Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5}
                    placeholder="Your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    style={{
                      padding: "16px 20px",
                      borderRadius: "12px",
                      border: `1px solid ${errors.message ? "red" : "rgba(10, 16, 48, 0.1)"}`,
                      background: "#fdfdfd",
                      fontSize: "15px",
                      fontFamily: "var(--vad-font-body)",
                      outline: "none",
                      transition: "all 0.3s ease",
                      resize: "vertical"
                    }}
                    onFocus={(e) => { if(!errors.message) { e.currentTarget.style.borderColor = "var(--vad-gold)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(242, 167, 18, 0.15)"; } }}
                    onBlur={(e) => { if(!errors.message) { e.currentTarget.style.borderColor = "rgba(10, 16, 48, 0.1)"; e.currentTarget.style.boxShadow = "none"; } }}
                  ></textarea>
                  {errors.message && <span style={{ color: "red", fontSize: "13px" }}>{errors.message}</span>}
                </div>

                {/* Submit Status Error */}
                {submitStatus === "error" && (
                  <div style={{ padding: "12px", background: "rgba(220, 53, 69, 0.1)", color: "#dc3545", borderRadius: "8px", fontSize: "14px", fontWeight: 600 }}>
                    Something went wrong, please try again.
                  </div>
                )}

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={isSubmitting || submitStatus === "success"}
                  style={{
                    marginTop: "10px",
                    padding: "18px",
                    background: submitStatus === "success" ? "var(--vad-gold)" : "#17265E",
                    color: submitStatus === "success" ? "var(--vad-navy-950)" : "white",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: 700,
                    cursor: (isSubmitting || submitStatus === "success") ? "default" : "pointer",
                    boxShadow: submitStatus === "success" ? "none" : "0 10px 20px rgba(10, 16, 48, 0.2)",
                    transition: "all 0.3s ease",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    opacity: isSubmitting ? 0.8 : 1
                  }}
                  onMouseEnter={(e) => { 
                    if (!isSubmitting && submitStatus !== "success") {
                      e.currentTarget.style.transform = "translateY(-3px)"; 
                      e.currentTarget.style.boxShadow = "0 15px 30px rgba(10, 16, 48, 0.3)"; 
                      e.currentTarget.style.background = "var(--vad-navy-950)"; 
                    }
                  }}
                  onMouseLeave={(e) => { 
                    if (!isSubmitting && submitStatus !== "success") {
                      e.currentTarget.style.transform = "translateY(0)"; 
                      e.currentTarget.style.boxShadow = "0 10px 20px rgba(10, 16, 48, 0.2)"; 
                      e.currentTarget.style.background = "#17265E"; 
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="vad-spin">
                        <line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                      </svg>
                      Sending...
                    </>
                  ) : submitStatus === "success" ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Submitted
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
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
