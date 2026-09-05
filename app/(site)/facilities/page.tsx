import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  Coffee,
  Cigarette,
  CircleDot,
  Spade,
  Sofa,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react"
import { PageHero } from "@/components/shared/section-heading"
import { facilities, type FacilityIcon } from "@/lib/data"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = { title: "Club Facilities" }

const icons: Record<FacilityIcon, LucideIcon> = {
  restaurant: UtensilsCrossed,
  tea: Coffee,
  cigar: Cigarette,
  pool: CircleDot,
  cards: Spade,
  lounge: Sofa,
}

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Club facilities"
        title="Spaces for dining, leisure, and gathering"
        description="Six signature rooms under one roof — restaurant, lounges, bar, and games — for members, families, and invited guests."
      />

      <section className="bg-[linear-gradient(180deg,var(--mist)_0%,transparent_22%)] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {facilities.map((facility, index) => {
              const Icon = icons[facility.icon]
              return (
                <article
                  key={facility.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm shadow-ink/4 transition duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md hover:shadow-primary/10"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-muted">
                    <Image
                      src={facility.image}
                      alt={facility.title}
                      fill
                      priority={index < 2}
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-ink/55 via-ink/10 to-transparent" />
                    <span className="absolute top-3 left-3 grid size-9 place-items-center rounded-full bg-white/95 text-primary shadow-sm backdrop-blur-sm">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="absolute right-3 bottom-3 font-display text-2xl text-white/90 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="text-[11px] font-medium tracking-[0.14em] text-primary uppercase">
                      {facility.schedule}
                    </p>
                    <h2 className="font-display mt-2 text-xl leading-snug tracking-tight text-ink sm:text-2xl">
                      {facility.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {facility.description}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-white py-14 sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl tracking-tight text-ink">
              Visit the Club
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Spouses and dependent children under 24 enjoy equal facility
              privileges. Reach the Secretariat for house hours and guest
              arrangements.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
              Contact
            </Link>
            <Link
              href="/membership"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
            >
              Membership
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
