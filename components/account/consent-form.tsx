"use client"

import { useState } from "react"
import { saveConsent } from "@/app/actions/members"
import { Button } from "@/components/ui/button"
import { CONSENT_FIELDS, FIELD_LABELS } from "@/lib/members/fields"

export function ConsentForm({
  values,
}: {
  values: Record<string, boolean>
}) {
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  return (
    <form
      className="space-y-4"
      action={async (formData) => {
        setError(null)
        setSaved(false)
        const result = await saveConsent(formData)
        if (result && "error" in result && result.error) setError(result.error)
        else setSaved(true)
      }}
    >
      <p className="text-sm text-muted-foreground">
        These toggles apply to other members. Committee and the Secretariat still
        see club records. Hidden fields cannot be searched.
      </p>
      {CONSENT_FIELDS.map((field) => (
        <label
          key={field}
          className="flex items-center justify-between gap-4 border-b border-border py-3"
        >
          <span className="text-sm text-ink">
            Show my {FIELD_LABELS[field].toLowerCase()} to other members
          </span>
          <input
            type="checkbox"
            name={field}
            defaultChecked={values[field] !== false}
            className="size-4 accent-primary"
          />
        </label>
      ))}
      <Button type="submit">Save preferences</Button>
      {saved && (
        <p className="text-sm text-muted-foreground">Preferences saved.</p>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </form>
  )
}
