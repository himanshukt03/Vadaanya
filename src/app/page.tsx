import type { Metadata } from "next";
import HomeFive from "@/components/homes/home-five";
import Wrapper from "@/layouts/Wrapper";
import Preloader from "@/components/common/Preloader";

export const metadata: Metadata = {
  title: "Education NGO for Government School Students in AP & TS",
  description:
    "Vadaanya Janaa Society empowers government-school students across Andhra Pradesh & Telangana through talent tests, scholarships, laptop drives, and mentorship since 2010.",
  keywords: [
    "Vadaanya Janaa Society",
    "education NGO India",
    "scholarship AP Telangana",
    "Vadaanya Talent Test",
    "government school scholarship",
    "education charity",
  ],
  alternates: { canonical: "https://vadaanya.org" },
  openGraph: {
    title: "Vadaanya Janaa Society | Education NGO in AP & Telangana",
    description:
      "Transforming government-school children's potential into degrees through talent tests, scholarships, and mentorship since 2010.",
    url: "https://vadaanya.org",
  },
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