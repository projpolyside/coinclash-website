export const SITE = {
  name: "CoinClash",
  url: "https://coinclash.app",
  tagline: "Compare Any Cryptocurrency Instantly",
  description:
    "CoinClash lets you compare any two cryptocurrencies side-by-side with live prices, market caps, performance, and supply metrics — plus clear written verdicts to help you decide.",
}

export const POPULAR_COMPARISONS: { a: string; b: string; aName: string; bName: string }[] = [
  { a: "bitcoin", b: "ethereum", aName: "Bitcoin", bName: "Ethereum" },
  { a: "solana", b: "sui", aName: "Solana", bName: "Sui" },
  { a: "dogecoin", b: "shiba-inu", aName: "Dogecoin", bName: "Shiba Inu" },
  { a: "cardano", b: "polkadot", aName: "Cardano", bName: "Polkadot" },
  { a: "ethereum", b: "solana", aName: "Ethereum", bName: "Solana" },
  { a: "bitcoin", b: "litecoin", aName: "Bitcoin", bName: "Litecoin" },
  { a: "avalanche-2", b: "polygon", aName: "Avalanche", bName: "Polygon" },
  { a: "chainlink", b: "polkadot", aName: "Chainlink", bName: "Polkadot" },
  { a: "ripple", b: "stellar", aName: "XRP", bName: "Stellar" },
  { a: "uniswap", b: "aave", aName: "Uniswap", bName: "Aave" },
  { a: "near", b: "aptos", aName: "NEAR", bName: "Aptos" },
  { a: "tron", b: "ethereum", aName: "TRON", bName: "Ethereum" },
]

export const FEATURED_CATEGORIES: { id: string; name: string; blurb: string }[] = [
  {
    id: "artificial-intelligence",
    name: "AI Coins",
    blurb: "Tokens powering decentralized AI compute, agents, and data networks.",
  },
  {
    id: "gaming",
    name: "Gaming Coins",
    blurb: "Currencies behind blockchain games and in-game economies.",
  },
  {
    id: "meme-token",
    name: "Meme Coins",
    blurb: "Community-driven tokens fueled by culture and viral momentum.",
  },
  {
    id: "decentralized-finance-defi",
    name: "DeFi Coins",
    blurb: "Protocols for lending, trading, and yield without intermediaries.",
  },
  {
    id: "real-world-assets-rwa",
    name: "RWA Coins",
    blurb: "Tokens bringing real-world assets like bonds and property on-chain.",
  },
  {
    id: "layer-1",
    name: "Layer 1",
    blurb: "Base blockchains that settle transactions and secure their networks.",
  },
]

export function comparisonSlug(a: string, b: string): string {
  return `${a}-vs-${b}`
}

export function parseComparisonSlug(
  slug: string,
): { a: string; b: string } | null {
  const idx = slug.indexOf("-vs-")
  if (idx === -1) return null
  const a = slug.slice(0, idx)
  const b = slug.slice(idx + 4)
  if (!a || !b) return null
  return { a, b }
}
