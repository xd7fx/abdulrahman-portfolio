"use client";

import { motion } from "framer-motion";
import { ChevronDown, Rocket, Brain, Eye } from "lucide-react";
import SectionPlanet from "./SectionPlanet";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
      <SectionPlanet planet="terran" size={500} position="left" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Animated Icons */}
          <div className="flex justify-center space-x-8 mb-8">
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 10, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Rocket className="w-12 h-12 text-space-cyan" />
            </motion.div>
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <Brain className="w-12 h-12 text-space-lava" />
            </motion.div>
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, -10, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <Eye className="w-12 h-12 text-space-ice" />
            </motion.div>
          </div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-6">
              <span className="glow-text">{t("heroName")}</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-4xl font-orbitron font-semibold mb-4 text-space-cyan">
              {t("heroTitle")}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-space-ice/80 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {t("heroDescription")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <a href="#projects" className="btn-primary">
              {t("exploreWork")}
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg font-orbitron font-semibold text-sm uppercase tracking-wider border-2 border-space-cyan hover:bg-space-cyan/10 transition-all duration-300"
            >
              {t("getInTouch")}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              { label: t("projectsCount"), value: "6" },
              { label: t("awardsCount"), value: "7" },
              { label: t("certificatesCount"), value: "30+" },
              { label: t("gpaLabel"), value: "4.26/5" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="card-glow text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <div className="text-3xl font-orbitron font-bold text-space-cyan mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-space-ice/70">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-space-cyan" />
      </motion.a>
    </section>
  );
}
