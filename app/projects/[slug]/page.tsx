import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { getAllProjectSlugs, getProjectBySlug, type Project } from "@/data/projects";
import ProjectDetail from "./ProjectDetail";

const SITE_URL = "https://abdulrahman-portfolio.vercel.app";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};

  const title = `${project.titleEn} — Abdulrahman Alnashri`;
  const url = `${SITE_URL}/projects/${project.slug}`;
  const description = `${project.titleEn}. Tech: ${project.tech.slice(0, 6).join(", ")}.`;
  const ogImage = project.image.startsWith("http") ? project.image : `${SITE_URL}${project.image}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images: [{ url: ogImage, alt: project.titleEn }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

function buildProjectSchema(project: Project) {
  const url = `${SITE_URL}/projects/${project.slug}`;
  const image = project.image.startsWith("http") ? project.image : `${SITE_URL}${project.image}`;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#creativework`,
    name: project.titleEn,
    headline: project.titleEn,
    url,
    image,
    keywords: project.tech.join(", "),
    creator: { "@id": `${SITE_URL}/#person` },
    ...(project.year && { dateCreated: project.year }),
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
  return (
    <>
      <Script
        id={`project-schema-${project.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildProjectSchema(project)) }}
      />
      <ProjectDetail project={project} />
    </>
  );
}
