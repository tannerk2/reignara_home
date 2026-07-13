"use strict";

// Inquiry form handler: validates a submission and sends a notification email
// via Brevo's transactional API. The Brevo API key is read from Secrets Manager
// at runtime so it never ships to the browser.

const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

const sm = new SecretsManagerClient({});
let cachedKey = null;

async function getApiKey() {
  if (cachedKey) return cachedKey;
  const res = await sm.send(new GetSecretValueCommand({ SecretId: process.env.BREVO_SECRET_NAME }));
  let value = (res.SecretString || "").trim();
  // Accept either a raw key or a JSON blob like {"BREVO_API_KEY":"..."}.
  if (value.startsWith("{")) {
    try {
      const obj = JSON.parse(value);
      value = (obj.BREVO_API_KEY || obj.brevoApiKey || obj.apiKey || Object.values(obj)[0] || "").trim();
    } catch {
      /* fall through with raw value */
    }
  }
  cachedKey = value;
  return cachedKey;
}

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(statusCode, obj) {
  return { statusCode, headers: { "content-type": "application/json" }, body: JSON.stringify(obj) };
}

exports.handler = async (event) => {
  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { success: false, error: "Invalid request." });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const organization = String(body.organization || "").trim();
  const role = String(body.role || "").trim();
  const message = String(body.message || "").trim();
  const honeypot = String(body.company || "").trim(); // bots tend to fill this

  // Silently accept bot submissions so they don't retry.
  if (honeypot) return json(200, { success: true });

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return json(400, { success: false, error: "Please complete the required fields." });
  }
  if (name.length > 200 || message.length > 5000) {
    return json(400, { success: false, error: "That submission is too long." });
  }

  let apiKey;
  try {
    apiKey = await getApiKey();
  } catch (e) {
    console.error("Secret fetch failed:", e);
    return json(500, { success: false });
  }
  if (!apiKey) {
    console.error("Brevo API key is empty — is the secret populated?");
    return json(500, { success: false });
  }

  const html = `
    <h2 style="font-family:Georgia,serif;color:#1a1a1a;margin:0 0 16px;">New reignara inquiry</h2>
    <table style="font-family:Arial,sans-serif;font-size:14px;color:#333;border-collapse:collapse;">
      <tr><td style="padding:4px 16px 4px 0;color:#888;">Name</td><td>${esc(name)}</td></tr>
      <tr><td style="padding:4px 16px 4px 0;color:#888;">Email</td><td>${esc(email)}</td></tr>
      <tr><td style="padding:4px 16px 4px 0;color:#888;">Organization</td><td>${esc(organization) || "—"}</td></tr>
      <tr><td style="padding:4px 16px 4px 0;color:#888;">Role</td><td>${esc(role) || "—"}</td></tr>
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px;color:#333;white-space:pre-wrap;margin:16px 0 0;">${esc(message)}</p>
  `;

  const payload = {
    sender: { name: process.env.SENDER_NAME || "Reignara", email: process.env.SENDER_EMAIL },
    to: [{ email: process.env.TO_EMAIL }],
    replyTo: { email, name },
    subject: `New inquiry from ${name}`,
    htmlContent: html,
  };

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("Brevo API error:", res.status, text);
      return json(502, { success: false });
    }
    return json(200, { success: true });
  } catch (e) {
    console.error("Send failed:", e);
    return json(500, { success: false });
  }
};
