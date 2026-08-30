import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { ConsentForm } from "@/components/account/consent-form"
import { PageHero } from "@/components/shared/section-heading"
import { signOut } from "@/app/actions/auth"
import { getViewer } from "@/lib/auth/session"
import { roleLabel } from "@/lib/auth/roles"
import { createClient } from "@/lib/supabase/server"
import { CONSENT_FIELDS } from "@/lib/members/fields"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = { title: "My Profile" }

export default async function AccountPage() {
  const viewer = await getViewer()
  if (!viewer) redirect("/login?next=/account")

  const supabase = await createClient()
  let member: {
    first_name: string | null
    last_name: string | null
    member_code: string
    job_title: string | null
    organisation: string | null
  } | null = null

  if (viewer.memberId) {
    const { data } = await supabase
      .from("members")
      .select("first_name, last_name, member_code, job_title, organisation")
      .eq("id", viewer.memberId)
      .maybeSingle()
    member = data
  }

  const consent: Record<string, boolean> = {}
  if (viewer.memberId) {
    const { data } = await supabase
      .from("member_field_consent")
      .select("field_key, is_visible")
      .eq("member_id", viewer.memberId)
      .eq("audience", "members")
    for (const row of data ?? []) {
      consent[row.field_key] = row.is_visible
    }
  }
  for (const field of CONSENT_FIELDS) {
    if (consent[field] === undefined) consent[field] = true
  }

  const name = member
    ? [member.first_name, member.last_name].filter(Boolean).join(" ")
    : viewer.email

  return (
    <>
      <PageHero
        eyebrow="Member portal"
        title={name || "My Profile"}
        description={`${roleLabel(viewer.role)}${member?.member_code ? ` · ${member.member_code}` : ""}`}
      />
      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl tracking-tight text-ink">
              Your record
            </h2>
            <dl className="mt-6 space-y-4 text-sm">
              <Row label="Email" value={viewer.email} />
              <Row label="Job title" value={member?.job_title} />
              <Row label="Organisation" value={member?.organisation} />
              {!viewer.memberId && (
                <p className="text-muted-foreground">
                  This login is not yet linked to a member on the roll. Ask the
                  Secretariat to add your email to your record.
                </p>
              )}
            </dl>
            <form action={signOut} className="mt-8">
              <Button type="submit" variant="outline">
                Sign out
              </Button>
            </form>
          </div>
          <div>
            <h2 className="font-display text-2xl tracking-tight text-ink">
              Directory consent
            </h2>
            {viewer.memberId ? (
              <div className="mt-6">
                <ConsentForm values={consent} />
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                Consent toggles appear once your account is linked to a member
                record.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="border-t border-border pt-3">
      <dt className="text-[11px] tracking-[0.16em] text-primary uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-ink">{value || "—"}</dd>
    </div>
  )
}
