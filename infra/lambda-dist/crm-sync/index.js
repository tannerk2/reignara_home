"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// infra/lambda-src/webinar/crm-sync.ts
var crm_sync_exports = {};
__export(crm_sync_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(crm_sync_exports);
var import_util_dynamodb = require("@aws-sdk/util-dynamodb");

// infra/lambda-src/webinar/lib/aws.ts
var import_client_dynamodb = require("@aws-sdk/client-dynamodb");
var import_lib_dynamodb = require("@aws-sdk/lib-dynamodb");
var import_client_secrets_manager = require("@aws-sdk/client-secrets-manager");
var ddb = import_lib_dynamodb.DynamoDBDocumentClient.from(new import_client_dynamodb.DynamoDBClient({}), {
  marshallOptions: { removeUndefinedValues: true }
});
var TABLE = process.env.TABLE_NAME;
var sm = new import_client_secrets_manager.SecretsManagerClient({});
var SECRET_TTL_MS = 5 * 60 * 1e3;
var secretCache = /* @__PURE__ */ new Map();
async function getSecret(name) {
  const cached = secretCache.get(name);
  if (cached && cached.exp > Date.now()) return cached.value;
  const res = await sm.send(new import_client_secrets_manager.GetSecretValueCommand({ SecretId: name }));
  let value = (res.SecretString || "").trim();
  if (value.startsWith("{")) {
    try {
      const obj = JSON.parse(value);
      value = String(obj.BREVO_API_KEY || obj.value || obj.url || Object.values(obj)[0] || "").trim();
    } catch {
    }
  }
  secretCache.set(name, { value, exp: Date.now() + SECRET_TTL_MS });
  return value;
}

// shared/webinar.ts
var WEBINAR_ID = "2026-08-05";
var WEBINAR_START_UTC = "2026-08-06T00:00:00Z";
var WEBINAR_START_MS = Date.parse(WEBINAR_START_UTC);
var LIVE_WINDOW_MS = 90 * 60 * 1e3;
var TOKEN_TTL_MS = 3 * 60 * 60 * 1e3;
var TOKEN_EXPIRES_MS = WEBINAR_START_MS + TOKEN_TTL_MS;

// shared/generated/parent-orgs.generated.ts
var PARENT_ORGS = [
  {
    "id": "miss-america",
    "label": "Miss America Organization",
    "shortName": "Miss America"
  },
  {
    "id": "miss-usa",
    "label": "Miss USA (Miss Universe Organization)",
    "shortName": "Miss USA"
  },
  {
    "id": "mrs-america",
    "label": "Mrs. America Inc.",
    "shortName": "Mrs. America"
  },
  {
    "id": "nam",
    "label": "National American Miss",
    "shortName": "NAM"
  },
  {
    "id": "intl-pageants",
    "label": "International Pageants Inc.",
    "shortName": "International"
  },
  {
    "id": "usa-ambassador",
    "label": "USA Ambassador Pageants",
    "shortName": "USA Ambassador"
  },
  {
    "id": "galaxy-usa",
    "label": "Galaxy Pageants USA",
    "shortName": "Galaxy"
  },
  {
    "id": "miss-world-america",
    "label": "Miss World America",
    "shortName": "MWA"
  },
  {
    "id": "miss-earth-usa",
    "label": "Miss Earth USA",
    "shortName": "Miss Earth"
  },
  {
    "id": "miss-united-states",
    "label": "Miss United States Organization",
    "shortName": "United States"
  },
  {
    "id": "dyw",
    "label": "Distinguished Young Women",
    "shortName": "DYW"
  },
  {
    "id": "cinderella",
    "label": "Cinderella Scholarship Pageant",
    "shortName": "Cinderella"
  },
  {
    "id": "ms-senior-america",
    "label": "Ms. Senior America",
    "shortName": "Ms. Senior"
  },
  {
    "id": "miss-amazing",
    "label": "Miss Amazing",
    "shortName": "Miss Amazing"
  },
  {
    "id": "miss-rodeo-america",
    "label": "Miss Rodeo America",
    "shortName": "MRA"
  },
  {
    "id": "royal-intl-miss",
    "label": "Royal International Miss",
    "shortName": "RIM"
  },
  {
    "id": "american-coed",
    "label": "American Coed Pageants",
    "shortName": "American Coed"
  },
  {
    "id": "usa-national-miss",
    "label": "USA National Miss",
    "shortName": "UNM"
  },
  {
    "id": "ms-america",
    "label": "Ms. America Pageant",
    "shortName": "Ms. America"
  },
  {
    "id": "mrs-universe",
    "label": "Mrs. Universe",
    "shortName": "Mrs. Universe"
  },
  {
    "id": "americas-homecoming-queen",
    "label": "America's Homecoming Queen",
    "shortName": "AHQ"
  },
  {
    "id": "national-sweetheart",
    "label": "National Sweetheart Pageant",
    "shortName": "National Sweetheart"
  },
  {
    "id": "universal-royalty",
    "label": "Universal Royalty",
    "shortName": "Universal Royalty"
  },
  {
    "id": "sunburst",
    "label": "Sunburst Beauty Pageant",
    "shortName": "Sunburst"
  },
  {
    "id": "miss-volunteer-america",
    "label": "Miss Volunteer America",
    "shortName": "MVA"
  },
  {
    "id": "independent",
    "label": "Independent / Not Affiliated",
    "shortName": "Independent"
  },
  {
    "id": "other",
    "label": "Other (specify)",
    "shortName": "Other"
  }
];
var PARENT_ORG_IDS = PARENT_ORGS.map((o) => o.id);

// infra/lambda-src/webinar/crm-sync.ts
var CRM_URL = process.env.CRM_INTAKE_URL;
var CRM_TOKEN_SECRET = process.env.CRM_TOKEN_SECRET_NAME;
var ORG_LABEL = new Map(PARENT_ORGS.map((o) => [o.id, o.label]));
function buildPayload(item) {
  return {
    externalId: `webinar-${WEBINAR_ID}:${item.email}`,
    source: `webinar-${WEBINAR_ID}`,
    firstName: item.firstName,
    lastName: item.lastName,
    email: item.email,
    phone: item.phone,
    role: item.role,
    parentOrg: item.parentOrg,
    parentOrgLabel: item.parentOrg ? ORG_LABEL.get(item.parentOrg) : void 0,
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
    updatedAt: item.updatedAt
  };
}
var handler = async (event) => {
  const batchItemFailures = [];
  let token;
  try {
    token = await getSecret(CRM_TOKEN_SECRET);
  } catch (e) {
    console.error("CRM token fetch failed", e);
    return { batchItemFailures: (event.Records || []).map((r) => ({ itemIdentifier: r.dynamodb?.SequenceNumber })) };
  }
  for (const record of event.Records || []) {
    const id = record.dynamodb?.SequenceNumber;
    try {
      if (record.eventName !== "INSERT" && record.eventName !== "MODIFY") continue;
      const keys = record.dynamodb?.Keys ? (0, import_util_dynamodb.unmarshall)(record.dynamodb.Keys) : {};
      if (typeof keys.SK !== "string" || !keys.SK.startsWith("REG#")) continue;
      const img = record.dynamodb?.NewImage;
      if (!img) continue;
      const item = (0, import_util_dynamodb.unmarshall)(img);
      if (!item.email) continue;
      const res = await fetch(CRM_URL, {
        method: "POST",
        headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify(buildPayload(item))
      });
      if (res.ok) continue;
      const status = res.status;
      const text = await res.text().catch(() => "");
      if (status === 400) {
        console.error("CRM 400 (dropping)", id, text);
        continue;
      }
      console.error("CRM sync retryable error", status, text);
      batchItemFailures.push({ itemIdentifier: id });
    } catch (e) {
      console.error("CRM sync record failed", id, e);
      batchItemFailures.push({ itemIdentifier: id });
    }
  }
  return { batchItemFailures };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
