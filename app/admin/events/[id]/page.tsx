import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { getViewer } from "@/lib/auth/session"
import { isEditorRole } from "@/lib/auth/roles"
import { createClient } from "@/lib/supabase/server"
import { EventForm } from "@/components/admin/content-forms"

export const metadata: Metadata = { title: "Edit event · Admin" }

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const viewer = await getViewer()
  if (!isEditorRole(viewer?.role)) redirect("/admin")
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from("events").select("*").eq("id", id).maybeSingle()
  if (!data) notFound()
  return (
    <div>
      <h1 className="font-display mb-8 text-3xl tracking-tight text-ink">Edit event</h1>
      <EventForm item={data} />
    </div>
  )
}
