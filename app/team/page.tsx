"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Menu, X, Mail, ChevronDown } from "lucide-react"

const teamMembers = [
  {
    name: "Benson Tanner",
    role: "Founder",
    image: "/images/team/benson-tanner.jpg",
    bio: [
      "Benson founded Reignara to bring modern, purpose-built tools to a community that has long made do with spreadsheets, group texts, and scattered communication. Having grown up around the pageant world, he saw firsthand how much time directors and contestants lost to manual work that software should have handled years ago.",
      "As Founder, he sets the company's vision and product direction, working closely with the team to make sure every feature solves a real problem for the people who rely on it. He believes great tools should feel invisible, letting organizers focus on the moments that matter most.",
    ],
  },
  {
    name: "Keylee Davis",
    role: "Chief Revenue Officer",
    image: "/images/team/keylee-davis.jpg",
    bio: [
      "Keylee leads growth and partnerships at Reignara, building the relationships with directors, sponsors, and pageant organizations that help the platform reach communities everywhere. She brings a rare combination of commercial instinct and genuine care for the people on the other side of every conversation.",
      "Her approach to revenue is rooted in trust: she would rather build a lasting partnership than close a quick deal. That philosophy has shaped how Reignara works with the organizations it serves, and it keeps the company grounded in long-term relationships over short-term wins.",
    ],
  },
  {
    name: "Megan Bartschi",
    role: "Chief Community Officer",
    image: "/images/team/megan-bartschi.jpg",
    bio: [
      "Megan champions the titleholders, contestants, and directors who use Reignara every day. She spends her time listening to the community, gathering feedback, and turning the real experiences of pageant participants into the features and improvements that shape the platform.",
      "As Chief Community Officer, she makes sure no voice gets lost as Reignara grows. From onboarding new organizations to celebrating titleholders' wins, Megan keeps the human side of pageantry at the center of everything the company builds.",
    ],
  },
]

export default function TeamPage() {
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
            {/* About dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-[15px] font-medium text-t1 transition-colors"
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
                      href="/#about"
                      className="block rounded-xl px-4 py-3 text-[15px] font-medium text-nav-text hover:bg-bg hover:text-t1 transition-colors"
                    >
                      About Reignara
                    </Link>
                    <Link
                      href="/team"
                      className="block rounded-xl px-4 py-3 text-[15px] font-medium text-t1 bg-bg"
                    >
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
              <Link
                href="/#products"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl border border-border bg-card px-4 py-3 text-[15px] font-medium text-t1"
              >
                Products
              </Link>
              <Link
                href="/#about"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl border border-border bg-card px-4 py-3 text-[15px] font-medium text-t1"
              >
                About Reignara
              </Link>
              <Link
                href="/team"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl border border-border bg-card px-4 py-3 text-[15px] font-medium text-t1"
              >
                Our Team
              </Link>
              <Link
                href="/#contact"
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

      {/* Header */}
      <section className="mx-auto max-w-3xl px-4 pt-12 text-center sm:px-6 sm:pt-16 lg:pt-20">
        <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.2em] text-sage">
          Our Team
        </p>
        <h1 className="font-display text-[36px] sm:text-[52px] lg:text-[60px] leading-[1.08] tracking-tight text-t1">
          The people behind <span className="italic text-gold">Reignara</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-[17px] sm:text-[18px] leading-relaxed text-t2">
          We&apos;re a small team with deep roots in the pageant world, building the tools we always wished we had.
        </p>
      </section>

      {/* Team rows */}
      <section className="mx-auto max-w-5xl px-4 pt-12 pb-4 sm:px-6 sm:pt-16">
        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-24">
          {teamMembers.map((member, index) => (
            <article
              key={member.name}
              className="grid items-start gap-6 sm:gap-8 lg:grid-cols-5 lg:gap-12"
            >
              {/* Portrait */}
              <div
                className={`relative w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card lg:col-span-2 ${
                  index % 2 === 1 ? "lg:order-2 lg:ml-auto" : ""
                }`}
                style={{ aspectRatio: "4 / 5" }}
              >
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={`Portrait of ${member.name}, ${member.role}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>

              {/* Bio */}
              <div className={`flex flex-col lg:col-span-3 lg:justify-center ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-sage">
                  {member.role}
                </p>
                <h2 className="mt-2 font-display text-[28px] sm:text-[34px] leading-tight text-t1">
                  {member.name}
                </h2>
                <span className="mt-5 h-px w-16 bg-gold" aria-hidden="true" />
                <div className="mt-5 flex flex-col gap-4">
                  {member.bio.map((paragraph, i) => (
                    <p key={i} className="text-[16px] leading-relaxed text-t2">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 sm:pt-16">
        <div className="rounded-2xl border border-border bg-dark-slab p-6 sm:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[26px] sm:text-[36px] leading-tight text-bg">
              Want to work with us?
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-bg/70">
              We&apos;d love to hear from directors, titleholders, and sponsors who want to shape the future of pageantry.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="mailto:benson@reignara.com"
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-[15px] font-medium text-t1 hover:bg-gold/90 transition-colors"
              >
                <Mail className="h-4 w-4" />
                Get in touch
              </a>
              <Link
                href="/#about"
                className="inline-flex items-center gap-2 rounded-full border border-bg/20 px-6 py-3.5 text-[15px] font-medium text-bg hover:border-bg/40 transition-colors"
              >
                Learn more about us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 sm:pb-12 sm:pt-20">
        <div className="flex flex-col items-center gap-6 border-t border-border pt-8 sm:flex-row sm:justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/reignara-logo.svg" alt="reignara" width={28} height={28} className="h-7 w-7" />
            <span className="font-display text-[20px] text-t1">reignara</span>
          </Link>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            <Link href="/#products" className="text-[14px] font-medium text-nav-text hover:text-t1 transition-colors">
              Products
            </Link>
            <Link href="/#about" className="text-[14px] font-medium text-nav-text hover:text-t1 transition-colors">
              About
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
