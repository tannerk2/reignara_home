"use client"

import { useEffect, useRef, useState } from "react"
import { X, ArrowRight, Check } from "lucide-react"

// Web3Forms access key — a free, backend-less form endpoint for static sites.
// Get one instantly at https://web3forms.com (enter benson@reignara.com; they
// email you a key), then paste it here. Until then, the form shows a graceful
// "email us" fallback instead of silently dropping submissions.
const WEB3FORMS_ACCESS_KEY = "REPLACE_WITH_WEB3FORMS_ACCESS_KEY"
const CONTACT_EMAIL = "benson@reignara.com"

const HASHES = new Set(["#request", "#demo", "#contact", "#early-access"])

type Status = "idle" | "submitting" | "success" | "error"

export function InquiryModal() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<Status>("idle")
  const firstFieldRef = useRef<HTMLInputElement>(null)

  // Open when the URL hash matches one of our CTA hashes.
  useEffect(() => {
    const check = () => setOpen(HASHES.has(window.location.hash))
    check()
    window.addEventListener("hashchange", check)
    return () => window.removeEventListener("hashchange", check)
  }, [])

  // Lock body scroll + focus first field while open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const t = setTimeout(() => firstFieldRef.current?.focus(), 60)
    return () => {
      document.body.style.overflow = prev
      clearTimeout(t)
    }
  }, [open])

  function close() {
    // Clear the hash without a jump or history entry, then close.
    history.replaceState(null, "", window.location.pathname + window.location.search)
    setOpen(false)
    setTimeout(() => setStatus("idle"), 200)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setStatus("submitting")

    if (WEB3FORMS_ACCESS_KEY.startsWith("REPLACE_")) {
      setStatus("error")
      return
    }
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New reignara inquiry",
          from_name: "reignara.com",
          ...data,
        }),
      })
      const json = await res.json()
      setStatus(json.success ? "success" : "error")
    } catch {
      setStatus("error")
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-labelledby="inquiry-title">
      <div className="absolute inset-0 bg-dark-slab/50 backdrop-blur-sm" onClick={close} aria-hidden="true" />

      <div className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-border bg-bg p-6 shadow-2xl sm:rounded-3xl sm:p-8">
        <button
          onClick={close}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-border text-t2 transition-colors hover:text-t1"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {status === "success" ? (
          <div className="flex flex-col items-center py-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage/15 text-sage">
              <Check className="h-7 w-7" />
            </span>
            <h2 id="inquiry-title" className="mt-5 font-display text-[26px] text-t1">
              Thank you — message sent.
            </h2>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-t2">
              We&apos;ve received your note and will be in touch shortly. Keep an eye on your inbox.
            </p>
            <button
              onClick={close}
              className="mt-7 rounded-full bg-gold px-6 py-3 text-[14px] font-medium text-t1 transition-colors hover:bg-gold/90"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-sage">Get in touch</p>
            <h2 id="inquiry-title" className="mt-2 font-display text-[26px] sm:text-[30px] leading-tight text-t1">
              Request early access
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-t2">
              Tell us a little about your program and we&apos;ll reach out to set up a walkthrough.
            </p>

            <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
              <Field label="Name" required>
                <input ref={firstFieldRef} name="name" required autoComplete="name" className={inputCls} placeholder="Your name" />
              </Field>
              <Field label="Email" required>
                <input name="email" type="email" required autoComplete="email" className={inputCls} placeholder="you@example.com" />
              </Field>
              <Field label="Program or organization">
                <input name="organization" className={inputCls} placeholder="e.g. Miss Rodeo Idaho" />
              </Field>
              <Field label="Your role">
                <select name="role" className={inputCls} defaultValue="">
                  <option value="" disabled>
                    Select one
                  </option>
                  <option>Director</option>
                  <option>Titleholder</option>
                  <option>Contestant</option>
                  <option>Sponsor</option>
                  <option>Other</option>
                </select>
              </Field>
              <Field label="Message" required>
                <textarea name="message" required rows={4} className={`${inputCls} resize-none`} placeholder="What would you like to know?" />
              </Field>

              {status === "error" && (
                <p className="text-[14px] leading-relaxed text-destructive">
                  We couldn&apos;t send that just now. Please email us directly at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium underline">
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-[15px] font-medium text-t1 transition-colors hover:bg-gold/90 disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Send request"}
                {status !== "submitting" && (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </button>

              <p className="text-center text-[13px] text-t3">
                Prefer email?{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-sage hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

const inputCls =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-[15px] text-t1 outline-none transition-colors placeholder:text-t3 focus:border-gold focus:ring-2 focus:ring-gold/30"

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-medium text-nav-text">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </span>
      {children}
    </label>
  )
}
