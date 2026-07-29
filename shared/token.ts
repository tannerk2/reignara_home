// Join-token logic. Server-only (uses node crypto) — never imported by client
// components. Pure functions are unit-tested directly.
import { randomBytes } from "crypto"

export function newJoinToken(): string {
  return randomBytes(24).toString("base64url")
}

/** R6: reuse an existing token on update; only mint one when absent. */
export function resolveJoinToken(existing?: string | null): string {
  return existing && existing.length > 0 ? existing : newJoinToken()
}

export type TokenDecision = "redirect" | "invalid"

export interface TokenState {
  found: boolean
  tokenRevoked?: boolean
  expiresAtMs?: number
}

/** R9/R10: redirect only when found, not revoked, not expired. */
export function evaluateToken(state: TokenState | null | undefined, nowMs: number): TokenDecision {
  if (!state || !state.found) return "invalid"
  if (state.tokenRevoked) return "invalid"
  if (typeof state.expiresAtMs === "number" && nowMs > state.expiresAtMs) return "invalid"
  return "redirect"
}
