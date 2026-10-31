import Image from "next/image";
import type { ComponentProps } from "react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type ProjectScreenshotProps = Pick<
  ComponentProps<typeof Image>,
  "sizes" | "className"
> & {
  project: Project;
  // Set this when the image is the largest thing above the fold.
  eager?: boolean;
};

export function ProjectScreenshot({
  project,
  eager,
  className,
  sizes,
}: ProjectScreenshotProps) {
  if (!project.screenshot) return null;
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
      className={cn("h-auto w-full rounded-lg ring-1 ring-foreground/10", className)}
    />
  );
}
