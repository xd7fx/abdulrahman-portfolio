"use client";

import { motion } from "framer-motion";
import { GraduationCap, ExternalLink } from "lucide-react";
import SectionPlanet from "./SectionPlanet";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { certificates } from "@/data/certificates";

export default function Certificates() {
  const { t } = useLanguage();

  return (
    <section id="certificates" className="py-10 md:py-14 relative overflow-hidden z-[1]">
      <SectionPlanet planet="ice" size={460} position="left" verticalAlign="top" />
      <div className="container mx-auto px-4 relative z-[2]">
        <SectionHeader
          title={t("certificatesTitle")}
          subtitle={t("certificatesSubtitle")}
        />

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-10"
          >
            <p className="text-lg text-space-ice/80 max-w-3xl mx-auto">
              {t("continuousLearning")}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="card-glow group relative overflow-hidden"
                whileHover={{ y: -5 }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <GraduationCap className="w-10 h-10 text-space-cyan" aria-hidden />
                    <span className="text-xs font-orbitron font-semibold text-space-cyan/70">
                      {cert.year}
                    </span>
                  </div>

                  <h3 className="text-lg font-orbitron font-bold mb-2 group-hover:text-space-cyan transition-colors">
                    {t(cert.titleKey)}
                  </h3>

                  <p className="text-space-cyan text-sm font-semibold mb-2">
                    {t(cert.issuerKey)}
                  </p>

                  <p className="text-space-ice/70 text-sm mb-4">
                    {t(cert.descriptionKey)}
                  </p>

                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t("viewCertificate")} — ${t(cert.titleKey)}`}
                    >
                      <motion.span
                        className="inline-flex items-center gap-2 text-sm text-space-cyan hover:text-white transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <span>{t("viewCertificate")}</span>
                        <ExternalLink size={14} />
                      </motion.span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 md:mt-10 grid grid-cols-4 gap-2 sm:gap-3 md:gap-4"
          >
            {[
              { label: t("totalCertificates"), value: "30+", emoji: "📜" },
              { label: t("institutions"), value: "10+", emoji: "🏛️" },
              { label: t("trainingHours"), value: "600+", emoji: "⏱️" },
              { label: t("specializations"), value: "8", emoji: "🎯" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="card-glow text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-xl md:text-2xl mb-1">{stat.emoji}</div>
                <div className="text-base sm:text-lg md:text-xl font-orbitron font-bold text-space-cyan leading-none mb-0.5">
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-xs text-space-ice/60 truncate">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
