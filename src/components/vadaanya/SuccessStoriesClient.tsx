"use client";

import { useState, useEffect } from "react";
import SuccessStoriesPage from "./SuccessStoriesPage";
import SuccessStoriesSkeleton from "./SuccessStoriesSkeleton";
import type { SuccessStoryItem } from "@/lib/sanity/queries";

interface SuccessStoriesClientProps {
  stories?: SuccessStoryItem[];
}

export default function SuccessStoriesClient({ stories = [] }: SuccessStoriesClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <SuccessStoriesSkeleton />;
  }

  return <SuccessStoriesPage stories={stories} />;
}
