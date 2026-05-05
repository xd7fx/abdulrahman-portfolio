"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen flex items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <motion.div
          animate={{ y: [0, -16, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex justify-center mb-6"
        >
          <Rocket className="w-20 h-20 text-space-cyan" />
        </motion.div>
        <h1 className="text-7xl font-orbitron font-bold glow-text mb-4">404</h1>
        <p className="text-space-ice/80 mb-8">{t("pageNotFound")}</p>
        <Link
          href="/"
          className="btn-primary inline-flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          <span>{t("backHome")}</span>
        </Link>
      </div>
    </main>
  );
}
