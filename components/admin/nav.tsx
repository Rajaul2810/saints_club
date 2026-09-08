"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CalendarDays,
  Newspaper,
  Users,
  LayoutDashboard,
  Shield,
  ScrollText,
  Eye,
  Bell,
} from "lucide-react"
import { isEditorRole, isSuperAdmin, type AppRole } from "@/lib/auth/roles"
import { cn } from "@/lib/utils"

const allTabs = [
  { href: "/admin", label: "Overview", short: "Home", icon: LayoutDashboard },
  { href: "/admin/members", label: "Members", short: "Members", icon: Users },
  { href: "/admin/notices", label: "Notices", short: "Notices", icon: Bell, editor: true },
  { href: "/admin/events", label: "Events", short: "Events", icon: CalendarDays, editor: true },
  { href: "/admin/news", label: "News", short: "News", icon: Newspaper, editor: true },
  { href: "/admin/visibility", label: "Visibility", short: "Visible", icon: Eye, super: true },
  { href: "/admin/audit", label: "Audit", short: "Audit", icon: ScrollText },
] as const

function useAdminTabs(role: AppRole) {
  return allTabs.filter((tab) => {
    if ("super" in tab && tab.super) return isSuperAdmin(role)
    if ("editor" in tab && tab.editor) return isEditorRole(role)
    return true
  })
}

function isActive(pathname: string, href: string) {
  return href === "/admin"
    ? pathname === "/admin"
    : pathname === href || pathname.startsWith(`${href}/`)
}

export function AdminNav({ role }: { role: AppRole }) {
  const pathname = usePathname()
  const tabs = useAdminTabs(role)

  return (
    <>
      <aside className="hidden min-w-0 lg:sticky lg:top-24 lg:block lg:self-start">
        <div className="rounded-2xl border border-border/80 bg-white p-3 shadow-sm shadow-ink/4">
          <p className="mb-2 inline-flex items-center gap-2 px-2 text-[11px] font-medium tracking-[0.16em] text-primary uppercase">
            <Shield className="size-3.5 shrink-0" aria-hidden />
            Manage
          </p>
          <nav className="flex flex-col gap-1" aria-label="Admin">
            {tabs.map(({ href, label, icon: Icon }) => {
              const active = isActive(pathname, href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "inline-flex min-w-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors",
                    active
                      ? "bg-primary text-white shadow-sm shadow-primary/20"
                      : "text-ink/65 hover:bg-mist hover:text-ink"
                  )}
                >
                  <Icon className="size-4 shrink-0" aria-hidden />
                  <span className="truncate">{label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-white/95 backdrop-blur-md lg:hidden"
        aria-label="Admin navigation"
        style={{ paddingBottom: "max(0.4rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto max-w-6xl overflow-x-auto overscroll-x-contain px-2 pt-1.5 scrollbar-none">
          <div className="flex w-max min-w-full items-stretch justify-start gap-1 sm:justify-center">
            {tabs.map(({ href, short, icon: Icon }) => {
              const active = isActive(pathname, href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex w-18 shrink-0 flex-col items-center gap-0.5 rounded-xl px-1 py-1 text-[10px] font-medium transition-colors",
                    active ? "text-primary" : "text-ink/45"
                  )}
                >
                  <span
                    className={cn(
                      "grid size-8 place-items-center rounded-full transition-colors",
                      active ? "bg-primary/10 text-primary" : "bg-transparent"
                    )}
                  >
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="max-w-full truncate">{short}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </>
  )
}
