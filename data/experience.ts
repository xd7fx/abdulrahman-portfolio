/**
 * Work experience entries shown in the About > Experience card.
 *
 * All visible text is translation-keyed; entries are listed
 * most-recent-first.
 */
export type Experience = {
  /** Stable id used as React key. */
  id: string;
  /** Translation key for the role/title. */
  titleKey: string;
  /** Translation key for the company / organization. */
  companyKey: string;
  /** Translation key for the period (e.g. "Jul 2024 – Dec 2024"). */
  periodKey: string;
  /** Translation key for the location (e.g. "Jeddah · Hybrid"). */
  locationKey: string;
  /** Translation key for the short description. */
  descriptionKey: string;
  bulletKeys?: string[];
  tech?: string[];
  current?: boolean;
};

export const experiences: Experience[] = [
  { id: "zid-ai-engineer", titleKey: "zidEngineerTitle", companyKey: "zidEngineerCompany", periodKey: "zidEngineerPeriod", locationKey: "zidEngineerLocation", descriptionKey: "zidEngineerDesc", current: true, bulletKeys: ["zidEngineerBullet1", "zidEngineerBullet2"], tech: ["React", "TypeScript", "Supabase", "Generative AI"] },
  {
    id: "zid-ai-specialist",
    titleKey: "exp3Title",
    companyKey: "exp3Company",
    periodKey: "exp3Period",
    locationKey: "exp3Location",
    descriptionKey: "exp3Desc",
    bulletKeys: ["exp3Bullet1", "exp3Bullet2"],
    tech: ["Generative AI", "Zid APIs", "OAuth 2.0"],
  },
  {
    id: "yamamah-tech-supervisor",
    titleKey: "exp4Title",
    companyKey: "exp4Company",
    periodKey: "exp4Period",
    locationKey: "exp4Location",
    descriptionKey: "exp4Desc",
    bulletKeys: ["exp4Bullet1", "exp4Bullet2"],
    tech: ["Computer Vision", "Raspberry Pi", "n8n"],
  },
  {
    id: "drone-club-pr",
    titleKey: "exp1Title",
    companyKey: "exp1Company",
    periodKey: "exp1Period",
    locationKey: "exp1Location",
    descriptionKey: "exp1Desc",
    bulletKeys: ["exp1Bullet1", "exp1Bullet2"],
  },
  {
    id: "smart-methods-intern",
    titleKey: "exp2Title",
    companyKey: "exp2Company",
    periodKey: "exp2Period",
    locationKey: "exp2Location",
    descriptionKey: "exp2Desc",
    bulletKeys: ["exp2Bullet1", "exp2Bullet2"],
    tech: ["ROS", "Arduino", "Python"],
  },
];
