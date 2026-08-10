"use client";

import Link from "next/link";
import type { NewsArticleItem } from "@/lib/sanity/queries";
import PublisherLogo from "./PublisherLogo";

const ExternalLinkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

interface NewsFeedProps {
  newsItems?: NewsArticleItem[];
}

export default function NewsFeed({ newsItems = [] }: NewsFeedProps) {
  return (
    <section id="news" className="vad-section vad-section--grey">
      <div className="vad-container">
        <div className="vad-head vad-head--light">
          <span className="vad-eyebrow vad-eyebrow--dark">Updates & Press</span>
          <h2>
            Latest{" "}
            <span style={{ color: "var(--vad-navy-700)" }}>News & Notices</span>
          </h2>
          <p className="vad-lead">
            Exam results, hall tickets, scholarship announcements, and press coverage from across Andhra Pradesh and Telangana.
          </p>
        </div>

        <div className="vad-news__list">
          {newsItems.map((item) => (
            <article key={item.id} className="vad-news-item">
              {/* Date column */}
              <div>
                {item.date && <p className="vad-news-item__date">{item.date}</p>}
              </div>

              {/* Content column */}
              <div>
                <PublisherLogo publisher={item.publisher} link={item.link} />
                {item.tag && <span className="vad-news-item__tag">{item.tag}</span>}
                <h3 className="vad-news-item__title">{item.title}</h3>
                <p className="vad-news-item__desc">{item.description}</p>
                {item.link && (
                  <a
                    href={item.link}
                    target={item.link.startsWith("http") ? "_blank" : undefined}
                    rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="vad-news-item__link"
                    aria-label={`${item.linkLabel ?? "Read more"} — ${item.title}`}
                  >
                    {item.linkLabel ?? "Read More"}
                    <ExternalLinkIcon />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
