"use client";

import React, { useEffect } from "react";

interface TalentTestPdfViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl?: string;
  title?: string;
}

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export default function TalentTestPdfViewer({
  isOpen,
  onClose,
  pdfUrl = "/talent-test/Vadaanya-Q.Papers(2021-25)_Booklet.pdf",
  title = "Vadaanya Talent Test 5-Year Question Papers & Solutions Booklet (2021–2025)",
}: TalentTestPdfViewerProps) {
  useEffect(() => {
    if (!isOpen) return;
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

  return (
    <div
      className="vad-pdf-modal"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="vad-pdf-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="vad-pdf-modal__header">
          <div className="vad-pdf-modal__title-box">
            <span className="vad-pdf-modal__badge">OFFICIAL BOOKLET</span>
            <h2 className="vad-pdf-modal__title">{title}</h2>
          </div>

          <div className="vad-pdf-modal__actions">
            <a
              href={pdfUrl}
              download="Vadaanya-TalentTest-5Year-Booklet(2021-2025).pdf"
              className="vad-btn vad-btn--gold vad-pdf-modal__download-btn"
            >
              <DownloadIcon />
              <span>Download PDF</span>
            </a>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="vad-btn vad-btn--outline-light vad-pdf-modal__tab-btn"
              title="Open in new tab"
            >
              <ExternalLinkIcon />
              <span className="vad-hide-mobile">Open in Tab</span>
            </a>

            <button
              onClick={onClose}
              className="vad-pdf-modal__close-btn"
              aria-label="Close PDF Viewer"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="vad-pdf-modal__body">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
            title={title}
            className="vad-pdf-modal__iframe"
          />
        </div>
      </div>
    </div>
  );
}
