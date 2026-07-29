# Tasks — Webinar Registration + Homepage Countdown

Status: **DRAFT — do not start until spec approved.** Each task cites requirement IDs (R#) and conflict IDs (C#).

## Phase 0 — Decisions required before coding (blockers)
- [x] 0.1 Approve stack resolutions C1–C3 (CDK not Amplify; API Gateway+CloudFront for dynamic; Brevo not SES). **Confirmed.**
- [ ] 0.2 **Decide admin auth (C4):** Cognito user pool vs CloudFront Basic-Auth vs defer /admin to post-launch. Blocks Phase 7 only.
- [x] 0.3 Real dataset provided: `parent_orgs.csv` (27 rows incl. independent/other) + `systems.csv` (2,136 rows), validated. To be copied into `reignara_landing/data/`. **NOTE:** independent/other already present — build step must dedupe, not re-append.
- [x] 0.4 Confirm A2 (token expiry = start+3h), A3 (only redirectFn reads secret), A8 (.ics 60-min UTC). **Confirmed.**

## Phase 1 — Shared single source
- [ ] 1.1 `/shared/enums.ts`: all enumerations as `const` + derived types (R form fields).
- [ ] 1.2 `/shared/normalize.ts`: `normalize()` (C6) — the one definition.
- [ ] 1.3 `/shared/schema.ts`: Zod schema derived from enums (validation single source).
- [ ] 1.4 `/shared/ics.ts`: `.ics` builder (A8).

## Phase 2 — Seed data + generator
- [ ] 2.1 `data/parent_orgs.csv` (27 rows; `divisions` = `Label::Template`) (R seed / C5).
- [ ] 2.2 `scripts/generate-systems.ts` importing `normalize()`; emits `data/systems.csv` (2,136), `shared/generated/parent-orgs.generated.ts`, and `public/webinar/systems/<org>.json` (A4).
- [ ] 2.3 Encode collision rules (Ms/Mrs America, Miss International US/JP, Miss World America vs Miss America) as distinct orgs/systems.
- [ ] 2.4 Idempotent seed script → DynamoDB (R seed, deliverable 5).

## Phase 3 — Infra (CDK) `ReignaraWebinarStack`
- [ ] 3.1 DynamoDB single table + GSI1 (emailDomain), GSI2 (matchStatus), GSI3 (joinToken) (data model).
- [ ] 3.2 Secret `reignara/webinar/2026-08-05/join-url` (placeholder), grant read to `redirectFn` only (R8, A3).
- [ ] 3.3 `NodejsFunction` scaffolding (esbuild) for bundled Lambdas (C7).
- [ ] 3.4 HTTP API routes: `/api/webinar/submit`, `/webinar/join`, `/webinar/resend`.
- [ ] 3.5 WAF rate-based rule on submit (A5).
- [ ] 3.6 `SiteStack`: CloudFront behaviors for dynamic paths → API origin (flagged edit).

## Phase 4 — Submit Lambda (R5, R6, R7, R11)
- [ ] 4.1 Zod re-validation server-side; honeypot + 3s check; email typo guard.
- [ ] 4.2 Matching: cascade isolation, imported `normalize()`, JW tiers, honorific guard.
- [ ] 4.3 DynamoDB upsert; token set-if-absent (dedup R6); store `systemNameRaw` verbatim; utm/referrer/consent+IP.
- [ ] 4.4 Brevo confirmation email + `.ics` (tokenized link, never raw URL).
- [ ] 4.5 Unit tests: 3 tiers, dedup/update, honorific non-swap, cascade isolation (deliverable 3).

## Phase 5 — Redirect + Resend Lambdas (R9, R10)
- [ ] 5.1 `redirectFn`: GSI3 lookup → verify (exists/not revoked/not expired) → 302 to secret URL.
- [ ] 5.2 Invalid token → request-your-link HTML form.
- [ ] 5.3 `resendFn`: `REG#<email>` lookup; resend to email on file only; enumeration-safe.
- [ ] 5.4 Unit tests: missing, unknown, expired, revoked; valid 302 (deliverable 4).

## Phase 6 — Frontend (React, existing design system)
- [ ] 6.1 `CountdownBanner` in root layout: fixed UTC instant, 1s tick, counting/live/hidden, no CLS, `aria-live="off"` + MT `aria-label`, 7-day dismissal cookie (R1–R3, a11y).
- [ ] 6.2 `WebinarCTA` → `/webinar` (R4).
- [ ] 6.3 `/webinar` `RegistrationForm`: single-column, labels-above, aria-describedby errors, focus-managed summary, phone mask, ≥44px targets, 390px one-scroll (validation, a11y).
- [ ] 6.4 `SystemCombobox`: ARIA 1.2 pattern, keyboard, debounced static-JSON suggestions, free-text escape hatch (R7, a11y).
- [ ] 6.5 `RegistrationSuccess`: confirmation only, no join link (R5).

## Phase 7 — Admin (C4 — after 0.2)
- [ ] 7.1 Auth mechanism per decision.
- [ ] 7.2 Admin API (authorized): GSI2 queries + merge / create-new / revoke-token.
- [ ] 7.3 `/admin/review` UI: review/new lists, `verified` flag visibly distinct, actions wired (deliverable 6).

## Phase 8 — Verify & ship
- [ ] 8.1 `vitest` all green; `next build` (static) clean; CDK synth clean.
- [ ] 8.2 Populate real join URL in the secret out of band; end-to-end token→302 test.
- [ ] 8.3 A11y pass (keyboard, screen-reader announce-once, CLS check).
- [ ] 8.4 Deploy behind review; confirm secret/token never in bundle, source, record, or logs (R8).
