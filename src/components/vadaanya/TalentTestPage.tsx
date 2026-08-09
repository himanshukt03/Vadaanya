"use client";

import { useState } from "react";
import Image from "next/image";

export default function TalentTestPage() {
  const [activeTab, setActiveTab] = useState<"register" | "download">("register");

  // Registration Form State
  const [formData, setFormData] = useState({
    test: "Srinivasa Ramanujan Talent Test (Class 9 & 10)",
    fullName: "",
    guardianName: "",
    age: "",
    grade: "",
    medium: "",
    schoolName: "",
    collegeName: "",
    town: "",
    district: "Sri Sathya Sai",
    mobile: "",
    email: "",
    consent: false,
  });

  // Search Form State
  const [searchQuery, setSearchQuery] = useState("");
  
  // Registration Result State
  const [registrationSuccess, setRegistrationSuccess] = useState<{
    hallTicketNo: string;
    fullName: string;
    grade: string;
    center: string;
  } | null>(null);

  // Search Result State
  const [searchResult, setSearchResult] = useState<{
    hallTicketNo: string;
    fullName: string;
    grade: string;
    center: string;
    status: string;
  } | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.guardianName || !formData.grade || !formData.medium || !formData.town || !formData.mobile || !formData.consent) {
      alert("Please fill in all required fields and accept the consent check.");
      return;
    }
    const mockTicketNo = `VJS25-${Math.floor(100000 + Math.random() * 900000)}`;
    setRegistrationSuccess({
      hallTicketNo: mockTicketNo,
      fullName: formData.fullName,
      grade: formData.grade,
      center: `${formData.town} Exam Center (${formData.district})`,
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      alert("Please enter your Hall Ticket Number or registered Mobile Number.");
      return;
    }
    const query = searchQuery.trim();
    setSearchResult({
      hallTicketNo: query.toUpperCase().startsWith("VJS") ? query.toUpperCase() : "VJS25-004218",
      fullName: "Student Aspirant",
      grade: "Class 10 (Telugu Medium)",
      center: "Government High School, Kothacheruvu Center",
      status: "Active & Verified",
    });
  };

  return (
    <div className="vad-talent-page">
      {/* Page Hero - Full Viewport 100vh */}
      <section
        style={{
          background: "linear-gradient(180deg, #060b22 0%, #0c1438 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(86px, 7vw, 110px) 0 clamp(36px, 4vw, 54px)",
          color: "#ffffff",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <div className="vad-container" style={{ width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px", alignItems: "center" }}>
            
            {/* Left Column: Intro Text */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(242, 167, 18, 0.12)", border: "1px solid rgba(242, 167, 18, 0.3)", padding: "5px 12px", borderRadius: "100px", color: "var(--vad-gold)", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>
                <span>★</span> The Flagship
              </div>
              <h1 style={{ fontSize: "clamp(22px, 2.3vw, 34px)", fontWeight: 800, lineHeight: 1.15, margin: "0 0 12px", color: "#ffffff" }}>
                The Srinivasa Ramanujan <span style={{ color: "var(--vad-gold)" }}>Talent Test</span>
              </h1>
              <p style={{ fontSize: "clamp(13.5px, 1.05vw, 15px)", lineHeight: 1.55, color: "#cbd5e1", margin: "0 0 20px", maxWidth: "520px" }}>
                Once a year, thousands of government-school students across Anantapur and Sri Sathya Sai districts sit a single exam — and the ones who shine are recognised, rewarded and remembered. In 2022 alone, 4,200 students wrote it across six centres in one Sunday.
              </p>
              
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <a href="#register" className="vad-btn vad-btn--gold" style={{ padding: "11px 24px", fontSize: "13.5px" }}>
                  Register for Talent Test &rarr;
                </a>
              </div>
            </div>

            {/* Right Column: Poster Image */}
            <div style={{ position: "relative", width: "100%", maxWidth: "360px", margin: "0 auto", display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 48px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.12)", background: "#050a1e", width: "100%" }}>
                <Image
                  src="/talent_test.jpg"
                  alt="The Srinivasa Ramanujan Talent Test Poster"
                  width={400}
                  height={460}
                  priority
                  style={{ width: "100%", height: "auto", maxHeight: "420px", objectFit: "contain", display: "block" }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Registration & Hall Ticket Portal Section */}
      <section id="register" className="vad-section vad-section--paper" style={{ padding: "80px 0", background: "#f8fafc", color: "#0f172a" }}>
        <div className="vad-container" style={{ maxWidth: "860px" }}>
          
          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ color: "var(--vad-gold-dark, #d97706)", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Talent Test
            </span>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, color: "#0a1030", margin: "8px 0 12px" }}>
              Register &amp; Get Your Hall Ticket
            </h2>
            <p style={{ fontSize: "15.5px", color: "#475569", maxWidth: "660px", margin: "0 auto", lineHeight: 1.6 }}>
              Open to Class 9 &amp; 10 students of government schools, and to DSC (SGT) aspirants. Fill in the details once — your hall ticket is generated instantly to download and print.
            </p>
          </div>

          {/* Tab Switcher */}
          <div style={{ display: "flex", background: "#e2e8f0", borderRadius: "100px", padding: "4px", maxWidth: "420px", margin: "0 auto 36px" }}>
            <button
              onClick={() => { setActiveTab("register"); setRegistrationSuccess(null); }}
              style={{
                flex: 1,
                padding: "10px 20px",
                borderRadius: "100px",
                border: "none",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
                background: activeTab === "register" ? "#0a1030" : "transparent",
                color: activeTab === "register" ? "#ffffff" : "#475569",
              }}
            >
              New Registration
            </button>
            <button
              onClick={() => { setActiveTab("download"); setSearchResult(null); }}
              style={{
                flex: 1,
                padding: "10px 20px",
                borderRadius: "100px",
                border: "none",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
                background: activeTab === "download" ? "#0a1030" : "transparent",
                color: activeTab === "download" ? "#ffffff" : "#475569",
              }}
            >
              Download Hall Ticket
            </button>
          </div>

          {/* CARD CONTAINER */}
          <div style={{ background: "#ffffff", borderRadius: "24px", border: "1px solid #cbd5e1", boxShadow: "0 10px 40px rgba(0,0,0,0.06)", padding: "clamp(24px, 5vw, 40px)" }}>
            
            {/* TAB 1: NEW REGISTRATION */}
            {activeTab === "register" && (
              <>
                {registrationSuccess ? (
                  <div style={{ textAlign: "center", padding: "20px 10px" }}>
                    <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#dcfce7", color: "#16a34a", display: "grid", placeItems: "center", margin: "0 auto 16px", fontSize: "28px" }}>
                      ✓
                    </div>
                    <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#0a1030", marginBottom: "8px" }}>
                      Registration Successful!
                    </h3>
                    <p style={{ color: "#475569", fontSize: "15px", marginBottom: "24px" }}>
                      Your hall ticket has been generated. Please save or print your ticket for exam day.
                    </p>

                    <div style={{ background: "#f8fafc", border: "2px dashed #cbd5e1", borderRadius: "16px", padding: "24px", maxWidth: "480px", margin: "0 auto 28px", textAlign: "left" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", borderBottom: "1px solid #e2e8f0", paddingBottom: "10px" }}>
                        <span style={{ color: "#64748b", fontSize: "13px", fontWeight: 600 }}>HALL TICKET NO.</span>
                        <strong style={{ color: "#0a1030", fontSize: "16px", letterSpacing: "0.05em" }}>{registrationSuccess.hallTicketNo}</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ color: "#64748b", fontSize: "13px" }}>Student Name:</span>
                        <strong style={{ color: "#0f172a", fontSize: "14px" }}>{registrationSuccess.fullName}</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ color: "#64748b", fontSize: "13px" }}>Class / Grade:</span>
                        <span style={{ color: "#0f172a", fontSize: "14px" }}>{registrationSuccess.grade}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#64748b", fontSize: "13px" }}>Assigned Center:</span>
                        <span style={{ color: "#0f172a", fontSize: "14px", fontWeight: 600 }}>{registrationSuccess.center}</span>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                      <button onClick={() => window.print()} className="vad-btn vad-btn--gold" style={{ padding: "12px 24px" }}>
                        🖨 Print / Download Ticket
                      </button>
                      <button onClick={() => { setRegistrationSuccess(null); setFormData({ ...formData, fullName: "", mobile: "" }); }} className="vad-btn vad-btn--outline-dark" style={{ padding: "12px 24px" }}>
                        New Registration
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    
                    {/* Test Selection */}
                    <div>
                      <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                        Test *
                      </label>
                      <select
                        value={formData.test}
                        disabled
                        style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", background: "#f1f5f9", color: "#0f172a", fontWeight: 600, fontSize: "14px" }}
                      >
                        <option value="Srinivasa Ramanujan Talent Test (Class 9 & 10)">
                          Srinivasa Ramanujan Talent Test (Class 9 &amp; 10)
                        </option>
                      </select>
                    </div>

                    {/* Name & Guardian Name */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                          Full name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Student's full name"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                          Father / Guardian name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Parent or guardian"
                          value={formData.guardianName}
                          onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                          style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a" }}
                        />
                      </div>
                    </div>

                    {/* Age, Grade, Medium */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "20px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                          Age
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 15"
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                          style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a" }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                          Class / Grade *
                        </label>
                        <select
                          required
                          value={formData.grade}
                          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                          style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a", background: "#ffffff" }}
                        >
                          <option value="">Select</option>
                          <option value="Class 9">Class 9</option>
                          <option value="Class 10">Class 10</option>
                          <option value="DSC (SGT) Aspirant">DSC (SGT) Aspirant</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                          Medium *
                        </label>
                        <select
                          required
                          value={formData.medium}
                          onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                          style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a", background: "#ffffff" }}
                        >
                          <option value="">Select</option>
                          <option value="Telugu Medium">Telugu Medium</option>
                          <option value="English Medium">English Medium</option>
                        </select>
                      </div>
                    </div>

                    {/* School & College Name */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                          School name
                        </label>
                        <input
                          type="text"
                          placeholder="Government school name"
                          value={formData.schoolName}
                          onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                          style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a" }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                          College name
                        </label>
                        <input
                          type="text"
                          placeholder="If applicable"
                          value={formData.collegeName}
                          onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                          style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a" }}
                        />
                      </div>
                    </div>

                    {/* Town & District */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                          Place / Village or Town *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Kothacheruvu"
                          value={formData.town}
                          onChange={(e) => setFormData({ ...formData, town: e.target.value })}
                          style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a" }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                          District
                        </label>
                        <select
                          value={formData.district}
                          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                          style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a", background: "#ffffff" }}
                        >
                          <option value="Sri Sathya Sai">Sri Sathya Sai</option>
                          <option value="Anantapur">Anantapur</option>
                          <option value="Other">Other District</option>
                        </select>
                      </div>
                    </div>

                    {/* Mobile & Email */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                          Mobile number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="10-digit mobile"
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                          style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a" }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="Optional"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a" }}
                        />
                      </div>
                    </div>

                    {/* Consent Checkbox */}
                    <div style={{ marginTop: "6px" }}>
                      <label style={{ display: "flex", gap: "10px", alignItems: "flex-start", cursor: "pointer", fontSize: "13.5px", color: "#475569", lineHeight: 1.5 }}>
                        <input
                          type="checkbox"
                          required
                          checked={formData.consent}
                          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                          style={{ marginTop: "3px", width: "16px", height: "16px" }}
                        />
                        <span>
                          I am the student or parent/guardian and consent to Vadaanya using these details for the talent test. Vadaanya keeps this information private and uses it only for the exam.
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div style={{ marginTop: "12px" }}>
                      <button
                        type="submit"
                        className="vad-btn vad-btn--gold"
                        style={{ width: "100%", padding: "14px 28px", fontSize: "15px", justifyContent: "center" }}
                      >
                        Register &amp; generate hall ticket &rarr;
                      </button>
                    </div>

                  </form>
                )}
              </>
            )}

            {/* TAB 2: DOWNLOAD HALL TICKET */}
            {activeTab === "download" && (
              <div>
                <form onSubmit={handleSearch} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#334155", marginBottom: "8px" }}>
                      Enter your Hall Ticket No. or mobile number
                    </label>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <input
                        type="text"
                        required
                        placeholder="e.g. VJS25-000123 or 9XXXXXXXXX"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ flex: "1 1 260px", padding: "12px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a" }}
                      />
                      <button
                        type="submit"
                        className="vad-btn vad-btn--navy"
                        style={{ padding: "12px 24px", fontSize: "14px" }}
                      >
                        Find &amp; download
                      </button>
                    </div>
                  </div>

                  <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                    Hall tickets are saved on this device after you register. On a new device, please re-register or contact us.
                  </p>
                </form>

                {searchResult && (
                  <div style={{ marginTop: "28px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "16px", padding: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", borderBottom: "1px solid #e2e8f0", paddingBottom: "10px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#64748b" }}>FOUND HALL TICKET</span>
                      <span style={{ background: "#dcfce7", color: "#15803d", fontSize: "12px", fontWeight: 700, padding: "3px 10px", borderRadius: "100px" }}>
                        {searchResult.status}
                      </span>
                    </div>

                    <div style={{ display: "grid", gap: "8px", fontSize: "14px", color: "#0f172a", marginBottom: "16px" }}>
                      <div><strong>Ticket No:</strong> {searchResult.hallTicketNo}</div>
                      <div><strong>Student Name:</strong> {searchResult.fullName}</div>
                      <div><strong>Category:</strong> {searchResult.grade}</div>
                      <div><strong>Exam Center:</strong> {searchResult.center}</div>
                    </div>

                    <button onClick={() => window.print()} className="vad-btn vad-btn--gold" style={{ padding: "10px 20px", fontSize: "13.5px" }}>
                      🖨 Print / Download Ticket
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      </section>
    </div>
  );
}
