import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = { title: "Audit log · Admin" }

export default async function AuditPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("audit_log")
    .select("id, action, entity, before, after, at, actor_id")
    .order("at", { ascending: false })
    .limit(100)

  const rows = data ?? []

  return (
    <div className="min-w-0">
      <h1 className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
        Audit log
      </h1>
      <p className="mt-2 mb-6 text-sm text-muted-foreground sm:mb-8">
        Policy and consent changes. Newest first.
      </p>

      <div className="space-y-3 md:hidden">
        {rows.map((row) => (
          <article
            key={row.id}
            className="rounded-2xl border border-border/80 bg-white p-4 shadow-sm shadow-ink/4"
          >
            <p className="text-xs text-muted-foreground">
              {new Date(row.at).toLocaleString("en-GB")}
            </p>
            <p className="mt-1 font-medium text-ink">{row.action}</p>
            <p className="mt-1 text-sm text-muted-foreground">{row.entity}</p>
            <p className="mt-2 break-words text-xs text-muted-foreground">
              {summarize(row.before, row.after)}
            </p>
          </article>
        ))}
        {rows.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border bg-white px-4 py-10 text-center text-sm text-muted-foreground">
            No audit entries yet.
          </p>
        )}
      </div>

      <div className="hidden overflow-x-auto rounded-2xl border border-border/80 bg-white md:block">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-border text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">When</th>
              <th className="px-4 py-3 font-medium">Action</th>
              <th className="px-4 py-3 font-medium">Entity</th>
              <th className="px-4 py-3 font-medium">Detail</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  {new Date(row.at).toLocaleString("en-GB")}
                </td>
                <td className="px-4 py-3">{row.action}</td>
                <td className="px-4 py-3">{row.entity}</td>
                <td className="max-w-xl truncate px-4 py-3 text-xs text-muted-foreground">
                  {summarize(row.before, row.after)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function summarize(before: unknown, after: unknown) {
  const a = after as
    | { field_key?: string; audience?: string; is_visible?: boolean }
    | null
  const b = before as { is_visible?: boolean } | null
  if (a?.field_key) {
    return `${a.field_key} / ${a.audience}: ${b?.is_visible ?? "—"} → ${a.is_visible}`
  }
  return JSON.stringify(after ?? before ?? "")
}
