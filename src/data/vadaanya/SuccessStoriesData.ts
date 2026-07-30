export type StoryCategory =
  | "All"
  | "Railway"
  | "Horticulture"
  | "Constable"
  | "CA"
  | "Army"
  | "Agriculture"
  | "Engineering"
  | "Medicine";

export interface SuccessStory {
  id: number;
  name: string;
  category: Exclude<StoryCategory, "All">;
  caption: string;
  year: string;
  imageUrl: string;
  imageAlt: string;
  accentColor?: "gold" | "green"; // badge colour
}

export const categories: StoryCategory[] = [
  "All", "Railway", "Horticulture", "Constable", "CA",
  "Army", "Agriculture", "Engineering", "Medicine",
];

export const stories: SuccessStory[] = [
  {
    id: 1,
    name: "Ravi Kumar",
    category: "Railway",
    caption: "Secured Group-D Railway post after Vadaanya scholarship funded his coaching fees and study materials.",
    year: "2023",
    imageUrl: "/classmates-learning-together-group-study.jpg",
    imageAlt: "Ravi Kumar — Railway success story",
    accentColor: "gold",
  },
  {
    id: 2,
    name: "Padma Lakshmi",
    category: "Horticulture",
    caption: "First in her village to earn a BSc Horticulture degree; now leads a model farm under NABARD.",
    year: "2022",
    imageUrl: "/about-1.jpg",
    imageAlt: "Padma Lakshmi — Horticulture success story",
    accentColor: "green",
  },
  {
    id: 3,
    name: "Srikanth Reddy",
    category: "Constable",
    caption: "Selected as AP Police Constable; credits Vadaanya's physical fitness training and mock-test series.",
    year: "2023",
    imageUrl: "/classmates-learning-together-group-study.jpg",
    imageAlt: "Srikanth Reddy — Police Constable success story",
    accentColor: "gold",
  },
  {
    id: 4,
    name: "Anitha Devi",
    category: "CA",
    caption: "Cleared CA Final on second attempt — Vadaanya's grant covered article-ship fees and ICAI study material.",
    year: "2022",
    imageUrl: "/about-1.jpg",
    imageAlt: "Anitha Devi — CA success story",
    accentColor: "green",
  },
  {
    id: 5,
    name: "Venkat Naidu",
    category: "Army",
    caption: "Commissioned as a Junior Commissioned Officer; Vadaanya's physical and academic support made it possible.",
    year: "2021",
    imageUrl: "/classmates-learning-together-group-study.jpg",
    imageAlt: "Venkat Naidu — Army success story",
    accentColor: "gold",
  },
  {
    id: 6,
    name: "Bhavani",
    category: "Agriculture",
    caption: "Leads a women's self-help group with organic-farming training funded through Vadaanya's agriculture grants.",
    year: "2023",
    imageUrl: "/about-1.jpg",
    imageAlt: "Bhavani — Agriculture success story",
    accentColor: "green",
  },
  {
    id: 7,
    name: "Mohan Rao",
    category: "Engineering",
    caption: "B.Tech from JNTUK; placed at Infosys. First engineer from his government-school village in Krishna district.",
    year: "2022",
    imageUrl: "/classmates-learning-together-group-study.jpg",
    imageAlt: "Mohan Rao — Engineering success story",
    accentColor: "gold",
  },
  {
    id: 8,
    name: "Sunitha",
    category: "Medicine",
    caption: "MBBS at NTR University of Health Sciences — Vadaanya's scholarship covered her entire five-year tuition.",
    year: "2022",
    imageUrl: "/about-1.jpg",
    imageAlt: "Sunitha — Medicine success story",
    accentColor: "green",
  },
  {
    id: 9,
    name: "Kiran Kumar",
    category: "Railway",
    caption: "Junior Engineer (Civil) in South Central Railway — a Vadaanya Talent Test winner from Class 10.",
    year: "2021",
    imageUrl: "/classmates-learning-together-group-study.jpg",
    imageAlt: "Kiran Kumar — Railway success story",
    accentColor: "gold",
  },
];
