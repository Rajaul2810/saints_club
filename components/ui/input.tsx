import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

export const fieldClass = cn(
  "mt-1.5 box-border w-full min-w-0 max-w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none transition",
  "focus:border-ink focus:ring-1 focus:ring-ink/15"
)

export function Input({
  className,
  ...props
}: ComponentProps<"input">) {
  return <input className={cn(fieldClass, className)} {...props} />
}

export function Textarea({
  className,
  ...props
}: ComponentProps<"textarea">) {
  return <textarea className={cn(fieldClass, className)} {...props} />
}

export function Select({
  className,
  ...props
}: ComponentProps<"select">) {
  return <select className={cn(fieldClass, className)} {...props} />
}

export function Label({
  className,
  ...props
}: ComponentProps<"label">) {
  return (
    <label className={cn("text-[13px] text-ink", className)} {...props} />
  )
}
