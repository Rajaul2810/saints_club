"use client"

import { saveEvent, saveNews, saveNotice } from "@/app/actions/content"
import { Button } from "@/components/ui/button"
import { Input, Label, Select, Textarea } from "@/components/ui/input"

export function NoticeForm({
  item,
}: {
  item?: {
    id: string
    title: string
    body: string
    category: string
    published_at: string | null
    is_published: boolean
  }
}) {
  return (
    <form action={saveNotice} className="w-full max-w-2xl min-w-0 space-y-5">
      {item && <input type="hidden" name="id" value={item.id} />}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" required defaultValue={item?.title} />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Input id="category" name="category" defaultValue={item?.category ?? "General"} />
      </div>
      <div>
        <Label htmlFor="body">Body</Label>
        <Textarea id="body" name="body" rows={8} required defaultValue={item?.body} />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="is_published" defaultChecked={item?.is_published ?? true} />
        Published
      </label>
      <Button type="submit">Save notice</Button>
    </form>
  )
}

export function EventForm({
  item,
}: {
  item?: {
    id: string
    title: string
    body: string | null
    starts_at: string
    location: string | null
    category: string
    cover_path: string | null
    featured: boolean
    is_published: boolean
  }
}) {
  const starts = item ? new Date(item.starts_at) : null
  const date = starts ? starts.toISOString().slice(0, 10) : ""
  const time = starts
    ? starts.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false })
    : "18:00"

  return (
    <form action={saveEvent} className="w-full max-w-2xl min-w-0 space-y-5">
      {item && <input type="hidden" name="id" value={item.id} />}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" required defaultValue={item?.title} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" name="date" type="date" required defaultValue={date} />
        </div>
        <div>
          <Label htmlFor="time">Time</Label>
          <Input id="time" name="time" type="time" required defaultValue={time} />
        </div>
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input id="location" name="location" defaultValue={item?.location ?? ""} />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select id="category" name="category" defaultValue={item?.category ?? "Dinner"}>
          {["Dinner", "Family", "Sport", "Cultural", "Reunion"].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>
      </div>
      <div>
        <Label htmlFor="cover_path">Image URL</Label>
        <Input id="cover_path" name="cover_path" defaultValue={item?.cover_path ?? ""} />
      </div>
      <div>
        <Label htmlFor="body">Description</Label>
        <Textarea id="body" name="body" rows={6} defaultValue={item?.body ?? ""} />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="featured" defaultChecked={item?.featured} />
        Featured
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="is_published" defaultChecked={item?.is_published ?? true} />
        Published
      </label>
      <Button type="submit">Save event</Button>
    </form>
  )
}

export function NewsForm({
  item,
}: {
  item?: {
    id: string
    title: string
    excerpt: string | null
    body: string | null
    tag: string
    cover_path: string | null
    is_published: boolean
  }
}) {
  return (
    <form action={saveNews} className="w-full max-w-2xl min-w-0 space-y-5">
      {item && <input type="hidden" name="id" value={item.id} />}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" required defaultValue={item?.title} />
      </div>
      <div>
        <Label htmlFor="tag">Tag</Label>
        <Input id="tag" name="tag" defaultValue={item?.tag ?? "Club"} />
      </div>
      <div>
        <Label htmlFor="cover_path">Image URL</Label>
        <Input id="cover_path" name="cover_path" defaultValue={item?.cover_path ?? ""} />
      </div>
      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea id="excerpt" name="excerpt" rows={3} defaultValue={item?.excerpt ?? ""} />
      </div>
      <div>
        <Label htmlFor="body">Body</Label>
        <Textarea id="body" name="body" rows={8} defaultValue={item?.body ?? ""} />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="is_published" defaultChecked={item?.is_published ?? true} />
        Published
      </label>
      <Button type="submit">Save story</Button>
    </form>
  )
}
