"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-12 relative z-[2]"
    >
      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-orbitron font-bold glow-text mb-4">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-space-cyan text-lg font-semibold">
          {subtitle}
        </p>
      )}

      {/* Decorative Line */}
      <motion.div
        className="w-32 h-1 bg-gradient-to-r from-transparent via-space-cyan to-transparent mx-auto mt-6"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      />
    </motion.div>
  );
}
