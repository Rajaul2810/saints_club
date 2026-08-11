"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { PageHero } from "@/components/shared/section-heading"
import { committees } from "@/lib/data"
import { cn } from "@/lib/utils"

export function CommitteeView() {
  const years = useMemo(
    () => [...new Set(committees.map((c) => c.year))].sort((a, b) => b - a),
    []
  )
  const [year, setYear] = useState(years[0])
  const current = committees.find((c) => c.year === year) ?? committees[0]

  return (
    <>
      <PageHero
        eyebrow="Governance"
        title="The Executive Committee"
        description="Elected each year by the membership to steward the house, the programme, and the foundation."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] tracking-[0.16em] text-gold uppercase">
                {current.theme}
              </p>
              <h2 className="font-display mt-2 text-3xl tracking-tight text-ink">
                Committee {current.year}
              </h2>
            </div>
            <div className="flex gap-1">
              {years.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setYear(y)}
                  className={cn(
                    "px-4 py-2 text-[13px] tracking-[0.04em] transition",
                    y === year
                      ? "bg-ink text-white"
                      : "bg-transparent text-muted-foreground hover:text-ink"
                  )}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {current.members.map((member) => (
              <article key={member.id}>
                <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 50vw, 33vw"
                  />
                </div>
                <p className="mt-4 text-[11px] tracking-[0.16em] text-gold uppercase">
                  {member.position}
                </p>
                <h3 className="font-display mt-1 text-xl tracking-tight text-ink">
                  {member.name}
                </h3>
                <a
                  href={`mailto:${member.email}`}
                  className="mt-1 block text-sm text-muted-foreground hover:text-ink"
                >
                  {member.email}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
