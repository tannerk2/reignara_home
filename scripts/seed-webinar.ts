/**
 * Idempotent seed: loads data/parent_orgs.csv + data/systems.csv into the
 * webinar DynamoDB table. Re-running overwrites by key (no duplicates).
 *
 * Run: pnpm seed:webinar          (needs AWS creds; region defaults us-west-2)
 *      WEBINAR_TABLE=... AWS_REGION=... pnpm seed:webinar
 */
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, BatchWriteCommand } from "@aws-sdk/lib-dynamodb"
import { readParentOrgs, readSystems, normalize } from "./generate-systems"

const TABLE = process.env.WEBINAR_TABLE || "reignara-webinar"
const REGION = process.env.AWS_REGION || "us-west-2"

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({ region: REGION }), {
  marshallOptions: { removeUndefinedValues: true },
})

async function batchWrite(items: any[]): Promise<void> {
  for (let i = 0; i < items.length; i += 25) {
    let batch = items.slice(i, i + 25)
    let attempt = 0
    while (batch.length) {
      const res = await ddb.send(new BatchWriteCommand({ RequestItems: { [TABLE]: batch } }))
      const unprocessed = (res.UnprocessedItems && res.UnprocessedItems[TABLE]) || []
      if (!unprocessed.length) break
      attempt++
      if (attempt > 8) throw new Error(`Too many unprocessed items after retries (${unprocessed.length})`)
      await new Promise((r) => setTimeout(r, 150 * attempt))
      batch = unprocessed as any[]
    }
    process.stdout.write(`\rwrote ${Math.min(i + 25, items.length)}/${items.length}`)
  }
  process.stdout.write("\n")
}

async function main() {
  const orgs = readParentOrgs()
  const systems = readSystems()

  const orgItems = orgs.map((o) => ({
    PutRequest: {
      Item: {
        PK: `ORG#${o.parent_org_id}`,
        SK: "META",
        type: "org",
        parentOrgId: o.parent_org_id,
        canonicalName: o.canonical_name,
        shortName: o.short_name,
        hasStateAffiliates: o.has_state_affiliates === "yes",
        stateNamingTemplate: o.state_naming_template || undefined,
        divisions: o.divisions || undefined,
        acronyms: o.acronyms || undefined,
        confidence: o.confidence || undefined,
      },
    },
  }))

  const sysItems = systems.map((s) => ({
    PutRequest: {
      Item: {
        PK: `ORG#${s.parent_org_id}`,
        SK: `SYS#${s.system_id}`,
        type: "system",
        systemId: s.system_id,
        parentOrgId: s.parent_org_id,
        canonicalName: s.canonical_name,
        normalizedName: s.normalized_name || normalize(s.canonical_name),
        aliases: s.aliases,
        division: s.division,
        level: s.level,
        state: s.state,
        stateAbbr: s.state_abbr,
        verified: s.verified === "true",
        source: s.source,
      },
    },
  }))

  console.log(`Seeding table "${TABLE}" (${REGION}): ${orgItems.length} orgs + ${sysItems.length} systems`)
  await batchWrite([...orgItems, ...sysItems])
  console.log("Seed complete.")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
