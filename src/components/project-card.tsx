import Link from "next/link";
import { MetaLabel } from "@/components/meta-label";
import { ProjectMedia } from "@/components/project-media";
import { ProjectTitle } from "@/components/project-title";
import { SelectionCorners } from "@/components/selection-corners";
import { StatusBadge } from "@/components/status-badge";
import { TechList } from "@/components/tech-list";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Window } from "@/components/window";
import { type Project, projectNumber } from "@/data/projects";

// A featured project, as a quest in its own window: the quest number and
// where it stands in the title bar, then its screenshot (or cover), title,
// summary, role and stack. Hovered or focused, the window lifts and selection
// brackets light its corners; the name keeps its own colours.
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      transitionTypes={["nav-forward"]}
      className="group block h-full"
    >
      <Window
        linked
        title={`Quest ${projectNumber(project)}`}
        aside={<StatusBadge project={project} />}
        className="h-full [--card-spacing:--spacing(5)]"
      >
        <SelectionCorners />
        <ProjectMedia
          project={project}
          sizes="(min-width: 1280px) 600px, (min-width: 768px) calc(50vw - 48px), calc(100vw - 32px)"
          framed={false}
          className="border-b-(length:--pixel) border-foreground"
        />

        <CardHeader className="gap-2 pt-(--card-spacing)">
          <CardTitle className="text-2xl">
            <ProjectTitle project={project} />
          </CardTitle>
          <CardDescription className="text-base leading-relaxed">
            {project.summary}
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-auto py-(--card-spacing)">
          <dl className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-4 gap-y-3">
            <dt>
              <MetaLabel>Role</MetaLabel>
            </dt>
            <dd>{project.role}</dd>
            <dt>
              <MetaLabel>Stack</MetaLabel>
            </dt>
            <dd>
              <TechList tech={project.tech} />
            </dd>
          </dl>
        </CardContent>
      </Window>
    </Link>
  );
}
