---
name: add-project
description: Add a new portfolio project end-to-end — collects metadata via AskUserQuestion, writes the entry to data/projects.ts, adds bilingual translation keys to contexts/LanguageContext.tsx, generates a slug, and verifies the build. Use when the user says they want to add a project, showcase a new project, or wire up a new entry.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, AskUserQuestion, PowerShell
---

You are adding a new project to this Next.js + bilingual portfolio. The project pipeline is:
1. Entry in [data/projects.ts](../../../data/projects.ts) — typed, contains translation keys + URL slug.
2. Translation keys in [contexts/LanguageContext.tsx](../../../contexts/LanguageContext.tsx) — must exist in BOTH `en` and `ar` blocks or `t(key)` will return the key string verbatim.
3. Card on the home page renders automatically from `projects` array.
4. Detail page at `/projects/<slug>` is generated automatically by [app/projects/[slug]/page.tsx](../../../app/projects/[slug]/page.tsx).

## Step 1 — Collect input

Use the `AskUserQuestion` tool to gather what you cannot infer. Ask in **two batches**:

**Batch A — Identity (ask all together, multi-question):**
- Project name in English (used for `titleEn` and slug derivation)
- Project name in Arabic
- Short description in English (1–3 sentences for the card)
- Short description in Arabic

**Batch B — Details (ask all together):**
- Year (e.g. `2025`) — optional
- Role (e.g. `Team Leader`, `Technical Supervisor`) — optional
- Tech stack as comma-separated list (English / proper nouns only — these are NOT translated)
- 4 key achievements/highlights as a single string with `|` between them, in BOTH English and Arabic. Example: `🥇 1st Place | 🤖 Multi-agent | 🌍 Scalable | 📈 +50% impact`
- GitHub URL — optional
- Demo URL — optional
- Video URL — optional
- Image path under `/public/projects/` (e.g. `/projects/myproject.jpg`) — confirm it exists; if not, fall back to a placeholder

If the user provides answers up-front in their initial message, skip the corresponding questions.

## Step 2 — Derive the slug

Slug rules: lowercase ASCII, hyphenated, derived from the English name. Strip `:`, `—`, parentheses; replace spaces with `-`; collapse repeated hyphens.

Examples:
- `SABAQ: Proactive AI Customer Service Agent` → `sabaq`
- `V-TAC — Tactical AI Coach` → `v-tac`
- `Self-Driving Car Using CV, ROS, and Jetson Nano` → `self-driving-car`

After deriving, **grep the `slug:` field in `data/projects.ts` to ensure it does not already exist**. If it does, append a numeric suffix (`-2`) or ask the user for an alternative.

## Step 3 — Generate translation keys

Build a stable **camelCase prefix** from the slug. Then derive five keys:

| Field | Key pattern | Example |
|------|------------|---------|
| Title | `<prefix>Title` | `myProjectTitle` |
| Description | `<prefix>Desc` | `myProjectDesc` |
| Achievement 1–4 | `<prefix>Ach1` … `<prefix>Ach4` | `myProjectAch1` |

Slug → prefix conversion: `self-driving-car` → `selfDrivingCar`, `v-tac` → `vTac`.

Before writing, `Grep` for the prefix in `LanguageContext.tsx` to confirm there's no collision. If there is, ask the user for an explicit prefix.

## Step 4 — Write the translation keys

Edit [contexts/LanguageContext.tsx](../../../contexts/LanguageContext.tsx). Insert all six keys:

- In the **`en`** block, place them under a comment matching the project (e.g. `// Project N - <Name>`) before the `// Achievements` section so the file's structure stays consistent.
- In the **`ar`** block, place them at the equivalent location.

Do not duplicate existing keys. Use a single `Edit` call per block (find a unique anchor like `// Achievements` and prepend the new section).

## Step 5 — Add the data entry

Edit [data/projects.ts](../../../data/projects.ts). Append a new object inside the `projects` array. The shape:

```ts
{
  slug: "<slug>",
  titleKey: "<prefix>Title",
  titleEn: "<English Name>",
  emoji: "<single emoji>",
  descriptionKey: "<prefix>Desc",
  image: "<path or remote URL>",
  tech: ["..."],
  achievementKeys: ["<prefix>Ach1", "<prefix>Ach2", "<prefix>Ach3", "<prefix>Ach4"],
  github: "...",   // omit if absent
  demo: "...",     // omit if absent
  video: "...",    // omit if absent
  color: "from-<color>-500 to-<color>-700",
  year: "...",     // omit if absent
  role: "...",     // omit if absent
}
```

**Choosing a `color` gradient:** pick a Tailwind gradient that suits the project's domain. Re-use existing patterns where sensible:
- AI/agents: `from-indigo-500 to-purple-600`
- Robotics/aerial: `from-space-cyan to-space-blue`
- Vision/CV: `from-purple-600 to-space-blue`
- Energy/lava: `from-space-lava to-orange-600`
- IoT/cloud: `from-sky-400 to-blue-600`
- Sustainability/green: `from-green-400 to-emerald-600`

If the user has a strong preference, override.

## Step 6 — Verify

Run, in order, and report each result on its own line:

1. `npm run lint`
2. `npm run type-check`
3. `npm run build`

If any step fails: do NOT auto-fix — show the error and the file/line, and stop. The user will direct.

If all pass: tell the user the new URL (`/projects/<slug>`) and recommend they run `npm run dev` to inspect it in the browser.

## Constraints

- Never hard-code Arabic or English copy inside `data/projects.ts` or component files. All localized strings go through translation keys.
- Tech array values are NOT translated — they are proper nouns (frameworks, libraries).
- Do not modify other projects' entries.
- Do not invent achievements or descriptions the user didn't provide. If a field is empty, ask — don't fabricate.
- If the user has already started a similar entry in a previous turn, prefer continuing that work rather than starting fresh.
