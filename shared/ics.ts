// Minimal RFC 5545 VCALENDAR builder. Emits a UTC DTSTART + DURATION to avoid
// VTIMEZONE ambiguity (A8).
import { WEBINAR_START_UTC, WEBINAR_DURATION_MIN, WEBINAR_TITLE } from "./webinar"

function toIcsUtc(iso: string): string {
  // 2026-08-06T00:00:00Z -> 20260806T000000Z
  return iso.replace(/[-:]/g, "").replace(/\.\d{3}/, "")
}

function escapeText(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n")
}

export function buildWebinarIcs(opts: { uid: string; joinLink: string; description?: string }): string {
  const dtStart = toIcsUtc(WEBINAR_START_UTC)
  const dtStamp = toIcsUtc(new Date().toISOString())
  const description =
    opts.description ??
    `Your private join link: ${opts.joinLink}\\n\\nMeridian by Reignara — a live walkthrough of the platform.`

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
    "END:VCALENDAR",
  ]
  // RFC 5545 uses CRLF line endings.
  return lines.join("\r\n")
}
