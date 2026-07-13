import { ArrowRight } from "lucide-react"
import type { Persona } from "@/content/personas"
import { cn } from "@/lib/utils"

/** Renders a single persona's full content: headline, intro, foundation, modules, closing + CTA. */
export function PersonaDetail({ persona }: { persona: Persona }) {
  return (
    <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-500">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-balance font-serif text-3xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]">
          {persona.headline}
        </h1>
        <div className="mt-6 space-y-4">
          {persona.intro.map((paragraph, i) => (
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
              {persona.foundation.map((paragraph, i) => (
                <p key={i} className="text-pretty leading-relaxed text-bg/80">
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="mt-6 text-pretty font-serif text-lg italic leading-relaxed text-bg/90">
              {persona.foundationReason.split("Director")[0]}
              <span className="mx-1 inline-flex items-center rounded-full bg-gold px-3 py-0.5 font-sans text-sm font-semibold not-italic text-t1">
                Director
              </span>
              {persona.foundationReason.split("Director")[1]}
            </p>
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="mt-14">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-sage sm:text-left">
          {persona.toolsLabel}
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {persona.modules.map((module, index) => {
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
                <h3 className="mt-5 font-serif text-xl font-medium leading-snug tracking-tight text-foreground">
                  {module.title}
                </h3>
                <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {module.description}
                </p>
                <div className="mt-5 border-t border-border pt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground/80">
                      We call it
                    </span>
                    <span className="inline-flex items-center rounded-full bg-gold px-3 py-0.5 font-serif text-sm font-semibold text-t1">
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
        <p className="text-balance font-serif text-2xl font-medium leading-snug text-foreground sm:text-[1.75rem]">
          {persona.closing}
        </p>
        <a
          href={persona.cta.href}
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-t1 transition-colors duration-300 hover:bg-gold/90"
        >
          {persona.cta.label}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
        </a>
      </div>
    </div>
  )
}
