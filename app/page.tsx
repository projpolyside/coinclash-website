import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Flame, TrendingUp, TrendingDown } from "lucide-react"
import { getMarkets, getTrending } from "@/lib/coingecko/api"
import { SITE } from "@/lib/constants"
import { formatPrice } from "@/lib/format"
import { SectionHeading } from "@/components/section-heading"
import { CoinCard } from "@/components/coin-card"
import { ChangeBadge } from "@/components/change-badge"
import { AdSlot } from "@/components/ad-slot"
import { Newsletter } from "@/components/newsletter"
import { HomeHero } from "@/components/home/home-hero"
import { PopularComparisons } from "@/components/home/popular-comparisons"
import { CategoryGrid } from "@/components/home/category-grid"
import { MarketInsights } from "@/components/home/market-insights"
import type { MarketCoin } from "@/lib/coingecko/types"

export const revalidate = 180

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: "/" },
}

export default async function HomePage() {
  const [markets, trending] = await Promise.all([
    getMarkets(1, 100),
    getTrending(),
  ])

  const movers = [...markets].filter(
    (c) => c.price_change_percentage_24h_in_currency != null,
  )
  movers.sort(
    (a, b) =>
      (b.price_change_percentage_24h_in_currency ?? 0) -
      (a.price_change_percentage_24h_in_currency ?? 0),
  )
  const gainers = movers.slice(0, 4)
  const losers = [...movers].reverse().slice(0, 4)
  const trendingCoins = trending.slice(0, 8)
  const featured = markets.slice(0, 6)

  return (
    <>
      <HomeHero />

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
        <section aria-labelledby="popular-heading">
          <div id="popular-heading">
            <SectionHeading
              title="Popular Comparisons"
              subtitle="Jump straight into the head-to-head matchups crypto investors search for most."
              href="/compare"
              linkLabel="Build your own"
            />
          </div>
          <PopularComparisons />
        </section>

        <AdSlot />

        {trendingCoins.length > 0 && (
          <section aria-labelledby="trending-heading">
            <div id="trending-heading">
              <SectionHeading
                title="Trending Coins"
                subtitle="The cryptocurrencies attracting the most search interest right now."
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {trendingCoins.map((t) => (
                <Link
                  key={t.item.id}
                  href={`/coin/${t.item.id}`}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Flame className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <Image
                    src={t.item.thumb || "/placeholder.svg"}
                    alt={`${t.item.name} logo`}
                    width={28}
                    height={28}
                    className="rounded-full"
                    unoptimized
                  />
                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground">
                      {t.item.name}
                    </p>
                    <p className="text-xs uppercase text-muted-foreground">
                      {t.item.symbol}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section aria-labelledby="movers-heading">
          <div id="movers-heading">
            <SectionHeading
              title="Top Market Movers"
              subtitle="The biggest 24-hour gainers and losers among the top 100 cryptocurrencies."
            />
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <MoverList
              title="Top Gainers"
              icon={<TrendingUp className="h-4 w-4 text-success" />}
              coins={gainers}
            />
            <MoverList
              title="Top Losers"
              icon={<TrendingDown className="h-4 w-4 text-destructive" />}
              coins={losers}
            />
          </div>
        </section>

        <section aria-labelledby="cats-heading">
          <div id="cats-heading">
            <SectionHeading
              title="Popular Categories"
              subtitle="Explore cryptocurrencies grouped by sector — from AI and gaming to DeFi and real-world assets."
              href="/categories"
            />
          </div>
          <CategoryGrid />
        </section>

        <AdSlot />

        <section aria-labelledby="featured-heading">
          <div id="featured-heading">
            <SectionHeading
              title="Featured Comparisons"
              subtitle="A snapshot of the market's largest assets — tap any coin for a full profile."
              href="/coins"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((coin) => (
              <CoinCard key={coin.id} coin={coin} />
            ))}
          </div>
        </section>

        <section aria-labelledby="insights-heading">
          <div id="insights-heading">
            <SectionHeading
              title="Latest Market Insights"
              subtitle="Plain-English guides to help you interpret the data behind every comparison."
              href="/insights"
            />
          </div>
          <MarketInsights />
        </section>

        <Newsletter />
      </div>
    </>
  )
}

function MoverList({
  title,
  icon,
  coins,
}: {
  title: string
  icon: React.ReactNode
  coins: MarketCoin[]
}) {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-5 py-4">
        {icon}
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <ul>
        {coins.map((coin) => (
          <li key={coin.id} className="border-b border-border last:border-0">
            <Link
              href={`/coin/${coin.id}`}
              className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-secondary/60"
            >
              <Image
                src={coin.image || "/placeholder.svg"}
                alt={`${coin.name} logo`}
                width={28}
                height={28}
                className="rounded-full"
                unoptimized
              />
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">
                  {coin.name}
                </p>
                <p className="text-xs uppercase text-muted-foreground">
                  {coin.symbol}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="font-medium tabular-nums text-foreground">
                  {formatPrice(coin.current_price)}
                </p>
                <ChangeBadge
                  value={coin.price_change_percentage_24h_in_currency}
                  size="sm"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
