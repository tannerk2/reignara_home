"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Menu, X, ChevronDown } from "lucide-react"
import { personas } from "@/content/personas"
import { cn } from "@/lib/utils"

type ActiveKey = "products" | "who" | "pricing" | "team" | "faq" | "contact" | undefined

export function SiteNav({
  active,
  activePersona,
}: {
  active?: ActiveKey
  /** persona id ("directors"…) when on a Who It's For page */
  activePersona?: string
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [whoOpen, setWhoOpen] = useState(false)

  const topLink = (isActive: boolean) =>
    cn("text-[15px] font-medium transition-colors", isActive ? "text-t1" : "text-nav-text hover:text-t1")

  const dropItem = (isActive: boolean) =>
    cn(
      "block rounded-xl px-4 py-3 text-[15px] font-medium transition-colors",
      isActive ? "text-t1 bg-bg" : "text-nav-text hover:bg-bg hover:text-t1",
    )

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border bg-bg/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/reignara-logo.svg" alt="reignara" width={36} height={36} className="h-8 w-8 sm:h-9 sm:w-9" />
            <span className="font-display text-[22px] sm:text-[26px] text-t1">reignara</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/products" className={topLink(active === "products")}>
              Products
            </Link>

            {/* Who It's For dropdown */}
            <div className="relative" onMouseEnter={() => setWhoOpen(true)} onMouseLeave={() => setWhoOpen(false)}>
              <Link
                href="/who-its-for/directors"
                className={cn("flex items-center gap-1", topLink(active === "who"))}
                aria-haspopup="true"
                aria-expanded={whoOpen}
              >
                Who It&apos;s For
                <ChevronDown className={`h-4 w-4 transition-transform ${whoOpen ? "rotate-180" : ""}`} />
              </Link>
              {whoOpen && (
                <div className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3">
                  <div className="overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-xl">
                    {personas.map((p) => (
                      <Link key={p.id} href={`/who-its-for/${p.id}`} className={dropItem(activePersona === p.id)}>
                        {p.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/pricing" className={topLink(active === "pricing")}>
              Pricing
            </Link>

            <Link href="/faq" className={topLink(active === "faq")}>
              FAQ
            </Link>

            <a href="#request" className={topLink(active === "contact")}>
              Contact
            </a>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <a href="#request" className="group inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-[14px] font-medium text-t1 hover:bg-gold/90 transition-colors">
              Request Early Access
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 text-t1" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-dark-slab/40" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[300px] overflow-y-auto bg-bg p-6 shadow-2xl">
            <div className="mb-8 flex items-center gap-2">
              <Image src="/images/reignara-logo.svg" alt="reignara" width={32} height={32} className="h-8 w-8" />
              <span className="font-display text-[24px] text-t1">reignara</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-border"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-t1" />
            </button>
            <div className="flex flex-col gap-3">
              <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="rounded-xl border border-border bg-card px-4 py-3 text-[15px] font-medium text-t1">
                Products
              </Link>
              <Link href="/who-its-for/directors" onClick={() => setMobileMenuOpen(false)} className="rounded-xl border border-border bg-card px-4 py-3 text-[15px] font-medium text-t1">
                Who It&apos;s For
              </Link>
              <div className="flex flex-col gap-1.5 pl-3">
                {personas.map((p) => (
                  <Link
                    key={p.id}
                    href={`/who-its-for/${p.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg px-3 py-2 text-[14px] font-medium text-nav-text hover:text-t1"
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="rounded-xl border border-border bg-card px-4 py-3 text-[15px] font-medium text-t1">
                Pricing
              </Link>
              <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="rounded-xl border border-border bg-card px-4 py-3 text-[15px] font-medium text-t1">
                FAQ
              </Link>
              <a href="#request" onClick={() => setMobileMenuOpen(false)} className="rounded-xl border border-border bg-card px-4 py-3 text-[15px] font-medium text-t1">
                Contact
              </a>
              <a
                href="#request"
                onClick={() => setMobileMenuOpen(false)}
                className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3.5 text-[15px] font-medium text-t1"
              >
                Request Early Access
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
