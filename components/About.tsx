"use client";

import { motion } from "framer-motion";
import { Code, Cpu, Database, Eye, LucideIcon, Wrench, Zap } from "lucide-react";
import SectionPlanet from "./SectionPlanet";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { skillCategories, type SkillIcon } from "@/data/skills";
import { experiences } from "@/data/experience";
import { education } from "@/data/education";

const skillIconRegistry: Record<SkillIcon, LucideIcon> = {
  Cpu,
  Wrench,
  Eye,
  Zap,
  Code,
  Database,
};

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-12 relative overflow-hidden z-[1]">
      <SectionPlanet planet="ice" size={450} position="right" />
      <div className="container mx-auto px-4 relative z-[2]">
        <SectionHeader
          title={t("aboutTitle")}
          subtitle={t("aboutSubtitle")}
        />

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="card-glow mb-12"
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-space-ice/90 leading-relaxed mb-4">
                {t("aboutBio")}
              </p>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-orbitron font-bold text-center mb-8 text-space-cyan">
              {t("technicalArsenalTitle")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map((skill, index) => {
                const Icon = skillIconRegistry[skill.iconName];
                return (
                  <motion.div
                    key={skill.categoryKey}
                    className="card-glow"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-6 h-6 text-space-cyan" aria-hidden />
                      <h4 className="text-xl font-orbitron font-semibold">
                        {t(skill.categoryKey)}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 text-xs rounded-full bg-space-blue/30 border border-space-cyan/30 text-space-ice"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Education & Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Education */}
            <motion.div className="card-glow" whileHover={{ scale: 1.02 }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🎓</span>
                <h3 className="text-xl font-orbitron font-bold text-space-cyan">
                  {t("educationTitle")}
                </h3>
              </div>
              <div className="space-y-4">
                {education.map((entry) => (
                  <div key={entry.id}>
                    <h4 className="font-semibold text-space-ice">{t(entry.degreeKey)}</h4>
                    <p className="text-sm text-space-cyan">{t(entry.schoolKey)}</p>
                    {entry.gpaKey && (
                      <p className="text-xs text-space-ice/70 mt-1">{t(entry.gpaKey)}</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div className="card-glow" whileHover={{ scale: 1.02 }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">💼</span>
                <h3 className="text-xl font-orbitron font-bold text-space-cyan">
                  {t("experienceTitle")}
                </h3>
              </div>
              <div className="space-y-4">
                {experiences.map((entry) => (
                  <div key={entry.id}>
                    <h4 className="font-semibold text-space-ice">{t(entry.titleKey)}</h4>
                    <p className="text-sm text-space-cyan">{t(entry.companyKey)}</p>
                    <p className="text-xs text-space-ice/70 mt-1">{t(entry.periodKey)}</p>
                    <p className="text-xs text-space-ice/50">{t(entry.locationKey)}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { titleKey: "bestEngineer2024", subtitleKey: "smartMethods", emoji: "🌟" },
              { titleKey: "wro2025", subtitleKey: "technicalSupervisor", emoji: "🥇" },
              { titleKey: "sdaChampion", subtitleKey: "weekFive", emoji: "🏆" },
            ].map((highlight, index) => (
              <motion.div
                key={highlight.titleKey}
                className="card-glow text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-3">{highlight.emoji}</div>
                <h4 className="text-lg font-orbitron font-semibold text-space-cyan mb-1">
                  {t(highlight.titleKey)}
                </h4>
                <p className="text-sm text-space-ice/70">{t(highlight.subtitleKey)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
