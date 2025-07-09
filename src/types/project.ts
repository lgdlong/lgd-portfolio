// src/types/project.ts
export type Project = {
  name: string;
  description: string;
  image: string;
  website: string;
  github: string;
};
export type ProjectCardProps = {
  project: Project;
};
export type ProjectsPageProps = {
  projects: Project[];
};
