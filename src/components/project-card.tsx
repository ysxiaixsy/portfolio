import Link from "next/link";
import { ViewTransition } from "react";
import { MonoLabel } from "@/components/mono-label";
import { ProjectLogo } from "@/components/project-logo";
import { ProjectName } from "@/components/project-name";
import { ProjectMedia } from "@/components/project-media";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardAction,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { Tilt } from "@/components/ui/tilt";
import type { Project } from "@/data/projects";
import { signalSurface } from "@/lib/styles";
import { cn } from "@/lib/utils";

// Far below the component's default of 64px: backdrop blur costs more the
// wider its radius, and this has to stay smooth on low-end devices.
const BLUR_LEVELS = [0.5, 1, 1.5, 2, 3, 4, 6, 8];

export function ProjectCard({
  project,
  eager,
}: {
  project: Project;
  // Set this on the first card, whose screenshot is above the fold.
  eager?: boolean;
}) {
  return (
    <Tilt rotationFactor={8} isRevese className="h-full">
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
          <div className="relative border-b">
            <ProjectMedia
              project={project}
              eager={eager}
              sizes="(min-width: 1280px) 600px, (min-width: 768px) calc(50vw - 48px), calc(100vw - 48px)"
              className="rounded-none ring-0"
            />
            {project.screenshot && (
              <ProgressiveBlur height="25%" blurLevels={BLUR_LEVELS} />
            )}
          </div>

          <CardHeader className="gap-2">
            <CardTitle className="text-xl">
              {/* Morphs into the heading on the project page. */}
              <ViewTransition
                name={`project-title-${project.slug}`}
                share="morph"
                default="none"
              >
                <h3 className="flex items-center gap-2">
                  <ProjectLogo
                    project={project}
                    className={project.logo?.wordmark ? "h-5" : "size-5"}
                  />
                  <ProjectName project={project} />
                </h3>
              </ViewTransition>
            </CardTitle>
            {project.inProgress && (
              <CardAction>
                <Badge variant="outline">In progress</Badge>
              </CardAction>
            )}
            <CardDescription>{project.summary}</CardDescription>
          </CardHeader>

          <CardContent>
            <dl className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-4 gap-y-3">
              <dt>
                <MonoLabel>Role</MonoLabel>
              </dt>
              <dd>{project.role}</dd>
              <dt>
                <MonoLabel>Stack</MonoLabel>
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <li key={tech}>
                      <Badge variant="secondary">{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
          </CardContent>
        </Card>
      </Link>
    </Tilt>
  );
}
