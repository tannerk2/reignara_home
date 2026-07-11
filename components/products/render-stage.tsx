"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
import type { Product } from "@/lib/products"
import { cn } from "@/lib/utils"

const spring = { type: "spring" as const, stiffness: 100, damping: 22 }

/**
 * A dignified placeholder shown when a render asset is missing.
 * White card at the asset's aspect ratio, product wordmark in Cormorant italic,
 * a thin gold rule, and the expected file path in muted mono.
 */
function AssetPlaceholder({
  product,
  onDark,
}: {
  product: Product
  onDark?: boolean
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center rounded-xl border",
        onDark ? "border-white/15 bg-white/[0.03]" : "border-border bg-card print-shadow",
      )}
      style={{ aspectRatio: String(product.aspect) }}
    >
      <p
        className={cn(
          "font-serif text-4xl italic md:text-5xl",
          onDark ? "text-[#f5f3ef]" : "text-ink",
        )}
      >
        {product.name}
      </p>
      <span className="mt-3 h-px w-16 bg-gold" aria-hidden />
      <code
        className={cn(
          "mt-5 font-mono text-[11px] tracking-tight",
          onDark ? "text-[#f5f3ef]/45" : "text-muted-foreground",
        )}
      >
        {product.assets.hero}
      </code>
    </div>
  )
}

export function RenderStage({
  product,
  onDark = false,
  className,
}: {
  product: Product
  onDark?: boolean
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [heroFailed, setHeroFailed] = useState(false)
  const [detailFailed, setDetailFailed] = useState(false)
  const [videoOk, setVideoOk] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-24, 24])
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.97, 1])
  // second render sits behind at 60% of the parallax distance
  const yBehind = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-14, 14])

  const showPlaceholder = heroFailed && !videoOk
  const hasSecondRender = !!product.assets.detail1 && !detailFailed && !showPlaceholder

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      {/* second render layered behind for depth */}
      {hasSecondRender && (
        <motion.div
          aria-hidden
          style={{ y: yBehind }}
          className="pointer-events-none absolute inset-0 z-0 translate-x-[6%] translate-y-[6%] opacity-70"
        >
          <div className="relative w-full" style={{ aspectRatio: String(product.aspect) }}>
            <Image
              src={product.assets.detail1 as string}
              alt=""
              fill
              sizes="(max-width: 768px) 90vw, 45vw"
              className="object-contain"
              onError={() => setDetailFailed(true)}
            />
          </div>
        </motion.div>
      )}

      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
        whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={spring}
        style={{ y, scale }}
        className="relative z-10"
      >
        {showPlaceholder ? (
          <AssetPlaceholder product={product} onDark={onDark} />
        ) : product.assets.heroVideo && videoOk ? (
          <video
            className="w-full"
            style={{ aspectRatio: String(product.aspect) }}
            autoPlay
            muted
            loop
            playsInline
            poster={product.assets.hero}
          >
            <source src={product.assets.heroVideo} type="video/webm" />
          </video>
        ) : (
          <div className="relative w-full" style={{ aspectRatio: String(product.aspect) }}>
            <Image
              src={product.assets.hero}
              alt={product.renderAlt}
              fill
              sizes="(max-width: 768px) 90vw, 55vw"
              className="object-contain"
              onError={() => setHeroFailed(true)}
              priority={product.slug === "director"}
            />
          </div>
        )}
      </motion.div>

      {/* Probe for an optional hero video; enables it only if it actually loads. */}
      {product.assets.heroVideo && !videoOk && !heroFailed && (
        <video
          aria-hidden
          className="hidden"
          muted
          playsInline
          preload="metadata"
          onLoadedData={() => setVideoOk(true)}
        >
          <source src={product.assets.heroVideo} type="video/webm" />
        </video>
      )}
    </div>
  )
}
