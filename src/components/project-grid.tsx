import { ProjectCard } from "@/components/project-card";
import { ProjectReveal } from "@/components/project-reveal";
import type { Project } from "@/data/projects";

function Cards({ projects, eager }: { projects: Project[]; eager?: boolean }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {projects.map((project, index) => (
        <li key={project.slug}>
          <ProjectCard project={project} eager={eager && index === 0} />
        </li>
      ))}
    </ul>
  );
}

// Featured projects in full; the rest wait behind "See all".
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <div>
      <Cards projects={featured} eager />
      {rest.length > 0 && (
        <ProjectReveal total={projects.length}>
          <Cards projects={rest} />
        </ProjectReveal>
      )}
    </div>
  );
}
