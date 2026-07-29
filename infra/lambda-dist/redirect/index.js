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

// infra/lambda-src/webinar/redirect.ts
var redirect_exports = {};
__export(redirect_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(redirect_exports);

// shared/token.ts
function evaluateToken(state, nowMs) {
  if (!state || !state.found) return "invalid";
  if (state.tokenRevoked) return "invalid";
  if (typeof state.expiresAtMs === "number" && nowMs > state.expiresAtMs) return "invalid";
  return "redirect";
}

// shared/webinar.ts
var WEBINAR_START_UTC = "2026-08-06T00:00:00Z";
var WEBINAR_START_MS = Date.parse(WEBINAR_START_UTC);
var LIVE_WINDOW_MS = 90 * 60 * 1e3;
var TOKEN_TTL_MS = 3 * 60 * 60 * 1e3;
var TOKEN_EXPIRES_MS = WEBINAR_START_MS + TOKEN_TTL_MS;
var JOIN_URL_SECRET_NAME = "reignara/webinar/2026-08-05/join-url";
var WEBINAR_TITLE = "Meridian by Reignara \u2014 Live Platform Demo";
var RESEND_PATH = "/webinar/resend";

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
function html(statusCode, body) {
  return { statusCode, headers: { "content-type": "text/html; charset=utf-8" }, body };
}

// infra/lambda-src/webinar/lib/table.ts
async function getRegistrationByToken(token) {
  const r = await ddb.send(
    new import_lib_dynamodb.QueryCommand({
      TableName: TABLE,
      IndexName: "GSI3",
      KeyConditionExpression: "joinToken = :t",
      ExpressionAttributeValues: { ":t": token },
      Limit: 1
    })
  );
  return r.Items && r.Items[0] ? r.Items[0] : null;
}

// infra/lambda-src/webinar/redirect.ts
var handler = async (event) => {
  const token = event.queryStringParameters?.t;
  const now = Date.now();
  let reg = null;
  if (token) {
    try {
      reg = await getRegistrationByToken(token);
    } catch (e) {
      console.error("token lookup failed", e);
    }
  }
  const decision = evaluateToken(
    reg ? { found: true, tokenRevoked: reg.tokenRevoked, expiresAtMs: reg.tokenExpiresAtMs } : { found: false },
    now
  );
  if (decision === "redirect") {
    const url = await getSecret(JOIN_URL_SECRET_NAME);
    if (url && url !== "PLACEHOLDER") {
      return { statusCode: 302, headers: { location: url, "cache-control": "no-store" }, body: "" };
    }
    return requestLinkPage("We couldn't load the join link just now. Please request it again below.");
  }
  return requestLinkPage(
    !token ? "This link is missing its access code." : "This link isn't valid anymore \u2014 request a fresh one below."
  );
};
function requestLinkPage(message) {
  const body = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>Request your webinar link</title>
<style>
  :root { color-scheme: light; }
  body { margin:0; font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; background:#f5f3ef; color:#26241f; }
  .wrap { max-width:520px; margin:0 auto; padding:56px 20px; }
  h1 { font-family: Georgia, serif; font-size:28px; margin:0 0 12px; }
  p { line-height:1.6; color:#55524c; }
  form { margin-top:24px; display:flex; flex-direction:column; gap:12px; }
  label { font-weight:600; font-size:14px; }
  input { min-height:48px; padding:0 14px; font-size:16px; border:1px solid #d9d4cb; border-radius:12px; background:#fff; }
  button { min-height:48px; border:0; border-radius:999px; background:#c8a24a; color:#1a1a1a; font-weight:600; font-size:16px; cursor:pointer; }
</style></head>
<body><div class="wrap">
  <h1>Request your join link</h1>
  <p>${message}</p>
  <p>Enter the email you registered with and we'll resend your private link for <strong>${WEBINAR_TITLE}</strong>. For your security, we only send it to the address already on file.</p>
  <form method="POST" action="${RESEND_PATH}">
    <label for="email">Email</label>
    <input id="email" name="email" type="email" autocomplete="email" required placeholder="you@example.com" />
    <button type="submit">Resend my link</button>
  </form>
</div></body></html>`;
  return html(200, body);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
