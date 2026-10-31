import { ArrowLeftIcon, ArrowUpRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { MonoLabel } from "@/components/mono-label";
import { PageTransition } from "@/components/page-transition";
import { ProjectLogo } from "@/components/project-logo";
import { ProjectName } from "@/components/project-name";
import { ProjectScreenshot } from "@/components/project-screenshot";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
          render={<Link href="/#projects" transitionTypes={["nav-back"]} />}
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
          <h1 className="mt-6 flex items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            <ProjectLogo
              project={project}
              className={project.logo.wordmark ? "h-10" : "size-9"}
            />
            <ProjectName project={project} />
          </h1>
        </ViewTransition>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
          {project.summary}
        </p>

        <ProjectScreenshot
          project={project}
          eager
          sizes="(min-width: 1024px) 976px, calc(100vw - 48px)"
          className="mt-10"
        />

        {/* Metadata sits in a left rail on large screens. */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12">
          <dl className="flex flex-col gap-5 text-sm">
            <div className="flex flex-col gap-1">
              <dt>
                <MonoLabel>Year</MonoLabel>
              </dt>
              <dd>{project.year}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt>
                <MonoLabel>Role</MonoLabel>
              </dt>
              <dd>{project.role}</dd>
            </div>
            {project.event && (
              <div className="flex flex-col gap-1">
                <dt>
                  <MonoLabel>Event</MonoLabel>
                </dt>
                <dd>{project.event}</dd>
              </div>
            )}
            <div className="flex flex-col gap-1.5">
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
            </div>
          </dl>

          <div className="flex min-w-0 flex-col gap-10">
            <div className="flex flex-col gap-4 leading-relaxed">
              {project.description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {(project.liveUrl || project.repoUrl) && (
              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <Button
                    size="lg"
                    nativeButton={false}
                    render={
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                      />
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
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                      />
                    }
                  >
                    Source code
                    <ArrowUpRightIcon data-icon="inline-end" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </article>
    </PageTransition>
  );
}
