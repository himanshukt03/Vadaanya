"use client";

import { useState, useEffect, Suspense } from "react";
import GalleryPage from "./GalleryPage";
import GalleryPageSkeleton from "./GalleryPageSkeleton";
import type {
  GalleryEventItem,
  PrintMediaCollectionItem,
  NewsArticleItem,
  CampaignPosterItem,
} from "@/lib/sanity/queries";

interface GalleryPageClientProps {
  galleryEvents?: GalleryEventItem[];
  printMediaCollections?: PrintMediaCollectionItem[];
  newsItems?: NewsArticleItem[];
  campaignPosters?: CampaignPosterItem[];
}

export default function GalleryPageClient({
  galleryEvents = [],
  printMediaCollections = [],
  newsItems = [],
  campaignPosters = [],
}: GalleryPageClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <GalleryPageSkeleton />;
  }

  return (
    <Suspense fallback={<GalleryPageSkeleton />}>
      <GalleryPage
        galleryEvents={galleryEvents}
        printMediaCollections={printMediaCollections}
        newsItems={newsItems}
        campaignPosters={campaignPosters}
      />
    </Suspense>
  );
}
