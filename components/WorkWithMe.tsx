"use client";

import { motion } from "framer-motion";
import { Code, Brain, Cpu, Rocket } from "lucide-react";
import SectionPlanet from "./SectionPlanet";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WorkWithMe() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Brain,
      titleKey: "aiDevelopment",
      descKey: "aiDevelopmentDesc",
      color: "from-space-cyan to-blue-500",
    },
    {
      icon: Cpu,
      titleKey: "roboticsEngineering",
      descKey: "roboticsEngineeringDesc",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Code,
      titleKey: "mlSolutions",
      descKey: "mlSolutionsDesc",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Rocket,
      titleKey: "consultingMentoring",
      descKey: "consultingMentoringDesc",
      color: "from-green-500 to-teal-500",
    },
  ];

  return (
    <section id="work" className="py-12 relative overflow-visible z-[1]">
      <SectionPlanet planet="terran" size={450} position="right" />
      <div className="container mx-auto px-4 relative z-[2]">
        <SectionHeader 
          title={t("workWithMeTitle")} 
          subtitle={t("workWithMeSubtitle")}
        />

        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-lg text-space-ice/80 max-w-3xl mx-auto leading-relaxed">
              {t("workWithMeIntro")}
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={service.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-glow group text-center"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-orbitron font-bold mb-3 group-hover:text-space-cyan transition-colors">
                  {t(service.titleKey)}
                </h3>
                <p className="text-space-ice/70 leading-relaxed text-sm">
                  {t(service.descKey)}
                </p>
              </motion.div>
            ))}
          </div>


          {/* Availability */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30">
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
