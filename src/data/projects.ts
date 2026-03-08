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
    stack: ["React", "TypeScript", "Laravel", "Filament", "MySql"],
    problem: "Designers and developers often struggle to find high-quality UI animation and micro-interaction references. Most inspiration is scattered across random websites, videos, and design galleries, making it slow and frustrating to discover the right interaction when building a product.",
    solution: "Ripplix was built as a curated motion library that collects real UI animations and micro-interactions from modern apps and websites. The platform organizes thousands of interaction examples into searchable categories, allowing designers and developers to quickly discover, study, and apply proven motion patterns in their own products.",
    gallery: [
      "https://www.ripplix.com/images/og/og-default.png",
      "https://www.ripplix.com/images/project1.png",
      "https://www.ripplix.com/images/project2.png"
    ]
  },
  {
    id: "nova-commerce",
    number: "02",
    title: "Nova Commerce",
    year: "2025",
    role: "Full-Stack Developer",
    liveUrl: "https://example.com/nova-commerce",
    description: "High-conversion e-commerce storefront with immersive product storytelling.",
    stack: ["React", "Tailwind", "Laravel", "MySQL", "Stripe"],
    problem: "The existing storefront lacked hierarchy and trust signals, causing drop-off in key checkout moments.",
    solution: "Redesigned the purchase journey, rebuilt API contracts for reliability, and shipped a component system tuned for conversion-focused UX.",
    gallery: [
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?auto=format&fit=crop&w=1400&q=80"
    ]
  },
  {
    id: "pulse-studio",
    number: "03",
    title: "Pulse Studio",
    year: "2025",
    role: "UI Engineer",
    liveUrl: "https://example.com/pulse-studio",
    description: "Portfolio CMS and media engine for a creative production studio.",
    stack: ["React", "GSAP", "Framer Motion", "Supabase", "Figma"],
    problem: "The studio needed a fast publishing workflow while keeping high visual craft across every case study page.",
    solution: "Designed a structured content model, built reusable motion primitives, and delivered a flexible editor-to-web pipeline.",
    gallery: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1400&q=80"
    ]
  },
  {
    id: "orbit-pay",
    number: "04",
    title: "Orbit Pay",
    year: "2024",
    role: "Frontend Developer",
    liveUrl: "https://example.com/orbit-pay",
    description: "Fintech dashboard focused on transaction clarity and risk-aware decisioning.",
    stack: ["React", "TypeScript", "Tailwind", "Charting", "REST API"],
    problem: "Complex payment flows and unclear visual hierarchy made key financial actions difficult for operators.",
    solution: "Implemented a clearer information architecture, reduced cognitive load in dense screens, and improved operational confidence with contextual states.",
    gallery: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80"
    ]
  }
];
