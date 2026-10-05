import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // 96 bits for GCM
const AUTH_TAG_LENGTH = 16; // 128 bits

function getMasterKey(): Buffer {
  const hexKey = process.env.ENCRYPTION_MASTER_KEY;
  if (!hexKey) {
    throw new Error("Missing ENCRYPTION_MASTER_KEY in environment variables");
  }
  return Buffer.from(hexKey, "hex");
}

function getPepperSecret(): string {
  const secret = process.env.AADHAAR_PEPPER_SECRET;
  if (!secret) {
    throw new Error("Missing AADHAAR_PEPPER_SECRET in environment variables");
  }
  return secret;
}

/**
 * Normalizes an Aadhaar string (removes all non-digit characters)
 */
export function normalizeAadhaar(raw: string): string {
  return (raw || "").replace(/\D/g, "");
}

/**
 * Generates an irreversible HMAC-SHA256 blind index hash for O(1) duplicate lookups.
 * The same Aadhaar always yields the exact same hash when using the same pepper.
 */
export function hashAadhaar(rawAadhaar: string): string {
  const cleaned = normalizeAadhaar(rawAadhaar);
  const pepper = getPepperSecret();
  return crypto.createHmac("sha256", pepper).update(cleaned).digest("hex");
}

/**
 * Encrypts the 12-digit Aadhaar using AES-256-GCM.
 * Output format: base64(iv + authTag + ciphertext)
 */
export function encryptAadhaar(rawAadhaar: string): string {
  const cleaned = normalizeAadhaar(rawAadhaar);
  const key = getMasterKey();
  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv, {
    authTagLength: AUTH_TAG_LENGTH,
  });

  const encrypted = Buffer.concat([cipher.update(cleaned, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  // Combine IV (12) + Tag (16) + Ciphertext
  const combined = Buffer.concat([iv, authTag, encrypted]);
  return combined.toString("base64");
}

/**
 * Decrypts an AES-256-GCM encrypted Aadhaar blob.
 */
export function decryptAadhaar(encryptedBlobBase64: string): string {
  const key = getMasterKey();
  const buffer = Buffer.from(encryptedBlobBase64, "base64");

  const iv = buffer.subarray(0, IV_LENGTH);
  const authTag = buffer.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
  const ciphertext = buffer.subarray(IV_LENGTH + AUTH_TAG_LENGTH);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv, {
    authTagLength: AUTH_TAG_LENGTH,
  });
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return decrypted.toString("utf8");
}

/**
 * Extracts last 4 digits of Aadhaar
 */
export function getAadhaarLast4(rawAadhaar: string): string {
  const cleaned = normalizeAadhaar(rawAadhaar);
  return cleaned.slice(-4);
}

/**
 * Masked Aadhaar display format (e.g. XXXX-XXXX-5678)
 */
export function getMaskedAadhaar(rawAadhaar: string): string {
  const last4 = getAadhaarLast4(rawAadhaar);
  return `XXXX-XXXX-${last4}`;
}
