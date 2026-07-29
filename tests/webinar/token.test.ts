import { describe, it, expect } from "vitest"
import { evaluateToken, resolveJoinToken, newJoinToken } from "../../shared/token"

const NOW = 1_000_000

describe("evaluateToken (redirect Lambda logic)", () => {
  it("redirects a valid, unrevoked, unexpired token", () => {
    expect(evaluateToken({ found: true, tokenRevoked: false, expiresAtMs: NOW + 1000 }, NOW)).toBe("redirect")
  })
  it("rejects a missing token (no query param -> not found)", () => {
    expect(evaluateToken({ found: false }, NOW)).toBe("invalid")
    expect(evaluateToken(null, NOW)).toBe("invalid")
  })
  it("rejects an unknown token (lookup returned nothing)", () => {
    expect(evaluateToken({ found: false }, NOW)).toBe("invalid")
  })
  it("rejects an expired token", () => {
    expect(evaluateToken({ found: true, expiresAtMs: NOW - 1 }, NOW)).toBe("invalid")
  })
  it("rejects a revoked token even if unexpired", () => {
    expect(evaluateToken({ found: true, tokenRevoked: true, expiresAtMs: NOW + 10_000 }, NOW)).toBe("invalid")
  })
})

describe("resolveJoinToken (dedup/reuse, R6)", () => {
  it("reuses an existing token on update", () => {
    expect(resolveJoinToken("existing-token")).toBe("existing-token")
  })
  it("mints a new token only when absent", () => {
    expect(resolveJoinToken(undefined)).toMatch(/^[A-Za-z0-9_-]+$/)
    expect(resolveJoinToken("")).not.toBe("")
  })
  it("mints unique tokens", () => {
    expect(newJoinToken()).not.toBe(newJoinToken())
  })
})
