// Shared, DST-safe webinar constants. The countdown, Lambdas, and .ics all
// derive from the single fixed UTC instant below — never from local calendar
// math or a hardcoded offset.

export const WEBINAR_ID = "2026-08-05"

// 2026-08-05 18:00 America/Denver (MDT, UTC-6) === 2026-08-06T00:00:00Z
export const WEBINAR_START_UTC = "2026-08-06T00:00:00Z"
export const WEBINAR_START_MS = Date.parse(WEBINAR_START_UTC)

// R3: show "we're live" for 90 minutes after start, then hide.
export const LIVE_WINDOW_MS = 90 * 60 * 1000

// A2: join token valid until start + 3h (revocation overrides).
export const TOKEN_TTL_MS = 3 * 60 * 60 * 1000
export const TOKEN_EXPIRES_MS = WEBINAR_START_MS + TOKEN_TTL_MS

// A8: .ics event duration.
export const WEBINAR_DURATION_MIN = 60

export const JOIN_URL_SECRET_NAME = "reignara/webinar/2026-08-05/join-url"

export const WEBINAR_TITLE = "Meridian by Reignara — Live Platform Demo"
export const WEBINAR_TZ_LABEL = "Tuesday, August 5, 2026 at 6:00 PM Mountain Time (MDT)"

// Public, branded paths (served via CloudFront -> API Gateway).
export const JOIN_PATH = "/webinar/join"
export const RESEND_PATH = "/webinar/resend"
export const SUBMIT_PATH = "/api/webinar/submit"

export const SITE_ORIGIN = "https://reignara.com"
