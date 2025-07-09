import { ProjectCard } from "@/components/ProjectCard";
import { Project } from "@/types/project";

const projects: Project[] = [
  {
    name: "Portfolio Website",
    description:
      "Trang portfolio cá nhân, responsive, xây dựng với Next.js & shadcn/ui.",
    image: "/images/projects/portfolio.png",
    website: "#",
    github: "https://github.com/lgdlong/lgd-portfolio",
  },
  {
    name: "Learn JPD FPT",
    description:
      "Hệ thống học tập trực tuyến cho sinh viên JPD FPT, bao gồm các tính năng như đăng ký khóa học, quản lý bài tập và điểm số.",
    image: "/images/projects/learn-jpd-fpt.png",
    website: "https://learn-jpd-fpt.vercel.app",
    github: "https://github.com/lgdlong/learn-jpd-fpt",
  },
  // thêm các project khác
];

export default function ProjectsPage() {
  return (
    <section className="flex flex-col items-center gap-6 py-10">
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </section>
  );
}
