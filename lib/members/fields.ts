export const AUDIENCES = ["public", "members", "committee", "admin"] as const
export type Audience = (typeof AUDIENCES)[number]

export const FIELD_KEYS = [
  "first_name",
  "last_name",
  "member_code",
  "member_type",
  "status",
  "batch_year",
  "institute",
  "job_title",
  "organisation",
  "job_location",
  "mobile",
  "email",
  "marital_status",
  "anniversary",
  "dob",
  "blood_group",
  "gender",
  "address",
  "nationality",
] as const

export type FieldKey = (typeof FIELD_KEYS)[number]

export const FIELD_LABELS: Record<FieldKey, string> = {
  first_name: "First name",
  last_name: "Last name",
  member_code: "Member ID",
  member_type: "Membership type",
  status: "Membership status",
  batch_year: "Batch",
  institute: "Institute",
  job_title: "Job title",
  organisation: "Organisation",
  job_location: "Job location",
  mobile: "Mobile",
  email: "Email",
  marital_status: "Marital status",
  anniversary: "Marriage anniversary",
  dob: "Date of birth",
  blood_group: "Blood group",
  gender: "Gender",
  address: "Home address",
  nationality: "Nationality",
}

export const CONSENT_FIELDS = [
  "mobile",
  "email",
  "organisation",
  "blood_group",
] as const satisfies readonly FieldKey[]

export const NEVER_PUBLIC_FIELDS = ["nid"] as const

export type VisibleMember = {
  id: string
  name?: string
  first_name?: string | null
  last_name?: string | null
  member_code?: string
  member_type?: string
  member_type_name?: string
  status?: string
  batch_year?: number | null
  institute?: string
  institute_name?: string
  job_title?: string | null
  organisation?: string | null
  job_location?: string | null
  mobile?: string | null
  email?: string | null
  marital_status?: string | null
  anniversary?: string | null
  dob?: string | null
  blood_group?: string | null
  gender?: string | null
  address?: string | null
  nationality?: string | null
  is_organisation?: boolean
  needs_review?: boolean
  review_notes?: string | null
}
