import Link from "next/link";
import { MetaLabel } from "@/components/meta-label";
import { ProjectMedia } from "@/components/project-media";
import { ProjectTitle } from "@/components/project-title";
import { SelectionCorners } from "@/components/selection-corners";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/data/projects";
import { signalSurface } from "@/lib/styles";
import { cn } from "@/lib/utils";

// A featured project: its screenshot (or cover) above the title, summary,
// role and stack. Hovered or focused, the card lifts and selection brackets
// light its corners; the name keeps its own colours.
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      transitionTypes={["nav-forward"]}
      className="group block h-full"
    >
      <Card
        className={cn(
          // A card you can open stands off the page.
          "relative h-full pt-0 pixel-raised [--card-spacing:--spacing(5)]",
          signalSurface,
        )}
      >
        <SelectionCorners />
        <ProjectMedia
          project={project}
          sizes="(min-width: 1280px) 600px, (min-width: 768px) calc(50vw - 48px), calc(100vw - 32px)"
          framed={false}
          className="border-b-(length:--pixel) border-frame"
        />

        <CardHeader className="gap-2">
          <CardTitle className="text-2xl">
            <ProjectTitle project={project} />
          </CardTitle>
          {project.inProgress && (
            <CardAction>
              <Badge variant="outline">In progress</Badge>
            </CardAction>
          )}
          <CardDescription className="text-base leading-relaxed">
            {project.summary}
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-auto">
          <dl className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-4 gap-y-2">
            <dt>
              <MetaLabel>Role</MetaLabel>
            </dt>
            <dd>{project.role}</dd>
            <dt>
              <MetaLabel>Stack</MetaLabel>
            </dt>
            <dd>{project.tech.join(", ")}</dd>
          </dl>
        </CardContent>
      </Card>
    </Link>
  );
}
