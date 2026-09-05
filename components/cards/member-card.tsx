import { Briefcase, GraduationCap, MapPin, UserRound } from "lucide-react"
import type { VisibleMember } from "@/lib/members/fields"
import { cn } from "@/lib/utils"

function initials(name?: string) {
  if (!name?.trim()) return "?"
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase()
}

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Briefcase
  label: string
  value?: string | null
}) {
  const text = value?.trim() || "—"
  return (
    <div className="flex gap-2.5">
      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md bg-primary/8 text-primary">
        <Icon className="size-3.5" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium tracking-[0.08em] text-muted-foreground uppercase">
          {label}
        </p>
        <p
          className={cn(
            "mt-0.5 text-sm leading-snug text-ink",
            text === "—" && "text-muted-foreground"
          )}
        >
          {text}
        </p>
      </div>
    </div>
  )
}

export function MemberCard({ member }: { member: VisibleMember }) {
  const name = member.name?.trim() || "Member"
  const hasName = Boolean(member.name?.trim())

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border/80 bg-white p-5 shadow-sm shadow-ink/4 transition duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md hover:shadow-primary/8 sm:p-6">
      <div className="flex items-start gap-3.5">
        <span
          className="grid size-12 shrink-0 place-items-center rounded-full bg-linear-to-br from-primary to-gold-deep text-sm font-semibold tracking-wide text-white shadow-sm shadow-primary/25"
          aria-hidden
        >
          {hasName ? (
            initials(name)
          ) : (
            <UserRound className="size-5" strokeWidth={1.75} />
          )}
        </span>
        <div className="min-w-0 pt-0.5">
          <h2 className="font-display text-lg leading-snug tracking-tight text-ink sm:text-xl">
            {name}
          </h2>
          {(member.member_type_name || member.batch_year) && (
            <p className="mt-1 text-xs text-muted-foreground">
              {[member.member_type_name, member.batch_year ? `Batch ${member.batch_year}` : null]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 space-y-3.5 border-t border-border/70 pt-4">
        <Field
          icon={GraduationCap}
          label="Institute"
          value={member.institute_name ?? member.institute}
        />
        <Field icon={Briefcase} label="Job title" value={member.job_title} />
        <Field icon={MapPin} label="Address" value={member.address} />
      </div>
    </article>
  )
}
