import type { Metadata } from "next";
import HomeFive from "@/components/homes/home-five";
import Wrapper from "@/layouts/Wrapper";
import Preloader from "@/components/common/Preloader";

export const metadata: Metadata = {
  title: "Education NGO for Government School Students Across India",
  description:
    "Vadaanya Janaa Society empowers government-school students across India through talent tests, scholarships, laptop drives, and mentorship since 2010.",
  keywords: [
    "Vadaanya Janaa Society",
    "education NGO India",
    "scholarship India",
    "Vadaanya Talent Test",
    "government school scholarship",
    "education charity",
  ],
  alternates: { canonical: "https://vadaanya.org" },
  openGraph: {
    title: "Vadaanya Janaa Society | Education NGO in India",
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