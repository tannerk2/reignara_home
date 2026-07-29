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

// infra/lambda-src/webinar/resend.ts
var resend_exports = {};
__export(resend_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(resend_exports);

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

// shared/webinar.ts
var WEBINAR_ID = "2026-08-05";
var WEBINAR_START_UTC = "2026-08-06T00:00:00Z";
var WEBINAR_START_MS = Date.parse(WEBINAR_START_UTC);
var LIVE_WINDOW_MS = 90 * 60 * 1e3;
var TOKEN_TTL_MS = 3 * 60 * 60 * 1e3;
var TOKEN_EXPIRES_MS = WEBINAR_START_MS + TOKEN_TTL_MS;
var WEBINAR_DURATION_MIN = 60;
var WEBINAR_TITLE = "Meridian by Reignara \u2014 Live Platform Demo";
var WEBINAR_TZ_LABEL = "Tuesday, August 5, 2026 at 6:00 PM Mountain Time (MDT)";
var JOIN_PATH = "/webinar/join";
var SITE_ORIGIN = "https://reignara.com";

// infra/lambda-src/webinar/lib/table.ts
var regPk = () => `WEBINAR#${WEBINAR_ID}`;
var regSk = (email) => `REG#${email.trim().toLowerCase()}`;
async function getRegistration(email) {
  const r = await ddb.send(new import_lib_dynamodb.GetCommand({ TableName: TABLE, Key: { PK: regPk(), SK: regSk(email) } }));
  return r.Item || null;
}

// shared/ics.ts
function toIcsUtc(iso) {
  return iso.replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}
function escapeText(s) {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}
function buildWebinarIcs(opts) {
  const dtStart = toIcsUtc(WEBINAR_START_UTC);
  const dtStamp = toIcsUtc((/* @__PURE__ */ new Date()).toISOString());
  const description = opts.description ?? `Your private join link: ${opts.joinLink}\\n\\nMeridian by Reignara \u2014 a live walkthrough of the platform.`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Reignara//Webinar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${opts.uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DURATION:PT${WEBINAR_DURATION_MIN}M`,
    `SUMMARY:${escapeText(WEBINAR_TITLE)}`,
    `DESCRIPTION:${escapeText(description)}`,
    `URL:${opts.joinLink}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ];
  return lines.join("\r\n");
}

// infra/lambda-src/webinar/lib/email.ts
var BREVO_SECRET = process.env.BREVO_SECRET_NAME || "reignara/brevo-api-key";
var SENDER_EMAIL = process.env.SENDER_EMAIL || "no-reply@reignara.com";
var SENDER_NAME = process.env.SENDER_NAME || "Reignara";
function escapeHtml(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function joinLinkFor(token) {
  return `${SITE_ORIGIN}${JOIN_PATH}?t=${encodeURIComponent(token)}`;
}
async function sendConfirmationEmail(opts) {
  const apiKey = await getSecret(BREVO_SECRET);
  if (!apiKey) {
    console.error("Brevo API key empty");
    return false;
  }
  const joinLink = joinLinkFor(opts.token);
  const ics = buildWebinarIcs({ uid: `webinar-${WEBINAR_ID}-${opts.token}@reignara.com`, joinLink });
  const icsB64 = Buffer.from(ics, "utf8").toString("base64");
  const first = escapeHtml(opts.firstName || "there");
  const htmlContent = `
  <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#333;max-width:560px;">
    <p style="font-family:Georgia,serif;font-size:22px;color:#1a1a1a;margin:0 0 16px;">You're registered, ${first}.</p>
    <p style="margin:0 0 14px;">Thanks for signing up for <strong>${escapeHtml(WEBINAR_TITLE)}</strong>.</p>
    <p style="margin:0 0 18px;color:#555;">${escapeHtml(WEBINAR_TZ_LABEL)}</p>
    <p style="margin:0 0 22px;">Your personal join link is below. It's tied to your registration \u2014 please don't share it.</p>
    <p style="margin:0 0 26px;">
      <a href="${joinLink}" style="display:inline-block;background:#c8a24a;color:#1a1a1a;text-decoration:none;font-weight:600;padding:13px 26px;border-radius:999px;">Join the webinar</a>
    </p>
    <p style="margin:0 0 8px;color:#888;font-size:13px;">A calendar invite is attached. You can rejoin with the same link if you get disconnected.</p>
    <p style="margin:24px 0 0;color:#8a8a84;">\u2014 The Reignara team</p>
  </div>`;
  const payload = {
    sender: { name: SENDER_NAME, email: SENDER_EMAIL },
    to: [{ email: opts.toEmail }],
    subject: "You're registered \u2014 your Meridian webinar link",
    htmlContent,
    attachment: [{ content: icsB64, name: "reignara-webinar.ics" }]
  };
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    console.error("Brevo send error", res.status, await res.text());
    return false;
  }
  return true;
}

// infra/lambda-src/webinar/resend.ts
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function parseEmail(event) {
  const ct = (event.headers?.["content-type"] || event.headers?.["Content-Type"] || "").toLowerCase();
  let raw = event.body || "";
  if (event.isBase64Encoded) {
    try {
      raw = Buffer.from(raw, "base64").toString("utf8");
    } catch {
    }
  }
  try {
    if (ct.includes("application/json")) return String(JSON.parse(raw || "{}").email || "");
    return new URLSearchParams(raw).get("email") || "";
  } catch {
    return "";
  }
}
var handler = async (event) => {
  const email = parseEmail(event).trim().toLowerCase();
  if (email && EMAIL_RE.test(email)) {
    try {
      const reg = await getRegistration(email);
      if (reg && reg.joinToken && !reg.tokenRevoked) {
        await sendConfirmationEmail({ toEmail: reg.email, firstName: reg.firstName, token: reg.joinToken });
      }
    } catch (e) {
      console.error("resend failed", e);
    }
  }
  return html(
    200,
    `<!doctype html><html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="robots" content="noindex"/>
<title>Check your inbox</title>
<style>body{margin:0;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#f5f3ef;color:#26241f}
.wrap{max-width:520px;margin:0 auto;padding:56px 20px}h1{font-family:Georgia,serif;font-size:28px;margin:0 0 12px}
p{line-height:1.6;color:#55524c}</style></head>
<body><div class="wrap"><h1>Check your inbox</h1>
<p>If that email is registered for the webinar, we've just resent your private join link. It can take a minute to arrive \u2014 check spam if you don't see it.</p>
</div></body></html>`
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
