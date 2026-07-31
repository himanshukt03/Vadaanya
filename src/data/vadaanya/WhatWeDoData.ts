export interface Pillar {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const pillars: Pillar[] = [
  {
    id: 1,
    icon: "talent",
    title: "Talent tests",
    description:
      "The Srinivasa Ramanujan Talent Test finds bright students in government schools — and rewards what others overlook.",
  },
  {
    id: 2,
    icon: "scholarships",
    title: "Scholarships",
    description:
      "Direct financial help keeps students in school through their family's hardest years.",
  },
  {
    id: 6,
    icon: "school",
    title: "School adoption",
    description:
      "We upgrade whole government schools with digital learning tools for lasting impact.",
  },
  {
    id: 3,
    icon: "digital",
    title: "Digital access",
    description:
      "Laptops given to students who had never owned one, turning distant courses into daily habits.",
  },
  {
    id: 4,
    icon: "mentorship",
    title: "Mentorship",
    description:
      "Weekend sessions with leaders, officers and professionals show students what their effort can become.",
  },
  {
    id: 5,
    icon: "prep",
    title: "Government-exam prep",
    description:
      "Our mock exams prepare aspirants for secure government roles in teaching and police forces.",
  },
];
