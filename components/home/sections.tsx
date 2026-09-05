import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Bell, CalendarDays } from "lucide-react"
import { SectionHeading, TextLink } from "@/components/shared/section-heading"
import { EventCard, EventRow } from "@/components/cards/event-card"
import {
  aboutStats,
  clubInfo,
  corePrinciples,
  facilities,
  presidentMessage,
  quickLinks,
  formatDate,
} from "@/lib/data"
import { getPublishedEvents, getPublishedNotices } from "@/lib/content/queries"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function HomeIntro() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,var(--mist),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-6xl items-start gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <SectionHeading
          eyebrow="About Saints Club"
          title="A house for alumni, spouses, and children."
          description={`Originally registered as ${clubInfo.formerName}, ${clubInfo.name} is a ${clubInfo.legalForm.toLowerCase()}. We bring together former students of Bangladesh’s premier Christian missionary schools into a vibrant social community.`}
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {aboutStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border/80 bg-white/80 px-4 py-5 shadow-sm shadow-ink/4 backdrop-blur-sm sm:px-5 sm:py-6"
            >
              <p className="font-display text-3xl tracking-tight text-primary sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-[12px] leading-snug text-muted-foreground sm:text-[13px]">
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
    <section className="border-y border-border bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Core principles"
          title="Family, heritage, and the house."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
          {corePrinciples.map((item, index) => (
            <div key={item.title} className="relative pl-4 sm:pl-5">
              <span className="absolute top-0 left-0 h-full w-0.5 rounded-full bg-primary/25" />
              <p className="text-[11px] font-medium tracking-[0.16em] text-primary/70 uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display mt-3 text-xl tracking-tight text-ink">
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

export function HomeFacilities() {
  const featured = facilities.slice(0, 3)

  return (
    <section className="bg-[linear-gradient(180deg,var(--mist)_0%,transparent_40%)] py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Club life"
            title="Spaces of the house"
            description="Dining, lounges, and games — signature rooms for members and guests."
          />
          <TextLink href="/facilities">All facilities</TextLink>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {featured.map((facility, index) => (
            <Link
              key={facility.id}
              href="/facilities"
              className={cn(
                "group relative isolate min-h-64 overflow-hidden rounded-2xl sm:min-h-72",
                index === 0 && "sm:col-span-2 lg:col-span-1"
              )}
            >
              <Image
                src={facility.image}
                alt={facility.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="text-[11px] tracking-[0.14em] text-white/65 uppercase">
                  {facility.schedule}
                </p>
                <h3 className="font-display mt-1.5 text-xl tracking-tight text-white sm:text-2xl">
                  {facility.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HomeWelcome() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="overflow-hidden rounded-3xl border border-border/80 bg-white shadow-sm shadow-ink/4">
          <div className="grid lg:grid-cols-[1fr_0.85fr]">
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="text-[11px] font-medium tracking-[0.2em] text-primary uppercase">
                {presidentMessage.title}
              </p>
              <blockquote className="font-display mt-5 line-clamp-5 text-2xl leading-snug tracking-tight text-ink sm:text-3xl">
                {presidentMessage.body}
              </blockquote>
              <p className="mt-8 text-sm text-muted-foreground">
                <span className="font-medium text-ink">{presidentMessage.signoff}</span>
                <span className="mx-2 text-border">·</span>
                {presidentMessage.office}
              </p>
              <div className="mt-6">
                <TextLink href="/committee">The Board of Directors</TextLink>
              </div>
            </div>
            <div className="relative min-h-56 lg:min-h-full">
              <Image
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=1000&fit=crop"
                alt="Club lounge"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function HomeQuickLinks() {
  return (
    <section className="border-y border-border bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Start here"
          title="Join, explore, and visit."
          description="The three doors most visitors need."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {quickLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col rounded-2xl border border-border/80 bg-[linear-gradient(180deg,var(--mist)_0%,white_55%)] p-6 transition duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md hover:shadow-primary/10 sm:p-7"
            >
              <span className="text-[11px] font-medium tracking-[0.16em] text-primary/70 uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-4 text-2xl tracking-tight text-ink">
                {link.label}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {link.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-primary">
                Continue
                <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export async function HomeEvents() {
  const events = await getPublishedEvents()
  const featured = events.find((e) => e.featured) ?? events[0]
  if (!featured) return null
  const rest = events.filter((e) => e.id !== featured.id).slice(0, 3)

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Calendar"
            title="Forthcoming events"
            description="Family nights, reunions, sport, and dinners for members and guests."
          />
          <TextLink href="/events">Full calendar</TextLink>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <EventCard event={featured} />
          </div>
          <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border/80 bg-white px-4 sm:px-5 lg:col-span-5">
            {rest.map((event) => (
              <EventRow key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export async function HomeNotices() {
  const notices = await getPublishedNotices()
  const items = notices.slice(0, 4)
  if (items.length === 0) return null

  return (
    <section className="border-y border-border bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Notice board"
            title="Official announcements"
            description="From the Secretariat and the standing committees."
          />
          <TextLink href="/notices">All notices</TextLink>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4">
          {items.map((notice) => (
            <Link
              key={notice.id}
              href="/notices"
              className="group flex gap-4 rounded-2xl border border-border/80 bg-[linear-gradient(180deg,var(--mist)_0%,white_70%)] p-5 transition hover:border-primary/25 hover:shadow-sm hover:shadow-primary/8 sm:p-6"
            >
              <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Bell className="size-4" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="text-[11px] font-medium tracking-[0.12em] text-primary uppercase">
                  {notice.tag}
                </span>
                <span className="mt-1.5 block font-display text-lg leading-snug tracking-tight text-ink group-hover:text-primary sm:text-xl">
                  {notice.title}
                </span>
                <span className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {notice.excerpt}
                </span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="size-3.5 text-primary" aria-hidden />
                  {formatDate(notice.date)}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HomeCta() {
  return (
    <section className="relative overflow-hidden bg-ink py-16 text-white sm:py-24">
      <div className="pointer-events-none absolute -top-24 right-0 size-80 rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-0 size-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium tracking-[0.2em] text-white/45 uppercase">
            Membership
          </p>
          <h2 className="font-display mt-4 text-3xl tracking-tight sm:text-4xl lg:text-5xl">
            Alumni of the seven schools, from the age of 24.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
            General Members hold the vote. Use Members enjoy the house without
            Board eligibility. Write to the Secretariat to begin an application.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/membership"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 rounded-full bg-primary px-6 text-white hover:bg-primary/90"
              )}
            >
              Explore membership
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-11 rounded-full border-white/25 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
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
