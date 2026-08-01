import type { Metadata } from "next";
import React from "react";
import Wrapper from "@/layouts/Wrapper";
import Navbar from "@/components/vadaanya/Navbar";
import Footer from "@/components/vadaanya/Footer";
import GalleryPage from "@/components/vadaanya/GalleryPage";

export const metadata: Metadata = {
  title: "Gallery — Events, Ceremonies & Impact",
  description: "Browse photos from Vadaanya Janaa Society's talent tests, scholarship ceremonies, laptop donation drives, and community events across Andhra Pradesh & Telangana.",
  keywords: ["Vadaanya gallery", "education NGO photos", "talent test ceremony", "scholarship event India", "laptop donation drive photos"],
  alternates: { canonical: "/gallery" },
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
