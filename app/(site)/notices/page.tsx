import type { Metadata } from "next"
import { PageHero } from "@/components/shared/section-heading"
import { NoticeCard } from "@/components/cards/notice-card"
import { notices } from "@/lib/data"

export const metadata: Metadata = { title: "Notices" }

export default function NoticesPage() {
  return (
    <>
      <PageHero
        eyebrow="Notices"
        title="From the secretariat"
        description="Official notices of the house. No photographs — dates, authors, and the text only."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-8 md:grid-cols-2">
          {notices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
        </div>
      </section>
    </>
  )
}
