"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, ExternalLink, Github, PlayCircle, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { projects, type Project } from "@/data/projects";
import LanguageToggle from "@/components/LanguageToggle";
import ParticleBackground from "@/components/ParticleBackground";

interface Props {
  project: Project;
}

export default function ProjectDetail({ project }: Props) {
  const { t, dir, language } = useLanguage();

  const title = t(project.titleKey);
  const description = t(project.descriptionKey);
  const longDescription = project.longDescriptionKey ? t(project.longDescriptionKey) : description;
  const achievements = project.achievementKeys.map((k) => t(k));
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  const BackArrow = dir === "rtl" ? ArrowRight : ArrowLeft;

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ParticleBackground />

      <header className="relative z-[2] container mx-auto px-4 pt-6 flex items-center justify-between">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-space-navy/50 border border-space-cyan/30 hover:bg-space-cyan/10 text-space-ice transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan"
        >
          <BackArrow size={16} className="text-space-cyan" />
          <span className="text-sm font-semibold">{t("backToProjects")}</span>
        </Link>
        <LanguageToggle />
      </header>

      <article className="relative z-[1] container mx-auto px-4 pb-20 pt-10">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-wrap items-start gap-4 mb-6">
            <div className="text-5xl md:text-6xl drop-shadow-2xl" aria-hidden>
              {project.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl md:text-5xl font-orbitron font-bold glow-text leading-tight">
                {title}
              </h1>
              {language === "ar" && project.titleEn && (
                <p className="text-space-ice/60 mt-2 text-sm">{project.titleEn}</p>
              )}
            </div>
            {project.logo && (
              <div
                className={`shrink-0 bg-white/90 rounded-lg p-1 backdrop-blur-sm ${project.logoSize || "w-20 h-12"}`}
              >
                <Image
                  src={project.logo}
                  alt={project.logoAlt || "Organization"}
                  width={120}
                  height={60}
                  className="object-contain w-full h-full"
                />
              </div>
            )}
          </div>

          {/* Meta strip */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-space-ice/80 mb-8">
            {project.year && (
              <span className="inline-flex items-center gap-2">
                <Calendar size={14} className="text-space-cyan" aria-hidden />
                <span className="text-space-ice/60">{t("year")}:</span>
                <span className="font-semibold">{project.year}</span>
              </span>
            )}
            {project.role && (
              <span className="inline-flex items-center gap-2">
                <UserRound size={14} className="text-space-cyan" aria-hidden />
                <span className="text-space-ice/60">{t("role")}:</span>
                <span className="font-semibold">{project.role}</span>
              </span>
            )}
          </div>

          {/* Hero image */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-space-cyan/20 mb-10">
            <Image
              src={project.image}
              alt={project.titleEn || title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-25`} />
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mb-12">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-space-navy/60 hover:bg-space-navy border border-space-cyan/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan"
              >
                <Github size={18} />
                <span className="font-semibold">{t("viewOnGithub")}</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-space-cyan/20 hover:bg-space-cyan/30 border border-space-cyan/40 text-space-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan"
              >
                <ExternalLink size={18} />
                <span className="font-semibold">{t("liveDemo")}</span>
              </a>
            )}
            {project.video && (
              <a
                href={project.video}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-space-lava/20 hover:bg-space-lava/30 border border-space-lava/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-lava"
              >
                <PlayCircle size={18} />
                <span className="font-semibold">{t("watchVideo")}</span>
              </a>
            )}
          </div>
        </motion.section>

        {/* Body grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-2 card-glow"
          >
            <h2 className="text-2xl font-orbitron font-bold text-space-cyan mb-4">
              {t("aboutProject")}
            </h2>
            <p className="text-space-ice/90 leading-relaxed text-base whitespace-pre-line">
              {longDescription}
            </p>

            <h3 className="text-xl font-orbitron font-bold text-space-cyan mt-8 mb-4">
              {t("keyHighlights")}
            </h3>
            <ul className="space-y-3">
              {achievements.map((achievement) => (
                <li key={achievement} className="flex items-start gap-3 text-space-ice/90">
                  <span className="mt-2 w-2 h-2 rounded-full bg-space-cyan shrink-0" aria-hidden />
                  <span className="leading-relaxed">{achievement}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="card-glow h-fit"
          >
            <h2 className="text-xl font-orbitron font-bold text-space-cyan mb-4">
              {t("techStack")}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-sm rounded-full bg-space-blue/30 border border-space-cyan/30 text-space-ice"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.aside>
        </div>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto mt-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.gallery.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-video rounded-xl overflow-hidden border border-space-cyan/20"
                >
                  <Image
                    src={src}
                    alt={`${project.titleEn} screenshot ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Related projects */}
        <section className="max-w-5xl mx-auto mt-20">
          <h2 className="text-2xl font-orbitron font-bold text-space-cyan mb-6">
            {t("relatedProjects")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/projects/${other.slug}`}
                className="card-glow group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan rounded-2xl"
              >
                <div className="relative h-28 rounded-lg overflow-hidden mb-3">
                  <Image
                    src={other.image}
                    alt={other.titleEn || t(other.titleKey)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${other.color} opacity-30`} />
                </div>
                <h3 className="text-base font-orbitron font-bold leading-snug">
                  {t(other.titleKey)}
                </h3>
                <p className="text-space-ice/70 text-sm mt-1 line-clamp-2">
                  {t(other.descriptionKey)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
