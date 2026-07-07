"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion"
import {
  LayoutDashboard,
  Crown,
  Sparkles,
  Handshake,
  MessageSquare,
  Scale,
  CalendarCheck,
  Wallet,
  BarChart3,
  Smartphone,
  type LucideIcon,
} from "lucide-react"
import { personas, type Callout } from "@/content/personas"
import { ProductBadge } from "./ProductBadge"

const icons: Record<string, LucideIcon> = {
  LayoutDashboard,
  Crown,
  Sparkles,
  Handshake,
  MessageSquare,
  Scale,
  CalendarCheck,
  Wallet,
  BarChart3,
  Smartphone,
}

function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = icons[name] ?? Sparkles
  return <Cmp className={className} aria-hidden="true" />
}

function CalloutLine({ callout }: { callout: Callout }) {
  return (
    <p className="text-[14px] leading-relaxed text-t2">
      {callout.before}
      <ProductBadge>{callout.product}</ProductBadge>
      {callout.after}
    </p>
  )
}

export function PersonaExperience() {
  const [activeIndex, setActiveIndex] = useState(0)
  const reduce = useReducedMotion()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const active = personas[activeIndex]

  function onTabKeyDown(e: React.KeyboardEvent) {
    let next = activeIndex
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (activeIndex + 1) % personas.length
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (activeIndex - 1 + personas.length) % personas.length
    else if (e.key === "Home") next = 0
    else if (e.key === "End") next = personas.length - 1
    else return
    e.preventDefault()
    setActiveIndex(next)
    tabRefs.current[next]?.focus()
  }

  // Motion presets (respect prefers-reduced-motion)
  const panelVariants: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
        exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
      }

  const revealFrom = (i: number) =>
    reduce
      ? { initial: false as const, whileInView: undefined }
      : {
          initial: { opacity: 0, y: 24, scale: 0.985 },
          whileInView: { opacity: 1, y: 0, scale: 1 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.5, delay: 0.05 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <div>
      {/* Persona selector */}
      <div
        role="tablist"
        aria-label="Choose who you are"
        onKeyDown={onTabKeyDown}
        className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
      >
        {personas.map((p, i) => {
          const selected = i === activeIndex
          return (
            <motion.button
              key={p.id}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              role="tab"
              id={`persona-tab-${p.id}`}
              aria-selected={selected}
              aria-controls={`persona-panel-${p.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(i)}
              whileHover={reduce ? undefined : { y: -3 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              animate={reduce ? undefined : { opacity: selected ? 1 : 0.72 }}
              transition={{ duration: 0.25 }}
              className={`group relative flex flex-col items-start gap-2 rounded-2xl border bg-card p-4 text-left transition-shadow sm:p-5 ${
                selected ? "border-gold shadow-lg" : "border-border hover:border-sage/50"
              }`}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                  selected ? "bg-gold/20" : "bg-sage/10"
                }`}
              >
                <Icon name={p.icon} className={`h-5 w-5 ${selected ? "text-gold" : "text-sage"}`} />
              </span>
              <span className="font-display text-[18px] leading-tight text-t1">{p.label}</span>
              <span className="text-[13px] leading-snug text-t2">{p.teaser}</span>
              {selected && (
                <motion.span
                  layoutId={reduce ? undefined : "persona-indicator"}
                  className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-gold"
                />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Persona panel */}
      <div className="mx-auto mt-12 max-w-4xl sm:mt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            role="tabpanel"
            id={`persona-panel-${active.id}`}
            aria-labelledby={`persona-tab-${active.id}`}
            tabIndex={0}
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="focus:outline-none"
          >
            {/* Headline + intro */}
            <header className="text-center">
              <h2 className="mx-auto max-w-3xl font-display text-[30px] sm:text-[40px] lg:text-[44px] leading-[1.1] tracking-tight text-t1">
                {active.headline}
              </h2>
              <div className="mx-auto mt-5 max-w-2xl space-y-4">
                {active.intro.map((para, i) => (
                  <p key={i} className="text-[16px] sm:text-[17px] leading-relaxed text-t2">
                    {para}
                  </p>
                ))}
              </div>
            </header>

            {/* Foundation — animates in first, as the base being laid */}
            <motion.section
              {...revealFrom(0)}
              className="relative mt-12 overflow-hidden rounded-2xl border border-border bg-card p-6 sm:mt-16 sm:p-8"
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sage via-gold to-sage" aria-hidden="true" />
              <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.2em] text-sage">
                {active.foundationEyebrow}
              </p>
              <div className="flex items-start gap-4">
                <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 sm:flex">
                  <LayoutDashboard className="h-5 w-5 text-gold" aria-hidden="true" />
                </span>
                <div className="space-y-4">
                  <p className="text-[16px] leading-relaxed text-t1">{active.foundation.description}</p>
                  <CalloutLine callout={active.foundation.callout} />
                  {active.foundation.trailing && (
                    <p className="text-[15px] leading-relaxed text-t2">{active.foundation.trailing}</p>
                  )}
                </div>
              </div>
            </motion.section>

            {/* Modules — stagger/settle in beneath the foundation */}
            <div className="mt-10 sm:mt-14">
              <p className="mb-6 text-center text-[12px] font-medium uppercase tracking-[0.2em] text-sage">
                {active.modulesEyebrow}
              </p>
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                {active.modules.map((m, i) => {
                  const warm = i % 2 === 0
                  return (
                    <motion.article
                      key={m.id}
                      {...revealFrom(i)}
                      whileHover={reduce ? undefined : { y: -4 }}
                      className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-lg sm:p-6"
                    >
                      <span
                        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-full ${
                          warm ? "bg-gold/15" : "bg-sage/10"
                        }`}
                      >
                        <Icon name={m.icon} className={`h-5 w-5 ${warm ? "text-gold" : "text-sage"}`} />
                      </span>
                      <h3 className="font-display text-[19px] leading-snug text-t1">{m.title}</h3>
                      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-t2">{m.description}</p>
                      <div className="mt-4 border-t border-border pt-4">
                        <CalloutLine callout={m.callout} />
                      </div>
                    </motion.article>
                  )
                })}
              </div>
            </div>

            {/* Closing */}
            <motion.p
              {...revealFrom(active.modules.length)}
              className="mx-auto mt-12 max-w-2xl text-center font-display text-[22px] sm:text-[26px] leading-snug text-t1 sm:mt-16"
            >
              {active.closing}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
