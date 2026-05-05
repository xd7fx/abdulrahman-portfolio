"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Rocket, Brain, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import SectionPlanet from "./SectionPlanet";
import { useLanguage } from "@/contexts/LanguageContext";

const ROLES_KEYS = ["heroTitle", "aiDevelopment", "roboticsEngineering", "mlSolutions"] as const;

export default function Hero() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES_KEYS.length), 2800);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden z-[1]"
    >
      <SectionPlanet planet="terran" size={500} position="left" />

      <div className="container mx-auto px-4 relative z-[2]">
        <div className="max-w-5xl mx-auto text-center">
          {/* Animated Icons */}
          <div className="flex justify-center gap-8 mb-8">
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >
              <Rocket className="w-12 h-12 text-space-cyan" />
            </motion.div>
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -20, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              aria-hidden
            >
              <Brain className="w-12 h-12 text-space-lava" />
            </motion.div>
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -20, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              aria-hidden
            >
              <Eye className="w-12 h-12 text-space-ice" />
            </motion.div>
          </div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-orbitron font-bold mb-6"
          >
            <span className="glow-text">{t("heroName")}</span>
          </motion.h1>

          {/* Rotating role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-10 md:h-12 mb-4 relative flex items-center justify-center"
          >
            <motion.h2
              key={roleIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="text-2xl md:text-4xl font-orbitron font-semibold text-space-cyan"
            >
              {t(ROLES_KEYS[roleIdx])}
            </motion.h2>
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
              className="px-6 py-3 rounded-lg font-orbitron font-semibold text-sm uppercase tracking-wider border-2 border-space-cyan hover:bg-space-cyan/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan"
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
              { label: t("projectsCount"), value: "7" },
              { label: t("awardsCount"), value: "9" },
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
                <div className="text-3xl md:text-4xl font-orbitron font-bold text-space-cyan mb-2">
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan rounded-full p-1"
        animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll to About section"
      >
        <ChevronDown className="w-8 h-8 text-space-cyan" />
      </motion.a>
    </section>
  );
}
