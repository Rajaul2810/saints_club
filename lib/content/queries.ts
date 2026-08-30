import {
  events as staticEvents,
  news as staticNews,
  notices as staticNotices,
  type EventItem,
  type NewsItem,
  type Notice,
} from "@/lib/data"
import { isSupabaseConfigured } from "@/lib/supabase/env"
import { createClient } from "@/lib/supabase/server"

function mediaUrl(path: string | null | undefined) {
  if (!path) return "/placeholder.svg"
  if (path.startsWith("http")) return path
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!base) return path
  return `${base}/storage/v1/object/public/public-media/${path}`
}

function toEvent(row: {
  id: string
  title: string
  body: string | null
  starts_at: string
  location: string | null
  category: string
  cover_path: string | null
  featured: boolean | null
}): EventItem {
  const starts = new Date(row.starts_at)
  const category = (
    ["Dinner", "Family", "Sport", "Cultural", "Reunion"] as const
  ).includes(row.category as EventItem["category"])
    ? (row.category as EventItem["category"])
    : "Dinner"
  return {
    id: row.id,
    title: row.title,
    date: starts.toISOString().slice(0, 10),
    time: starts.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    location: row.location ?? "",
    category,
    image: mediaUrl(row.cover_path),
    gallery: [mediaUrl(row.cover_path)],
    description: row.body ?? "",
    featured: Boolean(row.featured),
  }
}

function toNews(row: {
  id: string
  title: string
  excerpt: string | null
  body: string | null
  tag: string
  cover_path: string | null
  published_at: string | null
  published_by?: string | null
}): NewsItem {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt ?? "",
    content: row.body ?? row.excerpt ?? "",
    date: (row.published_at ?? new Date().toISOString()).slice(0, 10),
    author: "Secretariat",
    image: mediaUrl(row.cover_path),
    tag: row.tag,
  }
}

function toNotice(row: {
  id: string
  title: string
  body: string
  category: string
  published_at: string | null
}): Notice {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.body,
    date: (row.published_at ?? new Date().toISOString()).slice(0, 10),
    author: "Secretariat",
    tag: row.category,
  }
}

export async function getPublishedEvents(): Promise<EventItem[]> {
  if (!isSupabaseConfigured()) return staticEvents
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("events")
    .select("id, title, body, starts_at, location, category, cover_path, featured")
    .eq("is_published", true)
    .order("starts_at", { ascending: true })
  if (error || !data) return staticEvents
  return data.map(toEvent)
}

export async function getPublishedNews(): Promise<NewsItem[]> {
  if (!isSupabaseConfigured()) return staticNews
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("news")
    .select("id, title, excerpt, body, tag, cover_path, published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
  if (error || !data) return staticNews
  return data.map(toNews)
}

export async function getPublishedNotices(): Promise<Notice[]> {
  if (!isSupabaseConfigured()) return staticNotices
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("notices")
    .select("id, title, body, category, published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
  if (error || !data) return staticNotices
  return data.map(toNotice)
}

export { mediaUrl }
