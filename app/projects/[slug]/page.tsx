import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjectSlugs, getProjectBySlug } from "@/data/projects";
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

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
