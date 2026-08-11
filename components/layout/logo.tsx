import Link from "next/link"
import { cn } from "@/lib/utils"

export function Logo({
  className,
  light = false,
}: {
  className?: string
  light?: boolean
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="Saints Club home"
    >
      <span
        className={cn(
          "grid size-8 place-items-center rounded-full text-[11px] font-semibold tracking-[0.08em]",
          light ? "bg-white/15 text-white" : "bg-primary text-white"
        )}
      >
        SC
      </span>
      <span
        className={cn(
          "font-display text-[1.3rem] leading-none tracking-tight",
          light ? "text-white" : "text-ink"
        )}
      >
        Saints Club
      </span>
    </Link>
  )
}
