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
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Course } from "@/data/courses";
import LanguageToggle from "@/components/LanguageToggle";
import ParticleBackground from "@/components/ParticleBackground";
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

export default function CourseLanding({ course }: Props) {
  const { t, dir } = useLanguage();
  const router = useRouter();
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    university: "",
    major: "",
    level: "Undergraduate",
    motivation: "",
  });

  useEffect(() => {
    setProgress(getProgress(course.slug));
  }, [course.slug]);

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  const moduleIds = course.modules.map((m) => m.id);
  const isRegistered = progress?.registered ?? false;
  const BackArrow = dir === "rtl" ? ArrowRight : ArrowLeft;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    const submission = {
      subject: `[Course Registration] ${course.titleEn} — ${form.name}`,
      from_name: form.name,
      email: form.email,
      message: [
        `Course: ${course.titleEn} (${course.slug})`,
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `University: ${form.university}`,
        `Major: ${form.major}`,
        `Level: ${form.level}`,
        `Motivation: ${form.motivation || "—"}`,
      ].join("\n"),
    };

    try {
      if (accessKey) {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ access_key: accessKey, ...submission }),
        });
        if (!res.ok) throw new Error("Request failed");
      }
      // Mark registered locally even if Web3Forms is not configured.
      const updated = markRegistered(course.slug, form.email, course.modules[0].id);
      setProgress(updated);
      setStatus("success");
      setTimeout(() => router.push(`/courses/${course.slug}/learn`), 800);
    } catch {
      setStatus("error");
    }
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

            {/* Modules list */}
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
              <form onSubmit={handleSubmit} className="space-y-3">
                <h2 className="text-xl font-orbitron font-bold text-space-cyan mb-1">
                  {t("registrationTitle")}
                </h2>
                <p className="text-space-ice/70 text-xs mb-3">{t("registrationDesc")}</p>

                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={t("fullNamePlaceholder")}
                  aria-label={t("fullName")}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-space-navy/40 border border-space-cyan/30 focus:border-space-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan text-white placeholder:text-space-ice/40"
                />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="email@example.com"
                  aria-label="Email"
                  className="w-full px-3 py-2 text-sm rounded-lg bg-space-navy/40 border border-space-cyan/30 focus:border-space-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan text-white placeholder:text-space-ice/40"
                />
                <input
                  type="text"
                  required
                  value={form.university}
                  onChange={(e) => setForm({ ...form, university: e.target.value })}
                  placeholder={t("universityPlaceholder")}
                  aria-label={t("universityField")}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-space-navy/40 border border-space-cyan/30 focus:border-space-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan text-white placeholder:text-space-ice/40"
                />
                <input
                  type="text"
                  required
                  value={form.major}
                  onChange={(e) => setForm({ ...form, major: e.target.value })}
                  placeholder={t("majorPlaceholder")}
                  aria-label={t("majorField")}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-space-navy/40 border border-space-cyan/30 focus:border-space-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan text-white placeholder:text-space-ice/40"
                />
                <select
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                  aria-label={t("levelField")}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-space-navy/40 border border-space-cyan/30 focus:border-space-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan text-white"
                >
                  <option value="Undergraduate">{t("levelPlaceholderStudent")}</option>
                  <option value="Graduate">{t("levelPlaceholderGraduate")}</option>
                  <option value="Professional">{t("levelPlaceholderProfessional")}</option>
                </select>
                <textarea
                  rows={3}
                  value={form.motivation}
                  onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                  placeholder={t("motivationPlaceholder")}
                  aria-label={t("motivationField")}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-space-navy/40 border border-space-cyan/30 focus:border-space-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan text-white placeholder:text-space-ice/40 resize-none"
                />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
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
      </article>
    </main>
  );
}
