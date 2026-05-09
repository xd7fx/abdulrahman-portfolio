"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Certificates from "@/components/Certificates";
import Courses from "@/components/Courses";
import Background from "@/components/Background";
import WorkWithMe from "@/components/WorkWithMe";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import ParticleBackground from "@/components/ParticleBackground";
import PlanetaryNavigation from "@/components/PlanetaryNavigation";
import FloatingRobots from "@/components/FloatingRobots";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ParticleBackground />
      <FloatingRobots />
      <Navigation />
      <PlanetaryNavigation />

      <div className="relative z-[1]">
        <Hero />
        <About />
        <Projects />
        <Achievements />
        <Certificates />
        <Courses />
        <Background />
        <WorkWithMe />
        <Contact />
      </div>

      <footer className="relative z-[1] py-10 text-center border-t border-space-blue/30">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/XD7FX"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-space-navy/50 transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/abdulrahman-alnashri"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-space-navy/50 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:abdulrahman.alnashri9@gmail.com"
              className="p-2 rounded-lg hover:bg-space-navy/50 transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
          <p className="text-space-ice/70 text-sm">
            © {year} Abdulrahman Alnashri · {t("heroTitle")}
          </p>
          <p className="text-space-ice/50 text-xs">
            {t("builtWith")} Next.js, TailwindCSS &amp; Framer Motion
          </p>
        </motion.div>
      </footer>
    </main>
  );
}
