"use client";

import React, { useState } from "react";
import Link from "next/link";

interface AdminLoginFormProps {
  onSuccess?: () => void;
}

export default function AdminLoginForm({ onSuccess }: AdminLoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setErrorMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage("Please enter your administrator email address.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (onSuccess) {
          onSuccess();
        } else {
          // Hard refresh to reload the server component with the verified session cookie
          window.location.reload();
        }
      } else {
        if (data.errorCode === "ACCOUNT_LOCKED" || res.status === 423) {
          setIsLocked(true);
          setErrorMessage(
            data.error ||
              "Security Lockout: Too many failed attempts. This account is locked for 15 minutes."
          );
        } else {
          setErrorMessage(data.error || "Authentication failed. Invalid email or password.");
          if (typeof data.attemptsRemaining === "number") {
            setAttemptsRemaining(data.attemptsRemaining);
          }
        }
      }
    } catch {
      setErrorMessage("Network error: Unable to reach the authentication service. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-screen">
      <div className="admin-login-container">
        {/* Simple, Classic Website Form Card */}
        <div className="admin-login-card">
          <div className="admin-login-card__header">
            <div className="brand-badge">
              <span className="brand-letter">V</span>
            </div>
            <h1 className="login-title">Vadaanya Foundation</h1>
            <p className="login-subtitle">Talent Test 2026 • Administrative Dashboard</p>
          </div>

          {/* Error / Lockout Alert */}
          {errorMessage && (
            <div className={`login-alert ${isLocked ? "alert-locked" : "alert-danger"}`} role="alert">
              <div className="alert-icon">
                {isLocked ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                )}
              </div>
              <div className="alert-text">
                <strong>{isLocked ? "Account Locked" : "Authentication Denied"}</strong>
                <p>{errorMessage}</p>
                {attemptsRemaining !== null && !isLocked && attemptsRemaining <= 3 && (
                  <span className="attempts-pill">
                    ⚠️ {attemptsRemaining} attempt{attemptsRemaining === 1 ? "" : "s"} left before 15-min lockout
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Form with Classic Website Input Elements */}
          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="form-group">
              <label htmlFor="admin-email">Administrator Email</label>
              <div className="input-wrap">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  id="admin-email"
                  name="username"
                  type="email"
                  autoComplete="username"
                  placeholder="admin@vadaanya.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  autoFocus
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="admin-password">Password</label>
              <div className="input-wrap">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="admin-password"
                  name="current-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-submit-btn"
              disabled={isLoading || isLocked}
            >
              {isLoading ? (
                <>
                  <span className="submit-spinner" />
                  <span>Logging in...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>
        </div>

        {/* Back Link */}
        <div className="login-bottom-links">
          <Link href="/" className="back-link">
            ← Back to Vadaanya Public Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
