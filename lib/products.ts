export type LayoutVariant = "standard" | "dark" | "mobile" | "standalone"

export type ProductSlug =
  | "director"
  | "merit"
  | "podium"
  | "reign"
  | "spotlight"
  | "vault"
  | "patron"
  | "envoy"

export interface ProductAssets {
  /** Primary photorealistic device render, transparent bg. */
  hero: string
  /** Optional transparent-background looping render. Used in place of hero.png when present. */
  heroVideo?: string
  /** Optional secondary renders or flat screenshot crops. */
  detail1?: string
  detail2?: string
  /** Flat screenshots (no device frame) — presented inside a matte print card. */
  screenWeb?: string
  screenMobile?: string
}

export interface Product {
  slug: ProductSlug
  name: string
  eyebrow: string
  headline: string
  description: string
  tags: string[]
  layout: LayoutVariant
  /** Alt text describing the screen shown in the render, for accessibility. */
  renderAlt: string
  /** Aspect ratio (width / height) of the hero asset, for placeholder sizing. */
  aspect: number
  /**
   * How the render is presented.
   * "single" (default) shows one device render.
   * "fan" shows a layered deck of multiple screens, offset and rotated for depth.
   */
  display?: "single" | "fan"
  /** Number of screens in a "fan" display. Files: /renders/{slug}/screen-1.png … */
  screenCount?: number
  assets: ProductAssets
}

function assets(slug: ProductSlug, extra: Partial<ProductAssets> = {}): ProductAssets {
  return {
    hero: `/renders/${slug}/hero.png`,
    heroVideo: `/renders/${slug}/hero.webm`,
    detail1: `/renders/${slug}/detail-1.png`,
    detail2: `/renders/${slug}/detail-2.png`,
    screenWeb: `/renders/${slug}/screen-web.png`,
    screenMobile: `/renders/${slug}/screen-mobile.png`,
    ...extra,
  }
}

export const products: Product[] = [
  {
    slug: "director",
    name: "Director",
    eyebrow: "Director",
    headline: "The foundation.",
    description:
      "Pageant management from first application to final walk — contestants, scheduling, and production, all in one place.",
    tags: ["Contestant records", "Production schedule", "Run of show"],
    layout: "standard",
    renderAlt:
      "Reignara Director dashboard, showing the contestant roster and production schedule across several screens.",
    aspect: 16 / 10,
    display: "fan",
    screenCount: 5,
    assets: assets("director"),
  },
  {
    slug: "merit",
    name: "Merit",
    eyebrow: "Merit",
    headline: "Judging without the panic.",
    description:
      "Offline-first scoring that keeps working when the signal backstage does not. Tabulation accurate to the decimal, every time.",
    tags: ["Offline-first", "Instant tabulation", "Audit trail"],
    layout: "dark",
    renderAlt:
      "Reignara Merit judging interface, showing a scoring rubric and live tabulation across two screens.",
    aspect: 16 / 10,
    display: "fan",
    screenCount: 2,
    assets: assets("merit"),
  },
  {
    slug: "podium",
    name: "Podium",
    eyebrow: "Podium",
    headline: "Every voice, one channel.",
    description:
      "Communications for contestants, parents, volunteers, and staff — organized, on the record, and never lost in a group text.",
    tags: ["Broadcasts", "Group threads", "Read receipts"],
    layout: "standard",
    renderAlt:
      "Reignara Podium messaging interface on a laptop, showing organized communication channels.",
    aspect: 16 / 10,
    assets: assets("podium"),
  },
  {
    slug: "reign",
    name: "Reign",
    eyebrow: "Reign",
    headline: "The crown, in your pocket.",
    description:
      "What once lived in a three-ring binder now lives in a pocket — schedules, requirements, and points, wherever the year takes you.",
    tags: ["Mobile-first", "Appearance points", "Requirements"],
    layout: "mobile",
    renderAlt:
      "Reignara Reign mobile app shown on a fan of three phones, displaying a titleholder schedule and points.",
    aspect: 1206 / 2622,
    display: "fan",
    screenCount: 3,
    assets: assets("reign"),
  },
  {
    slug: "spotlight",
    name: "Spotlight",
    eyebrow: "Spotlight",
    headline: "Know your audience.",
    description:
      "Social analytics for titleholders and programs — reach, engagement, and growth, measured the way sponsors actually ask about it.",
    tags: ["Reach", "Engagement", "Growth trends"],
    layout: "standard",
    renderAlt:
      "Reignara Spotlight analytics dashboard, showing audience reach and engagement across two screens.",
    aspect: 16 / 10,
    display: "fan",
    screenCount: 2,
    assets: assets("spotlight"),
  },
  {
    slug: "vault",
    name: "Vault",
    eyebrow: "Vault",
    headline: "Every dollar, accounted for.",
    description:
      "Expenses and scholarships with a clear ledger — where the money came from, where it went, and what remains for the crown.",
    tags: ["Expense ledger", "Scholarships", "Reporting"],
    layout: "standard",
    renderAlt:
      "Reignara Vault financial ledger on a laptop, showing expense tracking and scholarship balances.",
    aspect: 16 / 10,
    assets: assets("vault"),
  },
  {
    slug: "patron",
    name: "Patron",
    eyebrow: "Patron",
    headline: "Sponsors for seasons, not weekends.",
    description:
      "Relationship management that outlasts the year — a record of every conversation, commitment, and renewal, so partnerships compound.",
    tags: ["Sponsor CRM", "Renewals", "Deliverables"],
    layout: "standard",
    renderAlt:
      "Reignara Patron sponsor CRM on a laptop, showing a partner relationship timeline and renewals.",
    aspect: 16 / 10,
    assets: assets("patron"),
  },
  {
    slug: "envoy",
    name: "Envoy",
    eyebrow: "Envoy",
    headline: "Commitments, kept.",
    description:
      "A standalone titleholder calendar and appearance manager — every event confirmed, every obligation tracked, nothing double-booked.",
    tags: ["Appearance calendar", "Confirmations", "Standalone"],
    layout: "standalone",
    renderAlt:
      "Reignara Envoy appearance calendar on a laptop, showing confirmed titleholder events for the month.",
    aspect: 16 / 10,
    assets: assets("envoy"),
  },
]

export const productBySlug = Object.fromEntries(products.map((p) => [p.slug, p])) as Record<
  ProductSlug,
  Product
>
