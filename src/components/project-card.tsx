import Link from "next/link";
import { ViewTransition } from "react";
import { ProjectLogo } from "@/components/project-logo";
import { ProjectName } from "@/components/project-name";
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

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      transitionTypes={["nav-forward"]}
      className="group block rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Card className="transition-shadow group-hover:ring-foreground/25">
        <CardHeader>
          <CardTitle>
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
          <CardAction className="text-muted-foreground">
            {project.year}
          </CardAction>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <li key={tech}>
                <Badge variant="secondary">{tech}</Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </Link>
  );
}
