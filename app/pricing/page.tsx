import type { Metadata } from "next"
import { ArrowRight, Scaling, Blocks, Check } from "lucide-react"
import { SiteNav } from "@/components/site/SiteNav"
import { SiteFooter } from "@/components/site/SiteFooter"

export const metadata: Metadata = {
  title: "Pricing — Reignara",
  description:
    "Reignara pricing is built around your program — a flat rate for the core platform based on your scale, plus the add-on modules you actually need.",
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-bg">
      <SiteNav active="pricing" />

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-16 lg:pt-20">
        <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.2em] text-sage">Pricing</p>
        <h1 className="font-display text-[36px] sm:text-[52px] lg:text-[60px] leading-[1.08] tracking-tight text-t1">
          Pricing built around your program
        </h1>
        <p className="mt-5 text-[17px] sm:text-[18px] leading-relaxed text-t2">
          No two pageant programs are alike — and your pricing shouldn&apos;t be either.
        </p>
      </section>

      {/* Two factors */}
      <section className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 sm:pt-12">
        <p className="text-[16px] sm:text-[17px] leading-relaxed text-t2">
          A local preliminary with 15 contestants has very different needs than a state program running
          multiple age divisions with a full production week. That&apos;s why Reignara doesn&apos;t force you
          into a one-size-fits-all plan. Instead, your price reflects two simple things:
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-7">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-sage/10">
              <Scaling className="h-5 w-5 text-sage" />
            </div>
            <h2 className="font-serif text-[21px] font-medium text-t1">
              The size and complexity of your program
            </h2>
            <p className="mt-2.5 text-[15px] leading-relaxed text-t2">
              Our core platform, Meridian Director, is priced as a flat rate based on the scale of your
              pageant — contestant volume, divisions, and event complexity. No per-contestant surprises, no
              fees that balloon as your program grows mid-season.
            </p>
          </div>

          <div className="flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-7">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-sage/10">
              <Blocks className="h-5 w-5 text-sage" />
            </div>
            <h2 className="font-serif text-[21px] font-medium text-t1">The tools you actually need</h2>
            <p className="mt-2.5 text-[15px] leading-relaxed text-t2">
              Beyond Director, you choose the add-on modules that fit your program — judging, contestant
              experience, sponsor management, and more. You pay for what you use, not a bloated bundle of
              features that sit idle.
            </p>
          </div>
        </div>
      </section>

      {/* What that means for you */}
      <section className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-16">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/10">
              <Check className="h-5 w-5 text-sage" />
            </div>
            <h2 className="font-serif text-[24px] sm:text-[28px] font-medium text-t1">
              What that means for you
            </h2>
          </div>
          <ul className="space-y-3">
            {[
              "Small programs aren't subsidizing enterprise features they'll never touch",
              "Growing programs can add capabilities as they scale",
              "Directors know their costs up front, before the season starts",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] sm:text-[16px] leading-relaxed text-t2">
                <span className="mt-1.5 text-sage">◆</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Let's find your fit — CTA */}
      <section className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-16">
        <div className="rounded-2xl border border-border bg-dark-slab p-6 sm:p-8">
          <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.2em] text-sage">Let&apos;s talk</p>
          <h2 className="font-display text-[26px] sm:text-[32px] text-bg">Let&apos;s find your fit</h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-bg/80">
            The best way to get an accurate picture is a short conversation. We&apos;ll walk through how your
            program runs today, show you what Reignara can take off your plate, and give you straightforward
            pricing — no pressure, no hard sell.
          </p>
          <div className="mt-7">
            <a
              href="#request"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-[15px] font-medium text-t1 transition-colors hover:bg-gold/90"
            >
              Schedule a Call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
