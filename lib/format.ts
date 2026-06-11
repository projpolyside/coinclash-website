/** Number and date formatting helpers used across the app. */

export function formatPrice(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "—"
  if (value === 0) return "$0.00"
  if (value < 0.000001) return `$${value.toExponential(2)}`
  if (value < 1) {
    return `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    })}`
  }
  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function formatLargeNumber(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "—"
  const abs = Math.abs(value)
  if (abs >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
  if (abs >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
  if (abs >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
  if (abs >= 1e3) return `$${(value / 1e3).toFixed(2)}K`
  return `$${value.toFixed(2)}`
}

export function formatSupply(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value) || value === 0) return "—"
  const abs = Math.abs(value)
  if (abs >= 1e12) return `${(value / 1e12).toFixed(2)}T`
  if (abs >= 1e9) return `${(value / 1e9).toFixed(2)}B`
  if (abs >= 1e6) return `${(value / 1e6).toFixed(2)}M`
  if (abs >= 1e3) return `${(value / 1e3).toLocaleString("en-US")}`
  return value.toLocaleString("en-US")
}

export function formatPercent(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "—"
  const sign = value > 0 ? "+" : ""
  return `${sign}${value.toFixed(2)}%`
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return "—"
  try {
    return new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch {
    return "—"
  }
}

export function isPositive(value: number | null | undefined): boolean {
  return (value ?? 0) >= 0
}

/** Strip HTML tags from CoinGecko descriptions and trim length. */
export function cleanDescription(html: string | undefined, max = 600): string {
  if (!html) return ""
  const text = html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
  if (text.length <= max) return text
  const truncated = text.slice(0, max)
  const lastPeriod = truncated.lastIndexOf(". ")
  return lastPeriod > max * 0.5
    ? truncated.slice(0, lastPeriod + 1)
    : truncated + "…"
}

export function titleCase(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}
