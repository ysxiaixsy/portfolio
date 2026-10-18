import localFont from "next/font/local";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const agency = localFont({
  src: "../../public/projects/rateupv/AgencyFB-Bold.ttf",
  weight: "700",
  display: "swap",
  fallback: ["Impact", "sans-serif"],
});

export function ProjectName({ project }: { project: Project }) {
  if (project.logo.wordmark) return null;
  if (project.slug !== "rateupv") return project.title;

  return (
    <span
      aria-label={project.title}
      className={cn(
        agency.className,
        "text-[1.25em] leading-none font-bold tracking-wide whitespace-nowrap",
      )}
    >
      RATE<span className="text-rateupv-primary">UPV</span>
    </span>
  );
}
