import type { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  light?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "max-w-xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-[11px] font-medium tracking-[0.2em] uppercase",
            light ? "text-white/45" : "text-primary"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl leading-tight tracking-tight text-balance sm:text-4xl",
          light ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-[15px] leading-relaxed",
            light ? "text-white/55" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export function PageHero({
  title,
  description,
  eyebrow,
}: {
  title: string
  description: string
  eyebrow?: string
}) {
  return (
    <section className="border-b border-border bg-background pt-28 pb-14 sm:pt-32 sm:pb-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {eyebrow && (
          <p className="mb-3 text-[11px] font-medium tracking-[0.2em] text-primary uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display max-w-3xl text-4xl leading-[1.1] tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </section>
  )
}

export function TextLink({
  href,
  children,
  light = false,
}: {
  href: string
  children: ReactNode
  light?: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-[13px] tracking-[0.04em]",
        light ? "text-white/70 hover:text-white" : "text-primary hover:text-primary/80"
      )}
    >
      {children}
      <span className="transition-transform group-hover:translate-x-0.5">→</span>
    </Link>
  )
}
