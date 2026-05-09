"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, Github, Linkedin, FileDown } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import MobileSidebar from "./MobileSidebar";
import { useLanguage } from "@/contexts/LanguageContext";

const SECTIONS = ["home", "about", "projects", "achievements", "certificates", "courses", "background", "work", "contact"] as const;
type SectionId = (typeof SECTIONS)[number];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const { t, dir } = useLanguage();
  const isRTL = dir === "rtl";

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  const navItems: { name: string; href: `#${SectionId}` }[] = [
    { name: t("home"), href: "#home" },
    { name: t("about"), href: "#about" },
    { name: t("projects"), href: "#projects" },
    { name: t("achievements"), href: "#achievements" },
    { name: t("certificates"), href: "#certificates" },
    { name: t("coursesTitle"), href: "#courses" },
    { name: t("backgroundTitle"), href: "#background" },
    { name: t("workWithMeTitle"), href: "#work" },
    { name: t("contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id as SectionId);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <MobileSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
          scrolled ? "bg-space-dark/95 backdrop-blur-md shadow-lg shadow-space-cyan/10" : "bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 py-4">
          <div className={`flex items-center ${isRTL ? "flex-row-reverse" : "flex-row-reverse md:flex-row"} justify-between gap-3`}>
            {/* Logo */}
            <motion.a
              href="#home"
              className="text-2xl font-orbitron font-bold glow-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan rounded"
              whileHover={{ scale: 1.05 }}
              aria-label="Abdulrahman Alnashri — Home"
            >
              AA
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => {
                const id = item.href.slice(1) as SectionId;
                const isActive = activeSection === id;
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={`relative text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan rounded px-1 py-1 ${
                      isActive ? "text-space-cyan" : "hover:text-space-cyan"
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-space-cyan rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </div>

            {/* Social Links & Language Toggle */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageToggle />
              <motion.a
                href="https://github.com/XD7FX"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-space-navy/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="GitHub profile"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/abdulrahman-alnashri"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-space-navy/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn profile"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="/cv.pdf"
                download
                className="btn-primary flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileDown size={16} />
                <span>{t("myCV")}</span>
              </motion.a>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-2">
              <motion.button
                className="p-2 rounded-lg hover:bg-space-navy/50"
                onClick={() => setIsOpen((v) => !v)}
                whileTap={{ scale: 0.95 }}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-sidebar"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>

              <LanguageToggle />
              <motion.a
                href="/cv.pdf"
                download
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-space-cyan/20 hover:bg-space-cyan/30 transition-colors border border-space-cyan/30"
                whileTap={{ scale: 0.95 }}
                aria-label="Download CV"
              >
                <FileDown size={16} />
                <span className="text-xs font-semibold">{t("myCV")}</span>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-space-cyan via-space-blue to-space-lava"
          style={{ scaleX: progress }}
          aria-hidden
        />
      </motion.nav>
    </>
  );
}
