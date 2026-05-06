/**
 * Courses offered through the portfolio.
 *
 * Each course has a list of modules. A module is a video + a slide deck +
 * a 3-question quiz (1–5 scale per question). The student progresses
 * sequentially: module N unlocks only after module N-1's video is watched
 * AND its quiz is submitted.
 *
 * Translation keys (`titleKey`, `descriptionKey`, `aboutKey`,
 * `module.titleKey`, `module.descriptionKey`, `quiz.questionKeys`) resolve
 * through `useLanguage().t(...)` against `contexts/LanguageContext.tsx`.
 * Every key referenced here MUST exist in both `en` and `ar` blocks.
 *
 * Tech-noun fields (`youtubeId`, `googleSlidesEmbedUrl`) are stable
 * identifiers, NOT translated.
 *
 * To add a new course or module, prefer the `/add-course` and
 * `/add-course-module` Claude skills.
 */
export type QuizQuestion = {
  /** Translation key for the question text. */
  questionKey: string;
  /** Optional short-text answer (no translation; the user types free text). */
  type?: "scale-1-5" | "free-text";
};

export type CourseModule = {
  /** Stable id used as React key and in localStorage progress. Lowercase, hyphenated. */
  id: string;
  /** Translation key for the module title. */
  titleKey: string;
  /** Translation key for the short module description. */
  descriptionKey: string;
  /** YouTube video ID — the part after `?v=` in the URL. Use unlisted videos. */
  youtubeId: string;
  /** Optional Google Slides EMBED url — File → Share → Publish to web → Embed. */
  googleSlidesEmbedUrl?: string;
  /** Approximate duration label, e.g. "12:30". Free-form. */
  duration?: string;
  /** Exactly 3 quiz questions. Each is rated on a 1–5 scale unless otherwise typed. */
  quiz: [QuizQuestion, QuizQuestion, QuizQuestion];
};

export type Course = {
  /** URL slug used by /courses/[slug]. Lowercase, hyphenated, ASCII only. */
  slug: string;
  /** Translation key for the course title. */
  titleKey: string;
  /** Canonical English title. Used for OpenGraph, alt text, etc. */
  titleEn: string;
  /** Single emoji shown on the card. */
  emoji: string;
  /** Translation key for the short course description (card). */
  descriptionKey: string;
  /** Translation key for an extended write-up (course landing page). */
  aboutKey?: string;
  /** Card image — path under /public or remote URL allow-listed in next.config.mjs. */
  image: string;
  /** Tailwind gradient suffix used by the card overlay. */
  color: string;
  /** Free-form level label, e.g. "Beginner", "Intermediate". */
  level?: string;
  /** Free-form total-duration label, e.g. "~3h". */
  totalDuration?: string;
  /** Course modules in order. The first module is unlocked by default. */
  modules: CourseModule[];
};

export const courses: Course[] = [
  {
    slug: "drone-360",
    titleKey: "drone360Title",
    titleEn: "Drone 360°: From Basics to Projects",
    emoji: "🚁",
    descriptionKey: "drone360Desc",
    aboutKey: "drone360About",
    image: "/projects/sabaq.jpg",
    color: "from-space-cyan to-space-blue",
    level: "Beginner → Intermediate",
    totalDuration: "~2h",
    modules: [
      {
        id: "intro-to-drones",
        titleKey: "drone360Mod1Title",
        descriptionKey: "drone360Mod1Desc",
        youtubeId: "REPLACE_WITH_VIDEO_ID",
        googleSlidesEmbedUrl: "",
        duration: "—",
        quiz: [
          { questionKey: "drone360Mod1Q1", type: "scale-1-5" },
          { questionKey: "drone360Mod1Q2", type: "scale-1-5" },
          { questionKey: "drone360Mod1Q3", type: "scale-1-5" },
        ],
      },
      {
        id: "first-flight",
        titleKey: "drone360Mod2Title",
        descriptionKey: "drone360Mod2Desc",
        youtubeId: "REPLACE_WITH_VIDEO_ID",
        googleSlidesEmbedUrl: "",
        duration: "—",
        quiz: [
          { questionKey: "drone360Mod2Q1", type: "scale-1-5" },
          { questionKey: "drone360Mod2Q2", type: "scale-1-5" },
          { questionKey: "drone360Mod2Q3", type: "scale-1-5" },
        ],
      },
    ],
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getAllCourseSlugs(): string[] {
  return courses.map((c) => c.slug);
}
