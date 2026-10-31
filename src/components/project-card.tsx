import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { ViewTransition } from "react";
import { MonoLabel } from "@/components/mono-label";
import { ProjectLogo } from "@/components/project-logo";
import { ProjectName } from "@/components/project-name";
import { ProjectScreenshot } from "@/components/project-screenshot";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Project, projectNumber } from "@/data/projects";

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
      className="group block h-full rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Card className="h-full transition-shadow group-hover:ring-foreground/25 [--card-spacing:--spacing(5)]">
        <ProjectScreenshot
          project={project}
          eager={eager}
          sizes="(min-width: 1024px) 570px, (min-width: 768px) calc(50vw - 32px), calc(100vw - 48px)"
          className="rounded-none border-b ring-0"
        />

        <CardHeader className="gap-2">
          <CardTitle className="flex items-center gap-3 text-xl">
            <MonoLabel>{projectNumber(project)}</MonoLabel>
            {/* Morphs into the heading on the project page. */}
            <ViewTransition
              name={`project-title-${project.slug}`}
              share="morph"
              default="none"
            >
              <h3 className="flex items-center gap-2 group-hover:underline">
                <ProjectLogo
                  project={project}
                  className={project.logo.wordmark ? "h-5" : "size-5"}
                />
                <ProjectName project={project} />
              </h3>
            </ViewTransition>
          </CardTitle>
          <CardDescription>{project.summary}</CardDescription>
          <CardAction>
            <MonoLabel>{project.year}</MonoLabel>
          </CardAction>
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

        {/* Keeps the footers level when tiles in a row differ in length. */}
        <CardFooter className="mt-auto">
          <span className="inline-flex items-center gap-1.5 font-medium transition-colors group-hover:text-highlight">
            Read case study
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
