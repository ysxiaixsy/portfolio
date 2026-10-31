import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

// Wide and narrow tiles swap sides on each row, so rows don't line up.
function isWide(index: number) {
  return index % 4 === 0 || index % 4 === 3;
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-12">
      {projects.map((project, index) => (
        <li
          key={project.slug}
          className={cn(
            "md:col-span-6",
            isWide(index) ? "lg:col-span-7" : "lg:col-span-5",
          )}
        >
          <ProjectCard project={project} eager={index === 0} />
        </li>
      ))}
    </ul>
  );
}
