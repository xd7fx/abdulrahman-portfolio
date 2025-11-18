"use client";

import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Certificates from "@/components/Certificates";
import WorkWithMe from "@/components/WorkWithMe";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import ParticleBackground from "@/components/ParticleBackground";
import PlanetaryNavigation from "@/components/PlanetaryNavigation";
import FloatingRobots from "@/components/FloatingRobots";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  return (
    <main className="relative min-h-screen">
      <ParticleBackground />
      <FloatingRobots />
      <Navigation />
      <PlanetaryNavigation />
      
      <div className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Achievements />
        <Certificates />
        <WorkWithMe />
        <Contact />
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 py-8 text-center border-t border-space-blue/30">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4"
        >
          <p className="text-space-ice/70 text-sm">
            {t("footerText")}
          </p>
          <p className="text-space-ice/50 text-xs mt-2">
            {t("builtWith")} Next.js, TailwindCSS & Framer Motion
          </p>
        </motion.div>
      </footer>
    </main>
  );
}
