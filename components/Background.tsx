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

export default function Background() {
  const { t } = useLanguage();

  return (
    <section id="background" className="py-12 relative overflow-hidden z-[1]">
      <SectionPlanet planet="baren" size={420} position="left" />
      <div className="container mx-auto px-4 relative z-[2]">
        <SectionHeader
          title={t("backgroundTitle")}
          subtitle={t("backgroundSubtitle")}
        />

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Education + Experience side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              className="card-glow"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🎓</span>
                <h3 className="text-lg font-orbitron font-bold text-space-cyan">
                  {t("educationTitle")}
                </h3>
              </div>
              <div className="space-y-3">
                {education.map((entry) => (
                  <div key={entry.id}>
                    <h4 className="text-sm font-semibold text-space-ice">
                      {t(entry.degreeKey)}
                    </h4>
                    <p className="text-xs text-space-cyan">{t(entry.schoolKey)}</p>
                    {entry.gpaKey && (
                      <p className="text-[11px] text-space-ice/70 mt-0.5">
                        {t(entry.gpaKey)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="card-glow"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💼</span>
                <h3 className="text-lg font-orbitron font-bold text-space-cyan">
                  {t("experienceTitle")}
                </h3>
              </div>
              <div className="space-y-3">
                {experiences.map((entry) => (
                  <div key={entry.id}>
                    <h4 className="text-sm font-semibold text-space-ice">
                      {t(entry.titleKey)}
                    </h4>
                    <p className="text-xs text-space-cyan">{t(entry.companyKey)}</p>
                    <p className="text-[11px] text-space-ice/70 mt-0.5">
                      {t(entry.periodKey)}
                    </p>
                    <p className="text-[11px] text-space-ice/50">
                      {t(entry.locationKey)}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Skills grid — 2 cols on mobile so it doesn't tower */}
          <div>
            <h3 className="text-xl md:text-2xl font-orbitron font-bold text-center mb-5 text-space-cyan">
              {t("technicalArsenalTitle")}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {skillCategories.map((skill, index) => {
                const Icon = skillIconRegistry[skill.iconName];
                return (
                  <motion.div
                    key={skill.categoryKey}
                    className="card-glow !p-3 md:!p-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-2 mb-2.5">
                      <Icon className="w-4 h-4 text-space-cyan shrink-0" aria-hidden />
                      <h4 className="text-xs md:text-sm font-orbitron font-semibold leading-tight">
                        {t(skill.categoryKey)}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {skill.items.map((item) => (
                        <span
                          key={item}
                          className="px-2 py-0.5 text-[10px] md:text-[11px] rounded-full bg-space-blue/30 border border-space-cyan/20 text-space-ice/90"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
