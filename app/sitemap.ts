import { site } from "@/data/site";
import type { MetadataRoute } from "next";
import { awards } from "@/data/achievements";
import { getAllCourseSlugs } from "@/data/courses";
import { getAllProjectSlugs } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const lastModified = new Date();

  const projectRoutes: MetadataRoute.Sitemap = getAllProjectSlugs().map((slug) => ({
    url: `${base}/projects/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const achievementRoutes: MetadataRoute.Sitemap = awards.map(({ slug }) => ({
    url: `${base}/achievements/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Course landing pages are public; /learn pages are auth-gated and excluded.
  const courseRoutes: MetadataRoute.Sitemap = getAllCourseSlugs().map((slug) => ({
    url: `${base}/courses/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    { url: `${base}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    ...projectRoutes,
    ...achievementRoutes,
    ...courseRoutes,
  ];
}
