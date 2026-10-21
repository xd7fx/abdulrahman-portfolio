"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileText, ArrowUpRight, Users } from "lucide-react";
import { mentorship } from "@/data/mentorship";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeader from "./SectionHeader";
import SectionPlanet from "./SectionPlanet";

export default function Mentorship() {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const entries = showAll ? mentorship : mentorship.slice(0, 4);
  return (
    <section id="mentorship" className="py-10 md:py-14 relative overflow-hidden z-[1]">
      <SectionPlanet planet="terran" size={400} position="left" />
      <div className="container mx-auto px-4 relative z-[2]">
        <SectionHeader title={t("mentorshipTitle")} subtitle={t("mentorshipSubtitle")} />
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-4">
          {entries.map((entry) => (
            <article id={`mentorship-${entry.id}`} key={entry.id} className="card-glow scroll-mt-24">
              {entry.image && <div className="relative h-40 rounded-lg overflow-hidden mb-4"><Image src={entry.image} alt={t(entry.titleKey)} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" /></div>}
              <p className="text-xs text-space-cyan mb-2 flex items-center gap-2"><Users size={14} aria-hidden />{t(entry.periodKey)}</p>
              <h3 className="font-semibold text-lg mb-1">{t(entry.titleKey)}</h3>
              <p className="text-xs text-space-cyan mb-3">{t(entry.organizationKey)}</p>
              <details className="group"><summary className="text-sm text-space-ice/80 leading-7 cursor-pointer marker:text-space-cyan">{t(entry.summaryKey || entry.descriptionKey)}</summary><p className="text-sm text-space-ice/70 leading-7 mt-3 border-t border-space-cyan/10 pt-3">{t(entry.descriptionKey)}</p></details>
              <div className="flex flex-wrap gap-4 mt-4 text-xs text-space-cyan">
                {entry.file && <a href={entry.file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2"><FileText size={14} />{t("originalFile")}</a>}
                {entry.link && <Link href={entry.link} className="inline-flex items-center gap-2">{t("viewDetails")}<ArrowUpRight size={14} /></Link>}
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-6"><button type="button" onClick={() => setShowAll(!showAll)} aria-expanded={showAll} className="text-sm text-space-cyan border border-space-cyan/30 rounded-lg px-5 py-2.5 hover:bg-space-cyan/10">{t(showAll ? "showFewer" : "showAllMentoring")} ({mentorship.length})</button></div>
      </div>
    </section>
  );
}
