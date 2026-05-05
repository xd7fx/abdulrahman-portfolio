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
    <section id="achievements" className="py-12 relative overflow-hidden z-[1]">
      <SectionPlanet planet="lava" size={480} position="right" />
      <div className="container mx-auto px-4 relative z-[2]">
        <SectionHeader
          title={t("achievementsTitle")}
          subtitle={t("achievementsSubtitle")}
        />

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-space-cyan via-space-blue to-space-lava" />

            <div className="space-y-12">
              {achievements.map((achievement, index) => {
                const Icon = iconRegistry[achievement.iconName];
                const title = t(achievement.titleKey);
                const subtitle = t(achievement.subtitleKey);
                const description = t(achievement.descriptionKey);

                return (
                  <motion.div
                    key={achievement.slug}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } flex-col`}
                  >
                    <div className="w-full md:w-5/12">
                      <Link
                        href={`/achievements/${achievement.slug}`}
                        aria-label={`${t("viewDetails")} — ${title}`}
                        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan rounded-2xl"
                      >
                        <motion.div
                          className="card-glow relative group"
                          whileHover={{ scale: 1.03 }}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-10 rounded-lg`} />

                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                              <div className="inline-block px-4 py-1 rounded-full bg-space-cyan/20 border border-space-cyan/50 text-space-cyan font-orbitron font-bold text-sm">
                                {achievement.year}
                              </div>
                              <span
                                className="inline-flex items-center gap-1 text-xs text-space-cyan/80 group-hover:text-space-cyan transition-colors"
                                aria-hidden
                              >
                                {t("viewDetails")}
                                <ArrowUpRight size={12} className={dir === "rtl" ? "-scale-x-100" : ""} />
                              </span>
                            </div>

                            <div className="flex items-start gap-3 mb-3">
                              <span className="text-4xl shrink-0">{achievement.emoji}</span>
                              <div className="min-w-0">
                                <h3 className="text-xl font-orbitron font-bold mb-1">
                                  {title}
                                </h3>
                                <p className="text-space-cyan text-sm font-semibold">
                                  {subtitle}
                                </p>
                              </div>
                            </div>

                            <p className="text-space-ice/80 text-sm leading-relaxed">
                              {description}
                            </p>
                          </div>
                        </motion.div>
                      </Link>
                    </div>

                    <div className="hidden md:flex w-2/12 justify-center my-8 md:my-0">
                      <motion.div
                        className="w-16 h-16 rounded-full bg-space-dark border-4 border-space-cyan flex items-center justify-center relative z-10"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-8 h-8 text-space-cyan" aria-hidden />
                      </motion.div>
                    </div>

                    <div className="hidden md:block w-5/12" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { label: t("firstPlaceAwards"), value: String(stats.first), emoji: "🥇" },
              { label: t("secondPlaceAwards"), value: String(stats.second), emoji: "🥈" },
              { label: t("specialRecognition"), value: String(stats.recognition), emoji: "⭐" },
              { label: t("totalAchievements"), value: String(stats.total), emoji: "🏆" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="card-glow text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl mb-2">{stat.emoji}</div>
                <div className="text-2xl font-orbitron font-bold text-space-cyan mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-space-ice/70">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
