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
  CalendarCheck
} from "lucide-react"

export default function ReignaraLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
            <Link href="#products" className="text-[15px] font-medium text-nav-text hover:text-t1 transition-colors">
              Products
            </Link>
            <Link href="#about" className="text-[15px] font-medium text-nav-text hover:text-t1 transition-colors">
              About
            </Link>
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
                href="#products"
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
                About
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
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
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

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:benson@reignara.com"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 sm:px-6 sm:py-3.5 text-[14px] sm:text-[15px] font-medium text-t1 hover:bg-gold/90 transition-colors"
            >
              Request Early Access
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              href="#products"
              className="inline-flex items-center gap-2 rounded-full border border-dark-slab/20 px-5 py-3 sm:px-6 sm:py-3.5 text-[14px] sm:text-[15px] font-medium text-t1 hover:border-dark-slab/40 transition-colors"
            >
              Learn More
            </Link>
          </div>

          {/* Product Suite - Elegant horizontal layout */}
          <div className="mt-16 sm:mt-20 w-full">
            <p className="mb-6 text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.25em] text-t3">
              The reignara Suite
            </p>

            {/* Desktop: Single elegant row with dividers */}
            <div className="hidden lg:flex items-center justify-center gap-0">
              {[
                { name: "Director", icon: LayoutDashboard },
                { name: "Podium", icon: MessageSquare },
                { name: "Spotlight", icon: BarChart3 },
                { name: "Reign", icon: Smartphone },
                { name: "Merit", icon: Scale },
                { name: "Vault", icon: Wallet },
                { name: "Patron", icon: Handshake },
                { name: "Envoy", icon: CalendarCheck },
              ].map((product, i) => (
                <div key={product.name} className="flex items-center">
                  <div className="group flex items-center gap-2.5 px-5 py-2 transition-colors hover:bg-dark-slab/5 rounded-lg cursor-default">
                    <product.icon className="h-4 w-4 text-sage" />
                    <span className="text-[14px] font-medium text-nav-text group-hover:text-t1 transition-colors">
                      {product.name}
                    </span>
                  </div>
                  {i < 7 && (
                    <span className="text-dark-slab/15 select-none">|</span>
                  )}
                </div>
              ))}
            </div>

            {/* Tablet: Two rows */}
            <div className="hidden sm:flex lg:hidden flex-col items-center gap-4">
              <div className="flex items-center justify-center gap-0">
                {[
                  { name: "Director", icon: LayoutDashboard },
                  { name: "Podium", icon: MessageSquare },
                  { name: "Spotlight", icon: BarChart3 },
                  { name: "Reign", icon: Smartphone },
                ].map((product, i) => (
                  <div key={product.name} className="flex items-center">
                    <div className="flex items-center gap-2 px-4 py-2">
                      <product.icon className="h-4 w-4 text-sage" />
                      <span className="text-[14px] font-medium text-nav-text">{product.name}</span>
                    </div>
                    {i < 3 && <span className="text-dark-slab/15 select-none">|</span>}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-0">
                {[
                  { name: "Merit", icon: Scale },
                  { name: "Vault", icon: Wallet },
                  { name: "Patron", icon: Handshake },
                  { name: "Envoy", icon: CalendarCheck },
                ].map((product, i) => (
                  <div key={product.name} className="flex items-center">
                    <div className="flex items-center gap-2 px-4 py-2">
                      <product.icon className="h-4 w-4 text-sage" />
                      <span className="text-[14px] font-medium text-nav-text">{product.name}</span>
                    </div>
                    {i < 3 && <span className="text-dark-slab/15 select-none">|</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: 2x4 compact grid */}
            <div className="grid grid-cols-2 gap-2 sm:hidden">
              {[
                { name: "Director", icon: LayoutDashboard },
                { name: "Podium", icon: MessageSquare },
                { name: "Spotlight", icon: BarChart3 },
                { name: "Reign", icon: Smartphone },
                { name: "Merit", icon: Scale },
                { name: "Vault", icon: Wallet },
                { name: "Patron", icon: Handshake },
                { name: "Envoy", icon: CalendarCheck },
              ].map((product) => (
                <div
                  key={product.name}
                  className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card/60 px-3 py-2.5"
                >
                  <product.icon className="h-4 w-4 text-sage" />
                  <span className="text-[13px] font-medium text-nav-text">{product.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Strip */}
      <div className="overflow-hidden bg-dark-slab py-4">
        <div className="marquee-container">
          <div className="marquee-content">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex shrink-0 items-center">
                <span className="mx-4 sm:mx-6 text-[11px] sm:text-[14px] font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-bg/60">Director</span>
                <span className="text-sage">◆</span>
                <span className="mx-4 sm:mx-6 text-[11px] sm:text-[14px] font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-bg/60">Podium</span>
                <span className="text-sage">◆</span>
                <span className="mx-4 sm:mx-6 text-[11px] sm:text-[14px] font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-bg/60">Spotlight</span>
                <span className="text-sage">◆</span>
                <span className="mx-4 sm:mx-6 text-[11px] sm:text-[14px] font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-bg/60">Reign</span>
                <span className="text-sage">◆</span>
                <span className="mx-4 sm:mx-6 text-[11px] sm:text-[14px] font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-bg/60">Merit</span>
                <span className="text-sage">◆</span>
                <span className="mx-4 sm:mx-6 text-[11px] sm:text-[14px] font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-bg/60">Vault</span>
                <span className="text-sage">◆</span>
                <span className="mx-4 sm:mx-6 text-[11px] sm:text-[14px] font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-bg/60">Patron</span>
                <span className="text-sage">◆</span>
                <span className="mx-4 sm:mx-6 text-[11px] sm:text-[14px] font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-bg/60">Envoy</span>
                <span className="text-sage">◆</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section id="products" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        {/* Section header */}
        <div className="mb-12 sm:mb-16">
          <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.2em] text-sage">
            Products
          </p>
          <h2 className="font-display text-[32px] sm:text-[44px] text-t1">
            Eight tools. One platform.
          </h2>
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
            <Link href="#products" className="text-[14px] font-medium text-nav-text hover:text-t1 transition-colors">
              Products
            </Link>
            <Link href="#about" className="text-[14px] font-medium text-nav-text hover:text-t1 transition-colors">
              About
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

      {/* Marquee animation styles */}
      <style jsx>{`
        .marquee-container {
          display: flex;
          width: 100%;
        }
        .marquee-content {
          display: flex;
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
