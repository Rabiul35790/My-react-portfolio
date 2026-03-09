export type Project = {
  id: string;
  number: string;
  title: string;
  year: string;
  role: string;
  liveUrl: string;
  description: string;
  stack: string[];
  problem: string;
  solution: string;
  gallery: string[];
};

export const projects: Project[] = [
  {
    id: "ripplix",
    number: "01",
    title: "Ripplix",
    year: "2025-2026",
    role: "Full-stack Software Developer",
    liveUrl: "https://www.ripplix.com",
    description: "A subscription-based platform providing a curated library of modern UI animations and micro-interactions for developers and designers.",
    stack: ["React", "TypeScript", "Tailwind", "Laravel", "Filament", "MySql"],
    problem: "Designers and developers often struggle to find high-quality UI animation and micro-interaction references. Most inspiration is scattered across random websites, videos, and design galleries, making it slow and frustrating to discover the right interaction when building a product.",
    solution: "Ripplix was built as a curated motion library that collects real UI animations and micro-interactions from modern apps and websites. The platform organizes thousands of interaction examples into searchable categories, allowing designers and developers to quickly discover, study, and apply proven motion patterns in their own products.",
    gallery: [
      "https://www.ripplix.com/images/og/og-default.png",
      "https://www.ripplix.com/images/project1.png",
      "https://www.ripplix.com/images/project2.png"
    ]
  },
  {
    id: "ripplix-figma-plugin",
    number: "02",
    title: "Ripplix Figma Plugin",
    year: "2026",
    role: "Full-Stack Software Developer",
    liveUrl: "https://www.figma.com/community/plugin/1505975859603116253/ripplix-ui-animation-micro-interaction-library",
    description: "A Figma plugin that lets designers explore and attach curated UI animations and micro-interactions directly inside their design workflow.",
    stack: ["Preact", "TypeScript", "Tailwind", "Figma Plugin API", "Laravel API", "MySql"],
    problem: "Designers often need UI animation inspiration while designing interfaces in Figma, but they usually have to leave the tool and search different websites or libraries. This breaks the workflow and makes it harder for developers to understand which interaction should be implemented.",
    solution: "I built the Ripplix Figma Plugin to bring the Ripplix animation library directly into Figma. Designers can browse animations and attach them to specific elements or interactions in their designs. When developers inspect the design, they can clearly see which micro-interaction should be implemented and where, making the design-to-development handoff much clearer.",
    gallery: [
      "https://www.ripplix.com/images/project3.png",
      "https://www.ripplix.com/images/project4.png",
      "https://www.ripplix.com/images/project5.png"
    ]
  },
  {
    id: "grocery-ecommerce",
    number: "03",
    title: "Grocery E-commerce",
    year: "2025",
    role: "Full-Stack Software Developer",
    liveUrl: "https://ecommerce.rabiul.pro/",
    description: "An online grocery e-commerce platform that allows users to browse products, manage carts, and place orders through a simple and fast shopping experience.",
    stack: ["Laravel", "Blade", "Tailwind CSS", "Filament", "MySQL"],
    problem: "Small and medium grocery businesses often lack a simple digital platform to manage products and accept online orders. Many available systems are complex, expensive, or difficult for store owners to manage.",
    solution: "I developed a grocery e-commerce platform with a clean shopping interface and a powerful admin dashboard using Filament. Store owners can easily manage products, categories, and orders, while customers can quickly browse items, add them to the cart, and place orders through a smooth and responsive interface.",
    gallery: [
      "/images/project31.png",
      "/images/project32.png",
      "/images/project33.png"
    ]
  },
  {
    id: "software-company-website",
    number: "04",
    title: "Software Company Website",
    year: "2025",
    role: "Full Stack Developer",
    liveUrl: "https://9amsolution.com/",
    description: "A corporate website built for a software company to present its services, portfolio, team, and brand identity in a professional and engaging way.",
    stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    problem: "The company needed a strong online presence to clearly present its services, build trust with potential clients, and make it easier for visitors to explore the business and get in touch.",
    solution: "I developed a responsive company website with a clean structure, modern visual presentation, and dynamic content management. The site helps showcase the company’s services, highlight its work, and create a more professional digital presence for client engagement.",
    gallery: [
      "/images/project41.png",
      "/images/project42.png",
      "/images/project43.png"
    ]
  }
];
