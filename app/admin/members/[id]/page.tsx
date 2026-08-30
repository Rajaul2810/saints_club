import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MemberForm } from "@/components/admin/member-form"
import { getViewer } from "@/lib/auth/session"
import { isEditorRole, isSuperAdmin } from "@/lib/auth/roles"
import { getVisibleMember, listInstitutes, listMemberTypes } from "@/lib/members/queries"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = { title: "Member · Admin" }

export default async function AdminMemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [viewer, member, types, institutes] = await Promise.all([
    getViewer(),
    getVisibleMember(id),
    listMemberTypes(),
    listInstitutes(),
  ])
  if (!member) notFound()

  let email: string | null = member.email ?? null
  let mobile: string | null = member.mobile ?? null
  if (isEditorRole(viewer?.role)) {
    const supabase = await createClient()
    const { data: contacts } = await supabase
      .from("member_contacts")
      .select("type, value, is_primary")
      .eq("member_id", id)
    email = contacts?.find((c) => c.type === "email")?.value ?? email
    mobile = contacts?.find((c) => c.type === "phone")?.value ?? mobile
  }

  return (
    <MemberForm
      member={{ ...member, email, mobile }}
      types={types}
      institutes={institutes}
      canEdit={isEditorRole(viewer?.role)}
      canDelete={isSuperAdmin(viewer?.role)}
    />
  )
}
