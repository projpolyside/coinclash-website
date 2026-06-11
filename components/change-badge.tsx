import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatPercent, isPositive } from "@/lib/format"

export function ChangeBadge({
  value,
  className,
  size = "default",
}: {
  value: number | null | undefined
  className?: string
  size?: "default" | "sm"
}) {
  if (value == null || Number.isNaN(value)) {
    return <span className="text-muted-foreground">—</span>
  }
  const positive = isPositive(value)
  const Icon = positive ? ArrowUpRight : ArrowDownRight
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 font-medium tabular-nums",
        positive ? "text-success" : "text-destructive",
        size === "sm" ? "text-xs" : "text-sm",
        className,
      )}
    >
      <Icon
        className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"}
        aria-hidden="true"
      />
      {formatPercent(value).replace("+", "")}
    </span>
  )
}
