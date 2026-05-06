# Course assets

Drop course images and sponsor logos here. The portfolio reads them via
`next/image` so any `.jpg`, `.png`, `.webp`, `.avif`, or `.svg` works.

## Required for the Drone 360° course

| File | Path | Source |
|------|------|--------|
| Hero image | `public/courses/drone-360.jpg` | Purple drone "معسكر 360°" image |
| Sponsor 1 logo | `public/courses/drone-360/sponsors/sponsor1.png` | Sponsor-supplied |
| Sponsor 2 logo | `public/courses/drone-360/sponsors/sponsor2.png` | Sponsor-supplied |
| Sponsor 3 logo | `public/courses/drone-360/sponsors/sponsor3.png` | Sponsor-supplied |
| Sponsor 4 logo | `public/courses/drone-360/sponsors/sponsor4.png` | Sponsor-supplied |

To swap a sponsor name or link, edit the `sponsors` array in
[`data/courses.ts`](../../data/courses.ts) — the file paths above are what
that array expects. You can rename a sponsor file and update the entry's
`logo` field if you prefer.

If you change the hero image filename, update the `image` field of the
matching course entry in `data/courses.ts`.

## A note on next.config.mjs

Remote images need to be allow-listed in [`next.config.mjs`](../../next.config.mjs)
under `images.remotePatterns`. Local images under `public/` work without any
config.
