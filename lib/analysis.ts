import type { MarketCoin } from "./coingecko/types"
import { formatLargeNumber, formatPercent, formatPrice } from "./format"

export interface MetricResult {
  label: string
  description: string
  winner: "a" | "b" | "tie"
  aDisplay: string
  bDisplay: string
}

export interface ComparisonAnalysis {
  scoreA: number
  scoreB: number
  metrics: MetricResult[]
  winner: MarketCoin
  loser: MarketCoin
  isTie: boolean
  verdict: string
  highlights: string[]
}

function compareNumeric(
  a: number | null | undefined,
  b: number | null | undefined,
  higherIsBetter = true,
): "a" | "b" | "tie" {
  const av = a ?? 0
  const bv = b ?? 0
  if (av === bv) return "tie"
  const aWins = higherIsBetter ? av > bv : av < bv
  return aWins ? "a" : "b"
}

/**
 * Build a structured, scored comparison between two coins with a
 * human-readable verdict and key highlights for SEO/content value.
 */
export function analyzeComparison(
  a: MarketCoin,
  b: MarketCoin,
): ComparisonAnalysis {
  const metrics: MetricResult[] = []

  const marketCap = compareNumeric(a.market_cap, b.market_cap)
  metrics.push({
    label: "Market Capitalization",
    description:
      "A larger market cap generally signals a more established asset with deeper liquidity and lower relative volatility.",
    winner: marketCap,
    aDisplay: formatLargeNumber(a.market_cap),
    bDisplay: formatLargeNumber(b.market_cap),
  })

  const volume = compareNumeric(a.total_volume, b.total_volume)
  metrics.push({
    label: "24h Trading Volume",
    description:
      "Higher trading volume indicates stronger market activity and easier entry and exit for investors.",
    winner: volume,
    aDisplay: formatLargeNumber(a.total_volume),
    bDisplay: formatLargeNumber(b.total_volume),
  })

  const rank = compareNumeric(
    a.market_cap_rank,
    b.market_cap_rank,
    false,
  )
  metrics.push({
    label: "Market Rank",
    description:
      "A higher market rank reflects greater overall adoption and investor confidence relative to the rest of the market.",
    winner: rank,
    aDisplay: a.market_cap_rank ? `#${a.market_cap_rank}` : "—",
    bDisplay: b.market_cap_rank ? `#${b.market_cap_rank}` : "—",
  })

  const perf7d = compareNumeric(
    a.price_change_percentage_7d_in_currency,
    b.price_change_percentage_7d_in_currency,
  )
  metrics.push({
    label: "7-Day Performance",
    description:
      "Recent price momentum over the past week, useful for gauging short-term market sentiment.",
    winner: perf7d,
    aDisplay: formatPercent(a.price_change_percentage_7d_in_currency),
    bDisplay: formatPercent(b.price_change_percentage_7d_in_currency),
  })

  const perf30d = compareNumeric(
    a.price_change_percentage_30d_in_currency,
    b.price_change_percentage_30d_in_currency,
  )
  metrics.push({
    label: "30-Day Performance",
    description:
      "Medium-term momentum that helps smooth out daily noise and reveal an emerging trend.",
    winner: perf30d,
    aDisplay: formatPercent(a.price_change_percentage_30d_in_currency),
    bDisplay: formatPercent(b.price_change_percentage_30d_in_currency),
  })

  const perf1y = compareNumeric(
    a.price_change_percentage_1y_in_currency,
    b.price_change_percentage_1y_in_currency,
  )
  metrics.push({
    label: "1-Year Performance",
    description:
      "Long-term return that reflects how the asset has rewarded patient holders over a full market cycle.",
    winner: perf1y,
    aDisplay: formatPercent(a.price_change_percentage_1y_in_currency),
    bDisplay: formatPercent(b.price_change_percentage_1y_in_currency),
  })

  // ATH recovery — closer to ATH (less negative) is healthier.
  const athRecovery = compareNumeric(
    a.ath_change_percentage,
    b.ath_change_percentage,
  )
  metrics.push({
    label: "Distance From ATH",
    description:
      "How far the price sits below its all-time high. A smaller drawdown suggests stronger price resilience.",
    winner: athRecovery,
    aDisplay: formatPercent(a.ath_change_percentage),
    bDisplay: formatPercent(b.ath_change_percentage),
  })

  // Supply scarcity — having a capped max supply is a scarcity advantage.
  const aCapped = a.max_supply != null
  const bCapped = b.max_supply != null
  let supplyWinner: "a" | "b" | "tie" = "tie"
  if (aCapped && !bCapped) supplyWinner = "a"
  else if (!aCapped && bCapped) supplyWinner = "b"
  metrics.push({
    label: "Supply Scarcity",
    description:
      "A fixed maximum supply introduces hard scarcity, which can support long-term value if demand grows.",
    winner: supplyWinner,
    aDisplay: aCapped ? "Capped supply" : "Uncapped",
    bDisplay: bCapped ? "Capped supply" : "Uncapped",
  })

  let scoreA = 0
  let scoreB = 0
  for (const m of metrics) {
    if (m.winner === "a") scoreA++
    else if (m.winner === "b") scoreB++
  }

  const isTie = scoreA === scoreB
  const winner = scoreA >= scoreB ? a : b
  const loser = scoreA >= scoreB ? b : a

  const highlights: string[] = []
  if (marketCap === "a")
    highlights.push(`${a.name} has a larger market cap at ${formatLargeNumber(a.market_cap)}.`)
  else if (marketCap === "b")
    highlights.push(`${b.name} has a larger market cap at ${formatLargeNumber(b.market_cap)}.`)
  if (perf7d === "a")
    highlights.push(`${a.name} is outperforming over the last 7 days.`)
  else if (perf7d === "b")
    highlights.push(`${b.name} is outperforming over the last 7 days.`)
  if (supplyWinner === "a")
    highlights.push(`${a.name} has a fixed maximum supply, adding scarcity.`)
  else if (supplyWinner === "b")
    highlights.push(`${b.name} has a fixed maximum supply, adding scarcity.`)
  if (volume === "a")
    highlights.push(`${a.name} has deeper 24h liquidity.`)
  else if (volume === "b")
    highlights.push(`${b.name} has deeper 24h liquidity.`)

  const verdict = buildVerdict(a, b, winner, loser, isTie, scoreA, scoreB)

  return {
    scoreA,
    scoreB,
    metrics,
    winner,
    loser,
    isTie,
    verdict,
    highlights: highlights.slice(0, 4),
  }
}

function buildVerdict(
  a: MarketCoin,
  b: MarketCoin,
  winner: MarketCoin,
  loser: MarketCoin,
  isTie: boolean,
  scoreA: number,
  scoreB: number,
): string {
  const winnerScore = Math.max(scoreA, scoreB)
  const loserScore = Math.min(scoreA, scoreB)

  if (isTie) {
    return `${a.name} (${a.symbol.toUpperCase()}) and ${b.name} (${b.symbol.toUpperCase()}) are remarkably evenly matched across our key metrics. ${a.name} trades at ${formatPrice(
      a.current_price,
    )} while ${b.name} trades at ${formatPrice(
      b.current_price,
    )}. Neither asset holds a decisive overall advantage, so your choice should come down to which specific qualities — liquidity, momentum, scarcity, or market position — matter most for your strategy.`
  }

  return `Based on a weighted look at market capitalization, liquidity, momentum, and supply dynamics, ${winner.name} (${winner.symbol.toUpperCase()}) edges out ${loser.name} (${loser.symbol.toUpperCase()}) with a ${winnerScore}–${loserScore} advantage across our scored metrics. ${winner.name} currently trades at ${formatPrice(
    winner.current_price,
  )} with a market cap of ${formatLargeNumber(
    winner.market_cap,
  )}, compared with ${loser.name} at ${formatPrice(
    loser.current_price,
  )}. That said, a higher score does not guarantee better future returns — ${loser.name} may still be the stronger pick depending on your time horizon and risk appetite.`
}
