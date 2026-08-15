import type { Metadata } from "next"
import Link from "next/link"
import { PageHero } from "@/components/shared/section-heading"
import { conductPoints, standingCommittees } from "@/lib/data"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = { title: "Governance & Legal" }

export default function GovernancePage() {
  return (
    <>
      <PageHero
        eyebrow="Governance"
        title="Articles, discipline, and the committees"
        description="Saints Club Limited is governed under its Articles of Association. The full instrument is held at the registered office."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Articles of Association
          </h2>
          <div className="mt-8 max-w-3xl space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              The Club is a company limited by guarantee under the Companies
              Act, 1994, originally registered as Gregorian Alumni Club Limited.
              The Articles provide for a ceiling of 2,318 General Members, an
              elected Board of Directors (the President and ten Directors,
              serving two-year terms), and the classes of General and Use
              membership set out on this site.
            </p>
            <p>
              Members may inspect the Articles at the Secretariat. Amendments
              follow the procedure in the Articles and applicable company law.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Disciplinary &amp; arbitration
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Harmony of the house is a condition of membership. The following
            bodies act under the Articles:
          </p>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              {
                title: "Disciplinary Committee",
                body: "Receives complaints of misconduct, derogatory behaviour, or abuse of the house, and may recommend sanctions.",
              },
              {
                title: "Appellate Committee",
                body: "Hears appeals from disciplinary findings, so that a member may have a second hearing as the Articles provide.",
              },
              {
                title: "Arbitration",
                body: "Certain disputes among members, or between a member and the Club, may be referred to arbitration rather than to the courts.",
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
          <ul className="mt-12 max-w-3xl space-y-4">
            {conductPoints.map((item) => (
              <li
                key={item}
                className="border-t border-border pt-4 text-[15px] leading-relaxed text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Standing committees
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            The Board is assisted by standing committees. Chairs are drawn from
            the Directors unless the Board otherwise determines.
          </p>
          <ul className="mt-12 grid gap-px bg-border sm:grid-cols-2">
            {standingCommittees.map((name) => (
              <li key={name} className="bg-background px-5 py-4 text-[15px] text-ink">
                {name}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/committee"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-10 rounded-sm bg-ink px-5 text-white hover:bg-ink-soft"
              )}
            >
              Board of Directors
            </Link>
            <Link
              href="/notices"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-10 rounded-sm px-5"
              )}
            >
              Notice board
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
