"use client";

import { useState, useEffect } from "react";
import SuccessStoriesPage from "./SuccessStoriesPage";
import SuccessStoriesSkeleton from "./SuccessStoriesSkeleton";

export default function SuccessStoriesClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <SuccessStoriesSkeleton />;
  }

  return <SuccessStoriesPage />;
}
