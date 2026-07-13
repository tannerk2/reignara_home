"use client"

import { motion, useReducedMotion } from "motion/react"
import type { Product } from "@/lib/products"
import { Eyebrow, Headline, TagRow } from "@/components/products/kit"
import { RenderStage } from "@/components/products/render-stage"
import { RenderFan } from "@/components/products/render-fan"
import { cn } from "@/lib/utils"

const spring = { type: "spring" as const, stiffness: 100, damping: 22 }

function Copy({ product, onDark }: { product: Product; onDark: boolean }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{ ...spring, staggerChildren: 0.1 }}
      className="flex flex-col items-start gap-6"
    >
      <Eyebrow>{product.eyebrow}</Eyebrow>
      <Headline className={onDark ? "text-[#f5f3ef]" : undefined}>{product.headline}</Headline>
      <p
        className={cn(
          "max-w-md text-lg leading-relaxed",
          onDark ? "text-[#f5f3ef]/70" : "text-muted-foreground",
        )}
      >
        {product.description}
      </p>
      <TagRow tags={product.tags} tone={onDark ? "onDark" : "sage"} className="mt-1" />
    </motion.div>
  )
}

export function SectionShell({
  product,
  index,
}: {
  product: Product
  index: number
}) {
  const onDark = product.layout === "dark"
  const mirrored = index % 2 === 1
  const isMobile = product.layout === "mobile"

  return (
    <section
      id={product.slug}
      aria-labelledby={`${product.slug}-heading`}
      className={cn(
        "scroll-mt-24 overflow-x-clip",
        onDark
          ? "bg-ink text-[#f5f3ef]"
          : product.layout === "standalone"
            ? "border-y border-border bg-card"
            : "bg-background",
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-7xl px-6 md:px-10",
          onDark ? "py-20 sm:py-32 md:py-44" : "py-16 sm:py-24 md:py-40",
        )}
      >
        <div className="grid grid-cols-1 items-center gap-14 md:gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Copy — 5/12 */}
          <div className={cn("lg:col-span-5", mirrored ? "lg:order-2 lg:col-start-8" : "lg:order-1")}>
            {/* heading id hook for aria-labelledby */}
            <span id={`${product.slug}-heading`} className="sr-only">
              {product.name}: {product.headline}
            </span>
            <Copy product={product} onDark={onDark} />
          </div>

          {/* Render — 7/12 */}
          <div className={cn("lg:col-span-7", mirrored ? "lg:order-1 lg:col-start-1" : "lg:order-2")}>
            {product.display === "fan" ? (
              <RenderFan
                product={product}
                onDark={onDark}
                mirrored={mirrored}
                className={cn("mx-auto", isMobile ? "max-w-xs" : "max-w-none")}
              />
            ) : (
              <RenderStage
                product={product}
                onDark={onDark}
                className={cn("mx-auto", isMobile ? "max-w-sm" : "max-w-none")}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
