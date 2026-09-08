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
      {/* Desktop / tablet sidebar */}
      <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
        <div className="rounded-2xl border border-border/80 bg-white p-3 shadow-sm shadow-ink/4">
          <p className="mb-2 inline-flex items-center gap-2 px-2 text-[11px] font-medium tracking-[0.16em] text-primary uppercase">
            <Shield className="size-3.5" aria-hidden />
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
                    "inline-flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors",
                    active
                      ? "bg-primary text-white shadow-sm shadow-primary/20"
                      : "text-ink/65 hover:bg-mist hover:text-ink"
                  )}
                >
                  <Icon className="size-4 shrink-0" aria-hidden />
                  {label}
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile / tablet top chip scroller */}
      <div className="lg:hidden">
        <div className="-mx-4 overflow-x-auto px-4 scrollbar-none">
          <nav
            className="flex w-max gap-1.5 pb-1"
            aria-label="Admin sections"
          >
            {tabs.map(({ href, label, icon: Icon }) => {
              const active = isActive(pathname, href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors",
                    active
                      ? "bg-primary text-white shadow-sm shadow-primary/20"
                      : "border border-border bg-white text-ink/70 hover:bg-mist hover:text-ink"
                  )}
                >
                  <Icon className="size-3.5 shrink-0" aria-hidden />
                  {label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Mobile bottom bar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-white/95 px-1 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden"
        aria-label="Admin quick nav"
      >
        <div className="mx-auto flex max-w-6xl items-stretch justify-around gap-0.5">
          {tabs.slice(0, 5).map(({ href, short, icon: Icon }) => {
            const active = isActive(pathname, href)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-medium transition-colors",
                  active ? "text-primary" : "text-ink/50"
                )}
              >
                <span
                  className={cn(
                    "grid size-8 place-items-center rounded-full transition-colors",
                    active ? "bg-primary/10 text-primary" : "text-ink/45"
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="truncate">{short}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
