"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { requireEditor } from "@/lib/auth/session"
import { createClient } from "@/lib/supabase/server"

type Kind = "notices" | "events" | "news"

function paths(kind: Kind) {
  return {
    admin: `/admin/${kind}`,
    public: kind === "news" ? "/news" : `/${kind}`,
  }
}

export async function saveNotice(formData: FormData) {
  const editor = await requireEditor()
  const supabase = await createClient()
  const id = String(formData.get("id") ?? "")
  const isPublished = formData.get("is_published") === "on"
  const payload = {
    title: String(formData.get("title") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
    category: String(formData.get("category") ?? "General").trim(),
    is_published: isPublished,
    published_at: isPublished
      ? (emptyToNull(formData.get("published_at")) ?? new Date().toISOString())
      : null,
    published_by: editor.id,
  }
  if (id) {
    const { error } = await supabase.from("notices").update(payload).eq("id", id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from("notices").insert(payload)
    if (error) throw new Error(error.message)
  }
  revalidate(paths("notices"))
  redirect("/admin/notices")
}

export async function saveEvent(formData: FormData) {
  const editor = await requireEditor()
  const supabase = await createClient()
  const id = String(formData.get("id") ?? "")
  const date = String(formData.get("date") ?? "")
  const time = String(formData.get("time") ?? "18:00")
  const payload = {
    title: String(formData.get("title") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
    starts_at: new Date(`${date}T${time}:00+06:00`).toISOString(),
    location: emptyToNull(formData.get("location")),
    category: String(formData.get("category") ?? "Dinner"),
    cover_path: emptyToNull(formData.get("cover_path")),
    featured: formData.get("featured") === "on",
    is_published: formData.get("is_published") === "on",
    published_by: editor.id,
  }
  if (id) {
    const { error } = await supabase.from("events").update(payload).eq("id", id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from("events").insert(payload)
    if (error) throw new Error(error.message)
  }
  revalidate(paths("events"))
  redirect("/admin/events")
}

export async function saveNews(formData: FormData) {
  const editor = await requireEditor()
  const supabase = await createClient()
  const id = String(formData.get("id") ?? "")
  const isPublished = formData.get("is_published") === "on"
  const payload = {
    title: String(formData.get("title") ?? "").trim(),
    excerpt: emptyToNull(formData.get("excerpt")),
    body: emptyToNull(formData.get("body")),
    tag: String(formData.get("tag") ?? "Club").trim(),
    cover_path: emptyToNull(formData.get("cover_path")),
    is_published: isPublished,
    published_at: isPublished
      ? (emptyToNull(formData.get("published_at")) ?? new Date().toISOString())
      : null,
    published_by: editor.id,
  }
  if (id) {
    const { error } = await supabase.from("news").update(payload).eq("id", id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from("news").insert(payload)
    if (error) throw new Error(error.message)
  }
  revalidate(paths("news"))
  redirect("/admin/news")
}

export async function deleteNotice(formData: FormData) {
  await deleteContent("notices", String(formData.get("id") ?? ""))
}

export async function deleteEvent(formData: FormData) {
  await deleteContent("events", String(formData.get("id") ?? ""))
}

export async function deleteNewsItem(formData: FormData) {
  await deleteContent("news", String(formData.get("id") ?? ""))
}

async function deleteContent(kind: Kind, id: string) {
  await requireEditor()
  const supabase = await createClient()
  const { error } = await supabase.from(kind).delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidate(paths(kind))
  redirect(paths(kind).admin)
}

function emptyToNull(value: FormDataEntryValue | null) {
  const s = String(value ?? "").trim()
  return s ? s : null
}

function revalidate(p: { admin: string; public: string }) {
  revalidatePath(p.admin)
  revalidatePath(p.public)
  revalidatePath("/")
}
