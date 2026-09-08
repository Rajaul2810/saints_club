import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowUpRight,
  Bell,
  CalendarDays,
  Newspaper,
  Users,
  UserPlus,
  ShieldAlert,
} from "lucide-react"
import { getQuotaStats, listVisibleMembers } from "@/lib/members/queries"
import {
  getPublishedEvents,
  getPublishedNews,
  getPublishedNotices,
} from "@/lib/content/queries"
import { getViewer } from "@/lib/auth/session"
import { isEditorRole, roleLabel } from "@/lib/auth/roles"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/data"

export const metadata: Metadata = { title: "Admin" }

function quotaPercent(used: number, max: number | null | undefined) {
  if (max == null || max <= 0) return 0
  return Math.min(100, Math.round((used / max) * 100))
}

export default async function AdminOverviewPage() {
  const [viewer, quota, members, events, news, notices] = await Promise.all([
    getViewer(),
    getQuotaStats(),
    listVisibleMembers({ includeInactive: true, limit: 1 }),
    getPublishedEvents(),
    getPublishedNews(),
    getPublishedNotices(),
  ])
  const canEdit = isEditorRole(viewer?.role)
  const upcoming = events.slice(0, 4)
  const latestNotices = notices.slice(0, 4)

  const stats = [
    {
      label: "Members on roll",
      value: members.total,
      href: "/admin/members",
      icon: Users,
      hint: "Directory & records",
    },
    {
      label: "Events",
      value: events.length,
      href: "/admin/events",
      icon: CalendarDays,
      hint: "Published calendar",
    },
    {
      label: "News",
      value: news.length,
      href: "/admin/news",
      icon: Newspaper,
      hint: "Published stories",
    },
    {
      label: "Notices",
      value: notices.length,
      href: "/admin/notices",
      icon: Bell,
      hint: "Official board",
    },
  ]

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-medium tracking-[0.16em] text-primary uppercase">
            Dashboard
          </p>
          <h1 className="font-display mt-2 text-3xl tracking-tight text-ink sm:text-4xl">
            Overview
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Signed in as {viewer ? roleLabel(viewer.role) : "staff"}. Live counts
            from the club roll and content board.
          </p>
        </div>
        {canEdit && (
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/members/new" className={cn(buttonVariants())}>
              <UserPlus className="size-4" aria-hidden />
              Add member
            </Link>
            <Link
              href="/admin/notices/new"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Post notice
            </Link>
          </div>
        )}
      </header>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, href, icon: Icon, hint }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-2xl border border-border/80 bg-white p-5 shadow-sm shadow-ink/4 transition hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md hover:shadow-primary/10"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-4" aria-hidden />
              </span>
              <ArrowUpRight className="size-4 text-ink/25 transition group-hover:text-primary" />
            </div>
            <p className="font-display mt-5 text-3xl tracking-tight text-ink">
              {value}
            </p>
            <p className="mt-1 text-sm font-medium text-ink">{label}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
          </Link>
        ))}
      </section>

      {quota && (
        <section className="rounded-2xl border border-border/80 bg-white p-5 shadow-sm shadow-ink/4 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-xl tracking-tight text-ink">
                Membership quotas
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                General members {quota.general.used} of {quota.general.max}. Rows
                flagged for review are excluded.
              </p>
            </div>
            <Link
              href="/admin/members"
              className="text-[13px] font-medium text-primary hover:underline"
            >
              Open members →
            </Link>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>General ceiling</span>
              <span className="font-medium text-ink">
                {quotaPercent(quota.general.used, quota.general.max)}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-mist">
              <div
                className="h-full rounded-full bg-primary transition-[width]"
                style={{
                  width: `${quotaPercent(quota.general.used, quota.general.max)}%`,
                }}
              />
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quota.types
              .filter((t) => t.max != null)
              .map((t) => {
                const pct = quotaPercent(t.used, t.max)
                return (
                  <div
                    key={t.code}
                    className="rounded-xl border border-border/70 bg-[linear-gradient(180deg,var(--mist)_0%,white_70%)] p-4"
                  >
                    <p className="text-[13px] text-muted-foreground">{t.name}</p>
                    <p className="mt-1 text-lg font-medium text-ink">
                      {t.used}
                      <span className="text-muted-foreground"> of {t.max}</span>
                    </p>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          pct >= 90 ? "bg-destructive" : "bg-primary/80"
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
          </div>
        </section>
      )}

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/80 bg-white p-5 shadow-sm shadow-ink/4 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-display text-xl tracking-tight text-ink">
              Upcoming events
            </h2>
            <Link
              href="/admin/events"
              className="text-[13px] font-medium text-primary hover:underline"
            >
              Manage
            </Link>
          </div>
          {upcoming.length === 0 ? (
            <p className="text-sm text-muted-foreground">No published events.</p>
          ) : (
            <ul className="divide-y divide-border/80">
              {upcoming.map((event) => (
                <li key={event.id} className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">
                      {event.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatDate(event.date)} · {event.location || "TBA"}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                    {event.category}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-border/80 bg-white p-5 shadow-sm shadow-ink/4 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-display text-xl tracking-tight text-ink">
              Latest notices
            </h2>
            <Link
              href="/admin/notices"
              className="text-[13px] font-medium text-primary hover:underline"
            >
              Manage
            </Link>
          </div>
          {latestNotices.length === 0 ? (
            <p className="text-sm text-muted-foreground">No published notices.</p>
          ) : (
            <ul className="divide-y divide-border/80">
              {latestNotices.map((notice) => (
                <li key={notice.id} className="py-3 first:pt-0 last:pb-0">
                  <p className="truncate text-sm font-medium text-ink">
                    {notice.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatDate(notice.date)} · {notice.tag}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {canEdit && (
        <section className="rounded-2xl border border-dashed border-primary/25 bg-primary/5 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-white">
                <ShieldAlert className="size-4" aria-hidden />
              </span>
              <div>
                <h2 className="font-display text-lg tracking-tight text-ink">
                  Quick publishing
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Create content for the public site without leaving admin.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/admin/events/new"
                className={cn(buttonVariants({ variant: "outline" }), "bg-white")}
              >
                New event
              </Link>
              <Link
                href="/admin/news/new"
                className={cn(buttonVariants({ variant: "outline" }), "bg-white")}
              >
                New news
              </Link>
              <Link href="/admin/notices/new" className={cn(buttonVariants())}>
                New notice
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
