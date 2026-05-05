---
name: add-education
description: Add a new education entry end-to-end — collects details via AskUserQuestion, writes the entry to data/education.ts, and adds bilingual translation keys (degree, school, optional GPA) to contexts/LanguageContext.tsx. Use when the user mentions a new degree, bootcamp, certification program, or formal training they completed.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, AskUserQuestion, PowerShell
---

You are adding a new education entry to the About > Education card.

1. Entry in [data/education.ts](../../../data/education.ts) — typed, contains stable id + 2 required + 1 optional translation keys.
2. Translation keys in [contexts/LanguageContext.tsx](../../../contexts/LanguageContext.tsx) — must exist in BOTH `en` and `ar` blocks.
3. Card renders automatically.

## Step 1 — Collect input

Use `AskUserQuestion` (skip fields the user provided up-front):

**Batch A — Identity:**
- Degree / program name in English (e.g. "MSc in Computer Vision")
- Degree / program name in Arabic
- School / institution in English (e.g. "King Abdulaziz University")
- School / institution in Arabic
- Optional GPA / score line in English (e.g. "GPA: 3.85/4.0") — leave blank for non-graded programs (bootcamps)
- Optional GPA / score line in Arabic

## Step 2 — Derive the id

Id rules: lowercase ASCII, hyphenated, derived from `<degree-keyword>-<school-shortname>`.

Examples from existing data:
- `bsc-ai-uoj` (BSc AI at University of Jeddah)
- `le-wagon-sda-bootcamp` (Le Wagon × SDA Data Science Bootcamp)

`Grep` for `id:` in `data/education.ts` to confirm uniqueness.

## Step 3 — Generate translation keys

Use a stable `<prefix>` derived from the id in camelCase. Suffix:
- `<prefix>Degree` for the degree/program name
- `<prefix>School` for the institution
- `<prefix>Gpa` (optional)

Example: `msc-cv-kau` → `mscCvKauDegree`, `mscCvKauSchool`, `mscCvKauGpa`.

**Note:** The two existing entries (`bsc-ai-uoj`, `le-wagon-sda-bootcamp`) reuse legacy translation keys (`bscAI`, `universityOfJeddah`, `gpa`, `dataBootcamp`, `leWagonSDA`). DO NOT migrate them — only follow the new naming convention for new entries.

`Grep` the prefix in `LanguageContext.tsx` to confirm no collision.

## Step 4 — Write the translation keys

Edit [contexts/LanguageContext.tsx](../../../contexts/LanguageContext.tsx). Insert the new keys in BOTH `en` and `ar` blocks under the existing `// Education` comment.

## Step 5 — Add the data entry

Edit [data/education.ts](../../../data/education.ts). Append a new object to the `education` array. Insert most-recent-first.

```ts
{
  id: "<id>",
  degreeKey: "<prefix>Degree",
  schoolKey: "<prefix>School",
  gpaKey: "<prefix>Gpa", // omit if no GPA
}
```

## Step 6 — Verify

Run `npm run lint`, `npm run type-check`, then `npm run build`. Stop and report on any failure — do NOT auto-fix.

## Constraints

- All localized text goes through translation keys.
- For schools that are pure proper-nouns (e.g. "MIT"), the Arabic value can mirror the English.
- Do not modify other entries.
- Do not invent any field the user didn't provide.
