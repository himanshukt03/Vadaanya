"use client";

import { useState, useEffect } from "react";
import HeroCarousel from "./HeroCarousel";
import HeroCarouselSkeleton from "./HeroCarouselSkeleton";
import type { CarouselSlide } from "@/lib/sanity/queries";

export default function HeroCarouselClient({ initialSlides }: { initialSlides: CarouselSlide[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <HeroCarouselSkeleton slides={initialSlides} />;
  }

  return <HeroCarousel initialSlides={initialSlides} />;
}
