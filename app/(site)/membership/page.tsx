import type { Metadata } from "next"
import Link from "next/link"
import { PageHero } from "@/components/shared/section-heading"
import {
  applicationSteps,
  conductPoints,
  eligibility,
  feeSchedule,
  generalMembership,
  useMembership,
} from "@/lib/data"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = { title: "Membership" }

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="Eligibility, categories, and fees"
        description="General Members hold the vote and may stand for the Board. Use Members enjoy the house without voting rights."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Eligibility
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted-foreground">
            To apply for General Membership, candidates must:
          </p>
          <ul className="mt-8 max-w-2xl space-y-4">
            {eligibility.map((item) => (
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

      <section className="border-y border-border bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            General Members
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Full voting rights, the right to nominate or second candidates, and
            eligibility for the Board of Directors. Ceiling: 2,318.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {generalMembership.map((item) => (
              <article
                key={item.name}
                className="rounded-3xl bg-card p-6 ring-1 ring-foreground/5 sm:p-8"
              >
                <p className="text-[11px] tracking-[0.16em] text-primary uppercase">
                  {item.quota}
                </p>
                <h3 className="font-display mt-3 text-2xl tracking-tight text-ink">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
                <p className="mt-5 text-sm text-ink">
                  {item.fee}
                  <span className="mx-2 text-border">·</span>
                  {item.subscription}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Use Members
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Full access to Club privileges and facilities, without voting rights
            or Board eligibility.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {useMembership.map((item) => (
              <article
                key={item.name}
                className="border-t border-border pt-5"
              >
                <h3 className="font-display text-xl tracking-tight text-ink">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-primary">
                  {item.fee}
                  <span className="mx-2 text-border">·</span>
                  {item.subscription}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="fees" className="scroll-mt-24 border-y border-border bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Fee schedule
          </h2>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="border-b border-border text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
                <tr>
                  <th className="py-3 pr-4 font-medium">Category</th>
                  <th className="py-3 pr-4 font-medium">Admission fee</th>
                  <th className="py-3 font-medium">Monthly / annual fee</th>
                </tr>
              </thead>
              <tbody>
                {feeSchedule.map((row) => (
                  <tr key={row.category} className="border-b border-border last:border-0">
                    <td className="py-4 pr-4 font-medium text-ink">
                      {row.category}
                    </td>
                    <td className="py-4 pr-4 text-muted-foreground">
                      {row.admission}
                    </td>
                    <td className="py-4 text-muted-foreground">
                      {row.recurring}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Application &amp; selection
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
            {applicationSteps.map((item) => (
              <div key={item.step} className="border-t border-border pt-5">
                <p className="text-[11px] tracking-[0.16em] text-gold uppercase">
                  {item.step}
                </p>
                <h3 className="font-display mt-2 text-xl tracking-tight text-ink">
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

      <section className="border-t border-border bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Member guidelines &amp; code of conduct
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            The Club upholds a Code of Conduct so that the house remains
            harmonious. Misconduct, derogatory behaviour, or financial defaults
            are overseen by the Disciplinary, Appellate, and Arbitration
            committees.
          </p>
          <ul className="mt-10 max-w-3xl space-y-4">
            {conductPoints.map((item) => (
              <li
                key={item}
                className="border-t border-border pt-4 text-[15px] leading-relaxed text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-10 rounded-sm bg-ink px-5 text-white hover:bg-ink-soft"
              )}
            >
              Enquire of the Secretariat
            </Link>
            <Link
              href="/governance"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-10 rounded-sm px-5"
              )}
            >
              Governance &amp; rules
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
