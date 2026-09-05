import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

// Load .env.local if token is not already in environment
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const idx = trimmed.indexOf("=");
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "b4t4r5i2";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-08";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("❌ SANITY_API_WRITE_TOKEN is required in .env.local or process environment");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

/* ─── Helpers ─── */
async function uploadImage(filePath: string): Promise<string | null> {
  try {
    const fullPath = path.join(process.cwd(), "public", filePath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️ Image not found: ${fullPath}`);
      return null;
    }
    const buffer = fs.readFileSync(fullPath);
    const asset = await client.assets.upload("image", buffer, {
      filename: path.basename(filePath),
    });
    console.log(`📤 Uploaded image: ${asset._id} (${path.basename(filePath)})`);
    return asset._id;
  } catch (err) {
    console.error(`❌ Failed to upload ${filePath}:`, err);
    return null;
  }
}

function imageRef(assetId: string | null) {
  if (!assetId) return undefined;
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
  };
}

async function seedTalentTestPage() {
  console.log(`\n🎓 Seeding Talent Test Page (talentTestPage-main)...`);

  // Upload student images for the 3 IIT Scholars
  console.log("Uploading scholar student photos...");
  const scholar1Img = await uploadImage("team vadaanya/5.jpg");
  const scholar2Img = await uploadImage("team vadaanya/6.jpg");
  const scholar3Img = await uploadImage("team vadaanya/7.jpg");

  // Upload about slideshow photos
  console.log("Uploading about slideshow photos...");
  const aboutImg1 = await uploadImage("talent-test/talent_hero.jpg");
  const aboutImg2 = await uploadImage("talent-test/talent_header_bg.jpg");
  const aboutImg3 = await uploadImage("talent-test/talent_test_image.JPG");

  // Upload announcement card photos
  console.log("Uploading announcement card photos...");
  const newsImg1 = await uploadImage("talent-test/talent_test_booklet_image.jpg");
  const newsImg2 = await uploadImage("events/Digital Teaching at High School/01-1.jpg");
  const newsImg3 = await uploadImage("Ashok.jpg");
  const newsImg4 = await uploadImage("events/Brostal Event Vizag/01.jpg");
  const newsImg5 = await uploadImage("talent_test.jpg");

  const doc = {
    _id: "talentTestPage-main",
    _type: "talentTestPage",
    announcements: [
      {
        _key: "announcement-1",
        title: "5-Year Solved Booklet (2021–2025)",
        desc: "Official 100-page bilingual question bank & solutions.",
        date: "01 Feb 2025",
        ...(newsImg1 ? imageRef(newsImg1) : {}),
        actionLabel: "Open PDF ↗",
        actionType: "link",
        href: "/talent-test/vadaanya-talent-test-booklet.pdf",
      },
      {
        _key: "announcement-2",
        title: "2026 Test Details & Inquiries",
        desc: "Free entry for Class 9 & 10 rural students.",
        date: "15 Jan 2025",
        ...(newsImg2 ? imageRef(newsImg2) : {}),
        actionLabel: "Contact Us →",
        actionType: "link",
        href: "/contact",
      },
      {
        _key: "announcement-3",
        title: "3 Scholars in Premier IITs",
        desc: "AIR 377, AIR 2619 & AIR 3563 national ranks.",
        date: "20 Dec 2024",
        ...(newsImg3 ? imageRef(newsImg3) : {}),
        actionLabel: "View IIT Alumni →",
        actionType: "anchor",
        href: "#alumni",
      },
      {
        _key: "announcement-4",
        title: "State Merit Felicitations",
        desc: "Merit laptops, certificates & cash scholarship awards.",
        date: "05 Dec 2024",
        ...(newsImg4 ? imageRef(newsImg4) : {}),
        actionLabel: "View Photo Archives →",
        actionType: "anchor",
        href: "#gallery",
      },
      {
        _key: "announcement-5",
        title: "Standardized OMR Exam Pattern",
        desc: "Simulates national competitive entrance exams.",
        date: "18 Nov 2024",
        ...(newsImg5 ? imageRef(newsImg5) : {}),
        actionLabel: "How It Works →",
        actionType: "anchor",
        href: "#how-it-works",
      },
    ],
    aboutEyebrow: "Our Annual Flagship Exam",
    aboutTitle: "About the Talent Test",
    aboutParagraphs: [
      "For five consecutive years (2021–2025), Vadaanya Janaa Society has conducted the **Vadaanya Talent Test** — an offline, standardized OMR examination provided 100% free of charge to thousands of government school students across Andhra Pradesh and Telangana.",
      "Over **15,000 students** have taken part, with **500+ deserving scholars** awarded district and mandal cash prizes, trophies, and continuous scholarships all the way from rural village classrooms to premier institutions like IITs and NITs.",
    ],
    aboutImages: [
      aboutImg1 && {
        _key: "about-img-1",
        ...imageRef(aboutImg1),
        alt: "Students taking the Vadaanya Talent Test",
      },
      aboutImg2 && {
        _key: "about-img-2",
        ...imageRef(aboutImg2),
        alt: "Vadaanya Talent Test 2022 Felicitation Ceremony",
      },
      aboutImg3 && {
        _key: "about-img-3",
        ...imageRef(aboutImg3),
        alt: "Government school students writing the Talent Test",
      },
    ].filter(Boolean),
    stats: [
      {
        _key: "stat-1",
        value: "15,000+",
        label: "Students Tested",
        sublabel: "Across 5 completed annual cycles (2021–2025)",
      },
      {
        _key: "stat-2",
        value: "500+",
        label: "Students Rewarded",
        sublabel: "Direct cash awards, medals & merit certificates",
      },
      {
        _key: "stat-3",
        value: "400+",
        label: "Scholarships",
        sublabel: "Long-term academic & digital enablement support",
      },
      {
        _key: "stat-4",
        value: "3",
        label: "IIT-JEE National Ranks",
        sublabel: "Alumni cracking India's most competitive exam",
      },
    ],
    howItWorksEyebrow: "THE ANNUAL CYCLE",
    howItWorksHeading: "How the Talent Test Works",
    howItWorksLead:
      "A structured six-step cycle connecting free student registration to long-term collegiate support.",
    howItWorksSteps: [
      {
        _key: "step-1",
        step: "01",
        title: "Free Registration",
        desc: "Government school students register online or via school headmasters at zero fee.",
      },
      {
        _key: "step-2",
        step: "02",
        title: "Study Material",
        desc: "Free 100-page bilingual analytical reasoning booklets & solved previous year papers.",
      },
      {
        _key: "step-3",
        step: "03",
        title: "OMR Examination",
        desc: "Standardized offline exam held at designated government mandal examination centers.",
      },
      {
        _key: "step-4",
        step: "04",
        title: "Fast OMR Scoring",
        desc: "Automated optical scanner evaluation ensuring 100% fair, transparent, same-day verification.",
      },
      {
        _key: "step-5",
        step: "05",
        title: "3-Tier Awards",
        desc: "District, mandal, and school toppers recognized with direct cash awards, trophies, and medals.",
      },
      {
        _key: "step-6",
        step: "06",
        title: "Long-Term Sponsorship",
        desc: "Top scholars receive intermediate college tuition, IIT-JEE coaching fees, laptops, and mentorship.",
      },
    ],
    equityEyebrow: "FAIR EVALUATION",
    equityHeading: "Recognition, Built for Equity",
    equityDescription:
      "Introduced in 2024, this three-tier model recognises that a strong score in a drought-prone mandal deserves the same respect as one from a resource-rich area. Roughly 280 non-overlapping prizes are awarded each cycle.",
    equityTiers: [
      {
        _key: "tier-1",
        tier: "Tier 1",
        medal: "🥇",
        title: "District Top 20",
        desc: "Best across all mandals; no mandal repeats",
        rewardVal: "₹15,000 – ₹25,000",
        rewardSub: "Trophy & Merit Certificate",
      },
      {
        _key: "tier-2",
        tier: "Tier 2",
        medal: "🥈",
        title: "Mandal Topper (40)",
        desc: "Top scorer per mandal, not already above",
        rewardVal: "₹5,000",
        rewardSub: "Trophy & Merit Certificate",
      },
      {
        _key: "tier-3",
        tier: "Tier 3",
        medal: "🥉",
        title: "School Topper (~250)",
        desc: "One topper per school, not already above",
        rewardVal: "₹500 – ₹1,000",
        rewardSub: "Trophy & Merit Certificate",
      },
    ],
    iitEyebrow: "NATIONAL ACADEMIC SUCCESS",
    iitHeading: "From Government Classrooms to IITs",
    iitLead:
      "Vadaanya Talent Test scholars who proved that rural government-school students can crack India's toughest entrance exams with the right mentorship.",
    iitScholars: [
      {
        _key: "scholar-1",
        name: "Jugesh Kumar",
        airRank: "AIR 377",
        categoryRank: "Category Rank 58",
        college: "Indian Institute of Technology (IIT)",
        image: imageRef(scholar1Img),
      },
      {
        _key: "scholar-2",
        name: "Thulasi Karthik",
        airRank: "AIR 2619",
        categoryRank: "Category Rank 499",
        college: "Indian Institute of Technology (IIT)",
        image: imageRef(scholar2Img),
      },
      {
        _key: "scholar-3",
        name: "Yaswanth Kumar",
        airRank: "AIR 3563",
        categoryRank: "Category Rank 405",
        college: "Indian Institute of Technology (IIT)",
        image: imageRef(scholar3Img),
      },
    ],
    faqEyebrow: "FAQ",
    faqHeading: "Frequently Asked Questions",
    faqs: [
      {
        _key: "faq-1",
        question: "Who is eligible to participate in the Vadaanya Talent Test?",
        answer:
          "All students currently enrolled in government, Zilla Parishad (ZPHS), municipal, and social welfare residential schools from Class 6 to Class 10 across Andhra Pradesh and Telangana are eligible.",
      },
      {
        _key: "faq-2",
        question: "Is there any registration or exam fee?",
        answer:
          "No. The talent test is 100% free for all students and government schools. Study booklets, OMR sheets, exam materials, and award ceremonies are fully funded by Vadaanya and our donors.",
      },
      {
        _key: "faq-3",
        question: "What is the medium and question pattern of the examination?",
        answer:
          "The exam is bilingual (Telugu & English). It consists of objective multiple-choice questions (MCQs) covering Non-Verbal Reasoning, Mental Ability, Quantitative Aptitude, General Science, and Basic Mathematics.",
      },
      {
        _key: "faq-4",
        question: "How does the three-tier equity prize system work?",
        answer:
          "Introduced in 2024, the model awards District Top 20 (₹15,000–₹25,000), Mandal Champions (₹5,000 each across ~40 mandals), and School Toppers (₹500–₹1,000 per school). No student wins twice, ensuring approximately 280 distinct students win awards each cycle.",
      },
      {
        _key: "faq-5",
        question: "How can students and schools prepare for the upcoming exam?",
        answer:
          "Students can download our official 5-Year Question Papers & Solutions Booklet (2021–2025) PDF directly on this page and attend pre-exam orientation sessions organized in participating schools.",
      },
    ],
  };

  await client.createOrReplace(doc);
  console.log(`✅ Talent Test Page singleton (talentTestPage-main) seeded successfully!`);
}

async function main() {
  console.log("🌱 Starting Sanity seed for Talent Test Page...");
  await seedTalentTestPage();
  console.log("\n🎉 Done!");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
