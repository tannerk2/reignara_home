import type { Metadata } from "next"
import { personas } from "@/content/personas"
import { PersonaSubpage } from "@/components/persona/PersonaSubpage"

export function generateStaticParams() {
  return personas.map((p) => ({ persona: p.id }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ persona: string }>
}): Promise<Metadata> {
  const { persona } = await params
  const p = personas.find((x) => x.id === persona)
  return {
    title: p ? `reignara for ${p.label}` : "Who It's For — reignara",
    description: p?.headline,
  }
}

export default async function Page({ params }: { params: Promise<{ persona: string }> }) {
  const { persona } = await params
  return <PersonaSubpage personaId={persona} />
}
