"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { personas } from "@/content/personas"
import { cn } from "@/lib/utils"

export function WhoIsReignaraFor() {
  const [activeId, setActiveId] = useState(personas[0].id)
  const active = personas.find((p) => p.id === activeId) ?? personas[0]

  // Deep-link preselect: /who-its-for/?role=titleholders
  useEffect(() => {
    const role = new URLSearchParams(window.location.search).get("role")
    if (role && personas.some((p) => p.id === role)) setActiveId(role)
  }, [])

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      {/* Section header */}
      <div className="flex flex-col items-center text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-sage">Who it&apos;s for</p>
        <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          One platform, every role in your program.
        </h2>
        <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Everyone runs on the same connected foundation. Choose your role to see exactly how reignara works for you.
        </p>
      </div>

      {/* Persona selector */}
      <div
        className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-4"
        role="tablist"
        aria-label="Select a role"
      >
        {personas.map((persona) => {
          const isActive = persona.id === activeId
          const Icon = persona.icon
          return (
            <button
              key={persona.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(persona.id)}
              className={cn(
                "group flex flex-col items-center gap-3 rounded-2xl border bg-card px-4 py-5 text-center transition-all duration-300 ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "motion-safe:hover:-translate-y-1",
                isActive
                  ? "border-transparent shadow-[0_18px_40px_-22px_rgba(26,26,26,0.45)] ring-1 ring-gold/70"
                  : "border-border shadow-sm hover:shadow-md",
              )}
            >
              <span
                className={cn(
                  "flex size-11 items-center justify-center rounded-full transition-colors duration-300",
                  isActive ? "bg-gold/20 text-gold" : "bg-sage/15 text-sage",
                )}
              >
                <Icon className="size-5" strokeWidth={1.75} />
              </span>
              <span
                className={cn(
                  "text-sm font-semibold tracking-tight text-foreground transition-colors",
                  !isActive && "text-foreground/70 group-hover:text-foreground",
                )}
              >
                {persona.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Content area */}
      <div
        key={active.id}
        className="mt-16 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-500"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-balance font-display text-3xl leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]">
            {active.headline}
          </h3>
          <div className="mt-6 space-y-4">
            {active.intro.map((paragraph, i) => (
              <p key={i} className="text-pretty leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Foundation callout — dark slab */}
        <div className="mx-auto mt-14 max-w-4xl rounded-2xl bg-dark-slab p-7 text-bg sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div className="flex-1">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-sage">The Foundation</p>
              <div className="mt-5 space-y-4">
                {active.foundation.map((paragraph, i) => (
                  <p key={i} className="text-pretty leading-relaxed text-bg/80">
                    {paragraph}
                  </p>
                ))}
              </div>
              <p className="mt-6 text-pretty font-display text-lg italic leading-relaxed text-bg/90">
                {active.foundationReason.split("Director")[0]}
                <span className="mx-1 inline-flex items-center rounded-full bg-gold px-3 py-0.5 font-sans text-sm font-semibold not-italic text-t1">
                  Director
                </span>
                {active.foundationReason.split("Director")[1]}
              </p>
            </div>
          </div>
        </div>

        {/* Modules */}
        <div className="mt-14">
          <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-sage sm:text-left">
            {active.toolsLabel}
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {active.modules.map((module, index) => {
              const Icon = module.icon
              const tintGold = index % 2 === 0
              return (
                <article
                  key={module.name}
                  className={cn(
                    "group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 ease-out",
                    "motion-safe:hover:-translate-y-1 hover:shadow-[0_20px_44px_-26px_rgba(26,26,26,0.5)]",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-11 items-center justify-center rounded-full",
                      tintGold ? "bg-gold/15 text-gold" : "bg-sage/15 text-sage",
                    )}
                  >
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <h4 className="mt-5 font-display text-xl leading-snug tracking-tight text-foreground">
                    {module.title}
                  </h4>
                  <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {module.description}
                  </p>
                  <div className="mt-5 border-t border-border pt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground/80">
                        We call it
                      </span>
                      <span className="inline-flex items-center rounded-full bg-gold px-3 py-0.5 font-display text-sm font-semibold text-t1">
                        {module.name}
                      </span>
                    </div>
                    {module.reason ? (
                      <p className="mt-2.5 text-pretty text-sm leading-relaxed text-muted-foreground/90">
                        {module.reason}
                      </p>
                    ) : null}
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        {/* Closing + persona CTA */}
        <div className="mx-auto mt-16 max-w-3xl text-center">
          <p className="text-balance font-display text-2xl leading-snug text-foreground sm:text-[1.75rem]">
            {active.closing}
          </p>
          <a
            href={active.cta.href}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-t1 transition-colors duration-300 hover:bg-gold/90"
          >
            {active.cta.label}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  )
}
