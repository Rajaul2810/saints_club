import type { EventItem } from "@/lib/data"

export const eventTone: Record<
  EventItem["category"],
  { badge: string; icon: string; label: string }
> = {
  Dinner: {
    badge: "bg-amber-100 text-amber-900",
    icon: "bg-amber-700 text-white",
    label: "Dinner",
  },
  Lecture: {
    badge: "bg-slate-100 text-slate-800",
    icon: "bg-slate-800 text-white",
    label: "Lecture",
  },
  Sport: {
    badge: "bg-emerald-100 text-emerald-900",
    icon: "bg-emerald-700 text-white",
    label: "Sport",
  },
  Salon: {
    badge: "bg-violet-100 text-violet-900",
    icon: "bg-violet-700 text-white",
    label: "Salon",
  },
  Philanthropy: {
    badge: "bg-sky-100 text-sky-900",
    icon: "bg-sky-800 text-white",
    label: "Philanthropy",
  },
}

export const newsTone: Record<string, { badge: string; icon: string }> = {
  Foundation: {
    badge: "bg-sky-100 text-sky-900",
    icon: "bg-sky-800 text-white",
  },
  Governance: {
    badge: "bg-slate-100 text-slate-800",
    icon: "bg-slate-800 text-white",
  },
  House: {
    badge: "bg-amber-100 text-amber-900",
    icon: "bg-amber-800 text-white",
  },
  Members: {
    badge: "bg-emerald-100 text-emerald-900",
    icon: "bg-emerald-800 text-white",
  },
}

export function newsStyle(tag: string) {
  return (
    newsTone[tag] ?? {
      badge: "bg-mist text-ink",
      icon: "bg-ink text-white",
    }
  )
}
