/**
 * Submits course events (registrations, module quizzes, final evaluations)
 * to two destinations in parallel:
 *
 * 1. **Web3Forms** — the existing email pipeline used by the contact form.
 *    Sends a human-readable email summary to the site owner. Activated
 *    when `NEXT_PUBLIC_WEB3FORMS_KEY` is set.
 *
 * 2. **Google Sheets webhook** (optional) — a deployed Google Apps Script
 *    Web App that appends one row per submission to a spreadsheet for
 *    analytics. Activated when `NEXT_PUBLIC_COURSES_WEBHOOK_URL` is set.
 *    See `docs/google-sheets-setup.md` for the one-time Apps Script setup.
 *
 * Both destinations are best-effort. If either fails, the event still
 * succeeds locally (progress is saved in localStorage either way).
 */

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export type CourseEventBase = {
  /** Discriminator. */
  type: "registration" | "module_quiz" | "final_evaluation";
  /** ISO timestamp; assigned automatically if missing. */
  timestamp?: string;
  /** Course slug, e.g. "drone-360". */
  courseSlug: string;
  /** Course canonical English title (for human-readable summaries). */
  courseTitleEn: string;
  /** Student email (always present once registered). */
  email: string;
};

export type RegistrationEvent = CourseEventBase & {
  type: "registration";
  name: string;
  university: string;
  major: string;
  level: string;
  agreed: boolean;
};

export type ModuleQuizEvent = CourseEventBase & {
  type: "module_quiz";
  moduleId: string;
  moduleTitleEn?: string;
  /** Question -> answer pairs as plain strings (numbers stringified). */
  answers: Array<{ question: string; answer: string }>;
};

export type FinalEvaluationEvent = CourseEventBase & {
  type: "final_evaluation";
  answers: Array<{ question: string; answer: string }>;
};

export type CourseEvent = RegistrationEvent | ModuleQuizEvent | FinalEvaluationEvent;

function buildSubject(event: CourseEvent): string {
  switch (event.type) {
    case "registration":
      return `[Course Registration] ${event.courseTitleEn} — ${event.name}`;
    case "module_quiz":
      return `[Course Quiz] ${event.courseTitleEn} — ${event.moduleId}`;
    case "final_evaluation":
      return `[Course Final Evaluation] ${event.courseTitleEn}`;
  }
}

function buildHumanReadableMessage(event: CourseEvent): string {
  const lines: string[] = [
    `Course: ${event.courseTitleEn} (${event.courseSlug})`,
    `Type: ${event.type}`,
    `Timestamp: ${event.timestamp ?? new Date().toISOString()}`,
    `Email: ${event.email}`,
  ];
  switch (event.type) {
    case "registration":
      lines.push(
        `Name: ${event.name}`,
        `University: ${event.university}`,
        `Major: ${event.major}`,
        `Level: ${event.level}`,
        `Agreed: ${event.agreed ? "yes" : "no"}`
      );
      break;
    case "module_quiz":
      lines.push(`Module: ${event.moduleId}${event.moduleTitleEn ? ` (${event.moduleTitleEn})` : ""}`);
      event.answers.forEach((a, i) => {
        lines.push(`Q${i + 1}. ${a.question}`);
        lines.push(`A${i + 1}. ${a.answer || "—"}`);
      });
      break;
    case "final_evaluation":
      event.answers.forEach((a, i) => {
        lines.push(`Q${i + 1}. ${a.question}`);
        lines.push(`A${i + 1}. ${a.answer || "—"}`);
      });
      break;
  }
  return lines.join("\n");
}

/**
 * Posts the event to both Web3Forms and the Google Sheets webhook (if
 * configured). Returns a per-destination success map; never throws.
 */
export async function submitCourseEvent(event: CourseEvent): Promise<{
  web3forms: boolean;
  sheets: boolean;
}> {
  const enriched: CourseEvent = { ...event, timestamp: event.timestamp ?? new Date().toISOString() };
  const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  const sheetsUrl = process.env.NEXT_PUBLIC_COURSES_WEBHOOK_URL;

  const tasks: Array<Promise<boolean>> = [];

  if (web3formsKey) {
    tasks.push(
      fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: buildSubject(enriched),
          from_name: enriched.email,
          email: enriched.email,
          message: buildHumanReadableMessage(enriched),
        }),
      })
        .then((r) => r.ok)
        .catch(() => false)
    );
  } else {
    tasks.push(Promise.resolve(false));
  }

  if (sheetsUrl) {
    tasks.push(
      fetch(sheetsUrl, {
        method: "POST",
        // Apps Script Web Apps accept text/plain to avoid CORS preflight.
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(enriched),
      })
        .then((r) => r.ok)
        .catch(() => false)
    );
  } else {
    tasks.push(Promise.resolve(false));
  }

  const [web3forms, sheets] = await Promise.all(tasks);
  return { web3forms, sheets };
}
