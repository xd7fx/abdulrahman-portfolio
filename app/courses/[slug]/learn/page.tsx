import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCourseSlugs, getCourseBySlug } from "@/data/courses";
import LearnClient from "./LearnClient";

export function generateStaticParams() {
  return getAllCourseSlugs().map((slug) => ({ slug }));
}

export const metadata: Metadata = {
  // Player pages are interactive and auth-gated client-side; keep them out of search.
  robots: { index: false, follow: false },
};

export default function LearnPage({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug);
  if (!course) notFound();
  return <LearnClient course={course} />;
}
