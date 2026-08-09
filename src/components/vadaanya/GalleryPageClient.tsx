"use client";

import { useState, useEffect } from "react";
import GalleryPage from "./GalleryPage";
import GalleryPageSkeleton from "./GalleryPageSkeleton";

export default function GalleryPageClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <GalleryPageSkeleton />;
  }

  return <GalleryPage />;
}
