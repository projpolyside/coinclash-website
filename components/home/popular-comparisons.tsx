import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { POPULAR_COMPARISONS } from "@/lib/constants"

export function PopularComparisons() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {POPULAR_COMPARISONS.map((c) => (
        <Link
          key={`${c.a}-${c.b}`}
          href={`/compare/${c.a}-vs-${c.b}`}
          className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
        >
          <div>
            <p className="font-semibold text-foreground">
              {c.aName} <span className="text-muted-foreground">vs</span>{" "}
              {c.bName}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Full side-by-side breakdown
            </p>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </Link>
      ))}
    </div>
  )
}
