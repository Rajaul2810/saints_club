import { CONSENT_FIELDS, type Audience, type FieldKey } from "@/lib/members/fields"
import { type AppRole } from "@/lib/auth/roles"

export function audienceForRole(role: AppRole | null | undefined): Audience {
  switch (role) {
    case "super_admin":
    case "secretariat":
      return "admin"
    case "committee_viewer":
      return "committee"
    case "member":
      return "members"
    default:
      return "public"
  }
}

export function fieldIsVisible(opts: {
  field: FieldKey
  audience: Audience
  policy: Record<string, Record<Audience, boolean>>
  consent?: Record<string, boolean>
}): boolean {
  if (opts.audience === "admin") return true
  const policyOk = opts.policy[opts.field]?.[opts.audience] ?? false
  if (!policyOk) return false
  if (!(CONSENT_FIELDS as readonly string[]).includes(opts.field)) return true
  return opts.consent?.[opts.field] ?? true
}
