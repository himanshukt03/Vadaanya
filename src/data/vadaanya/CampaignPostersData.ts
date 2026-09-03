export interface CampaignPosterData {
  id: string;
  title: string;
  description: string;
  posterImage: string;
  alt: string;
  date?: string;
  category?: string;
  blurDataUrl?: string;
}

export const fallbackCampaignPosters: CampaignPosterData[] = [
  {
    id: "sample-poster-1",
    title: "Vadaanya Talent Test 2026 Awareness Poster",
    description: "Official awareness and student outreach campaign poster for Vadaanya Talent Test 2026. Empowering bright minds from rural and government schools with scholarships, laptops, and premier IIT mentorship.",
    posterImage: "/talent-test/talent_hero.jpg",
    alt: "Vadaanya Talent Test 2026 Awareness Poster",
    date: "January 2026",
    category: "Talent Test",
  },
];
