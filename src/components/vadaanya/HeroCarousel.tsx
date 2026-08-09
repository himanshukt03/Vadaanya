"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { type CarouselSlide } from "@/lib/sanity/queries";

const SLIDE_DURATION = 10000;

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

interface HeroCarouselProps {
  initialSlides?: CarouselSlide[];
}

export default function HeroCarousel({ initialSlides = [] }: HeroCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressActive, setProgressActive] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [slides] = useState<CarouselSlide[]>(initialSlides);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") swiperRef.current?.slidePrev();
      if (e.key === "ArrowRight") swiperRef.current?.slideNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
    setProgressActive(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setProgressActive(true));
    });
  }, []);

  const handlePause = () => {
    setIsPaused(true);
    swiperRef.current?.autoplay?.stop();
  };

  const handleResume = () => {
    setIsPaused(false);
    swiperRef.current?.autoplay?.start();
  };

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();
  const goTo = (i: number) => swiperRef.current?.slideToLoop(i);

  const shouldLoop = slides.length > 1;

  return (
    <section
      className="vad-hero"
      aria-label="Vadaanya highlights carousel"
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
    >
      {/* Progress bar */}
      {shouldLoop && (
        <div className="vad-hero__progress" aria-hidden="true">
          <div
            className={`vad-hero__progress-fill${progressActive && !isPaused ? " is-active" : ""}`}
            style={{ transitionDuration: `${SLIDE_DURATION}ms` }}
          />
        </div>
      )}

      <Swiper
        modules={[Autoplay, EffectFade, A11y]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={shouldLoop}
        speed={1000}
        autoplay={shouldLoop ? {
          delay: SLIDE_DURATION,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        } : false}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setProgressActive(true);
        }}
        onSlideChange={handleSlideChange}
        a11y={{
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
        }}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={slide.id}>
            <div className="vad-hero__slide">
              {/* Background image: desktop & optional mobile override */}
              <picture className="vad-hero__bg-picture" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}>
                {slide.mobileImageUrl && (
                  <source media="(max-width: 768px)" srcSet={slide.mobileImageUrl} />
                )}
                <Image
                  src={slide.desktopImageUrl}
                  alt={slide.imageAlt}
                  fill
                  sizes="100vw"
                  priority={idx === 0}
                  loading={idx === 0 ? "eager" : "lazy"}
                  placeholder={slide.blurDataUrl ? "blur" : "empty"}
                  blurDataURL={slide.blurDataUrl}
                  quality={80}
                  className="vad-hero__bg"
                />
              </picture>

              {/* Scrim overlay */}
              <div className="vad-hero__scrim" aria-hidden="true" />

              {/* Text content */}
              <div className="vad-hero__content">
                <div className="vad-hero__text">
                  <h1 className="vad-hero__headline">
                    <span className="vad-hero__headline-white">{slide.mainHeadingPart1}</span>
                    {slide.mainHeadingPart2 && (
                      <> <span className="vad-hero__headline-accent">{slide.mainHeadingPart2}</span></>
                    )}
                  </h1>

                  <p className="vad-hero__sub">{slide.description}</p>

                  <div className="vad-hero__cta">
                    {/* Secondary button (left) - Dynamic per slide */}
                    {slide.secondaryButtonLabel && (
                      <a
                        href={slide.secondaryButtonUrl}
                        className="vad-btn vad-btn--gold"
                        onClick={(e) => {
                          if (slide.secondaryButtonUrl.startsWith("#")) {
                            const target = document.getElementById(slide.secondaryButtonUrl.slice(1));
                            if (target) {
                              e.preventDefault();
                              target.scrollIntoView({ behavior: "smooth" });
                            }
                          }
                        }}
                      >
                        {slide.secondaryButtonLabel}
                        <span className="vad-arrow" aria-hidden="true">→</span>
                      </a>
                    )}
                    {/* Primary button (right) - Static across all slides */}
                    <a
                      href="#donate"
                      className="vad-btn vad-btn--outline"
                      onClick={(e) => {
                        const el = document.getElementById("donate");
                        if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); }
                      }}
                    >
                      Donate Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controls (shown only if more than 1 slide) */}
      {shouldLoop && (
        <div className="vad-hero__controls" aria-label="Carousel navigation">
          {/* Dots */}
          <div className="vad-hero__dots" role="tablist" aria-label="Go to slide">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Slide ${i + 1}: ${slide.mainHeadingPart1}`}
                className={`vad-hero__dot${i === activeIndex ? " is-active" : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="vad-hero__arrows">
            <button
              className="vad-hero__arrow"
              onClick={handlePrev}
              aria-label="Previous slide"
            >
              <ArrowLeft />
            </button>
            <button
              className="vad-hero__arrow"
              onClick={handleNext}
              aria-label="Next slide"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
