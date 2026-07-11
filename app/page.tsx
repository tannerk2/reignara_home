"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  LayoutDashboard,
  ArrowRight,
  Menu,
  X,
  MessageSquare,
  BarChart3,
  Smartphone,
  Scale,
  Wallet,
  Handshake,
  CalendarCheck,
  ChevronDown,
  Sparkles
} from "lucide-react"
import { CrownIcon } from "@/components/icons/CrownIcon"

export default function ReignaraLanding() {
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

          {/* Desktop nav links */}
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/products" className="text-[15px] font-medium text-nav-text hover:text-t1 transition-colors">
              Products
            </Link>
            {/* About dropdown */}
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
                    <Link
                      href="#about"
                      className="block rounded-xl px-4 py-3 text-[15px] font-medium text-nav-text hover:bg-bg hover:text-t1 transition-colors"
                    >
                      About Reignara
                    </Link>
                    <Link
                      href="/who-its-for"
                      className="block rounded-xl px-4 py-3 text-[15px] font-medium text-nav-text hover:bg-bg hover:text-t1 transition-colors"
                    >
                      Who It&apos;s For
                    </Link>
                    <Link
                      href="/team"
                      className="block rounded-xl px-4 py-3 text-[15px] font-medium text-nav-text hover:bg-bg hover:text-t1 transition-colors"
                    >
                      Our Team
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link href="#contact" className="text-[15px] font-medium text-nav-text hover:text-t1 transition-colors">
              Contact
            </Link>
          </div>

          {/* Desktop right side */}
          <div className="hidden items-center gap-4 md:flex">
            <a
              href="mailto:benson@reignara.com"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-[14px] font-medium text-t1 hover:bg-gold/90 transition-colors"
            >
              Request Early Access
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Mobile hamburger */}
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
          <div
            className="absolute inset-0 bg-dark-slab/40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[280px] bg-bg p-6 shadow-2xl">
            <div className="mb-8 flex items-center gap-2">
              <Image
                src="/images/reignara-logo.svg"
                alt="reignara"
                width={32}
                height={32}
                className="h-8 w-8"
              />
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
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl border border-border bg-card px-4 py-3 text-[15px] font-medium text-t1"
              >
                Products
              </Link>
              <Link
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl border border-border bg-card px-4 py-3 text-[15px] font-medium text-t1"
              >
                About Reignara
              </Link>
              <Link
                href="/who-its-for"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl border border-border bg-card px-4 py-3 text-[15px] font-medium text-t1"
              >
                Who It&apos;s For
              </Link>
              <Link
                href="/team"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl border border-border bg-card px-4 py-3 text-[15px] font-medium text-t1"
              >
                Our Team
              </Link>
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl border border-border bg-card px-4 py-3 text-[15px] font-medium text-t1"
              >
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

      {/* Hero Section - Centered with Logo */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 sm:pt-20 sm:pb-10 lg:pt-28 lg:pb-10">
        <div className="flex flex-col items-center text-center">
          {/* Large centered logo */}
          <div className="mb-8 sm:mb-10">
            <Image
              src="/images/reignara-logo.svg"
              alt="reignara"
              width={180}
              height={180}
              className="h-[120px] w-[120px] sm:h-[160px] sm:w-[160px] lg:h-[180px] lg:w-[180px]"
              priority
            />
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl font-display text-[36px] sm:text-[52px] lg:text-[64px] leading-[1.08] tracking-tight text-t1">
            Powering the next generation of{" "}
            <span className="italic text-gold">pageantry</span>
          </h1>

          {/* Subhead */}
          <p className="mt-6 max-w-2xl text-[16px] sm:text-[18px] leading-relaxed text-t2">
            Reignara builds tools that empower pageant directors, titleholders, and sponsors to operate with clarity, confidence, and connection.
          </p>

          {/* Who it's for — persona quick selector */}
          <div className="mt-10 sm:mt-12 w-full">
            <p className="mb-6 text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.25em] text-sage">
              Who it&apos;s for
            </p>
            <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {[
                { id: "directors", label: "Directors", teaser: "Run your whole program.", Icon: LayoutDashboard },
                { id: "titleholders", label: "Titleholders", teaser: "Manage your reign.", Icon: CrownIcon },
                { id: "contestants", label: "Contestants", teaser: "From application to stage.", Icon: Sparkles },
                { id: "sponsors", label: "Sponsors", teaser: "See your impact.", Icon: Handshake },
              ].map((p) => (
                <Link
                  key={p.id}
                  href={`/who-its-for/?role=${p.id}`}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-4 py-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage/15 text-sage transition-colors group-hover:bg-gold/20 group-hover:text-gold">
                    <p.Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="text-[15px] font-semibold tracking-tight text-t1">{p.label}</span>
                  <span className="text-[12px] leading-snug text-t2">{p.teaser}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Divider */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:gap-6 sm:px-6 sm:py-5">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
        <span className="rotate-45 text-sage" aria-hidden="true">
          <span className="block h-1.5 w-1.5 rounded-[1px] bg-sage" />
        </span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
      </div>

      {/* Products Section */}
      <section id="products" className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 sm:pt-10 sm:pb-24">
        {/* Section header */}
        <div className="mb-12 sm:mb-16">
          <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.2em] text-sage">
            Products
          </p>
          <h2 className="font-display text-[32px] sm:text-[44px] text-t1">
            Eight tools. One platform.
          </h2>
          <Link
            href="/products"
            className="group mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-sage hover:text-t1 transition-colors"
          >
            Explore the platform
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Product cards - 4x2 grid */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Director */}
          <div className="group flex flex-col rounded-2xl border border-border bg-card p-5 sm:p-6 transition-all hover:border-sage/40 hover:shadow-lg">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-sage/10">
              <LayoutDashboard className="h-5 w-5 text-sage" />
            </div>
            <h3 className="font-display text-[20px] text-t1">Director</h3>
            <p className="mt-2 flex-1 text-[14px] leading-relaxed text-t2">
              Contestant and titleholder management platform for pageant organizations.
            </p>
            <a
              href="mailto:benson@reignara.com"
              className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-sage hover:underline"
            >
              Explore
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Podium */}
          <div className="group flex flex-col rounded-2xl border border-border bg-card p-5 sm:p-6 transition-all hover:border-sage/40 hover:shadow-lg">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-sage/10">
              <MessageSquare className="h-5 w-5 text-sage" />
            </div>
            <h3 className="font-display text-[20px] text-t1">Podium</h3>
            <p className="mt-2 flex-1 text-[14px] leading-relaxed text-t2">
              Communications suite for announcements, messaging, and stakeholder updates.
            </p>
            <span className="mt-4 text-[13px] font-medium text-t3">
              Coming Soon
            </span>
          </div>

          {/* Spotlight */}
          <div className="group flex flex-col rounded-2xl border border-border bg-card p-5 sm:p-6 transition-all hover:border-sage/40 hover:shadow-lg">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-sage/10">
              <BarChart3 className="h-5 w-5 text-sage" />
            </div>
            <h3 className="font-display text-[20px] text-t1">Spotlight</h3>
            <p className="mt-2 flex-1 text-[14px] leading-relaxed text-t2">
              Social media insights and analytics to grow your presence and engagement.
            </p>
            <span className="mt-4 text-[13px] font-medium text-t3">
              Coming Soon
            </span>
          </div>

          {/* Reign */}
          <div className="group flex flex-col rounded-2xl border border-border bg-card p-5 sm:p-6 transition-all hover:border-sage/40 hover:shadow-lg">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-sage/10">
              <Smartphone className="h-5 w-5 text-sage" />
            </div>
            <h3 className="font-display text-[20px] text-t1">Reign</h3>
            <p className="mt-2 flex-1 text-[14px] leading-relaxed text-t2">
              Mobile companion app for titleholders to manage their reign on the go.
            </p>
            <span className="mt-4 text-[13px] font-medium text-t3">
              Coming Soon
            </span>
          </div>

          {/* Merit */}
          <div className="group flex flex-col rounded-2xl border border-border bg-card p-5 sm:p-6 transition-all hover:border-sage/40 hover:shadow-lg">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-sage/10">
              <Scale className="h-5 w-5 text-sage" />
            </div>
            <h3 className="font-display text-[20px] text-t1">Merit</h3>
            <p className="mt-2 flex-1 text-[14px] leading-relaxed text-t2">
              Judging and assessment platform for fair, transparent competition scoring.
            </p>
            <span className="mt-4 text-[13px] font-medium text-t3">
              Coming Soon
            </span>
          </div>

          {/* Vault */}
          <div className="group flex flex-col rounded-2xl border border-border bg-card p-5 sm:p-6 transition-all hover:border-sage/40 hover:shadow-lg">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-sage/10">
              <Wallet className="h-5 w-5 text-sage" />
            </div>
            <h3 className="font-display text-[20px] text-t1">Vault</h3>
            <p className="mt-2 flex-1 text-[14px] leading-relaxed text-t2">
              Finance and expense management to track budgets, receipts, and reimbursements.
            </p>
            <span className="mt-4 text-[13px] font-medium text-t3">
              Coming Soon
            </span>
          </div>

          {/* Patron */}
          <div className="group flex flex-col rounded-2xl border border-border bg-card p-5 sm:p-6 transition-all hover:border-sage/40 hover:shadow-lg">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-sage/10">
              <Handshake className="h-5 w-5 text-sage" />
            </div>
            <h3 className="font-display text-[20px] text-t1">Patron</h3>
            <p className="mt-2 flex-1 text-[14px] leading-relaxed text-t2">
              Sponsor management platform to nurture partnerships and track deliverables.
            </p>
            <span className="mt-4 text-[13px] font-medium text-t3">
              Coming Soon
            </span>
          </div>

          {/* Envoy */}
          <div className="group flex flex-col rounded-2xl border border-border bg-card p-5 sm:p-6 transition-all hover:border-sage/40 hover:shadow-lg">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-sage/10">
              <CalendarCheck className="h-5 w-5 text-sage" />
            </div>
            <h3 className="font-display text-[20px] text-t1">Envoy</h3>
            <p className="mt-2 flex-1 text-[14px] leading-relaxed text-t2">
              Appearance and event management to coordinate schedules and bookings.
            </p>
            <span className="mt-4 text-[13px] font-medium text-t3">
              Coming Soon
            </span>
          </div>
        </div>
      </section>

      {/* Who it's for Section */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mb-12 sm:mb-16">
          <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.2em] text-sage">
            Who It&apos;s For
          </p>
          <h2 className="font-display text-[32px] sm:text-[44px] text-t1">
            Built for every role in pageantry
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-3 md:gap-16">
          {/* For Directors */}
          <div>
            <h3 className="mb-6 font-display text-[22px] text-t1">For Directors</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 text-sage">◆</span>
                <span className="text-[16px] leading-relaxed text-t2">Full board visibility</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 text-sage">◆</span>
                <span className="text-[16px] leading-relaxed text-t2">Automated expense workflows</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 text-sage">◆</span>
                <span className="text-[16px] leading-relaxed text-t2">Sponsor relationship management</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 text-sage">◆</span>
                <span className="text-[16px] leading-relaxed text-t2">Calendar coordination across your team</span>
              </li>
            </ul>
          </div>

          {/* For Titleholders */}
          <div>
            <h3 className="mb-6 font-display text-[22px] text-t1">For Titleholders</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 text-sage">◆</span>
                <span className="text-[16px] leading-relaxed text-t2">Personal dashboard for your reign</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 text-sage">◆</span>
                <span className="text-[16px] leading-relaxed text-t2">Expense submission in seconds</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 text-sage">◆</span>
                <span className="text-[16px] leading-relaxed text-t2">Appearance calendar at a glance</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 text-sage">◆</span>
                <span className="text-[16px] leading-relaxed text-t2">Direct connection to your board</span>
              </li>
            </ul>
          </div>

          {/* For Contestants */}
          <div>
            <h3 className="mb-6 font-display text-[22px] text-t1">For Contestants</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 text-sage">◆</span>
                <span className="text-[16px] leading-relaxed text-t2">Streamlined application and registration</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 text-sage">◆</span>
                <span className="text-[16px] leading-relaxed text-t2">Clear competition timelines and requirements</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 text-sage">◆</span>
                <span className="text-[16px] leading-relaxed text-t2">Document and wardrobe submissions in one place</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 text-sage">◆</span>
                <span className="text-[16px] leading-relaxed text-t2">Transparent judging and results</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Built by insiders CTA Section */}
      <section id="early-access" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-dark-slab px-6 py-16 sm:px-12 sm:py-20">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sage/10" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-sage/5" />

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[28px] sm:text-[36px] md:text-[44px] leading-tight text-bg">
              Built by people who&apos;ve lived the pageant world
            </h2>
            <p className="mt-6 text-[16px] sm:text-[18px] leading-relaxed text-bg/70">
              Reignara was founded by pageant directors and former titleholders who know the pain of spreadsheets, lost receipts, and scattered communications. We built what we wished existed.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:benson@reignara.com"
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-[15px] font-medium text-t1 hover:bg-gold/90 transition-colors"
              >
                Request Early Access
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-bg/20 px-6 py-3.5 text-[15px] font-medium text-bg hover:border-bg/40 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 sm:pb-12 sm:pt-24">
        <div className="flex flex-col items-center gap-6 border-t border-border pt-8 sm:flex-row sm:justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/reignara-logo.svg"
              alt="reignara"
              width={28}
              height={28}
              className="h-7 w-7"
            />
            <span className="font-display text-[20px] text-t1">reignara</span>
          </Link>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            <Link href="/products" className="text-[14px] font-medium text-nav-text hover:text-t1 transition-colors">
              Products
            </Link>
            <Link href="#about" className="text-[14px] font-medium text-nav-text hover:text-t1 transition-colors">
              About
            </Link>
            <Link href="/who-its-for" className="text-[14px] font-medium text-nav-text hover:text-t1 transition-colors">
              Who It&apos;s For
            </Link>
            <Link href="/team" className="text-[14px] font-medium text-nav-text hover:text-t1 transition-colors">
              Team
            </Link>
            <Link href="#contact" className="text-[14px] font-medium text-nav-text hover:text-t1 transition-colors">
              Contact
            </Link>
            <Link href="/support" className="text-[14px] font-medium text-nav-text hover:text-t1 transition-colors">
              Support
            </Link>
            <Link href="/privacy" className="text-[14px] font-medium text-nav-text hover:text-t1 transition-colors">
              Privacy
            </Link>
          </div>
          <p className="text-[13px] text-t2">
            © 2026 reignara. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
