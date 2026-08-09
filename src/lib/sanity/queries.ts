import { defineQuery } from "next-sanity";
import { sanityClient } from "./client";
import { desktopImageUrl, mobileImageUrl } from "./image";
import { heroSlides as fallbackSlides } from "@/data/vadaanya/HeroData";

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
