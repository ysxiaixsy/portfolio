import { MenuList } from "@/components/menu-list";
import { ProjectCard } from "@/components/project-card";
import { ProjectRow } from "@/components/project-row";
import type { Project } from "@/data/projects";

// Featured projects as cards with their screenshots; the rest as a list.
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <div className="flex flex-col gap-16">
      <ul className="grid gap-6 md:grid-cols-2">
        {featured.map((project, index) => (
          <li key={project.slug}>
            <ProjectCard project={project} eager={index === 0} />
          </li>
        ))}
      </ul>

      {rest.length > 0 && (
        <div>
          <h3 className="text-2xl tracking-tight">
            More projects
          </h3>
          {/* The last row drops its bottom rule: the section's Separator
              follows. */}
          <MenuList className="mt-4 pixel-rule pt-(--pixel)">
            {rest.map((project) => (
              <li key={project.slug} className="last:*:bg-none">
                <ProjectRow project={project} />
              </li>
            ))}
          </MenuList>
        </div>
      )}
    </div>
  );
}
