"use client"

import { useState } from "react"
import { bookableSpaces } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const fieldClass = cn(
  "mt-1.5 w-full border border-border bg-white px-3 py-2.5 text-sm outline-none transition",
  "focus:border-ink focus:ring-1 focus:ring-ink/15"
)

export function BookingForm() {
  const [sent, setSent] = useState(false)

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
          </div>
          <Field label="Membership number (if any)" name="membership" />
          <div>
            <label htmlFor="space" className="text-[13px] text-ink">
              Space
            </label>
            <select id="space" name="space" required className={fieldClass}>
              <option value="">Select a space</option>
              {bookableSpaces.map((space) => (
                <option key={space} value={space}>
                  {space}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Date" name="date" type="date" required />
            <Field
              label="Estimated guests"
              name="guests"
              type="number"
              required
            />
          </div>
          <div>
            <label htmlFor="notes" className="text-[13px] text-ink">
              Occasion and notes
            </label>
            <textarea id="notes" name="notes" rows={5} className={fieldClass} />
          </div>
          <Button
            type="submit"
            size="lg"
            className="h-10 rounded-sm bg-ink px-5 text-white hover:bg-ink-soft"
          >
            Request booking
          </Button>
          {sent && (
            <p className="text-sm text-muted-foreground">
              Thank you. This is a demonstration form. Requests will be stored
              when the database is connected. Please also write to the
              Secretariat if your date is urgent.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="text-[13px] text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className={fieldClass}
      />
    </div>
  )
}
