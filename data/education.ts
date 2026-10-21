/**
 * Education entries shown in the About > Education card.
 *
 * `gpaKey` is optional — for entries without a GPA (bootcamps, etc.) leave it
 * undefined and the component will skip rendering that line.
 */
export type Education = {
  /** Stable id used as React key. */
  id: string;
  /** Translation key for the degree / program name. */
  degreeKey: string;
  /** Translation key for the school / institution name. */
  schoolKey: string;
  /** Translation key for an optional GPA / score line. */
  gpaKey?: string;
  periodKey?: string;
};

export const education: Education[] = [
  { id: "le-wagon-sda-bootcamp", degreeKey: "dataBootcamp", schoolKey: "leWagonSDA" },
  { id: "kaust-ai-program", degreeKey: "kaustAiDegree", schoolKey: "kaustAiSchool", periodKey: "kaustAiPeriod" },
  { id: "bsc-ai-uoj", degreeKey: "bscAI", schoolKey: "universityOfJeddah", gpaKey: "gpa" },
];
