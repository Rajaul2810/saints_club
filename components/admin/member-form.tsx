"use client"

import { deleteMember, saveMember } from "@/app/actions/members"
import { Button } from "@/components/ui/button"
import { Input, Label, Select, Textarea } from "@/components/ui/input"
import type { VisibleMember } from "@/lib/members/fields"

type Lookup = { id: string; code: string; name: string }

export function MemberForm({
  member,
  types,
  institutes,
  canEdit,
  canDelete,
}: {
  member?: VisibleMember & { email?: string | null; mobile?: string | null }
  types: Lookup[]
  institutes: Lookup[]
  canEdit: boolean
  canDelete: boolean
}) {
  const readOnly = !canEdit

  return (
    <div>
      <h1 className="font-display text-3xl tracking-tight text-ink">
        {member ? member.name || member.member_code : "Add member"}
      </h1>
      <form action={saveMember} className="mt-8 grid gap-5 sm:grid-cols-2">
        {member?.id && <input type="hidden" name="id" value={member.id} />}
        <Field label="First name" name="first_name" defaultValue={member?.first_name} readOnly={readOnly} />
        <Field label="Last name" name="last_name" defaultValue={member?.last_name} readOnly={readOnly} />
        <Field label="Member ID" name="member_code" defaultValue={member?.member_code} required readOnly={readOnly} />
        <div>
          <Label htmlFor="member_type_id">Membership type</Label>
          <Select
            id="member_type_id"
            name="member_type_id"
            defaultValue={types.find((t) => t.code === member?.member_type)?.id ?? ""}
            disabled={readOnly}
          >
            <option value="">Select</option>
            {types.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="institute_id">Institute</Label>
          <Select
            id="institute_id"
            name="institute_id"
            defaultValue={institutes.find((i) => i.code === member?.institute)?.id ?? ""}
            disabled={readOnly}
          >
            <option value="">Select</option>
            {institutes.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </Select>
        </div>
        <Field label="Batch" name="batch_year" defaultValue={member?.batch_year} readOnly={readOnly} />
        <div>
          <Label htmlFor="status">Status</Label>
          <Select id="status" name="status" defaultValue={member?.status ?? "active"} disabled={readOnly}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="needs_review">Needs review</option>
          </Select>
        </div>
        <Field label="Gender" name="gender" defaultValue={member?.gender} readOnly={readOnly} />
        <Field label="Date of birth" name="dob" type="date" defaultValue={member?.dob?.slice(0, 10)} readOnly={readOnly} />
        <Field label="Marital status" name="marital_status" defaultValue={member?.marital_status} readOnly={readOnly} />
        <Field label="Anniversary" name="anniversary" type="date" defaultValue={member?.anniversary?.slice(0, 10)} readOnly={readOnly} />
        <Field label="Blood group" name="blood_group" defaultValue={member?.blood_group} readOnly={readOnly} />
        <Field label="Nationality" name="nationality" defaultValue={member?.nationality} readOnly={readOnly} />
        <Field label="Job title" name="job_title" defaultValue={member?.job_title} readOnly={readOnly} />
        <Field label="Organisation" name="organisation" defaultValue={member?.organisation} readOnly={readOnly} />
        <Field label="Job location" name="job_location" defaultValue={member?.job_location} readOnly={readOnly} />
        <Field label="Mobile" name="mobile" defaultValue={member?.mobile} readOnly={readOnly} />
        <Field label="Email" name="email" type="email" defaultValue={member?.email} readOnly={readOnly} />
        <div className="sm:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" name="address" rows={3} defaultValue={member?.address ?? ""} readOnly={readOnly} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="review_notes">Review notes</Label>
          <Textarea id="review_notes" name="review_notes" rows={2} defaultValue={member?.review_notes ?? ""} readOnly={readOnly} />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="is_organisation" defaultChecked={member?.is_organisation} disabled={readOnly} />
          Organisation member
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="needs_review" defaultChecked={member?.needs_review} disabled={readOnly} />
          Needs review
        </label>
        {canEdit && (
          <div className="sm:col-span-2">
            <Button type="submit">Save</Button>
          </div>
        )}
      </form>
      {canDelete && member?.id && (
        <form action={deleteMember} className="mt-8">
          <input type="hidden" name="id" value={member.id} />
          <Button type="submit" variant="destructive">
            Delete member
          </Button>
        </form>
      )}
    </div>
  )
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  readOnly,
}: {
  label: string
  name: string
  defaultValue?: string | number | null
  type?: string
  required?: boolean
  readOnly?: boolean
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        readOnly={readOnly}
        defaultValue={defaultValue ?? ""}
      />
    </div>
  )
}
