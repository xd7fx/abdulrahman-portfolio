"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, Linkedin, FileDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const { t, dir } = useLanguage();
  const isRTL = dir === "rtl";

  const navItems = [
    { name: t("home"), href: "#home" },
    { name: t("about"), href: "#about" },
    { name: t("projects"), href: "#projects" },
    { name: t("achievements"), href: "#achievements" },
    { name: t("certificates"), href: "#certificates" },
    { name: t("coursesTitle"), href: "#courses" },
    { name: t("workWithMeTitle"), href: "#work" },
    { name: t("contact"), href: "#contact" },
  ];

  // Body scroll lock + ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm"
            style={{ zIndex: 999998 }}
            onClick={onClose}
            aria-hidden
          />

          <motion.aside
            id="mobile-sidebar"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ x: isRTL ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? "100%" : "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`md:hidden fixed top-0 ${isRTL ? "right-0 border-l" : "left-0 border-r"} bottom-0 w-72 bg-space-dark/98 backdrop-blur-md border-space-cyan/30 p-6 overflow-y-auto`}
            style={{ zIndex: 999999 }}
          >
            <button
              onClick={onClose}
              className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} p-2 rounded-lg hover:bg-space-navy/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan`}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            <div className="mb-8 mt-2">
              <h2 className="text-2xl font-orbitron font-bold glow-text">AA</h2>
              <p className="text-xs text-space-ice/60 mt-1">{t("heroTitle")}</p>
            </div>

            <nav className="space-y-1">
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

              <motion.a
                href="/cv.pdf"
                download
                className="mt-4 flex items-center gap-2 py-3 px-4 text-sm font-semibold rounded-lg bg-space-cyan/20 border border-space-cyan/30 hover:bg-space-cyan/30 transition-colors"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                onClick={onClose}
              >
                <FileDown size={16} />
                {t("myCV")}
              </motion.a>
            </nav>

            <div className="mt-8 pt-6 border-t border-space-blue/30">
              <div className="flex items-center justify-center gap-3">
                <a
                  href="https://github.com/XD7FX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg hover:bg-space-navy/50 transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/abdulrahman-alnashri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg hover:bg-space-navy/50 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
