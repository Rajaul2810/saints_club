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

  return (
    <div>
      <h1 className="font-display text-3xl tracking-tight text-ink">Audit log</h1>
      <p className="mt-2 mb-8 text-sm text-muted-foreground">
        Policy and consent changes. Newest first.
      </p>
      <div className="overflow-x-auto border border-border bg-white">
        <table className="w-full min-w-64 text-left text-sm">
          <thead className="border-b border-border text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">When</th>
              <th className="px-4 py-3 font-medium">Action</th>
              <th className="px-4 py-3 font-medium">Entity</th>
              <th className="px-4 py-3 font-medium">Detail</th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((row) => (
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
  const a = after as { field_key?: string; audience?: string; is_visible?: boolean } | null
  const b = before as { is_visible?: boolean } | null
  if (a?.field_key) {
    return `${a.field_key} / ${a.audience}: ${b?.is_visible ?? "—"} → ${a.is_visible}`
  }
  return JSON.stringify(after ?? before ?? "")
}
