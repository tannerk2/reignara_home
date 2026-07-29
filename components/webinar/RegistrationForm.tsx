"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import {
  ROLES,
  LEVELS,
  US_STATES,
  CONTESTANT_BUCKETS,
  EVENTS_PER_YEAR,
  CURRENT_TOOLS,
  MODULES,
  MODULE_DESCRIPTIONS,
} from "@/shared/enums"
import { PARENT_ORGS } from "@/shared/generated/parent-orgs.generated"
import { registrationFormSchema, suggestEmailCorrection } from "@/shared/schema"
import { SUBMIT_PATH } from "@/shared/webinar"
import { cn } from "@/lib/utils"
import { SystemCombobox } from "./SystemCombobox"
import { RegistrationSuccess } from "./RegistrationSuccess"

type Values = {
  firstName: string
  lastName: string
  email: string
  role: string
  parentOrg: string
  systemName: string
  level: string
  state: string
  consentMarketing: boolean
  phone: string
  contestantBucket: string
  eventsPerYear: string
  currentTools: string[]
  modulesOfInterest: string[]
  notes: string
}

const INITIAL: Values = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  parentOrg: "",
  systemName: "",
  level: "",
  state: "",
  consentMarketing: false,
  phone: "",
  contestantBucket: "",
  eventsPerYear: "",
  currentTools: [],
  modulesOfInterest: [],
  notes: "",
}

const LABELS: Record<string, string> = {
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  role: "Your role",
  parentOrg: "Parent organization",
  systemName: "System / title name",
  level: "Level",
  state: "State",
  consentMarketing: "Consent",
}

function maskPhone(input: string): string {
  let d = input.replace(/\D/g, "")
  if (d.length && d[0] === "1") d = d.slice(1)
  d = d.slice(0, 10)
  if (d.length === 0) return ""
  if (d.length < 4) return `+1 (${d}`
  if (d.length < 7) return `+1 (${d.slice(0, 3)}) ${d.slice(3)}`
  return `+1 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 10)}`
}

export function RegistrationForm() {
  const [v, setV] = useState<Values>(INITIAL)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [serverError, setServerError] = useState<string | null>(null)
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState("")
  const summaryRef = useRef<HTMLDivElement>(null)
  const renderedAt = useRef<number>(Date.now())
  const utm = useRef<Record<string, string>>({})
  const referrer = useRef<string>("")

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const u: Record<string, string> = {}
      for (const k of ["source", "medium", "campaign", "term", "content"]) {
        const val = params.get(`utm_${k}`)
        if (val) u[k] = val.slice(0, 200)
      }
      utm.current = u
      referrer.current = document.referrer || ""
    } catch {
      /* ignore */
    }
  }, [])

  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    setV((prev) => ({ ...prev, [k]: val }))
    setErrors((prev) => (prev[k as string] ? { ...prev, [k as string]: "" } : prev))
  }

  const toggleArray = (k: "currentTools" | "modulesOfInterest", option: string) => {
    setV((prev) => {
      const has = prev[k].includes(option)
      return { ...prev, [k]: has ? prev[k].filter((x) => x !== option) : [...prev[k], option] }
    })
  }

  const errorList = useMemo(() => Object.entries(errors).filter(([, m]) => m), [errors])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setServerError(null)
    const parsed = registrationFormSchema.safeParse({
      ...v,
      phone: v.phone || undefined,
      contestantBucket: v.contestantBucket || undefined,
      eventsPerYear: v.eventsPerYear || undefined,
      notes: v.notes || undefined,
    })
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors
      const next: Record<string, string> = {}
      for (const [k, msgs] of Object.entries(fieldErrors)) if (msgs && msgs[0]) next[k] = msgs[0]
      setErrors(next)
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }

    setStatus("submitting")
    try {
      const res = await fetch(SUBMIT_PATH, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          company: honeypot, // honeypot — real users leave this empty
          formRenderedAt: renderedAt.current,
          utm: utm.current,
          referrer: referrer.current,
        }),
      })
      if (res.ok) {
        const j = await res.json().catch(() => ({}))
        if (j.ok) {
          setStatus("success")
          return
        }
      }
      if (res.status === 400) {
        const j = await res.json().catch(() => ({}))
        const next: Record<string, string> = {}
        for (const [k, msgs] of Object.entries(j.errors || {})) {
          if (Array.isArray(msgs) && msgs[0]) next[k] = String(msgs[0])
        }
        setErrors(next)
        setStatus("idle")
        requestAnimationFrame(() => summaryRef.current?.focus())
        return
      }
      if (res.status === 429) {
        setServerError("You've tried a few times quickly — please wait a moment and try again.")
      } else {
        setServerError("Something went wrong on our end. Please try again, or email hello@reignara.com.")
      }
      setStatus("error")
    } catch {
      setServerError("We couldn't reach the server. Check your connection and try again.")
      setStatus("error")
    }
  }

  if (status === "success") return <RegistrationSuccess email={v.email} />

  const labelCls = "block text-[14px] font-medium text-t1"
  const inputCls = (field: string) =>
    cn(
      "min-h-[48px] w-full rounded-xl border bg-card px-3.5 text-[16px] text-t1 outline-none transition-colors focus:border-sage",
      errors[field] ? "border-red-400" : "border-border",
    )
  const errId = (field: string) => (errors[field] ? `${field}-error` : undefined)

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-red-300 bg-red-50 p-4 outline-none"
        >
          <p className="text-[14px] font-semibold text-red-800">Please fix the following:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] text-red-700">
            {errorList.map(([field, msg]) => (
              <li key={field}>
                <a href={`#${field}`} className="underline">
                  {LABELS[field] || field}: {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelCls}>
            First name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            className={cn("mt-1.5", inputCls("firstName"))}
            value={v.firstName}
            autoComplete="given-name"
            aria-describedby={errId("firstName")}
            aria-invalid={!!errors.firstName}
            onChange={(e) => set("firstName", e.target.value)}
          />
          {errors.firstName && <p id="firstName-error" className="mt-1 text-[13px] text-red-600">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className={labelCls}>
            Last name <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            className={cn("mt-1.5", inputCls("lastName"))}
            value={v.lastName}
            autoComplete="family-name"
            aria-describedby={errId("lastName")}
            aria-invalid={!!errors.lastName}
            onChange={(e) => set("lastName", e.target.value)}
          />
          {errors.lastName && <p id="lastName-error" className="mt-1 text-[13px] text-red-600">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          inputMode="email"
          className={cn("mt-1.5", inputCls("email"))}
          value={v.email}
          autoComplete="email"
          aria-describedby={errId("email")}
          aria-invalid={!!errors.email}
          onChange={(e) => {
            set("email", e.target.value)
            setEmailSuggestion(null)
          }}
          onBlur={() => setEmailSuggestion(suggestEmailCorrection(v.email.trim()))}
        />
        {errors.email && <p id="email-error" className="mt-1 text-[13px] text-red-600">{errors.email}</p>}
        {emailSuggestion && (
          <p className="mt-1 text-[13px] text-t2">
            Did you mean{" "}
            <button
              type="button"
              className="font-medium text-sage underline"
              onClick={() => {
                set("email", emailSuggestion)
                setEmailSuggestion(null)
              }}
            >
              {emailSuggestion}
            </button>
            ?
          </p>
        )}
      </div>

      <div>
        <label htmlFor="role" className={labelCls}>
          Your role <span className="text-red-500">*</span>
        </label>
        <select
          id="role"
          className={cn("mt-1.5", inputCls("role"))}
          value={v.role}
          aria-describedby={errId("role")}
          aria-invalid={!!errors.role}
          onChange={(e) => set("role", e.target.value)}
        >
          <option value="">Select…</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        {errors.role && <p id="role-error" className="mt-1 text-[13px] text-red-600">{errors.role}</p>}
      </div>

      <div>
        <label htmlFor="parentOrg" className={labelCls}>
          Parent organization <span className="text-red-500">*</span>
        </label>
        <select
          id="parentOrg"
          className={cn("mt-1.5", inputCls("parentOrg"))}
          value={v.parentOrg}
          aria-describedby={errId("parentOrg")}
          aria-invalid={!!errors.parentOrg}
          onChange={(e) => {
            set("parentOrg", e.target.value)
            set("systemName", "")
          }}
        >
          <option value="">Select…</option>
          {PARENT_ORGS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
        {errors.parentOrg && <p id="parentOrg-error" className="mt-1 text-[13px] text-red-600">{errors.parentOrg}</p>}
      </div>

      <div>
        <label htmlFor="systemName" className={labelCls}>
          System / title name <span className="text-red-500">*</span>
        </label>
        <div className="mt-1.5">
          <SystemCombobox
            id="systemName"
            parentOrgId={v.parentOrg}
            value={v.systemName}
            onChange={(val) => set("systemName", val)}
            describedBy={errId("systemName")}
            invalid={!!errors.systemName}
          />
        </div>
        {errors.systemName && <p id="systemName-error" className="mt-1 text-[13px] text-red-600">{errors.systemName}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="level" className={labelCls}>
            Level <span className="text-red-500">*</span>
          </label>
          <select
            id="level"
            className={cn("mt-1.5", inputCls("level"))}
            value={v.level}
            aria-describedby={errId("level")}
            aria-invalid={!!errors.level}
            onChange={(e) => set("level", e.target.value)}
          >
            <option value="">Select…</option>
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          {errors.level && <p id="level-error" className="mt-1 text-[13px] text-red-600">{errors.level}</p>}
        </div>
        <div>
          <label htmlFor="state" className={labelCls}>
            State <span className="text-red-500">*</span>
          </label>
          <select
            id="state"
            className={cn("mt-1.5", inputCls("state"))}
            value={v.state}
            aria-describedby={errId("state")}
            aria-invalid={!!errors.state}
            onChange={(e) => set("state", e.target.value)}
          >
            <option value="">Select…</option>
            {US_STATES.map((s) => (
              <option key={s.abbr} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.state && <p id="state-error" className="mt-1 text-[13px] text-red-600">{errors.state}</p>}
        </div>
      </div>

      {/* Optional details */}
      <fieldset className="rounded-2xl border border-border bg-bg/40 p-5">
        <legend className="px-2 text-[13px] font-medium uppercase tracking-[0.15em] text-sage">
          Optional — helps us tailor the demo
        </legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className={labelCls}>
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              className={cn("mt-1.5", inputCls("phone"))}
              value={v.phone}
              placeholder="+1 (555) 555-5555"
              autoComplete="tel"
              onChange={(e) => set("phone", maskPhone(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="contestantBucket" className={labelCls}>
              Contestants per year
            </label>
            <select
              id="contestantBucket"
              className={cn("mt-1.5", inputCls("contestantBucket"))}
              value={v.contestantBucket}
              onChange={(e) => set("contestantBucket", e.target.value)}
            >
              <option value="">Prefer not to say</option>
              {CONTESTANT_BUCKETS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="eventsPerYear" className={labelCls}>
            Events per year
          </label>
          <select
            id="eventsPerYear"
            className={cn("mt-1.5 sm:max-w-[240px]", inputCls("eventsPerYear"))}
            value={v.eventsPerYear}
            onChange={(e) => set("eventsPerYear", e.target.value)}
          >
            <option value="">Prefer not to say</option>
            {EVENTS_PER_YEAR.map((e2) => (
              <option key={e2} value={e2}>
                {e2}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="mt-6">
          <legend className={labelCls}>What are you using today?</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {CURRENT_TOOLS.map((t) => {
              const active = v.currentTools.includes(t)
              return (
                <button
                  type="button"
                  key={t}
                  aria-pressed={active}
                  onClick={() => toggleArray("currentTools", t)}
                  className={cn(
                    "min-h-[44px] rounded-full border px-4 text-[14px] transition-colors",
                    active ? "border-sage bg-sage/10 text-t1" : "border-border text-t2 hover:border-sage/40",
                  )}
                >
                  {t}
                </button>
              )
            })}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className={labelCls}>Which modules interest you most?</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {MODULES.map((m) => {
              const active = v.modulesOfInterest.includes(m)
              return (
                <button
                  type="button"
                  key={m}
                  aria-pressed={active}
                  onClick={() => toggleArray("modulesOfInterest", m)}
                  className={cn(
                    "flex min-h-[44px] items-start gap-3 rounded-xl border p-3 text-left transition-colors",
                    active ? "border-sage bg-sage/10" : "border-border hover:border-sage/40",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                      active ? "border-sage bg-sage text-white" : "border-border",
                    )}
                  >
                    {active && <Check className="h-3.5 w-3.5" />}
                  </span>
                  <span>
                    <span className="block text-[14px] font-medium text-t1">{m}</span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-t2">{MODULE_DESCRIPTIONS[m]}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </fieldset>

        <div className="mt-6">
          <label htmlFor="notes" className={labelCls}>
            Anything you'd like us to cover?
          </label>
          <textarea
            id="notes"
            rows={3}
            maxLength={500}
            className={cn("mt-1.5 resize-none py-3", inputCls("notes"))}
            value={v.notes}
            onChange={(e) => set("notes", e.target.value)}
          />
          <p className="mt-1 text-right text-[12px] text-t3">{v.notes.length}/500</p>
        </div>
      </fieldset>

      {/* Honeypot — visually hidden, off-screen, aria-hidden */}
      <div aria-hidden="true" className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input
            tabIndex={-1}
            autoComplete="off"
            name="company"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <label className="flex items-start gap-3 text-[14px] leading-relaxed text-t2">
        <input
          type="checkbox"
          className="mt-1 h-5 w-5 shrink-0 rounded border-border accent-sage"
          checked={v.consentMarketing}
          onChange={(e) => set("consentMarketing", e.target.checked)}
        />
        <span>I&apos;d like to receive occasional updates from Reignara about Meridian and future events.</span>
      </label>

      {serverError && (
        <p role="alert" className="rounded-xl border border-red-300 bg-red-50 p-3 text-[14px] text-red-700">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-gold px-7 text-[16px] font-medium text-t1 transition-colors hover:bg-gold/90 disabled:opacity-60"
      >
        {status === "submitting" ? "Registering…" : "Reserve my spot"}
        {status !== "submitting" && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
      </button>
      <p className="text-center text-[12px] text-t3">
        We&apos;ll email your private join link. We never share your information.
      </p>
    </form>
  )
}
