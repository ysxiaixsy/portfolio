import Link from "next/link";
import { ViewTransition } from "react";
import { MonoLabel } from "@/components/mono-label";
import { ProjectLogo } from "@/components/project-logo";
import { ProjectName } from "@/components/project-name";
import { ProjectScreenshot } from "@/components/project-screenshot";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { Tilt } from "@/components/ui/tilt";
import type { Project } from "@/data/projects";

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
        className="group block h-full rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <Card className="h-full pt-0 ring-2 ring-foreground/15 transition-shadow group-hover:shadow-glow group-hover:ring-3 group-hover:ring-highlight/60 [--card-spacing:--spacing(5)]">
          <div className="relative border-b">
            <ProjectScreenshot
              project={project}
              eager={eager}
              sizes="(min-width: 1024px) 480px, (min-width: 768px) calc(50vw - 32px), calc(100vw - 48px)"
              className="rounded-none ring-0"
            />
            <ProgressiveBlur height="25%" blurLevels={BLUR_LEVELS} />
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
                    className={project.logo.wordmark ? "h-5" : "size-5"}
                  />
                  <ProjectName project={project} />
                </h3>
              </ViewTransition>
            </CardTitle>
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
