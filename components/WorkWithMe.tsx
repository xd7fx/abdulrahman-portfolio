"use client";

import { motion } from "framer-motion";
import { Brain, Code, Cpu, LucideIcon, Rocket } from "lucide-react";
import SectionPlanet from "./SectionPlanet";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { services, type ServiceIcon } from "@/data/services";

const serviceIconRegistry: Record<ServiceIcon, LucideIcon> = {
  Brain,
  Cpu,
  Code,
  Rocket,
};

export default function WorkWithMe() {
  const { t } = useLanguage();

  return (
    <section id="work" className="py-10 md:py-14 relative overflow-visible z-[1]">
      <SectionPlanet planet="terran" size={450} position="right" />
      <div className="container mx-auto px-4 relative z-[2]">
        <SectionHeader
          title={t("workWithMeTitle")}
          subtitle={t("workWithMeSubtitle")}
        />

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <p className="text-sm md:text-base lg:text-lg text-space-ice/80 max-w-3xl mx-auto leading-relaxed">
              {t("workWithMeIntro")}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
            {services.map((service, index) => {
              const Icon = serviceIconRegistry[service.iconName];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-glow group text-center"
                >
                  <div
                    className={`w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform mx-auto`}
                  >
                    <Icon className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" aria-hidden />
                  </div>
                  <h3 className="text-sm md:text-base lg:text-lg font-orbitron font-bold mb-2 md:mb-3 group-hover:text-space-cyan transition-colors">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-space-ice/70 leading-relaxed text-xs md:text-sm">
                    {t(service.descriptionKey)}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-8 md:mt-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-green-400 font-medium">
                {t("availableForWork")}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
