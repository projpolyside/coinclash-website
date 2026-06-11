"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowRight, Search, X } from "lucide-react"
import type { SearchCoin } from "@/lib/coingecko/types"
import { cn } from "@/lib/utils"

interface PickerSlotProps {
  selected: SearchCoin | null
  onSelect: (coin: SearchCoin | null) => void
  label: string
}

function PickerSlot({ selected, onSelect, label }: PickerSlotProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchCoin[]>([])
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  useEffect(() => {
    if (query.trim().length < 1) {
      setResults([])
      return
    }
    const controller = new AbortController()
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        })
        if (res.ok) {
          const data = (await res.json()) as { coins: SearchCoin[] }
          setResults(data.coins.slice(0, 6))
          setOpen(true)
        }
      } catch {
        /* ignore */
      }
    }, 250)
    return () => {
      clearTimeout(t)
      controller.abort()
    }
  }, [query])

  if (selected) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
        <Image
          src={selected.large || selected.thumb || "/placeholder.svg"}
          alt={`${selected.name} logo`}
          width={40}
          height={40}
          className="rounded-full"
          unoptimized
        />
        <div className="min-w-0">
          <p className="truncate font-semibold text-foreground">
            {selected.name}
          </p>
          <p className="text-xs uppercase text-muted-foreground">
            {selected.symbol}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onSelect(null)}
          aria-label={`Remove ${selected.name}`}
          className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder={label}
          aria-label={label}
          className="h-[72px] w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      {open && results.length > 0 && (
        <ul className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-popover shadow-xl">
          {results.map((coin) => (
            <li key={coin.id}>
              <button
                type="button"
                onClick={() => {
                  onSelect(coin)
                  setQuery("")
                  setOpen(false)
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-secondary"
              >
                <Image
                  src={coin.thumb || "/placeholder.svg"}
                  alt=""
                  width={24}
                  height={24}
                  className="rounded-full"
                  unoptimized
                />
                <span className="font-medium text-foreground">{coin.name}</span>
                <span className="text-xs uppercase text-muted-foreground">
                  {coin.symbol}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function ComparePicker({
  className,
}: {
  className?: string
}) {
  const router = useRouter()
  const [a, setA] = useState<SearchCoin | null>(null)
  const [b, setB] = useState<SearchCoin | null>(null)

  const canCompare = a && b && a.id !== b.id

  const compare = () => {
    if (!canCompare) return
    router.push(`/compare/${a!.id}-vs-${b!.id}`)
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6 sm:p-8",
        className,
      )}
    >
      <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <PickerSlot selected={a} onSelect={setA} label="Choose first coin" />
        <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-bold text-muted-foreground">
          VS
        </span>
        <PickerSlot selected={b} onSelect={setB} label="Choose second coin" />
      </div>
      <button
        type="button"
        onClick={compare}
        disabled={!canCompare}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Compare now
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}
