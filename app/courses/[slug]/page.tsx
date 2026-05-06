import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { getAllCourseSlugs, getCourseBySlug, type Course } from "@/data/courses";
import CourseLanding from "./CourseLanding";

const SITE_URL = "https://abdulrahman-portfolio.vercel.app";

export function generateStaticParams() {
  return getAllCourseSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const course = getCourseBySlug(params.slug);
  if (!course) return {};

  const title = `${course.titleEn} — Abdulrahman Alnashri`;
  const url = `${SITE_URL}/courses/${course.slug}`;
  const description = `${course.titleEn}. ${course.modules.length} modules${course.totalDuration ? ` · ${course.totalDuration}` : ""}.`;
  const ogImage = course.image.startsWith("http") ? course.image : `${SITE_URL}${course.image}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images: [{ url: ogImage, alt: course.titleEn }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

function buildCourseSchema(course: Course) {
  const url = `${SITE_URL}/courses/${course.slug}`;
  const image = course.image.startsWith("http") ? course.image : `${SITE_URL}${course.image}`;
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${url}#course`,
    name: course.titleEn,
    url,
    image,
    provider: { "@id": `${SITE_URL}/#person` },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: course.totalDuration,
    },
    numberOfCredits: course.modules.length,
  };
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug);
  if (!course) notFound();
  return (
    <>
      <Script
        id={`course-schema-${course.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildCourseSchema(course)) }}
      />
      <CourseLanding course={course} />
    </>
  );
}
