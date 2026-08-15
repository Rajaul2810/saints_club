import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Heart, Trophy, UtensilsCrossed, Music } from "lucide-react"
import { PageHero } from "@/components/shared/section-heading"
import { facilities } from "@/lib/data"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = { title: "Club Life & Facilities" }

const icons = {
  family: Heart,
  sport: Trophy,
  dining: UtensilsCrossed,
  culture: Music,
}

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Club life"
        title="A family-first environment"
        description="Saints Club Limited keeps a secure and welcoming house. Spouses and dependent children under 24 enjoy equal facility privileges."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl divide-y divide-border px-5 sm:px-8">
          {facilities.map((facility, index) => {
            const Icon = icons[facility.icon]
            return (
              <article
                key={facility.id}
                className="grid items-center gap-8 py-14 first:pt-0 last:pb-0 lg:grid-cols-2 lg:gap-16"
              >
                <div
                  className={`relative aspect-5/4 overflow-hidden bg-muted ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <Icon className="size-5 text-gold" />
                  <h2 className="font-display mt-4 text-3xl tracking-tight text-ink">
                    {facility.title}
                  </h2>
                  <p className="mt-2 text-[11px] tracking-[0.16em] text-gold uppercase">
                    {facility.schedule}
                  </p>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                    {facility.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="border-t border-border bg-white py-16 sm:py-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl tracking-tight text-ink">
              Reserve a room
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Lounge, private dining, the event hall, and meeting rooms may be
              booked by members for gatherings, dinners, and corporate meetings.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/booking"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-10 rounded-sm bg-ink px-5 text-white hover:bg-ink-soft"
              )}
            >
              Facility booking
            </Link>
            <Link
              href="/events"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-10 rounded-sm px-5"
              )}
            >
              Event calendar
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
