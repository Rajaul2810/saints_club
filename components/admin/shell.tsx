import type { ReactNode } from "react"
import Link from "next/link"
import { ExternalLink, LogOut } from "lucide-react"
import { Logo } from "@/components/layout/logo"
import { AdminNav } from "@/components/admin/nav"
import { signOut } from "@/app/actions/auth"
import { roleLabel, type AppRole } from "@/lib/auth/roles"

export function AdminShell({
  role,
  email,
  children,
}: {
  role: AppRole
  email?: string
  children: ReactNode
}) {
  return (
    <div className="min-h-svh bg-[linear-gradient(180deg,var(--mist)_0%,var(--background)_28%)]">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 sm:h-16 sm:gap-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Logo className="min-w-0 [&>span:last-child]:max-w-24 [&>span:last-child]:truncate sm:[&>span:last-child]:max-w-none" />
            <span className="hidden rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium tracking-[0.08em] text-primary uppercase sm:inline">
              Admin
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            <div className="hidden text-right lg:block">
              <p className="text-[13px] font-medium text-ink">{roleLabel(role)}</p>
              {email && (
                <p className="max-w-45 truncate text-[12px] text-muted-foreground">
                  {email}
                </p>
              )}
            </div>
            <Link
              href="/"
              className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-white text-ink transition hover:border-primary/30 hover:bg-mist sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-[13px]"
              aria-label="View site"
            >
              <ExternalLink className="size-3.5 text-primary" aria-hidden />
              <span className="hidden sm:inline">View site</span>
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-white text-ink transition hover:border-primary/30 hover:bg-mist sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-[13px]"
                aria-label="Sign out"
              >
                <LogOut className="size-3.5 text-primary" aria-hidden />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-5 pb-24 sm:gap-6 sm:px-6 sm:py-8 lg:grid-cols-[220px_1fr] lg:gap-10 lg:px-8 lg:py-10 lg:pb-10">
        <AdminNav role={role} />
        <main className="min-w-0 overflow-x-hidden">{children}</main>
      </div>
    </div>
  )
}
