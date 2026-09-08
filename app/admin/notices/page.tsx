import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getViewer } from "@/lib/auth/session"
import { isEditorRole } from "@/lib/auth/roles"
import { createClient } from "@/lib/supabase/server"
import { buttonVariants } from "@/components/ui/button"
import { formatDate } from "@/lib/data"
import { cn } from "@/lib/utils"
import { deleteNotice } from "@/app/actions/content"

export const metadata: Metadata = { title: "Notices · Admin" }

export default async function AdminNoticesPage() {
  const viewer = await getViewer()
  if (!isEditorRole(viewer?.role)) redirect("/admin")
  const supabase = await createClient()
  const { data } = await supabase
    .from("notices")
    .select("id, title, category, published_at, is_published")
    .order("published_at", { ascending: false, nullsFirst: false })

  const rows = data ?? []

  return (
    <div className="min-w-0">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
            Notices
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Official announcements
          </p>
        </div>
        <Link
          href="/admin/notices/new"
          className={cn(buttonVariants(), "w-full justify-center sm:w-auto")}
        >
          Add notice
        </Link>
      </div>

      <div className="space-y-3 md:hidden">
        {rows.map((row) => (
          <div
            key={row.id}
            className="rounded-2xl border border-border/80 bg-white p-4 shadow-sm shadow-ink/4"
          >
            <div className="flex items-start justify-between gap-3">
              <Link
                href={`/admin/notices/${row.id}`}
                className="min-w-0 font-medium text-ink hover:text-primary"
              >
                {row.title}
              </Link>
              <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                {row.is_published ? "Published" : "Draft"}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {row.category}
              {row.published_at
                ? ` · ${formatDate(row.published_at.slice(0, 10))}`
                : ""}
            </p>
            <form action={deleteNotice} className="mt-3">
              <input type="hidden" name="id" value={row.id} />
              <button type="submit" className="text-xs text-destructive">
                Delete
              </button>
            </form>
          </div>
        ))}
        {rows.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border bg-white px-4 py-10 text-center text-sm text-muted-foreground">
            No notices yet.
          </p>
        )}
      </div>

      <div className="hidden overflow-x-auto rounded-2xl border border-border/80 bg-white md:block">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-border text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/notices/${row.id}`}
                    className="hover:text-primary"
                  >
                    {row.title}
                  </Link>
                </td>
                <td className="px-4 py-3">{row.category}</td>
                <td className="px-4 py-3">
                  {row.published_at
                    ? formatDate(row.published_at.slice(0, 10))
                    : "—"}
                </td>
                <td className="px-4 py-3">
                  {row.is_published ? "Published" : "Draft"}
                </td>
                <td className="px-4 py-3">
                  <form action={deleteNotice}>
                    <input type="hidden" name="id" value={row.id} />
                    <button type="submit" className="text-xs text-destructive">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
