import { DISTRICTS_DATA, getSchoolsForMandal } from "./talentTestDistrictsData";

export interface AdminKPIs {
  totalTarget: number;
  confirmedCount: number;
  pendingDraftsCount: number;
  conversionRate: number;
  participatingSchools: number;
  totalSchools: number;
  todayVelocity: number;
  atpQuota: number;
  atpRegistered: number;
  sssQuota: number;
  sssRegistered: number;
}

export interface FunnelStepData {
  stepId: string;
  name: string;
  subtitle: string;
  count: number;
  dropOffCount: number;
  dropOffRate: number;
  conversionRate: number;
  color: string;
}

export interface RegisteredStudent {
  id: string;
  regNo: string;
  fullName: string;
  relativeName: string;
  gender: "MALE" | "FEMALE";
  studentClass: "Class 9" | "Class 10";
  districtId: "ATP" | "SSS";
  districtName: string;
  mandal: string;
  schoolName: string;
  schoolCategory: "ZPHS" | "Model School" | "KGBV" | "Govt High School";
  whatsapp: string;
  aadhaarLast4: string;
  stream: string;
  vocationalInterest: string;
  status: "COMPLETED" | "PENDING";
  currentStep: number;
  registeredAt: string;
}

export interface SchoolOutreachRecord {
  id: string;
  schoolName: string;
  udiseCode: string;
  category: "ZPHS" | "Model School" | "KGBV" | "Govt High School";
  districtId: "ATP" | "SSS";
  districtName: string;
  mandal: string;
  completedCount: number;
  pendingCount: number;
  isRedFlag: boolean; // < 5 completed registrations after mid-campaign
  hmName: string;
  hmPhone: string;
}

export const ADMIN_KPIS: AdminKPIs = {
  totalTarget: 8000,
  confirmedCount: 6032,
  pendingDraftsCount: 412,
  conversionRate: 93.6,
  participatingSchools: 348,
  totalSchools: 384,
  todayVelocity: 218,
  atpQuota: 4000,
  atpRegistered: 3142,
  sssQuota: 4000,
  sssRegistered: 2890,
};

export const FUNNEL_STEPS: FunnelStepData[] = [
  {
    stepId: "step0",
    name: "Verification Gate",
    subtitle: "Aadhaar & Mobile",
    count: 6444,
    dropOffCount: 0,
    dropOffRate: 0,
    conversionRate: 100,
    color: "#3b82f6",
  },
  {
    stepId: "step1",
    name: "Personal Profile",
    subtitle: "Student Details",
    count: 6252,
    dropOffCount: 192,
    dropOffRate: 3.0,
    conversionRate: 97.0,
    color: "#0284c7",
  },
  {
    stepId: "step2",
    name: "School & Location",
    subtitle: "Mandal & School",
    count: 6092,
    dropOffCount: 160,
    dropOffRate: 2.6,
    conversionRate: 97.4,
    color: "#f59e0b",
  },
  {
    stepId: "step3",
    name: "Final Confirmation",
    subtitle: "Registration Complete",
    count: 6032,
    dropOffCount: 60,
    dropOffRate: 1.0,
    conversionRate: 99.0,
    color: "#10b981",
  },
];

export const MOCK_STUDENTS: RegisteredStudent[] = [
  {
    id: "st-001",
    regNo: "V26-ATP-A0469",
    fullName: "K. Harika",
    relativeName: "K. Venkatesulu",
    gender: "FEMALE",
    studentClass: "Class 10",
    districtId: "ATP",
    districtName: "Anantapur",
    mandal: "Tadipatri",
    schoolName: "ZPHS (Zilla Parishad High School), Tadipatri",
    schoolCategory: "ZPHS",
    whatsapp: "9876543210",
    aadhaarLast4: "5678",
    stream: "MPC",
    vocationalInterest: "Academic Focus Only",
    status: "COMPLETED",
    currentStep: 3,
    registeredAt: "05 Oct 2026, 03:20 pm",
  },
  {
    id: "st-002",
    regNo: "V26-ATP-A0470",
    fullName: "M. Sai Charan",
    relativeName: "M. Ramana Reddy",
    gender: "MALE",
    studentClass: "Class 10",
    districtId: "ATP",
    districtName: "Anantapur",
    mandal: "Gooty",
    schoolName: "Government High School (Boys), Gooty",
    schoolCategory: "Govt High School",
    whatsapp: "9701234567",
    aadhaarLast4: "8912",
    stream: "BiPC",
    vocationalInterest: "Electrical",
    status: "COMPLETED",
    currentStep: 3,
    registeredAt: "05 Oct 2026, 02:45 pm",
  },
  {
    id: "st-003",
    regNo: "V26-SSS-B0112",
    fullName: "P. Bhavani",
    relativeName: "P. Narayana",
    gender: "FEMALE",
    studentClass: "Class 9",
    districtId: "SSS",
    districtName: "Sri Sathya Sai",
    mandal: "Dharmavaram",
    schoolName: "KGBV (Kasturba Gandhi Balika Vidyalaya), Dharmavaram",
    schoolCategory: "KGBV",
    whatsapp: "9440123890",
    aadhaarLast4: "4321",
    stream: "HEC",
    vocationalInterest: "Painting",
    status: "COMPLETED",
    currentStep: 3,
    registeredAt: "05 Oct 2026, 02:15 pm",
  },
  {
    id: "st-004",
    regNo: "V26-SSS-B0113",
    fullName: "B. Tarun Kumar",
    relativeName: "B. Shivaiah",
    gender: "MALE",
    studentClass: "Class 10",
    districtId: "SSS",
    districtName: "Sri Sathya Sai",
    mandal: "Kadiri",
    schoolName: "AP Model School & Junior College, Kadiri",
    schoolCategory: "Model School",
    whatsapp: "9988776655",
    aadhaarLast4: "1098",
    stream: "MPC",
    vocationalInterest: "Plumbing",
    status: "COMPLETED",
    currentStep: 3,
    registeredAt: "05 Oct 2026, 01:50 pm",
  },
  {
    id: "st-005",
    regNo: "V26-ATP-A0471",
    fullName: "G. Anitha",
    relativeName: "G. Mallikarjuna",
    gender: "FEMALE",
    studentClass: "Class 10",
    districtId: "ATP",
    districtName: "Anantapur",
    mandal: "Uravakonda",
    schoolName: "Government High School (Girls), Uravakonda",
    schoolCategory: "Govt High School",
    whatsapp: "9123456780",
    aadhaarLast4: "6543",
    stream: "BiPC",
    vocationalInterest: "Academic Focus Only",
    status: "COMPLETED",
    currentStep: 3,
    registeredAt: "05 Oct 2026, 01:10 pm",
  },
  {
    id: "st-006",
    regNo: "V26-ATP-A0472",
    fullName: "T. Rajesh",
    relativeName: "T. Chandra Sekhar",
    gender: "MALE",
    studentClass: "Class 9",
    districtId: "ATP",
    districtName: "Anantapur",
    mandal: "Kalyandurg",
    schoolName: "ZPHS (Zilla Parishad High School), Kalyandurg",
    schoolCategory: "ZPHS",
    whatsapp: "9848022334",
    aadhaarLast4: "7711",
    stream: "MEC",
    vocationalInterest: "Carpentry",
    status: "COMPLETED",
    currentStep: 3,
    registeredAt: "05 Oct 2026, 12:40 pm",
  },
  {
    id: "st-007",
    regNo: "V26-SSS-B0114",
    fullName: "S. Reshma",
    relativeName: "S. Mehaboob Basha",
    gender: "FEMALE",
    studentClass: "Class 10",
    districtId: "SSS",
    districtName: "Sri Sathya Sai",
    mandal: "Hindupur",
    schoolName: "Government High School (Girls), Hindupur",
    schoolCategory: "Govt High School",
    whatsapp: "9959112233",
    aadhaarLast4: "3388",
    stream: "MPC",
    vocationalInterest: "Academic Focus Only",
    status: "COMPLETED",
    currentStep: 3,
    registeredAt: "05 Oct 2026, 12:15 pm",
  },
  {
    id: "st-008",
    regNo: "V26-ATP-A0473",
    fullName: "V. Naveen",
    relativeName: "V. Peddanna",
    gender: "MALE",
    studentClass: "Class 10",
    districtId: "ATP",
    districtName: "Anantapur",
    mandal: "Guntakal",
    schoolName: "AP Model School & Junior College, Guntakal",
    schoolCategory: "Model School",
    whatsapp: "9618099887",
    aadhaarLast4: "9944",
    stream: "MPC",
    vocationalInterest: "Electrical",
    status: "COMPLETED",
    currentStep: 3,
    registeredAt: "05 Oct 2026, 11:55 am",
  },
  {
    id: "st-009",
    regNo: "PENDING-ATP-0091",
    fullName: "K. Latha",
    relativeName: "K. Obulesu",
    gender: "FEMALE",
    studentClass: "Class 9",
    districtId: "ATP",
    districtName: "Anantapur",
    mandal: "Kundurpi",
    schoolName: "ZPHS, Kundurpi",
    schoolCategory: "ZPHS",
    whatsapp: "9490887766",
    aadhaarLast4: "1256",
    stream: "BiPC",
    vocationalInterest: "Academic Focus Only",
    status: "PENDING",
    currentStep: 2,
    registeredAt: "05 Oct 2026, 11:20 am",
  },
  {
    id: "st-010",
    regNo: "PENDING-SSS-0044",
    fullName: "C. Vinod",
    relativeName: "C. Gangadhar",
    gender: "MALE",
    studentClass: "Class 10",
    districtId: "SSS",
    districtName: "Sri Sathya Sai",
    mandal: "Puttaparthi",
    schoolName: "ZPHS, Puttaparthi",
    schoolCategory: "ZPHS",
    whatsapp: "9704556677",
    aadhaarLast4: "7823",
    stream: "MPC",
    vocationalInterest: "Electrical",
    status: "PENDING",
    currentStep: 1,
    registeredAt: "05 Oct 2026, 10:45 am",
  },
];

export const MOCK_SCHOOLS: SchoolOutreachRecord[] = [
  {
    id: "sch-01",
    schoolName: "ZPHS (Zilla Parishad High School), Tadipatri",
    udiseCode: "28221800101",
    category: "ZPHS",
    districtId: "ATP",
    districtName: "Anantapur",
    mandal: "Tadipatri",
    completedCount: 68,
    pendingCount: 4,
    isRedFlag: false,
    hmName: "Sri. K. Prabhakar Rao",
    hmPhone: "+919440123456",
  },
  {
    id: "sch-02",
    schoolName: "Government High School (Girls), Gooty",
    udiseCode: "28221200204",
    category: "Govt High School",
    districtId: "ATP",
    districtName: "Anantapur",
    mandal: "Gooty",
    completedCount: 52,
    pendingCount: 3,
    isRedFlag: false,
    hmName: "Smt. M. Vani Kumari",
    hmPhone: "+919848123456",
  },
  {
    id: "sch-03",
    schoolName: "AP Model School & Junior College, Kadiri",
    udiseCode: "28224500301",
    category: "Model School",
    districtId: "SSS",
    districtName: "Sri Sathya Sai",
    mandal: "Kadiri",
    completedCount: 44,
    pendingCount: 2,
    isRedFlag: false,
    hmName: "Dr. B. Sudhakar",
    hmPhone: "+919989012345",
  },
  {
    id: "sch-04",
    schoolName: "KGBV (Kasturba Gandhi Balika Vidyalaya), Dharmavaram",
    udiseCode: "28223600405",
    category: "KGBV",
    districtId: "SSS",
    districtName: "Sri Sathya Sai",
    mandal: "Dharmavaram",
    completedCount: 39,
    pendingCount: 5,
    isRedFlag: false,
    hmName: "Smt. S. Lakshmi Devi",
    hmPhone: "+919701987654",
  },
  {
    id: "sch-05",
    schoolName: "ZPHS, Beluguppa",
    udiseCode: "28220500102",
    category: "ZPHS",
    districtId: "ATP",
    districtName: "Anantapur",
    mandal: "Beluguppa",
    completedCount: 3, // Red Flag!
    pendingCount: 6,
    isRedFlag: true,
    hmName: "Sri. Y. Ramanjaneyulu",
    hmPhone: "+919441234567",
  },
  {
    id: "sch-06",
    schoolName: "Government High School, Gummagatta",
    udiseCode: "28221400203",
    category: "Govt High School",
    districtId: "ATP",
    districtName: "Anantapur",
    mandal: "Gummagatta",
    completedCount: 2, // Red Flag!
    pendingCount: 4,
    isRedFlag: true,
    hmName: "Sri. P. Veerabhadrappa",
    hmPhone: "+919866123987",
  },
  {
    id: "sch-07",
    schoolName: "ZPHS, Agali",
    udiseCode: "28225100101",
    category: "ZPHS",
    districtId: "SSS",
    districtName: "Sri Sathya Sai",
    mandal: "Agali",
    completedCount: 4, // Red Flag!
    pendingCount: 5,
    isRedFlag: true,
    hmName: "Sri. T. Mallesh",
    hmPhone: "+919908123456",
  },
  {
    id: "sch-08",
    schoolName: "AP Model School, Lepakshi",
    udiseCode: "28226200302",
    category: "Model School",
    districtId: "SSS",
    districtName: "Sri Sathya Sai",
    mandal: "Lepakshi",
    completedCount: 48,
    pendingCount: 1,
    isRedFlag: false,
    hmName: "Smt. C. Jayaprada",
    hmPhone: "+919440987654",
  },
  {
    id: "sch-09",
    schoolName: "ZPHS, Nambulapulakunta (NP Kunta)",
    udiseCode: "28226800101",
    category: "ZPHS",
    districtId: "SSS",
    districtName: "Sri Sathya Sai",
    mandal: "Nambulapulakunta",
    completedCount: 1, // Red Flag!
    pendingCount: 8,
    isRedFlag: true,
    hmName: "Sri. D. Srinivasulu",
    hmPhone: "+919676112233",
  },
  {
    id: "sch-10",
    schoolName: "Government High School (Boys), Kalyandurg",
    udiseCode: "28221900201",
    category: "Govt High School",
    districtId: "ATP",
    districtName: "Anantapur",
    mandal: "Kalyandurg",
    completedCount: 56,
    pendingCount: 4,
    isRedFlag: false,
    hmName: "Sri. N. Govinda Raju",
    hmPhone: "+919849223344",
  },
];

export const VOCATIONAL_STATS = [
  { trade: "Academic Focus Only", count: 3240, percentage: 53.7, color: "#1e3080" },
  { trade: "Electrical", count: 1220, percentage: 20.2, color: "#f59e0b" },
  { trade: "Painting", count: 680, percentage: 11.3, color: "#10b981" },
  { trade: "Plumbing", count: 520, percentage: 8.6, color: "#06b6d4" },
  { trade: "Carpentry", count: 372, percentage: 6.2, color: "#8b5cf6" },
];

export const STREAM_STATS = [
  { stream: "MPC (Maths, Physics, Chemistry)", count: 2840, percentage: 47.1 },
  { stream: "BiPC (Biology, Physics, Chemistry)", count: 1980, percentage: 32.8 },
  { stream: "MEC (Maths, Economics, Commerce)", count: 650, percentage: 10.8 },
  { stream: "CEC (Civics, Economics, Commerce)", count: 340, percentage: 5.6 },
  { stream: "HEC (History, Economics, Civics)", count: 222, percentage: 3.7 },
];

/**
 * Universal CSV download helper for administrative reports
 */
export function downloadCsvFile(filename: string, headers: string[], rows: (string | number)[][]): void {
  if (typeof window === "undefined") return;
  const csvRows: string[] = [
    headers.map((h) => `"${String(h).replace(/"/g, '""')}"`).join(","),
  ];
  for (const row of rows) {
    csvRows.push(row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","));
  }
  const blob = new Blob([csvRows.join("\r\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// 1. OMR Scanner Master Export (Section 9.2)
export function downloadOmrScannerExport(): void {
  const headers = [
    "Roll_No",
    "Reg_No",
    "Full_Name",
    "Father_Name",
    "Gender",
    "Class",
    "Center_Code",
    "Room_No",
    "Bench_No",
    "School_Name",
  ];

  const rows = [
    ["1026001", "V26-ATP-A0469", "K. Harika", "K. Venkatesulu", "FEMALE", "10", "ATP-CTR-01", "04", "B-08", "ZPHS, Tadipatri"],
    ["1026002", "V26-ATP-A0470", "M. Sai Charan", "M. Ramana Reddy", "MALE", "10", "ATP-CTR-01", "04", "B-09", "Govt High School (Boys), Gooty"],
    ["1026003", "V26-SSS-B0112", "P. Bhavani", "P. Narayana", "FEMALE", "09", "SSS-CTR-03", "02", "A-14", "KGBV, Dharmavaram"],
    ["1026004", "V26-SSS-B0113", "B. Tarun Kumar", "B. Shivaiah", "MALE", "10", "SSS-CTR-02", "05", "C-01", "AP Model School, Kadiri"],
    ["1026005", "V26-ATP-A0471", "G. Anitha", "G. Mallikarjuna", "FEMALE", "10", "ATP-CTR-04", "01", "A-03", "Govt High School (Girls), Uravakonda"],
    ["1026006", "V26-ATP-A0472", "T. Rajesh", "T. Chandra Sekhar", "MALE", "09", "ATP-CTR-02", "06", "B-12", "ZPHS, Kalyandurg"],
    ["1026007", "V26-SSS-B0114", "S. Reshma", "S. Mehaboob Basha", "FEMALE", "10", "SSS-CTR-01", "03", "A-07", "Govt High School (Girls), Hindupur"],
    ["1026008", "V26-ATP-A0473", "V. Naveen", "V. Peddanna", "MALE", "10", "ATP-CTR-05", "02", "C-15", "AP Model School, Guntakal"],
    ["1026009", "V26-ATP-A0474", "P. Sravani", "P. Venkata Rao", "FEMALE", "10", "ATP-CTR-01", "04", "B-10", "ZPHS, Tadipatri"],
    ["1026010", "V26-SSS-B0115", "D. Manoj", "D. Narasimhulu", "MALE", "09", "SSS-CTR-03", "02", "A-15", "ZPHS, Dharmavaram"],
  ];

  downloadCsvFile(`VADAANYA_2026_OMR_SCANNER_MASTER_${Date.now()}.csv`, headers, rows);
}

// 2. Mandal Coordinator Outreach Sheet (Section 9.2)
export function downloadMandalOutreachExport(): void {
  const headers = [
    "District",
    "Mandal",
    "School_Name",
    "Category",
    "Completed_Count",
    "Pending_Count",
    "HM_Name",
    "HM_Mobile_Number",
    "Lagging_RedFlag",
  ];

  const rows = MOCK_SCHOOLS.map((s) => [
    s.districtName,
    s.mandal,
    s.schoolName,
    s.category,
    s.completedCount,
    s.pendingCount,
    s.hmName,
    s.hmPhone,
    s.isRedFlag ? "YES (<5 Registered)" : "NO (Healthy)",
  ]);

  downloadCsvFile(`VADAANYA_2026_MANDAL_OUTREACH_SHEET_${Date.now()}.csv`, headers, rows);
}

// 3. Pending Registrations Recovery Sheet (Section 9.2)
export function downloadDraftRecoveryExport(): void {
  const headers = [
    "Aadhaar_Last4",
    "WhatsApp_Number",
    "Full_Name",
    "District",
    "Mandal",
    "Last_Completed_Block",
    "Started_At",
    "Recovery_Status",
  ];

  const rows = [
    ["1256", "+919490887766", "K. Latha", "Anantapur", "Kundurpi", "Block 2: School Selection", "05 Oct 2026, 11:20 am", "Pending"],
    ["7823", "+919704556677", "C. Vinod", "Sri Sathya Sai", "Puttaparthi", "Block 1: Personal Profile", "05 Oct 2026, 10:45 am", "Pending"],
    ["4419", "+919848554433", "N. Sreekanth", "Anantapur", "Beluguppa", "Step 0: Verification Gate", "05 Oct 2026, 09:30 am", "Pending"],
    ["9102", "+919908771122", "M. Kavitha", "Sri Sathya Sai", "Agali", "Block 2: School Selection", "05 Oct 2026, 08:15 am", "Pending"],
    ["6320", "+919618334455", "B. Ramesh", "Anantapur", "Gummagatta", "Block 1: Personal Profile", "04 Oct 2026, 07:40 pm", "Pending"],
    ["3841", "+919959667788", "S. Farhana", "Sri Sathya Sai", "Nambulapulakunta", "Block 2: School Selection", "04 Oct 2026, 05:20 pm", "Pending"],
  ];

  downloadCsvFile(`VADAANYA_2026_PENDING_REGISTRATIONS_RECOVERY_${Date.now()}.csv`, headers, rows);
}

// 4. Vocational & Skills Alignment Report (Section 9.2)
export function downloadVocationalAlignmentExport(): void {
  const headers = [
    "Mandal",
    "School",
    "Class",
    "Future_Stream",
    "Vocational_Trade_Choice",
    "Student_Count",
  ];

  const rows = [
    ["Tadipatri", "ZPHS, Tadipatri", "Class 10", "MPC", "Electrical", 28],
    ["Tadipatri", "ZPHS, Tadipatri", "Class 10", "BiPC", "Academic Focus Only", 40],
    ["Gooty", "Govt High School, Gooty", "Class 10", "BiPC", "Electrical", 22],
    ["Gooty", "Govt High School, Gooty", "Class 09", "MPC", "Plumbing", 14],
    ["Kadiri", "AP Model School, Kadiri", "Class 10", "MPC", "Plumbing", 18],
    ["Kadiri", "AP Model School, Kadiri", "Class 10", "BiPC", "Painting", 12],
    ["Dharmavaram", "KGBV, Dharmavaram", "Class 09", "HEC", "Painting", 24],
    ["Dharmavaram", "KGBV, Dharmavaram", "Class 10", "MEC", "Carpentry", 15],
    ["Hindupur", "Govt High School (Girls), Hindupur", "Class 10", "MPC", "Academic Focus Only", 32],
    ["Kalyandurg", "ZPHS, Kalyandurg", "Class 09", "MEC", "Carpentry", 19],
    ["Uravakonda", "Govt High School, Uravakonda", "Class 10", "BiPC", "Academic Focus Only", 30],
  ];

  downloadCsvFile(`VADAANYA_2026_VOCATIONAL_SKILLS_REPORT_${Date.now()}.csv`, headers, rows);
}

// 5. Custom Filtered Students Export
export function downloadFilteredStudentsCsv(students: RegisteredStudent[]): void {
  const headers = [
    "Reg_No",
    "Full_Name",
    "Relative_Name",
    "Gender",
    "Class",
    "District",
    "Mandal",
    "School_Name",
    "Category",
    "WhatsApp",
    "Aadhaar_Last4",
    "Stream",
    "Vocational_Choice",
    "Status",
    "Registered_At",
  ];

  const rows = students.map((s) => [
    s.regNo,
    s.fullName,
    s.relativeName,
    s.gender,
    s.studentClass,
    s.districtName,
    s.mandal,
    s.schoolName,
    s.schoolCategory,
    s.whatsapp,
    s.aadhaarLast4,
    s.stream,
    s.vocationalInterest,
    s.status,
    s.registeredAt,
  ]);

  downloadCsvFile(`VADAANYA_2026_STUDENTS_FILTERED_${Date.now()}.csv`, headers, rows);
}

