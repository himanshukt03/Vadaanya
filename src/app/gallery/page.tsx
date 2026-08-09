import type { Metadata } from "next";
import React from "react";
import Wrapper from "@/layouts/Wrapper";
import Navbar from "@/components/vadaanya/Navbar";
import Footer from "@/components/vadaanya/Footer";
import GalleryPageClient from "@/components/vadaanya/GalleryPageClient";

export const metadata: Metadata = {
  title: "Media — Gallery, Print Media & YouTube",
  description: "Browse photos, newspaper print coverage, and YouTube videos from Vadaanya Janaa Society's talent tests, scholarship ceremonies, laptop donation drives, and community events across Andhra Pradesh & Telangana.",
  keywords: ["Vadaanya media", "Vadaanya gallery", "education NGO photos", "print media press coverage", "YouTube videos Vadaanya"],
  alternates: { canonical: "/gallery" },
};

export default function Gallery() {
  return (
    <Wrapper>
      <Navbar />
      <main id="top">
        <GalleryPageClient />
      </main>
      <Footer />
    </Wrapper>
  );
}
