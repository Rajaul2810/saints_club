import type { Metadata } from "next"
import Image from "next/image"
import { PageHero } from "@/components/shared/section-heading"
import { members } from "@/lib/data"

export const metadata: Metadata = { title: "Members" }

export default function MembersPage() {
  return (
    <>
      <PageHero
        eyebrow="Directory"
        title="The membership"
        description="A selection of fellows and members. The full roll will be managed from the database once connected."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((member) => (
              <article key={member.id}>
                <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 50vw, 25vw"
                  />
                </div>
                <p className="mt-4 text-[11px] tracking-[0.16em] text-gold uppercase">
                  {member.role}
                </p>
                <h2 className="font-display mt-1 text-xl tracking-tight text-ink">
                  {member.name}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {member.profession} · Since {member.joined}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
