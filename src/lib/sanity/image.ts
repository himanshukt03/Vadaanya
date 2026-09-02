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
  if (!source) return "/vadaanya_team.jpeg";
  return builder.image(source).width(2560).auto("format").quality(90).url();
}

/**
 * Returns optimized WebP/AVIF image URL for mobile viewports
 */
export function mobileImageUrl(source: any): string | undefined {
  if (!source) return undefined;
  return builder.image(source).width(1200).auto("format").quality(90).url();
}

/**
 * Hero carousel desktop image URL with optimized quality strategy:
 * - Slide 1 (LCP): Balanced for fast load + crisp 2048px resolution (quality 85).
 * - Slides 2+ (Background): High resolution 2560px with efficient compression (quality 85).
 */
export function heroDesktopImageUrl(source: any, isFirstSlide: boolean = false): string {
  if (!source) return "/vadaanya_team.jpeg";
  if (isFirstSlide) {
    return builder.image(source).width(2048).auto("format").quality(85).fit("max").url();
  }
  return builder.image(source).width(2560).auto("format").quality(85).fit("max").url();
}

/**
 * Hero carousel mobile image URL with optimized quality strategy:
 * - Slide 1 (LCP): Fast load + crisp 1080px resolution (quality 82).
 * - Slides 2+ (Background): Sharp 1440px resolution (quality 82).
 */
export function heroMobileImageUrl(source: any, isFirstSlide: boolean = false): string | undefined {
  if (!source) return undefined;
  if (isFirstSlide) {
    return builder.image(source).width(1080).auto("format").quality(82).fit("max").url();
  }
  return builder.image(source).width(1440).auto("format").quality(82).fit("max").url();
}

/**
 * Generates a responsive srcset for desktop screens (1440w, 1920w, 2560w).
 */
export function heroDesktopSrcSet(source: any, isFirstSlide: boolean = false): string | undefined {
  if (!source) return undefined;
  const qBase = isFirstSlide ? 82 : 85;
  const qHigh = isFirstSlide ? 85 : 88;

  const w1440 = builder.image(source).width(1440).auto("format").quality(qBase).fit("max").url();
  const w1920 = builder.image(source).width(1920).auto("format").quality(qBase).fit("max").url();
  const w2560 = builder.image(source).width(2560).auto("format").quality(qHigh).fit("max").url();

  return `${w1440} 1440w, ${w1920} 1920w, ${w2560} 2560w`;
}

/**
 * Generates a responsive srcset for mobile screens (640w, 750w, 1080w, 1440w) to support high-DPI devices.
 */
export function heroMobileSrcSet(source: any, isFirstSlide: boolean = false): string | undefined {
  if (!source) return undefined;
  const qBase = isFirstSlide ? 80 : 82;
  const qHigh = isFirstSlide ? 82 : 85;

  const w640 = builder.image(source).width(640).auto("format").quality(qBase).fit("max").url();
  const w750 = builder.image(source).width(750).auto("format").quality(qBase).fit("max").url();
  const w1080 = builder.image(source).width(1080).auto("format").quality(qHigh).fit("max").url();
  const w1440 = builder.image(source).width(1440).auto("format").quality(qHigh).fit("max").url();

  return `${w640} 640w, ${w750} 750w, ${w1080} 1080w, ${w1440} 1440w`;
}
