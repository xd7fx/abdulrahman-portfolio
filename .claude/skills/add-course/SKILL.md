---
name: add-course
description: Add a new course (with at least one initial module) to the portfolio's mini-LMS — collects course-level details via AskUserQuestion, writes the entry to data/courses.ts, adds bilingual translation keys for the course + first module + first quiz to contexts/LanguageContext.tsx, and verifies the build. Use when the user wants to publish a new course (not just add a module to an existing one — for that, use /add-course-module).
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, AskUserQuestion, PowerShell
---

You are adding a NEW course to the portfolio's mini-LMS. Pipeline:

1. Entry in [data/courses.ts](../../../data/courses.ts) — typed `Course` with at least one initial `CourseModule`.
2. Translation keys in [contexts/LanguageContext.tsx](../../../contexts/LanguageContext.tsx) — must exist in BOTH `en` and `ar` blocks.
3. Card on the home Courses section + landing page at `/courses/<slug>` + auth-gated player at `/courses/<slug>/learn` are wired automatically off the data.

If the user wants to add a MODULE to an EXISTING course, stop and run `/add-course-module` instead.

## Step 1 — Collect input

Use `AskUserQuestion` (skip fields the user provided up-front).

**Batch A — Course identity:**
- Course title in English (e.g. "Computer Vision 101") — used for slug derivation
- Course title in Arabic
- Short description in English (1–2 sentences for the card)
- Short description in Arabic
- Long "About this course" paragraph in English (optional, used on the landing page)
- Long "About this course" paragraph in Arabic
- Single emoji that represents the course (🚁 🤖 🧠 📡 🎯 ...)

**Batch B — Course metadata:**
- Level label (free-form, e.g. "Beginner", "Intermediate → Advanced")
- Total duration label (free-form, e.g. "~3h")
- Tailwind gradient `color` (e.g. `from-space-cyan to-space-blue`)
- Card image path under `/public/courses/<slug>.jpg` (or any /public path), or remote URL allow-listed in next.config.mjs

**Batch C — First module (required, at least one):**
- Module title in English (e.g. "Module 1 — Image Fundamentals")
- Module title in Arabic
- Module description in English (1 sentence)
- Module description in Arabic
- YouTube video ID (the `v=` parameter of an UNLISTED YouTube video) — confirm it's `unlisted`, NOT private (private won't embed)
- Google Slides embed URL — File → Share → Publish to web → Embed → copy the `src` of the resulting iframe (NOT the share URL). Optional.
- Approximate duration (e.g. "12:30")
- 3 quiz questions in English + Arabic. Each is a 1–5 scale prompt asking how clear/useful/applicable the module was. The user can write their own — do not invent questions if they don't supply them.

If the user wants more than one module up-front, repeat Batch C per module — but encourage starting with 1 and using `/add-course-module` for the rest.

## Step 2 — Derive the slug

Slug rules: lowercase ASCII, hyphenated, derived from the English course title. Strip `:`, `—`, `(...)`. Drop filler words like "course".

Examples:
- `Drone 360°: From Basics to Projects` → `drone-360`
- `Computer Vision 101` → `computer-vision-101`
- `ROS for Beginners` → `ros-for-beginners`

`Grep` for `slug:` in `data/courses.ts` to confirm uniqueness.

## Step 3 — Generate translation keys

Build a stable **camelCase prefix** from the slug (e.g. `drone-360` → `drone360`, `computer-vision-101` → `computerVision101`).

Course-level keys:
| Field | Key | Example |
|------|-----|---------|
| Title | `<prefix>Title` | `drone360Title` |
| Short desc | `<prefix>Desc` | `drone360Desc` |
| Long about | `<prefix>About` | `drone360About` |

First-module keys (use `Mod1` suffix for module 1):
| Field | Key |
|------|-----|
| Module title | `<prefix>Mod1Title` |
| Module desc | `<prefix>Mod1Desc` |
| Quiz Q1 | `<prefix>Mod1Q1` |
| Quiz Q2 | `<prefix>Mod1Q2` |
| Quiz Q3 | `<prefix>Mod1Q3` |

`Grep` the prefix in `LanguageContext.tsx` to confirm no collision.

## Step 4 — Write translation keys

Edit [contexts/LanguageContext.tsx](../../../contexts/LanguageContext.tsx). Insert all keys in BOTH `en` and `ar` blocks under a comment matching the course (e.g. `// Course: <Title>`) before the `// Course registration` block.

## Step 5 — Add the data entry

Edit [data/courses.ts](../../../data/courses.ts). Append a new object to the `courses` array:

```ts
{
  slug: "<slug>",
  titleKey: "<prefix>Title",
  titleEn: "<English Title>",
  emoji: "<emoji>",
  descriptionKey: "<prefix>Desc",
  aboutKey: "<prefix>About",   // omit if no long description
  image: "<path>",
  color: "from-<color>-<n> to-<color>-<n>",
  level: "<level label>",       // omit if absent
  totalDuration: "<duration>",  // omit if absent
  modules: [
    {
      id: "<module-id>",         // lowercase hyphenated, unique within the course
      titleKey: "<prefix>Mod1Title",
      descriptionKey: "<prefix>Mod1Desc",
      youtubeId: "<11-char YouTube ID>",
      googleSlidesEmbedUrl: "<url>",  // omit if absent
      duration: "<m:ss>",             // omit if absent
      quiz: [
        { questionKey: "<prefix>Mod1Q1", type: "scale-1-5" },
        { questionKey: "<prefix>Mod1Q2", type: "scale-1-5" },
        { questionKey: "<prefix>Mod1Q3", type: "scale-1-5" },
      ],
    },
  ],
}
```

## Step 6 — Verify

Run, in order:

1. `npm run lint`
2. `npm run type-check`
3. `npm run build`

Confirm the build output shows the new `/courses/<slug>` and `/courses/<slug>/learn` routes. Stop on any failure — do NOT auto-fix.

If all pass: tell the user the new URL (`/courses/<slug>`) and recommend `npm run dev` for browser inspection.

## Constraints

- All localized text goes through translation keys. Never hard-code Arabic or English copy in `data/courses.ts`.
- YouTube video IDs are 11-character strings (e.g. `dQw4w9WgXcQ`). Reject obvious mistakes.
- Google Slides embed URL must be the `src` from the "Publish to web → Embed" iframe — NOT the share link, NOT the editor URL. The format is `https://docs.google.com/presentation/d/e/.../embed?...`.
- The video must be set to "Unlisted" on YouTube. "Private" videos do not embed.
- Do not modify other courses' entries.
- Do not invent quiz questions, descriptions, or YouTube IDs the user didn't supply.
