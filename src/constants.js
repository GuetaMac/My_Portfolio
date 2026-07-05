export const NAV_LINKS = [
  "about",
  "skills",
  "projects",
  "experience",
  "contact",
];

export const SKILLS = {
  "Web Development": [
    "React.js",
    "PHP",
    "Laravel",
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "PHP",
    "Bootstrap",
    "Tailwind CSS",
    "RESTful APIs",
    "Node.js",
    "Express.js",
  ],
  "Data & Analytics": [
    "Power BI",
    "MS Excel",
    "Pivot Tables",
    "Data Visualization",
  ],
  Database: ["SQL", "PostgreSQL", "MySQL", "Basic Database Design"],
  "Tools & Others": [
    "Git",
    "VS Code",
    "MS Office Suite",
    "Technical Documentation",
  ],
};

import img1st1 from "./assets/1stsafety1.png";
import img1st2 from "./assets/1stsafety2.jpg";
import img1st3 from "./assets/1stsafety3.jpg";
import img1st4 from "./assets/1stsafety4.jpg";
import imgBIChallenge from "./assets/bi-challenge.jpg";
import imgRpm1 from "./assets/rpm1.png";
import imgRpm2 from "./assets/rpm2.png";
import imgRpm3 from "./assets/rpm3.png";
import imgPed1 from "./assets/ped1.png";
import imgPed2 from "./assets/ped2.png";
import imgPed3 from "./assets/ped3.png";
import imgFood1 from "./assets/food1.png";
import imgFood2 from "./assets/food2.png";
import imgFood3 from "./assets/food3.png";

export const PROJECTS = [
  {
    id: "01",
    title: "Research Publication Management System",
    type: "Full-Stack Web App",
    year: "2026",
    description:
      "Led end-to-end development of a research publication tracking system for an academic institution. Built with database integration, workflow automation, and role-based access.",
    tech: ["PHP", "Laravel", "SQL", "JavaScript"],
    highlight: "OJT Project",
    images: [imgRpm1, imgRpm2, imgRpm3],
  },
  {
    id: "02",
    title: "Business Intelligence Dashboard",
    type: "Data Visualization",
    year: "2025",
    description:
      "Competed in a university-wide BI Dashboard Challenge and placed 2nd. Designed an interactive dashboard using Power BI for executive-level reporting.",
    tech: ["Power BI", "Excel", "Data Modeling"],
    highlight: "2nd Place — BatStateU BI Challenge",
    images: [imgBIChallenge],
  },
  {
    id: "03",
    title: "1st Safety Driving School Portal",
    type: "Full-Stack Web App",
    year: "2026",
    description:
      "Capstone project — a full-featured driving school management platform replacing manual enrollment processes. Features student registration, live scheduling with conflict detection, attendance tracking, instructor feedback, announcements, vehicle maintenance management, and an AI-powered analytics dashboard for data-driven decision-making.",
    tech: ["Laravel", "PHP", "SQL", "JavaScript", "Power BI"],
    highlight: "Capstone Project",
    images: [img1st1, img1st2, img1st3, img1st4],
  },
  {
    id: "04",
    title: "Pediatric Management System",
    type: "Full-Stack Web App",
    year: "2026",
    description:
      "Served as backend developer for a capstone project focused on streamlining pediatric patient records, appointment scheduling, and medical history tracking for healthcare providers.",
    tech: ["PHP", "Laravel", "SQL", "JavaScript"],
    highlight: "Capstone Project",
    images: [imgPed1, imgPed2, imgPed3],
  },
  {
    id: "05",
    title: "Food Decidor",
    type: "Personal Project",
    year: "2026",
    description:
      "A random elimination tool built to solve the everyday 'what to eat' dilemma. Users add their food choices, and the web app randomly removes options one by one — narrowing down the list round by round until a single winner remains.",
    tech: ["JavaScript", "React"],
    highlight: "Personal Project",
    images: [imgFood1, imgFood2, imgFood3],
  },
];
export const CERTS = [
  {
    title: "Digital Frontiers 2026 (3-Part Series)",
    org: "BatStateU CICS",
    year: "2026",
  },
  { title: "eGOVPh Information Session", org: "DICT CALABARZON", year: "2026" },
  { title: "PNPKI for Everyone", org: "DICT CALABARZON", year: "2026" },
  {
    title: "JPCS Membership AY 2025–2026",
    org: "Junior Philippine Computer Society – BatStateU Alangilan",
    year: "2025",
  },
  {
    title: "Conducting Data Analysis",
    org: "TESDA Online Program",
    year: "2026",
  },
  {
    title: "Developing Designs for User Experience",
    org: "TESDA Online Program",
    year: "2026",
  },
  {
    title:
      "Microsoft Cybersecurity Course: Security, Compliance, and Identity Fundamentals",
    org: "TESDA Online Program",
    year: "2026",
  },
];
