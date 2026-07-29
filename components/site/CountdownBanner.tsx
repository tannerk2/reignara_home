"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { WEBINAR_START_MS, LIVE_WINDOW_MS, WEBINAR_TZ_LABEL } from "@/shared/webinar"

const DISMISS_COOKIE = "reignara_webinar_banner_dismissed"

function isDismissed(): boolean {
  if (typeof document === "undefined") return false
  return document.cookie.split("; ").some((c) => c.startsWith(`${DISMISS_COOKIE}=1`))
}

function dismissForDays(days: number) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `${DISMISS_COOKIE}=1; expires=${expires}; path=/; samesite=lax`
}

function pad(n: number): string {
  return String(n).padStart(2, "0")
}

export function CountdownBanner() {
  // now === null until mounted, so SSR and first client render match (reserves
  // height with no ticking numbers -> no hydration mismatch, no layout shift).
  const [now, setNow] = useState<number | null>(null)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (isDismissed()) {
      setHidden(true)
      return
    }
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  if (hidden) return null

  const remaining = now === null ? null : WEBINAR_START_MS - now
  const isLive = remaining !== null && remaining <= 0 && remaining > -LIVE_WINDOW_MS
  const isOver = remaining !== null && remaining <= -LIVE_WINDOW_MS

  // Past the live window: remove the banner (event finished).
  if (isOver) return null

  let countdown: React.ReactNode = <span className="tabular-nums">&nbsp;</span>
  if (remaining !== null && remaining > 0) {
    const totalSec = Math.floor(remaining / 1000)
    const d = Math.floor(totalSec / 86400)
    const h = Math.floor((totalSec % 86400) / 3600)
    const m = Math.floor((totalSec % 3600) / 60)
    const s = totalSec % 60
    countdown = (
      <span className="tabular-nums font-medium">
        {d}d {pad(h)}h {pad(m)}m {pad(s)}s
      </span>
    )
  }

  return (
    <div
      role="region"
      aria-label="Live webinar countdown"
      className="relative h-11 w-full bg-dark-slab text-bg"
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center gap-3 px-10 text-[13px] sm:text-[14px]">
        {isLive ? (
          <p className="truncate">
            <span className="font-semibold text-gold">We&apos;re live now</span>
            <span className="mx-2 hidden sm:inline">—</span>{" "}
            <Link href="/webinar" className="underline underline-offset-2 hover:text-gold">
              join us
            </Link>
          </p>
        ) : (
          <p
            className="flex items-center gap-2 truncate"
            aria-live="off"
            aria-label={`Live Meridian webinar on ${WEBINAR_TZ_LABEL}`}
          >
            <span className="hidden text-bg/70 sm:inline">Live Meridian demo in</span>
            <span className="text-gold">{countdown}</span>
            <span className="mx-1 text-bg/30">·</span>
            <Link href="/webinar" className="font-medium underline underline-offset-2 hover:text-gold">
              Join the Webinar
            </Link>
          </p>
        )}
      </div>
      <button
        onClick={() => {
          dismissForDays(7)
          setHidden(true)
        }}
        aria-label="Dismiss webinar banner"
        className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-bg/70 hover:bg-bg/10 hover:text-bg"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
