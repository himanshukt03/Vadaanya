import type { Metadata } from "next";
import TermsOfService from "@/components/pages/terms-of-service"
import Wrapper from "@/layouts/Wrapper"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read Vadaanya Janaa Society's Terms of Service to understand the rules governing your use of vadaanya.org and our services.",
  alternates: { canonical: "https://vadaanya.org/terms-of-service" },
  robots: { index: true, follow: true },
};

const TermsOfServicePage = () => {
  return (
    <Wrapper>
      <TermsOfService />
    </Wrapper>
  )
}

export default TermsOfServicePage
