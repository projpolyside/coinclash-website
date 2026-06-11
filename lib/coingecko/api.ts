import { cg } from "./client"
import type {
  MarketCoin,
  CoinDetail,
  TrendingCoin,
  CategoryShort,
  CategoryMarket,
  SearchCoin,
  MarketChart,
} from "./types"

/** Top markets by market cap, with price-change windows and sparkline. */
export async function getMarkets(
  page = 1,
  perPage = 100,
): Promise<MarketCoin[]> {
  const data = await cg<MarketCoin[]>(
    `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h,24h,7d,30d,1y`,
    180,
  )
  return data ?? []
}

/** A single coin's market row by id. */
export async function getCoinMarket(id: string): Promise<MarketCoin | null> {
  const data = await cg<MarketCoin[]>(
    `/coins/markets?vs_currency=usd&ids=${id}&sparkline=true&price_change_percentage=1h,24h,7d,30d,1y`,
    180,
  )
  return data?.[0] ?? null
}

/** Market rows for an explicit list of ids. */
export async function getCoinMarketsByIds(
  ids: string[],
): Promise<MarketCoin[]> {
  if (ids.length === 0) return []
  const data = await cg<MarketCoin[]>(
    `/coins/markets?vs_currency=usd&ids=${ids.join(
      ",",
    )}&sparkline=false&price_change_percentage=24h,7d`,
    180,
  )
  return data ?? []
}

/** Full coin detail (description, links, categories, market data). */
export async function getCoinDetail(id: string): Promise<CoinDetail | null> {
  return cg<CoinDetail>(
    `/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
    300,
  )
}

/** Historical market chart for N days. */
export async function getMarketChart(
  id: string,
  days = 30,
): Promise<MarketChart | null> {
  return cg<MarketChart>(
    `/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
    600,
  )
}

/** Trending coins (CoinGecko search/trending). */
export async function getTrending(): Promise<TrendingCoin[]> {
  const data = await cg<{ coins: TrendingCoin[] }>(`/search/trending`, 300)
  return data?.coins ?? []
}

/** Category id+name list. */
export async function getCategoryList(): Promise<CategoryShort[]> {
  const data = await cg<CategoryShort[]>(`/coins/categories/list`, 86400)
  return data ?? []
}

/** Categories ranked with market data. */
export async function getCategoryMarkets(): Promise<CategoryMarket[]> {
  const data = await cg<CategoryMarket[]>(
    `/coins/categories?order=market_cap_desc`,
    600,
  )
  return data ?? []
}

/** Coins within a specific category, ranked by market cap. */
export async function getCoinsByCategory(
  category: string,
  perPage = 50,
): Promise<MarketCoin[]> {
  const data = await cg<MarketCoin[]>(
    `/coins/markets?vs_currency=usd&category=${category}&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false&price_change_percentage=24h,7d`,
    300,
  )
  return data ?? []
}

/** Search coins by query string. */
export async function searchCoins(query: string): Promise<SearchCoin[]> {
  if (!query.trim()) return []
  const data = await cg<{ coins: SearchCoin[] }>(
    `/search?query=${encodeURIComponent(query)}`,
    120,
  )
  return data?.coins ?? []
}
