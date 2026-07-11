"use client"

import { motion, useReducedMotion } from "motion/react"
import { productBySlug } from "@/lib/products"
import { Eyebrow } from "@/components/products/kit"
import { RenderStage } from "@/components/products/render-stage"

export function ProductsHero() {
  const reduce = useReducedMotion()
  const director = productBySlug.director

  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <section
      id="top"
      className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 pb-16 pt-28 text-center md:px-10"
    >
      <motion.div {...rise(0)}>
        <Eyebrow flanked>Reignara · The Meridian Platform</Eyebrow>
      </motion.div>

      <motion.h1
        {...rise(0.08)}
        className="mt-6 max-w-4xl text-balance font-serif text-6xl font-semibold leading-[0.98] tracking-tight md:text-8xl"
      >
        The stage is set.
      </motion.h1>

      <motion.p
        {...rise(0.16)}
        className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground md:text-xl"
      >
        Software built for the people who build pageants.
      </motion.p>

      <motion.div {...rise(0.28)} className="mt-14 w-full max-w-5xl">
        <RenderStage product={director} className="mx-auto" />
      </motion.div>
    </section>
  )
}
