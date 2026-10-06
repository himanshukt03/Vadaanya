import crypto from "crypto";

export interface AdminSession {
  userId: string;
  email: string;
  role: string;
  iat: number; // Issued at (Unix timestamp in seconds)
  exp: number; // Expiration (Unix timestamp in seconds)
}

export const ADMIN_COOKIE_NAME = "vadaanya_admin_session";
export const ADMIN_SESSION_DURATION_SECONDS = 8 * 60 * 60; // 8 Hours

function getSessionSecret(): Buffer {
  const secret =
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ENCRYPTION_MASTER_KEY ||
    process.env.ADMIN_ACCESS_KEY;

  if (!secret) {
    throw new Error("Critical Security Error: No admin session signing secret configured.");
  }

  // Ensure minimum 32-byte cryptographic entropy
  return crypto.createHash("sha256").update(secret).digest();
}

/**
 * Generates a tamper-proof cryptographically signed admin session token.
 * Output format: base64url(payload) . base64url(hmac-sha256-signature)
 */
export function signAdminSessionToken(data: {
  userId: string;
  email: string;
  role: string;
}): string {
  const now = Math.floor(Date.now() / 1000);
  const session: AdminSession = {
    userId: data.userId,
    email: data.email.toLowerCase().trim(),
    role: data.role,
    iat: now,
    exp: now + ADMIN_SESSION_DURATION_SECONDS,
  };

  const payloadString = Buffer.from(JSON.stringify(session)).toString("base64url");
  const secretKey = getSessionSecret();
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(payloadString)
    .digest("base64url");

  return `${payloadString}.${signature}`;
}

/**
 * Validates the session token using constant-time signature verification and checks expiration.
 * Returns decoded session if valid, or null if tampered/expired.
 */
export function verifyAdminSessionToken(token: string | undefined | null): AdminSession | null {
  if (!token || typeof token !== "string") {
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return null;
  }

  const [payloadString, providedSig] = parts;
  if (!payloadString || !providedSig) {
    return null;
  }

  try {
    const secretKey = getSessionSecret();
    const expectedSig = crypto
      .createHmac("sha256", secretKey)
      .update(payloadString)
      .digest("base64url");

    const providedSigBuffer = Buffer.from(providedSig, "utf8");
    const expectedSigBuffer = Buffer.from(expectedSig, "utf8");

    // Timing-attack safe comparison
    if (
      providedSigBuffer.length !== expectedSigBuffer.length ||
      !crypto.timingSafeEqual(providedSigBuffer, expectedSigBuffer)
    ) {
      return null;
    }

    const jsonString = Buffer.from(payloadString, "base64url").toString("utf8");
    const session: AdminSession = JSON.parse(jsonString);

    const now = Math.floor(Date.now() / 1000);
    if (!session.exp || session.exp <= now) {
      return null; // Session expired
    }

    return session;
  } catch {
    return null;
  }
}

/**
 * Standard security options for the HTTP-only admin session cookie.
 */
export function getAdminCookieOptions() {
  return {
    name: ADMIN_COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: ADMIN_SESSION_DURATION_SECONDS,
  };
}
