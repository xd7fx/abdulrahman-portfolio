/**
 * Roles cycled in the Hero section's rotating subtitle.
 *
 * Each entry references an existing translation key in
 * `contexts/LanguageContext.tsx` — no new copy is added by this module.
 * Reuses keys from elsewhere on the site (heroTitle, aiDevelopment, etc.)
 * rather than duplicating strings.
 *
 * To add or reorder roles, edit the array. The Hero component cycles them
 * with a fixed interval (2.8s) and respects `prefers-reduced-motion`.
 */
export type HeroRole = {
  /** Translation key resolved via useLanguage().t(...). */
  key: string;
};

export const heroRoles: HeroRole[] = [
  { key: "heroTitle" },
  { key: "aiDevelopment" },
  { key: "roboticsEngineering" },
  { key: "mlSolutions" },
];
