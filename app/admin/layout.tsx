import type { ReactNode } from "react"
import { redirect } from "next/navigation"
import { AdminShell } from "@/components/admin/shell"
import { getViewer } from "@/lib/auth/session"
import { isStaffRole } from "@/lib/auth/roles"
import { isSupabaseConfigured } from "@/lib/supabase/env"

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  if (!isSupabaseConfigured()) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24">
        <h1 className="font-display text-3xl text-ink">Supabase is not configured</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Copy <code>.env.example</code> to <code>.env.local</code>, add your
          project URL and keys, and run{" "}
          <code>supabase/migrations/20260830120000_init.sql</code> in the
          Supabase SQL editor.
        </p>
      </div>
    )
  }

  const viewer = await getViewer()
  if (!viewer) redirect("/login?next=/admin")
  if (!isStaffRole(viewer.role)) redirect("/account")

  return (
    <AdminShell role={viewer.role} email={viewer.email}>
      {children}
    </AdminShell>
  )
}
