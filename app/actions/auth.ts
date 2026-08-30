"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { isStaffRole } from "@/lib/auth/roles"

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
}

export async function signInWithPassword(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const next = String(formData.get("next") ?? "")
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) {
    await supabase
      .from("profiles")
      .update({ last_login_at: new Date().toISOString() })
      .eq("id", user.id)
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id ?? "")
    .maybeSingle()

  const dest =
    next ||
    (isStaffRole(profile?.role) ? "/admin" : "/account")
  redirect(dest)
}

export async function signInWithMagicLink(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim()
  const next = String(formData.get("next") ?? "/account")
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${siteUrl()}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  })
  if (error) return { error: error.message }
  return { ok: true as const }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
  redirect("/")
}
