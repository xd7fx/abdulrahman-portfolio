"use client";

import { useState } from "react";
import { FileText, ExternalLink, GraduationCap, Search } from "lucide-react";
import SectionPlanet from "./SectionPlanet";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { certificates } from "@/data/certificates";

export default function Certificates() {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [showAll, setShowAll] = useState(false);
  const search = query.trim().toLocaleLowerCase();
  const filtered = certificates.filter((cert) => (!year || cert.year === year) &&
    `${t(cert.titleKey)} ${t(cert.issuerKey)}`.toLocaleLowerCase().includes(search));
  const visible = showAll || search || year ? filtered : filtered.filter((cert) => ["credential-8", "credential-7", "credential-10"].includes(cert.id));
  const years = Array.from(new Set(certificates.map((cert) => cert.year))).sort().reverse();

  return (
    <section id="certificates" className="py-10 md:py-14 relative overflow-hidden z-[1]">
      <SectionPlanet planet="ice" size={460} position="left" verticalAlign="top" />
      <div className="container mx-auto px-4 relative z-[2]">
        <SectionHeader title={t("certificatesTitle")} subtitle={t("certificatesSubtitle")} />
        <div className="max-w-6xl mx-auto">

          <div className="grid sm:grid-cols-[1fr_10rem] gap-3 mb-4">
            <label className="flex items-center gap-3 rounded-lg border border-space-cyan/30 bg-space-navy/60 px-4">
              <Search size={18} className="text-space-cyan shrink-0" aria-hidden />
              <span className="sr-only">{t("searchCertificates")}</span>
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("searchCertificates")}
                className="w-full min-w-0 py-3 bg-transparent text-sm focus:outline-none" />
            </label>
            <label>
              <span className="sr-only">{t("filterYear")}</span>
              <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full rounded-lg border border-space-cyan/30 bg-space-navy px-4 py-3 text-sm">
                <option value="">{t("allYears")}</option>
                {years.map((value) => <option key={value} value={value}>{value}</option>)}
              </select>
            </label>
          </div>
          <p role="status" className="text-xs text-space-ice/60 mb-6">{filtered.length} / {certificates.length} · {t("certificateRecords")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visible.map((cert) => (
              <article key={cert.id} className="card-glow flex flex-col">
                <div className="flex items-center justify-between gap-3 mb-4 text-space-cyan">
                  <GraduationCap size={24} aria-hidden />
                  <time dateTime={cert.issued} className="text-xs">{new Intl.DateTimeFormat(language, { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${cert.issued}-01T00:00:00Z`))}</time>
                </div>
                <h3 className="font-semibold leading-snug mb-2">{t(cert.titleKey)}</h3>
                <p className="text-space-cyan text-sm mb-3">{t(cert.issuerKey)}</p>
                <p className="text-space-ice/70 text-sm mb-5">{t(cert.descriptionKey)}</p>
                <div className="flex flex-wrap gap-4 text-xs text-space-cyan mt-auto">
                  {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white"
                    aria-label={`${t("viewCertificate")} — ${t(cert.titleKey)}`}><ExternalLink size={14} />{t("viewCertificate")}</a>}
                  {cert.file && <a href={cert.file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white"
                    aria-label={`${t("originalFile")} — ${t(cert.titleKey)}`}><FileText size={14} />{t("originalFile")}</a>}
                </div>
              </article>
            ))}
          </div>
          {!filtered.length && <p className="text-center text-space-ice/70 py-12">{t("noResults")}</p>}
          {!search && !year && <div className="text-center mt-8"><button type="button" className="btn-primary" onClick={() => setShowAll(!showAll)} aria-expanded={showAll}>
            {t(showAll ? "showFewer" : "showAllCertificates")} <span className="ms-2">({certificates.length})</span>
          </button></div>}
        </div>
      </div>
    </section>
  );
}
