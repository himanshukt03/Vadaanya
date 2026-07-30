import TermsOfService from "@/components/pages/terms-of-service"
import Wrapper from "@/layouts/Wrapper"

export const metadata = {
  title: "Terms of Service | 100exNextGen",
  description: "Read 100exNextGen's Terms of Service to understand the rules governing your use of our website and services."
}

const TermsOfServicePage = () => {
  return (
    <Wrapper>
      <TermsOfService />
    </Wrapper>
  )
}

export default TermsOfServicePage
