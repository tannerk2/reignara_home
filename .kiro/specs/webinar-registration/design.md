# Design — Webinar Registration + Homepage Countdown

Status: **DRAFT — awaiting review.**

This design reconciles the feature with the repo's real stack: a **static Next.js export**
(S3 + CloudFront) plus **CDK** Lambdas/API Gateway and **Brevo** email. See `requirements.md`
§"Stack conflicts" for the conflicts this resolves.

---

## 1. Architecture

```
                          ┌────────────────────────── CloudFront (reignara.com) ──────────────────────────┐
Browser ──▶ static pages  │  default behavior ─────────────▶ S3 (Next export: /, /webinar, success, admin) │
        ──▶ dynamic paths  │  /api/webinar/*  behavior ─────▶ API Gateway (HTTP API) ─▶ Lambdas             │
        ──▶ /webinar/join  │  /webinar/join   behavior ─────▶ API Gateway ─▶ redirectFn ─(302)─▶ join URL   │
        ──▶ /webinar/resend│  /webinar/resend behavior ─────▶ API Gateway ─▶ resendFn                        │
                          └───────────────────────────────────────────────────────────────────────────────┘

Lambdas (CDK, NodejsFunction/esbuild):
  submitFn   ─▶ Zod validate ─▶ match (import normalize + JW) ─▶ DynamoDB upsert ─▶ Brevo (confirm + .ics)
  redirectFn ─▶ GSI3 token lookup ─▶ checks ─▶ Secrets Manager (join URL) ─▶ 302   | invalid ─▶ request-link page
  resendFn   ─▶ REG#<email> lookup ─▶ Brevo resend tokenized link (email on file only)
  adminApi   ─▶ Cognito-authorized ─▶ GSI2 queries + merge/create/revoke mutations
  seedFn/script ─▶ idempotent batch load of parent_orgs + systems

DynamoDB single table: WEBINAR#<id>/REG#<email>, ORG#<id>/SYS#<id>, GSI1 emailDomain, GSI2 matchStatus, GSI3 joinToken
Secrets Manager: reignara/webinar/2026-08-05/join-url (redirectFn only) + existing Brevo key
```

### Why these choices
- **Static export can't 302 or auth-gate.** Dynamic behavior is isolated to API Gateway + Lambda, mirroring the existing `FormStack`. CloudFront path behaviors keep everything on `reignara.com` (no separate subdomain), so `/webinar/join?t=…` is a first-class linkable URL (R9).
- **Brevo over SES** (C3): already authenticated + in production; Brevo supports base64 attachments (`.ics`) and inline HTML.
- **Shared TS across client + Lambda** requires bundling → new Lambdas use `aws-lambda-nodejs` (`NodejsFunction`, esbuild), unlike the hand-written inquiry Lambda. Justified by `/shared/enums.ts` + `/shared/normalize.ts` single-source and npm deps (zod, JW).

### New / changed infra
- **New stack `ReignaraWebinarStack`** (keeps blast radius off the marketing stacks): table, GSIs, Lambdas, secret, WAF rate rule, (Cognito if approved).
- **`SiteStack` change:** add CloudFront cache behaviors for `/webinar/join`, `/webinar/resend`, `/api/webinar/*` pointing at the API Gateway origin (no caching, forward query string + needed headers). **Flag:** this is the one edit to an existing marketing stack.

---

## 2. Shared code — single source of truth

```
/shared/
  enums.ts        // every enumeration (role, level, state, buckets, tools, modules, matchStatus…)
  normalize.ts    // normalize() — imported by generator AND submit Lambda (C6)
  schema.ts       // Zod schema derived from enums.ts; imported by client form + submit Lambda
  ics.ts          // .ics builder (UTC DTSTART, DURATION)
```
- `enums.ts` exports `as const` arrays + derived TS union types. Select options, Zod `z.enum(...)`, and Lambda validation all read from here.
- `parentOrg` options are **not** hardcoded: a build step reads `data/parent_orgs.csv` → emits `shared/generated/parent-orgs.generated.ts` (+ appends "Independent / not affiliated", "Other"). Regenerated when the CSV changes.
- `data/systems.csv` → build step emits `public/webinar/systems/<parentOrgId>.json` for client combobox suggestions (A4). Same generator, same source → no drift.

---

## 3. Data model & access patterns

| Access pattern | Operation |
|---|---|
| Upsert registration (dedup by email, R6) | `Update` PK=`WEBINAR#2026-08-05`, SK=`REG#<email>`, conditional token set-if-absent |
| Read registration by email (resend, R10) | `GetItem` same key |
| Token redemption (R9) | `Query` **GSI3** joinToken |
| Admin review queue (R7/admin) | `Query` **GSI2** matchStatus ∈ {review,new} |
| Domain dedup / rollups (R11) | `Query` **GSI1** emailDomain |
| Systems for an org (authoritative match) | `Query` PK=`ORG#<id>`, SK begins_with `SYS#` |

Item shapes (illustrative, not code):
- **Registration**: identity + all form fields, `systemNameRaw`, `systemId?`, `matchScore`, `matchStatus`, `emailDomain`, `joinToken`, `tokenRevoked`, `tokenExpiresAt` (A2), `source`, `utmParams{}`, `referrer`, `userAgent`, `consentMarketing`, `consentTimestamp`, `consentIp`, `createdAt`, `updatedAt`.
- **System**: `canonicalName`, `normalizedName`, `aliases[]`, `division`, `level`, `state`, `stateAbbr`, `verified`, `source`.

Token: 32 bytes CSPRNG → base64url. Stored on the registration + indexed by GSI3. Reusable; revoked via `tokenRevoked=true`.

---

## 4. API contracts (all under CloudFront on reignara.com)

- **POST `/api/webinar/submit`** → `submitFn`
  - Body: form payload + honeypot + `formRenderedAt` (for 3s check) + utm/referrer.
  - 200 `{ ok: true }` (always link-less). 400 `{ errors }`. 429 on rate limit.
- **GET `/webinar/join?t=<token>`** → `redirectFn`
  - Valid → `302 Location: <join URL from secret>`.
  - Missing/unknown/expired/revoked → `200` HTML "request your link" form (R10).
- **POST `/webinar/resend`** → `resendFn`
  - Body: `{ email }`. Always `200` generic response (no enumeration). Sends only if `REG#<email>` exists, to the stored email.
- **Admin API** (Cognito-authorized, C4): `GET /api/admin/registrations?status=`, `POST /api/admin/registrations/{email}/merge`, `/create-system`, `/revoke-token`.

---

## 5. Matching algorithm (submitFn)

1. Resolve `parentOrgId` from submitted `parentOrg`. If `Independent`/`Other` → `matchStatus=new`, no query.
2. `Query` systems under `ORG#<parentOrgId>` only (**cascade isolation**, prevents cross-org "Miss Idaho").
3. `norm = normalize(systemNameRaw)` (imported).
4. For each candidate, best Jaro-Winkler over `normalizedName` + normalized `aliases`.
5. **Honorific guard:** if candidate and input differ only by an honorific token (miss/mrs/ms) after normalization, discard as a match candidate (may still appear as a *suggestion* but never auto-links).
6. Tier: `≥0.92 auto` (link), `0.75–0.92 review` (no link), `<0.75 new`.
7. Persist `systemId?`, `matchScore`, `matchStatus`; **always** persist `systemNameRaw` verbatim.

Client suggestions: load `/webinar/systems/<parentOrgId>.json`, run same JW client-side for top-5 (debounced 250ms). **Authoritative** decision is server-side only.

---

## 6. Components (follow existing design system)

- **CountdownBanner** (root layout): fixed-height wrapper (no CLS); `remaining = Date.parse(START_UTC) - Date.now()`; ticks 1s; states = counting / live (`start`→`+90m`) / hidden; `aria-live="off"` + MT `aria-label`; dismiss → 7-day cookie.
- **WebinarCTA**: reusable button/link → `/webinar` (R4); also used in banner + relevant CTAs.
- **RegistrationForm**: single-column, labels-above, `aria-describedby` errors, focus-managed error summary; honeypot + `formRenderedAt`; posts to `/api/webinar/submit`; on success renders **RegistrationSuccess**.
- **SystemCombobox**: ARIA 1.2 combobox, full keyboard nav, debounced suggestions from static JSON, visible free-text escape hatch.
- **RegistrationSuccess**: confirmation + "link emailed" copy; **no** join link (R5).

---

## 7. Email (Brevo)

- **Confirmation** (submitFn): from `no-reply@reignara.com`, to registrant; body includes tokenized link `https://reignara.com/webinar/join?t=<token>` + `.ics` attachment (base64). No raw join URL (A3).
- **Resend** (resendFn): same tokenized link to email on file.
- `.ics`: `DTSTART:20260806T000000Z`, `DURATION:PT1H` (A8), `SUMMARY`, `DESCRIPTION`, `URL` = tokenized link.

---

## 8. Security, privacy, integrity

- **Secret** `reignara/webinar/2026-08-05/join-url`: placeholder at create; **only** `redirectFn` granted `secretsmanager:GetSecretValue` (A3). Never in bundles/source/record/logs.
- **Bot/rate:** honeypot + 3s min + WAF rate rule (A5). No CAPTCHA.
- **Consent:** boolean + ISO timestamp + source IP (from API GW `requestContext`).
- **Enumeration-safe** resend (generic response).
- **Least privilege** IAM per Lambda; table/GSI-scoped.
- **PII:** email/phone/notes stored; not logged; phone stored E.164.

---

## 9. Admin `/admin/review` (C4 — needs approval)

Recommended: **Cognito user pool** (few internal users) + admin static page that authenticates and calls a **Cognito-authorized** admin API. Lists `matchStatus ∈ {review,new}` via GSI2; shows `verified` flag distinctly (unverified auto-match visibly different from human-confirmed); actions: **merge** (link to chosen system + mark verified), **create-new** (promote raw → new canonical system), **revoke-token**. Alternative interim: CloudFront Function/Lambda@Edge Basic-Auth with creds in Secrets Manager (lighter, less granular). **Pick one before implementation.**

---

## 10. Testing (vitest — new)

- **submitFn:** three tiers (auto ≥0.92 / review 0.75–0.92 / new <0.75); dedup/update reuses token; honorific non-swap (Miss vs Mrs must not link); **cascade isolation** ("Miss Idaho" under `miss-world-america` ≠ Miss America record).
- **redirectFn:** missing, unknown, expired, revoked → request-link; valid → 302.
- **normalize/JW:** unit coverage incl. collision names.
- **seed:** idempotency (re-run = no dupes).

---

## 11. Deployment / infra changes summary

- New `ReignaraWebinarStack`: DynamoDB + GSI1–3, `submitFn`/`redirectFn`/`resendFn` (+ admin), WAF rate rule, join-url secret (placeholder), Brevo-key read grant.
- `SiteStack`: **+CloudFront behaviors** for `/webinar/join`, `/webinar/resend`, `/api/webinar/*` → API Gateway origin (the sole edit to an existing marketing stack).
- Build pipeline: CSV → generated enums/JSON step before `next build`.
- New deps: `zod`, `vitest`, JW impl, csv parser (build/seed only).
