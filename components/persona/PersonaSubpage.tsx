import { personas } from "@/content/personas"
import { SiteNav } from "@/components/site/SiteNav"
import { SiteFooter } from "@/components/site/SiteFooter"
import { PersonaTabs } from "@/components/persona/PersonaTabs"
import { PersonaDetail } from "@/components/persona/PersonaDetail"

export function PersonaSubpage({ personaId }: { personaId: string }) {
  const persona = personas.find((p) => p.id === personaId) ?? personas[0]

  return (
    <div className="min-h-screen bg-bg">
      <SiteNav active="who" activePersona={persona.id} />
      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-sage">Who it&apos;s for</p>
        <PersonaTabs activeId={persona.id} />
        <div className="mt-16">
          <PersonaDetail persona={persona} />
        </div>
      </section>
      <SiteFooter />
    </div>
  )
}
