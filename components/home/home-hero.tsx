import { SearchBar } from "@/components/search-bar"
import { ComparePicker } from "@/components/compare-picker"
import { SITE } from "@/lib/constants"

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            Live data from CoinGecko · Updated continuously
          </span>
          <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {SITE.tagline}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Compare prices, market caps, performance, supply metrics, and key
            statistics side-by-side — with clear written verdicts that help you
            make sense of the numbers.
          </p>
          <div className="mx-auto mt-8 max-w-xl">
            <SearchBar
              size="large"
              placeholder="Search Bitcoin, Ethereum, Solana…"
            />
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <p className="mb-3 text-center text-sm font-medium text-muted-foreground">
            Or build a head-to-head comparison
          </p>
          <ComparePicker />
        </div>
      </div>
    </section>
  )
}
