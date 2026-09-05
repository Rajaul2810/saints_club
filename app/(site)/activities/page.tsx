import type { Metadata } from "next"
import Image from "next/image"
import { CalendarDays, Tag } from "lucide-react"
import { PageHero } from "@/components/shared/section-heading"
import { Badge } from "@/components/ui/badge"
import { clubActivities } from "@/lib/data"

export const metadata: Metadata = { title: "Activities" }

export default function ActivitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Club life"
        title="Activities at the Club"
        description="Demo programme of sports, socials, cultural evenings, and family sessions for members and guests."
      />

      <section className="bg-[linear-gradient(180deg,var(--mist)_0%,transparent_22%)] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {clubActivities.map((activity, index) => (
              <article
                key={activity.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm shadow-ink/4 transition duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md hover:shadow-primary/10"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-muted">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    priority={index < 3}
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-ink/40 via-transparent to-transparent" />
                  <Badge className="absolute top-3 left-3 bg-white/95 text-primary hover:bg-white">
                    {activity.category}
                  </Badge>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h2 className="font-display text-xl leading-snug tracking-tight text-ink sm:text-2xl">
                    {activity.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {activity.description}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 border-t border-border/70 pt-4 text-xs text-ink/70">
                    <CalendarDays className="size-3.5 text-primary" aria-hidden />
                    {activity.schedule}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            <Tag className="mr-1.5 inline size-3.5 align-[-2px] text-primary" aria-hidden />
            Demo content — schedules may change. Confirm with the Secretariat.
          </p>
        </div>
      </section>
    </>
  )
}
