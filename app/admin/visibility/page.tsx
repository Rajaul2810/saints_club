import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { VisibilityGrid } from "@/components/admin/visibility-grid"
import { getViewer } from "@/lib/auth/session"
import { isSuperAdmin } from "@/lib/auth/roles"
import { createClient } from "@/lib/supabase/server"
import type { Audience, FieldKey } from "@/lib/members/fields"

export const metadata: Metadata = { title: "Field visibility · Admin" }

export default async function VisibilityPage() {
  const viewer = await getViewer()
  if (!isSuperAdmin(viewer?.role)) redirect("/admin")
  const supabase = await createClient()
  const { data } = await supabase
    .from("field_visibility_policy")
    .select("field_key, audience, is_visible")

  return (
    <div className="min-w-0">
      <h1 className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
        Field visibility
      </h1>
      <p className="mt-2 mb-6 text-sm text-muted-foreground sm:mb-8">
        Club policy for the member directory. Changes are written to the audit
        log.
      </p>
      <VisibilityGrid
        policy={(data ?? []) as { field_key: FieldKey; audience: Audience; is_visible: boolean }[]}
      />
    </div>
  )
}
