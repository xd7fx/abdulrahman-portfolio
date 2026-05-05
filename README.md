# Abdulrahman Alnashri — Portfolio

A space-themed bilingual (EN / AR) portfolio for an AI & Robotics Engineer, built with Next.js 14, TypeScript, TailwindCSS, and Framer Motion.

Live: <https://abdulrahman-portfolio.vercel.app>

## Features

- **Bilingual (EN / AR)** with persisted preference, automatic RTL switching, and browser-language detection.
- **Sectioned single-page** layout: Hero, About, Projects, Achievements, Certificates, Work With Me, Contact.
- **Active section highlighting** in the navigation via `IntersectionObserver`.
- **Scroll-progress indicator** under the navbar.
- **Animated planetary navigator** synced with scroll position.
- **Reduced-motion aware** — heavy animations are disabled when the OS requests it.
- **Accessible**: skip-to-content link, ARIA labels, focus-visible rings, dialog semantics on the mobile drawer, ESC-to-close.
- **SEO**: dynamic `metadata`, OpenGraph + Twitter cards, JSON-LD `Person` schema, `robots.ts`, `sitemap.ts`, web manifest, SVG favicon.
- **Contact form** with optional Web3Forms integration (env-based) and a graceful `mailto:` fallback when no key is configured.
- **Performance**: Next/Image AVIF + WebP, lazy-loaded canvas particles paused on tab hide, prefers-reduced-motion bypass, font `display: swap`.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + custom globals
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Orbitron & Exo 2 (next/font)

## Getting Started

```bash
git clone https://github.com/xd7fx/abdulrahman-portfolio.git
cd abdulrahman-portfolio
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Scripts

| Command            | What it does                       |
| ------------------ | ---------------------------------- |
| `npm run dev`      | Start the dev server               |
| `npm run build`    | Production build                   |
| `npm start`        | Run the production server          |
| `npm run lint`     | ESLint (next/core-web-vitals)      |
| `npm run type-check` | `tsc --noEmit` to check types    |

## Environment Variables

Create a `.env.local` to wire up the contact form:

```
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key
```

If unset, the contact form falls back to opening the user's mail client via a prefilled `mailto:` link — there is no secret leakage and submissions never silently fail.

## Project Structure

```
app/
  layout.tsx        Root layout (metadata, fonts, JSON-LD, GA, skip link)
  page.tsx          Main one-page composition
  not-found.tsx     404 page
  robots.ts         Robots manifest
  sitemap.ts        Sitemap generator
  globals.css       Theme, components, reduced-motion handling
components/
  Navigation.tsx           Top nav, scroll progress, active-section underline
  MobileSidebar.tsx        Slide-in mobile menu (RTL-aware)
  Hero.tsx                 Hero with rotating role
  About.tsx                Bio, skills, education, experience
  Projects.tsx             Featured projects
  Achievements.tsx         Timeline of awards
  Certificates.tsx         Cert grid + summary stats
  WorkWithMe.tsx           Service offerings
  Contact.tsx              Form + contact info
  ParticleBackground.tsx   Canvas particle field (reduced-motion aware)
  PlanetaryNavigation.tsx  Planet-themed nav cluster
  FloatingRobots.tsx       Background floaters
  SectionPlanet.tsx        Section-scoped decorative planet
  SectionHeader.tsx        Section titles + decorative underline
  LanguageToggle.tsx       EN ↔ AR
contexts/
  LanguageContext.tsx      i18n + persistence + RTL
public/
  favicon.svg, manifest.webmanifest, og-image.png, cv.pdf,
  planets/, projects/, logos/
```

## Theme Tokens

| Token           | Value     | Use                |
| --------------- | --------- | ------------------ |
| `space-dark`    | `#0A0F2D` | Page background    |
| `space-navy`    | `#142157` | Surfaces           |
| `space-blue`    | `#2B3A8A` | Accents / borders  |
| `space-cyan`    | `#00BFFF` | Primary highlight  |
| `space-ice`     | `#9CC7E8` | Body text variants |
| `space-lava`    | `#FF4500` | Warm accent        |

## Deployment

Vercel is the path of least resistance — push to GitHub and import. The image config and `Permissions-Policy` headers in `next.config.mjs` work out of the box.

## License

MIT.

## Author

**Abdulrahman Alnashri** · AI & Robotics Engineer
[GitHub](https://github.com/XD7FX) · [LinkedIn](https://linkedin.com/in/abdulrahman-alnashri) · <abdulrahman.alnashri9@gmail.com>
