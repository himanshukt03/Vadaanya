import { createImageUrlBuilder } from "@sanity/image-url";
import { projectId, dataset } from "./client";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: any) {
  return builder.image(source);
}

/**
 * Returns optimized WebP/AVIF image URL for desktop viewports
 */
export function desktopImageUrl(source: any): string {
  if (!source) return "/hero-1.jpg";
  return builder.image(source).width(1920).auto("format").quality(80).url();
}

/**
 * Returns optimized WebP/AVIF image URL for mobile viewports
 */
export function mobileImageUrl(source: any): string | undefined {
  if (!source) return undefined;
  return builder.image(source).width(800).auto("format").quality(80).url();
}
