import type { Metadata } from "next"
import { PageHero } from "@/components/shared/section-heading"
import { NoticeCard } from "@/components/cards/notice-card"
import { getPublishedNotices } from "@/lib/content/queries"

export const metadata: Metadata = { title: "Notices" }

export default async function NoticesPage() {
  const notices = await getPublishedNotices()
  return (
    <>
      <PageHero
        eyebrow="Notice board"
        title="Official announcements"
        description="Notices of the Secretariat and the standing committees. Dates, authors, and the text only."
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
