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
  Family: {
    badge: "bg-rose-100 text-rose-900",
    icon: "bg-rose-700 text-white",
    label: "Family",
  },
  Sport: {
    badge: "bg-emerald-100 text-emerald-900",
    icon: "bg-emerald-700 text-white",
    label: "Sport",
  },
  Cultural: {
    badge: "bg-violet-100 text-violet-900",
    icon: "bg-violet-700 text-white",
    label: "Cultural",
  },
  Reunion: {
    badge: "bg-sky-100 text-sky-900",
    icon: "bg-sky-800 text-white",
    label: "Reunion",
  },
}

export const newsTone: Record<string, { badge: string; icon: string }> = {
  Club: {
    badge: "bg-violet-100 text-violet-900",
    icon: "bg-violet-800 text-white",
  },
  Events: {
    badge: "bg-amber-100 text-amber-900",
    icon: "bg-amber-800 text-white",
  },
  Facilities: {
    badge: "bg-emerald-100 text-emerald-900",
    icon: "bg-emerald-800 text-white",
  },
  Governance: {
    badge: "bg-slate-100 text-slate-800",
    icon: "bg-slate-800 text-white",
  },
  Membership: {
    badge: "bg-sky-100 text-sky-900",
    icon: "bg-sky-800 text-white",
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
