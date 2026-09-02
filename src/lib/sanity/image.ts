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
 * Hero carousel desktop image URL with differentiated quality strategy:
 * - Slide 1 (LCP): Balanced for fast load + crisp 2560px resolution (quality 90).
 * - Slides 2+ (Background): Ultra-high 4K (3840px) pristine fidelity (quality 98).
 */
export function heroDesktopImageUrl(source: any, isFirstSlide: boolean = false): string {
  if (!source) return "/vadaanya_team.jpeg";
  if (isFirstSlide) {
    return builder.image(source).width(2560).auto("format").quality(90).fit("max").url();
  }
  return builder.image(source).width(3840).auto("format").quality(98).fit("max").url();
}

/**
 * Hero carousel mobile image URL with differentiated quality strategy:
 * - Slide 1 (LCP): Fast load + crisp 1400px resolution (quality 90).
 * - Slides 2+ (Background): Ultra-sharp 2048px resolution (quality 98).
 */
export function heroMobileImageUrl(source: any, isFirstSlide: boolean = false): string | undefined {
  if (!source) return undefined;
  if (isFirstSlide) {
    return builder.image(source).width(1400).auto("format").quality(90).fit("max").url();
  }
  return builder.image(source).width(2048).auto("format").quality(98).fit("max").url();
}

/**
 * Generates a responsive srcset for desktop screens (1920w, 2560w, 3840w).
 */
export function heroDesktopSrcSet(source: any, isFirstSlide: boolean = false): string | undefined {
  if (!source) return undefined;
  const qBase = isFirstSlide ? 88 : 95;
  const qMid = isFirstSlide ? 90 : 96;
  const qHigh = isFirstSlide ? 92 : 98;

  const w1920 = builder.image(source).width(1920).auto("format").quality(qBase).fit("max").url();
  const w2560 = builder.image(source).width(2560).auto("format").quality(qMid).fit("max").url();
  const w3840 = builder.image(source).width(3840).auto("format").quality(qHigh).fit("max").url();

  return `${w1920} 1920w, ${w2560} 2560w, ${w3840} 3840w`;
}

/**
 * Generates a responsive srcset for mobile screens (750w, 1080w, 1440w, 2048w) to support high-DPI (Retina/OLED) devices.
 */
export function heroMobileSrcSet(source: any, isFirstSlide: boolean = false): string | undefined {
  if (!source) return undefined;
  const qBase = isFirstSlide ? 88 : 95;
  const qMid = isFirstSlide ? 90 : 95;
  const qHigh = isFirstSlide ? 90 : 96;
  const qUltra = isFirstSlide ? 92 : 98;

  const w750 = builder.image(source).width(750).auto("format").quality(qBase).fit("max").url();
  const w1080 = builder.image(source).width(1080).auto("format").quality(qMid).fit("max").url();
  const w1440 = builder.image(source).width(1440).auto("format").quality(qHigh).fit("max").url();
  const w2048 = builder.image(source).width(2048).auto("format").quality(qUltra).fit("max").url();

  return `${w750} 750w, ${w1080} 1080w, ${w1440} 1440w, ${w2048} 2048w`;
}
