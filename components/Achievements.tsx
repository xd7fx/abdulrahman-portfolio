"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Award, LucideIcon, Star, Target, Trophy } from "lucide-react";
import Link from "next/link";
import SectionPlanet from "./SectionPlanet";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { achievements, type AchievementIcon } from "@/data/achievements";

const iconRegistry: Record<AchievementIcon, LucideIcon> = {
  Trophy,
  Award,
  Star,
  Target,
};

export default function Achievements() {
  const { t, dir } = useLanguage();

  const stats = {
    first: achievements.filter((a) => a.rank === "1st").length,
    second: achievements.filter((a) => a.rank === "2nd").length,
    recognition: achievements.filter((a) => a.rank === "recognition" || a.rank === "3rd").length,
    total: achievements.length,
  };

  return (
    <section id="achievements" className="py-10 md:py-14 relative overflow-hidden z-[1]">
      <SectionPlanet planet="lava" size={420} position="right" />
      <div className="container mx-auto px-4 relative z-[2]">
        <SectionHeader
          title={t("achievementsTitle")}
          subtitle={t("achievementsSubtitle")}
        />

        <div className="max-w-6xl mx-auto">
          {/* Stats panel — top */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-6 md:mb-8"
          >
            {[
              { label: t("firstPlaceAwards"), value: stats.first, emoji: "🥇" },
              { label: t("secondPlaceAwards"), value: stats.second, emoji: "🥈" },
              { label: t("specialRecognition"), value: stats.recognition, emoji: "⭐" },
              { label: t("totalAchievements"), value: stats.total, emoji: "🏆" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-space-cyan/20 bg-space-navy/30 backdrop-blur-sm px-4 py-3 flex items-center gap-3"
              >
                <span className="text-lg sm:text-xl md:text-2xl shrink-0" aria-hidden>
                  {stat.emoji}
                </span>
                <div className="min-w-0">
                  <div className="text-base sm:text-lg md:text-xl font-orbitron font-bold text-space-cyan leading-none">
                    {stat.value}
                  </div>
                  <div className="text-[10px] md:text-[11px] text-space-ice/60 truncate">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Compact grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = iconRegistry[achievement.iconName];
              const title = t(achievement.titleKey);
              const subtitle = t(achievement.subtitleKey);

              return (
                <motion.div
                  key={achievement.slug}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={`/achievements/${achievement.slug}`}
                    aria-label={`${t("viewDetails")} — ${title}`}
                    className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan rounded-xl"
                  >
                    <div className="relative h-full rounded-xl border border-space-cyan/20 bg-space-navy/30 backdrop-blur-sm p-4 transition-all duration-300 hover:border-space-cyan/50 hover:bg-space-navy/50">
                      <div
                        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none`}
                        aria-hidden
                      />
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-space-cyan/15 border border-space-cyan/40 text-space-cyan font-orbitron font-semibold text-[11px]">
                            <Icon size={11} aria-hidden />
                            {achievement.year}
                          </div>
                          <span
                            className="text-2xl leading-none"
                            aria-hidden
                          >
                            {achievement.emoji}
                          </span>
                        </div>

                        <h3 className="text-base font-orbitron font-bold leading-snug mb-1 line-clamp-2">
                          {title}
                        </h3>
                        <p className="text-xs text-space-cyan/90 font-semibold mb-2 line-clamp-1">
                          {subtitle}
                        </p>

                        <div className="mt-auto pt-2 flex items-center justify-end text-[11px] text-space-cyan/70 group-hover:text-space-cyan transition-colors">
                          {t("viewDetails")}
                          <ArrowUpRight
                            size={12}
                            className={`ms-1 ${dir === "rtl" ? "-scale-x-100" : ""}`}
                            aria-hidden
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
