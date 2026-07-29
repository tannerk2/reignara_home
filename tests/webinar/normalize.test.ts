import { describe, it, expect } from "vitest"
import { normalize, isHonorificSwap } from "../../shared/normalize"

describe("normalize", () => {
  it("lowercases, strips punctuation, and drops noise words", () => {
    expect(normalize("Miss Alabama's Teen")).toBe("miss alabamas teen")
    expect(normalize("Miss Alabama Organization")).toBe("miss alabama")
    expect(normalize("Miss Idaho Pageant")).toBe("miss idaho")
    expect(normalize("Idaho America Pageants, Inc.")).toBe("idaho america")
  })

  it("turns hyphens and slashes into spaces", () => {
    expect(normalize("Miss Teen-USA / Idaho")).toBe("miss teen usa idaho")
  })

  it("matches the seeded normalized_name for known rows", () => {
    expect(normalize("Miss Idaho")).toBe("miss idaho")
    expect(normalize("Mrs. Idaho America")).toBe("mrs idaho america")
  })
})

describe("isHonorificSwap", () => {
  it("flags Mrs. vs Ms. of the same base name", () => {
    expect(isHonorificSwap("mrs idaho america", "ms idaho america")).toBe(true)
  })
  it("flags Miss vs Mrs.", () => {
    expect(isHonorificSwap("miss idaho", "mrs idaho")).toBe(true)
  })
  it("does not flag genuinely different names", () => {
    expect(isHonorificSwap("miss idaho", "miss iowa")).toBe(false)
  })
  it("does not flag identical strings", () => {
    expect(isHonorificSwap("miss idaho", "miss idaho")).toBe(false)
  })
})
