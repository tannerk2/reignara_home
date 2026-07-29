"use client"

import { useEffect, useId, useRef, useState } from "react"
import { suggestSystems, type MatchCandidate } from "@/shared/match"
import { cn } from "@/lib/utils"

interface SystemCandidate extends MatchCandidate {
  state?: string
  division?: string
}

export function SystemCombobox({
  parentOrgId,
  value,
  onChange,
  id,
  describedBy,
  invalid,
}: {
  parentOrgId: string | ""
  value: string
  onChange: (v: string) => void
  id: string
  describedBy?: string
  invalid?: boolean
}) {
  const [candidates, setCandidates] = useState<SystemCandidate[]>([])
  const [suggestions, setSuggestions] = useState<SystemCandidate[]>([])
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const listId = useId()
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const blurRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Load this org's systems whenever the parent org changes (cascade).
  useEffect(() => {
    setCandidates([])
    setSuggestions([])
    setActiveIndex(-1)
    if (!parentOrgId || parentOrgId === "independent" || parentOrgId === "other") return
    let cancelled = false
    fetch(`/webinar/systems/${parentOrgId}.json`)
      .then((r) => (r.ok ? r.json() : []))
      .then((rows: SystemCandidate[]) => {
        if (!cancelled) setCandidates(Array.isArray(rows) ? rows : [])
      })
      .catch(() => {
        if (!cancelled) setCandidates([])
      })
    return () => {
      cancelled = true
    }
  }, [parentOrgId])

  function recompute(input: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      const results = suggestSystems(input, candidates, 5).map((r) => r.candidate as SystemCandidate)
      setSuggestions(results)
      setOpen(results.length > 0)
      setActiveIndex(-1)
    }, 250)
  }

  function choose(c: SystemCandidate) {
    onChange(c.canonicalName)
    setOpen(false)
    setActiveIndex(-1)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp") && suggestions.length) {
      setOpen(true)
      return
    }
    if (!open) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => (i + 1) % suggestions.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1))
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        e.preventDefault()
        choose(suggestions[activeIndex])
      }
    } else if (e.key === "Escape") {
      setOpen(false)
      setActiveIndex(-1)
    }
  }

  const inputCls = cn(
    "min-h-[48px] w-full rounded-xl border bg-card px-3.5 text-[16px] text-t1 outline-none transition-colors focus:border-sage",
    invalid ? "border-red-400" : "border-border",
  )

  return (
    <div className="relative">
      <input
        id={id}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={activeIndex >= 0 ? `${listId}-opt-${activeIndex}` : undefined}
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
        autoComplete="off"
        className={inputCls}
        value={value}
        placeholder="Start typing your title or system…"
        onChange={(e) => {
          onChange(e.target.value)
          recompute(e.target.value)
        }}
        onFocus={() => {
          if (suggestions.length) setOpen(true)
        }}
        onKeyDown={onKeyDown}
        onBlur={() => {
          // Delay so option mousedown can register.
          blurRef.current = setTimeout(() => setOpen(false), 120)
        }}
      />
      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-1 max-h-72 w-full overflow-auto rounded-xl border border-border bg-card p-1 shadow-xl"
        >
          {suggestions.map((c, i) => (
            <li
              key={c.systemId}
              id={`${listId}-opt-${i}`}
              role="option"
              aria-selected={i === activeIndex}
              className={cn(
                "cursor-pointer rounded-lg px-3 py-2.5 text-[15px]",
                i === activeIndex ? "bg-bg text-t1" : "text-t2 hover:bg-bg",
              )}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseDown={(e) => {
                e.preventDefault()
                if (blurRef.current) clearTimeout(blurRef.current)
                choose(c)
              }}
            >
              <span className="font-medium text-t1">{c.canonicalName}</span>
              {c.state && <span className="ml-2 text-[13px] text-t3">{c.state}</span>}
            </li>
          ))}
          <li className="border-t border-border px-3 py-2 text-[13px] text-t3">
            Don&apos;t see yours? Type it in — we&apos;ll add it.
          </li>
        </ul>
      )}
    </div>
  )
}
