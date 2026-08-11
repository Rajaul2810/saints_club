import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { PageHero } from "@/components/shared/section-heading"
import { aboutStats, clubInfo } from "@/lib/data"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = { title: "About" }

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A private society of the professions"
        description="Founded in 2012, Saints Club brings together members in law, medicine, letters, public service, and enterprise — for conversation, a shared table, and civic work."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden bg-muted sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1000&h=1200&fit=crop"
              alt="Interior of the club house"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-[11px] font-medium tracking-[0.2em] text-gold uppercase">
              Since {clubInfo.founded}
            </p>
            <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
              The house, the programme, the committee
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                Membership is by election. The house is kept for dining,
                lectures, and quieter work. Guests are welcome when introduced
                by a member.
              </p>
              <p>
                Each year the membership elects an Executive Committee —
                President, Secretary, Treasurer, and chairs of House, Programme,
                and Foundation — to steward rooms, calendar, and bursaries.
              </p>
            </div>
            <Link
              href="/committee"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-8 h-10 rounded-sm bg-ink px-5 text-white hover:bg-ink-soft"
              )}
            >
              This year’s committee
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
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
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            How the club is kept
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              {
                title: "Standing programmes",
                body: "Lectures, the reading table, wine committee, and Friday salon — a regular life of the house.",
              },
              {
                title: "The calendar",
                body: "Members’ dinners, visiting speakers, sport, and the foundation benefit, announced each season.",
              },
              {
                title: "Annual election",
                body: "A new Executive Committee each year, drawn from fellows in good standing.",
              },
            ].map((item) => (
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
    </>
  )
}
