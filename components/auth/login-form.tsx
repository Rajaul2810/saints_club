"use client"

import { useState } from "react"
import { signInWithMagicLink, signInWithPassword } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input, Label } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function LoginForm({ next = "/account" }: { next?: string }) {
  const [mode, setMode] = useState<"staff" | "member">("staff")
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-8 grid grid-cols-2 gap-1 rounded-full bg-muted p-1">
        {(["staff", "member"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setMode(id)
              setError(null)
              setMessage(null)
            }}
            className={cn(
              "rounded-full px-3 py-2 text-sm",
              mode === id ? "bg-white text-ink shadow-sm" : "text-muted-foreground"
            )}
          >
            {id === "staff" ? "Staff" : "Member"}
          </button>
        ))}
      </div>

      {mode === "staff" ? (
        <form
          className="space-y-4"
          action={async (formData) => {
            setPending(true)
            setError(null)
            const result = await signInWithPassword(formData)
            setPending(false)
            if (result?.error) setError(result.error)
          }}
        >
          <input type="hidden" name="next" value={next} />
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </div>
          <Button type="submit" className="h-10 w-full" disabled={pending}>
            Sign in
          </Button>
        </form>
      ) : (
        <form
          className="space-y-4"
          action={async (formData) => {
            setPending(true)
            setError(null)
            setMessage(null)
            const result = await signInWithMagicLink(formData)
            setPending(false)
            if (result && "error" in result && result.error) setError(result.error)
            else setMessage("Check your email for a sign-in link.")
          }}
        >
          <input type="hidden" name="next" value={next} />
          <div>
            <Label htmlFor="member-email">Email on the club roll</Label>
            <Input
              id="member-email"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            We send a one-time link. Members without an email on file should write
            to the Secretariat.
          </p>
          <Button type="submit" className="h-10 w-full" disabled={pending}>
            Send magic link
          </Button>
        </form>
      )}

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      {message && <p className="mt-4 text-sm text-muted-foreground">{message}</p>}
    </div>
  )
}
