"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { stats } from "@/data/vadaanya/StatsData";

export default function StatsStrip() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div className="vad-stats" ref={ref}>
      <div className="vad-stats__grid">
        {stats.map((stat) => (
          <div key={stat.id} className="vad-stats__item">
            <div className="vad-stats__num">
              {inView ? (
                <CountUp end={stat.number} duration={2.4} separator="," />
              ) : (
                "0"
              )}
              {stat.suffix}
            </div>
            <p className="vad-stats__label">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
