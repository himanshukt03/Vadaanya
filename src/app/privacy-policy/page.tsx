import type { Metadata } from "next";
import PrivacyPolicy from "@/components/pages/privacy-policy"
import Wrapper from "@/layouts/Wrapper"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read Vadaanya Janaa Society's Privacy Policy to understand how we collect, use, and protect your personal information when you visit vadaanya.org.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
};

const PrivacyPolicyPage = () => {
  return (
    <Wrapper>
      <PrivacyPolicy />
    </Wrapper>
  )
}

export default PrivacyPolicyPage
