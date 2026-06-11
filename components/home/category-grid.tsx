import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { FEATURED_CATEGORIES } from "@/lib/constants"

export function CategoryGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURED_CATEGORIES.map((cat) => (
        <Link
          key={cat.id}
          href={`/category/${cat.id}`}
          className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
        >
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              {cat.name}
            </h3>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {cat.blurb}
          </p>
        </Link>
      ))}
    </div>
  )
}
