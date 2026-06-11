// CoinGecko API client with in-memory caching and rate-limit protection.
// Works without an API key against the public API. If COINGECKO_API_KEY is set,
// it is sent to raise rate limits. No key is required to deploy.

const PRO = !!process.env.COINGECKO_API_KEY
const BASE = PRO
  ? "https://pro-api.coingecko.com/api/v3"
  : "https://api.coingecko.com/api/v3"

type CacheEntry = { value: unknown; expires: number }
const cache = new Map<string, CacheEntry>()

// Simple in-flight de-duplication so concurrent requests share one fetch.
const inflight = new Map<string, Promise<unknown>>()

function authHeaders(): HeadersInit {
  const headers: Record<string, string> = { Accept: "application/json" }
  if (process.env.COINGECKO_API_KEY) {
    const headerName = PRO ? "x-cg-pro-api-key" : "x-cg-demo-api-key"
    headers[headerName] = process.env.COINGECKO_API_KEY
  }
  return headers
}

/**
 * Fetch JSON from CoinGecko with caching and graceful failure.
 * @param path API path beginning with "/"
 * @param ttl cache time-to-live in seconds
 */
export async function cg<T>(path: string, ttl = 120): Promise<T | null> {
  const key = path
  const now = Date.now()
  const cached = cache.get(key)
  if (cached && cached.expires > now) {
    return cached.value as T
  }

  if (inflight.has(key)) {
    return inflight.get(key) as Promise<T | null>
  }

  const promise = (async (): Promise<T | null> => {
    try {
      const res = await fetch(`${BASE}${path}`, {
        headers: authHeaders(),
        // Next.js data cache layer in addition to our in-memory cache.
        next: { revalidate: ttl },
      })
      if (!res.ok) {
        // On rate limit or error, serve stale cache if available.
        if (cached) return cached.value as T
        console.log("[v0] CoinGecko error", res.status, path)
        return null
      }
      const data = (await res.json()) as T
      cache.set(key, { value: data, expires: now + ttl * 1000 })
      return data
    } catch (err) {
      console.log("[v0] CoinGecko fetch failed", path, (err as Error).message)
      if (cached) return cached.value as T
      return null
    } finally {
      inflight.delete(key)
    }
  })()

  inflight.set(key, promise)
  return promise
}
