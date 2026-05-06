export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;          // One-liner for grid cards
  problem: string;            // The pain point addressed
  solution: string;           // The technical approach
  myRole: string;             // e.g., "Lead Front-End Developer"
  techStack: string[];        // For UI badges and filtering
  outcomes: string[];         // Quantifiable metrics
  media: ProjectMedia[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  testimonial?: Testimonial;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMedia {
  src: string;
  alt: string;
  type: 'image' | 'video';
  caption?: string;
}

export interface Testimonial {
  author: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
}

export interface ProjectFilter {
  tech?: string;
  featured?: boolean;
  search?: string;
}
