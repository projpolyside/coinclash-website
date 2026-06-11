import { cn } from "@/lib/utils"

/**
 * Reserved, non-intrusive ad placement area designed for future AdSense.
 * Renders a clearly labelled, content-friendly slot that never interrupts
 * usability. Replace the inner markup with an <ins class="adsbygoogle"> unit
 * once AdSense is approved.
 */
export function AdSlot({
  label = "Advertisement",
  className,
  format = "horizontal",
}: {
  label?: string
  className?: string
  format?: "horizontal" | "rectangle"
}) {
  return (
    <aside
      aria-label="Advertisement"
      className={cn(
        "flex w-full items-center justify-center rounded-xl border border-dashed border-border bg-card text-muted-foreground",
        format === "horizontal" ? "min-h-[90px] py-4" : "min-h-[250px] py-6",
        className,
      )}
      data-ad-slot
    >
      <span className="text-xs uppercase tracking-widest">{label}</span>
    </aside>
  )
}
