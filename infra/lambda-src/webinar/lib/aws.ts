// AWS clients + helpers shared by the webinar Lambdas. @aws-sdk/* is provided by
// the Node 20 Lambda runtime (esbuild marks it external).
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb"
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager"

export const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}), {
  marshallOptions: { removeUndefinedValues: true },
})
export { GetCommand, PutCommand, UpdateCommand, QueryCommand }

export const TABLE = process.env.TABLE_NAME as string

const sm = new SecretsManagerClient({})
// Cache with a short TTL so out-of-band secret updates/rotations are picked up
// within minutes without a redeploy (join URL, Brevo key, CRM token).
const SECRET_TTL_MS = 5 * 60 * 1000
const secretCache = new Map<string, { value: string; exp: number }>()

export async function getSecret(name: string): Promise<string> {
  const cached = secretCache.get(name)
  if (cached && cached.exp > Date.now()) return cached.value
  const res = await sm.send(new GetSecretValueCommand({ SecretId: name }))
  let value = (res.SecretString || "").trim()
  if (value.startsWith("{")) {
    try {
      const obj = JSON.parse(value)
      value = String(obj.BREVO_API_KEY || obj.value || obj.url || Object.values(obj)[0] || "").trim()
    } catch {
      /* keep raw */
    }
  }
  secretCache.set(name, { value, exp: Date.now() + SECRET_TTL_MS })
  return value
}

export function json(statusCode: number, body: unknown, headers: Record<string, string> = {}) {
  return { statusCode, headers: { "content-type": "application/json", ...headers }, body: JSON.stringify(body) }
}

export function html(statusCode: number, body: string) {
  return { statusCode, headers: { "content-type": "text/html; charset=utf-8" }, body }
}
