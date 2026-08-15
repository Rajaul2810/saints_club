import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { PageHero } from "@/components/shared/section-heading"
import { aboutStats, clubInfo, schools } from "@/lib/data"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = { title: "About Us" }

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Our identity and history"
        description={`${clubInfo.name} was incorporated to foster lifelong bonds among alumni of distinguished Christian missionary schools in Bangladesh.`}
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
              Formerly {clubInfo.formerName}
            </p>
            <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
              A company limited by guarantee
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                Originally registered as {clubInfo.formerName},{" "}
                {clubInfo.name} is a {clubInfo.legalForm.toLowerCase()}. We
                bring together former students of Bangladesh’s premier Christian
                missionary schools into a family-centric social community.
              </p>
              <p>
                With a structured ceiling of {clubInfo.memberCeiling} General
                Members, the Club maintains an exclusive yet warm atmosphere for
                personal, social, and family growth.
              </p>
            </div>
            <Link
              href="/committee"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-8 h-10 rounded-sm bg-ink px-5 text-white hover:bg-ink-soft"
              )}
            >
              Board of Directors
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Mission &amp; vision
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div className="border-t border-border pt-5">
              <h3 className="font-display text-xl tracking-tight text-ink">
                Mission
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                To foster lifelong bonds among alumni of distinguished Christian
                missionary schools in Bangladesh, and to keep a house where
                members, spouses, and children may meet for fellowship, sport,
                dining, and culture.
              </p>
            </div>
            <div className="border-t border-border pt-5">
              <h3 className="font-display text-xl tracking-tight text-ink">
                Vision
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A premier, family-centric social club built on tradition,
                fraternity, and excellence — exclusive in number, warm in
                character, and faithful to the heritage of the seven schools.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
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

      <section className="border-y border-border bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Eligible institution heritage
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Saints Club welcomes alumni from the following seven missionary
            schools.
          </p>
          <ol className="mt-12 divide-y divide-border border-y border-border">
            {schools.map((school, index) => (
              <li
                key={school.name}
                className="grid gap-2 py-5 sm:grid-cols-[3rem_1fr_auto] sm:items-baseline sm:gap-6"
              >
                <span className="text-[11px] tracking-[0.16em] text-gold uppercase">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-xl tracking-tight text-ink">
                    {school.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {school.location}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{school.year}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Board of Directors
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Day-to-day management and governance are led by an elected Board of
            Directors consisting of the President and ten Directors, serving
            two-year terms.
          </p>
          <Link
            href="/committee"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 h-10 rounded-sm bg-ink px-5 text-white hover:bg-ink-soft"
            )}
          >
            Meet the Board
          </Link>
        </div>
      </section>

      <section
        id="founders"
        className="scroll-mt-24 border-t border-border bg-white py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Foundational Committee
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            The Club was established by a Foundational Committee whose members
            are recognised as Founder Members. They are exempt from monthly
            subscriptions in acknowledgement of their contribution at inception.
            The roll of the Foundational Committee is held at the registered
            office and may be published here as the Secretariat confirms names.
          </p>
        </div>
      </section>
    </>
  )
}
