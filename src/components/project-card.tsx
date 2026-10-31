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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Project, projectNumber } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  const keyDecision = project.decisions?.[0];

  return (
    <Link
      href={`/projects/${project.slug}`}
      transitionTypes={["nav-forward"]}
      className="group block rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {/* Text on the left and the screenshot on the right on large screens;
          stacked in source order on small ones. */}
      <Card
        className={cn(
          "gap-6 overflow-visible rounded-none bg-transparent ring-0 [--card-spacing:0px]",
          project.screenshot &&
            "lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:grid-rows-[auto_1fr_auto] lg:gap-x-12",
        )}
      >
        <CardHeader className="gap-3">
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
          <CardDescription className="text-base">
            {project.summary}
          </CardDescription>
          <CardAction>
            <MonoLabel>{project.year}</MonoLabel>
          </CardAction>
        </CardHeader>

        <CardContent className="flex flex-col gap-5">
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
          {keyDecision && (
            <div className="flex flex-col gap-1.5">
              <MonoLabel className="text-highlight">Key decision</MonoLabel>
              <p>{keyDecision.detail}</p>
            </div>
          )}
        </CardContent>

        <ProjectScreenshot
          project={project}
          sizes="(min-width: 1024px) 510px, calc(100vw - 48px)"
          className="lg:col-start-2 lg:row-span-3 lg:row-start-1"
        />

        <CardContent>
          <span className="inline-flex items-center gap-1.5 font-medium transition-colors group-hover:text-highlight">
            Read case study
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
