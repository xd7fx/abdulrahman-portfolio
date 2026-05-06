/**
 * AUTO-GENERATED — do not edit by hand.
 *
 * Regenerate from the xlsx source(s) in `archive/raw-data/` by running:
 *   npm run import:form-data
 *
 * The form's University combobox reads from this list and falls back to a
 * free-text input when the student picks "Other".
 */
export type UniversitySector = "government" | "private" | "unknown";

export type University = {
  /** Display name (Arabic if that's how the source is, else English). */
  name: string;
  /** Government vs private classification. "unknown" when the source omits the column. */
  sector: UniversitySector;
};

export const universities: University[] = [];
