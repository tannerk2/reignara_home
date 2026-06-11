# reignara.com — Infrastructure

AWS CDK app that hosts the static reignara.com landing site.

## Architecture

The site is a Next.js static export (`output: 'export'` → `../out/`) served as static
files. There is **no server** — all request handling happens at the CDN edge.

```
Browser ──▶ CloudFront ──▶ CloudFront Function ──▶ S3 (private bucket)
            (TLS, cache)    (URL rewrites +          (origin, OAC-locked)
                             short-link redirects)
```

- **S3 bucket** — private (no public access), holds the contents of `../out/`.
- **CloudFront distribution** — serves the bucket over HTTPS at `reignara.com`,
  using an ACM cert from the separate cert stack (us-east-1).
- **CloudFront Function** (`RewriteFunction`) — runs on every viewer request. It
  does two jobs:
  1. Rewrites pretty URLs to the static files S3 actually stores
     (`/privacy/` → `/privacy/index.html`).
  2. Handles **short-link redirects** like `/card` (see below).

### Stacks

| Stack | Region | Purpose |
|-------|--------|---------|
| `ReignaraLandingCertStack` | `us-east-1` | ACM certificate for the domain (CloudFront requires us-east-1). |
| `ReignaraLandingSiteStack` | `us-west-2` | S3 bucket, CloudFront distribution, edge function, deployment. |

Account, regions, and domain are configured in `bin/infra.ts`.

## Deploying

From this `infra/` directory:

```bash
# 1. Build the site first (from the project root, one level up)
cd .. && pnpm build && cd infra

# 2. Deploy
npm run deploy:site     # site stack only (most common)
npm run deploy:cert     # cert stack only (rarely changes)
npm run deploy:all      # both
```

`deploy:site` syncs `../out/` to S3 (with `prune: true`, so removed files are
deleted) and invalidates the CloudFront cache (`/*`). Changes are live in ~1–2
minutes.

> **Always run `pnpm build` before `deploy:site`.** The deployment uploads
> whatever is currently in `../out/`. A stale `out/` ships stale content.

## Short-link redirects (e.g. `/card`)

Because the site is fully static, redirects can't be configured on a server.
Instead they live in the **CloudFront Function** in
`lib/site-stack.ts` (look for `RewriteFunction`).

`reignara.com/card` currently issues a **302 (temporary)** redirect to the main
site. It's used by a printed QR code, and the target is expected to change later.

```js
// inside the handler in lib/site-stack.ts
if (uri === '/card' || uri === '/card/') {
  return {
    statusCode: 302,
    statusDescription: 'Found',
    headers: {
      'location': { value: 'https://reignara.com/' },
      'cache-control': { value: 'no-cache, no-store, must-revalidate' }
    }
  };
}
```

### Why 302 + no-cache?

A **302** (not 301) plus `cache-control: no-cache` means browsers and QR scanners
will **not** permanently cache the redirect. That keeps the short link
repointable. A 301 would get cached aggressively and could strand the QR code on
an old target. Use 301 only once a destination is truly permanent.

### Repointing an existing short link

1. Edit the `location` value in the matching `if` block in `lib/site-stack.ts`.
2. From `infra/`, run `npm run deploy:site`.
3. Live in ~1–2 minutes. (No `pnpm build` needed — this is an infra-only change,
   but running it doesn't hurt.)

### Adding a new short link

Add another `if` block to the handler **above** the URL-rewrite logic, following
the same shape:

```js
if (uri === '/promo' || uri === '/promo/') {
  return {
    statusCode: 302,
    statusDescription: 'Found',
    headers: {
      'location': { value: 'https://example.com/target' },
      'cache-control': { value: 'no-cache, no-store, must-revalidate' }
    }
  };
}
```

Then `npm run deploy:site`.

### Turning a short link into a real page instead

If a path should serve actual content rather than redirect (e.g. a digital
business card at `/card`), build it as a normal route (`app/card/page.tsx`),
remove the matching `if` block from the function, rebuild, and redeploy.

## Active short links

| Path | Type | Target | Notes |
|------|------|--------|-------|
| `/card` | 302 | `https://reignara.com/` | Printed QR code. Temporary; will be repointed. |
