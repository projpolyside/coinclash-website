import Link from "next/link"
import { TrendingUp } from "lucide-react"
import { POPULAR_COMPARISONS, FEATURED_CATEGORIES, SITE } from "@/lib/constants"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* About */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <TrendingUp className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-lg font-bold tracking-tight text-foreground">
                Coin<span className="text-primary">Clash</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {SITE.name} is an independent cryptocurrency comparison platform.
              We turn live market data into clear, side-by-side comparisons so
              you can research digital assets with confidence.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/coins", label: "All Coins" },
                { href: "/compare", label: "Compare Coins" },
                { href: "/categories", label: "Categories" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular comparisons */}
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Popular Comparisons
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {POPULAR_COMPARISONS.slice(0, 6).map((c) => (
                <li key={`${c.a}-${c.b}`}>
                  <Link
                    href={`/compare/${c.a}-vs-${c.b}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {c.aName} vs {c.bName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-sm font-semibold text-foreground">Categories</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {FEATURED_CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/category/${c.id}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="text-sm font-semibold text-foreground">Legal</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/disclaimer", label: "Disclaimer" },
                { href: "/contact", label: "Contact Us" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Disclaimer: {SITE.name} provides cryptocurrency data and comparisons
            for informational purposes only. Nothing on this site constitutes
            financial, investment, or trading advice. Cryptocurrency markets are
            highly volatile — always do your own research before making any
            decision. Market data is provided by the CoinGecko API and may be
            delayed.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            © {year} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
