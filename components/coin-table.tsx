import Link from "next/link"
import Image from "next/image"
import type { MarketCoin } from "@/lib/coingecko/types"
import { formatPrice, formatLargeNumber } from "@/lib/format"
import { ChangeBadge } from "@/components/change-badge"

/** Dense table of market coins used on listing and category pages. */
export function CoinTable({ coins }: { coins: MarketCoin[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
            <th className="px-4 py-3 font-medium">#</th>
            <th className="px-4 py-3 font-medium">Coin</th>
            <th className="px-4 py-3 text-right font-medium">Price</th>
            <th className="hidden px-4 py-3 text-right font-medium sm:table-cell">
              24h
            </th>
            <th className="hidden px-4 py-3 text-right font-medium md:table-cell">
              7d
            </th>
            <th className="hidden px-4 py-3 text-right font-medium lg:table-cell">
              Market Cap
            </th>
            <th className="hidden px-4 py-3 text-right font-medium lg:table-cell">
              Volume (24h)
            </th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr
              key={coin.id}
              className="border-b border-border last:border-0 transition-colors hover:bg-secondary/60"
            >
              <td className="px-4 py-3 text-muted-foreground tabular-nums">
                {coin.market_cap_rank ?? "—"}
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/coin/${coin.id}`}
                  className="flex items-center gap-3 font-medium text-foreground hover:text-primary"
                >
                  <Image
                    src={coin.image || "/placeholder.svg"}
                    alt={`${coin.name} logo`}
                    width={28}
                    height={28}
                    className="rounded-full"
                    unoptimized
                  />
                  <span className="truncate">{coin.name}</span>
                  <span className="text-xs uppercase text-muted-foreground">
                    {coin.symbol}
                  </span>
                </Link>
              </td>
              <td className="px-4 py-3 text-right font-medium tabular-nums text-foreground">
                {formatPrice(coin.current_price)}
              </td>
              <td className="hidden px-4 py-3 text-right sm:table-cell">
                <ChangeBadge
                  value={coin.price_change_percentage_24h_in_currency ?? coin.price_change_percentage_24h}
                  size="sm"
                />
              </td>
              <td className="hidden px-4 py-3 text-right md:table-cell">
                <ChangeBadge
                  value={coin.price_change_percentage_7d_in_currency}
                  size="sm"
                />
              </td>
              <td className="hidden px-4 py-3 text-right tabular-nums text-muted-foreground lg:table-cell">
                {formatLargeNumber(coin.market_cap)}
              </td>
              <td className="hidden px-4 py-3 text-right tabular-nums text-muted-foreground lg:table-cell">
                {formatLargeNumber(coin.total_volume)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
