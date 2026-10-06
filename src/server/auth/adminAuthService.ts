import { cookies } from "next/headers";
import { supabaseAdmin } from "@/server/db/supabaseAdmin";
import {
  AdminSession,
  ADMIN_COOKIE_NAME,
  verifyAdminSessionToken,
} from "./adminSession";

export interface AuthResult {
  success: boolean;
  user?: {
    id: string;
    email: string;
    role: string;
  };
  errorCode?: string;
  lockExpiresAt?: string | null;
  attemptsRemaining?: number | null;
}

/**
 * Authenticates admin credentials securely against Supabase PostgreSQL.
 * Passwords are never compared in plaintext in application memory or code.
 * Verification uses Postgres `pgcrypto` crypt() blowfish salted hashing with
 * atomic brute-force lockout and audit logging.
 */
export async function authenticateAdminCredentials(
  email: string,
  password: string,
  ip: string = "unknown"
): Promise<AuthResult> {
  const normalizedEmail = (email || "").trim().toLowerCase();

  if (!normalizedEmail || !password) {
    return {
      success: false,
      errorCode: "EMPTY_CREDENTIALS",
    };
  }

  try {
    const { data, error } = await supabaseAdmin.rpc("authenticate_admin", {
      p_email: normalizedEmail,
      p_password: password,
      p_ip: ip,
    });

    if (error) {
      console.error("[AdminAuth] RPC execution error:", error);
      return {
        success: false,
        errorCode: "SERVER_AUTH_ERROR",
      };
    }

    // RPC returns an array of result rows
    const resultRow = Array.isArray(data) ? data[0] : data;

    if (!resultRow) {
      return {
        success: false,
        errorCode: "SERVER_AUTH_ERROR",
      };
    }

    if (resultRow.success) {
      return {
        success: true,
        user: {
          id: resultRow.user_id,
          email: resultRow.email,
          role: resultRow.role,
        },
        attemptsRemaining: resultRow.attempts_remaining,
      };
    } else {
      return {
        success: false,
        errorCode: resultRow.error_code || "INVALID_CREDENTIALS",
        lockExpiresAt: resultRow.lock_expires_at,
        attemptsRemaining: resultRow.attempts_remaining,
      };
    }
  } catch (err) {
    console.error("[AdminAuth] Authentication failed with unexpected exception:", err);
    return {
      success: false,
      errorCode: "SERVER_AUTH_ERROR",
    };
  }
}

/**
 * Reads and verifies the admin session from incoming HTTP-only cookies in Server Components.
 * Returns null if not authenticated or expired.
 */
export async function getServerAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME);

    if (!sessionCookie?.value) {
      return null;
    }

    return verifyAdminSessionToken(sessionCookie.value);
  } catch (err) {
    console.error("[AdminAuth] Error reading server admin session:", err);
    return null;
  }
}

/**
 * Records an event into the immutable database admin audit log.
 */
export async function logAdminAudit(
  actor: string,
  action: string,
  details: Record<string, unknown> = {},
  ipAddress: string = "unknown"
) {
  try {
    await supabaseAdmin.from("admin_audit_logs").insert({
      actor: actor.toLowerCase().trim(),
      action,
      details,
      ip_address: ipAddress,
    });
  } catch (err) {
    console.error("[AdminAuth] Failed to write audit log:", err);
  }
}
