import type { ReactNode } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { AuthButtons } from "@/components/layout/auth-buttons"
import { getPublishedNotices } from "@/lib/content/queries"

export default async function SiteLayout({
  children,
}: {
  children: ReactNode
}) {
  const notices = await getPublishedNotices()

  return (
    <div className="flex min-h-svh flex-col">
      <Navbar auth={<AuthButtons />} noticeCount={notices.length} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
