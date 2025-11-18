"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      className="relative flex items-center space-x-2 px-4 py-2 rounded-full bg-space-navy/50 border border-space-cyan/30 hover:bg-space-cyan/20 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Languages className="w-5 h-5 text-space-cyan" />
      <span className="text-sm font-semibold text-space-cyan">
        {language === "en" ? "AR" : "EN"}
      </span>
      
      {/* Animated indicator */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-space-cyan/20 to-space-blue/20"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
