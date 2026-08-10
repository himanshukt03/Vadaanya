import { defineQuery } from "next-sanity";
import { sanityClient } from "./client";
import { desktopImageUrl, mobileImageUrl, urlFor } from "./image";
import { heroSlides as fallbackSlides } from "@/data/vadaanya/HeroData";
import { newsItems as fallbackNewsItems } from "@/data/vadaanya/NewsData";
import { galleryEvents as fallbackGalleryEvents } from "@/data/vadaanya/GalleryData";
import { printMediaCollections as fallbackPrintMedia } from "@/data/vadaanya/PrintMediaData";
import { stories as fallbackStories } from "@/data/vadaanya/SuccessStoriesData";
import { milestonesData as fallbackMilestones } from "@/data/vadaanya/MilestonesData";

/* ───────────────────────────────────────────────
   HERO SLIDES
   ─────────────────────────────────────────────── */

export const HERO_SLIDES_QUERY = defineQuery(`
  *[_type == "heroSlide"] | order(orderRank asc, _createdAt asc) {
    _id,
    mainHeadingPart1,
    mainHeadingPart2,
    description,
    secondaryButtonLabel,
    secondaryButtonUrl,
    desktopImage {
      asset-> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      hotspot
    },
    mobileImage {
      asset-> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      hotspot
    }
  }
`);

export interface SanityHeroSlide {
  _id: string;
  mainHeadingPart1: string;
  mainHeadingPart2: string;
  description: string;
  secondaryButtonLabel: string;
  secondaryButtonUrl: string;
  desktopImage?: {
    asset?: {
      _id: string;
      url: string;
      metadata?: {
        lqip?: string;
      };
    };
  };
  mobileImage?: {
    asset?: {
      _id: string;
      url: string;
      metadata?: {
        lqip?: string;
      };
    };
  };
}

export interface CarouselSlide {
  id: string;
  mainHeadingPart1: string;
  mainHeadingPart2: string;
  description: string;
  desktopImageUrl: string;
  mobileImageUrl?: string;
  blurDataUrl?: string;
  imageAlt: string;
  secondaryButtonLabel: string;
  secondaryButtonUrl: string;
}

export async function getHeroSlides(): Promise<CarouselSlide[]> {
  try {
    const sanityData: SanityHeroSlide[] = await sanityClient.fetch(
      HERO_SLIDES_QUERY,
      {},
      { next: { revalidate: 60 } }
    );

    if (sanityData && sanityData.length > 0) {
      return sanityData.map((s) => ({
        id: s._id,
        mainHeadingPart1: s.mainHeadingPart1 || "",
        mainHeadingPart2: s.mainHeadingPart2 || "",
        description: s.description || "",
        desktopImageUrl: s.desktopImage
          ? desktopImageUrl(s.desktopImage)
          : "/hero-1.jpg",
        mobileImageUrl: s.mobileImage
          ? mobileImageUrl(s.mobileImage)
          : undefined,
        blurDataUrl: s.desktopImage?.asset?.metadata?.lqip,
        imageAlt: `${s.mainHeadingPart1} ${s.mainHeadingPart2}`.trim() || "Hero Image",
        secondaryButtonLabel: s.secondaryButtonLabel || "Success Stories",
        secondaryButtonUrl: s.secondaryButtonUrl || "#stories",
      }));
    }
  } catch (err) {
    console.error("Failed to fetch Sanity hero slides on server:", err);
  }

  return fallbackSlides.map((fs) => ({
    id: String(fs.id),
    mainHeadingPart1: fs.headline,
    mainHeadingPart2: fs.headlineAccent || "",
    description: fs.subtext,
    desktopImageUrl: fs.imageUrl,
    imageAlt: fs.imageAlt,
    secondaryButtonLabel: fs.cta?.label || "Success Stories",
    secondaryButtonUrl: fs.cta?.href || "#stories",
  }));
}

/* ───────────────────────────────────────────────
   NEWS ARTICLES
   ─────────────────────────────────────────────── */

export const NEWS_ARTICLES_QUERY = defineQuery(`
  *[_type == "newsArticle"] | order(orderRank asc, _createdAt desc) {
    _id,
    title,
    publisher,
    description,
    link,
    linkLabel,
    tag,
    date,
    orderRank
  }
`);

export interface SanityNewsArticle {
  _id: string;
  title: string;
  publisher: string;
  description: string;
  link: string;
  linkLabel?: string;
  tag?: string;
  date?: string;
  orderRank?: number;
}

export interface NewsArticleItem {
  id: string;
  title: string;
  publisher?: string;
  description: string;
  link: string;
  linkLabel?: string;
  tag?: string;
  date?: string;
}

export async function getNewsArticles(): Promise<NewsArticleItem[]> {
  try {
    const sanityData: SanityNewsArticle[] = await sanityClient.fetch(
      NEWS_ARTICLES_QUERY,
      {},
      { next: { revalidate: 60 } }
    );

    if (sanityData && sanityData.length > 0) {
      return sanityData.map((item) => ({
        id: item._id,
        title: item.title || "",
        publisher: item.publisher || undefined,
        description: item.description || "",
        link: item.link || "",
        linkLabel: item.linkLabel || "Read Article",
        tag: item.tag || undefined,
        date: item.date || undefined,
      }));
    }
  } catch (err) {
    console.error("Failed to fetch Sanity news articles on server:", err);
  }

  return fallbackNewsItems.map((item) => ({
    id: String(item.id),
    title: item.title,
    publisher: item.publisher,
    description: item.description,
    link: item.link,
    linkLabel: item.linkLabel,
    tag: item.tag,
    date: item.date,
  }));
}

/* ───────────────────────────────────────────────
   GALLERY EVENTS
   ─────────────────────────────────────────────── */

export const GALLERY_EVENTS_QUERY = defineQuery(`
  *[_type == "galleryEvent"] | order(orderRank asc, _createdAt desc) {
    _id,
    title,
    date,
    coverImage {
      asset-> {
        _id,
        url
      },
      hotspot
    },
    images[] {
      asset-> {
        _id,
        url
      },
      hotspot
    },
    orderRank
  }
`);

export interface SanityGalleryEvent {
  _id: string;
  title: string;
  date: string;
  coverImage?: {
    asset?: {
      _id: string;
      url: string;
    };
  };
  images?: Array<{
    asset?: {
      _id: string;
      url: string;
    };
  }>;
  orderRank?: number;
}

export interface GalleryEventItem {
  id: string;
  title: string;
  date: string;
  coverImage: string;
  images: string[];
}

export async function getGalleryEvents(): Promise<GalleryEventItem[]> {
  try {
    const sanityData: SanityGalleryEvent[] = await sanityClient.fetch(
      GALLERY_EVENTS_QUERY,
      {},
      { next: { revalidate: 60 } }
    );

    if (sanityData && sanityData.length > 0) {
      return sanityData.map((event) => ({
        id: event._id,
        title: event.title || "",
        date: event.date || "",
        coverImage: event.coverImage
          ? urlFor(event.coverImage).width(800).auto("format").quality(80).url()
          : "/hero-1.jpg",
        images: (event.images || [])
          .map((img) =>
            img?.asset?.url
              ? urlFor(img).width(1200).auto("format").quality(80).url()
              : ""
          )
          .filter(Boolean),
      }));
    }
  } catch (err) {
    console.error("Failed to fetch Sanity gallery events on server:", err);
  }

  return fallbackGalleryEvents.map((event) => ({
    id: event.id,
    title: event.title,
    date: event.date,
    coverImage: event.coverImage,
    images: event.images,
  }));
}

/* ───────────────────────────────────────────────
   PRINT MEDIA COLLECTIONS
   ─────────────────────────────────────────────── */

export const PRINT_MEDIA_QUERY = defineQuery(`
  *[_type == "printMediaCollection"] | order(orderRank asc, _createdAt desc) {
    _id,
    title,
    language,
    date,
    coverImage {
      asset-> {
        _id,
        url
      },
      hotspot
    },
    images[] {
      asset-> {
        _id,
        url
      },
      hotspot
    },
    orderRank
  }
`);

export interface SanityPrintMediaCollection {
  _id: string;
  title: string;
  language?: string;
  date?: string;
  coverImage?: {
    asset?: {
      _id: string;
      url: string;
    };
  };
  images?: Array<{
    asset?: {
      _id: string;
      url: string;
    };
  }>;
  orderRank?: number;
}

export interface PrintMediaCollectionItem {
  id: string;
  title: string;
  language: string;
  date: string;
  coverImage: string;
  images: string[];
}

export async function getPrintMediaCollections(): Promise<PrintMediaCollectionItem[]> {
  try {
    const sanityData: SanityPrintMediaCollection[] = await sanityClient.fetch(
      PRINT_MEDIA_QUERY,
      {},
      { next: { revalidate: 60 } }
    );

    if (sanityData && sanityData.length > 0) {
      return sanityData.map((collection) => ({
        id: collection._id,
        title: collection.title || "",
        language: collection.language || "",
        date: collection.date || "",
        coverImage: collection.coverImage
          ? urlFor(collection.coverImage).width(800).auto("format").quality(80).url()
          : "/hero-1.jpg",
        images: (collection.images || [])
          .map((img) =>
            img?.asset?.url
              ? urlFor(img).width(1200).auto("format").quality(80).url()
              : ""
          )
          .filter(Boolean),
      }));
    }
  } catch (err) {
    console.error("Failed to fetch Sanity print media on server:", err);
  }

  return fallbackPrintMedia.map((collection) => ({
    id: collection.id,
    title: collection.title,
    language: collection.language,
    date: collection.date,
    coverImage: collection.coverImage,
    images: collection.images,
  }));
}

/* ───────────────────────────────────────────────
   SUCCESS STORIES
   ─────────────────────────────────────────────── */

export const SUCCESS_STORIES_QUERY = defineQuery(`
  *[_type == "successStory"] | order(orderRank asc, _createdAt desc) {
    _id,
    name,
    occupation,
    shortCaption,
    fullStory,
    quote,
    covered,
    videoUrl,
    image {
      asset-> {
        _id,
        url
      },
      hotspot
    },
    orderRank
  }
`);

export interface SanitySuccessStory {
  _id: string;
  name: string;
  occupation: string;
  shortCaption: string;
  fullStory: string;
  quote?: string;
  covered?: string[];
  videoUrl?: string;
  image?: {
    asset?: {
      _id: string;
      url: string;
    };
  };
  orderRank?: number;
}

export interface SuccessStoryItem {
  id: string;
  name: string;
  occupation: string;
  shortCaption: string;
  fullStory: string;
  quote?: string;
  covered: string[];
  videoUrl?: string;
  imageUrl: string;
  imageAlt: string;
}

export async function getSuccessStories(): Promise<SuccessStoryItem[]> {
  try {
    const sanityData: SanitySuccessStory[] = await sanityClient.fetch(
      SUCCESS_STORIES_QUERY,
      {},
      { next: { revalidate: 60 } }
    );

    if (sanityData && sanityData.length > 0) {
      return sanityData.map((story) => ({
        id: story._id,
        name: story.name || "",
        occupation: story.occupation || "",
        shortCaption: story.shortCaption || "",
        fullStory: story.fullStory || "",
        quote: story.quote || undefined,
        covered: story.covered || [],
        videoUrl: story.videoUrl || undefined,
        imageUrl: story.image
          ? urlFor(story.image).width(800).auto("format").quality(80).url()
          : "/about-1.jpg",
        imageAlt: story.name || "Student photo",
      }));
    }
  } catch (err) {
    console.error("Failed to fetch Sanity success stories on server:", err);
  }

  return fallbackStories.map((story) => ({
    id: String(story.id),
    name: story.name,
    occupation: story.occupation,
    shortCaption: story.shortCaption,
    fullStory: story.fullStory,
    quote: story.quote,
    covered: story.covered,
    videoUrl: story.videoUrl,
    imageUrl: story.imageUrl,
    imageAlt: story.imageAlt,
  }));
}

/* ───────────────────────────────────────────────
   MILESTONES
   ─────────────────────────────────────────────── */

export const MILESTONES_QUERY = defineQuery(`
  *[_type == "milestone"] | order(orderRank asc, _createdAt asc) {
    _id,
    year,
    desc,
    orderRank
  }
`);

export interface SanityMilestone {
  _id: string;
  year: string;
  desc: string;
  orderRank?: number;
}

export interface MilestoneItem {
  id: string;
  year: string;
  desc: string;
}

export async function getMilestones(): Promise<MilestoneItem[]> {
  try {
    const sanityData: SanityMilestone[] = await sanityClient.fetch(
      MILESTONES_QUERY,
      {},
      { next: { revalidate: 60 } }
    );

    if (sanityData && sanityData.length > 0) {
      return sanityData.map((m) => ({
        id: m._id,
        year: m.year || "",
        desc: m.desc || "",
      }));
    }
  } catch (err) {
    console.error("Failed to fetch Sanity milestones on server:", err);
  }

  return fallbackMilestones.map((m, idx) => ({
    id: String(m.id || idx + 1),
    year: m.year,
    desc: m.desc,
  }));
}

