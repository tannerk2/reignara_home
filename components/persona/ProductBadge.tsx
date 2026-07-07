"use client"

import { motion, useReducedMotion } from "framer-motion"

/**
 * The "We call it ___" naming reveal. Renders the branded product name as a
 * gold pill that fades/settles in a beat after the surrounding copy, so it
 * reads as an intentional reveal rather than plain body text.
 */
export function ProductBadge({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()

  return (
    <motion.span
      initial={reduce ? false : { opacity: 0, y: 4, scale: 0.96 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="mx-0.5 inline-flex items-center rounded-full bg-gold px-2.5 py-0.5 align-baseline font-display text-[0.95em] leading-none text-t1 shadow-sm"
    >
      {children}
    </motion.span>
  )
}
