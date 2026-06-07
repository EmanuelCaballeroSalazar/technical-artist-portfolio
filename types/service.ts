export type ServiceCard = {
  slug: string;
  title: string;
  shortTitle: string;
  href: string;
  description: string;
  mediaLoop: string;
  points: string[];
};

export type ServicePage = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  heroVideo: string;
  pillars: string[];
  projectSlugs: string[];
  customSections?: {
    title: string;
    label: string;
    description: string;
    mediaLoop: string;
  }[];
};
