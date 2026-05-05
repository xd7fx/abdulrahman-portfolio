"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionPlanet from "./SectionPlanet";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { projects } from "@/data/projects";

export default function Projects() {
  const { t, dir } = useLanguage();

  return (
    <section id="projects" className="py-12 relative overflow-hidden z-[1]">
      <SectionPlanet planet="black_hole" size={500} position="left" />
      <div className="container mx-auto px-4 relative z-[2]">
        <SectionHeader
          title={t("projectsTitle")}
          subtitle={t("projectsSubtitle")}
        />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => {
              const title = t(project.titleKey);
              const description = t(project.descriptionKey);
              const achievements = project.achievementKeys.map((k) => t(k));

              return (
                <motion.article
                  key={project.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-glow group relative overflow-hidden flex flex-col"
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    aria-label={`${t("viewDetails")} — ${project.titleEn}`}
                    className="absolute inset-0 z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan rounded-2xl"
                  >
                    <span className="sr-only">{t("viewDetails")}</span>
                  </Link>

                  {project.image && (
                    <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.titleEn || title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-40`} />
                      <div
                        className={`absolute top-2 ${dir === "rtl" ? "left-2" : "right-2"} text-3xl drop-shadow-2xl`}
                        aria-hidden
                      >
                        {project.emoji}
                      </div>
                    </div>
                  )}

                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
                  />

                  <div className="relative z-10 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-3 gap-3">
                      <h3 className="text-lg font-orbitron font-bold leading-snug">
                        {title}
                      </h3>
                      {project.logo && (
                        <div
                          className={`shrink-0 bg-white/90 rounded-lg p-0.5 backdrop-blur-sm ${project.logoSize || "w-16 h-6"}`}
                        >
                          <Image
                            src={project.logo}
                            alt={project.logoAlt || "Organization"}
                            width={80}
                            height={30}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                    </div>

                    <p className="text-space-ice/80 mb-3 leading-relaxed text-sm line-clamp-2">
                      {description}
                    </p>

                    <div className="mb-4 space-y-2">
                      {achievements.slice(0, 2).map((achievement) => (
                        <div
                          key={achievement}
                          className="text-sm text-space-cyan flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-space-cyan shrink-0" />
                          <span className="line-clamp-1">{achievement}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs rounded-full bg-space-blue/30 border border-space-cyan/30 text-space-ice"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-3 py-1 text-xs rounded-full bg-space-blue/20 border border-space-cyan/20 text-space-ice/70">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto flex flex-wrap items-center gap-3 relative z-30">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-space-navy/50 hover:bg-space-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`${t("viewOnGithub")} — ${project.titleEn}`}
                        >
                          <Github size={16} />
                          <span className="text-sm">Code</span>
                        </motion.a>
                      )}
                      {project.demo && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-space-cyan/20 hover:bg-space-cyan/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`${t("liveDemo")} — ${project.titleEn}`}
                        >
                          <ExternalLink size={16} />
                          <span className="text-sm">Demo</span>
                        </motion.a>
                      )}
                      <span
                        className={`ms-auto inline-flex items-center gap-1 text-sm text-space-cyan/80 group-hover:text-space-cyan transition-colors`}
                        aria-hidden
                      >
                        {t("viewDetails")}
                        <ArrowUpRight size={14} className={dir === "rtl" ? "-scale-x-100" : ""} />
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
