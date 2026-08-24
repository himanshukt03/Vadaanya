import type { Metadata } from "next";
import HomeFive from "@/components/homes/home-five";
import Wrapper from "@/layouts/Wrapper";
import Preloader from "@/components/common/Preloader";

export const metadata: Metadata = {
  title: {
    absolute: "Vadaanya | Be the one, for the change",
  },
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
    title: "Vadaanya | Be the one, for the change",
    description:
      "Vadaanya Janaa Society (also known as Vadaanya for short), founded in 2010 by Founder & President Ashok Padapati, empowers government-school students across India.",
    url: "https://vadaanya.org",
    siteName: "Vadaanya Janaa Society",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://vadaanya.org/og-image.png",
        secureUrl: "https://vadaanya.org/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Vadaanya — Be the one, for the change",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@VadaanyaJanaa",
    creator: "@VadaanyaJanaa",
    title: "Vadaanya | Be the one, for the change",
    description:
      "Vadaanya Janaa Society (also known as Vadaanya for short), founded in 2010 by Founder & President Ashok Padapati, empowers government-school students across India.",
    images: ["https://vadaanya.org/og-image.png"],
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