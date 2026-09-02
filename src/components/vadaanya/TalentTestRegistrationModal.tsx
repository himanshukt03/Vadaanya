"use client";

import React, { useState, useEffect } from "react";

interface TalentTestRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckCircleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function TalentTestRegistrationModal({
  isOpen,
  onClose,
}: TalentTestRegistrationModalProps) {
  const [applicantType, setApplicantType] = useState<"student" | "teacher" | "parent">("student");
  const [formData, setFormData] = useState({
    name: "",
    schoolName: "",
    classGrade: "Class 8",
    mandal: "",
    district: "Sri Sathya Sai / Anantapur",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate instant registration confirmation
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div
      className="vad-reg-modal"
      role="dialog"
      aria-modal="true"
      aria-label="2026 Talent Test Pre-Registration"
      onClick={onClose}
    >
      <div
        className="vad-reg-modal__box"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="vad-reg-modal__close-btn"
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>

        {submitted ? (
          <div className="vad-reg-modal__success">
            <div className="vad-reg-modal__success-icon">
              <CheckCircleIcon />
            </div>
            <h3>Pre-Registration Received!</h3>
            <p>
              Thank you, <strong>{formData.name}</strong>. You have been registered for priority updates regarding the <strong>2026 Srinivasa Ramanujan Talent Test</strong>. We will notify your school and phone number (<strong>{formData.phone}</strong>) as soon as hall ticket downloads open.
            </p>
            <button onClick={onClose} className="vad-btn vad-btn--gold" style={{ marginTop: "16px", width: "100%" }}>
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="vad-reg-modal__header">
              <span className="vad-reg-modal__badge">2026 EXAM CYCLE</span>
              <h2 className="vad-reg-modal__title">Pre-Register for Talent Test 2026</h2>
              <p className="vad-reg-modal__sub">
                100% Free for government school students. Register your interest for exam centers, study materials, and hall tickets.
              </p>
            </div>

            {/* Applicant Type Selector */}
            <div className="vad-reg-modal__type-tabs">
              <button
                type="button"
                className={`vad-reg-modal__type-tab ${applicantType === "student" ? "is-active" : ""}`}
                onClick={() => setApplicantType("student")}
              >
                Student
              </button>
              <button
                type="button"
                className={`vad-reg-modal__type-tab ${applicantType === "teacher" ? "is-active" : ""}`}
                onClick={() => setApplicantType("teacher")}
              >
                Teacher / HM
              </button>
              <button
                type="button"
                className={`vad-reg-modal__type-tab ${applicantType === "parent" ? "is-active" : ""}`}
                onClick={() => setApplicantType("parent")}
              >
                Parent / Volunteer
              </button>
            </div>

            <form onSubmit={handleSubmit} className="vad-reg-modal__form">
              <div className="vad-reg-modal__field">
                <label>{applicantType === "teacher" ? "Headmaster / Teacher Name *" : "Student / Candidate Name *"}</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="vad-reg-modal__grid-2">
                <div className="vad-reg-modal__field">
                  <label>Government School Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ZPHS Kothacheruvu"
                    value={formData.schoolName}
                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  />
                </div>

                <div className="vad-reg-modal__field">
                  <label>Class / Grade *</label>
                  <select
                    value={formData.classGrade}
                    onChange={(e) => setFormData({ ...formData, classGrade: e.target.value })}
                  >
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="School Group (All Classes)">School Group (All Classes)</option>
                  </select>
                </div>
              </div>

              <div className="vad-reg-modal__grid-2">
                <div className="vad-reg-modal__field">
                  <label>Mandal *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dharmavaram"
                    value={formData.mandal}
                    onChange={(e) => setFormData({ ...formData, mandal: e.target.value })}
                  />
                </div>

                <div className="vad-reg-modal__field">
                  <label>District *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sri Sathya Sai"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  />
                </div>
              </div>

              <div className="vad-reg-modal__field">
                <label>WhatsApp / Mobile Number for SMS Updates *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  pattern="[0-9]{10}"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="vad-btn vad-btn--gold"
                style={{ width: "100%", marginTop: "8px", justifyContent: "center" }}
              >
                {submitting ? "Submitting..." : "Submit Pre-Registration →"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
