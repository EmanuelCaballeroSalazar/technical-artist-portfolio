export type MediaVideo = {
  title: string;
  description: string;
  youtube?: string;
};

export type ProjectSection = {
  slug: string;
  title: string;
  label: string;
  description: string;
  mediaLoop: string;
  videos: MediaVideo[];
};

export type ProductionCharacter = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  heroVideo: string;
  previewVideo?: string;
  heroImage: string;
  overview: string;
  responsibilities: string[];
  tools: string[];
  mediaLoop: string;
  gallery: string[];
  sections: ProjectSection[];
};

export type ProductionProject = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  heroVideo: string;
  heroImage: string;
  overview: string;
  responsibilities: string[];
  tools: string[];
  mediaLoop: string;
  gallery: string[];
  glb: string;
  sections: ProjectSection[];
  characters?: ProductionCharacter[];
};
