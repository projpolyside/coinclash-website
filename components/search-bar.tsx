"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Search, Loader2 } from "lucide-react"
import type { SearchCoin } from "@/lib/coingecko/types"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  size?: "default" | "large"
  placeholder?: string
  className?: string
}

export function SearchBar({
  size = "default",
  placeholder = "Search a coin by name or symbol…",
  className,
}: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchCoin[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  useEffect(() => {
    if (query.trim().length < 1) {
      setResults([])
      setOpen(false)
      return
    }
    setLoading(true)
    const controller = new AbortController()
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`,
          { signal: controller.signal },
        )
        if (res.ok) {
          const data = (await res.json()) as { coins: SearchCoin[] }
          setResults(data.coins.slice(0, 8))
          setOpen(true)
          setActive(-1)
        }
      } catch {
        /* aborted or failed */
      } finally {
        setLoading(false)
      }
    }, 250)
    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [query])

  const goToCoin = (id: string) => {
    setOpen(false)
    setQuery("")
    router.push(`/coin/${id}`)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open || results.length === 0) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((p) => Math.min(p + 1, results.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((p) => Math.max(p - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      const pick = active >= 0 ? results[active] : results[0]
      if (pick) goToCoin(pick.id)
    } else if (e.key === "Escape") {
      setOpen(false)
    }
  }

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div className="relative">
        <Search
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground",
            size === "large" ? "h-5 w-5" : "h-4 w-4",
          )}
          aria-hidden="true"
        />
        <input
          type="search"
          role="combobox"
          aria-expanded={open}
          aria-controls="search-results"
          aria-label="Search cryptocurrencies"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-shadow",
            size === "large"
              ? "h-14 pl-12 pr-4 text-base"
              : "h-10 pl-10 pr-3 text-sm",
          )}
        />
        {loading && (
          <Loader2
            className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground"
            aria-hidden="true"
          />
        )}
      </div>

      {open && results.length > 0 && (
        <ul
          id="search-results"
          role="listbox"
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-popover shadow-xl"
        >
          {results.map((coin, i) => (
            <li key={coin.id} role="option" aria-selected={i === active}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => goToCoin(coin.id)}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors",
                  i === active ? "bg-secondary" : "hover:bg-secondary",
                )}
              >
                {coin.thumb && (
                  <Image
                    src={coin.thumb || "/placeholder.svg"}
                    alt=""
                    width={24}
                    height={24}
                    className="rounded-full"
                    unoptimized
                  />
                )}
                <span className="font-medium text-foreground">{coin.name}</span>
                <span className="text-xs uppercase text-muted-foreground">
                  {coin.symbol}
                </span>
                {coin.market_cap_rank && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    Rank #{coin.market_cap_rank}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
