// Pure system-name matching logic. Imported by the submit Lambda AND unit tests.
// The parentOrg cascade is enforced by the CALLER passing only candidates that
// belong to the chosen org — this function never sees cross-org candidates.
import { normalize, isHonorificSwap } from "./normalize"
import { jaroWinkler } from "./jaro-winkler"
import type { MatchStatus } from "./enums"

export const AUTO_THRESHOLD = 0.92
export const REVIEW_THRESHOLD = 0.75

export interface MatchCandidate {
  systemId: string
  canonicalName: string
  normalizedName: string
  aliases: string[]
}

export interface MatchResult {
  systemId: string | null
  matchScore: number
  matchStatus: MatchStatus
  candidateId: string | null // best candidate even when not auto-linked (for review UI)
}

export function classifyScore(score: number): MatchStatus {
  if (score >= AUTO_THRESHOLD) return "auto"
  if (score >= REVIEW_THRESHOLD) return "review"
  return "new"
}

/**
 * Score `rawInput` against pre-filtered candidates (already cascaded to one org).
 * - Best Jaro-Winkler across canonical + every alias.
 * - Honorific swaps (Miss <-> Mrs. <-> Ms.) are vetoed as candidates entirely.
 */
export function matchSystem(rawInput: string, candidates: MatchCandidate[]): MatchResult {
  const input = normalize(rawInput)
  let best = 0
  let bestId: string | null = null

  for (const c of candidates) {
    const targets = [c.normalizedName, ...c.aliases.map(normalize)]
    for (const t of targets) {
      if (!t) continue
      // Veto honorific swaps — different division/org, never a valid match.
      if (isHonorificSwap(input, t)) continue
      const score = jaroWinkler(input, t)
      if (score > best) {
        best = score
        bestId = c.systemId
      }
    }
  }

  const matchStatus = classifyScore(best)
  return {
    systemId: matchStatus === "auto" ? bestId : null,
    matchScore: Number(best.toFixed(4)),
    matchStatus,
    candidateId: bestId,
  }
}

/** Top-N suggestions for the combobox (client-side + admin). Honorific swaps excluded. */
export function suggestSystems(
  rawInput: string,
  candidates: MatchCandidate[],
  limit = 5,
): Array<{ candidate: MatchCandidate; score: number }> {
  const input = normalize(rawInput)
  if (!input) return []
  return candidates
    .map((c) => {
      const targets = [c.normalizedName, ...c.aliases.map(normalize)]
      let best = 0
      for (const t of targets) {
        if (!t || isHonorificSwap(input, t)) continue
        best = Math.max(best, jaroWinkler(input, t))
      }
      return { candidate: c, score: best }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}
