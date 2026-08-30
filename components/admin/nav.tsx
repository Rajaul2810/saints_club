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
} from "lucide-react"
import { isEditorRole, isSuperAdmin, type AppRole } from "@/lib/auth/roles"
import { cn } from "@/lib/utils"

const allTabs = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/members", label: "Members", icon: Users },
  { href: "/admin/notices", label: "Notices", icon: Newspaper, editor: true },
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
    <aside>
      <p className="mb-3 inline-flex items-center gap-2 text-[11px] tracking-[0.18em] text-gold uppercase">
        <Shield className="size-3" />
        Manage
      </p>
      <nav className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/admin" ? pathname === "/admin" : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 px-3 py-2 text-[13px] transition",
                active
                  ? "bg-ink text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-ink"
              )}
            >
              <Icon className="size-3.5" />
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
