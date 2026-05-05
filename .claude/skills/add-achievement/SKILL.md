---
name: add-achievement
description: Add a new portfolio achievement end-to-end — collects details via AskUserQuestion, writes the entry to data/achievements.ts, adds bilingual translation keys to contexts/LanguageContext.tsx, generates a slug, and verifies the build. Use when the user mentions a new award, recognition, hackathon win, or accomplishment they want to showcase.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, AskUserQuestion, PowerShell
---

You are adding a new achievement to this Next.js + bilingual portfolio. The pipeline:
1. Entry in [data/achievements.ts](../../../data/achievements.ts) — typed, contains slug + translation keys + rank + optional related project.
2. Translation keys in [contexts/LanguageContext.tsx](../../../contexts/LanguageContext.tsx) — must exist in BOTH `en` and `ar` blocks.
3. Card on the Achievements timeline renders automatically from the `achievements` array.
4. Detail page at `/achievements/<slug>` is generated automatically by [app/achievements/[slug]/page.tsx](../../../app/achievements/[slug]/page.tsx).

## Step 1 — Collect input

Use `AskUserQuestion` to gather what isn't already provided. Two batches:

**Batch A — Core (multi-question):**
- Title in English (e.g. "WRO Saudi Arabia 2025") — used for slug derivation
- Title in Arabic
- Subtitle in English (event/role/sub-context — e.g. "Technical Supervisor — Yamama Rescue Drone")
- Subtitle in Arabic
- Description in English (1–3 sentences for the card)
- Description in Arabic

**Batch B — Metadata:**
- Year (e.g. `2025`)
- Rank — single-select: `1st`, `2nd`, `3rd`, or `recognition` (anything that isn't a podium award)
- Emoji — one emoji that represents the achievement (🥇🥈🥉🏆🌟🚁🤖📱⭐ etc.)
- `iconName` — single-select from `Trophy | Award | Star | Target` (already in icon registry; do NOT introduce new icons unless user provides one — adding a new icon requires editing both `components/Achievements.tsx` and `app/achievements/[slug]/AchievementDetail.tsx`)
- Tailwind gradient `color` (e.g. `from-yellow-400 to-orange-500`)
- Optional `relatedProjectSlug` — if this achievement was earned through one of the existing projects, provide the project slug. **Grep `slug:` in [data/projects.ts](../../../data/projects.ts) to show valid choices first.**
- Optional `image` path under `/public/` or remote URL (allow-listed in next.config.mjs)
- Optional `link` (certificate URL, news article)
- Optional long description (en + ar) for the detail page narrative

If the user provided answers up-front in their initial message, skip the corresponding questions.

## Step 2 — Derive the slug

Slug rules: lowercase ASCII, hyphenated, derived from a stable identifier (event + year usually works best).

Examples from existing data:
- `WRO Saudi Arabia 2025` → `wro-2025`
- `Best Engineer Award 2024 (Smart Methods)` → `best-engineer-2024`
- `AgentX Hackathon 2025 — 3rd Place` → `agentx-2025`
- `Drones Hackathon 2024 (Hajj & Umrah Track)` → `drones-hackathon-2024`

`Grep` for `slug:` in `data/achievements.ts` to confirm uniqueness. If collision, append a disambiguator or ask.

## Step 3 — Generate translation keys

Build a stable **camelCase prefix** from the slug. Then derive these keys:

| Field | Key pattern | Example |
|------|------------|---------|
| Title | `<prefix>Title` | `wro2025Title` |
| Subtitle | `<prefix>Subtitle` | `wro2025Subtitle` |
| Description | `<prefix>Desc` | `wro2025Desc` |
| Long description (optional) | `<prefix>LongDesc` | `wro2025LongDesc` |

Slug → prefix conversion: `wro-2025` → `wro2025`, `best-engineer-2024` → `bestEngineer2024`, `social-media-award-2024` → `socialMediaAward2024`.

`Grep` the prefix in `LanguageContext.tsx` to confirm no collision.

**Note:** The existing 8 achievements still use the legacy `ach1Title`/`ach2Title`/... keys. Do not migrate them — only follow the new convention for genuinely new entries.

## Step 4 — Write the translation keys

Edit [contexts/LanguageContext.tsx](../../../contexts/LanguageContext.tsx). Insert each new key in BOTH the `en` and `ar` blocks under a comment matching the achievement (e.g. `// Achievement: <Title>`) before the existing `// Certificates` section.

Use a unique anchor (the existing `// Certificates` comment) to insert before, so the file structure stays consistent.

## Step 5 — Add the data entry

Edit [data/achievements.ts](../../../data/achievements.ts). Append a new object to the `achievements` array using this shape:

```ts
{
  slug: "<slug>",
  titleKey: "<prefix>Title",
  subtitleKey: "<prefix>Subtitle",
  descriptionKey: "<prefix>Desc",
  longDescriptionKey: "<prefix>LongDesc", // omit if absent
  year: "<YYYY>",
  emoji: "<emoji>",
  iconName: "Trophy", // or Award/Star/Target
  color: "from-<color>-<n> to-<color>-<n>",
  rank: "1st", // or 2nd/3rd/recognition
  relatedProjectSlug: "<project-slug>", // omit if absent
  image: "<path>", // omit if absent
  link: "<url>", // omit if absent
}
```

Insert chronologically — most recent year at the top. Within the same year, place at the top of that year's group.

## Step 6 — Verify

Run, in order, and report each result on its own line:

1. `npm run lint`
2. `npm run type-check`
3. `npm run build`

Confirm the build output shows the new `/achievements/<slug>` route. If anything fails, do NOT auto-fix — show the error and stop.

If all pass: tell the user the new URL (`/achievements/<slug>`) and recommend `npm run dev` for browser inspection.

## Constraints

- All localized text goes through translation keys. Never hard-code Arabic or English copy in `data/achievements.ts`.
- `iconName` must match a key in the `iconRegistry` in [components/Achievements.tsx](../../../components/Achievements.tsx) and [app/achievements/[slug]/AchievementDetail.tsx](../../../app/achievements/[slug]/AchievementDetail.tsx). Adding a new icon means editing both registries — do that only if the user explicitly requests a new icon.
- Do not modify other achievements' entries.
- Do not invent any field the user didn't provide. If a field is empty, ask — don't fabricate.
- `relatedProjectSlug`, if given, must be a valid slug present in `data/projects.ts`. Verify with Grep before saving.
