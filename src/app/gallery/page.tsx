import React from "react";
import Wrapper from "@/layouts/Wrapper";
import Navbar from "@/components/vadaanya/Navbar";
import Footer from "@/components/vadaanya/Footer";
import GalleryPage from "@/components/vadaanya/GalleryPage";

export const metadata = {
  title: "Gallery — Vadaanya Janaa Society",
  description: "Explore the impact of Vadaanya Janaa Society through our photo gallery of past events.",
};

export default function Gallery() {
  return (
    <Wrapper>
      <Navbar />
      <main id="top">
        <GalleryPage />
      </main>
      <Footer />
    </Wrapper>
  );
}
