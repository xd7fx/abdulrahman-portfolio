---
name: add-certificate
description: Add a new certificate end-to-end — collects details via AskUserQuestion, writes the entry to data/certificates.ts, adds bilingual translation keys (title, issuer, description) to contexts/LanguageContext.tsx, and verifies the build. Use when the user mentions a new certification, course completion, or training credential they earned.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, AskUserQuestion, PowerShell
---

You are adding a new certificate to this portfolio. The pipeline is simpler than projects/achievements because certificates have no detail page — they render as cards in a grid only.

1. Entry in [data/certificates.ts](../../../data/certificates.ts) — typed, contains stable id + 3 translation keys.
2. Translation keys in [contexts/LanguageContext.tsx](../../../contexts/LanguageContext.tsx) — must exist in BOTH `en` and `ar`.
3. Card on the Certificates grid renders automatically.

## Step 1 — Collect input

Use `AskUserQuestion` to gather:

**Batch A — Identity:**
- Title in English (e.g. "Data Science Bootcamp Diploma")
- Title in Arabic
- Issuer in English (e.g. "Le Wagon", "TVTC", "Saudi Digital Academy")
- Issuer in Arabic (for proper-noun issuers like "TVTC", the Arabic value can mirror the English)
- Description in English (1 sentence, what was covered)
- Description in Arabic
- Year (e.g. `2024`, `2025`)
- Verification / credential URL (optional)
- Tailwind gradient `color` (e.g. `from-blue-500 to-cyan-500`) — pick one that hasn't been heavily used by other certs for visual variety

If the user provided answers up-front, skip the corresponding questions.

## Step 2 — Derive the id

Id rules: lowercase ASCII, hyphenated, derived from `<issuer-shortname>-<topic>`.

Examples from existing data:
- `tvtc-robotics`, `smart-methods-robotics`, `tvtc-data-science`
- `mcit-jr-data-scientist`, `lewagon-bootcamp`, `sda-q1-data-science`

`Grep` for `id:` in `data/certificates.ts` to confirm uniqueness. If collision, append a year or qualifier.

## Step 3 — Generate translation keys

Build a stable **camelCase prefix** from the id, then suffix `Cert` and the field name:

| Field | Pattern | Example |
|------|---------|---------|
| Title | `<prefix>CertTitle` | `tvtcRoboticsCertTitle` |
| Issuer | `<prefix>CertIssuer` | `tvtcRoboticsCertIssuer` |
| Description | `<prefix>CertDesc` | `tvtcRoboticsCertDesc` |

Id → prefix conversion: `tvtc-robotics` → `tvtcRobotics`, `mcit-jr-data-scientist` → `mcitJrDataScientist`.

`Grep` the prefix in `LanguageContext.tsx` to confirm no collision.

## Step 4 — Write the translation keys

Edit [contexts/LanguageContext.tsx](../../../contexts/LanguageContext.tsx). Insert the 3 new keys in BOTH the `en` and `ar` blocks under the existing `// Certificate entries` comment block (already present in the file). Maintain alphabetical or chronological order with the other entries — choose what's more readable.

## Step 5 — Add the data entry

Edit [data/certificates.ts](../../../data/certificates.ts). Append a new object to the `certificates` array using this shape:

```ts
{
  id: "<id>",
  titleKey: "<prefix>CertTitle",
  issuerKey: "<prefix>CertIssuer",
  descriptionKey: "<prefix>CertDesc",
  year: "<YYYY>",
  color: "from-<color>-<n> to-<color>-<n>",
  link: "<url>", // omit if absent
}
```

Insert chronologically: most recent year on top.

## Step 6 — Verify

Run, in order, and report each result:

1. `npm run lint`
2. `npm run type-check`
3. `npm run build`

If any step fails: do NOT auto-fix — show the error and stop.

If all pass: tell the user the new card will appear on the Certificates section after `npm run dev` reloads.

## Constraints

- All localized text goes through translation keys. Never hard-code Arabic or English copy in `data/certificates.ts`.
- For proper-noun issuers (TVTC, INE, Le Wagon, MIT, etc.), the Arabic value is allowed to mirror the English.
- Do not modify other certificate entries.
- Do not invent any field the user didn't provide. If a field is empty, ask — don't fabricate.
- The legacy `cert1`/`certDesc1` translation keys in `LanguageContext.tsx` are dead code — do not write to them or use them.
