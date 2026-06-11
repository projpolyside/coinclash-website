import Link from "next/link"
import { Clock } from "lucide-react"

export interface Insight {
  title: string
  excerpt: string
  body: string[]
  category: string
  readingTime: string
}

export const MARKET_INSIGHTS: Insight[] = [
  {
    title: "How to Read a Crypto Comparison the Right Way",
    excerpt:
      "Market cap, volume, and supply each tell a different part of the story. Here's how to weigh them.",
    category: "Education",
    readingTime: "4 min read",
    body: [
      "When you compare two cryptocurrencies, it is tempting to focus only on price. But a single coin's price is largely meaningless without context — a token priced at a few cents can be worth more in aggregate than one priced in the thousands, depending on how many units exist.",
      "Market capitalization is the better starting point because it multiplies price by circulating supply, giving you a sense of the asset's total size. Larger market caps tend to come with deeper liquidity and lower relative volatility, which matters if you ever need to enter or exit a position quickly.",
      "Trading volume reveals how actively an asset changes hands. Supply metrics — circulating, total, and maximum — tell you about future dilution and scarcity. Reading these together, rather than in isolation, is what separates a thoughtful comparison from a superficial one.",
    ],
  },
  {
    title: "Market Cap vs. Fully Diluted Valuation: Why the Gap Matters",
    excerpt:
      "Two projects can look similar today yet have very different futures once all tokens unlock.",
    category: "Analysis",
    readingTime: "5 min read",
    body: [
      "Market capitalization measures only the tokens currently in circulation. Fully diluted valuation (FDV) projects what the market cap would be if every token that will ever exist were already trading. The gap between the two is a direct signal of future supply inflation.",
      "A project with a large gap between market cap and FDV may face sustained selling pressure as locked tokens vest and enter the market. Conversely, an asset with most of its supply already circulating has less hidden dilution risk.",
      "This is one of the most overlooked factors in comparing assets. Always check whether a coin's max supply is capped, and how much of it is already live, before drawing conclusions about its long-term value.",
    ],
  },
  {
    title: "Understanding Volatility and Drawdowns From All-Time Highs",
    excerpt:
      "How far an asset sits below its peak can reveal resilience — or fragility.",
    category: "Risk",
    readingTime: "4 min read",
    body: [
      "Every crypto asset has an all-time high (ATH) and an all-time low (ATL). The distance between the current price and the ATH — the drawdown — is a quick proxy for how much pain holders have endured and how much recovery may remain.",
      "A smaller drawdown can indicate stronger demand and a more resilient holder base. A very deep drawdown is not automatically bad; it can signal either a structurally weak project or a discounted entry point for a fundamentally sound one.",
      "The key is to pair drawdown data with liquidity, adoption, and the project's roadmap. Volatility is the price of admission in crypto — understanding it is how you manage risk rather than be surprised by it.",
    ],
  },
]

export function insightSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function MarketInsights() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {MARKET_INSIGHTS.map((insight) => (
        <Link
          key={insight.title}
          href={`/insights/${insightSlug(insight.title)}`}
          className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
        >
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="rounded-md bg-secondary px-2 py-0.5 font-medium text-foreground">
              {insight.category}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {insight.readingTime}
            </span>
          </div>
          <h3 className="mt-4 text-lg font-semibold leading-snug text-foreground group-hover:text-primary">
            {insight.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {insight.excerpt}
          </p>
          <span className="mt-4 text-sm font-medium text-primary">
            Read article →
          </span>
        </Link>
      ))}
    </div>
  )
}
