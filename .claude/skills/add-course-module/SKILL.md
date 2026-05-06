---
name: add-course-module
description: Append a new module to an EXISTING course in data/courses.ts — collects module title, description, YouTube ID, Google Slides URL, duration, and 3 quiz questions via AskUserQuestion, then adds bilingual translation keys to contexts/LanguageContext.tsx and updates the course's modules array. Use when the user records a new lesson video for a course they've already published.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, AskUserQuestion, PowerShell
---

You are appending a module to an existing course. The course already exists in [data/courses.ts](../../../data/courses.ts) — only the `modules` array gets a new entry.

If the course does NOT exist yet, stop and run `/add-course` instead.

## Step 1 — Identify target course

If the user didn't specify which course, `Grep` for `slug:` in `data/courses.ts` to list current courses and ask which one. Confirm the slug.

## Step 2 — Collect module input

Use `AskUserQuestion`:

- Module title in English (e.g. "Module 3 — Autonomous Flight Modes")
- Module title in Arabic
- Module description in English (1 sentence)
- Module description in Arabic
- YouTube video ID (11 chars, from an UNLISTED video — NOT private)
- Google Slides embed URL (optional). If provided, must be the `src` from "Publish to web → Embed", not the share/edit URL.
- Approximate duration (e.g. "14:20")
- 3 quiz questions in English + Arabic — 1–5 scale, asking how clear/useful/applicable the module was

The user MUST supply quiz questions. Do not invent them.

## Step 3 — Derive module id and key prefix

Module id: lowercase ASCII, hyphenated, unique within the course's `modules` array. Examples from existing data: `intro-to-drones`, `first-flight`.

Key prefix: read the existing course's `titleKey` from `data/courses.ts` and strip the trailing `Title` to get the course prefix (e.g. `drone360Title` → `drone360`).

Module index `<n>` is `existing.modules.length + 1`. New keys:
- `<prefix>Mod<n>Title`
- `<prefix>Mod<n>Desc`
- `<prefix>Mod<n>Q1`, `<prefix>Mod<n>Q2`, `<prefix>Mod<n>Q3`

`Grep` for `<prefix>Mod<n>` in `LanguageContext.tsx` to confirm `<n>` is unused.

## Step 4 — Write translation keys

Edit [contexts/LanguageContext.tsx](../../../contexts/LanguageContext.tsx). Insert the 5 new keys in BOTH `en` and `ar` blocks immediately after the previous module's keys (search for `<prefix>Mod<n-1>Q3` as the anchor).

## Step 5 — Append the module to the course's `modules` array

Edit [data/courses.ts](../../../data/courses.ts). Locate the target course by its `slug` and append a new module object to its `modules` array:

```ts
{
  id: "<module-id>",
  titleKey: "<prefix>Mod<n>Title",
  descriptionKey: "<prefix>Mod<n>Desc",
  youtubeId: "<11-char YouTube ID>",
  googleSlidesEmbedUrl: "<url>",  // omit if absent
  duration: "<m:ss>",             // omit if absent
  quiz: [
    { questionKey: "<prefix>Mod<n>Q1", type: "scale-1-5" },
    { questionKey: "<prefix>Mod<n>Q2", type: "scale-1-5" },
    { questionKey: "<prefix>Mod<n>Q3", type: "scale-1-5" },
  ],
},
```

Order matters: append at the end of the `modules` array. The mini-LMS unlocks modules sequentially based on this order.

## Step 6 — Verify

Run `npm run lint`, `npm run type-check`, `npm run build`. Stop on any failure. Confirm the build output is unchanged in route count (modules don't add new routes — they're nested in `/courses/<slug>/learn`).

If all pass: tell the user the module is live and existing students will see it after their next visit (their localStorage progress persists; the new module shows as locked until they complete the previous one).

## Constraints

- 11-char YouTube IDs only; reject anything else.
- Google Slides URL must be the embed `src`, not share/edit URLs.
- Module must be set to Unlisted on YouTube.
- Do not modify other modules of the same course.
- Do not invent quiz questions.
- Existing students' localStorage progress is preserved automatically — the new module is just appended.
