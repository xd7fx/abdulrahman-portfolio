---
name: add-skill-category
description: Add a new skill category to the About > Technical Arsenal grid — collects category name, icon, and tech-noun list, writes the entry to data/skills.ts, and adds bilingual translation keys to contexts/LanguageContext.tsx. Use when the user wants to expand the technical arsenal grid with a new domain (Cloud, DevOps, Security, etc.).
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, AskUserQuestion, PowerShell
---

You are adding a new skill category to the About > Technical Arsenal grid.

1. Entry in [data/skills.ts](../../../data/skills.ts) — typed `SkillCategory`.
2. Translation keys in [contexts/LanguageContext.tsx](../../../contexts/LanguageContext.tsx) — must exist in BOTH `en` and `ar`.
3. Icon registry in [components/About.tsx](../../../components/About.tsx) must include the chosen icon.

## Step 1 — Collect input

Use `AskUserQuestion`:

**Batch A — Identity:**
- Category name in English (e.g. "Cloud & DevOps", "Security")
- Category name in Arabic (e.g. "السحابة و DevOps")
- Tech items as a comma-separated list of proper-nouns (e.g. `AWS, Docker, Kubernetes, Terraform`) — these are NOT translated, they render as-is in both languages.
- `iconName` — single-select. Existing registry: `Cpu | Wrench | Eye | Zap | Code | Database`. If none fits, the user must provide a new lucide-react icon name; you will then need to add it to the registry (Step 5b below).

## Step 2 — Generate translation key

Build a stable camelCase prefix `skillCat<Domain>`. Examples from existing data: `skillCatAi`, `skillCatRobotics`, `skillCatVision`, `skillCatMlops`, `skillCatDev`, `skillCatData`.

`Grep` for the prefix in `LanguageContext.tsx` to confirm no collision.

## Step 3 — Write the translation key

Edit [contexts/LanguageContext.tsx](../../../contexts/LanguageContext.tsx). Insert the new key in BOTH `en` and `ar` blocks immediately after the existing `skillCatData` line.

## Step 4 — Add the data entry

Edit [data/skills.ts](../../../data/skills.ts). Append a new object to the `skillCategories` array.

```ts
{
  categoryKey: "skillCat<Domain>",
  iconName: "Cpu", // or another from SkillIcon union
  items: ["AWS", "Docker", ...],
}
```

## Step 5 — (Only if a new icon was requested)

Two edits required:
- Add the icon name to the `SkillIcon` type union in [data/skills.ts](../../../data/skills.ts).
- Add the lucide import + map entry in `skillIconRegistry` in [components/About.tsx](../../../components/About.tsx).

Do NOT add icons preemptively — only when explicitly needed.

## Step 6 — Verify

Run `npm run lint`, `npm run type-check`, then `npm run build`. Stop on failure.

## Constraints

- Items in the `items` array are NEVER translated — they are tech proper-nouns.
- The existing 6 skill categories stay as-is.
- Do not invent items the user didn't provide.
