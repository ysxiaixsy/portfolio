import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og-image";

export const alt = `A project by ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return renderOgImage({
    eyebrow: `Project · ${project.year}`,
    title: project.title,
    description: project.summary,
    logo: project.logo,
  });
}
