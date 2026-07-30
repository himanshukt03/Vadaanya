"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { stories } from "@/data/vadaanya/SuccessStoriesData";

import "swiper/css";
import "swiper/css/navigation";

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function SuccessStoriesGrid() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section id="stories" className="vad-section vad-section--deep">
      <div className="vad-container">
        <div className="vad-head">
          <span className="vad-eyebrow">Impact Stories</span>
          <h2 style={{ color: "#fff" }}>
            Students Who{" "}
            <span style={{ color: "var(--vad-gold)" }}>Made It</span>
          </h2>
          <p className="vad-lead">
            These are not statistics — they are people whose lives changed because they had support at the right moment.
          </p>
        </div>

        {/* Carousel */}
        <div className="vad-stories__carousel-wrapper">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            breakpoints={{
              480: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 24 },
              1100: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="vad-stories__swiper"
          >
            {stories.map((story) => (
              <SwiperSlide key={story.id} style={{ height: "auto" }}>
                <article className="vad-story-profile">
                  <div className="vad-story-profile__media">
                    <Image
                      src={story.imageUrl}
                      alt={story.imageAlt}
                      fill
                      sizes="(max-width: 480px) 90vw, (max-width: 768px) 45vw, (max-width: 1100px) 30vw, 22vw"
                      style={{ objectFit: "cover" }}
                      className="vad-story-profile__img"
                    />
                  </div>
                  <div className="vad-story-profile__body">
                    <h3 className="vad-story-profile__name">{story.name}</h3>
                    <p className="vad-story-profile__caption">{story.caption}</p>
                    <span className="vad-story-profile__year">Class of {story.year}</span>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="vad-stories__nav">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="vad-stories__arrow vad-stories__arrow--prev"
              aria-label="Previous stories"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="vad-stories__arrow vad-stories__arrow--next"
              aria-label="Next stories"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
