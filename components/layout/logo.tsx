import Link from "next/link"
import { cn } from "@/lib/utils"

export function Logo({
  className,
  light = false,
  href = "/",
  wordmarkClassName,
}: {
  className?: string
  light?: boolean
  href?: string
  wordmarkClassName?: string
}) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex min-w-0 items-center gap-2.5", className)}
      aria-label="Saints Club Limited home"
    >
      <span
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-semibold tracking-[0.08em]",
          light ? "bg-white/15 text-white" : "bg-primary text-white"
        )}
      >
        SC
      </span>
      <span
        className={cn(
          "font-display truncate text-[1.3rem] leading-none tracking-tight",
          light ? "text-white" : "text-ink",
          wordmarkClassName
        )}
      >
        Saints Club
      </span>
    </Link>
  )
}
