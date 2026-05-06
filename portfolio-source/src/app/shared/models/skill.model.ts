export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number;              // 0-100
  icon?: string;
  yearsOfExperience?: number;
  projectsUsedIn?: string[];  // Project IDs
}

export type SkillCategory = 
  | 'frontend'
  | 'backend'
  | 'database'
  | 'devops'
  | 'tools'
  | 'soft-skills';

export interface SkillCategoryInfo {
  id: SkillCategory;
  name: string;
  icon: string;
  color: string;
}
