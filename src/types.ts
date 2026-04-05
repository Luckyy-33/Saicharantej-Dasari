export interface Resource {
  title: string;
  url: string;
  type: 'course' | 'video' | 'article' | 'tool';
  provider: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
  dueDate?: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  summary?: string;
  category: 'Fintech' | 'General' | 'Compliance';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  tags: string[];
  milestones: ProjectMilestone[];
}

export interface Milestone {
  stage: number;
  title: string;
  duration: string; // Base duration (e.g., "4 weeks")
  description: string;
  topics: string[];
  resources: Resource[];
}

export interface RoadmapData {
  why: string[];
  retentionRules: { title: string; rule: string }[];
  milestones: Milestone[];
  projects: Project[];
}
