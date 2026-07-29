import { describe, it, expect } from "vitest"
import fs from "fs"
import path from "path"
import { matchSystem, classifyScore, type MatchCandidate } from "../../shared/match"

function loadOrg(orgId: string): MatchCandidate[] {
  const p = path.join(process.cwd(), "public", "webinar", "systems", `${orgId}.json`)
  const rows = JSON.parse(fs.readFileSync(p, "utf8")) as any[]
  return rows.map((r) => ({
    systemId: r.systemId,
    canonicalName: r.canonicalName,
    normalizedName: r.normalizedName,
    aliases: r.aliases,
  }))
}

describe("classifyScore — three tiers", () => {
  it("auto at >= 0.92", () => {
    expect(classifyScore(0.92)).toBe("auto")
    expect(classifyScore(0.999)).toBe("auto")
  })
  it("review in [0.75, 0.92)", () => {
    expect(classifyScore(0.75)).toBe("review")
    expect(classifyScore(0.9199)).toBe("review")
  })
  it("new below 0.75", () => {
    expect(classifyScore(0.7499)).toBe("new")
    expect(classifyScore(0)).toBe("new")
  })
})

describe("matchSystem — auto and new tiers (real Miss America data)", () => {
  const ma = loadOrg("miss-america")

  it("auto-links an exact canonical name", () => {
    const r = matchSystem("Miss Idaho", ma)
    expect(r.matchStatus).toBe("auto")
    expect(r.systemId).toBe("miss-america-id-miss")
    expect(r.matchScore).toBeGreaterThanOrEqual(0.92)
  })

  it("returns 'new' with no link for a clearly unrelated string", () => {
    const r = matchSystem("Zzxqw Robotics Convention", ma)
    expect(r.matchStatus).toBe("new")
    expect(r.systemId).toBeNull()
  })

  it("never links a system unless the tier is auto", () => {
    for (const input of ["Miss", "some text", "M", "the idaho thing"]) {
      const r = matchSystem(input, ma)
      if (r.matchStatus !== "auto") expect(r.systemId).toBeNull()
    }
  })
})

describe("matchSystem — review tier lands with no link", () => {
  const target: MatchCandidate[] = [
    { systemId: "t", canonicalName: "Miss Idaho", normalizedName: "miss idaho", aliases: [] },
  ]
  it("a moderate near-miss classifies as review and links nothing", () => {
    const perturbations = [
      "miss idahi",
      "miss iduho",
      "miss idraho",
      "miss iduhoo",
      "miss idahoy",
      "miz idaho",
      "miss idahooo",
      "miss idahaw",
    ]
    const reviewHit = perturbations.map((i) => matchSystem(i, target)).find((r) => r.matchStatus === "review")
    expect(reviewHit, "expected a perturbation to fall in the review band").toBeTruthy()
    expect(reviewHit!.systemId).toBeNull()
  })
})

describe("cascade isolation — the 'Miss Idaho' collision", () => {
  const ma = loadOrg("miss-america")
  const mwa = loadOrg("miss-world-america")

  it("'Miss Idaho' under Miss World America links an MWA system, never the Miss America one", () => {
    const r = matchSystem("Miss Idaho", mwa)
    expect(r.matchStatus).toBe("auto")
    expect(r.systemId?.startsWith("miss-world-america")).toBe(true)
    expect(r.systemId).not.toBe("miss-america-id-miss")
  })

  it("'Miss Idaho' under Miss America links the Miss America system", () => {
    const r = matchSystem("Miss Idaho", ma)
    expect(r.systemId).toBe("miss-america-id-miss")
  })
})

describe("honorific non-swap rule", () => {
  // Isolate the rule: the Idaho "Ms." record only. A "Mrs." input must not
  // auto-link it (honorific swap denotes a different division/organization),
  // but the same honorific must still match.
  const idahoMs: MatchCandidate[] = [
    {
      systemId: "ms-america-id-ms",
      canonicalName: "Ms. Idaho America",
      normalizedName: "ms idaho america",
      aliases: ["Ms Idaho America", "Ms. Idaho America Pageant", "Idaho Ms. America"],
    },
  ]

  it("does NOT auto-match a 'Mrs.' input against a 'Ms.' record of the same base name", () => {
    const r = matchSystem("Mrs. Idaho America", idahoMs)
    expect(r.matchStatus).not.toBe("auto")
    expect(r.systemId).toBeNull()
  })

  it("does NOT auto-match a 'Miss' input against a 'Ms.' record of the same base name", () => {
    const r = matchSystem("Miss Idaho America", idahoMs)
    expect(r.matchStatus).not.toBe("auto")
    expect(r.systemId).toBeNull()
  })

  it("still auto-matches the SAME honorific (Ms. -> Ms.)", () => {
    const r = matchSystem("Ms. Idaho America", idahoMs)
    expect(r.matchStatus).toBe("auto")
    expect(r.systemId).toBe("ms-america-id-ms")
  })
})
