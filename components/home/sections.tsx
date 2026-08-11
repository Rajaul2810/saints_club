import Link from "next/link"
import { SectionHeading, TextLink } from "@/components/shared/section-heading"
import { EventCard, EventRow } from "@/components/cards/event-card"
import { NewsCard } from "@/components/cards/news-card"
import { NoticeCard } from "@/components/cards/notice-card"
import { aboutStats, events, news, notices, activities } from "@/lib/data"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function HomeIntro() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <SectionHeading
          eyebrow="The club"
          title="Elected members. A house for conversation."
          description="Saints Club is a private society of professionals in law, medicine, letters, public life, and enterprise. An executive committee is elected each year to steward the house and its programme."
        />
        <div className="grid grid-cols-2 gap-x-8 gap-y-10">
          {aboutStats.map((stat) => (
            <div key={stat.label} className="border-t border-ink/15 pt-4">
              <p className="font-display text-4xl tracking-tight text-ink">
                {stat.value}
              </p>
              <p className="mt-2 text-[13px] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HomeEvents() {
  const featured = events.find((e) => e.featured) ?? events[0]
  const rest = events.filter((e) => e.id !== featured.id).slice(0, 3)

  return (
    <section className="border-y border-border bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Programme"
            title="Forthcoming events"
            description="Dinners, lectures, and days reserved for members."
          />
          <TextLink href="/events">Full calendar</TextLink>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <EventCard event={featured} />
          </div>
          <div className="divide-y divide-border rounded-3xl bg-card px-5 ring-1 ring-foreground/5 lg:col-span-5">
            {rest.map((event) => (
              <EventRow key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function HomeActivities() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Standing programmes"
            title="The life of the house"
            description="Regular tables and committees, open to members throughout the year."
          />
          <TextLink href="/activities">All activities</TextLink>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {activities.slice(0, 3).map((activity) => (
            <Link
              key={activity.id}
              href="/activities"
              className="rounded-3xl bg-card p-6 ring-1 ring-foreground/5 transition hover:ring-primary/30 sm:p-8"
            >
              <p className="text-[11px] tracking-[0.16em] text-primary uppercase">
                {activity.schedule}
              </p>
              <h3 className="font-display mt-4 text-2xl tracking-tight text-ink">
                {activity.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {activity.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HomeNews() {
  return (
    <section className="border-y border-border bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="News"
            title="Stories from the club"
            description="One photograph with each story."
          />
          <TextLink href="/news">All news</TextLink>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {news.slice(0, 3).map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function HomeNotices() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Notices"
            title="From the secretariat"
            description="Official notices — text only, no photographs."
          />
          <TextLink href="/notices">All notices</TextLink>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {notices.slice(0, 4).map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function HomeCta() {
  return (
    <section className="bg-ink py-20 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-xl">
          <p className="text-[11px] font-medium tracking-[0.2em] text-white/40 uppercase">
            Membership
          </p>
          <h2 className="font-display mt-4 text-3xl tracking-tight sm:text-4xl">
            Admission is by election.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/55">
            Write to the Secretariat for the procedure, or address the
            committee on a matter of the house.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-10 rounded-full bg-primary px-5 text-white hover:bg-primary/90"
              )}
            >
              Contact the house
            </Link>
            <Link
              href="/committee"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-10 rounded-full border-white/20 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white"
              )}
            >
              The committee
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
