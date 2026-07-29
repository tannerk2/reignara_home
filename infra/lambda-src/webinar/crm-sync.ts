// DynamoDB Stream -> reignara-crm intake. Fires on registration INSERT/MODIFY
// and upserts a CRM contact by externalId. Decoupled from the user-facing
// submit path: if the CRM is down, registration + join email still succeed and
// the stream retries. Uses partial-batch responses so only failed records retry.
import { unmarshall } from "@aws-sdk/util-dynamodb"
import { getSecret } from "./lib/aws"
import { WEBINAR_ID } from "../../../shared/webinar"
import { PARENT_ORGS } from "../../../shared/generated/parent-orgs.generated"

const CRM_URL = process.env.CRM_INTAKE_URL as string
const CRM_TOKEN_SECRET = process.env.CRM_TOKEN_SECRET_NAME as string

const ORG_LABEL = new Map(PARENT_ORGS.map((o) => [o.id, o.label]))

function buildPayload(item: Record<string, any>) {
  return {
    externalId: `webinar-${WEBINAR_ID}:${item.email}`,
    source: `webinar-${WEBINAR_ID}`,
    firstName: item.firstName,
    lastName: item.lastName,
    email: item.email,
    phone: item.phone,
    role: item.role,
    parentOrg: item.parentOrg,
    parentOrgLabel: item.parentOrg ? ORG_LABEL.get(item.parentOrg) : undefined,
    systemNameRaw: item.systemNameRaw,
    systemId: item.systemId,
    matchStatus: item.matchStatus,
    matchScore: item.matchScore,
    level: item.level,
    state: item.state,
    contestantBucket: item.contestantBucket,
    currentTools: item.currentTools,
    modulesOfInterest: item.modulesOfInterest,
    notes: item.notes,
    consentMarketing: item.consentMarketing,
    consentTimestamp: item.consentTimestamp,
    consentIp: item.consentIp,
    utm: item.utmParams,
    referrer: item.referrer,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }
}

export const handler = async (event: any) => {
  const batchItemFailures: { itemIdentifier: string }[] = []

  let token: string
  try {
    token = await getSecret(CRM_TOKEN_SECRET)
  } catch (e) {
    // Can't authenticate -> retry the whole batch.
    console.error("CRM token fetch failed", e)
    return { batchItemFailures: (event.Records || []).map((r: any) => ({ itemIdentifier: r.dynamodb?.SequenceNumber })) }
  }

  for (const record of event.Records || []) {
    const id = record.dynamodb?.SequenceNumber
    try {
      if (record.eventName !== "INSERT" && record.eventName !== "MODIFY") continue
      // Only registrations (defensive — the ESM filter also enforces this).
      const keys = record.dynamodb?.Keys ? unmarshall(record.dynamodb.Keys) : {}
      if (typeof keys.SK !== "string" || !keys.SK.startsWith("REG#")) continue
      const img = record.dynamodb?.NewImage
      if (!img) continue
      const item = unmarshall(img)
      if (!item.email) continue

      const res = await fetch(CRM_URL, {
        method: "POST",
        headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify(buildPayload(item)),
      })

      if (res.ok) continue
      const status = res.status
      const text = await res.text().catch(() => "")
      if (status === 400) {
        // Non-retryable poison record — log and drop so the shard isn't blocked.
        console.error("CRM 400 (dropping)", id, text)
        continue
      }
      // 401 / 403 / 429 / 5xx / network -> retryable.
      console.error("CRM sync retryable error", status, text)
      batchItemFailures.push({ itemIdentifier: id })
    } catch (e) {
      console.error("CRM sync record failed", id, e)
      batchItemFailures.push({ itemIdentifier: id })
    }
  }

  return { batchItemFailures }
}
