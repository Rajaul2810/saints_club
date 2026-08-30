import type { ReactNode } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { AuthButtons } from "@/components/layout/auth-buttons"

export default function SiteLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar auth={<AuthButtons />} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
