import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getViewer } from "@/lib/auth/session"
import { isEditorRole } from "@/lib/auth/roles"
import { NewsForm } from "@/components/admin/content-forms"

export const metadata: Metadata = { title: "New story · Admin" }

export default async function NewNewsPage() {
  const viewer = await getViewer()
  if (!isEditorRole(viewer?.role)) redirect("/admin")
  return (
    <div>
      <h1 className="font-display mb-8 text-3xl tracking-tight text-ink">New story</h1>
      <NewsForm />
    </div>
  )
}
