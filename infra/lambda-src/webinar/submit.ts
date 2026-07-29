// POST /api/webinar/submit — validate, match, upsert, email confirmation.
import { submitEnvelopeSchema, toE164 } from "../../../shared/schema"
import { matchSystem, type MatchStatus } from "../../../shared/match"
import { resolveJoinToken } from "../../../shared/token"
import { WEBINAR_ID, TOKEN_EXPIRES_MS } from "../../../shared/webinar"
import { json } from "./lib/aws"
import { getRegistration, putRegistration, querySystems, isRateLimited, regPk, regSk } from "./lib/table"
import { sendConfirmationEmail } from "./lib/email"

const MIN_SUBMIT_MS = 3000

export const handler = async (event: any) => {
  const now = Date.now()
  const sourceIp =
    event.requestContext?.http?.sourceIp ||
    (event.headers?.["x-forwarded-for"] || "").split(",")[0].trim() ||
    null

  // Per-IP rate limit.
  if (await isRateLimited(sourceIp)) {
    return json(429, { ok: false, error: "Too many requests. Please try again in a moment." })
  }

  let body: any
  try {
    body = JSON.parse(event.body || "{}")
  } catch {
    return json(400, { ok: false, error: "Invalid request" })
  }

  // Bot filters — silently accept so bots don't learn/retry.
  if (typeof body.company === "string" && body.company.trim() !== "") return json(200, { ok: true })
  if (typeof body.formRenderedAt === "number" && now - body.formRenderedAt < MIN_SUBMIT_MS) {
    return json(200, { ok: true })
  }

  const parsed = submitEnvelopeSchema.safeParse(body)
  if (!parsed.success) {
    return json(400, { ok: false, errors: parsed.error.flatten().fieldErrors })
  }
  const d = parsed.data
  const email = d.email
  const emailDomain = email.split("@")[1] || ""

  // System matching — cascade to the chosen org only.
  let systemId: string | null = null
  let matchScore = 0
  let matchStatus: MatchStatus = "new"
  if (d.parentOrg !== "independent" && d.parentOrg !== "other") {
    try {
      const candidates = await querySystems(d.parentOrg)
      const m = matchSystem(d.systemName, candidates)
      systemId = m.systemId
      matchScore = m.matchScore
      matchStatus = m.matchStatus
    } catch (e) {
      console.error("system match query failed", e)
    }
  }

  // Dedup/upsert — reuse existing token (R6).
  const existing = await getRegistration(email)
  const joinToken = resolveJoinToken(existing?.joinToken)
  const nowIso = new Date().toISOString()
  const userAgent = event.headers?.["user-agent"] || null

  const item: Record<string, any> = {
    PK: regPk(),
    SK: regSk(email),
    webinarId: WEBINAR_ID,
    firstName: d.firstName,
    lastName: d.lastName,
    email,
    role: d.role,
    parentOrg: d.parentOrg,
    systemNameRaw: d.systemName, // verbatim — never overwritten with canonical
    systemId: systemId ?? undefined,
    matchScore,
    matchStatus,
    level: d.level,
    state: d.state,
    phone: toE164(d.phone) ?? undefined,
    contestantBucket: d.contestantBucket,
    currentTools: d.currentTools ?? [],
    modulesOfInterest: d.modulesOfInterest ?? [],
    notes: d.notes,
    emailDomain,
    joinToken,
    tokenRevoked: existing?.tokenRevoked ?? false,
    tokenExpiresAtMs: TOKEN_EXPIRES_MS,
    consentMarketing: d.consentMarketing,
    consentTimestamp: nowIso,
    consentIp: sourceIp,
    source: existing?.source ?? "webinar-form",
    utmParams: d.utm ?? existing?.utmParams,
    referrer: d.referrer ?? existing?.referrer,
    userAgent,
    createdAt: existing?.createdAt ?? nowIso,
    updatedAt: nowIso,
  }

  try {
    await putRegistration(item)
  } catch (e) {
    console.error("putRegistration failed", e)
    return json(500, { ok: false })
  }

  // Confirmation email — best effort; never fail the registration on send.
  try {
    await sendConfirmationEmail({ toEmail: email, firstName: d.firstName, token: joinToken })
  } catch (e) {
    console.error("confirmation email failed", e)
  }

  return json(200, { ok: true })
}
