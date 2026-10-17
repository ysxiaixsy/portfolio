import Image from "next/image";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

// Height comes from className; width follows the artwork's aspect ratio.
export function ProjectLogo({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const { logo, title } = project;
  // A wordmark is the name itself; a mark sits next to the title text.
  const alt = logo.wordmark ? title : "";
  const props = { width: logo.width, height: logo.height, unoptimized: true };

  return (
    <>
      <Image
        {...props}
        alt={alt}
        src={logo.src}
        className={cn("w-auto", logo.darkSrc && "dark:hidden", className)}
      />
      {logo.darkSrc && (
        <Image
          {...props}
          alt={alt}
          src={logo.darkSrc}
          className={cn("hidden w-auto dark:block", className)}
        />
      )}
    </>
  );
}
