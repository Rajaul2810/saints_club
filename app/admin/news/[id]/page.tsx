import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { getViewer } from "@/lib/auth/session"
import { isEditorRole } from "@/lib/auth/roles"
import { createClient } from "@/lib/supabase/server"
import { NewsForm } from "@/components/admin/content-forms"

export const metadata: Metadata = { title: "Edit story · Admin" }

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const viewer = await getViewer()
  if (!isEditorRole(viewer?.role)) redirect("/admin")
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from("news").select("*").eq("id", id).maybeSingle()
  if (!data) notFound()
  return (
    <div>
      <h1 className="font-display mb-8 text-3xl tracking-tight text-ink">Edit story</h1>
      <NewsForm item={data} />
    </div>
  )
}
