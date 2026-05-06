"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Lock,
  PlayCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Course, CourseModule, QuizQuestion } from "@/data/courses";
import LanguageToggle from "@/components/LanguageToggle";
import ParticleBackground from "@/components/ParticleBackground";
import {
  getProgress,
  isModuleUnlocked,
  markFinalEvaluationCompleted,
  markModuleCompleted,
  type CourseProgress,
  type QuizAnswer,
} from "@/lib/courseProgress";
import { submitCourseEvent } from "@/lib/coursesWebhook";
import Quiz from "./Quiz";

interface Props {
  course: Course;
}

type View = "video" | "quiz" | "final-eval" | "finished";
type SubmitStatus = "idle" | "sending" | "success" | "error";

export default function LearnClient({ course }: Props) {
  const { t, dir } = useLanguage();
  const router = useRouter();
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [view, setView] = useState<View>("video");
  const [quizStatus, setQuizStatus] = useState<SubmitStatus>("idle");
  const [finalStatus, setFinalStatus] = useState<SubmitStatus>("idle");

  const moduleIds = useMemo(() => course.modules.map((m) => m.id), [course]);
  const BackArrow = dir === "rtl" ? ArrowRight : ArrowLeft;

  useEffect(() => {
    const p = getProgress(course.slug);
    setProgress(p);
    if (!p.registered) {
      router.replace(`/courses/${course.slug}`);
      return;
    }
    setActiveModuleId(p.currentModuleId ?? course.modules[0].id);
    if (
      p.completedModuleIds.length === course.modules.length &&
      !p.finalEvaluationCompleted &&
      course.finalEvaluation
    ) {
      setView("final-eval");
    } else if (p.finalEvaluationCompleted) {
      setView("finished");
    }
  }, [course.slug, course.modules, course.finalEvaluation, router]);

  if (!progress) {
    return (
      <main className="relative min-h-screen flex items-center justify-center">
        <ParticleBackground />
        <Loader2 className="w-8 h-8 text-space-cyan animate-spin" aria-hidden />
      </main>
    );
  }

  const activeModule: CourseModule =
    course.modules.find((m) => m.id === activeModuleId) ?? course.modules[0];
  const activeIdx = course.modules.findIndex((m) => m.id === activeModule.id);
  const nextModule = course.modules[activeIdx + 1] ?? null;
  const isLastModule = nextModule == null;
  const totalCount = course.modules.length;
  const completedCount = progress.completedModuleIds.length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  const switchToModule = (moduleId: string) => {
    if (!isModuleUnlocked(progress, moduleIds, moduleId)) return;
    setActiveModuleId(moduleId);
    setView("video");
    setQuizStatus("idle");
  };

  const buildAnswerLogPairs = (questions: QuizQuestion[], answers: QuizAnswer[]) =>
    questions.map((q, i) => ({
      question: t(q.questionKey),
      answer: String(answers[i] ?? ""),
    }));

  const handleModuleQuizSubmit = async (answers: QuizAnswer[]) => {
    if (quizStatus === "sending") return;
    setQuizStatus("sending");
    const answerPairs = buildAnswerLogPairs(activeModule.quiz, answers);
    await submitCourseEvent({
      type: "module_quiz",
      courseSlug: course.slug,
      courseTitleEn: course.titleEn,
      email: progress.email ?? "anonymous",
      moduleId: activeModule.id,
      moduleTitleEn: activeModule.id,
      answers: answerPairs,
    });
    const updated = markModuleCompleted(
      course.slug,
      activeModule.id,
      answers,
      nextModule?.id ?? activeModule.id
    );
    setProgress(updated);
    setQuizStatus("success");
    setTimeout(() => {
      if (isLastModule) {
        if (course.finalEvaluation) {
          setView("final-eval");
        } else {
          setView("finished");
        }
      } else if (nextModule) {
        setActiveModuleId(nextModule.id);
        setView("video");
      }
      setQuizStatus("idle");
    }, 700);
  };

  const handleFinalEvaluationSubmit = async (answers: QuizAnswer[]) => {
    if (!course.finalEvaluation || finalStatus === "sending") return;
    setFinalStatus("sending");
    const answerPairs = buildAnswerLogPairs(course.finalEvaluation, answers);
    await submitCourseEvent({
      type: "final_evaluation",
      courseSlug: course.slug,
      courseTitleEn: course.titleEn,
      email: progress.email ?? "anonymous",
      answers: answerPairs,
    });
    const updated = markFinalEvaluationCompleted(course.slug, answers);
    setProgress(updated);
    setFinalStatus("success");
    setTimeout(() => setView("finished"), 700);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ParticleBackground />

      <header className="relative z-[2] container mx-auto px-4 pt-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/courses/${course.slug}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-space-navy/50 border border-space-cyan/30 hover:bg-space-cyan/10 text-space-ice transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan"
        >
          <BackArrow size={16} className="text-space-cyan" />
          <span className="text-sm font-semibold">{t("backToCourse")}</span>
        </Link>
        <div className="flex items-center gap-3 text-xs text-space-ice/70">
          <span>
            {t("progressLabel")}: {completedCount}/{totalCount}
          </span>
          <div className="w-32 h-2 rounded-full bg-space-navy/60 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-space-cyan to-space-blue transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
        <LanguageToggle />
      </header>

      <article className="relative z-[1] container mx-auto px-4 pb-20 pt-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1 card-glow h-fit lg:sticky lg:top-6">
            <h2 className="text-base font-orbitron font-bold text-space-cyan mb-3">
              {t("courseModules")}
            </h2>
            <ol className="space-y-2">
              {course.modules.map((m, i) => {
                const completed = progress.completedModuleIds.includes(m.id);
                const unlocked = isModuleUnlocked(progress, moduleIds, m.id);
                const active = m.id === activeModule.id && view !== "final-eval" && view !== "finished";
                return (
                  <li key={m.id}>
                    <button
                      type="button"
                      onClick={() => switchToModule(m.id)}
                      disabled={!unlocked}
                      className={`w-full text-start flex items-start gap-2 rounded-lg p-2 border text-sm transition-colors ${
                        active
                          ? "border-space-cyan bg-space-cyan/10"
                          : unlocked
                            ? "border-space-blue/40 hover:border-space-cyan/40 hover:bg-space-cyan/5"
                            : "border-space-blue/20 opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <span className="shrink-0 mt-0.5">
                        {completed ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400" aria-hidden />
                        ) : unlocked ? (
                          <PlayCircle className="w-4 h-4 text-space-cyan" aria-hidden />
                        ) : (
                          <Lock className="w-4 h-4 text-space-ice/40" aria-hidden />
                        )}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-xs text-space-cyan/70 font-orbitron font-bold">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="block leading-snug text-space-ice">
                          {t(m.titleKey)}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </aside>

          <section className="lg:col-span-3 space-y-6">
            <motion.div
              key={`${activeModule.id}-${view}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="card-glow"
            >
              {view === "finished" ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4" aria-hidden>
                    🎓
                  </div>
                  <h2 className="text-2xl md:text-3xl font-orbitron font-bold glow-text mb-3">
                    {t("playerCourseFinished")}
                  </h2>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="btn-primary inline-flex items-center gap-2 mt-4"
                  >
                    <BackArrow size={16} />
                    {t("backToCourse")}
                  </Link>
                </div>
              ) : view === "final-eval" && course.finalEvaluation ? (
                <Quiz
                  questions={course.finalEvaluation}
                  title={t("finalEvalTitle")}
                  subtitle={t("finalEvalSubtitle")}
                  submitLabel={t("finalEvalSubmit")}
                  status={finalStatus}
                  successMessage={t("finalEvalSubmitted")}
                  errorMessage={t("quizSubmitError")}
                  sendingLabel={t("quizSending")}
                  onSubmit={handleFinalEvaluationSubmit}
                />
              ) : view === "video" ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="min-w-0">
                      <p className="text-xs text-space-cyan/70 mb-1 uppercase tracking-wide">
                        {t("playerNowPlaying")}
                      </p>
                      <h2 className="text-xl md:text-2xl font-orbitron font-bold leading-snug">
                        {t(activeModule.titleKey)}
                      </h2>
                      <p className="text-sm text-space-ice/70 mt-1">
                        {t(activeModule.descriptionKey)}
                      </p>
                    </div>
                  </div>

                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-space-cyan/20 bg-space-dark">
                    {activeModule.youtubeId &&
                    activeModule.youtubeId !== "REPLACE_WITH_VIDEO_ID" ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${activeModule.youtubeId}?rel=0&modestbranding=1`}
                        title={course.titleEn + " — " + activeModule.id}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-space-ice/60 text-sm text-center px-6">
                        Video coming soon — paste the YouTube ID into{" "}
                        <code className="mx-1 px-1.5 py-0.5 rounded bg-space-navy/60 text-xs">
                          data/courses.ts
                        </code>{" "}
                        to enable.
                      </div>
                    )}
                  </div>

                  {activeModule.slidesEmbedUrl && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-orbitron font-semibold text-space-cyan">
                        {t("playerSlides")}
                      </h3>
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-space-cyan/20 bg-space-dark">
                        <iframe
                          src={activeModule.slidesEmbedUrl}
                          title={course.titleEn + " — slides — " + activeModule.id}
                          className="absolute inset-0 w-full h-full"
                          allow="fullscreen"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setView("quiz")}
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      {t("playerCompleteAndContinue")}
                      <ArrowRight
                        size={16}
                        className={dir === "rtl" ? "-scale-x-100" : ""}
                      />
                    </button>
                  </div>
                </div>
              ) : (
                <Quiz
                  key={activeModule.id}
                  questions={activeModule.quiz}
                  title={t("quizTitle")}
                  subtitle={t("quizSubtitle")}
                  submitLabel={t("quizSubmit")}
                  status={quizStatus}
                  successMessage={t("quizSubmitted")}
                  errorMessage={t("quizSubmitError")}
                  sendingLabel={t("quizSending")}
                  onSubmit={handleModuleQuizSubmit}
                />
              )}
            </motion.div>
          </section>
        </div>
      </article>
    </main>
  );
}
