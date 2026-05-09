"use client";

import { motion } from "framer-motion";
import { Code, Cpu, Database, Eye, LucideIcon, Wrench, Zap } from "lucide-react";
import SectionPlanet from "./SectionPlanet";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { skillCategories, type SkillIcon } from "@/data/skills";

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
    <section id="background" className="py-10 md:py-14 relative overflow-hidden z-[1]">
      <SectionPlanet planet="baren" size={420} position="left" />
      <div className="container mx-auto px-4 relative z-[2]">
        <SectionHeader
          title={t("technicalArsenalTitle")}
          subtitle={t("backgroundSubtitle")}
        />

        <div className="max-w-6xl mx-auto">
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
    </section>
  );
}
