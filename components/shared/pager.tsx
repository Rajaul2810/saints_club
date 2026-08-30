import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Pager({
  basePath,
  params,
  page,
  pageCount,
  total,
  noun = "members",
}: {
  basePath: string
  params: Record<string, string | undefined>
  page: number
  pageCount: number
  total: number
  noun?: string
}) {
  function href(target: number) {
    const search = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
      if (value) search.set(key, value)
    }
    if (target > 1) search.set("page", String(target))
    const query = search.toString()
    return query ? `${basePath}?${query}` : basePath
  }

  if (total === 0) return null

  return (
    <nav
      className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm"
      aria-label="Pagination"
    >
      <p className="text-muted-foreground">
        {pageCount > 1
          ? `Page ${page} of ${pageCount} · ${total} ${noun}`
          : `${total} ${noun}`}
      </p>
      {pageCount > 1 && (
        <div className="flex gap-2">
          {page > 1 ? (
            <Link href={href(page - 1)} className={cn(buttonVariants({ variant: "outline" }))}>
              Previous
            </Link>
          ) : (
            <span
              className={cn(
                buttonVariants({ variant: "outline" }),
                "pointer-events-none opacity-40"
              )}
            >
              Previous
            </span>
          )}
          {page < pageCount ? (
            <Link href={href(page + 1)} className={cn(buttonVariants({ variant: "outline" }))}>
              Next
            </Link>
          ) : (
            <span
              className={cn(
                buttonVariants({ variant: "outline" }),
                "pointer-events-none opacity-40"
              )}
            >
              Next
            </span>
          )}
        </div>
      )}
    </nav>
  )
}
