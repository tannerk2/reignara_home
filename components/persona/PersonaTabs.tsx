import Link from "next/link"
import { personas } from "@/content/personas"
import { cn } from "@/lib/utils"

/** The four persona tabs rendered as links to their subpages; the active one is highlighted. */
export function PersonaTabs({ activeId }: { activeId: string }) {
  return (
    <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-4" aria-label="Choose a role">
      {personas.map((persona) => {
        const isActive = persona.id === activeId
        const Icon = persona.icon
        return (
          <Link
            key={persona.id}
            href={`/who-its-for/${persona.id}`}
            aria-current={isActive ? "page" : undefined}
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
                "font-serif text-[18px] font-medium tracking-tight text-foreground transition-colors",
                !isActive && "text-foreground/70 group-hover:text-foreground",
              )}
            >
              {persona.label}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
