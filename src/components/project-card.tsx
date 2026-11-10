import Link from "next/link";
import { MetaLabel } from "@/components/meta-label";
import { ProjectMedia } from "@/components/project-media";
import { ProjectTitle } from "@/components/project-title";
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
import { signalSurface, signalTitle } from "@/lib/styles";
import { cn } from "@/lib/utils";

// A featured project: its screenshot (or cover) above the title, summary,
// role and stack.
export function ProjectCard({
  project,
  eager,
}: {
  project: Project;
  // Set this on the first card, whose screenshot is above the fold.
  eager?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      transitionTypes={["nav-forward"]}
      className="group block h-full rounded-xl outline-none"
    >
      <Card
        className={cn(
          "h-full pt-0 [--card-spacing:--spacing(5)]",
          signalSurface,
        )}
      >
        <ProjectMedia
          project={project}
          eager={eager}
          sizes="(min-width: 1280px) 600px, (min-width: 768px) calc(50vw - 48px), calc(100vw - 32px)"
          className="rounded-none border-b ring-0"
        />

        <CardHeader className="gap-2">
          <CardTitle className={cn("text-2xl", signalTitle)}>
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
