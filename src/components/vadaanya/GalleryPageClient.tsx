"use client";

import { useState, useEffect } from "react";
import GalleryPage from "./GalleryPage";
import GalleryPageSkeleton from "./GalleryPageSkeleton";
import type { GalleryEventItem, PrintMediaCollectionItem, NewsArticleItem } from "@/lib/sanity/queries";

interface GalleryPageClientProps {
  galleryEvents?: GalleryEventItem[];
  printMediaCollections?: PrintMediaCollectionItem[];
  newsItems?: NewsArticleItem[];
}

export default function GalleryPageClient({ galleryEvents = [], printMediaCollections = [], newsItems = [] }: GalleryPageClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <GalleryPageSkeleton />;
  }

  return <GalleryPage galleryEvents={galleryEvents} printMediaCollections={printMediaCollections} newsItems={newsItems} />;
}
