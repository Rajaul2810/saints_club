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

/** Remap Unsplash IDs that now 404 so seeded DB rows still render. */
const BROKEN_UNSPLASH: Record<string, string> = {
  "photo-1511632765486-a01980e01a43": "photo-1529156069898-49953e39b3ac",
  "photo-1519167758481-83f29da8c2b0": "photo-1511795409834-ef04bbd61622",
  "photo-1626224582412-4fdd0eb4795f": "photo-1612872087720-bb876e2e67d1",
  "photo-1514320291840-3092126dace7": "photo-1493225457124-a3eb161ffa5f",
}

function remapBrokenMedia(url: string) {
  for (const [from, to] of Object.entries(BROKEN_UNSPLASH)) {
    if (url.includes(from)) return url.replace(from, to)
  }
  return url
}

function mediaUrl(path: string | null | undefined) {
  if (!path) return "/placeholder.svg"
  if (path.startsWith("http")) return remapBrokenMedia(path)
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
