import Image from "next/image";
import type { ComponentProps } from "react";
import { ProjectLogo } from "@/components/project-logo";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type ProjectMediaProps = Pick<
  ComponentProps<typeof Image>,
  "sizes" | "className"
> & {
  project: Project;
  // Set this when the image is the largest thing above the fold.
  eager?: boolean;
  // Off when something around it already draws the frame, like a card.
  framed?: boolean;
};

// A project's screenshot, cropped to 16:10 so cards line up. Projects without
// one get a cover of the same shape instead: the logo large on a tinted
// panel, or the name when there is no logo.
export function ProjectMedia({
  project,
  eager,
  framed = true,
  className,
  sizes,
}: ProjectMediaProps) {
  const frame = cn("aspect-[16/10] w-full", framed && "pixel-frame");

  if (!project.screenshot) {
    return (
      <div
        className={cn(
          frame,
          "flex items-center justify-center bg-muted",
          className,
        )}
      >
        {project.logo ? (
          <ProjectLogo
            project={project}
            className={cn(
              project.logo.wordmark ? "h-1/5" : "h-2/5",
            )}
          />
        ) : (
          <span className="text-3xl tracking-tight text-muted-foreground sm:text-4xl">
            {project.title}
          </span>
        )}
      </div>
    );
  }

  const { src, alt, width, height } = project.screenshot;
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      className={cn(frame, "h-auto object-cover object-top", className)}
    />
  );
}
