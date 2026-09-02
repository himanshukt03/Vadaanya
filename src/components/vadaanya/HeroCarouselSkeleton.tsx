import Image from "next/image";
import type { CarouselSlide } from "@/lib/sanity/queries";

export default function HeroCarouselSkeleton({ slides }: { slides: CarouselSlide[] }) {
  const slide = slides[0];
  if (!slide) {
    return <section className="vad-hero" style={{ minHeight: "100vh" }} />;
  }

  return (
    <section className="vad-hero" aria-label="Vadaanya highlights carousel">
      <div className="vad-hero__slide" style={{ position: "relative", width: "100%", height: "100%" }}>
        <picture
          className="vad-hero__bg-picture"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
        >
          {(slide.mobileSrcSet || slide.mobileImageUrl) && (
            <source
              media="(max-width: 768px)"
              srcSet={slide.mobileSrcSet || slide.mobileImageUrl}
              sizes="100vw"
            />
          )}
          {slide.desktopSrcSet && (
            <source
              media="(min-width: 769px)"
              srcSet={slide.desktopSrcSet}
              sizes="100vw"
            />
          )}
          <Image
            src={slide.desktopImageUrl}
            alt={slide.imageAlt}
            fill
            sizes="100vw"
            priority
            fetchPriority="high"
            placeholder={slide.blurDataUrl ? "blur" : "empty"}
            blurDataURL={slide.blurDataUrl}
            unoptimized
            className="vad-hero__bg"
          />
        </picture>

        <div className="vad-hero__scrim" aria-hidden="true" />

        <div className="vad-hero__content">
          <div className="vad-hero__text">
            <h1 className="vad-hero__headline">
              <span className="vad-hero__headline-white">{slide.mainHeadingPart1}</span>
              {slide.mainHeadingPart2 && (
                <>
                  {" "}
                  <span className="vad-hero__headline-accent">{slide.mainHeadingPart2}</span>
                </>
              )}
            </h1>

            <p className="vad-hero__sub">{slide.description}</p>

            <div className="vad-hero__cta">
              {slide.secondaryButtonLabel && (
                <a href={slide.secondaryButtonUrl} className="vad-btn vad-btn--gold">
                  {slide.secondaryButtonLabel}
                  <span className="vad-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              )}
              <a href="#donate" className="vad-btn vad-btn--outline">
                Donate Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
