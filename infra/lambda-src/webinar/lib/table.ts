// DynamoDB single-table helpers.
import { ddb, TABLE, GetCommand, PutCommand, QueryCommand, UpdateCommand } from "./aws"
import { WEBINAR_ID } from "../../../../shared/webinar"
import type { MatchCandidate } from "../../../../shared/match"

export const regPk = () => `WEBINAR#${WEBINAR_ID}`
export const regSk = (email: string) => `REG#${email.trim().toLowerCase()}`

export async function getRegistration(email: string): Promise<Record<string, any> | null> {
  const r = await ddb.send(new GetCommand({ TableName: TABLE, Key: { PK: regPk(), SK: regSk(email) } }))
  return (r.Item as Record<string, any>) || null
}

export async function getRegistrationByToken(token: string): Promise<Record<string, any> | null> {
  const r = await ddb.send(
    new QueryCommand({
      TableName: TABLE,
      IndexName: "GSI3",
      KeyConditionExpression: "joinToken = :t",
      ExpressionAttributeValues: { ":t": token },
      Limit: 1,
    }),
  )
  return r.Items && r.Items[0] ? (r.Items[0] as Record<string, any>) : null
}

export async function querySystems(parentOrgId: string): Promise<MatchCandidate[]> {
  const out: MatchCandidate[] = []
  let ExclusiveStartKey: Record<string, any> | undefined
  do {
    const r = await ddb.send(
      new QueryCommand({
        TableName: TABLE,
        KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
        ExpressionAttributeValues: { ":pk": `ORG#${parentOrgId}`, ":sk": "SYS#" },
        ExclusiveStartKey,
      }),
    )
    for (const it of r.Items || []) {
      out.push({
        systemId: it.systemId,
        canonicalName: it.canonicalName,
        normalizedName: it.normalizedName,
        aliases: Array.isArray(it.aliases) ? it.aliases : [],
      })
    }
    ExclusiveStartKey = r.LastEvaluatedKey as Record<string, any> | undefined
  } while (ExclusiveStartKey)
  return out
}

export async function putRegistration(item: Record<string, any>): Promise<void> {
  await ddb.send(new PutCommand({ TableName: TABLE, Item: item }))
}

/**
 * Per-IP rate limit via an atomic DynamoDB counter with TTL. Returns true when
 * the caller is OVER the limit for the current minute. (WAFv2 can't attach to
 * an HTTP API v2, so we enforce here instead.)
 */
export async function isRateLimited(ip: string, limitPerMin = 10): Promise<boolean> {
  if (!ip) return false // can't identify -> don't block legitimate traffic
  const nowSec = Math.floor(Date.now() / 1000)
  const bucket = Math.floor(nowSec / 60)
  try {
    const r = await ddb.send(
      new UpdateCommand({
        TableName: TABLE,
        Key: { PK: `RATE#${ip}`, SK: `M#${bucket}` },
        UpdateExpression: "ADD #c :one SET #ttl = if_not_exists(#ttl, :ttl)",
        ExpressionAttributeNames: { "#c": "count", "#ttl": "ttl" },
        ExpressionAttributeValues: { ":one": 1, ":ttl": nowSec + 180 },
        ReturnValues: "UPDATED_NEW",
      }),
    )
    return Number(r.Attributes?.count ?? 0) > limitPerMin
  } catch (e) {
    console.error("rate limit check failed", e)
    return false // fail open — don't block on limiter errors
  }
}
