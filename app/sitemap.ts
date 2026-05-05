import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://abdulrahman-portfolio.vercel.app";
  const lastModified = new Date();

  const projectRoutes: MetadataRoute.Sitemap = getAllProjectSlugs().map((slug) => ({
    url: `${base}/projects/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    { url: `${base}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/#about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#projects`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/#achievements`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/#certificates`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/#contact`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    ...projectRoutes,
  ];
}
