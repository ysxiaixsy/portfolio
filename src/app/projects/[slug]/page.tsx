import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { MetaLabel } from "@/components/meta-label";
import { PageTransition } from "@/components/page-transition";
import { ArrowLeftIcon, ExternalLinkIcon } from "@/components/pixel-icons";
import { ProjectMedia } from "@/components/project-media";
import { ProjectTitle } from "@/components/project-title";
import { Title } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { getProject, projects } from "@/data/projects";

// Every project page is prerendered, so a navigation waits for the whole
// page rather than showing a shell first: the title morph needs the heading
// in place when the transition starts.
export const instant = false;

// One part of a project's case study: a subheading over prose.
function StorySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex max-w-3xl flex-col gap-5 text-lg leading-relaxed">
      <h2 className="text-2xl tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  // An unknown slug renders the 404 page (notFound below), so title it too.
  return project
    ? { title: project.title, description: project.summary }
    : { title: "Page not found" };
}

export default async function ProjectPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();
  const { story } = project;

  return (
    <PageTransition>
      <article className="py-12 sm:py-16">
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

        {/* Morphs from the project's title on the home page. */}
        <Title as="h1" className="mt-8">
          <ProjectTitle
            project={project}
            as="span"
            className="gap-3"
            logoClassName={{
              mark: "size-9 sm:size-11",
              wordmark: "h-10 sm:h-12",
            }}
          />
        </Title>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {project.summary}
        </p>

        {/* Covers suit the project grid; here only a real screenshot shows. */}

        {project.screenshot && (
          <ProjectMedia
            project={project}
            eager
            sizes="(min-width: 1280px) 1210px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 32px)"
            className="mt-10"
          />
        )}

        {/* Metadata sits in a left rail on large screens. */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12">
          <dl className="flex flex-col gap-5">
            {project.inProgress && (
              <div className="flex flex-col gap-1">
                <dt>
                  <MetaLabel>Status</MetaLabel>
                </dt>
                <dd>In progress</dd>
              </div>
            )}
            <div className="flex flex-col gap-1">
              <dt>
                <MetaLabel>Year</MetaLabel>
              </dt>
              <dd>{project.year}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt>
                <MetaLabel>Role</MetaLabel>
              </dt>
              <dd>{project.role}</dd>
            </div>
            {project.event && (
              <div className="flex flex-col gap-1">
                <dt>
                  <MetaLabel>Event</MetaLabel>
                </dt>
                <dd>{project.event}</dd>
              </div>
            )}
            <div className="flex flex-col gap-1">
              <dt>
                <MetaLabel>Stack</MetaLabel>
              </dt>
              <dd>{project.tech.join(", ")}</dd>
            </div>
          </dl>

          {/* The case study: overview, my part, the decisions that shaped
              it, and where it stands. */}
          <div className="flex min-w-0 flex-col gap-14">
            <StorySection title="Overview">
              {story.overview.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </StorySection>

            <StorySection title="What I did">
              {story.role.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </StorySection>

            {story.decisions && (
              <StorySection title="Key decisions">
                <ol className="flex flex-col gap-6">
                  {story.decisions.map((decision) => (
                    <li key={decision.title} className="flex gap-4">
                      {/* A pixel dot, as on the journey timeline. */}
                      <span
                        aria-hidden="true"
                        className="mt-[0.6em] size-[calc(var(--pixel)*2)] shrink-0 bg-foreground"
                      />
                      <div className="flex flex-col gap-1">
                        <h3>{decision.title}</h3>
                        <p className="text-muted-foreground">
                          {decision.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </StorySection>
            )}

            <StorySection title="Where it stands">
              <p>{story.status}</p>
            </StorySection>

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
                    <ExternalLinkIcon data-icon="inline-end" />
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
                    <ExternalLinkIcon data-icon="inline-end" />
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
