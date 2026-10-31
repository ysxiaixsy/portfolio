import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { ProjectGrid } from "@/components/project-grid";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const sorted = [...projects].sort((a, b) => b.year - a.year);

  return (
    <PageTransition>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-3 text-muted-foreground">
          Things I&apos;ve built or contributed to, newest first.
        </p>
        <div className="mt-10">
          <ProjectGrid projects={sorted} />
        </div>
      </div>
    </PageTransition>
  );
}
