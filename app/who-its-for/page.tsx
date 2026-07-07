"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Menu, X, ChevronDown } from "lucide-react"
import { PersonaExperience } from "@/components/persona/PersonaExperience"

export default function WhoItsForPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <div className="min-h-screen bg-bg">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-bg/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/reignara-logo.svg"
              alt="reignara"
              width={36}
              height={36}
              className="h-8 w-8 sm:h-9 sm:w-9"
            />
            <span className="font-display text-[22px] sm:text-[26px] text-t1">reignara</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/#products" className="text-[15px] font-medium text-nav-text hover:text-t1 transition-colors">
              Products
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-[15px] font-medium text-nav-text hover:text-t1 transition-colors"
                aria-expanded={aboutOpen}
                aria-haspopup="true"
              >
                About
                <ChevronDown className={`h-4 w-4 transition-transform ${aboutOpen ? "rotate-180" : ""}`} />
              </button>
              {aboutOpen && (
                <div className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3">
                  <div className="overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-xl">
                    <Link href="/#about" className="block rounded-xl px-4 py-3 text-[15px] font-medium text-nav-text hover:bg-bg hover:text-t1 transition-colors">
                      About reignara
                    </Link>
                    <Link href="/who-its-for" className="block rounded-xl px-4 py-3 text-[15px] font-medium text-t1 bg-bg">
                      Who It&apos;s For
                    </Link>
                    <Link href="/team" className="block rounded-xl px-4 py-3 text-[15px] font-medium text-nav-text hover:bg-bg hover:text-t1 transition-colors">
                      Our Team
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link href="/#contact" className="text-[15px] font-medium text-nav-text hover:text-t1 transition-colors">
              Contact
            </Link>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <a
              href="mailto:benson@reignara.com"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-[14px] font-medium text-t1 hover:bg-gold/90 transition-colors"
            >
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
          <div className="absolute right-0 top-0 h-full w-[280px] bg-bg p-6 shadow-2xl">
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
            <div className="flex flex-col gap-4">
              <Link href="/#products" onClick={() => setMobileMenuOpen(false)} className="rounded-xl border border-border bg-card px-4 py-3 text-[15px] font-medium text-t1">
                Products
              </Link>
              <Link href="/#about" onClick={() => setMobileMenuOpen(false)} className="rounded-xl border border-border bg-card px-4 py-3 text-[15px] font-medium text-t1">
                About reignara
              </Link>
              <Link href="/who-its-for" onClick={() => setMobileMenuOpen(false)} className="rounded-xl border border-border bg-card px-4 py-3 text-[15px] font-medium text-t1">
                Who It&apos;s For
              </Link>
              <Link href="/team" onClick={() => setMobileMenuOpen(false)} className="rounded-xl border border-border bg-card px-4 py-3 text-[15px] font-medium text-t1">
                Our Team
              </Link>
              <Link href="/#contact" onClick={() => setMobileMenuOpen(false)} className="rounded-xl border border-border bg-card px-4 py-3 text-[15px] font-medium text-t1">
                Contact
              </Link>
              <a
                href="mailto:benson@reignara.com"
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

      {/* Header */}
      <section className="mx-auto max-w-3xl px-4 pt-12 text-center sm:px-6 sm:pt-16 lg:pt-20">
        <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.2em] text-sage">
          Who It&apos;s For
        </p>
        <h1 className="font-display text-[36px] sm:text-[52px] lg:text-[60px] leading-[1.08] tracking-tight text-t1">
          Who is <span className="italic text-gold">reignara</span> for?
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-[17px] sm:text-[18px] leading-relaxed text-t2">
          Everyone starts on the same foundation and builds from there. Choose your role to see how
          reignara works for you.
        </p>
      </section>

      {/* Interactive persona experience */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-20 sm:px-6 sm:pt-14 sm:pb-28">
        <PersonaExperience />
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 sm:pb-12">
        <div className="flex flex-col items-center gap-6 border-t border-border pt-8 sm:flex-row sm:justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/reignara-logo.svg" alt="reignara" width={28} height={28} className="h-7 w-7" />
            <span className="font-display text-[20px] text-t1">reignara</span>
          </Link>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            <Link href="/#products" className="text-[14px] font-medium text-nav-text hover:text-t1 transition-colors">
              Products
            </Link>
            <Link href="/who-its-for" className="text-[14px] font-medium text-nav-text hover:text-t1 transition-colors">
              Who It&apos;s For
            </Link>
            <Link href="/team" className="text-[14px] font-medium text-nav-text hover:text-t1 transition-colors">
              Team
            </Link>
            <Link href="/#contact" className="text-[14px] font-medium text-nav-text hover:text-t1 transition-colors">
              Contact
            </Link>
            <Link href="/support" className="text-[14px] font-medium text-nav-text hover:text-t1 transition-colors">
              Support
            </Link>
            <Link href="/privacy" className="text-[14px] font-medium text-nav-text hover:text-t1 transition-colors">
              Privacy
            </Link>
          </div>
          <p className="text-[13px] text-t2">© 2026 reignara. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
