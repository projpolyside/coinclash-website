import Link from "next/link"
import Image from "next/image"
import type { MarketCoin } from "@/lib/coingecko/types"
import { formatPrice, formatLargeNumber } from "@/lib/format"
import { ChangeBadge } from "@/components/change-badge"
import { Sparkline } from "@/components/sparkline"
import { isPositive } from "@/lib/format"

/** Compact card for a single coin — used in trending/movers grids. */
export function CoinCard({ coin }: { coin: MarketCoin }) {
  const change = coin.price_change_percentage_7d_in_currency ?? coin.price_change_percentage_24h
  return (
    <Link
      href={`/coin/${coin.id}`}
      className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
    >
      <div className="flex items-center gap-3">
        <Image
          src={coin.image || "/placeholder.svg"}
          alt={`${coin.name} logo`}
          width={36}
          height={36}
          className="rounded-full"
          unoptimized
        />
        <div className="min-w-0">
          <p className="truncate font-semibold text-foreground">{coin.name}</p>
          <p className="text-xs uppercase text-muted-foreground">
            {coin.symbol}
          </p>
        </div>
        {coin.market_cap_rank && (
          <span className="ml-auto rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
            #{coin.market_cap_rank}
          </span>
        )}
      </div>

      {coin.sparkline_in_7d?.price && (
        <Sparkline
          data={coin.sparkline_in_7d.price}
          positive={isPositive(change)}
        />
      )}

      <div className="flex items-end justify-between">
        <div>
          <p className="text-lg font-bold tabular-nums text-foreground">
            {formatPrice(coin.current_price)}
          </p>
          <p className="text-xs text-muted-foreground">
            MCap {formatLargeNumber(coin.market_cap)}
          </p>
        </div>
        <ChangeBadge value={change} />
      </div>
    </Link>
  )
}
