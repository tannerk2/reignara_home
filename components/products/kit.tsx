import { cn } from "@/lib/utils"

export function Eyebrow({
  children,
  flanked = false,
  className,
}: {
  children: React.ReactNode
  /** thin gold rules flanking the label (used on the hero) */
  flanked?: boolean
  className?: string
}) {
  if (flanked) {
    return (
      <div className={cn("flex items-center justify-center gap-4", className)}>
        <span className="h-px w-10 bg-gold/60" aria-hidden />
        <span className="eyebrow">{children}</span>
        <span className="h-px w-10 bg-gold/60" aria-hidden />
      </div>
    )
  }
  return <p className={cn("eyebrow", className)}>{children}</p>
}

export function Headline({
  children,
  as: Tag = "h2",
  className,
}: {
  children: React.ReactNode
  as?: "h1" | "h2" | "h3"
  className?: string
}) {
  return (
    <Tag
      className={cn(
        "font-display leading-[1.04] tracking-tight text-balance",
        "text-[2.5rem] sm:text-5xl md:text-7xl",
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export function TagRow({
  tags,
  tone = "sage",
  className,
}: {
  tags: string[]
  tone?: "sage" | "onDark"
  className?: string
}) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <li
          key={tag}
          className={cn(
            "rounded-full border px-3 py-1 text-[13px] leading-none",
            tone === "sage"
              ? "border-sage/40 bg-sage/12 text-ink/75"
              : "border-white/20 bg-white/5 text-[#f5f3ef]/80",
          )}
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}
