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

| Product    | Style  | Required files | Aspect (W×H) |
|------------|--------|----------------|--------------|
| director   | **fan** (5) | `screen-1.png` … `screen-5.png` | 16:10 |
| merit      | **fan** (2) — dark section | `screen-1.png`, `screen-2.png` | 16:10 |
| podium     | single | `hero.png` | 16:10 |
| reign      | **fan** (4) — phone | `screen-1.png` … `screen-4.png` | ~9:19.5 (phone) |
| spotlight  | **fan** (2) | `screen-1.png`, `screen-2.png` | 16:10 |
| vault      | single | `hero.png` | 16:10 |
| patron     | single | `hero.png` | 16:10 |
| envoy      | single (standalone card) | `hero.png` | 16:10 |

The fan supports **2–5 screens**; the spread is normalized so more screens pack
tighter rather than fanning off-frame. To change a product's count, edit
`screenCount` (and add/remove `screen-N.png` files) in `lib/products.ts`.

> Podium has no assets yet — it shows the placeholder until a `hero.png` is added.

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
