import Link from "next/link"
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer id="contact" className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 sm:pb-12 sm:pt-20">
      <div className="flex flex-col items-center gap-6 border-t border-border pt-8 sm:flex-row sm:justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/reignara-logo.svg" alt="reignara" width={28} height={28} className="h-7 w-7" />
          <span className="font-display text-[20px] text-t1">reignara</span>
        </Link>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          <Link href="/products" className="text-[14px] font-medium text-nav-text hover:text-t1 transition-colors">
            Products
          </Link>
          <Link href="/who-its-for" className="text-[14px] font-medium text-nav-text hover:text-t1 transition-colors">
            Who It&apos;s For
          </Link>
          <Link href="/team" className="text-[14px] font-medium text-nav-text hover:text-t1 transition-colors">
            Team
          </Link>
          <Link href="/#contact" className="text-[14px] font-medium text-nav-text hover:text-t1 transition-colors">
            Contact
          </Link>
          <Link href="/support" className="text-[14px] font-medium text-nav-text hover:text-t1 transition-colors">
            Support
          </Link>
          <Link href="/privacy" className="text-[14px] font-medium text-nav-text hover:text-t1 transition-colors">
            Privacy
          </Link>
        </div>
        <p className="text-[13px] text-t2">© 2026 reignara. All rights reserved.</p>
      </div>
    </footer>
  )
}
