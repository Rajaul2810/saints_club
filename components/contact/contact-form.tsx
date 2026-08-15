"use client"

import { useState } from "react"
import { PageHero } from "@/components/shared/section-heading"
import { clubInfo } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ContactForm() {
  const [sent, setSent] = useState(false)

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Registered Secretariat"
        description="Enquiries on membership, the calendar, or the rooms. Write to the Secretariat in Dhaka."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-16 px-5 sm:px-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-4">
            {[
              { label: "Club", value: clubInfo.name },
              { label: "Registered office", value: clubInfo.address },
              {
                label: "Email",
                value: clubInfo.email,
                href: `mailto:${clubInfo.email}`,
              },
              {
                label: "Telephone",
                value: clubInfo.phone,
                href: `tel:${clubInfo.phone.replace(/\s/g, "")}`,
              },
            ].map(({ label, value, href }) => (
              <div key={label} className="border-t border-border pt-4">
                <p className="text-[11px] tracking-[0.16em] text-gold uppercase">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    className="mt-2 block text-[15px] text-ink hover:text-gold-deep"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="mt-2 text-[15px] text-ink">{value}</p>
                )}
              </div>
            ))}
          </div>

          <div className="lg:col-span-8">
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
              <Field label="Subject" name="subject" required />
              <div>
                <label htmlFor="message" className="text-[13px] text-ink">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className={fieldClass}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-10 rounded-sm bg-ink px-5 text-white hover:bg-ink-soft"
              >
                Send enquiry
              </Button>
              {sent && (
                <p className="text-sm text-muted-foreground">
                  Thank you. This is a demonstration form. Messages will be
                  stored when the database is connected.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-display text-3xl tracking-tight text-ink">
            Location
          </h2>
          <p className="mt-3 max-w-xl text-[15px] text-muted-foreground">
            Registered office, Dhaka, Bangladesh. A precise map will be published
            when the house address is confirmed.
          </p>
          <div className="mt-8 overflow-hidden rounded-3xl ring-1 ring-foreground/5">
            <iframe
              title="Saints Club Limited, Dhaka"
              src="https://maps.google.com/maps?q=Dhaka%2C%20Bangladesh&z=12&output=embed"
              className="h-[22rem] w-full border-0 grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  )
}

const fieldClass = cn(
  "mt-1.5 w-full border border-border bg-white px-3 py-2.5 text-sm outline-none transition",
  "focus:border-ink focus:ring-1 focus:ring-ink/15"
)

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
