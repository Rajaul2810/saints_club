import type { Metadata } from "next"
import { PageHero } from "@/components/shared/section-heading"
import { EventCard } from "@/components/cards/event-card"
import { getPublishedEvents } from "@/lib/content/queries"

export const metadata: Metadata = { title: "Events" }

export default async function EventsPage() {
  const events = await getPublishedEvents()
  return (
    <>
      <PageHero
        eyebrow="Calendar"
        title="Events of the house"
        description="Family nights, alumni reunions, sport, cultural evenings, and members’ dinners."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-8 md:grid-cols-2">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </>
  )
}
