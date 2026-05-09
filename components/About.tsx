"use client";

import { motion } from "framer-motion";
import SectionPlanet from "./SectionPlanet";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";

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

        <div className="max-w-4xl mx-auto">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="card-glow mb-8"
          >
            <p className="text-base md:text-lg text-space-ice/90 leading-relaxed">
              {t("aboutBio")}
            </p>
          </motion.div>

          {/* Highlights — 3 across on every breakpoint so the page stays short */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4"
          >
            {[
              { titleKey: "bestEngineer2024", subtitleKey: "smartMethods", emoji: "🌟" },
              { titleKey: "wro2025", subtitleKey: "technicalSupervisor", emoji: "🥇" },
              { titleKey: "sdaChampion", subtitleKey: "weekFive", emoji: "🏆" },
            ].map((highlight, index) => (
              <motion.div
                key={highlight.titleKey}
                className="rounded-xl border border-space-cyan/20 bg-space-navy/30 backdrop-blur-sm p-3 md:p-4 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="text-2xl md:text-3xl mb-1.5">{highlight.emoji}</div>
                <h4 className="text-[11px] sm:text-xs md:text-sm font-orbitron font-semibold text-space-cyan leading-tight mb-0.5 line-clamp-2">
                  {t(highlight.titleKey)}
                </h4>
                <p className="text-[10px] md:text-xs text-space-ice/60 line-clamp-1">
                  {t(highlight.subtitleKey)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
