import { SiteNav } from "@/components/site/SiteNav"
import { SiteFooter } from "@/components/site/SiteFooter"
import { WhoIsReignaraFor } from "@/components/persona/WhoIsReignaraFor"

export default function WhoItsForPage() {
  return (
    <div className="min-h-screen bg-bg">
      <SiteNav active="who" activePersona="overview" />
      <WhoIsReignaraFor />
      <SiteFooter />
    </div>
  )
}
