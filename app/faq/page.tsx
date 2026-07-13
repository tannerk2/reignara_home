import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"
import { SiteNav } from "@/components/site/SiteNav"
import { SiteFooter } from "@/components/site/SiteFooter"

export const metadata: Metadata = {
  title: "FAQ — reignara",
  description: "Answers to common questions about reignara — the operating platform for pageant programs.",
}

type Faq = { q: string; a: React.ReactNode }

const faqs: Faq[] = [
  {
    q: "What is reignara?",
    a: (
      <>
        reignara is the operating platform for pageant programs — one connected system for directors,
        titleholders, contestants, and sponsors. It replaces the patchwork of spreadsheets, group texts,
        and one-off tools with software built specifically for how pageant programs actually run.
      </>
    ),
  },
  {
    q: "Who is reignara for?",
    a: (
      <>
        Directors run their entire program on reignara, and everyone connected to that program —
        titleholders, contestants, and sponsors — gets tools tailored to their role. See{" "}
        <Link href="/who-its-for/directors" className="text-sage underline hover:text-t1">
          who it&apos;s for
        </Link>{" "}
        for a walkthrough by role.
      </>
    ),
  },
  {
    q: "What products are included?",
    a: (
      <>
        Everything starts on <strong className="text-t1">Director</strong>, the command center your program
        runs on. From there, modules plug in as you need them — Podium (communications), Merit (judging),
        Envoy (appearances &amp; commitments), Patron (sponsors), Vault (finances), Spotlight (social
        analytics), and Reign (the titleholder mobile app). Explore them on the{" "}
        <Link href="/products" className="text-sage underline hover:text-t1">
          products page
        </Link>
        .
      </>
    ),
  },
  {
    q: "Is reignara available yet?",
    a: (
      <>
        We&apos;re onboarding programs through early access right now. Request access and we&apos;ll set up
        a walkthrough tailored to your program.
      </>
    ),
  },
  {
    q: "How much does it cost?",
    a: (
      <>
        Pricing depends on the size of your program and which modules you use. Reach out and we&apos;ll walk
        you through the options that fit your program.
      </>
    ),
  },
  {
    q: "Do titleholders and contestants need their own accounts?",
    a: (
      <>
        Yes. Each person gets their own secure login that connects to your program, so directors aren&apos;t
        re-entering information and everyone sees exactly what&apos;s relevant to them.
      </>
    ),
  },
  {
    q: "Is my data secure?",
    a: (
      <>
        We follow security best practices — data is encrypted in transit and access is controlled by role.
        For details on how we collect, use, and protect information, see our{" "}
        <Link href="/privacy" className="text-sage underline hover:text-t1">
          Privacy Policy
        </Link>
        .
      </>
    ),
  },
  {
    q: "Can we bring over our existing data?",
    a: (
      <>
        Yes. Most programs come to reignara from spreadsheets and a mix of tools — we help you bring that
        information over during onboarding so you&apos;re not starting from scratch.
      </>
    ),
  },
  {
    q: "Is there a mobile app?",
    a: (
      <>
        <strong className="text-t1">Reign</strong> is the mobile companion for titleholders and contestants —
        their calendar, requirements, and updates in their pocket. The rest of the platform works on any
        device, right in the browser.
      </>
    ),
  },
  {
    q: "How do we get started?",
    a: (
      <>
        Request early access below. We&apos;ll reach out to schedule a walkthrough and help you set up your
        program on reignara.
      </>
    ),
  },
]

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-bg">
      <SiteNav active="faq" />

      {/* Header */}
      <section className="mx-auto max-w-3xl px-4 pt-12 text-center sm:px-6 sm:pt-16 lg:pt-20">
        <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.2em] text-sage">FAQ</p>
        <h1 className="font-display text-[36px] sm:text-[52px] lg:text-[60px] leading-[1.08] tracking-tight text-t1">
          Questions, answered
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-[17px] sm:text-[18px] leading-relaxed text-t2">
          The essentials on what reignara is, who it&apos;s for, and how to get started. Don&apos;t see your
          question? We&apos;re happy to help.
        </p>
      </section>

      {/* Accordion */}
      <section className="mx-auto max-w-3xl px-4 pb-6 pt-12 sm:px-6 sm:pt-16">
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-border bg-card p-5 sm:p-6 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <h2 className="font-serif text-[20px] font-medium sm:text-[23px] leading-snug text-t1">{faq.q}</h2>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-t2 transition-transform group-open:rotate-45">
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <div className="mt-4 text-[15px] leading-relaxed text-t2">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="rounded-2xl border border-border bg-dark-slab p-8 text-center sm:p-12">
          <h2 className="font-display text-[26px] sm:text-[34px] leading-tight text-bg">Still have questions?</h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-bg/70">
            Tell us about your program and we&apos;ll get you the answers — and a walkthrough if you&apos;d like one.
          </p>
          <a
            href="#request"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-gold px-7 py-3.5 text-[15px] font-medium text-t1 transition-colors hover:bg-gold/90"
          >
            Get in touch
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
