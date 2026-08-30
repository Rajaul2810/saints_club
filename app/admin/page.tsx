import type { Metadata } from "next"
import Link from "next/link"
import { getQuotaStats, listVisibleMembers } from "@/lib/members/queries"
import { getPublishedEvents, getPublishedNews, getPublishedNotices } from "@/lib/content/queries"
import { getViewer } from "@/lib/auth/session"
import { isEditorRole } from "@/lib/auth/roles"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = { title: "Admin" }

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

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-display text-3xl tracking-tight text-ink">Overview</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Live counts from the club roll and the notice board.
        </p>
      </header>

      <div className="grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Members on roll", value: members.total },
          { label: "Events", value: events.length },
          { label: "News", value: news.length },
          { label: "Notices", value: notices.length },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-5">
            <p className="text-[13px] text-muted-foreground">{stat.label}</p>
            <p className="font-display mt-2 text-3xl tracking-tight text-ink">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {quota && (
        <div className="border border-border bg-white p-6">
          <h2 className="font-display text-xl tracking-tight text-ink">Quotas</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            General members {quota.general.used} of {quota.general.max}. Rows
            flagged for review are excluded.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quota.types
              .filter((t) => t.max != null)
              .map((t) => (
                <div key={t.code} className="border-t border-border pt-3">
                  <p className="text-[13px] text-muted-foreground">{t.name}</p>
                  <p className="mt-1 text-lg text-ink">
                    {t.used} of {t.max}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}

      {canEdit && (
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/members/new" className={cn(buttonVariants())}>
            Add member
          </Link>
          <Link href="/admin/notices/new" className={cn(buttonVariants({ variant: "outline" }))}>
            Post notice
          </Link>
        </div>
      )}
    </div>
  )
}
