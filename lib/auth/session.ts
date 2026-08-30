import { cache } from "react"
import { createClient } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/supabase/env"
import {
  isEditorRole,
  isStaffRole,
  isSuperAdmin,
  type AppRole,
} from "@/lib/auth/roles"

export type Viewer = {
  id: string
  email: string | undefined
  role: AppRole
  memberId: string | null
}

export const getViewer = cache(async (): Promise<Viewer | null> => {
  if (!isSupabaseConfigured()) return null

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role, member_id")
    .eq("id", user.id)
    .maybeSingle()

  let memberId = (profile?.member_id as string | null) ?? null
  const role = (profile?.role as AppRole | undefined) ?? "member"

  if (!memberId) {
    const { data: linked } = await supabase.rpc("link_profile_member")
    if (linked) memberId = linked as string
  }

  return {
    id: user.id,
    email: user.email,
    role,
    memberId,
  }
})

export async function requireViewer() {
  const viewer = await getViewer()
  if (!viewer) throw new Error("Unauthorized")
  return viewer
}

export async function requireStaff() {
  const viewer = await requireViewer()
  if (!isStaffRole(viewer.role)) throw new Error("Forbidden")
  return viewer
}

export async function requireEditor() {
  const viewer = await requireViewer()
  if (!isEditorRole(viewer.role)) throw new Error("Forbidden")
  return viewer
}

export async function requireSuperAdmin() {
  const viewer = await requireViewer()
  if (!isSuperAdmin(viewer.role)) throw new Error("Forbidden")
  return viewer
}
