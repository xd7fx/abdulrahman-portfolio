/**
 * Single source of truth for portfolio achievements.
 *
 * Translation keys (`titleKey`, `subtitleKey`, `descriptionKey`, optional
 * `longDescriptionKey`) resolve through `useLanguage().t(...)` against the
 * `translations` object in `contexts/LanguageContext.tsx`. Every key referenced
 * here MUST exist in both `en` and `ar` sections.
 *
 * `iconName` is one of the lucide-react icon identifiers we ship in
 * `components/Achievements.tsx` and `app/achievements/[slug]/AchievementDetail.tsx`.
 * Add new icons to BOTH icon registries when you reference a new one.
 *
 * To add a new achievement, prefer the `/add-achievement` Claude skill.
 */
export type AchievementIcon = "Trophy" | "Award" | "Star" | "Target";

export type AchievementRank = "1st" | "2nd" | "3rd" | "recognition";

export type Achievement = {
  /** URL slug used by /achievements/[slug]. Lowercase, hyphenated, ASCII only. */
  slug: string;
  /** Translation key for localized title. */
  titleKey: string;
  /** Translation key for localized subtitle (event/role/sub-context). */
  subtitleKey: string;
  /** Translation key for the short description shown on the timeline card. */
  descriptionKey: string;
  /** Optional translation key for an extended write-up shown on the detail page. */
  longDescriptionKey?: string;
  /** Free-form year label shown as a badge. */
  year: string;
  /** Decorative emoji shown next to the title. */
  emoji: string;
  /** lucide-react icon identifier — see `AchievementIcon` for allowed values. */
  iconName: AchievementIcon;
  /** Tailwind gradient suffix for accents (e.g. "from-yellow-400 to-orange-500"). */
  color: string;
  /** Ranking for stat counts and badges. */
  rank: AchievementRank;
  /** Optional cross-link to a project slug — surfaces a "Related Project" card on detail page. */
  relatedProjectSlug?: string;
  /** Optional hero image path (under /public) or remote URL allow-listed in next.config.mjs. */
  image?: string;
  /** Optional external link (certificate URL, news article, etc.). */
  link?: string;
};

export const achievements: Achievement[] = [
  {
    slug: "agentx-2025",
    titleKey: "ach8Title",
    subtitleKey: "ach8Subtitle",
    descriptionKey: "ach8Desc",
    year: "2025",
    emoji: "🥉",
    iconName: "Trophy",
    color: "from-indigo-400 to-purple-500",
    rank: "3rd",
    relatedProjectSlug: "sabaq",
  },
  {
    slug: "wro-2025",
    titleKey: "ach2Title",
    subtitleKey: "ach2Subtitle",
    descriptionKey: "ach2Desc",
    year: "2025",
    emoji: "🥇",
    iconName: "Award",
    color: "from-blue-400 to-cyan-500",
    rank: "1st",
    relatedProjectSlug: "yamamah",
  },
  {
    slug: "sda-week5-2025",
    titleKey: "ach4Title",
    subtitleKey: "ach4Subtitle",
    descriptionKey: "ach4Desc",
    year: "2025",
    emoji: "🏆",
    iconName: "Award",
    color: "from-purple-500 to-violet-600",
    rank: "recognition",
  },
  {
    slug: "drones-hackathon-2024",
    titleKey: "ach1Title",
    subtitleKey: "ach1Subtitle",
    descriptionKey: "ach1Desc",
    year: "2024",
    emoji: "🚁",
    iconName: "Trophy",
    color: "from-yellow-400 to-orange-500",
    rank: "1st",
  },
  {
    slug: "robotics-workshop-2024",
    titleKey: "ach6Title",
    subtitleKey: "ach6Subtitle",
    descriptionKey: "ach6Desc",
    year: "2024",
    emoji: "🤖",
    iconName: "Star",
    color: "from-teal-400 to-cyan-600",
    rank: "recognition",
  },
  {
    slug: "smart-methods-hackathon-2024",
    titleKey: "ach7Title",
    subtitleKey: "ach7Subtitle",
    descriptionKey: "ach7Desc",
    year: "2024",
    emoji: "🥈",
    iconName: "Award",
    color: "from-orange-400 to-red-500",
    rank: "2nd",
  },
  {
    slug: "best-engineer-2024",
    titleKey: "ach3Title",
    subtitleKey: "ach3Subtitle",
    descriptionKey: "ach3Desc",
    year: "2024",
    emoji: "🌟",
    iconName: "Star",
    color: "from-green-500 to-emerald-600",
    rank: "1st",
  },
  {
    slug: "social-media-award-2024",
    titleKey: "ach5Title",
    subtitleKey: "ach5Subtitle",
    descriptionKey: "ach5Desc",
    year: "2024",
    emoji: "📱",
    iconName: "Target",
    color: "from-pink-400 to-rose-500",
    rank: "recognition",
  },
];

export function getAchievementBySlug(slug: string): Achievement | undefined {
  return achievements.find((a) => a.slug === slug);
}

export function getAllAchievementSlugs(): string[] {
  return achievements.map((a) => a.slug);
}
