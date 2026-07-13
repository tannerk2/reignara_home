import { SiteNav } from "@/components/site/SiteNav"
import { SiteFooter } from "@/components/site/SiteFooter"
import { products } from "@/lib/products"
import { ProductsHero } from "@/components/products/hero"
import { SectionShell } from "@/components/products/section-shell"
import { ClosingSection } from "@/components/products/closing-section"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-bg">
      <SiteNav active="products" />
      <main>
        <ProductsHero />
        {products.map((product, i) => (
          <SectionShell key={product.slug} product={product} index={i} />
        ))}
        <ClosingSection />
      </main>
      <SiteFooter />
    </div>
  )
}
