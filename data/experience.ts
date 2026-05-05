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
};

export const experiences: Experience[] = [
  {
    id: "drone-club-pr",
    titleKey: "exp1Title",
    companyKey: "exp1Company",
    periodKey: "exp1Period",
    locationKey: "exp1Location",
    descriptionKey: "exp1Desc",
  },
  {
    id: "smart-methods-intern",
    titleKey: "exp2Title",
    companyKey: "exp2Company",
    periodKey: "exp2Period",
    locationKey: "exp2Location",
    descriptionKey: "exp2Desc",
  },
];
