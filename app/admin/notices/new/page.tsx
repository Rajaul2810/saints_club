import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getViewer } from "@/lib/auth/session"
import { isEditorRole } from "@/lib/auth/roles"
import { NoticeForm } from "@/components/admin/content-forms"

export const metadata: Metadata = { title: "New notice · Admin" }

export default async function NewNoticePage() {
  const viewer = await getViewer()
  if (!isEditorRole(viewer?.role)) redirect("/admin")
  return (
    <div>
      <h1 className="font-display mb-8 text-3xl tracking-tight text-ink">New notice</h1>
      <NoticeForm />
    </div>
  )
}
