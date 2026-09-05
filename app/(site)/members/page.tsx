import type { Metadata } from "next"
import Link from "next/link"
import { Search } from "lucide-react"
import { PageHero } from "@/components/shared/section-heading"
import { Pager } from "@/components/shared/pager"
import { MemberCard } from "@/components/cards/member-card"
import {
  listVisibleMembers,
  listMemberTypes,
  MEMBER_PAGE_SIZE,
  parsePage,
} from "@/lib/members/queries"
import { getViewer } from "@/lib/auth/session"
import { Input, Select } from "@/components/ui/input"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = { title: "Member directory" }

export default async function MembersDirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string
    institute?: string
    type?: string
    batch?: string
    page?: string
  }>
}) {
  const params = await searchParams
  const page = parsePage(params.page)
  const batch = params.batch ? Number.parseInt(params.batch, 10) : undefined
  const [viewer, list, types] = await Promise.all([
    getViewer(),
    listVisibleMembers({
      query: params.q,
      institute: params.institute,
      type: params.type,
      batch: Number.isFinite(batch) ? batch : undefined,
      limit: MEMBER_PAGE_SIZE,
      offset: (page - 1) * MEMBER_PAGE_SIZE,
    }),
    listMemberTypes(),
  ])
  const pageCount = Math.max(1, Math.ceil(list.total / MEMBER_PAGE_SIZE))
  const filterParams = {
    q: params.q,
    institute: params.institute,
    type: params.type,
    batch: params.batch,
  }

  return (
    <>
      <PageHero
        eyebrow="Directory"
        title="Members of the Club"
        description={
          viewer
            ? "Fields shown follow club policy and each member’s consent."
            : "Name, address, job title, and institute. Sign in to see the fields the Board has allowed for members."
        }
      />
      <section className="bg-[linear-gradient(180deg,var(--mist)_0%,transparent_28%)] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <form
            action="/members"
            className="mb-10 rounded-2xl border border-border/80 bg-white/90 p-4 shadow-sm shadow-ink/4 backdrop-blur-sm sm:p-5"
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_0.7fr_auto]">
              <Input name="q" placeholder="Search name" defaultValue={params.q} />
              <Input
                name="institute"
                placeholder="Institute"
                defaultValue={params.institute}
              />
              <Select name="type" defaultValue={params.type ?? ""}>
                <option value="">All membership types</option>
                {types.map((t) => (
                  <option key={t.id} value={t.code}>
                    {t.name}
                  </option>
                ))}
              </Select>
              <Input name="batch" placeholder="Batch" defaultValue={params.batch} />
              <button
                type="submit"
                className={cn(buttonVariants(), "inline-flex w-full gap-2 lg:w-auto")}
              >
                <Search className="size-4" aria-hidden />
                Search
              </button>
            </div>
          </form>

          {list.members.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-white/70 px-6 py-16 text-center">
              <p className="text-sm text-muted-foreground">
                No members match this search.
                {!viewer && (
                  <>
                    {" "}
                    <Link href="/login" className="font-medium text-primary hover:underline">
                      Sign in
                    </Link>{" "}
                    if you are a member.
                  </>
                )}
              </p>
            </div>
          ) : (
            <>
              <p className="mb-5 text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-ink">{list.members.length}</span> of{" "}
                <span className="font-medium text-ink">{list.total}</span> members
              </p>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
                {list.members.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
              <Pager
                basePath="/members"
                params={filterParams}
                page={Math.min(page, pageCount)}
                pageCount={pageCount}
                total={list.total}
              />
            </>
          )}
        </div>
      </section>
    </>
  )
}
