"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
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

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Highest z-index */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm"
            style={{ zIndex: 999998 }}
            onClick={onClose}
          />
          
          {/* Sidebar - Even Higher z-index */}
          <motion.div
            initial={{ x: isRTL ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? "100%" : "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`md:hidden fixed top-0 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'} bottom-0 w-64 bg-space-dark/98 backdrop-blur-md border-space-cyan/30 p-6 overflow-y-auto`}
            style={{ zIndex: 999999 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} p-2 rounded-lg hover:bg-space-navy/50 transition-colors`}
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
                  onClick={onClose}
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
                onClick={onClose}
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
  );
}
