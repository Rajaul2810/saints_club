import type { Metadata } from "next"
import Image from "next/image"
import {
  BookOpen,
  Landmark,
  MessagesSquare,
  HeartHandshake,
  Sparkles,
  Trophy,
} from "lucide-react"
import { PageHero } from "@/components/shared/section-heading"
import { activities } from "@/lib/data"

export const metadata: Metadata = { title: "Activities" }

const icons = {
  lecture: Landmark,
  sport: Trophy,
  salon: MessagesSquare,
  philanthropy: HeartHandshake,
  wine: Sparkles,
  letters: BookOpen,
}

export default function ActivitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Standing programmes"
        title="The life of the house"
        description="Regular tables and committees, open to members throughout the year."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl divide-y divide-border px-5 sm:px-8">
          {activities.map((activity, index) => {
            const Icon = icons[activity.icon]
            return (
              <article
                key={activity.id}
                className="grid items-center gap-8 py-14 first:pt-0 last:pb-0 lg:grid-cols-2 lg:gap-16"
              >
                <div
                  className={`relative aspect-[5/4] overflow-hidden bg-muted ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <Icon className="size-5 text-gold" />
                  <h2 className="font-display mt-4 text-3xl tracking-tight text-ink">
                    {activity.title}
                  </h2>
                  <p className="mt-2 text-[11px] tracking-[0.16em] text-gold uppercase">
                    {activity.schedule}
                  </p>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}
