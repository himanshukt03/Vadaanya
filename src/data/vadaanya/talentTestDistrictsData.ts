export interface DistrictInfo {
  id: "ATP" | "SSS";
  name: string;
  code: string;
  quota: number;
  registeredCount: number;
  mandals: string[];
}

export const DISTRICTS_DATA: Record<"ATP" | "SSS", DistrictInfo> = {
  ATP: {
    id: "ATP",
    name: "Anantapur",
    code: "ATP",
    quota: 4000,
    registeredCount: 3142,
    mandals: [
      "Anantapur Urban",
      "Anantapur Rural",
      "Atmakur",
      "Beluguppa",
      "Bommanahal",
      "Brahmasamudram",
      "Bukkarayasamudram",
      "D.Hirehal",
      "Garladinne",
      "Gooty",
      "Gummagatta",
      "Guntakal",
      "Kalyandurg",
      "Kambadur",
      "Kanaganapalli",
      "Kudair",
      "Kundurpi",
      "Narpala",
      "Pamidi",
      "Peddapappur",
      "Peddavadugur",
      "Putlur",
      "Rapthadu",
      "Rayadurg",
      "Settur",
      "Singanamala",
      "Tadipatri",
      "Uravakonda",
      "Vajrakarur",
      "Vidapanakal",
      "Yadiki",
      "Yellanur",
    ],
  },
  SSS: {
    id: "SSS",
    name: "Sri Sathya Sai",
    code: "SSS",
    quota: 4000,
    registeredCount: 2890,
    mandals: [
      "Agali",
      "Amadagur",
      "Amarapuram",
      "Bathalapalle",
      "Bukkapatnam",
      "Chennekothapalle",
      "Chilamathur",
      "Dharmavaram",
      "Gandlapenta",
      "Gorantla",
      "Gudibanda",
      "Hindupur",
      "Kadiri",
      "Tadimarri",
      "Kothacheruvu",
      "Lepakshi",
      "Madakasira",
      "Mudigubba",
      "Nallacheruvu",
      "Nallamada",
      "Nambulapulakunta",
      "Obuladevaracheruvu (ODC)",
      "Parigi",
      "Penukonda",
      "Puttaparthi",
      "Ramagiri",
      "Roddam",
      "Rolla",
      "Somandepalle",
      "Talupula",
      "Tanakal",
    ],
  },
};

export const getSchoolsForMandal = (districtName: string, mandalName: string): string[] => {
  if (!mandalName) return [];
  return [
    `ZPHS (Zilla Parishad High School), ${mandalName}`,
    `Government High School (Boys), ${mandalName}`,
    `Government High School (Girls), ${mandalName}`,
    `AP Model School & Junior College, ${mandalName}`,
    `KGBV (Kasturba Gandhi Balika Vidyalaya), ${mandalName}`,
    `Municipal High School, ${mandalName}`,
  ];
};

export const STREAM_OPTIONS = [
  { id: "MPC", name: "MPC (Maths, Physics, Chemistry)", desc: "Engineering, Tech, Architecture & Physical Sciences" },
  { id: "BiPC", name: "BiPC (Biology, Physics, Chemistry)", desc: "Medicine, Pharmacy, Agriculture & Life Sciences" },
  { id: "CEC", name: "CEC (Commerce, Economics, Civics)", desc: "Chartered Accountancy, Banking, Business & Commerce" },
  { id: "HEC", name: "HEC (History, Economics, Civics)", desc: "Civil Services, Law, Journalism & Humanities" },
  { id: "Polytechnic", name: "Polytechnic / Diploma", desc: "Mechanical, Electrical, Civil & Computer Engineering" },
  { id: "Undecided", name: "Undecided / Exploring", desc: "Open to career counseling and guidance" },
];

export const VOCATIONAL_OPTIONS = [
  { id: "Electrical", name: "Electrical Work & Electronics", desc: "Home wiring, motor rewinding & solar maintenance" },
  { id: "Painting", name: "Interior & Commercial Painting", desc: "Surface finishing, waterproofing & modern coating" },
  { id: "Plumbing", name: "Plumbing & Sanitation Systems", desc: "Piping, water filtration & sanitary installation" },
  { id: "Carpentry", name: "Carpentry & Modern Woodcraft", desc: "Furniture fabrication & modular woodwork" },
  { id: "None", name: "Academic Focus Only", desc: "Not interested in vocational training currently" },
];

export const DUMMY_EXISTING_RECORD = {
  aadhaar: "9999 8888 7777",
  regNo: "V26-ATP-B0016",
  studentName: "B. Sai Teja",
  relativeName: "B. Ramanjaneyulu",
  gender: "MALE",
  studentClass: "Class 10",
  district: "Anantapur",
  mandal: "Gooty",
  village: "Gooty",
  school: "ZPHS (Zilla Parishad High School), Gooty",
  whatsapp: "9848022338",
  stream: "MPC",
  registeredAt: "02 Oct 2026, 11:30 AM",
};
