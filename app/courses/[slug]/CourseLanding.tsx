"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  GraduationCap,
  Layers,
  Loader2,
  Lock,
  PlayCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Course } from "@/data/courses";
import { specializations } from "@/data/specializations";
import { universities } from "@/data/universities";
import Combobox, { OTHER_VALUE, type ComboboxOption } from "@/components/Combobox";
import LanguageToggle from "@/components/LanguageToggle";
import ParticleBackground from "@/components/ParticleBackground";
import { submitCourseEvent } from "@/lib/coursesWebhook";
import {
  getProgress,
  isModuleUnlocked,
  markRegistered,
  type CourseProgress,
} from "@/lib/courseProgress";

interface Props {
  course: Course;
}

type FormStatus = "idle" | "sending" | "success" | "error";

const LEVEL_KEYS = [
  "levelSecondary",
  "levelDiploma",
  "levelBachelor",
  "levelGraduate",
  "levelEmployee",
  "levelOther",
] as const;

export default function CourseLanding({ course }: Props) {
  const { t, dir, language } = useLanguage();
  const router = useRouter();
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    universityChoice: "",
    universityOther: "",
    majorChoice: "",
    majorOther: "",
    level: "" as (typeof LEVEL_KEYS)[number] | "",
    agreed: false,
  });

  useEffect(() => {
    setProgress(getProgress(course.slug));
  }, [course.slug]);

  // Build dropdown option lists. The canonical `value` stays in Arabic so
  // the form state survives a mid-form language toggle; the `label` shows
  // the user-facing string in the active language (falling back to Arabic
  // when an English name hasn't been filled in yet).
  const universityOptions: ComboboxOption[] = useMemo(
    () =>
      universities.map((u) => {
        const label = language === "en" && u.nameEn ? u.nameEn : u.name;
        const altHint = language === "en" ? u.name : u.nameEn;
        const sectorHint =
          u.sector === "government"
            ? t("uniSectorGov")
            : u.sector === "private"
              ? t("uniSectorPrivate")
              : undefined;
        return {
          value: u.name,
          label,
          hint: [altHint, sectorHint].filter(Boolean).join(" · ") || undefined,
        };
      }),
    [t, language]
  );
  const specializationOptions: ComboboxOption[] = useMemo(
    () =>
      specializations.map((s) => {
        const label = language === "en" && s.nameEn ? s.nameEn : s.name;
        const altHint = language === "en" ? s.name : s.nameEn;
        return {
          value: s.name,
          label,
          hint: [altHint, s.university].filter(Boolean).join(" · ") || undefined,
        };
      }),
    [language]
  );

  // Resolve the value the user picked into the language-appropriate string
  // for storage. "Other" values are user-typed and stay verbatim.
  const resolveUniversity = (raw: string) => {
    if (!raw) return "";
    const u = universities.find((x) => x.name === raw);
    if (!u) return raw;
    return language === "en" && u.nameEn ? u.nameEn : u.name;
  };
  const resolveMajor = (raw: string) => {
    if (!raw) return "";
    const s = specializations.find((x) => x.name === raw);
    if (!s) return raw;
    return language === "en" && s.nameEn ? s.nameEn : s.name;
  };

  const universityFinal =
    form.universityChoice === OTHER_VALUE
      ? form.universityOther.trim()
      : resolveUniversity(form.universityChoice);
  const majorFinal =
    form.majorChoice === OTHER_VALUE
      ? form.majorOther.trim()
      : resolveMajor(form.majorChoice);

  const moduleIds = course.modules.map((m) => m.id);
  const isRegistered = progress?.registered ?? false;
  const BackArrow = dir === "rtl" ? ArrowRight : ArrowLeft;
  const canSubmit =
    form.name.trim().length > 0 &&
    form.email.trim().length > 0 &&
    universityFinal.length > 0 &&
    majorFinal.length > 0 &&
    form.level !== "" &&
    form.agreed &&
    status !== "sending";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("sending");

    const result = await submitCourseEvent({
      type: "registration",
      courseSlug: course.slug,
      courseTitleEn: course.titleEn,
      email: form.email,
      name: form.name,
      university: universityFinal,
      major: majorFinal,
      level: form.level ? t(form.level) : "unspecified",
      agreed: form.agreed,
      language,
    });

    // Local success even if both webhooks failed — student can still take the course.
    const updated = markRegistered(course.slug, form.email, course.modules[0].id);
    setProgress(updated);
    if (!result.web3forms && !result.sheets) {
      // Soft warning: nothing was logged remotely. Still let them in.
    }
    setStatus("success");
    setTimeout(() => router.push(`/courses/${course.slug}/learn`), 700);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ParticleBackground />

      <header className="relative z-[2] container mx-auto px-4 pt-6 flex items-center justify-between">
        <Link
          href="/#courses"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-space-navy/50 border border-space-cyan/30 hover:bg-space-cyan/10 text-space-ice transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan"
        >
          <BackArrow size={16} className="text-space-cyan" />
          <span className="text-sm font-semibold">{t("backToCourses")}</span>
        </Link>
        <LanguageToggle />
      </header>

      <article className="relative z-[1] container mx-auto px-4 pb-20 pt-10">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-wrap items-start gap-4 mb-6">
            <div className="text-6xl drop-shadow-2xl" aria-hidden>
              {course.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl md:text-5xl font-orbitron font-bold glow-text leading-tight">
                {t(course.titleKey)}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-space-ice/80 mb-8">
            {course.level && (
              <span className="inline-flex items-center gap-2">
                <GraduationCap size={14} className="text-space-cyan" aria-hidden />
                <span className="text-space-ice/60">{t("courseLevel")}:</span>
                <span className="font-semibold">{course.level}</span>
              </span>
            )}
            {course.totalDuration && (
              <span className="inline-flex items-center gap-2">
                <Clock size={14} className="text-space-cyan" aria-hidden />
                <span className="text-space-ice/60">{t("courseDuration")}:</span>
                <span className="font-semibold">{course.totalDuration}</span>
              </span>
            )}
            <span className="inline-flex items-center gap-2">
              <Layers size={14} className="text-space-cyan" aria-hidden />
              <span className="text-space-ice/60">{t("courseModules")}:</span>
              <span className="font-semibold">{course.modules.length}</span>
            </span>
          </div>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-space-cyan/20 mb-10">
            <Image
              src={course.image}
              alt={course.titleEn}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${course.color} opacity-25`} />
          </div>
        </motion.section>

        {/* Body */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            {course.aboutKey && (
              <div className="card-glow">
                <h2 className="text-2xl font-orbitron font-bold text-space-cyan mb-4">
                  {t("aboutCourse")}
                </h2>
                <p className="text-space-ice/90 leading-relaxed text-base whitespace-pre-line">
                  {t(course.aboutKey)}
                </p>
              </div>
            )}

            <div className="card-glow">
              <h2 className="text-2xl font-orbitron font-bold text-space-cyan mb-4">
                {t("courseModules")}
              </h2>
              <ol className="space-y-3">
                {course.modules.map((m, i) => {
                  const completed = progress?.completedModuleIds.includes(m.id) ?? false;
                  const unlocked =
                    progress != null && isModuleUnlocked(progress, moduleIds, m.id);
                  return (
                    <li
                      key={m.id}
                      className={`flex items-start gap-3 rounded-lg p-3 border ${
                        completed
                          ? "border-green-500/30 bg-green-500/5"
                          : unlocked
                            ? "border-space-cyan/30 bg-space-cyan/5"
                            : "border-space-blue/30 bg-space-navy/30 opacity-70"
                      }`}
                    >
                      <span className="shrink-0 mt-1">
                        {completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400" aria-hidden />
                        ) : unlocked ? (
                          <PlayCircle className="w-5 h-5 text-space-cyan" aria-hidden />
                        ) : (
                          <Lock className="w-5 h-5 text-space-ice/40" aria-hidden />
                        )}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-orbitron font-semibold">
                            {t(m.titleKey)}
                          </h3>
                          {m.duration && (
                            <span className="text-xs text-space-ice/60 shrink-0">
                              {m.duration}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-space-ice/70 mt-1">
                          {t(m.descriptionKey)}
                        </p>
                        {!unlocked && !completed && (
                          <p className="text-xs text-space-ice/50 italic mt-2">
                            {t("moduleLocked")}
                          </p>
                        )}
                        {completed && (
                          <p className="text-xs text-green-400 mt-2">
                            {t("moduleCompleted")}
                          </p>
                        )}
                      </div>
                      <span className="shrink-0 text-xs font-orbitron font-bold text-space-cyan/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </motion.section>

          {/* Side: Register or Continue */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="card-glow h-fit lg:sticky lg:top-6"
          >
            {isRegistered ? (
              <div>
                <h2 className="text-xl font-orbitron font-bold text-space-cyan mb-3">
                  {t("continueLearning")}
                </h2>
                <p className="text-space-ice/80 text-sm mb-4">
                  {progress?.completedModuleIds.length ?? 0} / {course.modules.length}{" "}
                  {t("courseModules")}
                </p>
                <Link
                  href={`/courses/${course.slug}/learn`}
                  className="btn-primary w-full inline-flex items-center justify-center gap-2"
                >
                  <PlayCircle size={18} />
                  {t("continueLearning")}
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h2 className="text-xl font-orbitron font-bold text-space-cyan">
                    {t("registrationTitle")}
                  </h2>
                  <p className="text-space-ice/70 text-xs mt-1">{t("registrationDesc")}</p>
                </div>

                <div className="space-y-3">
                  <label className="block">
                    <span className="text-xs text-space-ice/70">{t("fullName")}</span>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={t("fullNamePlaceholder")}
                      className="mt-1 w-full px-3 py-2 text-sm rounded-lg bg-space-navy/40 border border-space-cyan/30 focus:border-space-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan text-white placeholder:text-space-ice/40"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs text-space-ice/70">Email</span>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="email@example.com"
                      className="mt-1 w-full px-3 py-2 text-sm rounded-lg bg-space-navy/40 border border-space-cyan/30 focus:border-space-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan text-white placeholder:text-space-ice/40"
                    />
                  </label>

                  <div className="block">
                    <label htmlFor="combobox-university" className="text-xs text-space-ice/70">
                      {t("universityField")}
                    </label>
                    <div className="mt-1">
                      <Combobox
                        id="combobox-university"
                        options={universityOptions}
                        value={form.universityChoice}
                        onChange={(v) => setForm({ ...form, universityChoice: v })}
                        placeholder={t("universityPlaceholder")}
                        searchPlaceholder={t("comboboxSearchPlaceholder")}
                        otherLabel={t("universityOtherOption")}
                        ariaLabel={t("universityField")}
                        required
                      />
                    </div>
                    {form.universityChoice === OTHER_VALUE && (
                      <input
                        type="text"
                        required
                        value={form.universityOther}
                        onChange={(e) => setForm({ ...form, universityOther: e.target.value })}
                        placeholder={t("universityOtherPlaceholder")}
                        aria-label={t("universityOtherPlaceholder")}
                        className="mt-2 w-full px-3 py-2 text-sm rounded-lg bg-space-navy/40 border border-space-cyan/30 focus:border-space-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan text-white placeholder:text-space-ice/40"
                      />
                    )}
                  </div>

                  <div className="block">
                    <label htmlFor="combobox-major" className="text-xs text-space-ice/70">
                      {t("majorField")}
                    </label>
                    <div className="mt-1">
                      <Combobox
                        id="combobox-major"
                        options={specializationOptions}
                        value={form.majorChoice}
                        onChange={(v) => setForm({ ...form, majorChoice: v })}
                        placeholder={t("majorPlaceholder")}
                        searchPlaceholder={t("comboboxSearchPlaceholder")}
                        otherLabel={t("majorOtherOption")}
                        ariaLabel={t("majorField")}
                        required
                      />
                    </div>
                    {form.majorChoice === OTHER_VALUE && (
                      <input
                        type="text"
                        required
                        value={form.majorOther}
                        onChange={(e) => setForm({ ...form, majorOther: e.target.value })}
                        placeholder={t("majorOtherPlaceholder")}
                        aria-label={t("majorOtherPlaceholder")}
                        className="mt-2 w-full px-3 py-2 text-sm rounded-lg bg-space-navy/40 border border-space-cyan/30 focus:border-space-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan text-white placeholder:text-space-ice/40"
                      />
                    )}
                  </div>

                  <fieldset className="block">
                    <legend className="text-xs text-space-ice/70 mb-2">
                      {t("levelField")}
                    </legend>
                    <div className="grid grid-cols-2 gap-2">
                      {LEVEL_KEYS.map((lv) => (
                        <label
                          key={lv}
                          className={`cursor-pointer rounded-lg border px-3 py-2 text-xs text-center transition-colors ${
                            form.level === lv
                              ? "border-space-cyan bg-space-cyan/15 text-space-cyan"
                              : "border-space-blue/40 text-space-ice/80 hover:border-space-cyan/40"
                          }`}
                        >
                          <input
                            type="radio"
                            name="level"
                            value={lv}
                            checked={form.level === lv}
                            onChange={() => setForm({ ...form, level: lv })}
                            required
                            className="sr-only"
                          />
                          {t(lv)}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={form.agreed}
                      onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
                      className="mt-1 accent-space-cyan w-4 h-4"
                    />
                    <span className="text-xs text-space-ice/80 leading-relaxed">
                      {t("agreementText")}
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      {t("registrationSending")}
                    </>
                  ) : (
                    t("submitRegistration")
                  )}
                </button>

                {status === "success" && (
                  <p className="text-xs text-green-400 text-center">
                    {t("registrationSuccess")}
                  </p>
                )}
                {status === "error" && (
                  <p className="text-xs text-red-400 text-center">{t("registrationError")}</p>
                )}
              </form>
            )}
          </motion.aside>
        </div>

        {/* Sponsors row */}
        {course.sponsors && course.sponsors.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto mt-16"
          >
            <h2 className="text-xl font-orbitron font-bold text-space-cyan text-center mb-6">
              {t("courseSponsorsTitle")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {course.sponsors.map((sponsor) => {
                const inner = (
                  <div className="card-glow flex items-center justify-center aspect-[3/2] bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="relative w-full h-full">
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className={`object-contain ${sponsor.logoPadding ?? "p-4"}`}
                      />
                    </div>
                  </div>
                );
                return sponsor.link ? (
                  <a
                    key={sponsor.id}
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={sponsor.name}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={sponsor.id}>{inner}</div>
                );
              })}
            </div>
          </motion.section>
        )}
      </article>
    </main>
  );
}
