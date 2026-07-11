# Product render assets

Drop product renders here. The `/products` page loads them from
`/renders/<slug>/…`. Until a file exists, the page shows an elegant
placeholder (product name + the expected path), so it's safe to add assets
incrementally — one product, or one file, at a time.

There are **two presentation styles**, and they use **different files**:

- **Single** — one device render. Uses `hero.png`.
- **Fan** — a layered deck of screens, offset and rotated for depth. Uses
  `screen-1.png`, `screen-2.png`, … (one per screen in the fan).

## What each product needs

| Product    | Style  | Required files | Aspect (W×H) | Suggested export |
|------------|--------|----------------|--------------|------------------|
| director   | **fan** (3) | `screen-1.png`, `screen-2.png`, `screen-3.png` | 16:10 | 2560×1600 each |
| merit      | **fan** (2) — dark section | `screen-1.png`, `screen-2.png` | 4:3 | 2048×1536 each |
| podium     | single | `hero.png` | 16:10 | 2560×1600 |
| reign      | **fan** (3) — phone | `screen-1.png`, `screen-2.png`, `screen-3.png` | 3:4 | 1200×1600 each |
| spotlight  | single | `hero.png` | 16:10 | 2560×1600 |
| vault      | single | `hero.png` | 16:10 | 2560×1600 |
| patron     | single | `hero.png` | 16:10 | 2560×1600 |
| envoy      | single (standalone card) | `hero.png` | 16:10 | 2560×1600 |

## Optional files (single-style products)

| File            | What it is |
|-----------------|------------|
| `hero.webm`     | Looping video render (transparent bg). If it loads, it plays in place of `hero.png`. |
| `detail-1.png`  | Secondary render layered subtly behind the hero for depth. |
| `detail-2.png`, `screen-web.png`, `screen-mobile.png` | Reserved (not currently displayed). |

## Tips
- Export PNGs with a **transparent background** — renders float on the section
  background (cream, or dark for Merit).
- For **fan** products, all screens share the same aspect ratio; the deck fans
  outward away from the text, so screen-1 is the front and the rest sit behind.
- Keep each file reasonably optimized (aim < ~500KB). Files are served as-is
  (static export, unoptimized images).
- After adding files, redeploy: `pnpm build`, then from `infra/` run
  `npm run deploy:site`.
