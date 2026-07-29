// GET /webinar/join?t=<token> — verify token, 302 to the real join URL, else
// show a "request your link" page (R9/R10).
import { evaluateToken } from "../../../shared/token"
import { JOIN_URL_SECRET_NAME, RESEND_PATH, WEBINAR_TITLE } from "../../../shared/webinar"
import { getRegistrationByToken } from "./lib/table"
import { getSecret, html } from "./lib/aws"

export const handler = async (event: any) => {
  const token = event.queryStringParameters?.t
  const now = Date.now()

  let reg: Record<string, any> | null = null
  if (token) {
    try {
      reg = await getRegistrationByToken(token)
    } catch (e) {
      console.error("token lookup failed", e)
    }
  }

  const decision = evaluateToken(
    reg ? { found: true, tokenRevoked: reg.tokenRevoked, expiresAtMs: reg.tokenExpiresAtMs } : { found: false },
    now,
  )

  if (decision === "redirect") {
    const url = await getSecret(JOIN_URL_SECRET_NAME)
    if (url && url !== "PLACEHOLDER") {
      return { statusCode: 302, headers: { location: url, "cache-control": "no-store" }, body: "" }
    }
    return requestLinkPage("We couldn't load the join link just now. Please request it again below.")
  }

  return requestLinkPage(
    !token ? "This link is missing its access code." : "This link isn't valid anymore — request a fresh one below.",
  )
}

function requestLinkPage(message: string) {
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
</div></body></html>`
  return html(200, body)
}
