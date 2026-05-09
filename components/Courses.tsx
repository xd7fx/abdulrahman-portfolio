"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, GraduationCap, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionPlanet from "./SectionPlanet";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { courses } from "@/data/courses";

export default function Courses() {
  const { t, dir } = useLanguage();

  return (
    <section id="courses" className="py-10 md:py-14 relative overflow-hidden z-[1]">
      <SectionPlanet planet="baren" size={460} position="right" verticalAlign="top" />
      <div className="container mx-auto px-4 relative z-[2]">
        <SectionHeader
          title={t("coursesTitle")}
          subtitle={t("coursesSubtitle")}
        />

        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-sm md:text-base lg:text-lg text-space-ice/80 max-w-3xl mx-auto leading-relaxed text-center mb-8 md:mb-10"
          >
            {t("coursesIntro")}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <motion.article
                key={course.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-glow group relative overflow-hidden flex flex-col"
              >
                <Link
                  href={`/courses/${course.slug}`}
                  aria-label={`${t("viewCourse")} — ${course.titleEn}`}
                  className="absolute inset-0 z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan rounded-2xl"
                >
                  <span className="sr-only">{t("viewCourse")}</span>
                </Link>

                <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.titleEn}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${course.color} opacity-40`} />
                  <div
                    className={`absolute top-2 ${dir === "rtl" ? "left-2" : "right-2"} text-3xl drop-shadow-2xl`}
                    aria-hidden
                  >
                    {course.emoji}
                  </div>
                </div>

                <div className="relative z-10 flex flex-col flex-1">
                  <h3 className="text-base md:text-lg font-orbitron font-bold leading-snug mb-2">
                    {t(course.titleKey)}
                  </h3>

                  <p className="text-space-ice/80 mb-4 leading-relaxed text-xs md:text-sm line-clamp-3">
                    {t(course.descriptionKey)}
                  </p>

                  <div className="flex flex-wrap gap-3 text-xs text-space-ice/70 mb-4">
                    {course.level && (
                      <span className="inline-flex items-center gap-1.5">
                        <GraduationCap size={14} className="text-space-cyan" aria-hidden />
                        {course.level}
                      </span>
                    )}
                    {course.totalDuration && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={14} className="text-space-cyan" aria-hidden />
                        {course.totalDuration}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5">
                      <Layers size={14} className="text-space-cyan" aria-hidden />
                      {course.modules.length} {t("courseModules")}
                    </span>
                  </div>

                  <div className="mt-auto flex items-center justify-end relative z-30">
                    <span
                      className="inline-flex items-center gap-1 text-sm font-semibold text-space-cyan group-hover:gap-2 transition-all"
                      aria-hidden
                    >
                      {t("viewCourse")}
                      <ArrowUpRight size={14} className={dir === "rtl" ? "-scale-x-100" : ""} />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
