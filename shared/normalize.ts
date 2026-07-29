// THE single normalization function. Imported by scripts/generate-systems.ts
// (seed time) AND by the submit Lambda matcher (run time). Never reimplement it
// elsewhere — drift between seed-time and run-time normalization silently
// destroys match rates.
//
// Rules (in order):
//   1. lowercase
//   2. strip . ' ’ , &
//   3. hyphens and slashes -> spaces
//   4. drop noise words
//   5. collapse whitespace

const NOISE_WORDS = new Set([
  "pageant",
  "pageants",
  "organization",
  "organisation",
  "org",
  "inc",
  "incorporated",
  "llc",
  "system",
  "systems",
  "scholarship",
  "competition",
  "program",
])

export function normalize(input: string): string {
  return String(input ?? "")
    .toLowerCase()
    .replace(/[.'’,&]/g, "")
    .replace(/[-/]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 0 && !NOISE_WORDS.has(w))
    .join(" ")
    .trim()
}

// Honorific tokens denote different divisions (and, for Mrs./Ms. America,
// different organizations). The matcher must never treat a pair that differs
// ONLY by one of these as a candidate.
export const HONORIFICS = new Set(["miss", "mrs", "ms", "mr"])

/**
 * True when two normalized strings are identical except that one contains an
 * honorific token where the other has a different honorific (or none) in the
 * same position set. Used to veto honorific-swap matches.
 */
export function isHonorificSwap(a: string, b: string): boolean {
  const strip = (s: string) => s.split(" ").filter((w) => !HONORIFICS.has(w)).join(" ")
  const honos = (s: string) => s.split(" ").filter((w) => HONORIFICS.has(w)).sort().join(" ")
  // Same words once honorifics are removed, but the honorific sets differ.
  return strip(a) === strip(b) && honos(a) !== honos(b)
}
