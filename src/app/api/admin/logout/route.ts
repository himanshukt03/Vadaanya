import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  getAdminCookieOptions,
  verifyAdminSessionToken,
} from "@/server/auth/adminSession";
import { logAdminAudit } from "@/server/auth/adminAuthService";

export async function POST(req: NextRequest) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : req.headers.get("x-real-ip") || "127.0.0.1";

    const sessionCookie = req.cookies.get(ADMIN_COOKIE_NAME);
    if (sessionCookie?.value) {
      const session = verifyAdminSessionToken(sessionCookie.value);
      if (session) {
        await logAdminAudit(
          session.email,
          "ADMIN_LOGOUT",
          { role: session.role },
          clientIp
        );
      }
    }

    const response = NextResponse.json({ success: true, message: "Logged out successfully" });
    const cookieOpts = getAdminCookieOptions();

    // Expire cookie immediately
    response.cookies.set({
      name: cookieOpts.name,
      value: "",
      httpOnly: cookieOpts.httpOnly,
      secure: cookieOpts.secure,
      sameSite: cookieOpts.sameSite,
      path: cookieOpts.path,
      maxAge: 0,
    });

    return response;
  } catch (err) {
    console.error("[AdminLogoutAPI] Error:", err);
    return NextResponse.json({ success: true });
  }
}
