import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/data/projects";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {projects.map((project, index) => (
        <li key={project.slug}>
          <ProjectCard project={project} eager={index === 0} />
        </li>
      ))}
    </ul>
  );
}
