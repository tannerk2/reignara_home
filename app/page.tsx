import Link from "next/link"
import Image from "next/image"
import {
  LayoutDashboard,
  ArrowRight,
  MessageSquare,
  BarChart3,
  Smartphone,
  Scale,
  Wallet,
  Handshake,
  CalendarCheck,
  Sparkles,
} from "lucide-react"
import { CrownIcon } from "@/components/icons/CrownIcon"
import { SiteNav } from "@/components/site/SiteNav"
import { SiteFooter } from "@/components/site/SiteFooter"

export default function ReignaraLanding() {
  return (
    <div className="min-h-screen bg-bg">
      <SiteNav />

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
            Powering the next generation of <span className="italic text-gold">pageantry</span>
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
                  href={`/who-its-for/${p.id}`}
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
          <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.2em] text-sage">Products</p>
          <h2 className="font-display text-[32px] sm:text-[44px] text-t1">Eight tools. One platform.</h2>
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
          {[
            { name: "Director", slug: "director", Icon: LayoutDashboard, desc: "Contestant and titleholder management platform for pageant organizations." },
            { name: "Podium", slug: "podium", Icon: MessageSquare, desc: "Communications suite for announcements, messaging, and stakeholder updates." },
            { name: "Spotlight", slug: "spotlight", Icon: BarChart3, desc: "Social media insights and analytics to grow your presence and engagement." },
            { name: "Reign", slug: "reign", Icon: Smartphone, desc: "Mobile companion app for titleholders to manage their reign on the go." },
            { name: "Merit", slug: "merit", Icon: Scale, desc: "Judging and assessment platform for fair, transparent competition scoring." },
            { name: "Vault", slug: "vault", Icon: Wallet, desc: "Finance and expense management to track budgets, receipts, and reimbursements." },
            { name: "Patron", slug: "patron", Icon: Handshake, desc: "Sponsor management platform to nurture partnerships and track deliverables." },
            { name: "Envoy", slug: "envoy", Icon: CalendarCheck, desc: "Appearance and event management to coordinate schedules and bookings." },
          ].map((product) => (
            <div
              key={product.slug}
              className="group flex flex-col rounded-2xl border border-border bg-card p-5 sm:p-6 transition-all hover:border-sage/40 hover:shadow-lg"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-sage/10">
                <product.Icon className="h-5 w-5 text-sage" />
              </div>
              <h3 className="font-display text-[20px] text-t1">{product.name}</h3>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-t2">{product.desc}</p>
              <Link
                href={`/products#${product.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-sage hover:underline"
              >
                Preview
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Who it's for Section */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mb-12 sm:mb-16">
          <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.2em] text-sage">Who It&apos;s For</p>
          <h2 className="font-display text-[32px] sm:text-[44px] text-t1">Built for every role in pageantry</h2>
          <Link
            href="/who-its-for/directors"
            className="group mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-sage hover:text-t1 transition-colors"
          >
            See who it&apos;s for
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-12 md:grid-cols-3 md:gap-16">
          {/* For Directors */}
          <div>
            <h3 className="mb-6 font-display text-[22px] text-t1">For Directors</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><span className="mt-1.5 text-sage">◆</span><span className="text-[16px] leading-relaxed text-t2">Full board visibility</span></li>
              <li className="flex items-start gap-3"><span className="mt-1.5 text-sage">◆</span><span className="text-[16px] leading-relaxed text-t2">Automated expense workflows</span></li>
              <li className="flex items-start gap-3"><span className="mt-1.5 text-sage">◆</span><span className="text-[16px] leading-relaxed text-t2">Sponsor relationship management</span></li>
              <li className="flex items-start gap-3"><span className="mt-1.5 text-sage">◆</span><span className="text-[16px] leading-relaxed text-t2">Calendar coordination across your team</span></li>
            </ul>
          </div>

          {/* For Titleholders */}
          <div>
            <h3 className="mb-6 font-display text-[22px] text-t1">For Titleholders</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><span className="mt-1.5 text-sage">◆</span><span className="text-[16px] leading-relaxed text-t2">Personal dashboard for your reign</span></li>
              <li className="flex items-start gap-3"><span className="mt-1.5 text-sage">◆</span><span className="text-[16px] leading-relaxed text-t2">Expense submission in seconds</span></li>
              <li className="flex items-start gap-3"><span className="mt-1.5 text-sage">◆</span><span className="text-[16px] leading-relaxed text-t2">Appearance calendar at a glance</span></li>
              <li className="flex items-start gap-3"><span className="mt-1.5 text-sage">◆</span><span className="text-[16px] leading-relaxed text-t2">Direct connection to your board</span></li>
            </ul>
          </div>

          {/* For Contestants */}
          <div>
            <h3 className="mb-6 font-display text-[22px] text-t1">For Contestants</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><span className="mt-1.5 text-sage">◆</span><span className="text-[16px] leading-relaxed text-t2">Streamlined application and registration</span></li>
              <li className="flex items-start gap-3"><span className="mt-1.5 text-sage">◆</span><span className="text-[16px] leading-relaxed text-t2">Clear competition timelines and requirements</span></li>
              <li className="flex items-start gap-3"><span className="mt-1.5 text-sage">◆</span><span className="text-[16px] leading-relaxed text-t2">Document and wardrobe submissions in one place</span></li>
              <li className="flex items-start gap-3"><span className="mt-1.5 text-sage">◆</span><span className="text-[16px] leading-relaxed text-t2">Transparent judging and results</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Built by insiders CTA Section */}
      <section id="early-access" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-dark-slab px-6 py-16 sm:px-12 sm:py-20">
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
                href="#request"
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-[15px] font-medium text-t1 hover:bg-gold/90 transition-colors"
              >
                Request Early Access
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#request"
                className="inline-flex items-center gap-2 rounded-full border border-bg/20 px-6 py-3.5 text-[15px] font-medium text-bg hover:border-bg/40 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
