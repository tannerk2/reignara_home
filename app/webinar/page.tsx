import type { Metadata } from "next"
import { SiteNav } from "@/components/site/SiteNav"
import { SiteFooter } from "@/components/site/SiteFooter"
import { RegistrationForm } from "@/components/webinar/RegistrationForm"
import { WEBINAR_TITLE, WEBINAR_TZ_LABEL } from "@/shared/webinar"

export const metadata: Metadata = {
  title: "Join the Webinar — Reignara",
  description:
    "Register for a live walkthrough of Meridian — Reignara's operating platform for pageant programs. We'll email your private join link.",
}

export default function WebinarPage() {
  return (
    <div className="min-h-screen bg-bg">
      <SiteNav />

      <section className="mx-auto max-w-2xl px-4 pt-12 sm:px-6 sm:pt-16">
        <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.2em] text-sage">Live Webinar</p>
        <h1 className="font-display text-[34px] sm:text-[46px] lg:text-[52px] leading-[1.08] tracking-tight text-t1">
          See {WEBINAR_TITLE.replace("Meridian by Reignara — ", "")} — live
        </h1>
        <p className="mt-4 text-[16px] sm:text-[18px] leading-relaxed text-t2">
          Join us for <strong className="text-t1">{WEBINAR_TITLE}</strong>. We&apos;ll walk through how Meridian runs a
          full program end to end and answer your questions live.
        </p>
        <p className="mt-2 text-[15px] font-medium text-sage">{WEBINAR_TZ_LABEL}</p>
      </section>

      <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <RegistrationForm />
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
