export interface NewsItem {
  id: number;
  publisher?: string;
  title: string;
  description: string;
  link: string;
  linkLabel?: string;
  tag?: string;
  date?: string;
}

export const newsItems: NewsItem[] = [
  {
    id: 1,
    publisher: "The New Indian Express",
    title: "Andhra Software Engineer Helps Over 500 Rural Students Pursue Education",
    description: "How Vadaanya Janaa Society's founder built an initiative supporting 500+ underprivileged rural students with education, hostels, and exam guidance.",
    link: "https://www.newindianexpress.com/good-news/2026/Jul/19/andhra-software-engineer-helps-over-500-rural-students-pursue-education",
    linkLabel: "Read Article",
  },
  {
    id: 2,
    publisher: "ETV Bharat",
    title: "వదాన్య ఫౌండేషన్ ద్వారా నిరుపేద విద్యార్థులకు విద్యా సహాయం (Vadaanya Foundation Educating Poor Students in Sathya Sai District)",
    description: "Feature detailing Vadaanya Foundation's educational support, scholarships, and mentoring for government school students in Sri Sathya Sai district.",
    link: "https://www.etvbharat.com/te/!state/vadaanya-foundation-is-educating-poor-students-in-sathya-sai-district-andhra-pradesh-news-aps25031807448",
    linkLabel: "Read Article",
  },
  {
    id: 3,
    publisher: "The Hindu",
    title: "NGO Founded by Student Duo Crosses Significant Milestone",
    description: "Vadaanya Janaa Society reaches key milestones in empowering first-generation learners and government school students across India.",
    link: "https://www.thehindu.com/news/national/andhra-pradesh/ngo-founded-by-student-duo-crosses-significant-milestone/article66877986.ece",
    linkLabel: "Read Article",
  },
  {
    id: 4,
    publisher: "The Hindu",
    title: "3,150 Students Participate in Vadaanya Talent Test 2024",
    description: "Over 3,150 government school students from 12 districts sat for the Vadaanya Talent Test 2024 across examination centers.",
    link: "https://www.thehindu.com/news/national/andhra-pradesh/3150-students-participate-in-vadaanya-talent-test-2024/article69016033.ece",
    linkLabel: "Read Article",
  },
  {
    id: 5,
    publisher: "The Hindu",
    title: "Four Youth Mentored by Nonprofit Selected for Constable Posts",
    description: "Four rural youth supported and mentored by Vadaanya Janaa Society successfully cleared the police recruitment examination and secured constable appointments.",
    link: "https://www.thehindu.com/news/national/andhra-pradesh/four-youth-mentored-by-nonprofit-selected-for-constable-posts/article69886833.ece",
    linkLabel: "Read Article",
  },
  {
    id: 6,
    publisher: "The Hindu",
    title: "Vadaanya Janaa Society Celebrates 13th Anniversary at Anantapur",
    description: "Vadaanya Janaa Society marked its 13th anniversary celebration in Anantapur, honoring rankers, volunteers, and supporters.",
    link: "https://www.thehindu.com/news/national/andhra-pradesh/vadaanya-janaa-society-celebrates-13th-anniversary-at-anantapur/article68539418.ece",
    linkLabel: "Read Article",
  },
  {
    id: 7,
    publisher: "The Hindu",
    title: "Vadaanya Talent Test Winners to be Rewarded Today",
    description: "Top performers and merit scholarship recipients of the annual Vadaanya Talent Test awarded laptops, cash prizes, and certificates.",
    link: "https://www.thehindu.com/news/national/andhra-pradesh/vadaanya-talent-test-winners-to-be-rewarded-today/article69306321.ece",
    linkLabel: "Read Article",
  },
  {
    id: 8,
    publisher: "The Hindu",
    title: "Nara Lokesh Unveils Vadaanya Talent Test Poster in Vijayawada",
    description: "AP Education Minister Nara Lokesh inaugurates the Vadaanya Talent Test poster in Vijayawada, praising the foundation's initiative.",
    link: "https://www.thehindu.com/news/national/andhra-pradesh/nara-lokesh-unveils-vadaanya-talent-test-poster-in-vijayawada/article68718664.ece",
    linkLabel: "Read Article",
  },
  {
    id: 9,
    publisher: "The Hindu",
    title: "Vadaanya to Hold Talent Test for Students of 175 Govt Schools",
    description: "Vadaanya Janaa Society announces talent test outreach covering students across 175 government high schools in the region.",
    link: "https://www.thehindu.com/news/national/andhra-pradesh/vadaanya-to-hold-talent-test-for-students-of-175-govt-schools/article65959448.ece",
    linkLabel: "Read Article",
  },
  {
    id: 10,
    publisher: "The Hindu",
    title: "4,200 Students Appear for Talent Test in Sathya Sai District",
    description: "Massive response as 4,200 government school students write the Vadaanya Talent Test across examination halls in Sri Sathya Sai district.",
    link: "https://www.thehindu.com/news/national/andhra-pradesh/4200-students-appear-for-talent-test-in-sathya-sai-district/article66278681.ece",
    linkLabel: "Read Article",
  },
  {
    id: 11,
    publisher: "The Hindu",
    title: "NGO Chips In for COVID Relief",
    description: "Vadaanya Janaa Society volunteers mobilize emergency relief supplies, rations, and healthcare support for vulnerable rural families during COVID-19.",
    link: "https://www.thehindu.com/todays-paper/tp-national/tp-andhrapradesh/ngo-chips-in-for-covid-relief/article34468639.ece",
    linkLabel: "Read Article",
  },
  {
    id: 12,
    publisher: "Deccan Chronicle",
    title: "Vadaanya Foundation Students Secure All India Ranks in JEE Main",
    description: "Rural government school students coached under Vadaanya Foundation achieve outstanding All-India ranks in JEE Main national entrance exams.",
    link: "https://www.deccanchronicle.com/southern-states/andhra-pradesh/vadaanya-foundation-students-secure-all-india-ranks-in-jee-main-1952110",
    linkLabel: "Read Article",
  },
  {
    id: 13,
    publisher: "Deccan Chronicle",
    title: "3 Anantapur District Rural Students Excel in JEE",
    description: "Three underprivileged rural students from Anantapur district backed by Vadaanya excel in JEE national entrance exams.",
    link: "https://www.deccanchronicle.com/southern-states/andhra-pradesh/3-anantapur-district-rural-students-excel-in-jee-1938041",
    linkLabel: "Read Article",
  },
  {
    id: 14,
    publisher: "Deccan Chronicle",
    title: "3,150 Students Take Vadaanya Talent Test in Sri Sathya Sai District",
    description: "Reports on 3,150 government school candidates taking part in the Vadaanya Talent Test across Sri Sathya Sai district.",
    link: "https://www.deccanchronicle.com/southern-states/andhra-pradesh/3150-students-take-vadaanya-talent-test-in-sri-sathyasaidistrict-1848912",
    linkLabel: "Read Article",
  },
  {
    id: 15,
    publisher: "The Hans India",
    title: "Vadaanya Foundation Celebrates 15 Years of Empowering Bright Minds",
    description: "Vadaanya Foundation marks 15 milestone years of transforming education and career opportunities for rural youth.",
    link: "https://www.thehansindia.com/news/cities/hyderabad/vadaanya-foundation-celebrates-15-years-of-empowering-bright-minds-1027552",
    linkLabel: "Read Article",
  },
  {
    id: 16,
    publisher: "The Hans India",
    title: "India Needs to Bridge Graduate Employability Gap",
    description: "Feature discussing graduate employability, skill development models, and Vadaanya Foundation's mentorship initiatives.",
    link: "https://www.thehansindia.com/business/india-needs-to-bridge-graduate-employability-gap-1042135",
    linkLabel: "Read Article",
  },
  {
    id: 17,
    publisher: "Andhra Jyothy",
    title: "అనంతపురంలో వదాన్య జనా సొసైటీ ఆధ్వర్యంలో విద్యా కార్యక్రమం (Vadaanya Janaa Society Educational Event at Anantapur)",
    description: "Coverage of Vadaanya Janaa Society's educational distribution and student motivation event in Anantapur.",
    link: "https://www.andhrajyothy.com/2024/andhra-pradesh/vadanya-jana-society-item-in-anantapur-1295005.html",
    linkLabel: "Read Article",
  },
  {
    id: 18,
    publisher: "Telugu Times",
    title: "గ్రామీణ ప్రతిభకు వదాన్య ఫౌండేషన్ చేయూత — మంత్రి లోకేష్ ప్రశంసలు (Minister Lokesh Praises Vadaanya Foundation's Support for Rural Talent)",
    description: "Report on Minister Nara Lokesh commending Vadaanya Foundation's rural talent search and scholarship programs.",
    link: "https://www.telugutimes.net/politics/navyandhra/vadanya-foundation-supports-rural-talent-minister-lokesh-praises-the-initiative-395795.html",
    linkLabel: "Read Article",
  },
];
