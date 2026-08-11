import type { Metadata } from "next";
import HomeFive from "@/components/homes/home-five";
import Wrapper from "@/layouts/Wrapper";
import Preloader from "@/components/common/Preloader";

export const metadata: Metadata = {
  title: "Vadaanya Janaa Society",
  description: "Vadaanya Janaa Society turns a government-school child's hope into a degree — through talent tests, scholarships, financial assistance and mentorship across Andhra Pradesh & Telangana since 2010.",
  keywords: ["Vadaanya Janaa Society", "education NGO India", "scholarship AP Telangana", "Vadaanya Talent Test", "government school scholarship", "financial assistance NGO", "Ashok Padapati", "Srinivasa Ramanujan Talent Test"],
  alternates: { canonical: "/" },
};

const page = () => {
  return (
    <Wrapper>
      <Preloader />
      <HomeFive />
    </Wrapper>
  );
};

export default page;