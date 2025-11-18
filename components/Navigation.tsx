"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, FileDown } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { name: t("home"), href: "#home" },
    { name: t("about"), href: "#about" },
    { name: t("projects"), href: "#projects" },
    { name: t("achievements"), href: "#achievements" },
    { name: t("certificates"), href: "#certificates" },
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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? "bg-space-dark/95 backdrop-blur-md shadow-lg shadow-space-cyan/10" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
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

          {/* Mobile Actions - Language, CV & Menu */}
          <div className="md:hidden flex items-center space-x-2">
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
            <motion.button
              className="p-2 rounded-lg hover:bg-space-navy/50"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu - Sidebar */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Sidebar */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="md:hidden fixed top-0 right-0 bottom-0 w-64 bg-space-dark/95 backdrop-blur-md border-l border-space-cyan/30 z-50 p-6 overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-space-navy/50"
                >
                  <X size={24} />
                </button>

                {/* Logo */}
                <div className="mb-8 mt-2">
                  <h2 className="text-2xl font-orbitron font-bold glow-text">DH</h2>
                </div>

                {/* Navigation Items */}
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="block py-3 px-4 text-sm font-medium hover:text-space-cyan hover:bg-space-navy/30 rounded-lg transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                  
                  {/* My CV Link */}
                  <motion.a
                    href="/cv.pdf"
                    download
                    className="block py-3 px-4 text-sm font-medium hover:text-space-cyan hover:bg-space-navy/30 rounded-lg transition-colors"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.05 }}
                    onClick={() => setIsOpen(false)}
                  >
                    My CV
                  </motion.a>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t border-space-blue/30">
                  <div className="flex items-center justify-center space-x-4">
                    <a
                      href="https://github.com/XD7FX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg hover:bg-space-navy/50 transition-colors"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href="https://linkedin.com/in/abdulrahman-alnashri"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg hover:bg-space-navy/50 transition-colors"
                    >
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
