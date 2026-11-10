import { ViewTransition } from "react";
import { ProjectLogo } from "@/components/project-logo";
import { ProjectName } from "@/components/project-name";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

// A project's logo and name, set in the pixel face like every title. The
// home page and the project page share its view-transition name, so the
// title morphs between the two.
export function ProjectTitle({
  project,
  as: Tag = "h3",
  logoClassName,
  className,
}: {
  project: Project;
  as?: "h3" | "span";
  // Height of the logo; wordmarks get a little more room than square marks.
  logoClassName?: { mark: string; wordmark: string };
  className?: string;
}) {
  const sizes = logoClassName ?? { mark: "size-5", wordmark: "h-5" };
  return (
    <ViewTransition
      name={`project-title-${project.slug}`}
      share="morph"
      default="none"
    >
      <Tag className={cn("flex items-center gap-2 font-pixel", className)}>
        <ProjectLogo
          project={project}
          className={project.logo?.wordmark ? sizes.wordmark : sizes.mark}
        />
        <ProjectName project={project} />
      </Tag>
    </ViewTransition>
  );
}
