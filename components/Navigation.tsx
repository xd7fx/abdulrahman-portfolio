"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Github, Linkedin, FileDown } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import MobileSidebar from "./MobileSidebar";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  const navItems = [
    { name: t("home"), href: "#home" },
    { name: t("about"), href: "#about" },
    { name: t("projects"), href: "#projects" },
    { name: t("achievements"), href: "#achievements" },
    { name: t("certificates"), href: "#certificates" },
    { name: t("workWithMeTitle"), href: "#work" },
    { name: t("contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      >
      <div className="container mx-auto px-4 py-4">
        <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row-reverse md:flex-row'} justify-between`}>
          {/* Logo */}
          <motion.a
            href="#home"
            className="text-2xl font-orbitron font-bold glow-text"
            whileHover={{ scale: 1.05 }}
          >
            DH
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-sm font-medium hover:text-space-cyan transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Social Links & Language Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />
            <motion.a
              href="https://github.com/XD7FX"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-space-navy/50 transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/abdulrahman-alnashri"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-space-navy/50 transition-colors"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href="/cv.pdf"
              download
              className="btn-primary flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileDown size={16} />
              <span>My CV</span>
            </motion.a>
          </div>

          {/* Mobile Actions - Menu, Language, CV */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Menu Button - Always first */}
            <motion.button
              className="p-2 rounded-lg hover:bg-space-navy/50"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
            
            <LanguageToggle />
            <motion.a
              href="/cv.pdf"
              download
              className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-space-cyan/20 hover:bg-space-cyan/30 transition-colors border border-space-cyan/30"
              whileTap={{ scale: 0.95 }}
            >
              <FileDown size={16} />
              <span className="text-xs font-semibold">My CV</span>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
    </>
  );
}
