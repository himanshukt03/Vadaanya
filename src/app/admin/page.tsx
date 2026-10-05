import type { Metadata } from "next";
import AdminDashboard from "@/components/vadaanya/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Analytics Command Center • Talent Test 2026 | Vadaanya",
  description:
    "Real-time administrative analytics dashboard for monitoring student registrations, step completion rates, district quotas, and school wise counts for Vadaanya Talent Test 2026.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
