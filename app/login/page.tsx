import type { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"
import { Logo } from "@/components/layout/logo"

export const metadata: Metadata = { title: "Sign in" }

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>
}) {
  const params = await searchParams
  const next = params.next && params.next.startsWith("/") ? params.next : "/account"

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Logo />
          <Link href="/" className="text-[13px] text-ink hover:text-gold-deep">
            View site
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-start justify-center px-5 py-16 sm:px-8">
        <div className="w-full max-w-md">
          <h1 className="font-display text-3xl tracking-tight text-ink">Sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Staff use a password. Members receive a magic link at the email on
            the roll.
          </p>
          {params.error && (
            <p className="mt-4 text-sm text-destructive">
              Sign-in could not be completed. Please try again.
            </p>
          )}
          <div className="mt-8">
            <LoginForm next={next} />
          </div>
        </div>
      </main>
    </div>
  )
}
