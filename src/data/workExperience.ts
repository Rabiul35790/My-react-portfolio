export type WorkExperience = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  achievements: string[];
};

export const workExperiences: WorkExperience[] = [
  {
    company: "Ripplix",
    role: "Full-Stack Software Developer",
    period: "2025 - Present",
    location: "Remote",
    summary:
      "Building product features across web app and plugin ecosystem with a focus on quality, performance, and clean architecture.",
    achievements: [
      "Designed and shipped subscription and content workflow features.",
      "Built reusable frontend patterns to speed up product iteration.",
      "Improved API and database flows for better maintainability."
    ]
  },
  {
    company: "9AM Solution",
    role: "Full Stack Developer",
    period: "2024 - 2025",
    location: "Dhaka, Bangladesh",
    summary:
      "Delivered client websites and internal tooling while balancing backend reliability and modern frontend experience.",
    achievements: [
      "Implemented responsive company websites with clean CMS integration.",
      "Reduced delivery time by introducing reusable project scaffolding.",
      "Collaborated directly with clients to translate requirements into releases."
    ]
  }
];
