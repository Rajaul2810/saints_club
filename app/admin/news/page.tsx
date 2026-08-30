import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getViewer } from "@/lib/auth/session"
import { isEditorRole } from "@/lib/auth/roles"
import { createClient } from "@/lib/supabase/server"
import { buttonVariants } from "@/components/ui/button"
import { formatDate } from "@/lib/data"
import { deleteNewsItem } from "@/app/actions/content"
import { cn } from "@/lib/utils"

export const metadata: Metadata = { title: "News · Admin" }

export default async function AdminNewsPage() {
  const viewer = await getViewer()
  if (!isEditorRole(viewer?.role)) redirect("/admin")
  const supabase = await createClient()
  const { data } = await supabase
    .from("news")
    .select("id, title, tag, published_at, is_published")
    .order("published_at", { ascending: false, nullsFirst: false })

  return (
    <div>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl tracking-tight text-ink">News</h1>
          <p className="mt-1 text-sm text-muted-foreground">Stories from the Club</p>
        </div>
        <Link href="/admin/news/new" className={cn(buttonVariants())}>
          Add story
        </Link>
      </div>
      <div className="overflow-x-auto border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Tag</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((row) => (
              <tr key={row.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <Link href={`/admin/news/${row.id}`} className="hover:text-primary">
                    {row.title}
                  </Link>
                </td>
                <td className="px-4 py-3">{row.tag}</td>
                <td className="px-4 py-3">
                  {row.published_at ? formatDate(row.published_at.slice(0, 10)) : "—"}
                </td>
                <td className="px-4 py-3">{row.is_published ? "Published" : "Draft"}</td>
                <td className="px-4 py-3">
                  <form action={deleteNewsItem}>
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
