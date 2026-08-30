import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { MemberForm } from "@/components/admin/member-form"
import { getViewer } from "@/lib/auth/session"
import { isEditorRole } from "@/lib/auth/roles"
import { listInstitutes, listMemberTypes } from "@/lib/members/queries"

export const metadata: Metadata = { title: "Add member · Admin" }

export default async function NewMemberPage() {
  const viewer = await getViewer()
  if (!isEditorRole(viewer?.role)) redirect("/admin/members")
  const [types, institutes] = await Promise.all([listMemberTypes(), listInstitutes()])
  return <MemberForm types={types} institutes={institutes} canEdit canDelete={false} />
}
