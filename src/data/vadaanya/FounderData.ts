export interface FounderProfile {
  name: string;
  role: string;
  linkedInUrl: string;
  image: string;
  bioParagraphs: string[];
}

export const founderProfile: FounderProfile = {
  name: "Ashok Padapati",
  role: "Lead QA Engineer, OpenText",
  linkedInUrl: "https://www.linkedin.com/in/ashok-padapati-67277b50/",
  image: "/ashok_founder.jpeg",
  bioParagraphs: [
    "Ashok Padapati is an Engineering graduate from SASTRA University with over 16 years of experience in the IT industry. He currently works in a Quality Assurance leadership role, bringing technical expertise and team guidance to Vadaanya.",
    "Growing up in Kothacheruvu, Andhra Pradesh, Ashok developed a strong passion for education and social entrepreneurship. In 2010, alongside a dedicated founding group of friends who pledged 0.5% of their monthly salaries, he established Vadaanya to support deserving students from financially disadvantaged backgrounds.",
    "For over 15 years, Ashok has guided Vadaanya as part of a collective team effort. Working closely with volunteers, mentors, and regional coordinators, the entire Vadaanya team unites to provide scholarships, talent development, and financial assistance to government school students.",
  ],
};
