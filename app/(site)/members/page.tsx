import type { Metadata } from "next"
import Link from "next/link"
import { PageHero } from "@/components/shared/section-heading"
import { Pager } from "@/components/shared/pager"
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
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <form className="mb-10 grid gap-3 sm:grid-cols-4" action="/members">
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
            <div className="flex gap-2">
              <Input name="batch" placeholder="Batch" defaultValue={params.batch} />
              <button type="submit" className={cn(buttonVariants(), "h-auto")}>
                Search
              </button>
            </div>
          </form>

          <div className="overflow-x-auto border border-border bg-white">
            <table className="w-full min-w-64 text-left text-sm">
              <thead className="border-b border-border text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Institute</th>
                  <th className="px-4 py-3 font-medium">Job title</th>
                  <th className="px-4 py-3 font-medium">Address</th>
                </tr>
              </thead>
              <tbody>
                {list.members.map((m) => (
                  <tr key={m.id} className="border-b border-border last:border-0 align-top">
                    <td className="px-4 py-3">{m.name || "—"}</td>
                    <td className="px-4 py-3">{m.institute_name ?? "—"}</td>
                    <td className="px-4 py-3">{m.job_title ?? "—"}</td>
                    <td className="max-w-sm px-4 py-3 whitespace-normal">{m.address ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {list.members.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">
              No members match this search.
              {!viewer && (
                <>
                  {" "}
                  <Link href="/login" className="text-primary">
                    Sign in
                  </Link>{" "}
                  if you are a member.
                </>
              )}
            </p>
          ) : (
            <Pager
              basePath="/members"
              params={filterParams}
              page={Math.min(page, pageCount)}
              pageCount={pageCount}
              total={list.total}
            />
          )}
        </div>
      </section>
    </>
  )
}
