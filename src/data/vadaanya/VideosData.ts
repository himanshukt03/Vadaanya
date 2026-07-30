export interface Video {
  id: number;
  videoId: string; // YouTube video ID
  title: string;
  description: string;
}

export const videos: Video[] = [
  {
    id: 1,
    videoId: "dMH0bHeiRNg",
    title: "Vadaanya 13th Anniversary Celebrations",
    description: "The Hindu covers Vadaanya Janaa Society's 13th anniversary — a celebration of 15 years of educational impact across AP & Telangana.",
  },
  {
    id: 2,
    videoId: "xvFZjo5PgG0",
    title: "AP Education Minister Unveils Talent Test Poster",
    description: "Andhra Pradesh Education Minister inaugurates the annual Vadaanya Talent Test poster, endorsing statewide outreach to government-school students.",
  },
  {
    id: 3,
    videoId: "oHg5SJYRHA0",
    title: "Prize Distribution Ceremony 2023",
    description: "Honouring top performers of the Vadaanya Talent Test — students from 12 districts receive scholarships, laptops, and certificates.",
  },
  {
    id: 4,
    videoId: "RgKAFK5djSk",
    title: "Unstoppable — Annual Community Event",
    description: "The Unstoppable event brings together students, mentors, donors and alumni to reaffirm Vadaanya's commitment to social education.",
  },
  {
    id: 5,
    videoId: "L_jWHffIx5E",
    title: "Laptop Donation Drive",
    description: "Vadaanya donates laptops to meritorious students, closing the digital divide for first-generation learners in rural Andhra Pradesh.",
  },
  {
    id: 6,
    videoId: "fLexgOxsZu0",
    title: "Collaboration with Visually Challenged Students",
    description: "Vadaanya's outreach extends beyond mainstream education — supporting differently-abled students with adaptive learning resources.",
  },
  {
    id: 7,
    videoId: "YykjpeuMNEk",
    title: "Student Testimonials — From Dream to Degree",
    description: "Hear directly from Vadaanya beneficiaries — their journeys from government schools to railways, medicine, engineering and beyond.",
  },
  {
    id: 8,
    videoId: "OPf0YbXqDm0",
    title: "Volunteer Training Day 2023",
    description: "Annual training for Vadaanya volunteers and mentors — building capacity to support 5,000+ students across 12 districts.",
  },
];
