export type SocialLink = {
  label: string;
  href: string;
};

export type HeroContent = {
  name: string;
  role: string;
  statement: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export type AboutContent = {
  eyebrow: string;
  title: string;
  intro: string;
  highlights: string[];
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type ProjectItem = {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  liveUrl: string;
  repoUrl: string;
  imageHint: string;
  featured?: boolean;
};

export type ExperienceItem = {
  id: string;
  period: string;
  role: string;
  company: string;
  summary: string;
};

export type ContactContent = {
  title: string;
  description: string;
  email: string;
  availability: string;
};

export type FooterContent = {
  note: string;
};

export type PortfolioContent = {
  hero: HeroContent;
  about: AboutContent;
  skillGroups: SkillGroup[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  contact: ContactContent;
  footer: FooterContent;
};
