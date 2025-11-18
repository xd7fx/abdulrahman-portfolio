"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Star, Target } from "lucide-react";
import SectionPlanet from "./SectionPlanet";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";

const getAchievements = (t: (key: string) => string) => [
  {
    year: "2024",
    title: t("ach5Title"),
    subtitle: t("ach5Subtitle"),
    description: t("ach5Desc"),
    icon: <Target className="w-8 h-8" />,
    color: "from-pink-400 to-rose-500",
    emoji: "📱",
  },
  {
    year: "2024",
    title: t("ach3Title"),
    subtitle: t("ach3Subtitle"),
    description: t("ach3Desc"),
    icon: <Star className="w-8 h-8" />,
    color: "from-green-500 to-emerald-600",
    emoji: "🌟",
  },
  {
    year: "2024",
    title: t("ach6Title"),
    subtitle: t("ach6Subtitle"),
    description: t("ach6Desc"),
    icon: <Star className="w-8 h-8" />,
    color: "from-teal-400 to-cyan-600",
    emoji: "🤖",
  },
  {
    year: "2024",
    title: t("ach7Title"),
    subtitle: t("ach7Subtitle"),
    description: t("ach7Desc"),
    icon: <Award className="w-8 h-8" />,
    color: "from-orange-400 to-red-500",
    emoji: "🥈",
  },
  {
    year: "2024",
    title: t("ach1Title"),
    subtitle: t("ach1Subtitle"),
    description: t("ach1Desc"),
    icon: <Trophy className="w-8 h-8" />,
    color: "from-yellow-400 to-orange-500",
    emoji: "🚁",
  },
  {
    year: "2025",
    title: t("ach4Title"),
    subtitle: t("ach4Subtitle"),
    description: t("ach4Desc"),
    icon: <Award className="w-8 h-8" />,
    color: "from-purple-500 to-violet-600",
    emoji: "🏆",
  },
  {
    year: "2025",
    title: t("ach2Title"),
    subtitle: t("ach2Subtitle"),
    description: t("ach2Desc"),
    icon: <Award className="w-8 h-8" />,
    color: "from-blue-400 to-cyan-500",
    emoji: "🥇",
  },
];

export default function Achievements() {
  const { t } = useLanguage();
  const achievements = getAchievements(t);
  
  return (
    <section id="achievements" className="py-12 relative overflow-hidden z-[1]">
      <SectionPlanet planet="lava" size={480} position="right" />
      <div className="container mx-auto px-4 relative z-[2]">
        <SectionHeader 
          title={t("achievementsTitle")} 
          subtitle={t("achievementsSubtitle")}
        />

        <div className="max-w-5xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-space-cyan via-space-blue to-space-lava" />

            {/* Achievement Cards */}
            <div className="space-y-12">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col`}
                >
                  {/* Content Card */}
                  <div className="w-full md:w-5/12">
                    <motion.div
                      className="card-glow relative"
                      whileHover={{ scale: 1.03 }}
                    >
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-10 rounded-lg`} />

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Year Badge */}
                        <div className="inline-block px-4 py-1 rounded-full bg-space-cyan/20 border border-space-cyan/50 text-space-cyan font-orbitron font-bold text-sm mb-4">
                          {achievement.year}
                        </div>

                        {/* Title */}
                        <div className="flex items-start space-x-3 mb-3">
                          <span className="text-4xl">{achievement.emoji}</span>
                          <div>
                            <h3 className="text-xl font-orbitron font-bold mb-1">
                              {achievement.title}
                            </h3>
                            <p className="text-space-cyan text-sm font-semibold">
                              {achievement.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-space-ice/80 text-sm leading-relaxed">
                          {achievement.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center Icon */}
                  <div className="hidden md:flex w-2/12 justify-center my-8 md:my-0">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-space-dark border-4 border-space-cyan flex items-center justify-center relative z-10"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="text-space-cyan">{achievement.icon}</div>
                    </motion.div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { label: t("firstPlaceAwards"), value: "3", emoji: "🥇" },
              { label: t("secondPlaceAwards"), value: "1", emoji: "🥈" },
              { label: t("specialRecognition"), value: "2", emoji: "⭐" },
              { label: t("totalAchievements"), value: "5+", emoji: "🏆" },
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
