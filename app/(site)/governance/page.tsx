import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageHero } from "@/components/shared/section-heading"
import { conductPoints, governanceRules, standingCommittees } from "@/lib/data"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = { title: "Governance & Legal" }

export default function GovernancePage() {
  return (
    <>
      <PageHero
        eyebrow="Governance"
        title="Rules, discipline, and the committees"
        description="House rules, guest policy, and related Club guidance — plus the Articles and standing committees."
      />

      <section className="bg-[linear-gradient(180deg,var(--mist)_0%,transparent_22%)] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Rules &amp; policy
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Demo rule sets for members and guests. Confirm final wording with the
            Secretariat.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {governanceRules.map((rule, index) => (
              <Link
                key={rule.slug}
                href={`/governance/${rule.slug}`}
                className="group flex flex-col rounded-2xl border border-border/80 bg-white p-6 shadow-sm shadow-ink/4 transition duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md hover:shadow-primary/10 sm:p-7"
              >
                <span className="text-[11px] font-medium tracking-[0.16em] text-primary/70 uppercase">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-3 text-2xl tracking-tight text-ink">
                  {rule.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {rule.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-primary">
                  Read rules
                  <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Articles of Association
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              The Club is a company limited by guarantee under the Companies Act,
              1994, originally registered as Gregorian Alumni Club Limited. The
              Articles provide for a ceiling of 2,318 General Members, an elected
              Board of Directors, and the classes of General and Use membership
              set out on this site.
            </p>
            <p>
              Members may inspect the Articles at the Secretariat. Amendments
              follow the procedure in the Articles and applicable company law.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Disciplinary &amp; arbitration
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Harmony of the house is a condition of membership.
          </p>
          <ul className="mt-10 max-w-3xl space-y-3">
            {conductPoints.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-border/80 bg-white px-5 py-4 text-[15px] leading-relaxed text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Standing committees
          </h2>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {standingCommittees.map((name) => (
              <li key={name} className="bg-white px-5 py-4 text-[15px] text-ink">
                {name}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/committee" className={cn(buttonVariants({ size: "lg" }))}>
              Board of Directors
            </Link>
            <Link
              href="/notices"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
            >
              Notice board
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
