import { defineQuery } from "next-sanity";
import { sanityClient } from "./client";
import {
  desktopImageUrl,
  mobileImageUrl,
  urlFor,
  heroDesktopImageUrl,
  heroMobileImageUrl,
  heroDesktopSrcSet,
  heroMobileSrcSet,
} from "./image";
import { heroSlides as fallbackSlides } from "@/data/vadaanya/HeroData";
import { newsItems as fallbackNewsItems } from "@/data/vadaanya/NewsData";
import { galleryEvents as fallbackGalleryEvents } from "@/data/vadaanya/GalleryData";
import { printMediaCollections as fallbackPrintMedia } from "@/data/vadaanya/PrintMediaData";
import { stories as fallbackStories } from "@/data/vadaanya/SuccessStoriesData";
import { milestonesData as fallbackMilestones } from "@/data/vadaanya/MilestonesData";
import { founderProfile as fallbackFounderProfile } from "@/data/vadaanya/FounderData";
import { awardsData as fallbackAwards } from "@/data/vadaanya/AwardsData";
import { fallbackTalentTestGallery } from "@/data/vadaanya/TalentTestData";
import { fallbackCampaignPosters } from "@/data/vadaanya/CampaignPostersData";

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
      crop,
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
      crop,
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
    crop?: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
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
    crop?: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
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
  desktopSrcSet?: string;
  mobileSrcSet?: string;
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
      { next: { revalidate: 3600 } }
    );

    if (sanityData && sanityData.length > 0) {
      return sanityData.map((s, idx) => {
        const isFirstSlide = idx === 0;
        const desktopImg = s.desktopImage;
        const mobileImg = s.mobileImage || s.desktopImage;

        return {
          id: s._id,
          mainHeadingPart1: s.mainHeadingPart1 || "",
          mainHeadingPart2: s.mainHeadingPart2 || "",
          description: s.description || "",
          desktopImageUrl: desktopImg
            ? heroDesktopImageUrl(desktopImg, isFirstSlide)
            : "/vadaanya_team.jpeg",
          mobileImageUrl: mobileImg
            ? heroMobileImageUrl(mobileImg, isFirstSlide)
            : undefined,
          desktopSrcSet: desktopImg
            ? heroDesktopSrcSet(desktopImg, isFirstSlide)
            : undefined,
          mobileSrcSet: mobileImg
            ? heroMobileSrcSet(mobileImg, isFirstSlide)
            : undefined,
          blurDataUrl: s.desktopImage?.asset?.metadata?.lqip,
          imageAlt: `${s.mainHeadingPart1} ${s.mainHeadingPart2}`.trim() || "Hero Image",
          secondaryButtonLabel: s.secondaryButtonLabel || "Success Stories",
          secondaryButtonUrl: s.secondaryButtonUrl || "#stories",
        };
      });
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
  orderRank?: string;
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
      { next: { revalidate: 3600 } }
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
        url,
        metadata {
          lqip
        }
      },
      crop,
      hotspot
    },
    images[] {
      asset-> {
        _id,
        url
      },
      crop,
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
      metadata?: {
        lqip?: string;
      };
    };
    crop?: { top: number; bottom: number; left: number; right: number };
    hotspot?: { x: number; y: number; height: number; width: number };
  };
  images?: Array<{
    asset?: {
      _id: string;
      url: string;
    };
    crop?: { top: number; bottom: number; left: number; right: number };
    hotspot?: { x: number; y: number; height: number; width: number };
  }>;
  orderRank?: string;
}

export interface GalleryEventItem {
  id: string;
  title: string;
  date: string;
  coverImage: string;
  blurDataUrl?: string;
  thumbnails?: string[];
  images: string[];
}

export async function getGalleryEvents(): Promise<GalleryEventItem[]> {
  try {
    const sanityData: SanityGalleryEvent[] = await sanityClient.fetch(
      GALLERY_EVENTS_QUERY,
      {},
      { next: { revalidate: 3600 } }
    );

    if (sanityData && sanityData.length > 0) {
      return sanityData.map((event) => ({
        id: event._id,
        title: event.title || "",
        date: event.date || "",
        blurDataUrl: event.coverImage?.asset?.metadata?.lqip,
        coverImage: event.coverImage
          ? urlFor(event.coverImage).width(720).height(440).fit("crop").auto("format").quality(85).url()
          : "/vadaanya_team.jpeg",
        thumbnails: (event.images || [])
          .map((img) =>
            img?.asset?.url
              ? urlFor(img).width(480).height(480).fit("crop").auto("format").quality(85).url()
              : ""
          )
          .filter(Boolean),
        images: (event.images || [])
          .map((img) =>
            img?.asset?.url
              ? urlFor(img).width(1920).auto("format").quality(88).url()
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
    thumbnails: event.images,
    images: event.images,
  }));
}

/* ───────────────────────────────────────────────
   TALENT TEST GALLERY (ZERO DUPLICATION CDN)
   ─────────────────────────────────────────────── */

export const TALENT_TEST_GALLERY_QUERY = defineQuery(`
  *[_type == "galleryEvent" && (category == "talent-test" || title match "*Talent Test*" || title match "*talent*")] | order(year desc, orderRank asc, _createdAt desc) {
    _id,
    title,
    date,
    category,
    year,
    subCategory,
    coverImage {
      asset-> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      crop,
      hotspot
    },
    images[] {
      asset-> {
        _id,
        url
      },
      crop,
      hotspot
    },
    orderRank
  }
`);

export interface TalentTestGalleryItem {
  id: string;
  title: string;
  date: string;
  year?: string;
  subCategory?: string;
  category?: string;
  coverImage: string;
  blurDataUrl?: string;
  thumbnails?: string[];
  images: string[];
}

export async function getTalentTestGalleryEvents(): Promise<TalentTestGalleryItem[]> {
  try {
    const sanityData = await sanityClient.fetch(
      TALENT_TEST_GALLERY_QUERY,
      {},
      { next: { revalidate: 3600 } }
    );

    if (sanityData && sanityData.length > 0) {
      return sanityData.map((event: any) => ({
        id: event._id,
        title: event.title || "",
        date: event.date || "",
        year: event.year || undefined,
        subCategory: event.subCategory || undefined,
        category: event.category || "talent-test",
        blurDataUrl: event.coverImage?.asset?.metadata?.lqip,
        coverImage: event.coverImage
          ? urlFor(event.coverImage).width(720).height(440).fit("crop").auto("format").quality(85).url()
          : "/vadaanya_team.jpeg",
        thumbnails: (event.images || [])
          .map((img: any) =>
            img?.asset?.url
              ? urlFor(img).width(480).height(480).fit("crop").auto("format").quality(85).url()
              : ""
          )
          .filter(Boolean),
        images: (event.images || [])
          .map((img: any) =>
            img?.asset?.url
              ? urlFor(img).width(1920).auto("format").quality(88).url()
              : ""
          )
          .filter(Boolean),
      }));
    }
  } catch (err) {
    console.error("Failed to fetch Sanity talent test gallery events:", err);
  }

  return fallbackTalentTestGallery.map((album) => ({
    id: album.id,
    title: album.title,
    date: album.date,
    year: album.year,
    subCategory: album.subCategory,
    category: "talent-test",
    coverImage: album.coverImage,
    thumbnails: album.images,
    images: album.images,
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
        url,
        metadata {
          lqip
        }
      },
      crop,
      hotspot
    },
    images[] {
      asset-> {
        _id,
        url
      },
      crop,
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
      metadata?: {
        lqip?: string;
      };
    };
    crop?: { top: number; bottom: number; left: number; right: number };
    hotspot?: { x: number; y: number; height: number; width: number };
  };
  images?: Array<{
    asset?: {
      _id: string;
      url: string;
    };
    crop?: { top: number; bottom: number; left: number; right: number };
    hotspot?: { x: number; y: number; height: number; width: number };
  }>;
  orderRank?: string;
}

export interface PrintMediaCollectionItem {
  id: string;
  title: string;
  language: string;
  date: string;
  coverImage: string;
  blurDataUrl?: string;
  thumbnails?: string[];
  images: string[];
}

export async function getPrintMediaCollections(): Promise<PrintMediaCollectionItem[]> {
  try {
    const sanityData: SanityPrintMediaCollection[] = await sanityClient.fetch(
      PRINT_MEDIA_QUERY,
      {},
      { next: { revalidate: 3600 } }
    );

    if (sanityData && sanityData.length > 0) {
      return sanityData.map((collection) => ({
        id: collection._id,
        title: collection.title || "",
        language: collection.language || "",
        date: collection.date || "",
        blurDataUrl: collection.coverImage?.asset?.metadata?.lqip,
        coverImage: collection.coverImage
          ? urlFor(collection.coverImage).width(720).height(560).fit("crop").auto("format").quality(85).url()
          : "/vadaanya_team.jpeg",
        thumbnails: (collection.images || [])
          .map((img) =>
            img?.asset?.url
              ? urlFor(img).width(500).auto("format").quality(85).url()
              : ""
          )
          .filter(Boolean),
        images: (collection.images || [])
          .map((img) =>
            img?.asset?.url
              ? urlFor(img).width(1920).auto("format").quality(88).url()
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
    thumbnails: collection.images,
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
        url,
        metadata {
          lqip
        }
      },
      crop,
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
      metadata?: {
        lqip?: string;
      };
    };
    crop?: { top: number; bottom: number; left: number; right: number };
    hotspot?: { x: number; y: number; height: number; width: number };
  };
  orderRank?: string;
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
  modalImageUrl?: string;
  blurDataUrl?: string;
  imageAlt: string;
}

export async function getSuccessStories(): Promise<SuccessStoryItem[]> {
  try {
    const sanityData: SanitySuccessStory[] = await sanityClient.fetch(
      SUCCESS_STORIES_QUERY,
      {},
      { next: { revalidate: 3600 } }
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
        blurDataUrl: story.image?.asset?.metadata?.lqip,
        imageUrl: story.image
          ? urlFor(story.image).width(640).height(660).fit("crop").auto("format").quality(85).url()
          : "/about-1.jpg",
        modalImageUrl: story.image
          ? urlFor(story.image).width(1000).auto("format").quality(85).url()
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
  orderRank?: string;
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
      { next: { revalidate: 3600 } }
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

/* ───────────────────────────────────────────────
   FOUNDER PROFILE
   ─────────────────────────────────────────────── */

export const FOUNDER_PROFILE_QUERY = defineQuery(`
  *[_type == "founderProfile"] | order(orderRank asc, _createdAt asc) [0] {
    _id,
    name,
    role,
    linkedInUrl,
    image {
      asset-> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      crop,
      hotspot
    },
    bioParagraphs,
    orderRank
  }
`);

export interface SanityFounderProfile {
  _id: string;
  name: string;
  role: string;
  linkedInUrl?: string;
  image?: {
    asset?: {
      _id: string;
      url: string;
      metadata?: {
        lqip?: string;
      };
    };
    crop?: { top: number; bottom: number; left: number; right: number };
    hotspot?: { x: number; y: number; height: number; width: number };
  };
  bioParagraphs?: string[];
  orderRank?: string;
}

export interface FounderProfileItem {
  id: string;
  name: string;
  role: string;
  linkedInUrl?: string;
  imageUrl: string;
  blurDataUrl?: string;
  bioParagraphs: string[];
}

export async function getFounderProfile(): Promise<FounderProfileItem | null> {
  try {
    const sanityData: SanityFounderProfile | null = await sanityClient.fetch(
      FOUNDER_PROFILE_QUERY,
      {},
      { next: { revalidate: 3600 } }
    );

    if (sanityData) {
      return {
        id: sanityData._id,
        name: sanityData.name || "",
        role: sanityData.role || "",
        linkedInUrl: sanityData.linkedInUrl || undefined,
        imageUrl: sanityData.image
          ? urlFor(sanityData.image).width(800).auto("format").quality(80).url()
          : fallbackFounderProfile.image,
        blurDataUrl: sanityData.image?.asset?.metadata?.lqip,
        bioParagraphs: sanityData.bioParagraphs || fallbackFounderProfile.bioParagraphs,
      };
    }
  } catch (err) {
    console.error("Failed to fetch Sanity founder profile on server:", err);
  }

  return {
    id: "fallback-founder",
    name: fallbackFounderProfile.name,
    role: fallbackFounderProfile.role,
    linkedInUrl: fallbackFounderProfile.linkedInUrl,
    imageUrl: fallbackFounderProfile.image,
    bioParagraphs: fallbackFounderProfile.bioParagraphs,
  };
}

/* ───────────────────────────────────────────────
   AWARDS & HONORS
   ─────────────────────────────────────────────── */

export const AWARDS_QUERY = defineQuery(`
  *[_type == "award"] | order(orderRank asc, _createdAt asc) {
    _id,
    title,
    image {
      asset-> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      crop,
      hotspot
    },
    orderRank
  }
`);

export interface SanityAward {
  _id: string;
  title: string;
  image?: {
    asset?: {
      _id: string;
      url: string;
      metadata?: {
        lqip?: string;
      };
    };
    crop?: { top: number; bottom: number; left: number; right: number };
    hotspot?: { x: number; y: number; height: number; width: number };
  };
  orderRank?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  imageUrl: string;
  blurDataUrl?: string;
}

export async function getAwards(): Promise<AwardItem[]> {
  try {
    const sanityData: SanityAward[] = await sanityClient.fetch(
      AWARDS_QUERY,
      {},
      { next: { revalidate: 3600 } }
    );

    if (sanityData && sanityData.length > 0) {
      return sanityData.map((award) => ({
        id: award._id,
        title: award.title || "",
        imageUrl: award.image
          ? urlFor(award.image).width(800).auto("format").quality(80).url()
          : "/vadaanya_team.jpeg",
        blurDataUrl: award.image?.asset?.metadata?.lqip,
      }));
    }
  } catch (err) {
    console.error("Failed to fetch Sanity awards on server:", err);
  }

  return fallbackAwards.map((award) => ({
    id: String(award.id),
    title: award.title,
    imageUrl: award.image,
  }));
}

/* ───────────────────────────────────────────────
   HOME ABOUT US SECTION
   ─────────────────────────────────────────────── */

export const HOME_ABOUT_QUERY = defineQuery(`
  *[_type == "homeAbout"][0] {
    _id,
    title,
    description,
    image {
      asset-> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      crop,
      hotspot
    },
    statsLabel,
    statsText
  }
`);

export interface SanityHomeAbout {
  _id: string;
  title: string;
  description: string;
  image?: {
    asset?: {
      _id: string;
      url: string;
      metadata?: {
        lqip?: string;
      };
    };
    crop?: { top: number; bottom: number; left: number; right: number };
    hotspot?: { x: number; y: number; height: number; width: number };
  };
  statsLabel: string;
  statsText: string;
}

export interface HomeAboutItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  blurDataUrl?: string;
  statsLabel: string;
  statsText: string;
}

export async function getHomeAbout(): Promise<HomeAboutItem> {
  const fallbackData = {
    id: "fallback-home-about",
    title: "Turning a Government-School Child's Hope into a Degree",
    description: "We are a passionate community of volunteers dedicated to bridging the educational divide. By providing scholarships, mentorship, and essential resources like digital tools, we empower underprivileged students across India to build a brighter, self-reliant future.",
    imageUrl: "/IMG-20230417-WA0004.jpg",
    statsLabel: "15k+",
    statsText: "STUDENTS SUPPORTED",
  };

  try {
    const sanityData: SanityHomeAbout | null = await sanityClient.fetch(
      HOME_ABOUT_QUERY,
      {},
      { next: { revalidate: 3600 } }
    );

    if (sanityData) {
      return {
        id: sanityData._id,
        title: sanityData.title || fallbackData.title,
        description: sanityData.description || fallbackData.description,
        imageUrl: sanityData.image
          ? urlFor(sanityData.image).width(800).auto("format").quality(80).url()
          : fallbackData.imageUrl,
        blurDataUrl: sanityData.image?.asset?.metadata?.lqip,
        statsLabel: sanityData.statsLabel || fallbackData.statsLabel,
        statsText: sanityData.statsText || fallbackData.statsText,
      };
    }
  } catch (err) {
    console.error("Failed to fetch Sanity home about data on server:", err);
  }

  return fallbackData;
}

/* ───────────────────────────────────────────────
   CAMPAIGN POSTERS
   ─────────────────────────────────────────────── */

export const CAMPAIGN_POSTERS_QUERY = defineQuery(`
  *[_type == "campaignPoster"] | order(orderRank asc, _createdAt desc) {
    _id,
    title,
    description,
    date,
    category,
    posterImage {
      asset-> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      crop,
      hotspot,
      alt
    }
  }
`);

export interface SanityCampaignPoster {
  _id: string;
  title: string;
  description?: string;
  date?: string;
  category?: string;
  posterImage?: {
    asset?: {
      _id: string;
      url: string;
      metadata?: {
        lqip?: string;
      };
    };
    crop?: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
    alt?: string;
  };
}

export interface CampaignPosterItem {
  id: string;
  title: string;
  description: string;
  posterImage: string;
  alt: string;
  date?: string;
  category?: string;
  blurDataUrl?: string;
}

export async function getCampaignPosters(): Promise<CampaignPosterItem[]> {
  const fallback = fallbackCampaignPosters.map((poster) => ({
    id: poster.id,
    title: poster.title,
    description: poster.description,
    posterImage: poster.posterImage,
    alt: poster.alt,
    date: poster.date,
    category: poster.category,
    blurDataUrl: poster.blurDataUrl,
  }));

  try {
    const sanityPosters: SanityCampaignPoster[] = await sanityClient.fetch(
      CAMPAIGN_POSTERS_QUERY,
      {},
      { next: { revalidate: 0 } }
    );

    if (sanityPosters && sanityPosters.length > 0) {
      return sanityPosters.map((poster, index) => {
        const imageUrl = poster.posterImage?.asset
          ? urlFor(poster.posterImage).width(900).auto("format").quality(85).url()
          : fallback[index % fallback.length]?.posterImage || "/talent-test/talent_hero.jpg";

        return {
          id: poster._id,
          title: poster.title || `Campaign Poster ${index + 1}`,
          description: poster.description || "",
          posterImage: imageUrl,
          alt: poster.posterImage?.alt || poster.title || "Vadaanya Campaign Poster",
          date: poster.date,
          category: poster.category,
          blurDataUrl: poster.posterImage?.asset?.metadata?.lqip,
        };
      });
    }
  } catch (err) {
    console.error("Failed to fetch Sanity campaign posters on server:", err);
  }

  return fallback;
}

/* ───────────────────────────────────────────────
   TALENT TEST PAGE SINGLETON
   ─────────────────────────────────────────────── */

export interface TalentTestAnnouncement {
  title: string;
  desc: string;
  actionLabel?: string;
  actionType?: "anchor" | "link" | "none" | "modal";
  href?: string;
  image?: string | any;
  date?: string;
  tag?: string;
}

export interface TalentTestStatData {
  value: string;
  label: string;
  sublabel?: string;
}

export interface TalentTestStepData {
  step: string;
  title: string;
  desc: string;
}

export interface TalentTestEquityTierData {
  tier: string;
  medal?: string;
  title: string;
  desc: string;
  rewardVal: string;
  rewardSub?: string;
}

export interface TalentTestScholarData {
  name: string;
  airRank: string;
  categoryRank?: string;
  college: string;
  imageUrl?: string;
  blurDataUrl?: string;
}

export interface TalentTestFaqData {
  question: string;
  answer: string;
}

export interface TalentTestAboutImage {
  url: string;
  alt?: string;
  blurDataUrl?: string;
}

export interface TalentTestPageData {
  announcements: TalentTestAnnouncement[];
  aboutEyebrow?: string;
  aboutTitle?: string;
  aboutParagraphs?: string[];
  aboutImages?: TalentTestAboutImage[];
  stats: TalentTestStatData[];
  howItWorksEyebrow?: string;
  howItWorksHeading?: string;
  howItWorksLead?: string;
  howItWorksSteps: TalentTestStepData[];
  equityEyebrow?: string;
  equityHeading?: string;
  equityDescription?: string;
  equityTiers: TalentTestEquityTierData[];
  iitEyebrow?: string;
  iitHeading?: string;
  iitLead?: string;
  iitScholars: TalentTestScholarData[];
  faqEyebrow?: string;
  faqHeading?: string;
  faqs: TalentTestFaqData[];
}

export const TALENT_TEST_PAGE_QUERY = defineQuery(`
  *[_type == "talentTestPage" && _id in ["talentTestPage-main", "drafts.talentTestPage-main"]] | order(_updatedAt desc)[0] {
    announcements[] {
      title,
      desc,
      actionLabel,
      actionType,
      href,
      date,
      image {
        asset-> {
          _id,
          url,
          metadata {
            lqip
          }
        },
        crop,
        hotspot
      }
    },
    aboutEyebrow,
    aboutTitle,
    aboutParagraphs,
    aboutImages[] {
      "url": asset->url,
      alt,
      "blurDataUrl": asset->metadata.lqip
    },
    stats[] {
      value,
      label,
      sublabel
    },
    howItWorksEyebrow,
    howItWorksHeading,
    howItWorksLead,
    howItWorksSteps[] {
      step,
      title,
      desc
    },
    equityEyebrow,
    equityHeading,
    equityDescription,
    equityTiers[] {
      tier,
      medal,
      title,
      desc,
      rewardVal,
      rewardSub
    },
    iitEyebrow,
    iitHeading,
    iitLead,
    iitScholars[] {
      name,
      airRank,
      categoryRank,
      college,
      image {
        asset-> {
          _id,
          url,
          metadata {
            lqip
          }
        },
        crop,
        hotspot
      }
    },
    faqEyebrow,
    faqHeading,
    faqs[] {
      question,
      answer
    }
  }
`);

export const fallbackTalentTestAnnouncements: TalentTestAnnouncement[] = [
  {
    title: "5-Year Solved Booklet (2021–2025)",
    desc: "Official 100-page bilingual question bank & analytical reasoning solutions.",
    actionLabel: "Open PDF ↗",
    actionType: "link",
    href: "/talent-test/vadaanya-talent-test-booklet.pdf",
    image: "/talent-test/talent_test_booklet_image.jpg",
    date: "01 Feb 2025",
  },
  {
    title: "2026 Test Details & Inquiries",
    desc: "Free entry for Class 9 & 10 rural government school students across AP & Telangana.",
    actionLabel: "Contact Us →",
    actionType: "link",
    href: "/contact",
    image: "/events/Digital Teaching at High School/01-1.jpg",
    date: "15 Jan 2025",
  },
  {
    title: "3 Scholars in Premier IITs",
    desc: "Rural talent cracking JEE Advanced with AIR 377, AIR 2619 & AIR 3563 national ranks.",
    actionLabel: "View IIT Alumni →",
    actionType: "anchor",
    href: "#alumni",
    image: "/Ashok.jpg",
    date: "20 Dec 2024",
  },
  {
    title: "State Merit Felicitations",
    desc: "Merit laptops, certificates, and cash scholarship awards for mandal champions.",
    actionLabel: "View Photo Archives →",
    actionType: "anchor",
    href: "#gallery",
    image: "/events/Brostal Event Vizag/01.jpg",
    date: "05 Dec 2024",
  },
  {
    title: "Standardized OMR Exam Pattern",
    desc: "Simulates national competitive entrance exams with computerized evaluation.",
    actionLabel: "How It Works →",
    actionType: "anchor",
    href: "#how-it-works",
    image: "/talent_test.jpg",
    date: "18 Nov 2024",
  },
];

export const fallbackHowItWorksSteps: TalentTestStepData[] = [
  {
    step: "01",
    title: "Free Registration",
    desc: "Government school students register online or via school headmasters at zero fee.",
  },
  {
    step: "02",
    title: "Study Material",
    desc: "Free 100-page bilingual analytical reasoning booklets & solved previous year papers.",
  },
  {
    step: "03",
    title: "OMR Examination",
    desc: "Standardized offline exam held at designated government mandal examination centers.",
  },
  {
    step: "04",
    title: "Fast OMR Scoring",
    desc: "Automated optical scanner evaluation ensuring 100% fair, transparent, same-day verification.",
  },
  {
    step: "05",
    title: "3-Tier Awards",
    desc: "District, mandal, and school toppers recognized with direct cash awards, trophies, and medals.",
  },
  {
    step: "06",
    title: "Long-Term Sponsorship",
    desc: "Top scholars receive intermediate college tuition, IIT-JEE coaching fees, laptops, and mentorship.",
  },
];

export const fallbackEquityTiers: TalentTestEquityTierData[] = [
  {
    tier: "Tier 1",
    medal: "🥇",
    title: "District Top 20",
    desc: "Best across all mandals; no mandal repeats",
    rewardVal: "₹15,000 – ₹25,000",
    rewardSub: "Trophy & Merit Certificate",
  },
  {
    tier: "Tier 2",
    medal: "🥈",
    title: "Mandal Topper (40)",
    desc: "Top scorer per mandal, not already above",
    rewardVal: "₹5,000",
    rewardSub: "Trophy & Merit Certificate",
  },
  {
    tier: "Tier 3",
    medal: "🥉",
    title: "School Topper (~250)",
    desc: "One topper per school, not already above",
    rewardVal: "₹500 – ₹1,000",
    rewardSub: "Trophy & Merit Certificate",
  },
  {
    tier: "Tier 4",
    medal: "📜",
    title: "All Participants",
    desc: "Every student who attempts the examination",
    rewardVal: "Digital Certificate",
    rewardSub: "E-Certificate of Participation",
  },
];

export const fallbackIitScholars: TalentTestScholarData[] = [
  {
    name: "Jugesh Kumar",
    airRank: "AIR 377",
    categoryRank: "Category Rank 58",
    college: "Indian Institute of Technology (IIT)",
    imageUrl: "/talent-test/talent_hero.jpg",
  },
  {
    name: "Thulasi Karthik",
    airRank: "AIR 2619",
    categoryRank: "Category Rank 499",
    college: "Indian Institute of Technology (IIT)",
    imageUrl: "/talent-test/talent_test_image.JPG",
  },
  {
    name: "Yaswanth Kumar",
    airRank: "AIR 3563",
    categoryRank: "Category Rank 405",
    college: "Indian Institute of Technology (IIT)",
    imageUrl: "/events/Digital Teaching at High School/01-1.jpg",
  },
];

export async function getTalentTestPageData(): Promise<TalentTestPageData> {
  const fallback: TalentTestPageData = {
    announcements: fallbackTalentTestAnnouncements,
    aboutEyebrow: "Our Annual Flagship Exam",
    aboutTitle: "About the Talent Test",
    aboutParagraphs: [
      "For five consecutive years (2021–2025), Vadaanya Janaa Society has conducted the Vadaanya Talent Test — an offline, standardized OMR examination provided 100% free of charge to thousands of government school students across Andhra Pradesh and Telangana.",
      "Over 15,000 students have taken part, with 500+ deserving scholars awarded district and mandal cash prizes, trophies, and continuous scholarships all the way from rural village classrooms to premier institutions like IITs and NITs.",
    ],
    aboutImages: [
      {
        url: "/talent-test/talent_hero.jpg",
        alt: "Students taking the Vadaanya Talent Test",
      },
      {
        url: "/talent-test/talent_header_bg.jpg",
        alt: "Vadaanya Talent Test 2022 Felicitation Ceremony",
      },
      {
        url: "/talent-test/talent_test_image.JPG",
        alt: "Government school students writing the Talent Test",
      },
    ],
    stats: [
      {
        value: "15,000+",
        label: "Students Tested",
        sublabel: "Across 5 completed annual cycles (2021–2025)",
      },
      {
        value: "500+",
        label: "Students Rewarded",
        sublabel: "Direct cash awards, medals & merit certificates",
      },
      {
        value: "400+",
        label: "Scholarships",
        sublabel: "Long-term academic & digital enablement support",
      },
      {
        value: "3",
        label: "IIT-JEE National Ranks",
        sublabel: "Alumni cracking India's most competitive exam",
      },
    ],
    howItWorksEyebrow: "THE ANNUAL CYCLE",
    howItWorksHeading: "How the Talent Test Works",
    howItWorksLead:
      "A structured six-step cycle connecting free student registration to long-term collegiate support.",
    howItWorksSteps: fallbackHowItWorksSteps,
    equityEyebrow: "FAIR EVALUATION",
    equityHeading: "Recognition, Built for Equity",
    equityDescription:
      "Introduced in 2024, this four-tier model recognises that a strong score in a drought-prone mandal deserves the same respect as one from a resource-rich area. Roughly 280 non-overlapping prizes and digital certificates for all participants are awarded each cycle.",
    equityTiers: fallbackEquityTiers,
    iitEyebrow: "NATIONAL ACADEMIC SUCCESS",
    iitHeading: "From Government Classrooms to IITs",
    iitLead:
      "Vadaanya Talent Test scholars who proved that rural government-school students can crack India's toughest entrance exams with the right mentorship.",
    iitScholars: fallbackIitScholars,
    faqEyebrow: "FAQ",
    faqHeading: "Frequently Asked Questions",
    faqs: [
      {
        question: "Who is eligible to participate in the Vadaanya Talent Test?",
        answer:
          "All students currently enrolled in government, Zilla Parishad (ZPHS), municipal, and social welfare residential schools from Class 6 to Class 10 across Andhra Pradesh and Telangana are eligible.",
      },
      {
        question: "Is there any registration or exam fee?",
        answer:
          "No. The talent test is 100% free for all students and government schools. Study booklets, OMR sheets, exam materials, and award ceremonies are fully funded by Vadaanya and our donors.",
      },
      {
        question: "What is the medium and question pattern of the examination?",
        answer:
          "The exam is bilingual (Telugu & English). It consists of objective multiple-choice questions (MCQs) covering Non-Verbal Reasoning, Mental Ability, Quantitative Aptitude, General Science, and Basic Mathematics.",
      },
      {
        question: "How does the four-tier equity prize system work?",
        answer:
          "Introduced in 2024, the model awards District Top 20 (₹15,000–₹25,000), Mandal Champions (₹5,000 each across ~40 mandals), School Toppers (₹500–₹1,000 per school), and verified Digital Participation Certificates for all students who attempt the exam. No student wins twice in top tiers, ensuring approximately 280 distinct students win cash awards each cycle.",
      },
      {
        question: "How can students and schools prepare for the upcoming exam?",
        answer:
          "Students can download our official 5-Year Question Papers & Solutions Booklet (2021–2025) PDF directly on this page and attend pre-exam orientation sessions organized in participating schools.",
      },
    ],
  };

  try {
    const data: any = await sanityClient.fetch(
      TALENT_TEST_PAGE_QUERY,
      {},
      { next: { revalidate: 0 } }
    );

    if (data) {
      return {
        announcements:
          data.announcements && data.announcements.length > 0
            ? data.announcements
            : fallback.announcements,
        aboutEyebrow: data.aboutEyebrow || fallback.aboutEyebrow,
        aboutTitle: data.aboutTitle || fallback.aboutTitle,
        aboutParagraphs:
          data.aboutParagraphs && data.aboutParagraphs.length > 0
            ? data.aboutParagraphs
            : fallback.aboutParagraphs,
        aboutImages:
          data.aboutImages && data.aboutImages.length > 0
            ? data.aboutImages.map((img: any) => ({
                url: img.url,
                alt: img.alt || "Vadaanya Talent Test photo",
                blurDataUrl: img.blurDataUrl,
              }))
            : fallback.aboutImages,
        stats: data.stats && data.stats.length > 0 ? data.stats : fallback.stats,
        howItWorksEyebrow: data.howItWorksEyebrow || fallback.howItWorksEyebrow,
        howItWorksHeading: data.howItWorksHeading || fallback.howItWorksHeading,
        howItWorksLead: data.howItWorksLead || fallback.howItWorksLead,
        howItWorksSteps:
          data.howItWorksSteps && data.howItWorksSteps.length > 0
            ? data.howItWorksSteps
            : fallback.howItWorksSteps,
        equityEyebrow: data.equityEyebrow || fallback.equityEyebrow,
        equityHeading: data.equityHeading || fallback.equityHeading,
        equityDescription: data.equityDescription || fallback.equityDescription,
        equityTiers:
          data.equityTiers && data.equityTiers.length > 0
            ? data.equityTiers
            : fallback.equityTiers,
        iitEyebrow: data.iitEyebrow || fallback.iitEyebrow,
        iitHeading: data.iitHeading || fallback.iitHeading,
        iitLead: data.iitLead || fallback.iitLead,
        iitScholars:
          data.iitScholars && data.iitScholars.length > 0
            ? data.iitScholars.map((sc: any, idx: number) => {
                const img = sc.image?.asset
                  ? urlFor(sc.image).width(600).height(600).fit("crop").auto("format").quality(85).url()
                  : fallback.iitScholars[idx % fallback.iitScholars.length]?.imageUrl;
                return {
                  name: sc.name,
                  airRank: sc.airRank,
                  categoryRank: sc.categoryRank,
                  college: sc.college || "Indian Institute of Technology (IIT)",
                  imageUrl: img,
                  blurDataUrl: sc.image?.asset?.metadata?.lqip,
                };
              })
            : fallback.iitScholars,
        faqEyebrow: data.faqEyebrow || fallback.faqEyebrow,
        faqHeading: data.faqHeading || fallback.faqHeading,
        faqs: data.faqs && data.faqs.length > 0 ? data.faqs : fallback.faqs,
      };
    }
  } catch (err) {
    console.error("Failed to fetch Sanity talent test page data on server:", err);
  }

  return fallback;
}



