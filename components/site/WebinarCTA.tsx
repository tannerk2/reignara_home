import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function WebinarCTA({
  className,
  children = "Join the Webinar",
  variant = "solid",
}: {
  className?: string
  children?: React.ReactNode
  variant?: "solid" | "outline"
}) {
  return (
    <Link
      href="/webinar"
      className={cn(
        "group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium transition-colors",
        variant === "solid"
          ? "bg-gold text-t1 hover:bg-gold/90"
          : "border border-border text-t1 hover:border-sage/50",
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  )
}
