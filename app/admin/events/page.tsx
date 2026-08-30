import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getViewer } from "@/lib/auth/session"
import { isEditorRole } from "@/lib/auth/roles"
import { createClient } from "@/lib/supabase/server"
import { buttonVariants } from "@/components/ui/button"
import { formatDate } from "@/lib/data"
import { deleteEvent } from "@/app/actions/content"
import { cn } from "@/lib/utils"

export const metadata: Metadata = { title: "Events · Admin" }

export default async function AdminEventsPage() {
  const viewer = await getViewer()
  if (!isEditorRole(viewer?.role)) redirect("/admin")
  const supabase = await createClient()
  const { data } = await supabase
    .from("events")
    .select("id, title, category, starts_at, location, is_published")
    .order("starts_at", { ascending: false })

  return (
    <div>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl tracking-tight text-ink">Events</h1>
          <p className="mt-1 text-sm text-muted-foreground">The programme</p>
        </div>
        <Link href="/admin/events/new" className={cn(buttonVariants())}>
          Add event
        </Link>
      </div>
      <div className="overflow-x-auto border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Event</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((row) => (
              <tr key={row.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <Link href={`/admin/events/${row.id}`} className="hover:text-primary">
                    {row.title}
                  </Link>
                </td>
                <td className="px-4 py-3">{formatDate(row.starts_at.slice(0, 10))}</td>
                <td className="px-4 py-3">{row.category}</td>
                <td className="px-4 py-3">{row.location}</td>
                <td className="px-4 py-3">{row.is_published ? "Published" : "Draft"}</td>
                <td className="px-4 py-3">
                  <form action={deleteEvent}>
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
