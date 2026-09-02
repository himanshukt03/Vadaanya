export interface TalentTestStat {
  value: string;
  label: string;
  sublabel: string;
  iconName?: string;
}

export interface HowItWorksStep {
  step: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  details: string[];
  icon: string;
}

export interface EquityTier {
  tier: string;
  title: string;
  qualifier: string;
  reward: string;
  perks: string[];
  badgeColor: string;
  accentColor: string;
  winnerCount: string;
}

export interface IitAlumnus {
  name: string;
  airRank: string;
  categoryRank: string;
  college?: string;
  image?: string;
  bio: string;
  quote?: string;
}

export interface TalentTestMilestone {
  year: string;
  title: string;
  description: string;
  metrics?: string;
}

export interface TalentTestFallbackAlbum {
  id: string;
  title: string;
  date: string;
  year: string;
  subCategory: string;
  coverImage: string;
  images: string[];
}

export interface TalentTestFaq {
  question: string;
  answer: string;
}

/* ───────────────────────────────────────────────
   STATS & HIGH-LEVEL HIGHLIGHTS
   ─────────────────────────────────────────────── */
export const talentTestStats: TalentTestStat[] = [
  {
    value: "15,000+",
    label: "Students Tested",
    sublabel: "Across 5 completed annual cycles (2021–2025)",
  },
  {
    value: "500+",
    label: "Students Rewarded",
    sublabel: "Direct cash awards, medals & merit certificates",
  },
  {
    value: "400+",
    label: "Scholarships & Laptops",
    sublabel: "Long-term academic & digital enablement support",
  },
  {
    value: "3",
    label: "IIT-JEE National Ranks",
    sublabel: "Alumni cracking India's most competitive exam",
  },
];

/* ───────────────────────────────────────────────
   THE 6-STEP ANNUAL ARCHITECTURE
   ─────────────────────────────────────────────── */
export const howItWorksSteps: HowItWorksStep[] = [
  {
    step: "01",
    title: "Identify & Register",
    badge: "Level Playing Field",
    tagline: "Free access for every rural government student",
    description:
      "Rural government schools across mandals are mapped. Students register through their school or directly online — capturing student details, school, and class at zero cost to the family.",
    details: [
      "100% free registration across all participating mandals",
      "Schools mapped with district and mandal administration",
      "Instant digital registration confirmation & SMS updates",
    ],
    icon: "ClipboardCheck",
  },
  {
    step: "02",
    title: "Equip & Prepare",
    badge: "Skill Enablement",
    tagline: "100-page analytical reasoning course & mentoring",
    description:
      "Every registered student receives a structured 100-page reasoning study booklet, solved previous year papers (2021–2025), and access to volunteer mentor orientation sessions.",
    details: [
      "Bilingual study material (Telugu & English)",
      "Focus on logical reasoning, mental ability, math & science",
      "Live mentor guidance and sample paper walkthroughs",
    ],
    icon: "BookOpen",
  },
  {
    step: "03",
    title: "Sit the Test",
    badge: "Standardized Exam",
    tagline: "Offline, OMR-based evaluation at mandal centres",
    description:
      "Students sit an offline, OMR-based standardized test at designated mandal exam centers. The OMR format ensures a transparent, competitive environment matching national entrance standards.",
    details: [
      "Held across dedicated government school center hubs",
      "Standardized bilingual OMR bubble answer sheets",
      "Invigilated by neutral volunteer educators & society members",
    ],
    icon: "GraduationCap",
  },
  {
    step: "04",
    title: "Fast & Fair Evaluation",
    badge: "Zero Human Error",
    tagline: "High-speed OMR scanners mark 4,000+ sheets in 3 hours",
    description:
      "Bubble sheets are processed using automated high-speed optical mark readers (OMR). Approximately 4,000 papers are scanned and verified within 3 hours with complete mathematical accuracy.",
    details: [
      "Automated optical scanning eliminates grading bias",
      "Rapid result tabulation across school, mandal & district tiers",
      "Digital scorecards prepared for transparent verification",
    ],
    icon: "ScanLine",
  },
  {
    step: "05",
    title: "Recognise & Award",
    badge: "Three-Tier Equity",
    tagline: "~280 non-overlapping awards presented annually",
    description:
      "Results are published across three equitable tiers (District Top 20, Mandal Toppers, and School Champions). Winners receive cash rewards, official trophies, and certificates in grand ceremonies.",
    details: [
      "District Top 20 receive ₹15,000–₹25,000 each",
      "Mandal Champions receive ₹5,000 each",
      "Every participating school topper receives cash & medal",
    ],
    icon: "Award",
  },
  {
    step: "06",
    title: "Sustain & Multiply",
    badge: "Long-Term Impact",
    tagline: "Scholarships, laptops & coaching through college",
    description:
      "Winning is just the beginning. Vadaanya supports top students through Intermediate, IIT-JEE coaching, and degree courses with laptops, tuition support, and weekly mentoring. Alumni return as future donors.",
    details: [
      "Intermediate and college tuition fee sponsorships",
      "High-performance laptops for engineering aspirants",
      "Self-sustaining alumni ecosystem giving back to the next batch",
    ],
    icon: "Repeat",
  },
];

/* ───────────────────────────────────────────────
   RECOGNITION BUILT FOR EQUITY (3 TIERS)
   ─────────────────────────────────────────────── */
export const equityTiers: EquityTier[] = [
  {
    tier: "Tier 1",
    title: "District Top 20",
    qualifier: "Best scores across all mandals (no mandal repeats)",
    reward: "₹15,000 – ₹25,000",
    winnerCount: "Top 20 Students",
    badgeColor: "gold",
    accentColor: "#f2a712",
    perks: [
      "₹15,000 to ₹25,000 Direct Cash Scholarship",
      "Grand District Champion Trophy & Gold Certificate",
      "Direct sponsorship eligibility for Intermediate & IIT-JEE coaching",
      "Personalised academic mentorship from IIT/NIT alumni",
    ],
  },
  {
    tier: "Tier 2",
    title: "Mandal Toppers",
    qualifier: "#1 scorer in each mandal (not already in District Top)",
    reward: "₹5,000",
    winnerCount: "~40 Mandal Champions",
    badgeColor: "cyan",
    accentColor: "#38bdf8",
    perks: [
      "₹5,000 Direct Cash Award per Mandal Topper",
      "Official Mandal Topper Trophy & Merit Certificate",
      "Guaranteed entry into annual Vadaanya Mentorship Cohort",
      "Study kit and digital learning resources",
    ],
  },
  {
    tier: "Tier 3",
    title: "School Toppers",
    qualifier: "Top scorer in each participating government school",
    reward: "₹500 – ₹1,000",
    winnerCount: "~250 School Winners",
    badgeColor: "emerald",
    accentColor: "#10b981",
    perks: [
      "₹500 to ₹1,000 Cash Encouragement Prize",
      "School Champion Medal & Official Certificate",
      "Recognition at school morning assembly & local press",
      "Free access to next year's advanced reasoning workshops",
    ],
  },
];

/* ───────────────────────────────────────────────
   HALL OF FAME (IIT ALUMNI & TESTIMONIALS)
   ─────────────────────────────────────────────── */
export const iitAlumni: IitAlumnus[] = [
  {
    name: "Jugesh Kumar",
    airRank: "AIR 377",
    categoryRank: "Category Rank 58",
    college: "Indian Institute of Technology (IIT)",
    bio: "Government school student from rural Anantapur who stood as a Vadaanya Talent Test topper and went on to conquer JEE Advanced with an All India Rank of 377.",
    quote:
      "Vadaanya's test gave me the confidence that rural government students are no less capable than corporate school students.",
  },
  {
    name: "Thulasi Karthik",
    airRank: "AIR 2619",
    categoryRank: "Category Rank 499",
    college: "Indian Institute of Technology (IIT)",
    bio: "Talent test scholar who received continuous academic sponsorship and guidance to secure admission into India's premier engineering institution.",
    quote:
      "The scholarship relieved my family of financial stress during my critical 2-year Intermediate preparation.",
  },
  {
    name: "Yaswanth Kumar",
    airRank: "AIR 3563",
    categoryRank: "Category Rank 405",
    college: "Indian Institute of Technology (IIT)",
    bio: "Discovered through the mandal talent test, supported with study material, mentoring, and financial aid to crack JEE Advanced.",
    quote:
      "I got sponsorship through the Vadaanya Talent Test. Now in Intermediate, my fees are covered, and I'm preparing for IIT-JEE Mains.",
  },
];

export const talentTestTestimonials = [
  {
    quote:
      "As daily wage earners in a rural village, we never imagined our son could study in an IIT. Vadaanya discovered his talent in the school exam, paid his intermediate coaching fees, and gave our family hope when we had none.",
    author: "Father of IIT-JEE Scholar",
    role: "Rural Farming Background, Anantapur District",
  },
  {
    quote:
      "When my daughter received the mandal topper cash award and trophy, our entire village celebrated. That early encouragement gave her the confidence to dream big and prepare for top state competitive exams.",
    author: "Mother of Talent Test Mandal Champion",
    role: "Parent of Government High School Scholar",
  },
  {
    quote:
      "Vadaanya did not just give a prize for one day; they supported my son throughout his +2 studies with study materials, a laptop, and mentorship. Today our family's future is completely transformed.",
    author: "Anjinappa",
    role: "Proud Parent of Talent Test Beneficiary",
  },
];

/* ───────────────────────────────────────────────
   5-YEAR ROADMAP & EVOLUTION (2021–2026)
   ─────────────────────────────────────────────── */
export const talentTestMilestones: TalentTestMilestone[] = [
  {
    year: "2021",
    title: "Inaugural Talent Test Launch",
    description:
      "The first Vadaanya Talent Test was held across select government high schools in Andhra Pradesh and Telangana, testing 1,500+ students.",
    metrics: "1,500+ Students · 50 Schools",
  },
  {
    year: "2022",
    title: "Mandal Center Scaled Testing",
    description:
      "Scaled dramatically: 4,200 students sat the OMR examination across six centralized hubs in a single Sunday, standardizing exam operations.",
    metrics: "4,200+ Students · 6 Mega Centers",
  },
  {
    year: "2023",
    title: "DSC & Competitive Exam Mocks",
    description:
      "Expanded curriculum to include free mock-test series for government teacher recruitment (DSC) and competitive examinations.",
    metrics: "3,500+ Aspirants · 80+ Centers",
  },
  {
    year: "2024",
    title: "3-Tier Mandal Equity Model",
    description:
      "Introduced the equitable 3-tier award structure (~280 prizes) ensuring drought-prone mandals get fair representation alongside larger towns.",
    metrics: "4,800+ Students · ~280 Cash Awards",
  },
  {
    year: "2025–26",
    title: "15th Anniversary & Digital Portal",
    description:
      "Celebrating 15 years of Vadaanya Janaa Society with a self-service digital platform for instant hall tickets, OMR scorecards, and multi-district scale.",
    metrics: "15,000+ Total Tested · Statewide Rollout",
  },
];

/* ───────────────────────────────────────────────
   FALLBACK GALLERY ALBUMS (2021–2024)
   ─────────────────────────────────────────────── */
export const fallbackTalentTestGallery: TalentTestFallbackAlbum[] = [
  {
    id: "tt-2024-exam",
    title: "Talent Test 2024 — Exam Centers & OMR Testing",
    date: "December 2024",
    year: "2024",
    subCategory: "Exam Day",
    coverImage: "/events/Digital Teaching at High School/01-1.jpg",
    images: [
      "/events/Digital Teaching at High School/01-1.jpg",
      "/events/Digital Teaching at High School/02-1.jpg",
      "/events/Digital Teaching at High School/03-1.jpg",
      "/events/Digital Teaching at High School/04-1.jpg",
      "/events/Digital Teaching at High School/05-1.jpg",
      "/events/Digital Teaching at High School/06-1.jpg",
      "/events/Digital Teaching at High School/07-1.jpg",
    ],
  },
  {
    id: "tt-2024-awards",
    title: "Talent Test 2024 — Grand Prize Distribution",
    date: "December 2024",
    year: "2024",
    subCategory: "Prize Distribution",
    coverImage: "/events/Brostal Event Vizag/01.jpg",
    images: [
      "/events/Brostal Event Vizag/01.jpg",
      "/events/Brostal Event Vizag/02.jpg",
      "/events/Brostal Event Vizag/03.jpg",
      "/events/Brostal Event Vizag/04.jpg",
      "/events/Brostal Event Vizag/05.jpg",
      "/events/Brostal Event Vizag/06.jpg",
    ],
  },
  {
    id: "tt-2023-all",
    title: "Talent Test 2023 — OMR Exam & Cash Awards",
    date: "November 2023",
    year: "2023",
    subCategory: "Prize Distribution",
    coverImage: "/events/Digital Teaching at Primary School/01-2.jpg",
    images: [
      "/events/Digital Teaching at Primary School/01-2.jpg",
      "/events/Digital Teaching at Primary School/02-2.jpg",
      "/events/Digital Teaching at Primary School/03-2.jpg",
      "/events/Digital Teaching at Primary School/04-2.jpg",
      "/events/Digital Teaching at Primary School/05-2.jpg",
    ],
  },
  {
    id: "tt-2022-exam",
    title: "Talent Test 2022 — Mega Sunday Exam (4,200 Students)",
    date: "November 2022",
    year: "2022",
    subCategory: "Exam Day",
    coverImage: "/events/Mahatma Gandhi Museum Visit/01-3.jpg",
    images: [
      "/events/Mahatma Gandhi Museum Visit/01-3.jpg",
      "/events/Mahatma Gandhi Museum Visit/02-3.jpg",
      "/events/Mahatma Gandhi Museum Visit/03-3.jpg",
      "/events/Mahatma Gandhi Museum Visit/04-3.jpg",
    ],
  },
  {
    id: "tt-2021-launch",
    title: "Talent Test 2021 — Inaugural Exam & Felicitation",
    date: "December 2021",
    year: "2021",
    subCategory: "General",
    coverImage: "/events/Vadaanya T-Shirt Launch/01-4.jpg",
    images: [
      "/events/Vadaanya T-Shirt Launch/01-4.jpg",
      "/events/Vadaanya T-Shirt Launch/02-4.jpg",
      "/events/Vadaanya T-Shirt Launch/03-4.jpg",
    ],
  },
];

/* ───────────────────────────────────────────────
   FAQS
   ─────────────────────────────────────────────── */
export const talentTestFaqs: TalentTestFaq[] = [
  {
    question: "Who is eligible to participate in the Vadaanya Talent Test?",
    answer:
      "All students currently enrolled in government, Zilla Parishad (ZPHS), municipal, and social welfare residential schools from Class 6 to Class 10 across Andhra Pradesh and Telangana are eligible.",
  },
  {
    question: "Is there any registration or exam fee?",
    answer:
      "No. The talent test is 100% free for all students and government schools. Study booklets, OMR sheets, exam materials, and award ceremonies are fully funded by Vadaanya Janaa Society and our donors.",
  },
  {
    question: "What is the medium and question pattern of the examination?",
    answer:
      "The exam is bilingual (Telugu & English). It consists of objective multiple-choice questions (MCQs) covering Non-Verbal Reasoning, Mental Ability, Quantitative Aptitude, General Science, and Basic Mathematics.",
  },
  {
    question: "How does the three-tier equity prize system work?",
    answer:
      "Introduced in 2024, the model awards District Top 20 (₹15,000–₹25,000), Mandal Champions (₹5,000 each across ~40 mandals), and School Toppers (₹500–₹1,000 per school). No student wins twice, ensuring approximately 280 distinct students win awards each cycle.",
  },
  {
    question: "How can students and schools prepare for the upcoming exam?",
    answer:
      "Students can download our official 5-Year Question Papers & Solutions Booklet (2021–2025) PDF directly on this page and attend pre-exam orientation sessions organized in participating schools.",
  },
];
