"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Menu, X, Mail, ChevronDown } from "lucide-react"

const teamMembers = [
  {
    name: "Benson Tanner",
    role: "Founder",
    initials: "BT",
    image: "/images/team/benson-tanner.jpg",
    bio: [
      "Benson has spent his career at the intersection of enterprise AI strategy and cloud infrastructure — guiding large organizations across financial services, public sector, and high tech from early concept through the deployment of production systems that generate measurable commercial results. He has architected and delivered complex cloud infrastructure for some of the most demanding enterprises in the world, led AI strategy engagements for recognized global brands, and published widely on the architecture of modern agentic AI systems.",
      "reignara began with someone he loves. When his sister stepped into the Mrs. Idaho America role, Benson saw the pageant world from the inside — and what struck him most was the people behind it. He watched women pour countless hours into empowering one another, helping each other find their voice, and driving real, measurable impact in their communities. He also saw how much of that energy was absorbed by logistics, paperwork, and tools that simply couldn't keep pace.",
      "That became the conviction behind reignara: to give these women back their time. reignara is built to handle the operational weight so directors, titleholders, and volunteers can focus on the parts that matter most — the mentorship, the advocacy, the community. The goal is not just better software, but a more sustainable balance and a richer experience for everyone the pageant world touches.",
      "reignara brings enterprise-grade innovative solutions to a community that has long outgrown the tools available to it. Benson is based in Meridian, Idaho.",
    ],
  },
  {
    name: "Keylee Davis",
    role: "Chief Revenue Officer",
    initials: "KD",
    image: "/images/team/keylee-davis.jpg",
    bio: [
      "Keylee leads growth and partnerships at reignara, building the relationships with directors, sponsors, and pageant organizations that carry the platform into communities everywhere. She brings a rare combination of commercial instinct and genuine care for the people on the other side of every conversation — an ability to grow a business without ever losing sight of who it serves.",
      "Her credibility is hard-earned, because she has lived every part of this world. Keylee has sat in nearly every seat the pageant experience offers — from the little sister program to state titleholder, and later as a sponsor, coach, and director. Pageantry has been woven through every chapter of her life, and she now considers it a privilege to pour that lifetime of perspective into a career spent helping others find their place in it. There is no role in this community she hasn't held, and no role she doesn't understand.",
      "That breadth is exactly why she is the driving force behind reignara's conviction that the platform is for all — for the first-time contestant and the seasoned director alike. Her approach to revenue is rooted in the same belief: she would rather build a lasting partnership than close a quick deal. That philosophy has shaped how reignara works with the organizations it serves and keeps the company grounded in long-term relationships over short-term wins.",
      "At the heart of it, Keylee believes you don't need a crown to share a message, help others, and lead with love. It's the principle that has guided her through every chapter of pageantry — and the one she brings to every relationship reignara builds.",
    ],
  },
  {
    name: "Megan Bartschi",
    role: "Chief Community Officer",
    initials: "MB",
    image: "/images/team/megan-bartschi.jpg",
    bio: [
      "Megan serves as reignara's Chief Community Officer, leading the connection between the platform and the people it was built to serve. She works closely with directors, titleholders, contestants, and sponsors to understand their needs, gather feedback, and ensure their experiences directly influence the future of the platform.",
      "Her journey in pageantry began in 2024 when, as a married mother of four, she entered her first competition. While she did not place that year, the experience sparked a passion for the personal growth, leadership, and community that pageantry makes possible. Driven by that passion, she immersed herself in the process and, just one year later, earned the title of Mrs. Idaho America 2025 before advancing to place in the Top 15 at Mrs. America.",
      "Following her year of service, Megan was invited to be a Pageant Co-Director — giving her a rare perspective across every level of the industry. Having experienced pageantry as a contestant, titleholder, and director, she understands both the transformative impact of the journey and the operational challenges faced by the organizations that make it possible.",
      "At reignara, Megan serves as the voice of the community, ensuring technology strengthens relationships rather than replacing them. She is passionate about creating tools that empower directors to lead with confidence, help titleholders maximize their impact, and give contestants an exceptional experience from application to crowning. Her belief is simple: when pageant organizations thrive, they create opportunities that change lives — and those experiences deserve to be supported by technology built with purpose.",
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
                      About reignara
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
                About reignara
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
          The people behind <span className="italic text-gold">reignara</span>
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
                className={`relative flex w-full max-w-sm items-center justify-center overflow-hidden rounded-2xl border border-border bg-card lg:col-span-2 ${
                  index % 2 === 1 ? "lg:order-2 lg:ml-auto" : ""
                }`}
                style={{ aspectRatio: "4 / 5" }}
                aria-label={member.image ? undefined : `${member.name} placeholder portrait`}
              >
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={`Portrait of ${member.name}, ${member.role}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                ) : (
                  <>
                    <span
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sage/10 to-gold/10"
                      aria-hidden="true"
                    />
                    <span className="relative font-display text-[64px] sm:text-[80px] leading-none text-sage select-none">
                      {member.initials}
                    </span>
                  </>
                )}
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
