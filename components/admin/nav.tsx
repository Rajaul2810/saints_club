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
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/members", label: "Members", icon: Users },
  { href: "/admin/notices", label: "Notices", icon: Bell, editor: true },
  { href: "/admin/events", label: "Events", icon: CalendarDays, editor: true },
  { href: "/admin/news", label: "News", icon: Newspaper, editor: true },
  { href: "/admin/visibility", label: "Visibility", icon: Eye, super: true },
  { href: "/admin/audit", label: "Audit", icon: ScrollText },
] as const

export function AdminNav({ role }: { role: AppRole }) {
  const pathname = usePathname()
  const tabs = allTabs.filter((tab) => {
    if ("super" in tab && tab.super) return isSuperAdmin(role)
    if ("editor" in tab && tab.editor) return isEditorRole(role)
    return true
  })

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-2xl border border-border/80 bg-white p-3 shadow-sm shadow-ink/4">
        <p className="mb-2 inline-flex items-center gap-2 px-2 text-[11px] font-medium tracking-[0.16em] text-primary uppercase">
          <Shield className="size-3.5" aria-hidden />
          Manage
        </p>
        <nav
          className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
          aria-label="Admin"
        >
          {tabs.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/admin"
                ? pathname === "/admin"
                : pathname === href || pathname.startsWith(`${href}/`)

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors",
                  active
                    ? "bg-primary text-white shadow-sm shadow-primary/20"
                    : "text-ink/65 hover:bg-mist hover:text-ink"
                )}
              >
                <Icon className="size-4" aria-hidden />
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
