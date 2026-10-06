import { NextRequest, NextResponse } from "next/server";
import {
  authenticateAdminCredentials,
} from "@/server/auth/adminAuthService";
import {
  signAdminSessionToken,
  getAdminCookieOptions,
} from "@/server/auth/adminSession";

// In-memory sliding window rate limiter: max 6 attempts per 60 seconds per IP
interface RateLimitRecord {
  timestamps: number[];
}
const rateLimitMap = new Map<string, RateLimitRecord>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxAttempts = 6;

  const record = rateLimitMap.get(ip) || { timestamps: [] };
  // Filter timestamps within window
  const activeTimestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (activeTimestamps.length >= maxAttempts) {
    return true;
  }

  activeTimestamps.push(now);
  rateLimitMap.set(ip, { timestamps: activeTimestamps });

  // Cleanup old entries periodically if map grows large
  if (rateLimitMap.size > 1000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (val.timestamps.every((ts) => now - ts > windowMs)) {
        rateLimitMap.delete(key);
      }
    }
  }

  return false;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Resolve Client IP
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : req.headers.get("x-real-ip") || "127.0.0.1";

    // 2. IP Rate Limiting Check
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many login attempts. Please wait 1 minute before retrying.",
          errorCode: "RATE_LIMITED",
        },
        { status: 429 }
      );
    }

    // 3. Parse and Validate Body
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { email, password } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid administrative email." },
        { status: 400 }
      );
    }

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { success: false, error: "Password is required." },
        { status: 400 }
      );
    }

    // 4. Authenticate credentials via Supabase Database
    const authResult = await authenticateAdminCredentials(email, password, clientIp);

    if (!authResult.success) {
      if (authResult.errorCode === "ACCOUNT_LOCKED") {
        return NextResponse.json(
          {
            success: false,
            error:
              "Security Lockout: Account is temporarily locked due to 5 consecutive failed attempts. Please wait 15 minutes before trying again.",
            errorCode: "ACCOUNT_LOCKED",
            lockExpiresAt: authResult.lockExpiresAt,
          },
          { status: 423 }
        );
      }

      const remainingNotice =
        typeof authResult.attemptsRemaining === "number"
          ? ` (${authResult.attemptsRemaining} attempts left before 15-min lockout)`
          : "";

      return NextResponse.json(
        {
          success: false,
          error: `Invalid email or password.${remainingNotice}`,
          errorCode: "INVALID_CREDENTIALS",
          attemptsRemaining: authResult.attemptsRemaining,
        },
        { status: 401 }
      );
    }

    // 5. Successful Login -> Generate Cryptographically Signed Session Token
    const user = authResult.user!;
    const sessionToken = signAdminSessionToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // 6. Build response and set HttpOnly, Secure cookie
    const response = NextResponse.json({
      success: true,
      user: {
        email: user.email,
        role: user.role,
      },
    });

    const cookieOpts = getAdminCookieOptions();
    response.cookies.set({
      name: cookieOpts.name,
      value: sessionToken,
      httpOnly: cookieOpts.httpOnly,
      secure: cookieOpts.secure,
      sameSite: cookieOpts.sameSite,
      path: cookieOpts.path,
      maxAge: cookieOpts.maxAge,
    });

    return response;
  } catch (err) {
    console.error("[AdminLoginAPI] Server error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected internal error occurred during authentication.",
      },
      { status: 500 }
    );
  }
}
