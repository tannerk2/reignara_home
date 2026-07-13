"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { products } from "@/lib/products"
import { cn } from "@/lib/utils"

type Shot = { src: string; alt: string; aspect: number; label: string }

/** Flatten every product's screens into one ordered list of screenshots. */
function buildShots(): Shot[] {
  const out: Shot[] = []
  for (const p of products) {
    if (p.display === "fan") {
      const count = Math.max(2, Math.min(5, p.screenCount ?? 2))
      for (let i = 1; i <= count; i++) {
        out.push({
          src: `/renders/${p.slug}/screen-${i}.png`,
          alt: `${p.name} — preview ${i}`,
          aspect: p.aspect,
          label: p.name,
        })
      }
    } else {
      out.push({ src: p.assets.hero, alt: p.renderAlt, aspect: p.aspect, label: p.name })
    }
  }
  return out
}

/**
 * A center-focused "coverflow" of every product screenshot. The focused shot is
 * full size and sharp; neighbors sit to the sides, smaller and dimmed. Navigate
 * by drag/swipe, arrows, clicking a side shot, or arrow keys. Screenshots that
 * fail to load (e.g. a product with no render yet) drop out gracefully.
 */
export function HeroCarousel() {
  const reduce = useReducedMotion()
  const allShots = useMemo(buildShots, [])
  const [failed, setFailed] = useState<Set<string>>(() => new Set())
  const shots = useMemo(() => allShots.filter((s) => !failed.has(s.src)), [allShots, failed])

  const [index, setIndex] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)
  const [stageW, setStageW] = useState(0)

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const update = () => setStageW(el.clientWidth)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (index > shots.length - 1) setIndex(Math.max(0, shots.length - 1))
  }, [shots.length, index])

  const step = Math.min(stageW * 0.46, 460)
  const clamp = (i: number) => Math.min(shots.length - 1, Math.max(0, i))
  const go = (dir: number) => setIndex((i) => clamp(i + dir))
  const current = shots[index]

  return (
    <div className="w-full">
      <div
        ref={stageRef}
        className="relative mx-auto h-[38vh] max-h-[460px] min-h-[240px] w-full overflow-hidden"
        role="group"
        aria-roledescription="carousel"
        aria-label="Product previews"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault()
            go(1)
          } else if (e.key === "ArrowLeft") {
            e.preventDefault()
            go(-1)
          }
        }}
      >
        <motion.div
          className="absolute inset-0"
          drag={reduce ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.14}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60 || info.velocity.x < -400) go(1)
            else if (info.offset.x > 60 || info.velocity.x > 400) go(-1)
          }}
        >
          {shots.map((shot, i) => {
            const offset = i - index
            const abs = Math.abs(offset)
            if (abs > 2) return null
            const isCenter = offset === 0
            return (
              <div
                key={shot.src}
                className="absolute left-1/2 top-1/2"
                style={{ transform: "translate(-50%, -50%)", zIndex: 50 - abs }}
              >
                <motion.button
                  type="button"
                  aria-label={isCenter ? undefined : `Show ${shot.label}`}
                  aria-hidden={!isCenter}
                  tabIndex={isCenter ? 0 : -1}
                  onClick={() => !isCenter && setIndex(i)}
                  initial={false}
                  animate={{
                    x: offset * step,
                    scale: reduce ? 1 : isCenter ? 1 : Math.max(0.7, 1 - 0.16 * abs),
                    opacity: isCenter ? 1 : Math.max(0.4, 0.72 - 0.2 * (abs - 1)),
                  }}
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 130, damping: 26 }}
                  className={cn("origin-center", isCenter ? "cursor-default" : "cursor-pointer")}
                >
                  <div
                    className={cn(
                      "relative h-[34vh] max-h-[420px] min-h-[220px] overflow-hidden rounded-xl border border-border bg-card",
                      isCenter
                        ? "shadow-[0_36px_70px_-28px_rgba(26,26,26,0.4)]"
                        : "shadow-[0_18px_40px_-24px_rgba(26,26,26,0.35)]",
                    )}
                    style={{ aspectRatio: String(shot.aspect) }}
                  >
                    <Image
                      src={shot.src}
                      alt={isCenter ? shot.alt : ""}
                      fill
                      sizes="(max-width: 768px) 80vw, 45vw"
                      className="object-cover"
                      draggable={false}
                      onError={() =>
                        setFailed((prev) => {
                          const next = new Set(prev)
                          next.add(shot.src)
                          return next
                        })
                      }
                    />
                    {!isCenter && <span className="absolute inset-0 bg-background/25" aria-hidden />}
                  </div>
                </motion.button>
              </div>
            )
          })}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="mt-7 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={index === 0}
          aria-label="Previous preview"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink transition-colors hover:bg-ink hover:text-background disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <p className="min-w-28 text-center font-serif text-lg italic text-ink">{current?.label}</p>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={index === shots.length - 1}
          aria-label="Next preview"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink transition-colors hover:bg-ink hover:text-background disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
