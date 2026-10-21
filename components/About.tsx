"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, CalendarDays, ChevronDown, GraduationCap, MapPin } from "lucide-react";
import SectionPlanet from "./SectionPlanet";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { education } from "@/data/education";
import { experiences } from "@/data/experience";

export default function About() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="py-14 md:py-20 relative overflow-hidden z-[1]">
      <SectionPlanet planet="ice" size={450} position="right" />
      <div className="container mx-auto px-4 relative z-[2]">
        <SectionHeader title={t("aboutTitle")} subtitle={t("aboutSubtitle")} />

        <div className="max-w-6xl mx-auto">
          <p className="text-base md:text-lg text-space-ice/90 leading-8 max-w-4xl mx-auto text-center mb-10 md:mb-14">
            {t("aboutSummary")}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] gap-8 lg:gap-10 items-start">
            <div>
              <h3 className="flex items-center gap-3 text-xl font-semibold mb-6">
                <Briefcase size={22} className="text-space-cyan" aria-hidden />{t("experienceTitle")}
              </h3>
              <ol className="relative border-s border-space-cyan/25 ms-2 space-y-5">
                {experiences.map((entry, index) => (
                  <motion.li key={entry.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.15) }}
                    className="relative ps-6 sm:ps-8">
                    <span className={`absolute -start-[5px] top-7 w-[9px] h-[9px] rounded-full ring-4 ring-space-dark ${entry.current ? "bg-space-cyan" : "bg-space-blue border border-space-cyan/60"}`} aria-hidden />
                    <details open={entry.current || undefined} className={`group rounded-2xl border p-4 sm:p-5 ${entry.current ? "border-space-cyan/45 bg-space-navy/60" : "border-space-cyan/15 bg-space-navy/25"}`}>
                      <summary className="list-none cursor-pointer [&::-webkit-details-marker]:hidden">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <p className="text-sm font-medium text-space-cyan">{t(entry.companyKey)}</p>
                        {entry.current && <span className="inline-flex items-center gap-1.5 text-[11px] text-space-cyan bg-space-cyan/10 border border-space-cyan/25 rounded-full px-2.5 py-1"><span className="w-1 h-1 rounded-full bg-space-cyan" aria-hidden />{t("currentRole")}</span>}
                      </div>
                      <div className="flex items-start justify-between gap-3"><h4 className="text-base sm:text-lg font-semibold leading-relaxed mb-2">{t(entry.titleKey)}</h4><ChevronDown size={18} className="text-space-cyan shrink-0 mt-1 transition-transform group-open:rotate-180" aria-hidden /></div>
                      <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-space-ice/65">
                        <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} aria-hidden />{t(entry.periodKey)}</span>
                        <span className="inline-flex items-center gap-1.5"><MapPin size={13} aria-hidden />{t(entry.locationKey)}</span>
                      </div>
                      </summary>
                      <div className="pt-4 mt-4 border-t border-space-cyan/10">
                      {entry.bulletKeys?.length ? (
                        <ul className="space-y-2.5">
                          {entry.bulletKeys.map((key) => <li key={key} className="flex gap-2.5 text-sm text-space-ice/85 leading-7"><span className="w-1 h-1 rounded-full bg-space-cyan/70 shrink-0 mt-3" aria-hidden /><span>{t(key)}</span></li>)}
                        </ul>
                      ) : <p className="text-sm text-space-ice/85 leading-7">{t(entry.descriptionKey)}</p>}
                      {entry.tech && <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-space-cyan/10" dir="ltr">
                        {entry.tech.map((tech) => <span key={tech} className="px-2 py-1 rounded-md bg-space-blue/25 text-[11px] text-space-ice/75">{tech}</span>)}
                      </div>}
                      </div>
                    </details>
                  </motion.li>
                ))}
              </ol>
            </div>

            <aside className="space-y-7 lg:sticky lg:top-24">
              <section aria-labelledby="education-heading" className="rounded-2xl border border-space-cyan/20 bg-space-navy/30 p-5 sm:p-6">
                <h3 id="education-heading" className="flex items-center gap-3 text-lg font-semibold mb-6"><GraduationCap size={22} className="text-space-cyan" aria-hidden />{t("educationTitle")}</h3>
                <ul className="space-y-5 divide-y divide-space-cyan/15">
                  {education.map((entry, index) => <li key={entry.id} className={index ? "pt-5" : ""}>
                    <p className="text-xs text-space-cyan mb-1.5 leading-6">{t(entry.schoolKey)}</p>
                    <h4 className="text-sm font-semibold leading-7">{t(entry.degreeKey)}</h4>
                    {entry.periodKey && <p className="text-xs text-space-ice/60 leading-6 mt-2">{t(entry.periodKey)}</p>}
                    {entry.gpaKey && <p className="text-xs text-space-ice/70 mt-2">{t(entry.gpaKey)}</p>}
                  </li>)}
                </ul>
              </section>

              <section aria-labelledby="recognition-heading" className="rounded-2xl border border-space-cyan/15 p-5 sm:p-6 bg-space-navy/20">
                <h3 id="recognition-heading" className="text-sm font-semibold text-space-ice/70 mb-5">{t("selectedRecognition")}</h3>
                <ul className="space-y-5">
                  {[
                    { titleKey: "bestEngineer2024", subtitleKey: "smartMethods", emoji: "🌟" },
                    { titleKey: "wro2025", subtitleKey: "technicalSupervisor", emoji: "🥇" },
                    { titleKey: "sdaChampion", subtitleKey: "weekFive", emoji: "🏆" },
                  ].map((item) => <li key={item.titleKey} className="flex gap-3 items-start"><span aria-hidden className="text-xl">{item.emoji}</span><div><p className="text-sm font-medium leading-6">{t(item.titleKey)}</p><p className="text-xs text-space-ice/55 mt-1">{t(item.subtitleKey)}</p></div></li>)}
                </ul>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
