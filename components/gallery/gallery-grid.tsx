"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { galleryItems, type GalleryItem } from "@/lib/data"
import { cn } from "@/lib/utils"

const categories = [
  "All",
  "Dining",
  "Events",
  "Facilities",
  "Members",
  "Sports",
] as const

type Category = (typeof categories)[number]

export function GalleryGrid() {
  const [active, setActive] = useState<Category>("All")

  const items = useMemo(
    () =>
      active === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === active),
    [active]
  )

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={cn(
              "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
              active === category
                ? "bg-primary text-white"
                : "bg-white text-ink/70 ring-1 ring-border hover:bg-mist hover:text-ink"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3">
        {items.map((item, index) => (
          <GalleryTile key={item.id} item={item} priority={index < 4} />
        ))}
      </div>

      {items.length === 0 && (
        <p className="rounded-2xl border border-dashed border-border bg-white/70 px-6 py-14 text-center text-sm text-muted-foreground">
          No photos in this category yet.
        </p>
      )}
    </div>
  )
}

function GalleryTile({
  item,
  priority,
}: {
  item: GalleryItem
  priority?: boolean
}) {
  const tall = ["g2", "g4", "g8", "g12"].includes(item.id)

  return (
    <figure className="group mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm shadow-ink/4 sm:mb-5">
      <div
        className={cn(
          "relative overflow-hidden bg-muted",
          tall ? "aspect-3/4" : "aspect-4/3"
        )}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          priority={priority}
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/15 to-transparent opacity-90 transition group-hover:opacity-100" />
        <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
          <p className="text-[11px] font-medium tracking-[0.14em] text-white/70 uppercase">
            {item.category}
          </p>
          <p className="font-display mt-1 text-lg leading-snug tracking-tight sm:text-xl">
            {item.title}
          </p>
          <p className="mt-1 text-xs text-white/75 sm:text-sm">{item.caption}</p>
        </figcaption>
      </div>
    </figure>
  )
}
