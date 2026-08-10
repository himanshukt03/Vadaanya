export interface HeroSlide {
  id: number;
  headline: string;
  headlineAccent?: string;
  subtext: string;
  imageUrl: string;
  imageAlt: string;
  cta?: { label: string; href: string };
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    headline: "From Government Schools to",
    headlineAccent: "Graduation",
    subtext: "Vadaanya Janaa Society bridges the gap between a child's potential and a degree — through talent tests, scholarships and mentorship across AP & Telangana.",
    imageUrl: "/hero-1.jpg",
    imageAlt: "Students studying together in a classroom",
    cta: { label: "Our Mission", href: "#about" },
  },
  {
    id: 2,
    headline: "Celebrating",
    headlineAccent: "Student Excellence",
    subtext: "Prize distribution ceremonies honouring top performers in the Vadaanya Talent Test — inspiring the next generation of achievers.",
    imageUrl: "/hero-2.jpg",
    imageAlt: "Prize distribution ceremony for students",
    cta: { label: "Success Stories", href: "#stories" },
  },
  {
    id: 3,
    headline: "Building a",
    headlineAccent: "Community of Hope",
    subtext: "Our annual events bring students, mentors and partners together — celebrating resilience, ambition and community solidarity across 12 districts.",
    imageUrl: "/hero-3.jpg",
    imageAlt: "Community gathering event with students and mentors",
    cta: { label: "What We Do", href: "/about#whatwedo" },
  },
  {
    id: 4,
    headline: "Laptops That",
    headlineAccent: "Open Doors",
    subtext: "Donating laptops to meritorious students so digital access never becomes a barrier to higher education and career opportunities.",
    imageUrl: "/hero-4.jpg",
    imageAlt: "Student receiving laptop donation",
    cta: { label: "Support This Cause", href: "#donate" },
  },
  {
    id: 5,
    headline: "The Vadaanya",
    headlineAccent: "Talent Test",
    subtext: "A statewide scholarship examination spotlighting hidden talent in government schools — endorsed by the AP Education Ministry.",
    imageUrl: "/hero-5.jpg",
    imageAlt: "Students writing the Vadaanya Talent Test",
    cta: { label: "Apply Now", href: "#news" },
  },
  {
    id: 6,
    headline: "Education is a",
    headlineAccent: "Right, Not a Privilege",
    subtext: "Supporting students from Class 10 through post-graduation — because no child should stop dreaming because their family cannot afford a textbook.",
    imageUrl: "/hero-6.jpg",
    imageAlt: "Graduate celebrating her degree",
    cta: { label: "Donate Now", href: "#donate" },
  },
];
