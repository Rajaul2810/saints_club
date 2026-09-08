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
    <div className="min-h-svh w-full max-w-[100vw] overflow-x-clip bg-[linear-gradient(180deg,var(--mist)_0%,var(--background)_28%)]">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-2 px-3 sm:h-16 sm:gap-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
            <Logo
              href="/admin"
              className="min-w-0 shrink"
              wordmarkClassName="hidden min-[420px]:inline"
            />
            <span className="hidden rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium tracking-[0.08em] text-primary uppercase sm:inline">
              Admin
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <div className="hidden min-w-0 text-right xl:block">
              <p className="text-[13px] font-medium text-ink">{roleLabel(role)}</p>
              {email && (
                <p className="max-w-40 truncate text-[12px] text-muted-foreground">
                  {email}
                </p>
              )}
            </div>
            <Link
              href="/"
              className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-white text-ink transition hover:border-primary/30 hover:bg-mist sm:h-9 sm:w-auto sm:gap-1.5 sm:px-3 sm:text-[13px]"
              aria-label="View site"
            >
              <ExternalLink className="size-3.5 shrink-0 text-primary" aria-hidden />
              <span className="hidden sm:inline">Site</span>
            </Link>
            <form action={signOut} className="shrink-0">
              <button
                type="submit"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-white text-ink transition hover:border-primary/30 hover:bg-mist sm:h-9 sm:w-auto sm:gap-1.5 sm:px-3 sm:text-[13px]"
                aria-label="Sign out"
              >
                <LogOut className="size-3.5 shrink-0 text-primary" aria-hidden />
                <span className="hidden sm:inline">Out</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-3 py-4 pb-[calc(4.75rem+env(safe-area-inset-bottom))] sm:gap-6 sm:px-6 sm:py-8 lg:grid lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-8 lg:px-8 lg:py-10 lg:pb-10">
        <AdminNav role={role} />
        <main className="min-w-0 max-w-full overflow-x-clip">{children}</main>
      </div>
    </div>
  )
}
