export interface NewsItem {
  id: number;
  date: string;
  tag: string;
  title: string;
  description: string;
  link?: string;
  linkLabel?: string;
}

export const newsItems: NewsItem[] = [
  {
    id: 1,
    date: "Dec 2024",
    tag: "Exam Results",
    title: "DSC Talent Test Results 2024 — District-wise Toppers Announced",
    description:
      "The Vadaanya District Selection Committee (DSC) Talent Test results for 2024 are now published. Students from 12 districts can download their hall tickets and check scores using their registration numbers.",
    link: "https://vadaanya.org/dsc-results",
    linkLabel: "View Results",
  },
  {
    id: 2,
    date: "Nov 2024",
    tag: "Hall Tickets",
    title: "Hall Tickets Available for the 2025 Vadaanya Talent Test",
    description:
      "Registered students for the 2025 Vadaanya Talent Test can now download their admit cards. The test will be conducted across all 12 participating districts simultaneously.",
    link: "https://vadaanya.org/hall-ticket",
    linkLabel: "Download Hall Ticket",
  },
  {
    id: 3,
    date: "Oct 2024",
    tag: "Syllabus",
    title: "2025 Talent Test Syllabus & Exam Pattern Released",
    description:
      "The official syllabus for the Vadaanya Talent Test 2025 has been published. Covering subjects from Mathematics, Science, and Aptitude — candidates from Classes 8–10 are eligible to apply.",
    link: "https://vadaanya.org/syllabus",
    linkLabel: "Download Syllabus",
  },
  {
    id: 4,
    date: "Sep 2024",
    tag: "Press",
    title: "The Hindu Covers Vadaanya's 13th Anniversary Celebrations",
    description:
      "The Hindu newspaper covered Vadaanya Janaa Society's 13th annual celebration, highlighting over 5,000 students supported, 800+ scholarships awarded, and the organisation's pioneering social entrepreneurship model.",
    link: "https://www.thehindu.com/news/national/andhra-pradesh/vadaanya-janaa-society-13th-anniversary",
    linkLabel: "Read in The Hindu",
  },
  {
    id: 5,
    date: "Jul 2024",
    tag: "Government Recognition",
    title: "AP Education Minister Inaugurates Vadaanya Talent Test Poster",
    description:
      "Andhra Pradesh Education Minister unveiled the official poster for the Vadaanya Talent Test at a state-level ceremony, commending the society's contribution to bridging educational inequity in government schools.",
  },
  {
    id: 6,
    date: "Mar 2024",
    tag: "Applications Open",
    title: "Scholarship Applications Open for the 2024–25 Academic Year",
    description:
      "Vadaanya Janaa Society has opened applications for its annual scholarship programme. Eligible students — from Class 1 through post-graduation — can apply through their school principals or district coordinators.",
    link: "https://vadaanya.org/apply",
    linkLabel: "Apply for Scholarship",
  },
];
