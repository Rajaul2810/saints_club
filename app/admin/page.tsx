import type { Metadata } from "next"
import Link from "next/link"
import { AdminDashboard } from "@/components/admin/dashboard"
import { Logo } from "@/components/layout/logo"

export const metadata: Metadata = { title: "Admin" }

export default function AdminPage() {
  return (
    <div className="min-h-svh bg-background">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex h-17 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Logo />
          <div className="flex items-center gap-5">
            <span className="hidden text-[13px] text-muted-foreground sm:inline">
              Demonstration · Authentication to follow
            </span>
            <Link
              href="/"
              className="text-[13px] tracking-[0.04em] text-ink hover:text-gold-deep"
            >
              View site
            </Link>
          </div>
        </div>
      </header>
      <AdminDashboard />
    </div>
  )
}
