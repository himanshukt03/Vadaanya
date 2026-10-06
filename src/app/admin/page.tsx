import type { Metadata } from "next";
import AdminDashboard from "@/components/vadaanya/admin/AdminDashboard";
import AdminLoginForm from "@/components/vadaanya/admin/AdminLoginForm";
import { getServerAdminSession } from "@/server/auth/adminAuthService";

export const metadata: Metadata = {
  title: "Admin Analytics Command Center • Talent Test 2026 | Vadaanya",
  description:
    "Real-time administrative analytics dashboard for monitoring student registrations, step completion rates, district quotas, and school wise counts for Vadaanya Talent Test 2026.",
  robots: {
    index: false,
    follow: false,
  },
};

// Ensure server session is verified on every request without caching
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getServerAdminSession();

  // If unauthenticated, render the secure login gatekeeper
  if (!session) {
    return <AdminLoginForm />;
  }

  // If verified, render the full admin command center
  return <AdminDashboard adminEmail={session.email} role={session.role} />;
}
