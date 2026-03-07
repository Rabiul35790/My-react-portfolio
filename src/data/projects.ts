export type Project = {
  id: string;
  number: string;
  title: string;
  year: string;
  role: string;
  description: string;
  stack: string[];
  problem: string;
  solution: string;
  gallery: string[];
};

export const projects: Project[] = [
  {
    id: "atlas-analytics",
    number: "01",
    title: "Atlas Analytics",
    year: "2026",
    role: "Lead Frontend Engineer",
    description: "Real-time product analytics platform with cinematic dashboard interactions.",
    stack: ["React", "TypeScript", "GSAP", "Node", "PostgreSQL"],
    problem: "The team needed to transform raw behavioral events into executive-level insight without sacrificing speed or clarity.",
    solution: "Built a modular data-visualization system, optimized rendering paths, and designed a motion-led UI language that preserved readability under heavy data load.",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80"
    ]
  },
  {
    id: "nova-commerce",
    number: "02",
    title: "Nova Commerce",
    year: "2025",
    role: "Full-Stack Developer",
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
