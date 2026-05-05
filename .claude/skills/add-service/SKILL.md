---
name: add-service
description: Add a new service offering to the WorkWithMe section — collects title, description, icon, and gradient, writes the entry to data/services.ts, and adds bilingual translation keys to contexts/LanguageContext.tsx. Use when the user wants to expose a new freelance/consulting service on the portfolio.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, AskUserQuestion, PowerShell
---

You are adding a new service to the WorkWithMe section.

1. Entry in [data/services.ts](../../../data/services.ts) — typed `Service`.
2. Translation keys in [contexts/LanguageContext.tsx](../../../contexts/LanguageContext.tsx) — must exist in BOTH `en` and `ar`.
3. Icon registry in [components/WorkWithMe.tsx](../../../components/WorkWithMe.tsx) must include the chosen icon.

## Step 1 — Collect input

Use `AskUserQuestion`:

- Service title in English (e.g. "MLOps Consulting")
- Service title in Arabic
- Short description in English (1–2 sentences, what the service offers)
- Short description in Arabic
- `iconName` — single-select from the registry: `Brain | Cpu | Code | Rocket`. If a new icon is needed, the user must provide a lucide-react icon name (then update the registry as in Step 5b).
- Tailwind gradient `color` (e.g. `from-blue-500 to-cyan-500`)

## Step 2 — Derive the id

Id rules: lowercase ASCII, hyphenated.

Examples from existing data:
- `ai-development`, `robotics-engineering`, `ml-solutions`, `consulting-mentoring`

`Grep` for `id:` in `data/services.ts` to confirm uniqueness.

## Step 3 — Generate translation keys

Build a stable camelCase prefix from the id. Suffixes:
- `<prefix>` for the title (matching existing pattern: `aiDevelopment`, `mlSolutions`)
- `<prefix>Desc` for the description (matching `aiDevelopmentDesc`, `mlSolutionsDesc`)

Example: `mlops-consulting` → `mlopsConsulting`, `mlopsConsultingDesc`.

`Grep` the prefix in `LanguageContext.tsx` to confirm no collision.

## Step 4 — Write the translation keys

Edit [contexts/LanguageContext.tsx](../../../contexts/LanguageContext.tsx). Insert the 2 new keys in BOTH `en` and `ar` blocks under the existing `// Work With Me` comment.

## Step 5 — Add the data entry

Edit [data/services.ts](../../../data/services.ts). Append a new object to the `services` array.

```ts
{
  id: "<id>",
  titleKey: "<prefix>",
  descriptionKey: "<prefix>Desc",
  iconName: "Brain", // or another from ServiceIcon union
  color: "from-<color>-<n> to-<color>-<n>",
}
```

## Step 5b — (Only if a new icon was requested)

- Add the icon name to the `ServiceIcon` type union in [data/services.ts](../../../data/services.ts).
- Add the lucide import + map entry in `serviceIconRegistry` in [components/WorkWithMe.tsx](../../../components/WorkWithMe.tsx).

## Step 6 — Verify

Run `npm run lint`, `npm run type-check`, then `npm run build`. Stop on failure.

## Constraints

- All localized text goes through translation keys.
- The existing 4 services stay as-is.
- Do not invent any field the user didn't provide.
