import Link from "next/link"
import {
  ArrowRight,
  Mail,
  Clock,
  LifeBuoy,
  Bug,
  KeyRound,
  Smartphone,
  ShieldCheck,
  HelpCircle,
} from "lucide-react"
import { SiteNav } from "@/components/site/SiteNav"
import { SiteFooter } from "@/components/site/SiteFooter"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-bg">
      <SiteNav />

      {/* Header */}
      <section className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-16 lg:pt-20">
        <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.2em] text-sage">
          Support
        </p>
        <h1 className="font-display text-[36px] sm:text-[52px] lg:text-[60px] leading-[1.08] tracking-tight text-t1">
          We&apos;re here to help
        </h1>
        <p className="mt-5 text-[17px] sm:text-[18px] leading-relaxed text-t2">
          Real humans, fast replies. Whether you&apos;re running a pageant, holding a title, or sponsoring a competition, our team is here to keep you moving.
        </p>
      </section>

      {/* Contact cards */}
      <section className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="mailto:support@reignara.com"
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-sage/40 hover:shadow-lg"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-sage/10">
              <Mail className="h-5 w-5 text-sage" />
            </div>
            <h2 className="font-serif text-[22px] font-medium text-t1">Email support</h2>
            <p className="mt-2 flex-1 text-[14px] leading-relaxed text-t2">
              The fastest way to get a real answer. Send us anything — questions, bugs, feature ideas.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-medium text-sage">
              support@reignara.com
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </a>

          <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-sage/10">
              <Clock className="h-5 w-5 text-sage" />
            </div>
            <h2 className="font-serif text-[22px] font-medium text-t1">Response times</h2>
            <p className="mt-2 flex-1 text-[14px] leading-relaxed text-t2">
              We respond within one business day, Monday through Friday, 9am to 5pm Mountain Time.
            </p>
            <span className="mt-4 text-[13px] font-medium text-t3">Holidays excluded</span>
          </div>
        </div>
      </section>

      {/* What to include */}
      <section className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-16">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/10">
              <LifeBuoy className="h-5 w-5 text-sage" />
            </div>
            <h2 className="font-serif text-[26px] font-medium sm:text-[30px] text-t1">What to include in your message</h2>
          </div>
          <p className="text-[15px] leading-relaxed text-t2">
            A little context helps us help you faster. When you reach out, please share:
          </p>
          <ul className="mt-5 space-y-3">
            {[
              "Your name and the email tied to your Reignara account",
              "Which product you're using (Director, Reign, etc.) and the platform (web, iOS, Android)",
              "What you were trying to do and what happened instead",
              "Steps to reproduce, if it's a bug",
              "Screenshots or short screen recordings, if relevant",
              "App version and device model for mobile issues (Settings → About)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-t2">
                <span className="mt-1.5 text-sage">◆</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-16">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/10">
            <HelpCircle className="h-5 w-5 text-sage" />
          </div>
          <h2 className="font-serif text-[30px] font-medium sm:text-[34px] text-t1">Common questions</h2>
        </div>

        <div className="space-y-4">
          <FaqItem
            icon={<KeyRound className="h-4 w-4 text-sage" />}
            question="How do I reset my password?"
          >
            On the sign-in screen, tap <strong className="text-t1">Forgot password</strong> and enter the email tied to your account. We&apos;ll send a reset link that&apos;s valid for one hour. If you don&apos;t see it, check your spam folder, then email us.
          </FaqItem>

          <FaqItem
            icon={<Smartphone className="h-4 w-4 text-sage" />}
            question="The mobile app crashes or won't load. What should I try first?"
          >
            Three quick fixes resolve most issues:
            <ol className="mt-3 list-decimal space-y-1 pl-5">
              <li>Force-close the app and reopen it.</li>
              <li>Make sure you&apos;re on the latest version in the App Store or Google Play.</li>
              <li>Check that your iOS or Android version meets the app&apos;s minimum requirements.</li>
            </ol>
            If the issue persists, email us with your device model, OS version, and app version.
          </FaqItem>

          <FaqItem
            icon={<Bug className="h-4 w-4 text-sage" />}
            question="How do I report a bug?"
          >
            Email <a href="mailto:support@reignara.com" className="text-sage hover:underline">support@reignara.com</a> with what you saw, what you expected, and steps to reproduce. Screenshots or screen recordings make a huge difference.
          </FaqItem>

          <FaqItem
            icon={<ShieldCheck className="h-4 w-4 text-sage" />}
            question="How do I delete my account or my data?"
          >
            You can request account or data deletion from within the app under <strong className="text-t1">Settings → Account</strong>, or by emailing <a href="mailto:support@reignara.com" className="text-sage hover:underline">support@reignara.com</a> from the address tied to your account. We&apos;ll confirm and process the request, subject to any data we&apos;re legally required to retain. Details are in our <Link href="/privacy" className="text-sage hover:underline">Privacy Policy</Link>.
          </FaqItem>

          <FaqItem
            icon={<HelpCircle className="h-4 w-4 text-sage" />}
            question="I have a feature request. Where do I send it?"
          >
            We love these. Email <a href="mailto:support@reignara.com" className="text-sage hover:underline">support@reignara.com</a> with the problem you&apos;re trying to solve. The more context, the better — we ship a lot of features that started as a single user&apos;s note.
          </FaqItem>
        </div>
      </section>

      {/* Company / contact info */}
      <section className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-16">
        <div className="rounded-2xl border border-border bg-dark-slab p-6 sm:p-8">
          <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.2em] text-sage">
            Reignara LLC
          </p>
          <h2 className="font-display text-[24px] sm:text-[28px] text-bg">
            Still need help? Reach out directly.
          </h2>
          <div className="mt-6 text-[15px]">
            <div>
              <p className="text-t3">Support email</p>
              <a
                href="mailto:support@reignara.com"
                className="mt-1 inline-block font-medium text-bg hover:underline"
              >
                support@reignara.com
              </a>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:support@reignara.com"
              className="group inline-flex items-center gap-2 rounded-full bg-sage px-5 py-3 text-[14px] font-medium text-primary-foreground hover:bg-sage transition-colors"
            >
              Email support
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              href="/privacy"
              className="inline-flex items-center gap-2 rounded-full border border-bg/20 px-5 py-3 text-[14px] font-medium text-bg hover:border-bg/40 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

function FaqItem({
  icon,
  question,
  children,
}: {
  icon: React.ReactNode
  question: string
  children: React.ReactNode
}) {
  return (
    <details className="group rounded-2xl border border-border bg-card p-5 sm:p-6 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage/10">
            {icon}
          </div>
          <h3 className="font-serif text-[18px] sm:text-[20px] font-medium text-t1">{question}</h3>
        </div>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-t2 transition-transform group-open:rotate-45">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </summary>
      <div className="mt-4 pl-11 text-[15px] leading-relaxed text-t2">{children}</div>
    </details>
  )
}
