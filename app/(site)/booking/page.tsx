import type { Metadata } from "next"
import { PageHero } from "@/components/shared/section-heading"
import { BookingForm } from "@/components/contact/booking-form"

export const metadata: Metadata = { title: "Facility Booking" }

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Facility booking"
        title="Reserve a room of the house"
        description="Members may request the lounge, private dining, event hall, or a meeting room. The Secretariat will confirm availability."
      />
      <BookingForm />
    </>
  )
}
