import type { Metadata } from "next";
import React from "react";
import Wrapper from "@/layouts/Wrapper";
import Navbar from "@/components/vadaanya/Navbar";
import Footer from "@/components/vadaanya/Footer";
import GalleryPageClient from "@/components/vadaanya/GalleryPageClient";
import { getGalleryEvents, getPrintMediaCollections, getNewsArticles } from "@/lib/sanity/queries";

import JsonLd, { getBreadcrumbJsonLd } from "@/components/common/JsonLd";

export const metadata: Metadata = {
  title: "Media Gallery & Press Coverage",
  description:
    "Explore photos, newspaper clippings, and videos documenting Vadaanya Janaa Society's talent tests, laptop donations, and scholarship award ceremonies.",
  keywords: ["Vadaanya media", "Vadaanya gallery", "education NGO photos", "print media press coverage"],
  alternates: { canonical: "https://vadaanya.org/gallery" },
  openGraph: {
    title: "Media Gallery & Press Coverage | Vadaanya Janaa Society",
    description:
      "Photos, newspaper press clippings, and video coverage of Vadaanya events across AP & Telangana.",
    url: "https://vadaanya.org/gallery",
  },
};

export default async function Gallery() {
  const galleryEvents = await getGalleryEvents();
  const printMediaCollections = await getPrintMediaCollections();
  const newsItems = await getNewsArticles();

  const breadcrumbLd = getBreadcrumbJsonLd([
    { name: "Home", url: "https://vadaanya.org" },
    { name: "Media Gallery", url: "https://vadaanya.org/gallery" },
  ]);

  return (
    <Wrapper>
      <JsonLd data={breadcrumbLd} />
      <Navbar />
      <main id="top">
        <GalleryPageClient
          galleryEvents={galleryEvents}
          printMediaCollections={printMediaCollections}
          newsItems={newsItems}
        />
      </main>
      <Footer />
    </Wrapper>
  );
}
