/**
 * Client-side course progress storage.
 *
 * All progress is kept in browser localStorage — no backend, no auth.
 * Progress is per-device. If the user clears storage or switches device,
 * they re-register.
 *
 * Schema (one entry per course slug):
 * ```
 * portfolio:course:<slug> = {
 *   registered: boolean,
 *   registeredAt: ISO string,
 *   email: string,
 *   completedModuleIds: string[],
 *   currentModuleId: string | null,
 *   quizAnswers: { [moduleId]: (number | string)[] },
 *   finalEvaluationCompleted: boolean,
 *   finalEvaluationAnswers: (number | string)[] | null
 * }
 * ```
 */

const KEY_PREFIX = "portfolio:course:";

export type QuizAnswer = number | string;

export type CourseProgress = {
  registered: boolean;
  registeredAt: string | null;
  email: string | null;
  completedModuleIds: string[];
  currentModuleId: string | null;
  quizAnswers: Record<string, QuizAnswer[]>;
  finalEvaluationCompleted: boolean;
  finalEvaluationAnswers: QuizAnswer[] | null;
};

const empty = (): CourseProgress => ({
  registered: false,
  registeredAt: null,
  email: null,
  completedModuleIds: [],
  currentModuleId: null,
  quizAnswers: {},
  finalEvaluationCompleted: false,
  finalEvaluationAnswers: null,
});

export function getProgress(slug: string): CourseProgress {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(KEY_PREFIX + slug);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as Partial<CourseProgress>;
    return { ...empty(), ...parsed };
  } catch {
    return empty();
  }
}

export function saveProgress(slug: string, progress: CourseProgress): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY_PREFIX + slug, JSON.stringify(progress));
  } catch {
    /* localStorage quota or disabled — no-op */
  }
}

export function markRegistered(slug: string, email: string, firstModuleId: string): CourseProgress {
  const progress: CourseProgress = {
    ...getProgress(slug),
    registered: true,
    registeredAt: new Date().toISOString(),
    email,
    currentModuleId: firstModuleId,
  };
  saveProgress(slug, progress);
  return progress;
}

export function markModuleCompleted(
  slug: string,
  moduleId: string,
  answers: QuizAnswer[],
  nextModuleId: string | null
): CourseProgress {
  const current = getProgress(slug);
  const completed = current.completedModuleIds.includes(moduleId)
    ? current.completedModuleIds
    : [...current.completedModuleIds, moduleId];
  const progress: CourseProgress = {
    ...current,
    completedModuleIds: completed,
    currentModuleId: nextModuleId ?? moduleId,
    quizAnswers: { ...current.quizAnswers, [moduleId]: answers },
  };
  saveProgress(slug, progress);
  return progress;
}

export function markFinalEvaluationCompleted(
  slug: string,
  answers: QuizAnswer[]
): CourseProgress {
  const current = getProgress(slug);
  const progress: CourseProgress = {
    ...current,
    finalEvaluationCompleted: true,
    finalEvaluationAnswers: answers,
  };
  saveProgress(slug, progress);
  return progress;
}

export function isModuleUnlocked(
  progress: CourseProgress,
  moduleIds: string[],
  targetModuleId: string
): boolean {
  if (!progress.registered) return false;
  const idx = moduleIds.indexOf(targetModuleId);
  if (idx <= 0) return idx === 0; // first module always unlocked once registered
  const previousId = moduleIds[idx - 1];
  return progress.completedModuleIds.includes(previousId);
}
