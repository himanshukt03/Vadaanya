import type { Metadata } from "next";
import React from "react";
import Wrapper from "@/layouts/Wrapper";
import Navbar from "@/components/vadaanya/Navbar";
import Footer from "@/components/vadaanya/Footer";
import SuccessStoriesClient from "@/components/vadaanya/SuccessStoriesClient";
import { getSuccessStories } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Success Stories",
  description: "Real stories of students transformed from rural government school classrooms to engineering, medicine, railways, and civil services.",
  alternates: { canonical: "/success-stories" },
};

export default async function Page() {
  const stories = await getSuccessStories();

  return (
    <Wrapper>
      <Navbar />
      <main id="top">
        <SuccessStoriesClient stories={stories} />
      </main>
      <Footer />
    </Wrapper>
  );
}
