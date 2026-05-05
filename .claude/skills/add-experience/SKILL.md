---
name: add-experience
description: Add a new work experience entry end-to-end — collects details via AskUserQuestion, writes the entry to data/experience.ts, and adds bilingual translation keys (title/role, company, period, location, description) to contexts/LanguageContext.tsx. Use when the user mentions a new internship, job, or role they want to showcase in the About > Experience card.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, AskUserQuestion, PowerShell
---

You are adding a new work experience entry to the About > Experience card.

1. Entry in [data/experience.ts](../../../data/experience.ts) — typed, contains stable id + 5 translation keys.
2. Translation keys in [contexts/LanguageContext.tsx](../../../contexts/LanguageContext.tsx) — must exist in BOTH `en` and `ar` blocks.
3. Card renders automatically.

## Step 1 — Collect input

Use `AskUserQuestion` to gather (skip any field the user already provided up-front):

**Batch A — Identity:**
- Role / title in English (e.g. "ML Engineering Intern")
- Role / title in Arabic
- Company name (typically same in both languages, but confirm)
- Period in English (e.g. "Jun 2024 – Aug 2024 (3 months)")
- Period in Arabic (e.g. "يونيو 2024 – أغسطس 2024 (3 أشهر)")
- Location + work mode in English (e.g. "Jeddah, Saudi Arabia · Hybrid")
- Location + work mode in Arabic (e.g. "جدة، السعودية · مختلط")
- Short description in English (1 sentence about responsibilities)
- Short description in Arabic

## Step 2 — Derive the id

Id rules: lowercase ASCII, hyphenated, derived from `<company-shortname>-<role-keyword>`.

Examples from existing data:
- `drone-club-pr` (Public Relations at Drone Club)
- `smart-methods-intern` (Robotics intern at Smart Methods)

`Grep` for `id:` in `data/experience.ts` to confirm uniqueness.

## Step 3 — Generate translation keys

Use the next sequential `exp<n>*` prefix following the existing pattern (currently `exp1*` and `exp2*` are taken). For a new third entry, use `exp3Title`, `exp3Company`, `exp3Period`, `exp3Location`, `exp3Desc`.

`Grep` for `exp<n>Title` in `LanguageContext.tsx` to confirm `<n>` is unused.

## Step 4 — Write the translation keys

Edit [contexts/LanguageContext.tsx](../../../contexts/LanguageContext.tsx). Insert the 5 new keys in BOTH `en` and `ar` blocks under the existing `// Experience` comment.

## Step 5 — Add the data entry

Edit [data/experience.ts](../../../data/experience.ts). Append a new object to the `experiences` array. Insert most-recent-first — newest experience at the top.

```ts
{
  id: "<id>",
  titleKey: "exp<n>Title",
  companyKey: "exp<n>Company",
  periodKey: "exp<n>Period",
  locationKey: "exp<n>Location",
  descriptionKey: "exp<n>Desc",
}
```

## Step 6 — Verify

Run `npm run lint`, `npm run type-check`, then `npm run build`. Stop and report on any failure — do NOT auto-fix.

## Constraints

- All localized text goes through translation keys.
- Period strings should use the same format as existing entries (month range + duration).
- Do not modify other entries.
- Do not invent any field the user didn't provide.
