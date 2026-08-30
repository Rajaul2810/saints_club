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

  return (
    <div>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl tracking-tight text-ink">Notices</h1>
          <p className="mt-1 text-sm text-muted-foreground">Official announcements</p>
        </div>
        <Link href="/admin/notices/new" className={cn(buttonVariants())}>
          Add notice
        </Link>
      </div>
      <div className="overflow-x-auto border border-border bg-white">
        <table className="w-full text-left text-sm">
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
            {(data ?? []).map((row) => (
              <tr key={row.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <Link href={`/admin/notices/${row.id}`} className="hover:text-primary">
                    {row.title}
                  </Link>
                </td>
                <td className="px-4 py-3">{row.category}</td>
                <td className="px-4 py-3">
                  {row.published_at ? formatDate(row.published_at.slice(0, 10)) : "—"}
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
