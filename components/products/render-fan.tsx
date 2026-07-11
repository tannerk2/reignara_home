"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
import type { Product } from "@/lib/products"
import { cn } from "@/lib/utils"

const spring = { type: "spring" as const, stiffness: 90, damping: 20 }

/**
 * Per-depth fan geometry. depth 0 = front, higher = further back.
 * `sign` points outward (away from the copy column) so text is never covered:
 * +1 fans up-and-right, -1 fans up-and-left.
 */
function geometry(depth: number, sign: number) {
  return {
    x: sign * 11 * depth, // % of panel width, outward
    y: -8 * depth,
    rotate: sign * 5.5 * depth,
    scale: 1 - 0.05 * depth,
  }
}

/** Compact placeholder for a single screen in the fan. */
function FanPlaceholder({
  product,
  n,
  onDark,
}: {
  product: Product
  n: number
  onDark: boolean
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center rounded-xl border",
        onDark ? "border-white/15 bg-[#22201d]" : "border-border bg-card",
      )}
      style={{ aspectRatio: String(product.aspect) }}
    >
      <span
        className={cn(
          "font-mono text-[11px] tracking-widest",
          onDark ? "text-gold/80" : "text-gold",
        )}
      >
        {String(n).padStart(2, "0")}
      </span>
      <p
        className={cn(
          "mt-2 font-serif text-2xl italic md:text-3xl",
          onDark ? "text-[#f5f3ef]" : "text-ink",
        )}
      >
        {product.name}
      </p>
      <span className="mt-2 h-px w-10 bg-gold" aria-hidden />
      <code
        className={cn(
          "mt-3 px-4 text-center font-mono text-[10px] leading-tight tracking-tight",
          onDark ? "text-[#f5f3ef]/40" : "text-muted-foreground",
        )}
      >
        {`/renders/${product.slug}/screen-${n}.png`}
      </code>
    </div>
  )
}

/** One fanned screen with its own image/placeholder fallback. */
function FanPanel({
  product,
  n,
  depth,
  sign,
  onDark,
  parallaxY,
}: {
  product: Product
  n: number
  depth: number
  sign: number
  onDark: boolean
  parallaxY: ReturnType<typeof useTransform<number, number>>
}) {
  const [failed, setFailed] = useState(false)
  const g = geometry(depth, sign)
  const isFront = depth === 0
  const src = `/renders/${product.slug}/screen-${n}.png`

  return (
    <motion.div
      style={{ zIndex: 40 - depth, y: parallaxY }}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ ...spring, delay: depth * 0.08 }}
      className={cn(isFront ? "relative" : "absolute inset-0")}
      aria-hidden={!isFront}
    >
      <div
        className="origin-bottom"
        style={{
          transform: `translate(${g.x}%, ${g.y}%) rotate(${g.rotate}deg) scale(${g.scale})`,
        }}
      >
        <div
          className={cn(
            "relative w-full",
            onDark
              ? "[filter:drop-shadow(0_28px_44px_rgba(0,0,0,0.5))]"
              : "[filter:drop-shadow(0_28px_44px_rgba(26,26,26,0.18))]",
          )}
          style={{ aspectRatio: String(product.aspect) }}
        >
          {failed ? (
            <FanPlaceholder product={product} n={n} onDark={onDark} />
          ) : (
            <Image
              src={src || "/placeholder.svg"}
              alt={isFront ? product.renderAlt : ""}
              fill
              sizes="(max-width: 768px) 80vw, 42vw"
              className="object-contain"
              onError={() => setFailed(true)}
            />
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function RenderFan({
  product,
  onDark = false,
  mirrored = false,
  className,
}: {
  product: Product
  onDark?: boolean
  mirrored?: boolean
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const count = Math.max(2, Math.min(3, product.screenCount ?? 2))
  // Fan outward, away from the copy column: render-on-right fans right, render-on-left fans left.
  const sign = mirrored ? -1 : 1

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Precomputed parallax tracks (front travels most, back least) — max 3 panels.
  const yFront = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-22, 22])
  const yMid = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-14, 14])
  const yBack = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-8, 8])
  const tracks = [yFront, yMid, yBack]

  // Front panel is depth 0 and rendered last (top). Build back-to-front.
  const panels = Array.from({ length: count }, (_, i) => {
    const depth = count - 1 - i // i=0 -> deepest, i=count-1 -> front
    return { n: i + 1, depth }
  })

  // The deck is capped below full width and anchored to the inward side, so the
  // outward fan grows into free space and every screen stays within the frame.
  return (
    <div
      ref={ref}
      className={cn("relative w-full pb-[6%] pt-[14%]", className)}
      role="group"
      aria-label={product.renderAlt}
    >
      <div className={cn("relative w-[74%]", sign > 0 ? "mr-auto" : "ml-auto")}>
        {panels.map(({ n, depth }) => (
          <FanPanel
            key={n}
            product={product}
            n={n}
            depth={depth}
            sign={sign}
            onDark={onDark}
            parallaxY={tracks[Math.min(depth, tracks.length - 1)]}
          />
        ))}
      </div>
    </div>
  )
}
