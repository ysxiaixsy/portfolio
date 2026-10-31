import { ProjectCard } from "@/components/project-card";
import { Separator } from "@/components/ui/separator";
import type { Project } from "@/data/projects";

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul className="flex flex-col gap-8">
      {projects.map((project) => (
        <li key={project.slug} className="flex flex-col gap-8">
          <Separator />
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
