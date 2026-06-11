export interface MarketCoin {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number | null
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  price_change_percentage_1h_in_currency?: number
  price_change_percentage_24h_in_currency?: number
  price_change_percentage_7d_in_currency?: number
  price_change_percentage_30d_in_currency?: number
  price_change_percentage_1y_in_currency?: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number | null
  max_supply: number | null
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  last_updated: string
  sparkline_in_7d?: { price: number[] }
}

export interface CoinDetail {
  id: string
  symbol: string
  name: string
  description: { en: string }
  image: { thumb: string; small: string; large: string }
  market_cap_rank: number
  categories: string[]
  links: {
    homepage: string[]
    blockchain_site: string[]
    twitter_screen_name: string
    subreddit_url: string
    repos_url: { github: string[] }
  }
  genesis_date: string | null
  hashing_algorithm: string | null
  market_data: {
    current_price: { usd: number }
    market_cap: { usd: number }
    fully_diluted_valuation: { usd: number | null }
    total_volume: { usd: number }
    high_24h: { usd: number }
    low_24h: { usd: number }
    price_change_percentage_24h: number
    price_change_percentage_7d: number
    price_change_percentage_30d: number
    price_change_percentage_1y: number
    ath: { usd: number }
    ath_date: { usd: string }
    atl: { usd: number }
    atl_date: { usd: string }
    circulating_supply: number
    total_supply: number | null
    max_supply: number | null
  }
}

export interface TrendingCoin {
  item: {
    id: string
    coin_id: number
    name: string
    symbol: string
    market_cap_rank: number
    thumb: string
    small: string
    large: string
    slug: string
    price_btc: number
    data?: {
      price: number
      price_change_percentage_24h?: { usd: number }
      market_cap?: string
    }
  }
}

export interface CategoryShort {
  category_id: string
  name: string
}

export interface CategoryMarket {
  id: string
  name: string
  market_cap: number
  market_cap_change_24h: number
  volume_24h: number
  top_3_coins: string[]
  top_3_coins_id?: string[]
}

export interface SearchCoin {
  id: string
  name: string
  symbol: string
  market_cap_rank: number | null
  thumb: string
  large: string
}

export interface MarketChart {
  prices: [number, number][]
  market_caps: [number, number][]
  total_volumes: [number, number][]
}
