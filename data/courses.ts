/**
 * Courses offered through the portfolio.
 *
 * Each course has a list of modules. A module is a video + a slide deck +
 * a short reflection quiz. The student progresses sequentially: module N
 * unlocks only after module N-1's video is watched AND its quiz is
 * submitted. After the LAST module's quiz, a course-level final
 * evaluation is presented before the "course finished" screen.
 *
 * Translation keys (`titleKey`, `descriptionKey`, `aboutKey`, module
 * titles/descriptions, and quiz `questionKey`/`optionKeys`) resolve through
 * `useLanguage().t(...)` against `contexts/LanguageContext.tsx`. Every key
 * referenced here MUST exist in both `en` and `ar` blocks.
 *
 * Tech-noun fields (`youtubeId`, `slidesEmbedUrl`, sponsor `logo` paths)
 * are stable identifiers, NOT translated.
 *
 * To add a new course or module, prefer the `/add-course` and
 * `/add-course-module` Claude skills.
 */
export type QuizQuestionType = "stars-1-5" | "scale-1-5" | "multiple-choice" | "free-text";

export type QuizQuestion = {
  /** Translation key for the question text. */
  questionKey: string;
  /** How to render the input. */
  type: QuizQuestionType;
  /** Translation keys for choices (only when type === "multiple-choice"). */
  optionKeys?: string[];
  /** Whether the answer is required. Defaults to true except for free-text. */
  optional?: boolean;
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
  /**
   * Optional slides embed URL — any provider whose embed URL allows iframing
   * (Google Slides, Canva, etc.). Must be a true `src` from an embed snippet,
   * NOT a share/edit URL or `canva.link/...` shortlink.
   */
  slidesEmbedUrl?: string;
  /** Approximate duration label, e.g. "12:30". Free-form. */
  duration?: string;
  /** Quiz shown after the video. The first course uses 3 questions per module. */
  quiz: QuizQuestion[];
};

export type Sponsor = {
  /** Stable id used as React key. */
  id: string;
  /** Display name (used as alt text). */
  name: string;
  /** Logo path under /public or remote URL allow-listed in next.config.mjs. */
  logo: string;
  /** Optional sponsor website. */
  link?: string;
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
  /** Course-level final evaluation shown after the last module's quiz. */
  finalEvaluation?: QuizQuestion[];
  /** Optional sponsors row, rendered at the bottom of the landing page. */
  sponsors?: Sponsor[];
};

export const courses: Course[] = [
  {
    slug: "drone-360",
    titleKey: "drone360Title",
    titleEn: "Drone 360°: From Basics to Projects",
    emoji: "🚁",
    descriptionKey: "drone360Desc",
    aboutKey: "drone360About",
    image: "/courses/drone-360.jpg",
    color: "from-purple-600 to-fuchsia-600",
    level: "Beginner → Intermediate",
    totalDuration: "~2h",
    modules: [
      {
        id: "intro-to-drones",
        titleKey: "drone360Mod1Title",
        descriptionKey: "drone360Mod1Desc",
        youtubeId: "REPLACE_WITH_VIDEO_ID",
        slidesEmbedUrl: "",
        duration: "—",
        quiz: [
          { questionKey: "drone360Mod1Q1", type: "stars-1-5" },
          {
            questionKey: "drone360Mod1Q2",
            type: "multiple-choice",
            optionKeys: ["understoodYes", "understoodAlmost", "understoodNo"],
          },
          { questionKey: "drone360Mod1Q3", type: "free-text", optional: true },
        ],
      },
      {
        id: "first-flight",
        titleKey: "drone360Mod2Title",
        descriptionKey: "drone360Mod2Desc",
        youtubeId: "REPLACE_WITH_VIDEO_ID",
        slidesEmbedUrl: "",
        duration: "—",
        quiz: [
          { questionKey: "drone360Mod2Q1", type: "stars-1-5" },
          {
            questionKey: "drone360Mod2Q2",
            type: "multiple-choice",
            optionKeys: ["understoodYes", "understoodAlmost", "understoodNo"],
          },
          { questionKey: "drone360Mod2Q3", type: "free-text", optional: true },
        ],
      },
    ],
    finalEvaluation: [
      { questionKey: "finalEvalQ1Overall", type: "stars-1-5" },
      {
        questionKey: "finalEvalQ2Benefit",
        type: "multiple-choice",
        optionKeys: ["benefitYesVery", "benefitYes", "benefitAverage", "benefitNo"],
      },
      {
        questionKey: "finalEvalQ3Recommend",
        type: "multiple-choice",
        optionKeys: ["recommendYes", "recommendMaybe", "recommendNo"],
      },
      { questionKey: "finalEvalQ4Comments", type: "free-text", optional: true },
    ],
    sponsors: [
      { id: "sponsor-1", name: "Sponsor 1", logo: "/courses/drone-360/sponsors/sponsor1.png" },
      { id: "sponsor-2", name: "Sponsor 2", logo: "/courses/drone-360/sponsors/sponsor2.png" },
      { id: "sponsor-3", name: "Sponsor 3", logo: "/courses/drone-360/sponsors/sponsor3.png" },
      { id: "sponsor-4", name: "Sponsor 4", logo: "/courses/drone-360/sponsors/sponsor4.png" },
    ],
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getAllCourseSlugs(): string[] {
  return courses.map((c) => c.slug);
}
