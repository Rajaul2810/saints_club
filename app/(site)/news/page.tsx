import type { Metadata } from "next"
import { PageHero } from "@/components/shared/section-heading"
import { NewsCard } from "@/components/cards/news-card"
import { news } from "@/lib/data"

export const metadata: Metadata = { title: "News" }

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News"
        title="From the Club"
        description="The house, the calendar, and the facilities."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-8 md:grid-cols-3">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </>
  )
}
