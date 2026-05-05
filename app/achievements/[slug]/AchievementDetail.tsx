"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Calendar,
  ExternalLink,
  LucideIcon,
  Star,
  Target,
  Trophy,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { achievements, type Achievement, type AchievementIcon } from "@/data/achievements";
import { getProjectBySlug } from "@/data/projects";
import LanguageToggle from "@/components/LanguageToggle";
import ParticleBackground from "@/components/ParticleBackground";

const iconRegistry: Record<AchievementIcon, LucideIcon> = {
  Trophy,
  Award,
  Star,
  Target,
};

const rankLabel: Record<Achievement["rank"], string> = {
  "1st": "🥇 1st Place",
  "2nd": "🥈 2nd Place",
  "3rd": "🥉 3rd Place",
  recognition: "⭐ Recognition",
};

interface Props {
  achievement: Achievement;
}

export default function AchievementDetail({ achievement }: Props) {
  const { t, dir } = useLanguage();

  const title = t(achievement.titleKey);
  const subtitle = t(achievement.subtitleKey);
  const description = t(achievement.descriptionKey);
  const longDescription = achievement.longDescriptionKey
    ? t(achievement.longDescriptionKey)
    : description;
  const others = achievements.filter((a) => a.slug !== achievement.slug).slice(0, 3);
  const Icon = iconRegistry[achievement.iconName];
  const relatedProject = achievement.relatedProjectSlug
    ? getProjectBySlug(achievement.relatedProjectSlug)
    : undefined;

  const BackArrow = dir === "rtl" ? ArrowRight : ArrowLeft;

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ParticleBackground />

      <header className="relative z-[2] container mx-auto px-4 pt-6 flex items-center justify-between">
        <Link
          href="/#achievements"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-space-navy/50 border border-space-cyan/30 hover:bg-space-cyan/10 text-space-ice transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan"
        >
          <BackArrow size={16} className="text-space-cyan" />
          <span className="text-sm font-semibold">{t("backToAchievements")}</span>
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
            <div className="text-6xl drop-shadow-2xl" aria-hidden>
              {achievement.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl md:text-5xl font-orbitron font-bold glow-text leading-tight">
                {title}
              </h1>
              <p className="text-space-cyan text-base md:text-lg font-semibold mt-2">
                {subtitle}
              </p>
            </div>
            <motion.div
              className="shrink-0 w-16 h-16 rounded-full bg-space-dark border-4 border-space-cyan flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
              aria-hidden
            >
              <Icon className="w-8 h-8 text-space-cyan" />
            </motion.div>
          </div>

          {/* Meta strip */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-space-ice/80 mb-8">
            <span className="inline-flex items-center gap-2">
              <Calendar size={14} className="text-space-cyan" aria-hidden />
              <span className="text-space-ice/60">{t("year")}:</span>
              <span className="font-semibold">{achievement.year}</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <Trophy size={14} className="text-space-cyan" aria-hidden />
              <span className="text-space-ice/60">{t("recognition")}:</span>
              <span className="font-semibold">{rankLabel[achievement.rank]}</span>
            </span>
          </div>

          {/* Hero image */}
          {achievement.image && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-space-cyan/20 mb-10">
              <Image
                src={achievement.image}
                alt={title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${achievement.color} opacity-25`} />
            </div>
          )}

          {/* External link */}
          {achievement.link && (
            <div className="flex flex-wrap gap-3 mb-12">
              <a
                href={achievement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-space-cyan/20 hover:bg-space-cyan/30 border border-space-cyan/40 text-space-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan"
              >
                <ExternalLink size={18} />
                <span className="font-semibold">{t("liveDemo")}</span>
              </a>
            </div>
          )}
        </motion.section>

        {/* Body grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-2 card-glow"
          >
            <h2 className="text-2xl font-orbitron font-bold text-space-cyan mb-4">
              {t("aboutAchievement")}
            </h2>
            <p className="text-space-ice/90 leading-relaxed text-base whitespace-pre-line">
              {longDescription}
            </p>
          </motion.section>

          {relatedProject && (
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="card-glow h-fit"
            >
              <h2 className="text-xl font-orbitron font-bold text-space-cyan mb-4">
                {t("relatedProject")}
              </h2>
              <Link
                href={`/projects/${relatedProject.slug}`}
                className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan rounded-xl"
              >
                <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                  <Image
                    src={relatedProject.image}
                    alt={relatedProject.titleEn}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${relatedProject.color} opacity-30`} />
                  <div className="absolute top-2 right-2 text-2xl drop-shadow-2xl" aria-hidden>
                    {relatedProject.emoji}
                  </div>
                </div>
                <h3 className="text-base font-orbitron font-bold leading-snug">
                  {t(relatedProject.titleKey)}
                </h3>
                <p className="text-space-ice/70 text-sm mt-1 line-clamp-2">
                  {t(relatedProject.descriptionKey)}
                </p>
                <span
                  className="inline-flex items-center gap-1 text-xs text-space-cyan mt-3 group-hover:gap-2 transition-all"
                  aria-hidden
                >
                  {t("viewDetails")}
                  {dir === "rtl" ? (
                    <ArrowLeft size={12} />
                  ) : (
                    <ArrowRight size={12} />
                  )}
                </span>
              </Link>
            </motion.aside>
          )}
        </div>

        {/* Other achievements */}
        <section className="max-w-5xl mx-auto mt-20">
          <h2 className="text-2xl font-orbitron font-bold text-space-cyan mb-6">
            {t("otherAchievements")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {others.map((other) => {
              const OtherIcon = iconRegistry[other.iconName];
              return (
                <Link
                  key={other.slug}
                  href={`/achievements/${other.slug}`}
                  className="card-glow group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan rounded-2xl"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-3xl shrink-0">{other.emoji}</span>
                    <div className="min-w-0">
                      <div className="text-xs text-space-cyan font-semibold mb-1">
                        {other.year}
                      </div>
                      <h3 className="text-base font-orbitron font-bold leading-snug">
                        {t(other.titleKey)}
                      </h3>
                    </div>
                    <OtherIcon className="w-5 h-5 text-space-cyan/70 shrink-0" aria-hidden />
                  </div>
                  <p className="text-space-ice/70 text-sm mt-2 line-clamp-2">
                    {t(other.descriptionKey)}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      </article>
    </main>
  );
}
