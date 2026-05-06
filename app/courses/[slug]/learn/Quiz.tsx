"use client";

import { Loader2, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { QuizQuestion } from "@/data/courses";
import type { QuizAnswer } from "@/lib/courseProgress";

interface QuizProps {
  /** Questions to render in order. */
  questions: QuizQuestion[];
  /** Title (translation key already resolved by parent). */
  title: string;
  /** Subtitle / instructions. */
  subtitle: string;
  /** Submit button label. */
  submitLabel: string;
  /** Status indicator. */
  status: "idle" | "sending" | "success" | "error";
  successMessage: string;
  errorMessage: string;
  sendingLabel: string;
  /** Called with the parallel array of answers (matching `questions` order). */
  onSubmit: (answers: QuizAnswer[]) => void;
}

function emptyAnswerFor(q: QuizQuestion): QuizAnswer {
  switch (q.type) {
    case "stars-1-5":
    case "scale-1-5":
      return 0; // unset numeric
    case "multiple-choice":
    case "free-text":
      return "";
  }
}

function isAnswerComplete(q: QuizQuestion, a: QuizAnswer): boolean {
  if (q.optional) return true;
  if (q.type === "stars-1-5" || q.type === "scale-1-5") {
    return typeof a === "number" && a >= 1 && a <= 5;
  }
  return typeof a === "string" && a.trim().length > 0;
}

export default function Quiz({
  questions,
  title,
  subtitle,
  submitLabel,
  status,
  successMessage,
  errorMessage,
  sendingLabel,
  onSubmit,
}: QuizProps) {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<QuizAnswer[]>(() =>
    questions.map(emptyAnswerFor)
  );

  const allValid = useMemo(
    () => questions.every((q, i) => isAnswerComplete(q, answers[i])),
    [questions, answers]
  );

  const setAnswer = (idx: number, value: QuizAnswer) =>
    setAnswers((prev) => prev.map((v, i) => (i === idx ? value : v)));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allValid || status === "sending") return;
    onSubmit(answers);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-orbitron font-bold text-space-cyan">
          {title}
        </h2>
        <p className="text-sm text-space-ice/70 mt-1">{subtitle}</p>
      </div>

      {questions.map((q, qi) => {
        const value = answers[qi];
        return (
          <fieldset key={q.questionKey + qi} className="space-y-3">
            <legend className="text-sm font-semibold text-space-ice">
              {qi + 1}. {t(q.questionKey)}
              {q.optional && (
                <span className="ms-2 text-xs text-space-ice/50">(optional)</span>
              )}
            </legend>

            {q.type === "stars-1-5" && (
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setAnswer(qi, n)}
                    aria-label={`${n} / 5`}
                    className={`p-2 rounded-lg transition-colors ${
                      typeof value === "number" && value >= n
                        ? "text-yellow-400"
                        : "text-space-ice/30 hover:text-yellow-300"
                    }`}
                  >
                    <Star
                      size={28}
                      fill={typeof value === "number" && value >= n ? "currentColor" : "none"}
                    />
                  </button>
                ))}
                <span className="ms-3 text-sm text-space-ice/70">
                  {typeof value === "number" && value > 0 ? `${value} / 5` : ""}
                </span>
              </div>
            )}

            {q.type === "scale-1-5" && (
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <label
                    key={n}
                    className={`flex-1 cursor-pointer rounded-lg border py-3 text-center font-orbitron font-bold transition-colors ${
                      value === n
                        ? "border-space-cyan bg-space-cyan/20 text-space-cyan"
                        : "border-space-blue/40 text-space-ice/70 hover:border-space-cyan/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${qi}`}
                      value={n}
                      checked={value === n}
                      onChange={() => setAnswer(qi, n)}
                      className="sr-only"
                    />
                    {n}
                  </label>
                ))}
              </div>
            )}

            {q.type === "multiple-choice" && q.optionKeys && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.optionKeys.map((optKey) => {
                  const optValue = t(optKey);
                  const selected = value === optValue;
                  return (
                    <label
                      key={optKey}
                      className={`cursor-pointer rounded-lg border px-4 py-3 text-sm transition-colors ${
                        selected
                          ? "border-space-cyan bg-space-cyan/15 text-space-cyan"
                          : "border-space-blue/40 text-space-ice/80 hover:border-space-cyan/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${qi}`}
                        value={optValue}
                        checked={selected}
                        onChange={() => setAnswer(qi, optValue)}
                        className="sr-only"
                      />
                      {optValue}
                    </label>
                  );
                })}
              </div>
            )}

            {q.type === "free-text" && (
              <textarea
                rows={3}
                value={typeof value === "string" ? value : ""}
                onChange={(e) => setAnswer(qi, e.target.value)}
                placeholder={t("quizFreeTextPlaceholder")}
                className="w-full px-3 py-2 text-sm rounded-lg bg-space-navy/40 border border-space-cyan/30 focus:border-space-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan text-white placeholder:text-space-ice/40 resize-none"
              />
            )}
          </fieldset>
        );
      })}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!allValid || status === "sending"}
          className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "sending" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              {sendingLabel}
            </>
          ) : (
            submitLabel
          )}
        </button>
      </div>

      {status === "success" && (
        <p className="text-xs text-green-400 text-center">{successMessage}</p>
      )}
      {status === "error" && (
        <p className="text-xs text-red-400 text-center">{errorMessage}</p>
      )}
    </form>
  );
}
