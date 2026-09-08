import Link from "next/link"
import { PageHero } from "@/components/shared/section-heading"
import { governanceRules, type GovernanceRule } from "@/lib/data"
import { cn } from "@/lib/utils"

export function GovernanceRulePage({ rule }: { rule: GovernanceRule }) {
  return (
    <>
      <PageHero
        eyebrow="Governance"
        title={rule.title}
        description={rule.intro}
      />

      <section className="bg-[linear-gradient(180deg,var(--mist)_0%,transparent_20%)] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ol className="mx-auto max-w-3xl space-y-3">
            {rule.points.map((point, index) => (
              <li
                key={point}
                className="flex gap-4 rounded-2xl border border-border/80 bg-white px-4 py-4 shadow-sm shadow-ink/4 sm:gap-5 sm:px-5 sm:py-5"
              >
                <span className="font-display mt-0.5 text-lg text-primary tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-[15px] leading-relaxed text-ink/80">{point}</p>
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-12 max-w-3xl">
            <p className="mb-4 text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Related
            </p>
            <div className="flex flex-wrap gap-2">
              {governanceRules.map((item) => (
                <Link
                  key={item.slug}
                  href={`/governance/${item.slug}`}
                  className={cn(
                    "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                    item.slug === rule.slug
                      ? "bg-primary text-white"
                      : "bg-white text-ink/70 ring-1 ring-border hover:bg-mist hover:text-ink"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
