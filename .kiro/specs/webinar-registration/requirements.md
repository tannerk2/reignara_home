# Requirements — Webinar Registration + Homepage Countdown

Status: **DRAFT — awaiting review.** No implementation code will be written until this spec is approved.

## Overview

Ship a "Join the Webinar" CTA and a site-wide countdown banner for a live Meridian
platform demo on **2026-08-05 18:00 America/Denver (MDT, UTC−6) = `2026-08-06T00:00:00Z`**.
Capture registrations with high data integrity, auto-link each registrant to a canonical
pageant "system" record, and privately deliver the join link to confirmed registrants only.

Brand/glossary: **Reignara** = parent brand. **Meridian** = platform. Modules in the picker:
Director, Podium, Spotlight, Reign, Merit, Vault, Patron. **Envoy is excluded** from the module
picker (standalone product).

---

## ⚠️ Stack conflicts with the existing repo (follow repo + flag)

These are called out here because they change *what is buildable* and must be resolved before design sign-off.

| # | Spec assumes | Repo reality | Resolution |
|---|---|---|---|
| C1 | AWS Amplify Gen 2 | Plain **CDK** (`aws-cdk-lib` 2.180), stacks: Cert/Site/Form | Extend CDK. No Amplify. |
| C2 | Server routes for `/webinar/join` 302 + `/admin/review` | Next.js **`output: 'export'`** (static; no server runtime) | Dynamic paths served by **API Gateway + Lambda** via **CloudFront path behaviors**. Static pages (`/webinar` form, success) stay static. |
| C3 | **SES** templates | **Brevo** transactional API (domain authenticated, key in Secrets Manager) | Use Brevo (supports `.ics` attachment + HTML). |
| C4 | `/admin/review` "behind existing auth" | **No auth exists anywhere** | Net-new. Proposed: Cognito user pool + Cognito-authorized admin API. **Needs approval.** |
| C5 | `data/*.csv` + `scripts/generate-systems.ts` "exist" | **Do not exist** | Author them. `normalize()` lives in `/shared`, re-exported by generator (true single source). Real 27-org dataset must be supplied. |
| C6 | Import `normalize()` from `scripts/generate-systems.ts` | n/a | Put `normalize()` in `/shared/normalize.ts`; generator + Lambda both import it. Flagged deviation from literal wording. |
| C7 | Zod + unit tests + JW matching | No `zod`, no test runner, no JW lib, no Lambda bundler | Add `zod`, `vitest`, a JW impl, and `NodejsFunction` (esbuild) bundling for new Lambdas. |

---

## Assumptions (flagged, not silently chosen)

- **A1** `WEBINAR_ID = "2026-08-05"` (matches the secret namespace `reignara/webinar/2026-08-05/join-url`).
- **A2** Join **token expiry window** is unspecified; assume valid from confirmation until **event start + 3h** (`2026-08-06T03:00:00Z`). Revocation overrides expiry.
- **A3** R8 secret readers: the confirmation/resend emails contain the **tokenized redirect URL** (`https://reignara.com/webinar/join?t=<token>`), not the raw join URL. Therefore **only the redirect Lambda** reads the secret. This narrows R8's grant (confirmation Lambda does not need it). If you truly want the raw URL emailed, revocation (R9) becomes impossible — confirm.
- **A4** Client combobox suggestions use a **static per-org JSON** generated from `systems.csv` (same single source); the **submit Lambda** performs the authoritative match against DynamoDB. No per-keystroke API call.
- **A5** Rate limiting via **AWS WAF** rate-based rule on the submit route (per-IP is not native to API Gateway).
- **A6** Spec files live at `reignara_landing/.kiro/specs/webinar-registration/` (the git repo root).
- **A7** The confirmation/resend Lambdas reuse the existing **Brevo** key secret + authenticated sender `no-reply@reignara.com`.
- **A8** `.ics` timezone: emit a UTC `DTSTART:20260806T000000Z` with `DURATION` (assume 60 min unless told otherwise) to avoid VTIMEZONE ambiguity.

---

## Functional requirements (EARS) + acceptance criteria

### R1 — Site-wide dismissible countdown banner
WHEN a visitor loads any page, THE SYSTEM SHALL display a dismissible banner with a live countdown to the webinar start instant.
- Rendered from the root layout so it appears on every route.
- Dismiss control persists dismissal in a cookie for **7 days** (R behavior).
- Reserves its own height to avoid layout shift (see A11y).

### R2 — Countdown correctness (DST-safe)
WHILE current time < start instant, THE SYSTEM SHALL render days/hours/minutes/seconds, updating every second, computed from the fixed UTC timestamp `2026-08-06T00:00:00Z` — never from browser local calendar math, never from a hardcoded offset that breaks across DST.
- Implementation constraint: `remaining = Date.parse("2026-08-06T00:00:00Z") - Date.now()`. Both are absolute instants; no offset arithmetic.

### R3 — Live / post-event states
WHEN the start instant passes, THE SYSTEM SHALL replace the countdown with "We're live now — join us" for **90 minutes**, then hide the banner.
- Live window: `[start, start + 90m)`. After `start + 90m`: banner not rendered.

### R4 — Registration route
WHEN a visitor clicks "Join the Webinar", THE SYSTEM SHALL open the registration form as a route (`/webinar`) that is also directly linkable.
- `/webinar` is a static, client-rendered page.

### R5 — Submit → persist → token → email (link NOT shown)
WHEN a visitor submits a valid form, THE SYSTEM SHALL persist the record, generate a per-registrant join token, and send a confirmation email containing the join link and an `.ics` attachment. The success page SHALL confirm registration and state the link was emailed — it SHALL NOT render the join link.
- Success page (`/webinar` success state) shows confirmation copy only; no token, no URL.

### R6 — Idempotent dedup by email
IF a submitted email already exists for this webinar, THEN THE SYSTEM SHALL update the existing record (not duplicate) and reuse the existing join token (not reissue).
- Key is `REG#<lowercased,trimmed email>`; upsert semantics; token generated only when absent.

### R7 — System-name linking
WHEN a system name is submitted, THE SYSTEM SHALL attempt to link it to a canonical system record per the matching rules (see Matching section).

### R8 — Join URL secret
THE SYSTEM SHALL store the join URL in Secrets Manager under `reignara/webinar/2026-08-05/join-url`, readable only by the redirect Lambda (see A3). It SHALL NOT appear in client bundles, page source, the DynamoDB record, build logs, or any public route. Create with a **placeholder**; real URL populated out of band.

### R9 — Tokenized redirect
WHEN a registrant opens `/webinar/join?t=<token>`, THE SYSTEM SHALL verify the token against their registration and **302** to the real join URL.
- Tokens are single-purpose, tied to exactly one registration, **reusable** by that registrant (rejoin after drops), **revocable** from admin.

### R10 — Invalid token → request-your-link (email on file only)
IF a token is missing, unknown, expired, or revoked, THEN THE SYSTEM SHALL show a "request your link" form that re-sends to the **email already on file** for that registration — never to an arbitrary address supplied at that moment.
- The form takes an email, looks up `REG#<email>`; only if a registration exists does it resend, and it sends to the stored email. Response is generic ("if you're registered, we've sent it") to avoid enumeration.

### R11 — Attribution
WHEN a registrant is created or updated, THE SYSTEM SHALL record UTM params and referrer for channel attribution.
- Capture `utm_{source,medium,campaign,term,content}`, `document.referrer`, and `userAgent`.

---

## Form fields

**Required:** firstName, lastName, email, role (select), parentOrg (select),
systemName (combobox w/ free-text fallback), level (select), state (select),
consentMarketing (checkbox).

**Optional:** phone (masked), contestantBucket (select), eventsPerYear (select),
currentTools (multi-select), modulesOfInterest (multi-select), notes (textarea, ≤500 chars).

### Enumerations — single source `/shared/enums.ts`
The Zod schema, Lambda validation, and select options all **derive** from `/shared/enums.ts`. No option list is duplicated anywhere.

- **role:** Executive/System Owner, State Director, Local Director, Board/Staff, Judge, Titleholder, Vendor/Partner, Other
- **parentOrg:** loaded from `data/parent_orgs.csv` **at build time**, then append `Independent / not affiliated` and `Other` as the final two options
- **level:** Local, Regional, State, National, International
- **state:** US 50 + DC + PR + "Outside US"
- **contestantBucket:** Under 25, 25–75, 76–200, 200+
- **eventsPerYear:** 1, 2–3, 4+
- **currentTools (multi):** Spreadsheets/paper, Pageant Planet, Van Bros, Custom-built, Other
- **modulesOfInterest (multi):** Director, Podium, Merit, Reign, Vault, Patron, Spotlight

---

## Validation (Zod on client AND Lambda; never trust client)

- **Email:** format check + typo guard on common domain misspellings (gmial, gmai, gmal, yaho, yahooo, hotmial, outlok). **Offer** correction; do not auto-apply.
- **Phone:** masked `+1 (XXX) XXX-XXXX` in UI; stored **E.164**.
- **Bot filtering:** honeypot field + minimum **3s** time-to-submit. **No CAPTCHA.**
- **Consent:** boolean + ISO-8601 timestamp + source IP.
- **Rate limit:** submit endpoint per IP (A5).
- **notes:** ≤ 500 chars, server-enforced.

---

## Seed data requirements

- `data/parent_orgs.csv` — 27 orgs. Columns: `parent_org_id, canonical_name, short_name, has_state_affiliates, state_naming_template, divisions, acronyms, notes, confidence`. `divisions` holds `Label::Template` pairs where state title naming is non-trivial; empty `divisions` ⇒ pure age brackets, one system record per state.
- `data/systems.csv` — 2,136 generated state-level records. Columns: `system_id, parent_org_id, canonical_name, division, level, state, state_abbr, normalized_name, aliases (pipe-delimited), verified, source`.
- `scripts/generate-systems.ts` — regenerates `systems.csv` from `parent_orgs.csv`. `systems.csv` is generated, never hand-edited.
- Every seeded row `verified=false`. Admin UI must **visually distinguish** unverified auto-matches from human-confirmed. Never suppress unverified rows from the combobox.
- **Collisions the matcher must not paper over:** Ms. America Pageant ≠ Mrs. America Inc.; Miss International (Intl Pageants Inc., US) ≠ Miss International (Japan); Miss World America state titles are textually identical to Miss America state titles (both have "Miss Idaho").

---

## System-name matching (authoritative, Lambda on write)

- **Cascade (mandatory):** once `parentOrg` is chosen, query only `SYS#` items under that `ORG#`. Without it, "Miss Idaho" scores 1.0 against two orgs.
- **Normalize both sides** with the exact `normalize()` (see C6): lowercase; strip `.'’,&`; hyphens/slashes → spaces; drop noise words: pageant, pageants, organization, organisation, org, inc, incorporated, llc, system, systems, scholarship, competition, program. **Import, never reimplement** (drift destroys match rates).
- **Score:** Jaro-Winkler vs `canonical_name` and every alias; take best.
  - `>= 0.92` → link `system_id`, `match_status = auto`
  - `0.75–0.92` → link nothing, `match_status = review`
  - `< 0.75` → `match_status = new`
- **Suggestions:** top 5 as user types, debounced 250ms, with escape hatch "Don't see yours? Type it in — we'll add it."
- **Honorific rule:** do NOT generate or accept honorific swaps (Miss ↔ Mrs. ↔ Ms.) as candidates. A false match there is worse than the review queue.

---

## Data model (single-table, PK/SK)

**Registration** — `PK = WEBINAR#<id>`, `SK = REG#<lowercased,trimmed email>`
Attributes: all form fields, `systemNameRaw` (verbatim, never overwritten), `systemId?`, `matchScore`, `matchStatus (auto|review|new)`, `emailDomain`, `joinToken`, `tokenRevoked`, `source`, `utmParams`, `referrer`, `userAgent`, `consentMarketing`, `consentTimestamp`, `consentIp`, `createdAt`, `updatedAt`.

**Canonical system** — `PK = ORG#<parentOrgId>`, `SK = SYS#<systemId>`
Attributes: `canonicalName, normalizedName, aliases[], division, level, state, stateAbbr, verified, source`.

**Indexes**
- **GSI1:** `emailDomain` → registrations (org-level dedup/rollups).
- **GSI2:** `matchStatus` → registrations (admin review queue).
- **GSI3:** `joinToken` → registration (redemption lookup).

Constraint: always store `systemNameRaw` exactly as typed; never overwrite with canonical name.

---

## Accessibility & behavior (correctness, not styling)

- Banner must not cause **CLS** — reserve its height.
- Countdown wrapped in `aria-live="off"` with an `aria-label` giving the full date/time in **Mountain Time** (announced once, not per tick).
- Banner dismissal persists in a cookie for **7 days**.
- Form single-column, labels above inputs, inline errors via `aria-describedby`, error summary focus-managed on failed submit.
- Combobox implements the **ARIA 1.2 combobox pattern** with full keyboard support (not a bare input + floating div).
- Mobile-first: form completes in one thumb-scroll on a **390px** viewport.
- All interactive targets **≥ 44×44px**.

---

## Deliverables (restated)

1. CDK definitions: DynamoDB table w/ GSI1–GSI3, Lambdas (submit, redirect, resend), email templates (Brevo), Secrets Manager secret.
2. React components: CountdownBanner, WebinarCTA, RegistrationForm, SystemCombobox, RegistrationSuccess.
3. Submit Lambda + matching + unit tests (3 match tiers, dedup/update, honorific non-swap, cascade isolation — "Miss Idaho" under `miss-world-america` must not match Miss America).
4. Redirect Lambda + tests (missing, unknown, expired, revoked).
5. Idempotent seed script loading both CSVs.
6. `/admin/review` page (matchStatus review/new) with merge / create-new / revoke-token, behind auth (C4).

## Out of scope / non-goals

- Live-streaming infrastructure (join URL is external, supplied out of band).
- Payment/ticketing.
- General newsletter/CRM sync beyond storing consent + attribution.
- Envoy in the module picker.
