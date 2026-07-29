// Zod schema derived entirely from the enum single-source. Used by the client
// form AND re-validated in the submit Lambda (never trust the client copy).
import { z } from "zod"
import { ROLES, LEVELS, STATE_NAMES, CONTESTANT_BUCKETS, EVENTS_PER_YEAR, CURRENT_TOOLS, MODULES } from "./enums"
import { PARENT_ORG_IDS } from "./generated/parent-orgs.generated"

const asTuple = <T extends string>(a: readonly T[]) => a as unknown as [T, ...T[]]
const emptyToUndef = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (v === "" || v == null ? undefined : v), schema.optional())

// ---- Email typo guard (offer a correction, never auto-apply) ----
export const COMMON_DOMAIN_TYPOS: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gmal.com": "gmail.com",
  "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "hotmial.com": "hotmail.com",
  "outlok.com": "outlook.com",
}

export function suggestEmailCorrection(email: string): string | null {
  const at = email.lastIndexOf("@")
  if (at < 0) return null
  const domain = email.slice(at + 1).toLowerCase()
  const fix = COMMON_DOMAIN_TYPOS[domain]
  return fix ? email.slice(0, at + 1) + fix : null
}

// ---- Phone -> E.164 (US-centric; stored E.164, masked in UI) ----
export function toE164(input: string | undefined | null): string | null {
  const raw = (input ?? "").trim()
  if (!raw) return null
  const digits = raw.replace(/\D/g, "")
  if (digits.length === 10) return "+1" + digits
  if (digits.length === 11 && digits.startsWith("1")) return "+" + digits
  if (raw.startsWith("+") && digits.length >= 8 && digits.length <= 15) return "+" + digits
  return null
}

// ---- Core form fields ----
export const registrationFormSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name").max(80),
  lastName: z.string().trim().min(1, "Please enter your last name").max(80),
  email: z.string().trim().toLowerCase().email("Enter a valid email address").max(254),
  role: z.enum(asTuple(ROLES), { errorMap: () => ({ message: "Select your role" }) }),
  parentOrg: z.enum(PARENT_ORG_IDS, { errorMap: () => ({ message: "Select a parent organization" }) }),
  systemName: z.string().trim().min(1, "Enter your system / title name").max(160),
  level: z.enum(asTuple(LEVELS), { errorMap: () => ({ message: "Select a level" }) }),
  state: z.enum(STATE_NAMES, { errorMap: () => ({ message: "Select a state" }) }),
  consentMarketing: z.boolean(),
  // Optional
  phone: emptyToUndef(z.string().trim().max(24)),
  contestantBucket: emptyToUndef(z.enum(asTuple(CONTESTANT_BUCKETS))),
  eventsPerYear: emptyToUndef(z.enum(asTuple(EVENTS_PER_YEAR))),
  currentTools: z.array(z.enum(asTuple(CURRENT_TOOLS))).max(CURRENT_TOOLS.length).optional().default([]),
  modulesOfInterest: z.array(z.enum(asTuple(MODULES))).max(MODULES.length).optional().default([]),
  notes: emptyToUndef(z.string().trim().max(500, "Keep notes under 500 characters")),
})
export type RegistrationForm = z.infer<typeof registrationFormSchema>

// ---- Full submit envelope (form + anti-bot + attribution meta) ----
export const utmSchema = z
  .object({
    source: z.string().max(200).optional(),
    medium: z.string().max(200).optional(),
    campaign: z.string().max(200).optional(),
    term: z.string().max(200).optional(),
    content: z.string().max(200).optional(),
  })
  .partial()

export const submitEnvelopeSchema = registrationFormSchema.extend({
  // Honeypot: must be empty. Real users never see it.
  company: z.string().max(0, "bot").optional().or(z.literal("")),
  // Ms since form render — enforced >= 3000ms in the handler.
  formRenderedAt: z.number().int().nonnegative().optional(),
  utm: utmSchema.optional(),
  referrer: emptyToUndef(z.string().max(2048)),
})
export type SubmitEnvelope = z.infer<typeof submitEnvelopeSchema>
