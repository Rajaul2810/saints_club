"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { requireEditor, requireSuperAdmin, getViewer } from "@/lib/auth/session"
import { createClient } from "@/lib/supabase/server"
import { CONSENT_FIELDS } from "@/lib/members/fields"

export async function saveConsent(formData: FormData) {
  const viewer = await getViewer()
  if (!viewer?.memberId) return { error: "No member record is linked to this account." }

  const supabase = await createClient()
  const rows = CONSENT_FIELDS.map((field) => ({
    member_id: viewer.memberId!,
    field_key: field,
    audience: "members" as const,
    is_visible: formData.get(field) === "on",
  }))

  const { error } = await supabase.from("member_field_consent").upsert(rows)
  if (error) return { error: error.message }
  revalidatePath("/account")
  revalidatePath("/members")
  return { ok: true as const }
}

export async function saveVisibilityPolicy(formData: FormData) {
  await requireSuperAdmin()
  const supabase = await createClient()
  const { data: existing } = await supabase
    .from("field_visibility_policy")
    .select("field_key, audience")

  const updates =
    existing?.map((row) => ({
      field_key: row.field_key,
      audience: row.audience,
      is_visible:
        row.audience === "admin"
          ? true
          : formData.get(`${row.field_key}:${row.audience}`) === "on",
    })) ?? []

  const { error } = await supabase.from("field_visibility_policy").upsert(updates)
  if (error) return { error: error.message }
  revalidatePath("/admin/visibility")
  revalidatePath("/members")
  return { ok: true as const }
}

export async function saveMember(formData: FormData) {
  await requireEditor()
  const supabase = await createClient()
  const id = String(formData.get("id") ?? "")
  const payload = {
    first_name: emptyToNull(formData.get("first_name")),
    last_name: emptyToNull(formData.get("last_name")),
    member_code: String(formData.get("member_code") ?? "").trim(),
    member_type_id: emptyToNull(formData.get("member_type_id")),
    institute_id: emptyToNull(formData.get("institute_id")),
    batch_year: toInt(formData.get("batch_year")),
    gender: emptyToNull(formData.get("gender")),
    dob: emptyToNull(formData.get("dob")),
    marital_status: emptyToNull(formData.get("marital_status")),
    anniversary: emptyToNull(formData.get("anniversary")),
    blood_group: emptyToNull(formData.get("blood_group")),
    nationality: emptyToNull(formData.get("nationality")),
    job_title: emptyToNull(formData.get("job_title")),
    organisation: emptyToNull(formData.get("organisation")),
    job_location: emptyToNull(formData.get("job_location")),
    address: emptyToNull(formData.get("address")),
    status: String(formData.get("status") ?? "active"),
    is_organisation: formData.get("is_organisation") === "on",
    needs_review: formData.get("needs_review") === "on",
    review_notes: emptyToNull(formData.get("review_notes")),
  }

  let memberId = id
  if (id) {
    const { error } = await supabase.from("members").update(payload).eq("id", id)
    if (error) throw new Error(error.message)
  } else {
    const { data, error } = await supabase
      .from("members")
      .insert(payload)
      .select("id")
      .single()
    if (error) throw new Error(error.message)
    memberId = data.id
  }

  await supabase.from("member_contacts").delete().eq("member_id", memberId)
  const phone = emptyToNull(formData.get("mobile"))
  const email = emptyToNull(formData.get("email"))
  const contacts = [
    phone
      ? { member_id: memberId, type: "phone" as const, value: phone, is_primary: true }
      : null,
    email
      ? { member_id: memberId, type: "email" as const, value: email, is_primary: true }
      : null,
  ].filter((c): c is { member_id: string; type: "phone" | "email"; value: string; is_primary: boolean } =>
    Boolean(c)
  )
  if (contacts.length) {
    const { error } = await supabase.from("member_contacts").insert(contacts)
    if (error) throw new Error(error.message)
  }

  revalidatePath("/admin/members")
  revalidatePath("/members")
  redirect(`/admin/members/${memberId}`)
}

export async function deleteMember(formData: FormData) {
  await requireSuperAdmin()
  const id = String(formData.get("id") ?? "")
  const supabase = await createClient()
  const { error } = await supabase.from("members").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/admin/members")
  redirect("/admin/members")
}

function emptyToNull(value: FormDataEntryValue | null) {
  const s = String(value ?? "").trim()
  return s ? s : null
}

function toInt(value: FormDataEntryValue | null) {
  const s = String(value ?? "").trim()
  if (!s) return null
  const n = Number.parseInt(s, 10)
  return Number.isFinite(n) ? n : null
}
