import type { ReactNode } from "react"
import Link from "next/link"
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
    <div className="min-h-svh bg-background">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Logo />
          <div className="flex items-center gap-4 text-[13px]">
            <span className="hidden text-muted-foreground sm:inline">
              {roleLabel(role)}
              {email ? ` · ${email}` : ""}
            </span>
            <Link href="/" className="text-ink hover:text-gold-deep">
              View site
            </Link>
            <form action={signOut}>
              <button type="submit" className="text-ink hover:text-gold-deep">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[200px_1fr]">
        <AdminNav role={role} />
        <div>{children}</div>
      </div>
    </div>
  )
}
