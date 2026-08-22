"use client";

import React, { useState } from "react";
import Image from "next/image";

interface PublisherLogoProps {
  publisher?: string;
  link?: string;
  className?: string;
}

export default function PublisherLogo({ publisher, link, className }: PublisherLogoProps) {
  const [hasError, setHasError] = useState(false);

  if (!publisher && !link) return null;

  let domain = "";
  if (link) {
    try {
      domain = new URL(link).hostname.replace(/^www\./, "");
    } catch {
      domain = "";
    }
  }

  const faviconUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : "";

  return (
    <div className={className} style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
      {faviconUrl && !hasError ? (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            background: "rgba(30, 48, 128, 0.06)",
            border: "1px solid rgba(30, 48, 128, 0.12)",
            padding: "4px 10px",
            borderRadius: "20px",
          }}
        >
          <Image
            src={faviconUrl}
            alt={publisher || domain || "Publisher logo"}
            width={16}
            height={16}
            unoptimized
            style={{ objectFit: "contain", borderRadius: "3px" }}
            onError={() => setHasError(true)}
          />
          {publisher && (
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--vad-navy-800)",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
              }}
            >
              {publisher}
            </span>
          )}
        </span>
      ) : (
        publisher && (
          <span
            style={{
              background: "rgba(30, 48, 128, 0.08)",
              color: "var(--vad-navy-800)",
              padding: "3px 10px",
              borderRadius: "20px",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.03em",
            }}
          >
            {publisher}
          </span>
        )
      )}
    </div>
  );
}
