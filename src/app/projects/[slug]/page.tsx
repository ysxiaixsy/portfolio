import { ArrowLeftIcon, ArrowUpRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { PageTransition } from "@/components/page-transition";
import { ProjectLogo } from "@/components/project-logo";
import { ProjectName } from "@/components/project-name";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <PageTransition>
      <article>
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2.5"
          nativeButton={false}
          render={<Link href="/projects" transitionTypes={["nav-back"]} />}
        >
          <ArrowLeftIcon data-icon="inline-start" />
          All projects
        </Button>

        {/* Same name as the title in ProjectCard, so the two morph. */}
        <ViewTransition
          name={`project-title-${project.slug}`}
          share="morph"
          default="none"
        >
          <h1 className="mt-6 flex items-center gap-3 text-3xl font-semibold tracking-tight">
            <ProjectLogo
              project={project}
              className={project.logo.wordmark ? "h-10" : "size-9"}
            />
            <ProjectName project={project} />
          </h1>
        </ViewTransition>
        <p className="mt-3 text-lg text-muted-foreground">{project.summary}</p>

        <Separator className="mt-8" />
        <dl className="grid gap-4 py-6 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Year</dt>
            <dd className="mt-1">{project.year}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Role</dt>
            <dd className="mt-1">{project.role}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-muted-foreground">Tech</dt>
            <dd className="mt-1.5">
              <ul className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <li key={tech}>
                    <Badge variant="secondary">{tech}</Badge>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
        <Separator />

        <div className="mt-8 flex flex-col gap-4 leading-relaxed">
          {project.description.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {(project.liveUrl || project.repoUrl) && (
          <div className="mt-10 flex flex-wrap gap-3">
            {project.liveUrl && (
              <Button
                size="lg"
                nativeButton={false}
                render={
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" />
                }
              >
                Live site
                <ArrowUpRightIcon data-icon="inline-end" />
              </Button>
            )}
            {project.repoUrl && (
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={
                  <a href={project.repoUrl} target="_blank" rel="noreferrer" />
                }
              >
                Source code
                <ArrowUpRightIcon data-icon="inline-end" />
              </Button>
            )}
          </div>
        )}
      </article>
    </PageTransition>
  );
}
