// POST /webinar/resend — resend the join link to the email ALREADY ON FILE.
// Enumeration-safe: always returns the same generic response (R10).
import { getRegistration } from "./lib/table"
import { sendConfirmationEmail } from "./lib/email"
import { html } from "./lib/aws"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function parseEmail(event: any): string {
  const ct = (event.headers?.["content-type"] || event.headers?.["Content-Type"] || "").toLowerCase()
  let raw = event.body || ""
  if (event.isBase64Encoded) {
    try {
      raw = Buffer.from(raw, "base64").toString("utf8")
    } catch {
      /* ignore */
    }
  }
  try {
    if (ct.includes("application/json")) return String(JSON.parse(raw || "{}").email || "")
    return new URLSearchParams(raw).get("email") || ""
  } catch {
    return ""
  }
}

export const handler = async (event: any) => {
  const email = parseEmail(event).trim().toLowerCase()

  // Only send to an address that is already registered — never to an arbitrary
  // address supplied at this moment. Response is identical regardless.
  if (email && EMAIL_RE.test(email)) {
    try {
      const reg = await getRegistration(email)
      if (reg && reg.joinToken && !reg.tokenRevoked) {
        await sendConfirmationEmail({ toEmail: reg.email, firstName: reg.firstName, token: reg.joinToken })
      }
    } catch (e) {
      console.error("resend failed", e)
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
<p>If that email is registered for the webinar, we've just resent your private join link. It can take a minute to arrive — check spam if you don't see it.</p>
</div></body></html>`,
  )
}
