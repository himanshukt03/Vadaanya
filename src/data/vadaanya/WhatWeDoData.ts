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
      "The Srinivasa Ramanujan Talent Test finds bright Class 9 & 10 students in government schools — and rewards what others overlook.",
  },
  {
    id: 2,
    icon: "scholarships",
    title: "Scholarships",
    description:
      "Direct financial help keeps a student in school through a family's hardest year. Over 400 supported so far.",
  },
  {
    id: 3,
    icon: "digital",
    title: "Digital access",
    description:
      "More than 180 laptops placed in the hands of students who had never owned one — turning a distant course into a daily habit.",
  },
  {
    id: 4,
    icon: "mentorship",
    title: "Mentorship",
    description:
      "Weekend sessions with leaders, officers and professionals — 50 and counting — show students what their effort can become.",
  },
  {
    id: 5,
    icon: "prep",
    title: "Government-exam prep",
    description:
      "Our DSC (SGT) Grand Test and mock exams prepare aspirants for teaching and police jobs — 30+ into secure government roles.",
  },
  {
    id: 6,
    icon: "school",
    title: "School adoption",
    description:
      "We upgrade whole government schools with digital learning tools, so the change outlasts any single class.",
  },
];
