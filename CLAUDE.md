# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Command              | Purpose                                |
| -------------------- | -------------------------------------- |
| `npm run dev`        | Next.js dev server on localhost:3000   |
| `npm run build`      | Production build                       |
| `npm start`          | Run the production build               |
| `npm run lint`       | ESLint (`next/core-web-vitals` config) |
| `npm run type-check` | `tsc --noEmit` strict type check       |

There is no test runner configured — `lint` + `type-check` are the only verification steps. Run both before declaring a change complete.

## Environment

- `NEXT_PUBLIC_WEB3FORMS_KEY` — optional. Set in `.env.local` to wire the contact form to Web3Forms. **If unset, the form intentionally falls back to opening the user's mail client via `mailto:`** (see [components/Contact.tsx](components/Contact.tsx)). Don't "fix" the missing key as a bug.

## Architecture

### Single-page composition + detail routes
[app/page.tsx](app/page.tsx) is a `"use client"` component that stacks every section (`Hero`, `About`, `Projects`, `Achievements`, `Certificates`, `WorkWithMe`, `Contact`) on top of two fixed background layers (`ParticleBackground`, `FloatingRobots`) and two navigation overlays (`Navigation`, `PlanetaryNavigation`). Adding new top-level sections means editing this file.

Two static detail-route trees exist:
- **Projects** at `/projects/[slug]` — see [app/projects/[slug]/page.tsx](app/projects/[slug]/page.tsx) + [app/projects/[slug]/ProjectDetail.tsx](app/projects/[slug]/ProjectDetail.tsx).
- **Achievements** at `/achievements/[slug]` — see [app/achievements/[slug]/page.tsx](app/achievements/[slug]/page.tsx) + [app/achievements/[slug]/AchievementDetail.tsx](app/achievements/[slug]/AchievementDetail.tsx). Cross-links to a related project via the `relatedProjectSlug` field.

Both follow the same shape: a server `page.tsx` that owns `generateStaticParams` + `generateMetadata`, paired with a `"use client"` renderer that uses `useLanguage`. They are statically generated at build time from slugs in the corresponding data files and auto-included in [app/sitemap.ts](app/sitemap.ts).

### Content data layer (`data/`)
Every content section reads from a typed module under [data/](data/) — never hard-code content into the JSX. Each module exports a typed array plus optional `getXBySlug` / `getAllXSlugs` helpers.

| File | Type | Component | Has detail page? | Add via skill |
|------|------|-----------|------------------|---------------|
| [data/projects.ts](data/projects.ts) | `Project[]` | [components/Projects.tsx](components/Projects.tsx) | ✅ `/projects/[slug]` | `/add-project` |
| [data/achievements.ts](data/achievements.ts) | `Achievement[]` | [components/Achievements.tsx](components/Achievements.tsx) | ✅ `/achievements/[slug]` | `/add-achievement` |
| [data/certificates.ts](data/certificates.ts) | `Certificate[]` | [components/Certificates.tsx](components/Certificates.tsx) | ❌ grid only | `/add-certificate` |
| [data/skills.ts](data/skills.ts) | `SkillCategory[]` | [components/About.tsx](components/About.tsx) | ❌ | manual edit (rare changes) |
| [data/experience.ts](data/experience.ts) | `Experience[]` | [components/About.tsx](components/About.tsx) | ❌ | `/add-experience` |
| [data/education.ts](data/education.ts) | `Education[]` | [components/About.tsx](components/About.tsx) | ❌ | manual edit (rare changes) |
| [data/services.ts](data/services.ts) | `Service[]` | [components/WorkWithMe.tsx](components/WorkWithMe.tsx) | ❌ | manual edit (rare changes) |

**Icon convention:** data modules store an `iconName` string; the consuming component owns a small `iconRegistry: Record<IconName, LucideIcon>`. Adding a new icon means editing the type union in the data file AND the registry in the component (and in any detail-page renderer that uses it). Don't import icons directly into data modules.

### Bilingual / RTL system
[contexts/LanguageContext.tsx](contexts/LanguageContext.tsx) is the single source of truth for i18n. Key things to know:

- All copy lives inline in the `translations` object as flat `{ en: {...}, ar: {...} }` keyed strings — there are no JSON locale files. New text **must be added to both `en` and `ar`** or `t(key)` will fall back to returning the key itself.
- `LanguageProvider` writes `dir` and `lang` directly onto `document.documentElement` and persists choice to `localStorage["portfolio:lang"]`. Browser language is auto-detected on first visit.
- Components consume language via `useLanguage()` and read `t`, `language`, and `dir`. RTL-conditional styling is done at the component level (e.g. [components/MobileSidebar.tsx](components/MobileSidebar.tsx) flips slide-in direction based on `language`).
- The provider lives in [app/layout.tsx](app/layout.tsx); `app/page.tsx` and section components are all client components because they call `useLanguage()`.

### Styling & theme
- Tailwind only — no CSS modules. Custom palette is defined under `theme.extend.colors.space.*` in [tailwind.config.ts](tailwind.config.ts) (`space-dark`, `space-navy`, `space-blue`, `space-cyan`, `space-ice`, `space-lava`, `space-lava-dark`). Use these tokens; do not introduce new ad-hoc colors.
- Custom keyframes/animations (`float`, `glow`, `orbit`, `fade-in-up`) are also declared in the Tailwind config.
- Fonts are loaded via `next/font/google` in [app/layout.tsx](app/layout.tsx) as CSS variables `--font-orbitron` / `--font-exo`, then exposed as Tailwind families `font-orbitron` and `font-exo`.
- Global theme rules and reduced-motion overrides live in [app/globals.css](app/globals.css).

### Animation & motion budget
Framer Motion is used pervasively, and the [components/ParticleBackground.tsx](components/ParticleBackground.tsx) canvas runs continuously. **Both must respect `prefers-reduced-motion`** — heavy animations are disabled when the OS requests it, and the particle canvas pauses on tab hide. Preserve this behavior in any new motion-heavy component.

### SEO & metadata
[app/layout.tsx](app/layout.tsx) owns `metadata`, `viewport`, OpenGraph/Twitter, JSON-LD `Person` schema (injected via `next/script`), Google Analytics (G-LFV0HR36W7), and security headers in [next.config.mjs](next.config.mjs). [app/robots.ts](app/robots.ts) and [app/sitemap.ts](app/sitemap.ts) are the route handlers that emit `/robots.txt` and `/sitemap.xml`. The canonical site URL `https://abdulrahman-portfolio.vercel.app` is hardcoded in `layout.tsx` — update it there if it ever moves.

### Path alias
`@/*` maps to the project root via [tsconfig.json](tsconfig.json). Use `@/components/...` and `@/contexts/...` rather than relative paths.

## Conventions

- Section components follow the pattern `SectionPlanet` + `SectionHeader` + content (see any of `About`, `Projects`, `Contact`). Reuse these wrappers rather than re-implementing section chrome.
- Almost every component is `"use client"` because of Framer Motion, hooks, and `useLanguage`. Server Components are rare here.
- Active-section underline in `Navigation` and the `PlanetaryNavigation` overlay both rely on `IntersectionObserver` against section `id`s — keep section `id`s stable when renaming.
