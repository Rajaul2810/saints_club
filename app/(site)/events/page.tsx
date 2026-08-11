import type { Metadata } from "next"
import { PageHero } from "@/components/shared/section-heading"
import { EventCard } from "@/components/cards/event-card"
import { events } from "@/lib/data"

export const metadata: Metadata = { title: "Events" }

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programme"
        title="The calendar"
        description="Dinners, lectures, sport, and the foundation — for members and introduced guests."
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
