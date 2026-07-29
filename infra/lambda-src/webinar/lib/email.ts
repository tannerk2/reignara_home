// Brevo confirmation email (tokenized join link + .ics). The email carries the
// branded tokenized redirect link — NOT the raw join URL — which is what makes
// revocation possible (A3).
import { getSecret } from "./aws"
import { buildWebinarIcs } from "../../../../shared/ics"
import { SITE_ORIGIN, JOIN_PATH, WEBINAR_ID, WEBINAR_TITLE, WEBINAR_TZ_LABEL } from "../../../../shared/webinar"

const BREVO_SECRET = process.env.BREVO_SECRET_NAME || "reignara/brevo-api-key"
const SENDER_EMAIL = process.env.SENDER_EMAIL || "no-reply@reignara.com"
const SENDER_NAME = process.env.SENDER_NAME || "Reignara"

function escapeHtml(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export function joinLinkFor(token: string): string {
  return `${SITE_ORIGIN}${JOIN_PATH}?t=${encodeURIComponent(token)}`
}

export async function sendConfirmationEmail(opts: {
  toEmail: string
  firstName?: string
  token: string
}): Promise<boolean> {
  const apiKey = await getSecret(BREVO_SECRET)
  if (!apiKey) {
    console.error("Brevo API key empty")
    return false
  }
  const joinLink = joinLinkFor(opts.token)
  const ics = buildWebinarIcs({ uid: `webinar-${WEBINAR_ID}-${opts.token}@reignara.com`, joinLink })
  const icsB64 = Buffer.from(ics, "utf8").toString("base64")
  const first = escapeHtml(opts.firstName || "there")

  const htmlContent = `
  <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#333;max-width:560px;">
    <p style="font-family:Georgia,serif;font-size:22px;color:#1a1a1a;margin:0 0 16px;">You're registered, ${first}.</p>
    <p style="margin:0 0 14px;">Thanks for signing up for <strong>${escapeHtml(WEBINAR_TITLE)}</strong>.</p>
    <p style="margin:0 0 18px;color:#555;">${escapeHtml(WEBINAR_TZ_LABEL)}</p>
    <p style="margin:0 0 22px;">Your personal join link is below. It's tied to your registration — please don't share it.</p>
    <p style="margin:0 0 26px;">
      <a href="${joinLink}" style="display:inline-block;background:#c8a24a;color:#1a1a1a;text-decoration:none;font-weight:600;padding:13px 26px;border-radius:999px;">Join the webinar</a>
    </p>
    <p style="margin:0 0 8px;color:#888;font-size:13px;">A calendar invite is attached. You can rejoin with the same link if you get disconnected.</p>
    <p style="margin:24px 0 0;color:#8a8a84;">— The Reignara team</p>
  </div>`

  const payload = {
    sender: { name: SENDER_NAME, email: SENDER_EMAIL },
    to: [{ email: opts.toEmail }],
    subject: "You're registered — your Meridian webinar link",
    htmlContent,
    attachment: [{ content: icsB64, name: "reignara-webinar.ics" }],
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    console.error("Brevo send error", res.status, await res.text())
    return false
  }
  return true
}
