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


