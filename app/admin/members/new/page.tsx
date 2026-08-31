import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { MemberForm } from "@/components/admin/member-form"
import { getViewer } from "@/lib/auth/session"
import { isEditorRole } from "@/lib/auth/roles"
import { listMemberTypes } from "@/lib/members/queries"

export const metadata: Metadata = { title: "Add member · Admin" }

export default async function NewMemberPage() {
  const viewer = await getViewer()
  if (!isEditorRole(viewer?.role)) redirect("/admin/members")
  const types = await listMemberTypes()
  return <MemberForm types={types} canEdit canDelete={false} />
}
