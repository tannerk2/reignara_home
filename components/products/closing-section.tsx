"use client"

import { motion, useReducedMotion } from "motion/react"
import { Headline } from "@/components/products/kit"

export function ClosingSection() {
  const reduce = useReducedMotion()

  return (
    <section
      id="demo"
      aria-labelledby="closing-heading"
      className="bg-background px-6 py-24 text-center sm:py-32 md:px-10 md:py-48"
    >
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
        whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ type: "spring", stiffness: 100, damping: 22 }}
        className="mx-auto flex max-w-3xl flex-col items-center"
      >
        <span className="h-px w-24 bg-gold" aria-hidden />
        <Headline as="h2" className="mt-10">
          <span id="closing-heading">One platform. Every crown moment.</span>
        </Headline>
        <a
          href="mailto:benson@reignara.com?subject=Reignara%20%E2%80%94%20Request%20a%20demo"
          className="mt-12 rounded-full bg-gold px-8 py-4 text-base font-medium text-t1 transition-colors hover:bg-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Request a demo
        </a>
      </motion.div>
    </section>
  )
}
