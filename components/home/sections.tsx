import Link from "next/link"
import { SectionHeading, TextLink } from "@/components/shared/section-heading"
import { EventCard, EventRow } from "@/components/cards/event-card"
import { NoticeCard } from "@/components/cards/notice-card"
import {
  aboutStats,
  clubInfo,
  corePrinciples,
  events,
  notices,
  presidentMessage,
  quickLinks,
} from "@/lib/data"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function HomeIntro() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <SectionHeading
          eyebrow="About Saints Club"
          title="A house for alumni, spouses, and children."
          description={`Originally registered as ${clubInfo.formerName}, ${clubInfo.name} is a ${clubInfo.legalForm.toLowerCase()}. We bring together former students of Bangladesh’s premier Christian missionary schools into a vibrant social community dedicated to family, networking, and cultural engagement.`}
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

export function HomePrinciples() {
  return (
    <section className="border-y border-border bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Core principles"
          title="Family, heritage, and the house."
        />
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {corePrinciples.map((item) => (
            <div key={item.title} className="border-t border-border pt-5">
              <h3 className="font-display text-xl tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HomeWelcome() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-3xl border-l-2 border-primary/30 pl-6 sm:pl-10">
          <p className="text-[11px] font-medium tracking-[0.2em] text-primary uppercase">
            {presidentMessage.title}
          </p>
          <blockquote className="font-display mt-5 text-2xl leading-snug tracking-tight text-ink sm:text-3xl">
            {presidentMessage.body}
          </blockquote>
          <p className="mt-8 text-sm text-muted-foreground">
            <span className="text-ink">{presidentMessage.signoff}</span>
            <span className="mx-2 text-border">·</span>
            {presidentMessage.office}
          </p>
          <div className="mt-6">
            <TextLink href="/committee">The Board of Directors</TextLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export function HomeQuickLinks() {
  return (
    <section className="border-y border-border bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Quick links"
          title="Join, the calendar, and the rooms."
          description="Membership, forthcoming events, and facility booking — the three doors most visitors need."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-3xl bg-card p-6 ring-1 ring-foreground/5 transition hover:ring-primary/30 sm:p-8"
            >
              <h3 className="font-display text-2xl tracking-tight text-ink">
                {link.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {link.description}
              </p>
              <p className="mt-6 text-[13px] text-primary">Continue →</p>
            </Link>
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
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Calendar"
            title="Forthcoming events"
            description="Family nights, reunions, sport, and dinners for members and guests."
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

export function HomeNotices() {
  return (
    <section className="border-y border-border bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Notice board"
            title="Official announcements"
            description="From the Secretariat and the standing committees."
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
            Alumni of the seven schools, from the age of 24.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/55">
            General Members hold the vote. Use Members enjoy the house without
            Board eligibility. Write to the Secretariat to begin an application.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/membership"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-10 rounded-full bg-primary px-5 text-white hover:bg-primary/90"
              )}
            >
              Explore membership
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-10 rounded-full border-white/20 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white"
              )}
            >
              Contact the Secretariat
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
