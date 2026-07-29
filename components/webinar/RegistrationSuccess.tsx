import { CheckCircle2 } from "lucide-react"
import { WEBINAR_TZ_LABEL } from "@/shared/webinar"

export function RegistrationSuccess({ email }: { email?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 text-center sm:p-10">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-sage/10">
        <CheckCircle2 className="h-7 w-7 text-sage" />
      </div>
      <h2 className="font-serif text-[26px] font-medium text-t1 sm:text-[30px]">You&apos;re registered</h2>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-t2">
        Thanks for signing up for the live Meridian demo on {WEBINAR_TZ_LABEL}.
      </p>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-t2">
        We&apos;ve emailed your private join link{email ? <> to <strong className="text-t1">{email}</strong></> : ""} —
        along with a calendar invite. Keep an eye on your inbox (and your spam folder, just in case).
      </p>
      <p className="mx-auto mt-4 max-w-md text-[13px] text-t3">
        Didn&apos;t get it? You can request it again from the join link page anytime.
      </p>
    </div>
  )
}
