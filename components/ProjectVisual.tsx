"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Project } from "@/data/projects";

/** Original project media when available; a typographic cover otherwise. */
export default function ProjectVisual({ project, priority = false }: { project: Project; priority?: boolean }) {
  const { t } = useLanguage();
  if (project.image) {
    return <Image src={project.image} alt={t(project.titleKey)} fill priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 1024px"
      className="object-cover group-hover:scale-105 transition-transform duration-500" />;
  }
  return (
    <div className="absolute inset-0 bg-space-navy flex items-center justify-center overflow-hidden p-5" aria-hidden>
      <div className="absolute w-60 h-60 rounded-full border border-space-cyan/20 -end-12 -top-20" />
      <div className="absolute w-40 h-40 rounded-full border border-space-cyan/10 -start-10 -bottom-20" />
      <div className="relative flex items-center gap-4 max-w-lg">
        <span className="text-4xl md:text-5xl text-space-cyan shrink-0">{project.emoji}</span>
        <div className="min-w-0">
          <p className="text-sm md:text-xl font-semibold text-space-ice leading-snug">{t(project.titleKey)}</p>
          <p className="text-xs text-space-cyan/70 mt-2" dir="ltr">{project.tech.slice(0, 3).join(" / ")}</p>
        </div>
      </div>
    </div>
  );
}
