# Product render assets

Drop product renders here. The `/products` page loads them from
`/renders/<slug>/…`. Until a file exists, the page shows an elegant
placeholder card (product name + this expected path), so it's safe to add
assets incrementally — one product, or one file, at a time.

## Folders (one per product)

```
public/renders/
  director/
  merit/
  podium/
  reign/
  spotlight/
  vault/
  patron/
  envoy/
```

## Files per product

| File            | Required? | What it is |
|-----------------|-----------|------------|
| `hero.png`      | **Yes**   | Primary product render. Transparent background (PNG). This is the main image shown in the section. |
| `hero.webm`     | Optional  | Looping video render (transparent bg). If it loads, it plays in place of `hero.png`. Omit if you don't have one. |
| `detail-1.png`  | Optional  | Secondary render, layered subtly behind the hero for depth. Transparent background. |
| `detail-2.png`  | Optional  | Reserved for future use (not currently displayed). |
| `screen-web.png`| Optional  | Reserved: flat web screenshot (not currently displayed). |
| `screen-mobile.png` | Optional | Reserved: flat mobile screenshot (not currently displayed). |

Only `hero.png` is needed to replace the placeholder. The rest are optional enhancements.

## Aspect ratios (match these so nothing crops or letterboxes)

The section reserves space at each product's aspect ratio, so renders look best exported at (or proportional to) these:

| Product    | Layout      | Aspect (W×H) | Suggested export |
|------------|-------------|--------------|------------------|
| director   | laptop      | 16:10        | 2560×1600 |
| merit      | tablet (dark section) | 4:3 | 2048×1536 |
| podium     | laptop      | 16:10        | 2560×1600 |
| reign      | phone (mobile) | 3:4       | 1200×1600 |
| spotlight  | laptop      | 16:10        | 2560×1600 |
| vault      | laptop      | 16:10        | 2560×1600 |
| patron     | laptop      | 16:10        | 2560×1600 |
| envoy      | laptop (standalone card) | 16:10 | 2560×1600 |

## Tips
- Export PNGs with a **transparent background** — the device render floats on the section background (cream, or dark for Merit).
- Keep each `hero.png` reasonably optimized (aim < ~500KB). Large exports will be served as-is (the site uses static export with unoptimized images).
- After adding files, redeploy: from `infra/`, run `npm run deploy:site` (build first with `pnpm build`).
