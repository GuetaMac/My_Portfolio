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
import inv1 from "./assets/ac-inventory1.png";
import inv2 from "./assets/ac-inventory2.png";
import inv3 from "./assets/ac-inventory3.png";
import inv4 from "./assets/ac-inventory4.png";
import inv5 from "./assets/ac-inventory5.png";
import inv6 from "./assets/ac-inventory6.png";
import acweb1 from "./assets/ac-website1.png";
import acweb2 from "./assets/ac-website2.png";
import acweb3 from "./assets/ac-website3.png";
import acweb4 from "./assets/ac-website4.png";
import acweb5 from "./assets/ac-website5.png";
import poster1 from "./assets/poster1.png";

export const PROJECTS = [
  {
    id: "01",
    title: "Research Publication Management System",
    type: "Full-Stack Web App",
    year: "2026",
    description:
      "Led end-to-end development of a research publication tracking system for an academic institution. Built with database integration, workflow automation, and role-based access.",
    tech: ["PHP", "Laravel", "PostgreSQL", "JavaScript"],
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
    tech: ["Power BI"],
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
    tech: ["PostgreSQL", "Express.js", "React", "Node.js"],
    highlight: "Capstone Project",
    images: [img1st1, img1st2, img1st3, img1st4],
  },
  {
    id: "04",
    title: "Pediatric Management System",
    type: "Backend Developer",
    year: "2026",
    description:
      "Served as backend developer for a capstone project focused on streamlining pediatric patient records, appointment scheduling, and medical history tracking for healthcare providers.",
    tech: ["PostgreSQL", "Express.js", "React", "Node.js"],
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
  {
    id: "06",
    title: "AC Paint Inventory Management System",
    type: "Full-Stack Web App",
    year: "2026",
    description:
      "An inventory management system built for a paint supply business. Handles product CRUD operations (add, update, delete), real-time low-stock notifications, sales analytics for top and least-selling products, and customer debt/credit monitoring.",
    tech: ["PHP", "Laravel", "PostgreSQL"],
    highlight: "Business Project",
    images: [inv1, inv2, inv3, inv4, inv5, inv6], // add screenshots here later, e.g. [imgAcInventory1, imgAcInventory2]
  },
  {
    id: "07",
    title: "AC Paint Center Website",
    type: "Business Website",
    year: "2026",
    description:
      "A public-facing website for a paint supply business showcasing their available products and completed projects. Highlights the shop's product catalog and a gallery of past painting projects to build customer trust and visibility.",
    tech: ["HTML", "Tailwind CSS", "JavaScript"],
    highlight: "Client Project",
    images: [acweb1, acweb2, acweb3, acweb4, acweb5], // add screenshots here later, e.g. [imgAcWeb1, imgAcWeb2]
  },
  {
    id: "08",
    title: "Poster Press",
    type: "Personal Project",
    year: "2026",
    description:
      "A YouTube-to-poster maker built with React. Paste a video link and instantly generate a 1080×1350 poster in one of 14 styles (Cinematic, Neon, Vinyl, Blurred Glass, and more) with a customizable accent color.",
    tech: [
      "React",
      "HTML5 Canvas",
      "JavaScript",
      "Tailwind CSS",
      "YouTube oEmbed API",
    ],
    highlight: "Personal Project",
    images: [poster1], // add screenshots here later, e.g. [imgAcWeb1, imgAcWeb2]
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
