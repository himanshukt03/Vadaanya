"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
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
  // Step 1: Identity
  aadhaar: string;
  whatsapp: string;
  // Step 2: Student Personal
  fullName: string;
  relativeName: string;
  gender: "MALE" | "FEMALE" | "";
  studentClass: "Class 9" | "Class 10" | "";
  // Step 3: School & Aspirations
  district: "ATP" | "SSS";
  mandal: string;
  village: string;
  schoolName: string;
  customSchoolName: string;
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
  mandal: "",
  village: "",
  schoolName: "",
  customSchoolName: "",
  stream: "",
  vocationalInterest: "",
  declaration: false,
};

export default function TalentTestRegistration() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [generatedRegNo, setGeneratedRegNo] = useState<string>("");
  const [completedTimestamp, setCompletedTimestamp] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [showAlreadyRegistered, setShowAlreadyRegistered] = useState(false);
  const [autoSaveText, setAutoSaveText] = useState<string>("Draft auto-saved");

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

  // When district changes, reset mandal & school
  const handleDistrictChange = (distId: "ATP" | "SSS") => {
    setFormData((prev) => ({
      ...prev,
      district: distId,
      mandal: "",
      schoolName: "",
      customSchoolName: "",
    }));
  };

  const handleMandalChange = (mandal: string) => {
    setFormData((prev) => ({
      ...prev,
      mandal,
      schoolName: "",
      customSchoolName: "",
    }));
  };

  // Direct client-side PDF download using html2canvas & jsPDF
  const handleDownloadSlip = async () => {
    const el = document.getElementById("printable-receipt");
    if (!el) return;

    setIsDownloading(true);
    try {
      const html2canvasModule = await import("html2canvas");
      const html2canvas = html2canvasModule.default;
      const { jsPDF } = await import("jspdf");

      // Temporarily hide elements with .vad-no-print inside the receipt
      const noPrintEls = el.querySelectorAll<HTMLElement>(".vad-no-print");
      noPrintEls.forEach((node) => {
        node.style.display = "none";
      });

      const canvas = await html2canvas(el, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      // Restore hidden elements
      noPrintEls.forEach((node) => {
        node.style.display = "";
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = 210;
      const pdfHeight = 297;
      const margin = 14;
      const contentWidth = pdfWidth - margin * 2;
      const contentHeight = (canvas.height * contentWidth) / canvas.width;

      const posY = contentHeight < pdfHeight - 28 ? Math.max(12, (pdfHeight - contentHeight) / 2) : 12;

      pdf.addImage(imgData, "PNG", margin, posY, contentWidth, contentHeight);

      const safeRegNo = (generatedRegNo || "Registration").replace(/[^a-zA-Z0-9_-]/g, "_");
      pdf.save(`Vadaanya-Talent-Test-Slip-${safeRegNo}.pdf`);
    } catch (err) {
      console.error("Direct PDF download error, opening print dialog as fallback:", err);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const triggerAutoSave = () => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setAutoSaveText(`Draft saved at ${now}`);
  };

  // Validation per step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      const cleanAadhaar = formData.aadhaar.replace(/\s/g, "");
      if (!cleanAadhaar) {
        newErrors.aadhaar = "Please enter student's 12-digit Aadhaar number";
      } else if (cleanAadhaar.length !== 12) {
        newErrors.aadhaar = `Aadhaar must be 12 digits (entered ${cleanAadhaar.length})`;
      }

      if (!formData.whatsapp) {
        newErrors.whatsapp = "WhatsApp mobile number is required";
      } else if (formData.whatsapp.length !== 10) {
        newErrors.whatsapp = "Please enter a valid 10-digit mobile number";
      }
    } else if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Student Full Name is required";
      if (!formData.relativeName.trim()) newErrors.relativeName = "Father / Mother / Guardian Name is required";
      if (!formData.gender) newErrors.gender = "Please select gender";
      if (!formData.studentClass) newErrors.studentClass = "Please select class";
    } else if (step === 2) {
      if (!formData.district) newErrors.district = "District is required";
      if (!formData.mandal) newErrors.mandal = "Mandal is required";
      if (!formData.village.trim()) newErrors.village = "Village / Town name is required";
      if (!formData.schoolName) {
        newErrors.schoolName = "Please select or enter school name";
      } else if (formData.schoolName === "OTHER" && !formData.customSchoolName.trim()) {
        newErrors.customSchoolName = "Please enter your school name";
      }
      if (!formData.stream) newErrors.stream = "Please select future stream";
      if (!formData.vocationalInterest) newErrors.vocationalInterest = "Please select vocational interest";
      if (!formData.declaration) newErrors.declaration = "Please confirm the declaration";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Demo helpers (subtle, clean)
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

  const handleNext = () => {
    if (!validateStep(currentStep)) return;

    if (currentStep === 0) {
      const cleanAadhaar = formData.aadhaar.replace(/\s/g, "");
      if (cleanAadhaar === DUMMY_EXISTING_RECORD.aadhaar.replace(/\s/g, "")) {
        setShowAlreadyRegistered(true);
        return;
      }
      setShowAlreadyRegistered(false);
      setCurrentStep(1);
      triggerAutoSave();
      scrollToTop();
    } else if (currentStep === 1) {
      setCurrentStep(2);
      triggerAutoSave();
      scrollToTop();
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      scrollToTop();
    }
  };

  const handleSubmit = () => {
    if (!validateStep(2)) return;

    setIsSubmitting(true);

    setTimeout(() => {
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
    }, 900);
  };

  // Quick Add Next Student (keeps school, mandal, district)
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

  const activeDistrictInfo: DistrictInfo = DISTRICTS_DATA[formData.district];
  const schoolsList = getSchoolsForMandal(activeDistrictInfo.name, formData.mandal);
  const resolvedSchool =
    formData.schoolName === "OTHER"
      ? formData.customSchoolName || "Other School"
      : formData.schoolName || `ZPHS, ${formData.mandal}`;

  return (
    <div className="vad-reg-page">
      {/* ───────────────────────────────────────────────
          HERO BANNER (Clean, Executive, No Clutter)
          ─────────────────────────────────────────────── */}
      <header className="vad-reg-hero">
        <div className="vad-reg-container">
          <span className="vad-reg-hero__eyebrow">Vadaanya Janaa Society</span>
          <h1 className="vad-reg-hero__title">
            Talent Test <span>2026</span> Registration
          </h1>
          <p className="vad-reg-hero__lead">
            Online student application for rural government schools (Classes 9 & 10) across Anantapur and Sri Sathya Sai districts.
          </p>

          {/* Minimal Inline Capacity Tracker (No boxes, no gradient lines) */}
          <div className="vad-reg-hero__meta">
            <span className="vad-reg-hero__meta-item">
              <span className="vad-reg-hero__meta-dot" /> Anantapur Quota: <strong>3,142 / 4,000 Enrolled</strong>
            </span>
            <span className="vad-reg-hero__meta-divider">•</span>
            <span className="vad-reg-hero__meta-item">
              <span className="vad-reg-hero__meta-dot vad-reg-hero__meta-dot--gold" /> Sri Sathya Sai Quota: <strong>2,890 / 4,000 Enrolled</strong>
            </span>
          </div>
        </div>
      </header>

      <div className="vad-reg-container" id="reg-form-top" ref={formTopRef}>
        {/* ───────────────────────────────────────────────
            STEPPER PROGRESS (3 STEPS ONLY)
            ─────────────────────────────────────────────── */}
        {!isCompleted && (
          <nav className="vad-stepper" aria-label="Registration Progress">
            <ol className="vad-stepper__list">
              {/* Step 1 */}
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

              {/* Step 2 */}
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

              {/* Step 3 */}
              <li className="vad-stepper__step">
                <div className={`vad-stepper__circle ${currentStep === 2 ? "is-active" : ""}`}>
                  3
                </div>
                <div className="vad-stepper__info">
                  <span className="vad-stepper__step-num">Step 3</span>
                  <span className={`vad-stepper__step-label ${currentStep === 2 ? "is-active" : ""}`}>
                    School & Aspirations
                  </span>
                </div>
              </li>
            </ol>

            {/* Mobile Stepper */}
            <div className="vad-stepper__mobile">
              <div className="vad-stepper__mobile-meta">
                <span>
                  {currentStep === 0 && "Step 1 of 3: Verify Identity"}
                  {currentStep === 1 && "Step 2 of 3: Student Details"}
                  {currentStep === 2 && "Step 3 of 3: School & Aspirations"}
                </span>
                <span>{Math.round(((currentStep + 1) / 3) * 100)}%</span>
              </div>
              <div className="vad-stepper__mobile-bar">
                <div
                  className="vad-stepper__mobile-fill"
                  style={{ width: `${((currentStep + 1) / 3) * 100}%` }}
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
                background: "rgba(255, 255, 255, 0.92)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "14px",
                zIndex: 20,
                padding: "20px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: "3px solid #e2e8f0",
                  borderTopColor: "var(--vad-gold)",
                  animation: "vad-spin 0.8s linear infinite",
                  marginBottom: "14px",
                }}
              />
              <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--vad-navy-950)", margin: "0 0 4px" }}>
                Generating Registration Number...
              </h3>
              <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                Please wait a moment while we reserve the exam seat.
              </p>
            </div>
          )}

          {/* ───────────────────────────────────────────────
              VIEW: COMPLETED CONFIRMATION SCREEN
              ─────────────────────────────────────────────── */}
          {isCompleted ? (
            <div className="vad-success-view">
              {/* Official Acknowledgment Slip */}
              <article className="vad-receipt-card" id="printable-receipt">
                <div className="vad-receipt-card__top-bar" />
                <div className="vad-receipt-card__header">
                  <div className="vad-receipt-card__logo-wrap">
                    <Image
                      src="/logos/PPT-logo.png"
                      alt="Vadaanya Logo"
                      width={140}
                      height={38}
                      priority
                      unoptimized
                      style={{ height: "auto", width: "auto", maxHeight: "38px" }}
                    />
                    <div>
                      <div className="vad-receipt-card__brand-title">
                        VADAANYA JANAA SOCIETY
                      </div>
                      <div className="vad-receipt-card__subbrand">
                        TALENT TEST 2026 • OFFICIAL REGISTRATION SLIP
                      </div>
                      <div className="vad-receipt-card__subtag">
                        Rural Student Scholarship &amp; Educational Empowerment Initiative
                      </div>
                    </div>
                  </div>
                  <div className="vad-receipt-card__ref-badge">
                    Provisional Slip
                  </div>
                </div>

                <div className="vad-receipt-card__reg-banner">
                  <div>
                    <div className="vad-receipt-card__reg-label">Official Registration Number</div>
                    <div className="vad-receipt-card__reg-code">{generatedRegNo}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button
                      type="button"
                      onClick={copyRegNo}
                      className="vad-receipt-card__copy-btn vad-no-print"
                      title="Copy Registration Number"
                    >
                      {copied ? "✓ Copied" : "Copy Number"}
                    </button>
                    <div className="vad-receipt-card__reg-status-pill">
                      ● Registered
                    </div>
                  </div>
                </div>

                <div className="vad-receipt-card__body">
                  <table className="vad-receipt-card__table">
                    <tbody>
                      <tr>
                        <th>Student Full Name</th>
                        <td>{formData.fullName}</td>
                      </tr>
                      <tr>
                        <th>Father / Relative Name</th>
                        <td>{formData.relativeName}</td>
                      </tr>
                      <tr>
                        <th>Gender &amp; Class</th>
                        <td>
                          {formData.gender} • {formData.studentClass}
                        </td>
                      </tr>
                      <tr>
                        <th>District &amp; Mandal</th>
                        <td>
                          {activeDistrictInfo.name} • {formData.mandal}
                        </td>
                      </tr>
                      <tr>
                        <th>Village / Town</th>
                        <td>{formData.village || "—"}</td>
                      </tr>
                      <tr>
                        <th>School Name</th>
                        <td>{resolvedSchool}</td>
                      </tr>
                      <tr>
                        <th>Future Stream</th>
                        <td>{formData.stream || "General"}</td>
                      </tr>
                      <tr>
                        <th>Registered Mobile</th>
                        <td>+91 {formData.whatsapp}</td>
                      </tr>
                      <tr>
                        <th>Registration Date</th>
                        <td>{completedTimestamp}</td>
                      </tr>
                      <tr>
                        <th>Status</th>
                        <td style={{ color: "#16a34a", fontWeight: 800 }}>Registered</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="vad-receipt-card__note">
                  <div className="vad-receipt-card__note-title">Note:</div>
                  <ul className="vad-receipt-card__note-list">
                    <li>
                      This registration slip is for reference only and cannot be used as a hall ticket for entry into the examination hall.
                    </li>
                    <li>
                      Download your official Hall Ticket from <strong>vadaanya.org</strong> starting <strong>December 7, 2026</strong>, using your Registration Number or registered Aadhaar number.
                    </li>
                  </ul>
                </div>
              </article>

              {/* Actions */}
              <div className="vad-receipt-actions vad-no-print" style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={handleDownloadSlip}
                  disabled={isDownloading}
                  className="vad-btn-step vad-btn-step--primary"
                >
                  {isDownloading ? (
                    <>
                      <span className="vad-btn-spinner" /> Downloading PDF...
                    </>
                  ) : (
                    <>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download Slip
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleQuickAddNext}
                  className="vad-btn-step vad-btn-step--secondary"
                >
                  Register Another Student
                </button>
                <Link href="/talent-test" className="vad-btn-step vad-btn-step--secondary">
                  Back to Home
                </Link>
              </div>
            </div>
          ) : (
            /* ───────────────────────────────────────────────
               FORM STEPS (3 STEPS ONLY)
               ─────────────────────────────────────────────── */
            <div>
              {/* Header */}
              <div className="vad-form-card__header">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h2 className="vad-form-card__title">
                      {currentStep === 0 && "Step 1: Student Identity Verification"}
                      {currentStep === 1 && "Step 2: Student Details"}
                      {currentStep === 2 && "Step 3: School, Location & Aspirations"}
                    </h2>
                    <p className="vad-form-card__subtitle">
                      {currentStep === 0 && "Enter Aadhaar and WhatsApp contact number to proceed."}
                      {currentStep === 1 && "Provide student name, relative name, gender, and academic class."}
                      {currentStep === 2 && "Select institution, future study stream, and vocational interest."}
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
                  STEP 1: AADHAAR + WHATSAPP (2-COLUMN BALANCED)
                  ─────────────────────────────────────────────── */}
              {currentStep === 0 && (
                <div>
                  {/* Already Registered Alert Box */}
                  {showAlreadyRegistered && (
                    <div className="vad-already-registered">
                      <div className="vad-already-registered__title">
                        Already Registered
                      </div>
                      <p style={{ margin: "0 0 8px", fontSize: "13px", color: "#166534" }}>
                        This Aadhaar number is already registered for Vadaanya Talent Test 2026.
                      </p>
                      <div>
                        <strong style={{ fontSize: "12px", color: "#64748b" }}>Registration Number: </strong>
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
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
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
                          style={{ height: "34px", padding: "0 14px", fontSize: "12.5px" }}
                        >
                          View Existing Slip
                        </button>
                        <button
                          type="button"
                          onClick={handleResetForm}
                          className="vad-btn-step vad-btn-step--secondary"
                          style={{ height: "34px", padding: "0 14px", fontSize: "12.5px" }}
                        >
                          Register Another Student
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 2-Column Row for Aadhaar and Mobile */}
                  <div className="vad-form-row">
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
                        style={{ letterSpacing: "0.08em", fontWeight: 600 }}
                      />
                      {errors.aadhaar && <span className="vad-field-group__error">{errors.aadhaar}</span>}
                    </div>

                    {/* WhatsApp Mobile Field */}
                    <div className="vad-field-group">
                      <label htmlFor="whatsapp" className="vad-field-group__label">
                        <span>
                          WhatsApp Mobile Number <span className="req">*</span>
                        </span>
                      </label>
                      <div className="vad-field-group__input-wrap">
                        <span className="vad-field-group__prefix">+91</span>
                        <input
                          type="tel"
                          id="whatsapp"
                          inputMode="numeric"
                          placeholder="98765 43210"
                          value={formData.whatsapp}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          className={`vad-field-group__input has-prefix ${errors.whatsapp ? "has-error" : ""}`}
                          style={{ fontWeight: 600 }}
                        />
                      </div>
                      {errors.whatsapp && <span className="vad-field-group__error">{errors.whatsapp}</span>}
                      <span style={{ fontSize: "11.5px", color: "#64748b" }}>
                        Used for sending Registration Number & Hall Ticket link
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────
                  STEP 2: STUDENT DETAILS (BLOCK 1)
                  ─────────────────────────────────────────────── */}
              {currentStep === 1 && (
                <div>
                  {/* Verified Step 1 summary pill */}
                  <div
                    style={{
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      padding: "8px 14px",
                      marginBottom: "18px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "12px",
                      color: "#475569",
                    }}
                  >
                    <span>
                      <strong>Aadhaar:</strong> XXXX XXXX {formData.aadhaar.slice(-4) || "5678"} •{" "}
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
                      Change
                    </button>
                  </div>

                  {/* 2-Column Row for Student Name & Relative Name */}
                  <div className="vad-form-row">
                    <div className="vad-field-group">
                      <label htmlFor="fullName" className="vad-field-group__label">
                        <span>
                          Student Full Name <span className="req">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        placeholder="As per school register (e.g. K. Harika)"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, fullName: e.target.value }));
                          if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
                        }}
                        className={`vad-field-group__input ${errors.fullName ? "has-error" : ""}`}
                      />
                      {errors.fullName && <span className="vad-field-group__error">{errors.fullName}</span>}
                    </div>

                    <div className="vad-field-group">
                      <label htmlFor="relativeName" className="vad-field-group__label">
                        <span>
                          Father / Mother / Guardian Name <span className="req">*</span>
                        </span>
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
                  </div>

                  {/* 2-Column Row for Gender & Class with Clean Circular Radio Buttons */}
                  <div className="vad-form-row" style={{ marginTop: "4px" }}>
                    {/* Gender */}
                    <div className="vad-field-group">
                      <label className="vad-field-group__label">
                        <span>
                          Gender <span className="req">*</span>
                        </span>
                      </label>
                      <div className="vad-radio-group">
                        <label className={`vad-radio-label ${formData.gender === "MALE" ? "is-checked" : ""}`}>
                          <input
                            type="radio"
                            name="gender"
                            value="MALE"
                            checked={formData.gender === "MALE"}
                            onChange={() => {
                              setFormData((prev) => ({ ...prev, gender: "MALE" }));
                              if (errors.gender) setErrors((prev) => ({ ...prev, gender: "" }));
                            }}
                            className="vad-radio-hidden-input"
                          />
                          <span className={`vad-radio-circle ${formData.gender === "MALE" ? "is-checked" : ""}`} />
                          <span className="vad-radio-text">Male</span>
                        </label>

                        <label className={`vad-radio-label ${formData.gender === "FEMALE" ? "is-checked" : ""}`}>
                          <input
                            type="radio"
                            name="gender"
                            value="FEMALE"
                            checked={formData.gender === "FEMALE"}
                            onChange={() => {
                              setFormData((prev) => ({ ...prev, gender: "FEMALE" }));
                              if (errors.gender) setErrors((prev) => ({ ...prev, gender: "" }));
                            }}
                            className="vad-radio-hidden-input"
                          />
                          <span className={`vad-radio-circle ${formData.gender === "FEMALE" ? "is-checked" : ""}`} />
                          <span className="vad-radio-text">Female</span>
                        </label>
                      </div>
                      {errors.gender && <span className="vad-field-group__error">{errors.gender}</span>}
                    </div>

                    {/* Class */}
                    <div className="vad-field-group">
                      <label className="vad-field-group__label">
                        <span>
                          Academic Class <span className="req">*</span>
                        </span>
                      </label>
                      <div className="vad-radio-group">
                        <label className={`vad-radio-label ${formData.studentClass === "Class 9" ? "is-checked" : ""}`}>
                          <input
                            type="radio"
                            name="studentClass"
                            value="Class 9"
                            checked={formData.studentClass === "Class 9"}
                            onChange={() => {
                              setFormData((prev) => ({ ...prev, studentClass: "Class 9" }));
                              if (errors.studentClass) setErrors((prev) => ({ ...prev, studentClass: "" }));
                            }}
                            className="vad-radio-hidden-input"
                          />
                          <span className={`vad-radio-circle ${formData.studentClass === "Class 9" ? "is-checked" : ""}`} />
                          <span className="vad-radio-text">Class 9</span>
                        </label>

                        <label className={`vad-radio-label ${formData.studentClass === "Class 10" ? "is-checked" : ""}`}>
                          <input
                            type="radio"
                            name="studentClass"
                            value="Class 10"
                            checked={formData.studentClass === "Class 10"}
                            onChange={() => {
                              setFormData((prev) => ({ ...prev, studentClass: "Class 10" }));
                              if (errors.studentClass) setErrors((prev) => ({ ...prev, studentClass: "" }));
                            }}
                            className="vad-radio-hidden-input"
                          />
                          <span className={`vad-radio-circle ${formData.studentClass === "Class 10" ? "is-checked" : ""}`} />
                          <span className="vad-radio-text">Class 10 (SSC)</span>
                        </label>
                      </div>
                      {errors.studentClass && <span className="vad-field-group__error">{errors.studentClass}</span>}
                    </div>
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────
                  STEP 3: SCHOOL, LOCATION & ASPIRATIONS (COMBINED)
                  ─────────────────────────────────────────────── */}
              {currentStep === 2 && (
                <div>
                  {/* District Selection - Clean Radio */}
                  <div className="vad-field-group">
                    <label className="vad-field-group__label">
                      <span>
                        District <span className="req">*</span>
                      </span>
                    </label>
                    <div className="vad-radio-group">
                      <label className={`vad-radio-label ${formData.district === "ATP" ? "is-checked" : ""}`}>
                        <input
                          type="radio"
                          name="district"
                          value="ATP"
                          checked={formData.district === "ATP"}
                          onChange={() => handleDistrictChange("ATP")}
                          className="vad-radio-hidden-input"
                        />
                        <span className={`vad-radio-circle ${formData.district === "ATP" ? "is-checked" : ""}`} />
                        <span className="vad-radio-text">Anantapur District</span>
                      </label>

                      <label className={`vad-radio-label ${formData.district === "SSS" ? "is-checked" : ""}`}>
                        <input
                          type="radio"
                          name="district"
                          value="SSS"
                          checked={formData.district === "SSS"}
                          onChange={() => handleDistrictChange("SSS")}
                          className="vad-radio-hidden-input"
                        />
                        <span className={`vad-radio-circle ${formData.district === "SSS" ? "is-checked" : ""}`} />
                        <span className="vad-radio-text">Sri Sathya Sai District</span>
                      </label>
                    </div>
                  </div>

                  <div className="vad-form-row">
                    {/* Mandal Dropdown */}
                    <div className="vad-field-group">
                      <label htmlFor="mandal" className="vad-field-group__label">
                        <span>
                          Mandal <span className="req">*</span>
                        </span>
                      </label>
                      <select
                        id="mandal"
                        value={formData.mandal}
                        onChange={(e) => handleMandalChange(e.target.value)}
                        className={`vad-field-group__select ${!formData.mandal ? "is-placeholder" : ""} ${errors.mandal ? "has-error" : ""}`}
                      >
                        <option value="">-- Select Mandal in {activeDistrictInfo.name} --</option>
                        {activeDistrictInfo.mandals.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                      {errors.mandal && <span className="vad-field-group__error">{errors.mandal}</span>}
                    </div>

                    {/* Village / Town */}
                    <div className="vad-field-group">
                      <label htmlFor="village" className="vad-field-group__label">
                        <span>
                          Village / Town <span className="req">*</span>
                        </span>
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
                  </div>

                  {/* School Selection */}
                  <div className="vad-field-group">
                    <label htmlFor="schoolName" className="vad-field-group__label">
                      <span>
                        School Name <span className="req">*</span>
                      </span>
                    </label>
                    <select
                      id="schoolName"
                      value={formData.schoolName}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, schoolName: e.target.value }));
                        if (errors.schoolName) setErrors((prev) => ({ ...prev, schoolName: "" }));
                      }}
                      className={`vad-field-group__select ${!formData.schoolName ? "is-placeholder" : ""} ${errors.schoolName ? "has-error" : ""}`}
                    >
                      <option value="">{formData.mandal ? `-- Select School in ${formData.mandal} --` : "-- Select Mandal First --"}</option>
                      {schoolsList.map((sch) => (
                        <option key={sch} value={sch}>
                          {sch}
                        </option>
                      ))}
                      <option value="OTHER">Other / Enter School Name Manually</option>
                    </select>
                    {errors.schoolName && <span className="vad-field-group__error">{errors.schoolName}</span>}
                  </div>

                  {/* Custom School Name if "OTHER" */}
                  {formData.schoolName === "OTHER" && (
                    <div className="vad-field-group">
                      <label htmlFor="customSchoolName" className="vad-field-group__label">
                        <span>
                          Enter School Name <span className="req">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        id="customSchoolName"
                        placeholder="Enter full school name"
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

                  {/* Future Stream & Vocational Interest in a 2-Column Row */}
                  <div className="vad-form-row" style={{ marginTop: "6px" }}>
                    <div className="vad-field-group">
                      <label htmlFor="stream" className="vad-field-group__label">
                        <span>
                          Future Stream of Study (After Class 10) <span className="req">*</span>
                        </span>
                      </label>
                      <select
                        id="stream"
                        value={formData.stream}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, stream: e.target.value }));
                          if (errors.stream) setErrors((prev) => ({ ...prev, stream: "" }));
                        }}
                        className={`vad-field-group__select ${!formData.stream ? "is-placeholder" : ""} ${errors.stream ? "has-error" : ""}`}
                      >
                        <option value="">-- Select Stream of Study --</option>
                        {STREAM_OPTIONS.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.name}
                          </option>
                        ))}
                      </select>
                      {errors.stream && <span className="vad-field-group__error">{errors.stream}</span>}
                    </div>

                    <div className="vad-field-group">
                      <label htmlFor="vocationalInterest" className="vad-field-group__label">
                        <span>
                          Vocational Training Interest (Optional) <span className="req">*</span>
                        </span>
                      </label>
                      <select
                        id="vocationalInterest"
                        value={formData.vocationalInterest}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, vocationalInterest: e.target.value }));
                          if (errors.vocationalInterest) setErrors((prev) => ({ ...prev, vocationalInterest: "" }));
                        }}
                        className={`vad-field-group__select ${!formData.vocationalInterest ? "is-placeholder" : ""} ${errors.vocationalInterest ? "has-error" : ""}`}
                      >
                        <option value="">-- Select Vocational Interest (Optional) --</option>
                        {VOCATIONAL_OPTIONS.map((voc) => (
                          <option key={voc.id} value={voc.id}>
                            {voc.name}
                          </option>
                        ))}
                      </select>
                      {errors.vocationalInterest && (
                        <span className="vad-field-group__error">{errors.vocationalInterest}</span>
                      )}
                    </div>
                  </div>

                  {/* Honor Declaration Checkbox */}
                  <div style={{ marginTop: "14px", padding: "6px 0" }}>
                    <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={formData.declaration}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, declaration: e.target.checked }));
                          if (errors.declaration) setErrors((prev) => ({ ...prev, declaration: "" }));
                        }}
                        style={{ width: "16px", height: "16px", marginTop: "2px" }}
                      />
                      <span style={{ fontSize: "13px", color: "#334155", lineHeight: 1.5 }}>
                        I confirm that the details entered above are accurate according to school records.
                      </span>
                    </label>
                    {errors.declaration && (
                      <div className="vad-field-group__error" style={{ marginTop: "4px" }}>
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
                  {currentStep === 1 && "Next: School & Aspirations →"}
                  {currentStep === 2 && "Submit Registration"}
                </button>
              </div>

              {/* Discreet Demo Helper */}
              <div className="vad-reg-test-helper">
                <span>Demo testing: </span>
                <button type="button" onClick={handlePreFillDemo}>
                  Fill Sample
                </button>
                <span> • </span>
                <button type="button" onClick={handleTestDuplicate}>
                  Test Duplicate
                </button>
                <span> • </span>
                <button type="button" onClick={handleResetForm}>
                  Reset
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
