"use client"

import { useState } from "react"
import { saveVisibilityPolicy } from "@/app/actions/members"
import { Button } from "@/components/ui/button"
import { AUDIENCES, FIELD_KEYS, FIELD_LABELS, type Audience, type FieldKey } from "@/lib/members/fields"

export function VisibilityGrid({
  policy,
}: {
  policy: { field_key: FieldKey; audience: Audience; is_visible: boolean }[]
}) {
  const map = new Map<string, boolean>()
  for (const row of policy) {
    map.set(`${row.field_key}:${row.audience}`, row.is_visible)
  }
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  return (
    <form
      action={async (formData) => {
        setError(null)
        setSaved(false)
        const result = await saveVisibilityPolicy(formData)
        if (result && "error" in result && result.error) setError(result.error)
        else setSaved(true)
      }}
    >
      <div className="overflow-x-auto border border-border bg-white">
        <table className="w-full min-w-64 text-left text-sm">
          <thead className="border-b border-border text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Field</th>
              {AUDIENCES.map((a) => (
                <th key={a} className="px-4 py-3 font-medium">
                  {a}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FIELD_KEYS.map((field) => (
              <tr key={field} className="border-b border-border last:border-0">
                <td className="px-4 py-3">{FIELD_LABELS[field]}</td>
                {AUDIENCES.map((audience) => (
                  <td key={audience} className="px-4 py-3">
                    <input
                      type="checkbox"
                      name={`${field}:${audience}`}
                      defaultChecked={map.get(`${field}:${audience}`) === true}
                      disabled={audience === "admin"}
                      className="size-4 accent-primary"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Admin always sees the club record. NID is never returned. Member consent
        can hide a field even when a box is ticked.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Button type="submit">Save policy</Button>
        {saved && <span className="text-sm text-muted-foreground">Saved.</span>}
        {error && <span className="text-sm text-destructive">{error}</span>}
      </div>
    </form>
  )
}
