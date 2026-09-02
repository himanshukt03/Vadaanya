import type { Metadata } from "next";
import React from "react";
import Wrapper from "@/layouts/Wrapper";
import Navbar from "@/components/vadaanya/Navbar";
import Footer from "@/components/vadaanya/Footer";
import SuccessStoriesClient from "@/components/vadaanya/SuccessStoriesClient";
import { getSuccessStories } from "@/lib/sanity/queries";

import JsonLd, { getBreadcrumbJsonLd } from "@/components/common/JsonLd";

export const metadata: Metadata = {
  title: "Success Stories",
  description:
    "Read inspiring journeys of government school students supported by Vadaanya scholarships to achieve degrees in engineering, medicine, and public service.",
  keywords: ["Vadaanya success stories", "student scholarship impact", "government school success stories"],
  alternates: { canonical: "https://vadaanya.org/success-stories" },
  openGraph: {
    title: "Success Stories | Vadaanya",
    description:
      "From rural government school classrooms to engineering, medicine, and civil service careers.",
    url: "https://vadaanya.org/success-stories",
    siteName: "Vadaanya Janaa Society",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://vadaanya.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vadaanya Student Success Stories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Success Stories | Vadaanya",
    description: "From rural government school classrooms to engineering, medicine, and civil service careers.",
    images: ["https://vadaanya.org/og-image.png"],
  },
};

export default async function Page() {
  const stories = await getSuccessStories();

  const breadcrumbLd = getBreadcrumbJsonLd([
    { name: "Home", url: "https://vadaanya.org" },
    { name: "Success Stories", url: "https://vadaanya.org/success-stories" },
  ]);

  return (
    <Wrapper>
      <JsonLd data={breadcrumbLd} />
      <Navbar />
      <main id="top">
        <SuccessStoriesClient stories={stories} />
      </main>
      <Footer />
    </Wrapper>
  );
}
