"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  DISTRICTS_DATA,
  STREAM_OPTIONS,
  VOCATIONAL_OPTIONS,
  DUMMY_EXISTING_RECORD,
  getSchoolsForMandal,
  DistrictInfo,
} from "@/data/vadaanya/talentTestDistrictsData";

interface FormData {
  // Step 0: Gate
  aadhaar: string;
  whatsapp: string;
  // Step 1: Personal
  fullName: string;
  relativeName: string;
  gender: "MALE" | "FEMALE" | "";
  studentClass: "Class 9" | "Class 10" | "";
  // Step 2: Location & School
  district: "ATP" | "SSS";
  mandal: string;
  village: string;
  schoolName: string;
  customSchoolName: string;
  // Step 3: Aspirations
  stream: string;
  vocationalInterest: string;
  declaration: boolean;
}

const INITIAL_FORM: FormData = {
  aadhaar: "",
  whatsapp: "",
  fullName: "",
  relativeName: "",
  gender: "",
  studentClass: "",
  district: "ATP",
  mandal: "Gooty",
  village: "",
  schoolName: "",
  customSchoolName: "",
  stream: "MPC",
  vocationalInterest: "None",
  declaration: true,
};

export default function TalentTestRegistration() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionProgress, setSubmissionProgress] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [generatedRegNo, setGeneratedRegNo] = useState<string>("");
  const [completedTimestamp, setCompletedTimestamp] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [showAlreadyRegistered, setShowAlreadyRegistered] = useState(false);
  const [autoSaveText, setAutoSaveText] = useState<string>("Draft auto-saves automatically");

  // Keep track of scroll container
  const formTopRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      const topEl = formTopRef.current || document.getElementById("reg-form-top");
      if (topEl) {
        topEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Helper to format Aadhaar with spaces: "1234 5678 9012"
  const handleAadhaarChange = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 12);
    const parts = raw.match(/.{1,4}/g);
    const formatted = parts ? parts.join(" ") : raw;
    setFormData((prev) => ({ ...prev, aadhaar: formatted }));
    setShowAlreadyRegistered(false);
    if (errors.aadhaar) setErrors((prev) => ({ ...prev, aadhaar: "" }));
  };

  // Helper for 10-digit mobile
  const handlePhoneChange = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, whatsapp: raw }));
    if (errors.whatsapp) setErrors((prev) => ({ ...prev, whatsapp: "" }));
  };

  // When district changes, default mandal to first in list
  const handleDistrictChange = (distId: "ATP" | "SSS") => {
    const defaultMandal = DISTRICTS_DATA[distId].mandals[0] || "";
    setFormData((prev) => ({
      ...prev,
      district: distId,
      mandal: defaultMandal,
      schoolName: "",
      customSchoolName: "",
    }));
  };

  // When mandal changes, reset school selection
  const handleMandalChange = (mandal: string) => {
    setFormData((prev) => ({
      ...prev,
      mandal,
      schoolName: "",
      customSchoolName: "",
    }));
  };

  // Simulate auto-save on step transitions
  const triggerAutoSave = () => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setAutoSaveText(`✓ Auto-saved draft at ${now}`);
  };

  // Validation per step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      const cleanAadhaar = formData.aadhaar.replace(/\s/g, "");
      if (!cleanAadhaar) {
        newErrors.aadhaar = "Please enter student's 12-digit Aadhaar number";
      } else if (cleanAadhaar.length !== 12) {
        newErrors.aadhaar = `Aadhaar must be 12 digits (currently ${cleanAadhaar.length} digits)`;
      }

      if (!formData.whatsapp) {
        newErrors.whatsapp = "WhatsApp mobile number is required for updates";
      } else if (formData.whatsapp.length !== 10) {
        newErrors.whatsapp = "Please enter a valid 10-digit mobile number";
      }
    } else if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Student Full Name is required";
      if (!formData.relativeName.trim()) newErrors.relativeName = "Father / Mother / Guardian Name is required";
      if (!formData.gender) newErrors.gender = "Please select gender for exam center allocation";
      if (!formData.studentClass) newErrors.studentClass = "Please select Class (9 or 10)";
    } else if (step === 2) {
      if (!formData.district) newErrors.district = "District is required";
      if (!formData.mandal) newErrors.mandal = "Mandal is required";
      if (!formData.village.trim()) newErrors.village = "Village / Town name is required";
      if (!formData.schoolName) {
        newErrors.schoolName = "Please select or enter school name";
      } else if (formData.schoolName === "OTHER" && !formData.customSchoolName.trim()) {
        newErrors.customSchoolName = "Please enter your school name";
      }
    } else if (step === 3) {
      if (!formData.stream) newErrors.stream = "Please select future stream of study";
      if (!formData.vocationalInterest) newErrors.vocationalInterest = "Please select vocational interest";
      if (!formData.declaration) newErrors.declaration = "You must confirm that details are accurate";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Quick Demo Buttons
  const handlePreFillDemo = () => {
    setFormData({
      aadhaar: "5489 1234 5678",
      whatsapp: "9876543210",
      fullName: "K. Harika",
      relativeName: "K. Venkatesulu",
      gender: "FEMALE",
      studentClass: "Class 10",
      district: "ATP",
      mandal: "Gooty",
      village: "Gooty R.S.",
      schoolName: "Government High School (Girls), Gooty",
      customSchoolName: "",
      stream: "BiPC",
      vocationalInterest: "Electrical",
      declaration: true,
    });
    setShowAlreadyRegistered(false);
    setErrors({});
    triggerAutoSave();
  };

  const handleTestDuplicate = () => {
    setFormData((prev) => ({
      ...prev,
      aadhaar: DUMMY_EXISTING_RECORD.aadhaar,
      whatsapp: DUMMY_EXISTING_RECORD.whatsapp,
    }));
    setShowAlreadyRegistered(true);
    setErrors({});
  };

  const handleResetForm = () => {
    setFormData(INITIAL_FORM);
    setCurrentStep(0);
    setIsCompleted(false);
    setShowAlreadyRegistered(false);
    setErrors({});
    scrollToTop();
  };

  // Advance step
  const handleNext = () => {
    if (!validateStep(currentStep)) return;

    if (currentStep === 0) {
      // Check if duplicate demo
      const cleanAadhaar = formData.aadhaar.replace(/\s/g, "");
      if (cleanAadhaar === DUMMY_EXISTING_RECORD.aadhaar.replace(/\s/g, "")) {
        setShowAlreadyRegistered(true);
        return;
      }
      setShowAlreadyRegistered(false);
      setCurrentStep(1);
      triggerAutoSave();
      scrollToTop();
    } else if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
      triggerAutoSave();
      scrollToTop();
    } else {
      // Final Submit
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      scrollToTop();
    }
  };

  // Submit Simulation
  const handleSubmit = () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setSubmissionProgress("Connecting to Vadaanya Registration Cloud...");

    setTimeout(() => {
      setSubmissionProgress("Reserving District Quota allocation...");
    }, 450);

    setTimeout(() => {
      setSubmissionProgress("Generating secure registration code...");
    }, 900);

    setTimeout(() => {
      // Generate structured number: V26-[DIST]-[BATCH][SEQ]
      const distCode = formData.district === "ATP" ? "ATP" : "SSS";
      const randomSeq = Math.floor(100 + Math.random() * 900);
      const batch = "A";
      const regNo = `V26-${distCode}-${batch}0${randomSeq}`;

      setGeneratedRegNo(regNo);
      setCompletedTimestamp(
        new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setIsSubmitting(false);
      setIsCompleted(true);
      scrollToTop();
    }, 1400);
  };

  // Quick Add Next Student (retains School, Mandal, District)
  const handleQuickAddNext = () => {
    setFormData((prev) => ({
      ...INITIAL_FORM,
      district: prev.district,
      mandal: prev.mandal,
      village: prev.village,
      schoolName: prev.schoolName,
      customSchoolName: prev.customSchoolName,
    }));
    setIsCompleted(false);
    setCurrentStep(0);
    setShowAlreadyRegistered(false);
    setGeneratedRegNo("");
    scrollToTop();
  };

  const copyRegNo = () => {
    if (typeof navigator !== "undefined" && generatedRegNo) {
      navigator.clipboard.writeText(generatedRegNo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Current district details
  const activeDistrictInfo: DistrictInfo = DISTRICTS_DATA[formData.district];
  const schoolsList = getSchoolsForMandal(activeDistrictInfo.name, formData.mandal);
  const resolvedSchool =
    formData.schoolName === "OTHER"
      ? formData.customSchoolName || "Custom School"
      : formData.schoolName || `ZPHS, ${formData.mandal}`;

  return (
    <div className="vad-reg-page">
      {/* ───────────────────────────────────────────────
          HERO BANNER & LIVE QUOTA METRICS
          ─────────────────────────────────────────────── */}
      <header className="vad-reg-hero">
        <div className="vad-reg-hero__glow" />
        <div className="vad-container">
          <div className="vad-reg-hero__badge-wrap">
            <span className="vad-reg-hero__badge">
              <span className="vad-news-card__red-dot" />
              Annual State Talent Test 2026
            </span>
            <span className="vad-reg-hero__badge vad-reg-hero__badge--green">
              ✓ Free Entry for Classes 9 & 10
            </span>
          </div>

          <h1 className="vad-reg-hero__title">
            Vadaanya Talent Test <span>2026</span> Registration
          </h1>
          <p className="vad-reg-hero__lead">
            Empowering rural government school students across Anantapur and Sri Sathya Sai districts. 
            Fill the progressive form below to reserve your exam seat and receive your unique Registration Number.
          </p>

          {/* District Quota Trackers */}
          <div className="vad-reg-hero__quotas">
            {/* Anantapur */}
            <div className="vad-reg-hero__quota-card">
              <div className="vad-reg-hero__quota-head">
                <span>Anantapur District Quota</span>
                <span className="vad-reg-hero__quota-count">3,142 / 4,000</span>
              </div>
              <div className="vad-reg-hero__progress-bar">
                <div className="vad-reg-hero__progress-fill" style={{ width: "78%" }} />
              </div>
            </div>

            {/* Sri Sathya Sai */}
            <div className="vad-reg-hero__quota-card">
              <div className="vad-reg-hero__quota-head">
                <span>Sri Sathya Sai District Quota</span>
                <span className="vad-reg-hero__quota-count">2,890 / 4,000</span>
              </div>
              <div className="vad-reg-hero__progress-bar">
                <div className="vad-reg-hero__progress-fill" style={{ width: "72%" }} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ───────────────────────────────────────────────
          SIMULATION TESTING TOOLBAR
          ─────────────────────────────────────────────── */}
      <aside className="vad-reg-toolbar" aria-label="Demo Testing Controls">
        <div className="vad-container vad-reg-toolbar__inner">
          <div className="vad-reg-toolbar__label">
            <span>⚡ Interactive Simulation:</span>
          </div>
          <div className="vad-reg-toolbar__actions">
            <button
              type="button"
              onClick={handlePreFillDemo}
              className="vad-reg-toolbar__btn vad-reg-toolbar__btn--active"
              title="Pre-fill form with realistic sample student data"
            >
              🚀 Pre-Fill Sample Student
            </button>
            <button
              type="button"
              onClick={handleTestDuplicate}
              className="vad-reg-toolbar__btn"
              title="Test already-registered Aadhaar detection"
            >
              🔍 Test Duplicate Aadhaar Flow
            </button>
            <button
              type="button"
              onClick={handleResetForm}
              className="vad-reg-toolbar__btn"
              title="Reset form fields"
            >
              ↺ Reset
            </button>
          </div>
        </div>
      </aside>

      <div className="vad-container" id="reg-form-top" ref={formTopRef}>
        {/* ───────────────────────────────────────────────
            STEPPER PROGRESS
            ─────────────────────────────────────────────── */}
        {!isCompleted && (
          <nav className="vad-stepper" aria-label="Registration Progress">
            {/* Desktop Stepper */}
            <ol className="vad-stepper__list">
              {/* Step 0 */}
              <li className="vad-stepper__step">
                <div
                  className={`vad-stepper__circle ${
                    currentStep === 0 ? "is-active" : currentStep > 0 ? "is-completed" : ""
                  }`}
                >
                  {currentStep > 0 ? "✓" : "1"}
                </div>
                <div className="vad-stepper__info">
                  <span className="vad-stepper__step-num">Step 1</span>
                  <span className={`vad-stepper__step-label ${currentStep === 0 ? "is-active" : ""}`}>
                    Verify Identity
                  </span>
                </div>
              </li>

              <div className={`vad-stepper__divider ${currentStep > 0 ? "is-completed" : ""}`} />

              {/* Step 1 */}
              <li className="vad-stepper__step">
                <div
                  className={`vad-stepper__circle ${
                    currentStep === 1 ? "is-active" : currentStep > 1 ? "is-completed" : ""
                  }`}
                >
                  {currentStep > 1 ? "✓" : "2"}
                </div>
                <div className="vad-stepper__info">
                  <span className="vad-stepper__step-num">Step 2</span>
                  <span className={`vad-stepper__step-label ${currentStep === 1 ? "is-active" : ""}`}>
                    Student Details
                  </span>
                </div>
              </li>

              <div className={`vad-stepper__divider ${currentStep > 1 ? "is-completed" : ""}`} />

              {/* Step 2 */}
              <li className="vad-stepper__step">
                <div
                  className={`vad-stepper__circle ${
                    currentStep === 2 ? "is-active" : currentStep > 2 ? "is-completed" : ""
                  }`}
                >
                  {currentStep > 2 ? "✓" : "3"}
                </div>
                <div className="vad-stepper__info">
                  <span className="vad-stepper__step-num">Step 3</span>
                  <span className={`vad-stepper__step-label ${currentStep === 2 ? "is-active" : ""}`}>
                    School & Location
                  </span>
                </div>
              </li>

              <div className={`vad-stepper__divider ${currentStep > 2 ? "is-completed" : ""}`} />

              {/* Step 3 */}
              <li className="vad-stepper__step">
                <div className={`vad-stepper__circle ${currentStep === 3 ? "is-active" : ""}`}>
                  4
                </div>
                <div className="vad-stepper__info">
                  <span className="vad-stepper__step-num">Step 4</span>
                  <span className={`vad-stepper__step-label ${currentStep === 3 ? "is-active" : ""}`}>
                    Aspirations & Submit
                  </span>
                </div>
              </li>
            </ol>

            {/* Mobile Stepper */}
            <div className="vad-stepper__mobile">
              <div className="vad-stepper__mobile-meta">
                <span>
                  {currentStep === 0 && "Step 1 of 4: Verify Identity"}
                  {currentStep === 1 && "Step 2 of 4: Student Details"}
                  {currentStep === 2 && "Step 3 of 4: School & Location"}
                  {currentStep === 3 && "Step 4 of 4: Aspirations & Submit"}
                </span>
                <span>{((currentStep + 1) / 4) * 100}%</span>
              </div>
              <div className="vad-stepper__mobile-bar">
                <div
                  className="vad-stepper__mobile-fill"
                  style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
                />
              </div>
            </div>
          </nav>
        )}

        {/* ───────────────────────────────────────────────
            MAIN FORM CARD
            ─────────────────────────────────────────────── */}
        <main className="vad-form-card">
          {/* Submitting Loading Overlay */}
          {isSubmitting && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(255, 255, 255, 0.94)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "20px",
                zIndex: 20,
                padding: "24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  border: "4px solid #e2e8f0",
                  borderTopColor: "var(--vad-gold)",
                  animation: "vad-spin 0.8s linear infinite",
                  marginBottom: "20px",
                }}
              />
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--vad-navy-950)", margin: "0 0 8px" }}>
                Processing Registration
              </h3>
              <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
                {submissionProgress}
              </p>
            </div>
          )}

          {/* ───────────────────────────────────────────────
              VIEW: COMPLETED CONFIRMATION SCREEN
              ─────────────────────────────────────────────── */}
          {isCompleted ? (
            <div className="vad-success-view">
              <div className="vad-success-view__icon-ring">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h2 className="vad-success-view__title">Registration Confirmed!</h2>
              <p className="vad-success-view__subtitle">
                The student’s exam slot has been reserved. Please save or note the Registration Number below.
              </p>

              {/* Digital Acknowledgment Slip */}
              <article className="vad-receipt-card" id="printable-receipt">
                <div className="vad-receipt-card__header">
                  <div>
                    <div className="vad-receipt-card__brand">
                      VADAANYA <span>TALENT TEST 2026</span>
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--vad-gold-soft)", marginTop: "2px" }}>
                      Vadaanya Janaa Society • Rural Government School Initiative
                    </div>
                  </div>
                  <div className="vad-receipt-card__seal">OFFICIAL ENTRY SLIP</div>
                </div>

                <div className="vad-receipt-card__reg-banner">
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#64748b" }}>
                      Registration Number
                    </div>
                    <div className="vad-receipt-card__reg-code">{generatedRegNo}</div>
                  </div>
                  <button
                    type="button"
                    onClick={copyRegNo}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "8px",
                      border: "1px solid #d97706",
                      background: "#ffffff",
                      color: "#92400e",
                      fontSize: "12.5px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {copied ? "✓ Copied!" : "📋 Copy Number"}
                  </button>
                </div>

                <div className="vad-receipt-card__body">
                  <table className="vad-receipt-card__table">
                    <tbody>
                      <tr>
                        <th>Student Name</th>
                        <td>{formData.fullName}</td>
                      </tr>
                      <tr>
                        <th>Father / Relative Name</th>
                        <td>{formData.relativeName}</td>
                      </tr>
                      <tr>
                        <th>Gender & Class</th>
                        <td>
                          {formData.gender} • {formData.studentClass}
                        </td>
                      </tr>
                      <tr>
                        <th>District & Mandal</th>
                        <td>
                          {activeDistrictInfo.name} • {formData.mandal}
                        </td>
                      </tr>
                      <tr>
                        <th>School Name</th>
                        <td>{resolvedSchool}</td>
                      </tr>
                      <tr>
                        <th>Registered WhatsApp</th>
                        <td>+91 {formData.whatsapp}</td>
                      </tr>
                      <tr>
                        <th>Registered On</th>
                        <td>{completedTimestamp}</td>
                      </tr>
                      <tr>
                        <th>Registration Status</th>
                        <td style={{ color: "#16a34a" }}>CONFIRMED (Slot Reserved)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="vad-receipt-card__footer">
                  <strong>Examination Note:</strong> Exam date is <strong>December 15, 2026</strong>. 
                  Exam center allocation will be based on gender and mandal proximity.
                </div>
              </article>

              {/* Hall Ticket Notice Box */}
              <div className="vad-notice-box">
                <div className="vad-notice-box__icon">🎫</div>
                <div className="vad-notice-box__text">
                  <strong>Hall Tickets Release Window:</strong> Hall tickets will be published on <strong>December 7, 2026</strong> at <code>www.vadaanya.org</code>. 
                  Students or Headmasters can download them using this <strong>Registration Number ({generatedRegNo})</strong> or the student’s <strong>Aadhaar Number</strong>.
                </div>
              </div>

              {/* Simulated WhatsApp Notification Box */}
              <div className="vad-wa-preview">
                <div className="vad-wa-preview__icon">💬</div>
                <div className="vad-wa-preview__bubble">
                  <strong>WhatsApp Notification Simulated (+91 {formData.whatsapp}):</strong>
                  <p style={{ margin: "4px 0 0" }}>
                    &ldquo;Dear {formData.fullName}, your registration for Vadaanya Talent Test 2026 is confirmed! Reg No: <strong>{generatedRegNo}</strong>. School: {resolvedSchool}. Hall tickets will be ready on Dec 7. - Vadaanya Foundation&rdquo;
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="vad-success-actions">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="vad-btn-step vad-btn-step--primary"
                >
                  🖨️ Print / Download Receipt
                </button>
                <button
                  type="button"
                  onClick={handleQuickAddNext}
                  className="vad-btn-step vad-btn-step--secondary"
                  title="Keeps School, Mandal, and District for fast batch entry by teachers"
                >
                  ➕ Register Another Student (Quick Add)
                </button>
                <Link href="/talent-test" className="vad-btn-step vad-btn-step--secondary">
                  🏠 Back to Talent Test Home
                </Link>
              </div>
            </div>
          ) : (
            /* ───────────────────────────────────────────────
               FORM STEPS
               ─────────────────────────────────────────────── */
            <div>
              {/* Form Card Header */}
              <div className="vad-form-card__header">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <h2 className="vad-form-card__title">
                      {currentStep === 0 && "Step 1: Student Identity Verification"}
                      {currentStep === 1 && "Step 2: Student Personal Details"}
                      {currentStep === 2 && "Step 3: School & Location Details"}
                      {currentStep === 3 && "Step 4: Aspirations & Skill Interests"}
                    </h2>
                    <p className="vad-form-card__subtitle">
                      {currentStep === 0 && "Enter Aadhaar and WhatsApp contact to verify identity and check for existing registrations."}
                      {currentStep === 1 && "Provide student name, relative name, and gender for exam hall seating allocation."}
                      {currentStep === 2 && "Select district, mandal, and government high school institution."}
                      {currentStep === 3 && "Tell us about higher education aspirations and optional vocational training interests."}
                    </p>
                  </div>
                  {currentStep > 0 && (
                    <span className="vad-form-card__autosave">
                      {autoSaveText}
                    </span>
                  )}
                </div>
              </div>

              {/* ───────────────────────────────────────────────
                  STEP 0: THE GATE (AADHAAR + WHATSAPP)
                  ─────────────────────────────────────────────── */}
              {currentStep === 0 && (
                <div>
                  <div className="vad-gate-box">
                    <div className="vad-gate-box__icon">🔒</div>
                    <div className="vad-gate-box__text">
                      <strong>Zero Data-Leakage Security:</strong> Aadhaar numbers are cryptographic blind-indexed with SHA-256 for instant duplicate prevention. Plain Aadhaar numbers are never displayed publicly.
                    </div>
                  </div>

                  {/* Already Registered Alert Box */}
                  {showAlreadyRegistered && (
                    <div className="vad-already-registered">
                      <div className="vad-already-registered__title">
                        <span>ℹ️</span> Already Registered!
                      </div>
                      <p style={{ margin: "0 0 10px", fontSize: "14px", color: "#1e3a8a" }}>
                        This Aadhaar number is already enrolled in the Vadaanya Talent Test 2026 database.
                      </p>
                      <div>
                        <strong>Existing Registration Number:</strong>
                        <div className="vad-already-registered__reg-no">
                          {DUMMY_EXISTING_RECORD.regNo}
                        </div>
                      </div>
                      <div className="vad-already-registered__details">
                        <div>
                          <strong>Student:</strong> {DUMMY_EXISTING_RECORD.studentName}
                        </div>
                        <div>
                          <strong>School:</strong> {DUMMY_EXISTING_RECORD.school}
                        </div>
                        <div>
                          <strong>Class:</strong> {DUMMY_EXISTING_RECORD.studentClass}
                        </div>
                        <div>
                          <strong>District:</strong> {DUMMY_EXISTING_RECORD.district}
                        </div>
                      </div>
                      <div style={{ fontSize: "13px", color: "#1e3a8a", marginBottom: "14px" }}>
                        Hall tickets will be accessible for download on <strong>December 7, 2026</strong>.
                      </div>
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <button
                          type="button"
                          onClick={() => {
                            setGeneratedRegNo(DUMMY_EXISTING_RECORD.regNo);
                            setFormData((prev) => ({
                              ...prev,
                              fullName: DUMMY_EXISTING_RECORD.studentName,
                              relativeName: DUMMY_EXISTING_RECORD.relativeName,
                              gender: DUMMY_EXISTING_RECORD.gender as "MALE",
                              studentClass: DUMMY_EXISTING_RECORD.studentClass as "Class 10",
                              schoolName: DUMMY_EXISTING_RECORD.school,
                            }));
                            setCompletedTimestamp(DUMMY_EXISTING_RECORD.registeredAt);
                            setIsCompleted(true);
                          }}
                          className="vad-btn-step vad-btn-step--primary"
                          style={{ padding: "8px 18px", fontSize: "13px" }}
                        >
                          View Existing Receipt
                        </button>
                        <button
                          type="button"
                          onClick={handleResetForm}
                          className="vad-btn-step vad-btn-step--secondary"
                          style={{ padding: "8px 18px", fontSize: "13px" }}
                        >
                          Register Different Student
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Aadhaar Field */}
                  <div className="vad-field-group">
                    <label htmlFor="aadhaar" className="vad-field-group__label">
                      <span>
                        Student 12-Digit Aadhaar Number <span className="req">*</span>
                      </span>
                      <span className="vad-field-group__hint">
                        {formData.aadhaar.replace(/\s/g, "").length} / 12 digits
                      </span>
                    </label>
                    <input
                      type="text"
                      id="aadhaar"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="1234 5678 9012"
                      value={formData.aadhaar}
                      onChange={(e) => handleAadhaarChange(e.target.value)}
                      className={`vad-field-group__input ${errors.aadhaar ? "has-error" : ""}`}
                      style={{ letterSpacing: "0.1em", fontSize: "17px", fontWeight: 600 }}
                    />
                    {errors.aadhaar && <span className="vad-field-group__error">{errors.aadhaar}</span>}
                    <span style={{ fontSize: "12px", color: "#64748b" }}>
                      Tip: Enter any 12 digits, or click &ldquo;Pre-Fill Sample Student&rdquo; above.
                    </span>
                  </div>

                  {/* WhatsApp Field */}
                  <div className="vad-field-group">
                    <label htmlFor="whatsapp" className="vad-field-group__label">
                      <span>
                        WhatsApp Mobile Number <span className="req">*</span>
                      </span>
                      <span className="vad-field-group__hint">Used for Hall Ticket & Exam Alerts</span>
                    </label>
                    <div className="vad-field-group__input-wrap">
                      <span className="vad-field-group__prefix">🇮🇳 +91</span>
                      <input
                        type="tel"
                        id="whatsapp"
                        inputMode="numeric"
                        placeholder="98765 43210"
                        value={formData.whatsapp}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        className={`vad-field-group__input has-prefix ${errors.whatsapp ? "has-error" : ""}`}
                        style={{ fontSize: "16px", fontWeight: 600 }}
                      />
                    </div>
                    {errors.whatsapp && <span className="vad-field-group__error">{errors.whatsapp}</span>}
                    <span style={{ fontSize: "12px", color: "#64748b" }}>
                      School headmaster or teacher contact numbers can be used for batch student registrations.
                    </span>
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────
                  STEP 1: PERSONAL DETAILS (BLOCK 1)
                  ─────────────────────────────────────────────── */}
              {currentStep === 1 && (
                <div>
                  {/* Verified Step 0 summary pill */}
                  <div
                    style={{
                      background: "#f1f5f9",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      marginBottom: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "12.5px",
                    }}
                  >
                    <span>
                      🔒 <strong>Aadhaar:</strong> XXXX XXXX {formData.aadhaar.slice(-4) || "5678"} •{" "}
                      <strong>WhatsApp:</strong> +91 {formData.whatsapp}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(0)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--vad-navy-700)",
                        fontWeight: 700,
                        cursor: "pointer",
                        textDecoration: "underline",
                        padding: 0,
                      }}
                    >
                      Edit
                    </button>
                  </div>

                  {/* Student Full Name */}
                  <div className="vad-field-group">
                    <label htmlFor="fullName" className="vad-field-group__label">
                      <span>
                        Student Full Name <span className="req">*</span>
                      </span>
                      <span className="vad-field-group__hint">As per School Attendance Register</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      placeholder="e.g. K. Harika"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, fullName: e.target.value }));
                        if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
                      }}
                      className={`vad-field-group__input ${errors.fullName ? "has-error" : ""}`}
                    />
                    {errors.fullName && <span className="vad-field-group__error">{errors.fullName}</span>}
                  </div>

                  {/* Father / Relative Name */}
                  <div className="vad-field-group">
                    <label htmlFor="relativeName" className="vad-field-group__label">
                      <span>
                        Father / Mother / Guardian Name <span className="req">*</span>
                      </span>
                      <span className="vad-field-group__hint">For Identity Verification</span>
                    </label>
                    <input
                      type="text"
                      id="relativeName"
                      placeholder="e.g. K. Venkatesulu"
                      value={formData.relativeName}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, relativeName: e.target.value }));
                        if (errors.relativeName) setErrors((prev) => ({ ...prev, relativeName: "" }));
                      }}
                      className={`vad-field-group__input ${errors.relativeName ? "has-error" : ""}`}
                    />
                    {errors.relativeName && <span className="vad-field-group__error">{errors.relativeName}</span>}
                  </div>

                  {/* Gender Selector (Critical for Exam Center Allocation) */}
                  <div className="vad-field-group">
                    <label className="vad-field-group__label">
                      <span>
                        Gender <span className="req">*</span>
                      </span>
                      <span className="vad-field-group__hint">Required for Exam Center Gender Segregation</span>
                    </label>
                    <div className="vad-choice-grid">
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, gender: "MALE" }));
                          if (errors.gender) setErrors((prev) => ({ ...prev, gender: "" }));
                        }}
                        onKeyDown={(e) => e.key === "Enter" && setFormData((prev) => ({ ...prev, gender: "MALE" }))}
                        className={`vad-choice-card ${formData.gender === "MALE" ? "is-selected" : ""}`}
                      >
                        <div className="vad-choice-card__top">
                          <span style={{ fontSize: "20px" }}>👦</span>
                          <div className="vad-choice-card__indicator" />
                        </div>
                        <h4 className="vad-choice-card__title">Male (Boy)</h4>
                        <p className="vad-choice-card__desc">Assigned to Boys High School Exam Centers</p>
                      </div>

                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, gender: "FEMALE" }));
                          if (errors.gender) setErrors((prev) => ({ ...prev, gender: "" }));
                        }}
                        onKeyDown={(e) => e.key === "Enter" && setFormData((prev) => ({ ...prev, gender: "FEMALE" }))}
                        className={`vad-choice-card ${formData.gender === "FEMALE" ? "is-selected" : ""}`}
                      >
                        <div className="vad-choice-card__top">
                          <span style={{ fontSize: "20px" }}>👧</span>
                          <div className="vad-choice-card__indicator" />
                        </div>
                        <h4 className="vad-choice-card__title">Female (Girl)</h4>
                        <p className="vad-choice-card__desc">Assigned to Girls High School Exam Centers</p>
                      </div>
                    </div>
                    {errors.gender && <span className="vad-field-group__error">{errors.gender}</span>}
                  </div>

                  {/* Class / Standard */}
                  <div className="vad-field-group">
                    <label className="vad-field-group__label">
                      <span>
                        Academic Class / Standard <span className="req">*</span>
                      </span>
                      <span className="vad-field-group__hint">Eligible Classes Only</span>
                    </label>
                    <div className="vad-choice-grid">
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, studentClass: "Class 9" }));
                          if (errors.studentClass) setErrors((prev) => ({ ...prev, studentClass: "" }));
                        }}
                        onKeyDown={(e) => e.key === "Enter" && setFormData((prev) => ({ ...prev, studentClass: "Class 9" }))}
                        className={`vad-choice-card ${formData.studentClass === "Class 9" ? "is-selected" : ""}`}
                      >
                        <div className="vad-choice-card__top">
                          <span style={{ fontSize: "20px" }}>📘</span>
                          <div className="vad-choice-card__indicator" />
                        </div>
                        <h4 className="vad-choice-card__title">Class 9</h4>
                        <p className="vad-choice-card__desc">Ninth Standard Students</p>
                      </div>

                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, studentClass: "Class 10" }));
                          if (errors.studentClass) setErrors((prev) => ({ ...prev, studentClass: "" }));
                        }}
                        onKeyDown={(e) => e.key === "Enter" && setFormData((prev) => ({ ...prev, studentClass: "Class 10" }))}
                        className={`vad-choice-card ${formData.studentClass === "Class 10" ? "is-selected" : ""}`}
                      >
                        <div className="vad-choice-card__top">
                          <span style={{ fontSize: "20px" }}>🎓</span>
                          <div className="vad-choice-card__indicator" />
                        </div>
                        <h4 className="vad-choice-card__title">Class 10 (SSC)</h4>
                        <p className="vad-choice-card__desc">Tenth Standard Students</p>
                      </div>
                    </div>
                    {errors.studentClass && <span className="vad-field-group__error">{errors.studentClass}</span>}
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────
                  STEP 2: SCHOOL & LOCATION DETAILS (BLOCK 2)
                  ─────────────────────────────────────────────── */}
              {currentStep === 2 && (
                <div>
                  {/* District Selection */}
                  <div className="vad-field-group">
                    <label className="vad-field-group__label">
                      <span>
                        Target District <span className="req">*</span>
                      </span>
                      <span className="vad-field-group__hint">4,000 quota per district</span>
                    </label>
                    <div className="vad-choice-grid">
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => handleDistrictChange("ATP")}
                        onKeyDown={(e) => e.key === "Enter" && handleDistrictChange("ATP")}
                        className={`vad-choice-card ${formData.district === "ATP" ? "is-selected" : ""}`}
                      >
                        <div className="vad-choice-card__top">
                          <span style={{ fontSize: "20px" }}>🏛️</span>
                          <div className="vad-choice-card__indicator" />
                        </div>
                        <h4 className="vad-choice-card__title">Anantapur District</h4>
                        <p className="vad-choice-card__desc">Code: ATP • 3,142 Registered</p>
                      </div>

                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => handleDistrictChange("SSS")}
                        onKeyDown={(e) => e.key === "Enter" && handleDistrictChange("SSS")}
                        className={`vad-choice-card ${formData.district === "SSS" ? "is-selected" : ""}`}
                      >
                        <div className="vad-choice-card__top">
                          <span style={{ fontSize: "20px" }}>🏛️</span>
                          <div className="vad-choice-card__indicator" />
                        </div>
                        <h4 className="vad-choice-card__title">Sri Sathya Sai District</h4>
                        <p className="vad-choice-card__desc">Code: SSS • 2,890 Registered</p>
                      </div>
                    </div>
                  </div>

                  {/* Mandal Cascading Dropdown */}
                  <div className="vad-field-group">
                    <label htmlFor="mandal" className="vad-field-group__label">
                      <span>
                        Mandal <span className="req">*</span>
                      </span>
                      <span className="vad-field-group__hint">Filtered by {activeDistrictInfo.name}</span>
                    </label>
                    <select
                      id="mandal"
                      value={formData.mandal}
                      onChange={(e) => handleMandalChange(e.target.value)}
                      className="vad-field-group__select"
                    >
                      {activeDistrictInfo.mandals.map((m) => (
                        <option key={m} value={m}>
                          {m} Mandal
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Village / Habitation */}
                  <div className="vad-field-group">
                    <label htmlFor="village" className="vad-field-group__label">
                      <span>
                        Village / Town / Habitation <span className="req">*</span>
                      </span>
                      <span className="vad-field-group__hint">For Local Center Clustering</span>
                    </label>
                    <input
                      type="text"
                      id="village"
                      placeholder="e.g. Gooty, Pamidi, Bukkapatnam"
                      value={formData.village}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, village: e.target.value }));
                        if (errors.village) setErrors((prev) => ({ ...prev, village: "" }));
                      }}
                      className={`vad-field-group__input ${errors.village ? "has-error" : ""}`}
                    />
                    {errors.village && <span className="vad-field-group__error">{errors.village}</span>}
                  </div>

                  {/* School Selection */}
                  <div className="vad-field-group">
                    <label htmlFor="schoolName" className="vad-field-group__label">
                      <span>
                        School Institution Name <span className="req">*</span>
                      </span>
                      <span className="vad-field-group__hint">ZPHS / Govt High School / Model School</span>
                    </label>
                    <select
                      id="schoolName"
                      value={formData.schoolName}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, schoolName: e.target.value }));
                        if (errors.schoolName) setErrors((prev) => ({ ...prev, schoolName: "" }));
                      }}
                      className={`vad-field-group__select ${errors.schoolName ? "has-error" : ""}`}
                    >
                      <option value="">-- Select School in {formData.mandal} --</option>
                      {schoolsList.map((sch) => (
                        <option key={sch} value={sch}>
                          {sch}
                        </option>
                      ))}
                      <option value="OTHER">✍️ Other / Enter School Name Manually</option>
                    </select>
                    {errors.schoolName && <span className="vad-field-group__error">{errors.schoolName}</span>}
                  </div>

                  {/* Custom School Name if "OTHER" chosen */}
                  {formData.schoolName === "OTHER" && (
                    <div className="vad-field-group">
                      <label htmlFor="customSchoolName" className="vad-field-group__label">
                        <span>
                          Enter School Name Manually <span className="req">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        id="customSchoolName"
                        placeholder="e.g. ZP High School, Mittapalli"
                        value={formData.customSchoolName}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, customSchoolName: e.target.value }));
                          if (errors.customSchoolName) setErrors((prev) => ({ ...prev, customSchoolName: "" }));
                        }}
                        className={`vad-field-group__input ${errors.customSchoolName ? "has-error" : ""}`}
                      />
                      {errors.customSchoolName && (
                        <span className="vad-field-group__error">{errors.customSchoolName}</span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ───────────────────────────────────────────────
                  STEP 3: ASPIRATIONS & VOCATIONAL SKILLS (BLOCK 3)
                  ─────────────────────────────────────────────── */}
              {currentStep === 3 && (
                <div>
                  {/* Future Higher Education Stream */}
                  <div className="vad-field-group">
                    <label className="vad-field-group__label">
                      <span>
                        Future Stream of Study (After Class 10) <span className="req">*</span>
                      </span>
                      <span className="vad-field-group__hint">Intermediate / Polytechnic Preference</span>
                    </label>
                    <div className="vad-choice-grid vad-choice-grid--wide">
                      {STREAM_OPTIONS.map((opt) => (
                        <div
                          key={opt.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, stream: opt.id }));
                            if (errors.stream) setErrors((prev) => ({ ...prev, stream: "" }));
                          }}
                          onKeyDown={(e) => e.key === "Enter" && setFormData((prev) => ({ ...prev, stream: opt.id }))}
                          className={`vad-choice-card ${formData.stream === opt.id ? "is-selected" : ""}`}
                        >
                          <div className="vad-choice-card__top">
                            <h4 className="vad-choice-card__title">{opt.name}</h4>
                            <div className="vad-choice-card__indicator" />
                          </div>
                          <p className="vad-choice-card__desc">{opt.desc}</p>
                        </div>
                      ))}
                    </div>
                    {errors.stream && <span className="vad-field-group__error">{errors.stream}</span>}
                  </div>

                  {/* Vocational Skills Interest */}
                  <div className="vad-field-group" style={{ marginTop: "24px" }}>
                    <label className="vad-field-group__label">
                      <span>
                        Vocational & Skill Development Interest <span className="req">*</span>
                      </span>
                      <span className="vad-field-group__hint">Aligned with PMKVY / APSSDC State Programs</span>
                    </label>
                    <div className="vad-choice-grid vad-choice-grid--wide">
                      {VOCATIONAL_OPTIONS.map((voc) => (
                        <div
                          key={voc.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, vocationalInterest: voc.id }));
                            if (errors.vocationalInterest) setErrors((prev) => ({ ...prev, vocationalInterest: "" }));
                          }}
                          onKeyDown={(e) => e.key === "Enter" && setFormData((prev) => ({ ...prev, vocationalInterest: voc.id }))}
                          className={`vad-choice-card ${formData.vocationalInterest === voc.id ? "is-selected" : ""}`}
                        >
                          <div className="vad-choice-card__top">
                            <h4 className="vad-choice-card__title">{voc.name}</h4>
                            <div className="vad-choice-card__indicator" />
                          </div>
                          <p className="vad-choice-card__desc">{voc.desc}</p>
                        </div>
                      ))}
                    </div>
                    {errors.vocationalInterest && (
                      <span className="vad-field-group__error">{errors.vocationalInterest}</span>
                    )}
                  </div>

                  {/* Honor Declaration Checkbox */}
                  <div
                    style={{
                      marginTop: "28px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      padding: "16px",
                    }}
                  >
                    <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={formData.declaration}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, declaration: e.target.checked }));
                          if (errors.declaration) setErrors((prev) => ({ ...prev, declaration: "" }));
                        }}
                        style={{ width: "18px", height: "18px", marginTop: "2px" }}
                      />
                      <span style={{ fontSize: "13.5px", color: "var(--vad-ink)", lineHeight: 1.5 }}>
                        I confirm that the details entered above are accurate according to school records, and that
                        the student is actively studying in Class 9 or Class 10 in a recognized school.
                      </span>
                    </label>
                    {errors.declaration && (
                      <div className="vad-field-group__error" style={{ marginTop: "6px" }}>
                        {errors.declaration}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────
                  STEP BUTTONS & ACTIONS
                  ─────────────────────────────────────────────── */}
              <div className="vad-form-actions">
                {currentStep > 0 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="vad-btn-step vad-btn-step--secondary"
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="vad-btn-step vad-btn-step--primary"
                >
                  {currentStep === 0 && "Continue to Student Info →"}
                  {currentStep === 1 && "Next: School & Location →"}
                  {currentStep === 2 && "Next: Aspirations & Skills →"}
                  {currentStep === 3 && "Submit Registration 🚀"}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
