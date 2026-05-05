import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAchievementBySlug, getAllAchievementSlugs } from "@/data/achievements";
import AchievementDetail from "./AchievementDetail";

const SITE_URL = "https://abdulrahman-portfolio.vercel.app";

export function generateStaticParams() {
  return getAllAchievementSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const achievement = getAchievementBySlug(params.slug);
  if (!achievement) return {};

  // Achievements don't have a canonical English title field — use slug-derived label.
  const titleLabel = achievement.slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
  const pageTitle = `${titleLabel} — Abdulrahman Alnashri`;
  const url = `${SITE_URL}/achievements/${achievement.slug}`;
  const description = `Achievement (${achievement.year}): ${titleLabel}.`;
  const ogImage = achievement.image
    ? achievement.image.startsWith("http")
      ? achievement.image
      : `${SITE_URL}${achievement.image}`
    : `${SITE_URL}/og-image.png`;

  return {
    title: pageTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: pageTitle,
      description,
      url,
      images: [{ url: ogImage, alt: titleLabel }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImage],
    },
  };
}

export default function AchievementPage({ params }: { params: { slug: string } }) {
  const achievement = getAchievementBySlug(params.slug);
  if (!achievement) notFound();
  return <AchievementDetail achievement={achievement} />;
}
