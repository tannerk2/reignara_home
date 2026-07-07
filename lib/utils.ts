// Minimal className joiner (dependency-free). Filters out falsey values.
export function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ")
}
