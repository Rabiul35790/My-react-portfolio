import type { PortfolioContent } from "../types/portfolio";

export const portfolioContent: PortfolioContent = {
  hero: {
    name: "Your Name",
    role: "Software Engineer · Full Stack Developer",
    statement:
      "I design and build high-quality digital products with clean architecture, refined UI, and an obsessive focus on user experience.",
    ctaPrimary: "View Projects",
    ctaSecondary: "Contact Me",
  },
  about: {
    eyebrow: "About",
    title: "Engineer-minded product builder with a taste for modern interfaces.",
    intro:
      "I build thoughtful web products that balance technical rigor with polished user experience. I care about clarity, maintainability, and shipping real value.",
    highlights: [
      "Problem solving with scalable architecture",
      "Clean, maintainable, production-ready code",
      "User-focused features with product thinking",
      "Modern, performant web experiences",
    ],
  },
  skillGroups: [
    {
      title: "Frontend",
      items: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "Vite"],
    },
    {
      title: "Backend",
      items: ["PHP", "Laravel", "REST APIs", "MySQL", "Authentication"],
    },
    {
      title: "Workflow",
      items: ["Git & GitHub", "Postman", "Figma", "CI Basics", "Deployment"],
    },
  ],
  projects: [
    {
      id: "project-01",
      title: "SaaS Analytics Dashboard",
      summary:
        "A multi-tenant analytics platform with role-based access, event tracking, and executive-level reporting UX.",
      stack: ["React", "TypeScript", "Tailwind", "Laravel API", "MySQL"],
      liveUrl: "https://example.com",
      repoUrl: "https://github.com/yourusername/project-01",
      imageHint: "Dashboard UI preview",
      featured: true,
    },
    {
      id: "project-02",
      title: "Portfolio CMS Engine",
      summary:
        "A custom content management workflow for portfolio content with draft/publish states and media management.",
      stack: ["Laravel", "PHP", "MySQL", "REST API", "React Admin"],
      liveUrl: "https://example.com",
      repoUrl: "https://github.com/yourusername/project-02",
      imageHint: "CMS editor view",
      featured: true,
    },
    {
      id: "project-03",
      title: "Commerce Experience Revamp",
      summary:
        "A performance-focused storefront redesign with improved conversion flows and streamlined checkout states.",
      stack: ["React", "Tailwind", "Node", "Stripe", "A/B Testing"],
      liveUrl: "https://example.com",
      repoUrl: "https://github.com/yourusername/project-03",
      imageHint: "E-commerce interface",
    },
  ],
  experience: [
    {
      id: "exp-01",
      period: "2025 - Present",
      role: "Full Stack Developer",
      company: "Freelance / Contract",
      summary:
        "Built and shipped web products end-to-end, from requirement shaping to frontend delivery and backend integration.",
    },
    {
      id: "exp-02",
      period: "2024 - 2025",
      role: "Software Engineering Intern",
      company: "Product Startup",
      summary:
        "Delivered UI features, improved API response patterns, and collaborated closely with design and product teams.",
    },
    {
      id: "exp-03",
      period: "2023 - 2024",
      role: "Independent Builder",
      company: "Personal Projects",
      summary:
        "Focused on modern React/Laravel product builds with emphasis on architecture, speed, and UX quality.",
    },
  ],
  contact: {
    title: "Let us build something valuable.",
    description:
      "Open to full-time roles, freelance opportunities, and high-impact collaborations.",
    email: "hello@yourdomain.dev",
    availability: "Available for selected projects in Q2 2026.",
  },
  footer: {
    note: "Crafted with care for product quality, performance, and clarity.",
  },
};
