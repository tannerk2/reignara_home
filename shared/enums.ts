// Single source of truth for every webinar-form enumeration.
// The Zod schema, Lambda validation, and select options all derive from here.
// Do NOT duplicate an option list anywhere else in the codebase.

export const ROLES = [
  "Executive/System Owner",
  "State Director",
  "Local Director",
  "Board/Staff",
  "Judge",
  "Titleholder",
  "Vendor/Partner",
  "Other",
] as const
export type Role = (typeof ROLES)[number]

export const LEVELS = ["Local", "Regional", "State", "National", "International"] as const
export type Level = (typeof LEVELS)[number]

export const CONTESTANT_BUCKETS = ["Under 25", "25–75", "76–200", "200+"] as const
export type ContestantBucket = (typeof CONTESTANT_BUCKETS)[number]

export const EVENTS_PER_YEAR = ["1", "2–3", "4+"] as const
export type EventsPerYear = (typeof EVENTS_PER_YEAR)[number]

export const CURRENT_TOOLS = [
  "Spreadsheets/paper",
  "Google Docs/Forms",
  "JotForm",
  "Pageant Planet",
  "Custom-built",
  "Other",
] as const
export type CurrentTool = (typeof CURRENT_TOOLS)[number]

// Envoy is intentionally excluded — it is a standalone product, not a Meridian module.
export const MODULES = ["Director", "Podium", "Merit", "Reign", "Vault", "Patron", "Spotlight"] as const
export type ModuleName = (typeof MODULES)[number]

// Short, one-line explanations shown beside each module in the picker.
export const MODULE_DESCRIPTIONS: Record<ModuleName, string> = {
  Director: "Run your whole program — contestants, titleholders, applications, and records in one place.",
  Podium: "Announcements, messaging, and stakeholder updates in one communication hub.",
  Merit: "Digital judging and scoring — fair, transparent, and accurate to the decimal.",
  Reign: "A mobile companion app for titleholders to manage appearances and their reign.",
  Vault: "Budgets, expenses, receipts, and reimbursements with clear financial transparency.",
  Patron: "Sponsor relationships and deliverables, tracked from first ask to renewal.",
  Spotlight: "Social media insights and analytics to grow your reach and engagement.",
}

export const MATCH_STATUS = ["auto", "review", "new"] as const
export type MatchStatus = (typeof MATCH_STATUS)[number]

// US 50 + DC + PR + "Outside US"
export const US_STATES = [
  { name: "Alabama", abbr: "AL" },
  { name: "Alaska", abbr: "AK" },
  { name: "Arizona", abbr: "AZ" },
  { name: "Arkansas", abbr: "AR" },
  { name: "California", abbr: "CA" },
  { name: "Colorado", abbr: "CO" },
  { name: "Connecticut", abbr: "CT" },
  { name: "Delaware", abbr: "DE" },
  { name: "Florida", abbr: "FL" },
  { name: "Georgia", abbr: "GA" },
  { name: "Hawaii", abbr: "HI" },
  { name: "Idaho", abbr: "ID" },
  { name: "Illinois", abbr: "IL" },
  { name: "Indiana", abbr: "IN" },
  { name: "Iowa", abbr: "IA" },
  { name: "Kansas", abbr: "KS" },
  { name: "Kentucky", abbr: "KY" },
  { name: "Louisiana", abbr: "LA" },
  { name: "Maine", abbr: "ME" },
  { name: "Maryland", abbr: "MD" },
  { name: "Massachusetts", abbr: "MA" },
  { name: "Michigan", abbr: "MI" },
  { name: "Minnesota", abbr: "MN" },
  { name: "Mississippi", abbr: "MS" },
  { name: "Missouri", abbr: "MO" },
  { name: "Montana", abbr: "MT" },
  { name: "Nebraska", abbr: "NE" },
  { name: "Nevada", abbr: "NV" },
  { name: "New Hampshire", abbr: "NH" },
  { name: "New Jersey", abbr: "NJ" },
  { name: "New Mexico", abbr: "NM" },
  { name: "New York", abbr: "NY" },
  { name: "North Carolina", abbr: "NC" },
  { name: "North Dakota", abbr: "ND" },
  { name: "Ohio", abbr: "OH" },
  { name: "Oklahoma", abbr: "OK" },
  { name: "Oregon", abbr: "OR" },
  { name: "Pennsylvania", abbr: "PA" },
  { name: "Rhode Island", abbr: "RI" },
  { name: "South Carolina", abbr: "SC" },
  { name: "South Dakota", abbr: "SD" },
  { name: "Tennessee", abbr: "TN" },
  { name: "Texas", abbr: "TX" },
  { name: "Utah", abbr: "UT" },
  { name: "Vermont", abbr: "VT" },
  { name: "Virginia", abbr: "VA" },
  { name: "Washington", abbr: "WA" },
  { name: "West Virginia", abbr: "WV" },
  { name: "Wisconsin", abbr: "WI" },
  { name: "Wyoming", abbr: "WY" },
  { name: "District of Columbia", abbr: "DC" },
  { name: "Puerto Rico", abbr: "PR" },
  { name: "Outside US", abbr: "XX" },
] as const
export type StateName = (typeof US_STATES)[number]["name"]
export const STATE_NAMES = US_STATES.map((s) => s.name) as [StateName, ...StateName[]]
