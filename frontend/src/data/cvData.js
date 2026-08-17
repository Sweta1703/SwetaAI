// ============================================
// SWETA MONDAL'S CV DATA - Extracted from CV
// ============================================

export const profile = {
  name: "Sweta Mondal",
  title: "Software Engineer | MERN Stack | DSA | AWS | Full-Stack Development",
  location: "Kolkata, India",
  phone: "+91 7478055348",
  email: "mondalsweta03@gmail.com",
  linkedin: "https://www.linkedin.com/in/mondalsweta/",
  portfolio: "https://portfolio-delta-orcin-9r8mvvs5lv.vercel.app/",
  github: "https://github.com/Sweta1703",
};

export const education = [
  {
    id: 1,
    institution: "Techno International New Town",
    degree: "B.Tech in Computer Science & Engineering",
    score: "CGPA: 7.81",
    location: "Newtown, Kolkata",
    period: "2022 – 2026",
    icon: "🎓",
  },
  {
    id: 2,
    institution: "Surenchandra Modern School (H.S.)",
    degree: "Senior Secondary Education",
    score: "WBCHSE – 87.8%",
    location: "Durgapur, West Bengal",
    period: "2020 – 2022",
    icon: "🏫",
  },
  {
    id: 3,
    institution: "Surenchandra Modern School (H.S.)",
    degree: "Secondary Education",
    score: "WBBSE – 88.4%",
    location: "Durgapur, West Bengal",
    period: "2019 – 2020",
    icon: "🏫",
  },
];

export const skills = [
  {
    category: "Languages",
    icon: "💻",
    items: [
      { name: "Python", level: 82 },
    ],
  },
  {
    category: "Web Development",
    icon: "🌐",
    items: [
      { name: "React.js", level: 88 },
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 83 },
      { name: "HTML & CSS", level: 92 },
      { name: "JavaScript (ES6+)", level: 90 },
    ],
  },
  {
    category: "Databases",
    icon: "🗄️",
    items: [
      { name: "MongoDB", level: 82 },
      { name: "MySQL", level: 76 },
    ],
  },
  {
    category: "Tools & Technologies",
    icon: "🔧",
    items: [
      { name: "Git & GitHub", level: 88 },
      { name: "REST APIs", level: 85 },
      { name: "Docker", level: 70 },
      { name: "Socket.io", level: 72 },
      { name: "AWS (IAM, EC2, S3, RDS, Lambda)", level: 68 },
      { name: "Postman", level: 85 },
    ],
  },
  {
    category: "Core Concepts",
    icon: "⚡",
    items: [
      { name: "Data Structures & Algorithms", level: 80 },
      { name: "OOP", level: 85 },
      { name: "DBMS", level: 78 },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "FOREVER – E-commerce WebApp",
    year: "2025",
    liveDemo: "https://e-commerce-app-frontend-puce.vercel.app/",
    github: "https://github.com/Sweta1703/E-Commerce-App",
    techStack: ["Node.js", "Express.js", "React.js", "MongoDB", "JWT", "REST APIs", "Stripe"],
    headerColor: "from-emerald-950 to-teal-950",
    bullets: [
      "Developed a full-stack E-Commerce application with product listing, cart management, and secure checkout using the MERN stack.",
      "Built RESTful APIs with Node.js & Express.js, integrated MongoDB, and implemented JWT authentication, and enabled secure payments via Stripe.",
      "Created a responsive React.js frontend with modular components, ensuring clean code, scalability, and smooth user experience.",
    ],
  },
  {
    id: 2,
    title: "Just In Time – Resilient Proxy-Based Testing Platform",
    year: "2025",
    liveDemo: "https://drive.google.com/file/d/1058yC0rgD7blZwSqYc3L7pRpIDkNpoO_/view",
    github: "https://github.com/Sweta1703/Just-InTime-Final-2.2.0",
    techStack: ["Node.js", "Express.js", "React", "n8n", "Google Gemini API", "Dodo Payments"],
    headerColor: "from-blue-950 to-indigo-950",
    bullets: [
      "Designed and implemented an intelligent proxy layer to ensure zero-downtime by automatically rerouting traffic to fallback services during backend failures.",
      "Built a self-healing reliability mechanism using an AI watchdog that monitors error rates and triggers a kill switch and supports secure transactions via Dodo Payments.",
      "Created a responsive React.js frontend with modular components, ensuring clean code, scalability, and smooth user experience.",
    ],
  },
];

export const internship = {
  title: "Web Development Internship",
  type: "Remote",
  company: "Prodigy Infotech",
  year: "2025",
  certificate: "https://drive.google.com/drive/folders/1-Fozr4ZBpoyEqc6VK9Yh4oIQ_bxOtxqK?usp=drive_link",
  bullets: [
    "Developed responsive web applications using HTML, CSS, JavaScript.",
    "Integrated REST APIs to connect front-end components.",
  ],
};

export const achievements = [
  {
    id: 1,
    title: "Calcutta Hacks",
    year: "2025",
    certificate: "https://drive.google.com/file/d/1o9MJO9ZwXUgPSPF_UP_3mojyDa-q2nNJ/view?usp=drive_link",
    icon: "🏆",
    highlight: "First Runner-Up",
    bullets: [
      "First Runner-Up in a competitive hackathon environment.",
      "Built and presented a working technical solution under strict time constraints.",
      "Demonstrated strong problem-solving, system design, and team collaboration skills.",
      "Recognized for delivering a practical and scalable solution among multiple competing teams.",
    ],
  },
  {
    id: 2,
    title: "Short Film Competition Winner",
    year: "2023",
    certificate: "https://drive.google.com/file/d/11OBWGfgLlkZf38cVyqRbol2Lt4CIcC_E/view?usp=drive_link",
    organizer: "TINT Talkies",
    icon: "🎬",
    highlight: "1st Position",
    bullets: [
      "Secured 1st Position in an inter-college short film competition organized by TINT Talkies, Techno International New Town.",
      'Conceptualized and delivered the short film "The Darken Hours", recognized for storytelling, execution, and creativity.',
    ],
  },
];

// AI Chat knowledge base built from CV data
export const knowledgeBase = {
  greeting: `Hi! I'm Sweta's AI assistant. Ask me anything about her skills, projects, internship, or why she'd be a great hire!`,

  skills: {
    keywords: ["skill", "skills", "strongest", "tech", "know", "good at", "proficient", "expertise", "stack", "technologies"],
    response: `Sweta's technical skills from her CV:

**Languages:** Python, JavaScript (ES6+)

**Web Development:** HTML, CSS, React.js, Node.js, Express.js

**Databases:** MySQL, MongoDB

**Tools & Technologies:** Git, GitHub, Postman, REST APIs, Docker, Socket.io, AWS (IAM, EC2, S3, Aurora & RDS, DynamoDB, Lambda)

**Core Concepts:** Data Structures & Algorithms, OOP, DBMS

She specializes in the **MERN stack** (MongoDB, Express, React, Node.js).`,
  },

  projects: {
    keywords: ["project", "projects", "built", "e-commerce", "forever", "just in time", "proxy", "portfolio"],
    response: `Sweta has built 2 major projects:

**1. FOREVER – E-commerce WebApp (2025)**
Tech: Node.js, Express.js, React.js, MongoDB, JWT, Stripe
- Full-stack MERN e-commerce with product listing, cart, and secure checkout
- JWT authentication + REST APIs + Stripe payments

**2. Just In Time – Resilient Proxy-Based Testing Platform (2025)**
Tech: Node.js, Express.js, React, n8n, Google Gemini API, Dodo Payments
- Intelligent proxy layer for zero-downtime with automatic rerouting
- AI watchdog for self-healing reliability + Dodo Payments integration`,
  },

  internship: {
    keywords: ["internship", "intern", "prodigy", "work experience", "worked", "job"],
    response: `**Web Development Internship at Prodigy Infotech (Remote, 2025)**

- Developed responsive web applications using HTML, CSS, JavaScript
- Integrated REST APIs to connect front-end components

She has a certificate from this internship.`,
  },

  achievements: {
    keywords: ["achievement", "hackathon", "calcutta hacks", "film", "award", "winner", "competition"],
    response: `Sweta's achievements:

**🏆 Calcutta Hacks | 2025 – First Runner-Up**
- Top finisher in a competitive hackathon
- Built and presented a working technical solution under strict time constraints
- Strong problem-solving, system design, and team collaboration

**🎬 Short Film Competition Winner | TINT Talkies | 2023 – 1st Position**
- Won inter-college short film competition organized by TINT Talkies, Techno International New Town
- Directed "The Darken Hours" — recognized for storytelling, execution, and creativity`,
  },

  education: {
    keywords: ["education", "degree", "college", "university", "btech", "b.tech", "cgpa", "school", "academic"],
    response: `**Education:**

🎓 **B.Tech in Computer Science & Engineering**
Techno International New Town, Newtown, Kolkata
CGPA: 7.81 | 2022 – 2026

🏫 **Senior Secondary (WBCHSE – 87.8%)**
Surenchandra Modern School, Durgapur | 2020 – 2022

🏫 **Secondary (WBBSE – 88.4%)**
Surenchandra Modern School, Durgapur | 2019 – 2020`,
  },

  contact: {
    keywords: ["contact", "email", "reach", "linkedin", "github", "phone", "portfolio"],
    response: `**Contact Sweta:**

📧 Email: mondalsweta03@gmail.com
📱 Phone: +91 7478055348
💼 LinkedIn: https://linkedin.com/in/mondalsweta/
🐙 GitHub: https://github.com/Sweta1703
🌐 Portfolio: https://portfolio-delta-orcin-9r8mvvs5lv.vercel.app/`,
  },

  hire: {
    keywords: ["hire", "why hire", "recruit", "candidate", "strength", "good fit", "recommend"],
    response: `**Why hire Sweta?**

✦ **Full-Stack MERN Developer** — Builds end-to-end from database schema to polished UI

✦ **Real Projects** — E-commerce platform with Stripe, AI-powered proxy platform

✦ **Internship Experience** — At Prodigy Infotech (2025), built responsive apps & REST APIs

✦ **AWS Knowledge** — EC2, S3, Lambda, RDS, DynamoDB, IAM

✦ **Hackathon Winner** — First Runner-Up at Calcutta Hacks 2025

✦ **Currently available** — Final-year B.Tech student, CGPA 7.81, open to opportunities`,
  },
};
