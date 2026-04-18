export type Service = {
  title: string;
  intro: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    title: "Full-Stack Web Development",
    intro: "End-to-end product engineering from backend architecture to polished frontend delivery.",
    deliverables: ["Product architecture", "API and database implementation", "Production-ready React interfaces"]
  },
  {
    title: "Frontend Engineering",
    intro: "High-quality, responsive UI systems with performance-focused implementation and motion polish.",
    deliverables: ["Reusable component systems", "Animation and interaction design", "Accessibility and responsiveness"]
  },
  {
    title: "Backend Development",
    intro: "Scalable applications with clean code standards and maintainable business logic.",
    deliverables: ["Custom modules and admin panels", "Secure authentication and permissions", "Third-party integrations"]
  },
  {
    title: "Figma Plugin Development",
    intro: "Custom Figma plugins to enhance design workflows and automate repetitive tasks.",
    deliverables: ["Plugin architecture and implementation", "User interface design for plugin tools", "Integration with Figma's API"]
  },
  {
    title: "System Design and Architecture",
    intro: "Designing scalable and maintainable systems with a focus on performance and user experience.",
    deliverables: ["System architecture planning", "Performance optimization", "Scalability strategies"]
  }
];
