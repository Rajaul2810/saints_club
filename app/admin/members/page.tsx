import type { Metadata } from "next"
import Link from "next/link"
import {
  listVisibleMembers,
  listInstitutes,
  listMemberTypes,
  MEMBER_PAGE_SIZE,
  parsePage,
} from "@/lib/members/queries"
import { Pager } from "@/components/shared/pager"
import { getViewer } from "@/lib/auth/session"
import { isEditorRole } from "@/lib/auth/roles"
import { buttonVariants } from "@/components/ui/button"
import { Input, Select } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export const metadata: Metadata = { title: "Members · Admin" }

export default async function AdminMembersPage({
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
  const [viewer, list, institutes, types] = await Promise.all([
    getViewer(),
    listVisibleMembers({
      query: params.q,
      institute: params.institute,
      type: params.type,
      batch: Number.isFinite(batch) ? batch : undefined,
      includeInactive: true,
      limit: MEMBER_PAGE_SIZE,
      offset: (page - 1) * MEMBER_PAGE_SIZE,
    }),
    listInstitutes(),
    listMemberTypes(),
  ])
  const canEdit = isEditorRole(viewer?.role)
  const pageCount = Math.max(1, Math.ceil(list.total / MEMBER_PAGE_SIZE))
  const filterParams = {
    q: params.q,
    institute: params.institute,
    type: params.type,
    batch: params.batch,
  }
  const exportQuery = new URLSearchParams()
  for (const [key, value] of Object.entries(filterParams)) {
    if (value) exportQuery.set(key, value)
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl tracking-tight text-ink">Members</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {list.total} records visible for your role.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/admin/members/export?${exportQuery.toString()}`}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Export CSV
          </Link>
          {canEdit && (
            <Link href="/admin/members/new" className={cn(buttonVariants())}>
              Add member
            </Link>
          )}
        </div>
      </div>

      <form className="mb-6 grid gap-3 sm:grid-cols-4" action="/admin/members">
        <Input name="q" placeholder="Search" defaultValue={params.q} />
        <Select name="institute" defaultValue={params.institute ?? ""}>
          <option value="">All institutes</option>
          {institutes.map((i) => (
            <option key={i.id} value={i.code}>
              {i.name}
            </option>
          ))}
        </Select>
        <Select name="type" defaultValue={params.type ?? ""}>
          <option value="">All types</option>
          {types.map((t) => (
            <option key={t.id} value={t.code}>
              {t.name}
            </option>
          ))}
        </Select>
        <div className="flex gap-2">
          <Input name="batch" placeholder="Batch" defaultValue={params.batch} />
          <button type="submit" className={cn(buttonVariants(), "h-auto")}>
            Filter
          </button>
        </div>
      </form>

      <div className="overflow-x-auto border border-border bg-white">
        <table className="w-full min-w-64 text-left text-sm">
          <thead className="border-b border-border text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Member</th>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Institute</th>
              <th className="px-4 py-3 font-medium">Batch</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {list.members.map((m) => (
              <tr key={m.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <Link href={`/admin/members/${m.id}`} className="hover:text-primary">
                    {m.name || "—"}
                    {m.needs_review && (
                      <span className="ml-2 text-[11px] tracking-wide text-destructive uppercase">
                        Review
                      </span>
                    )}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{m.member_code ?? "—"}</td>
                <td className="px-4 py-3">{m.member_type_name ?? m.member_type ?? "—"}</td>
                <td className="px-4 py-3">{m.institute_name ?? "—"}</td>
                <td className="px-4 py-3">{m.batch_year ?? "—"}</td>
                <td className="px-4 py-3">{m.status ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pager
        basePath="/admin/members"
        params={filterParams}
        page={Math.min(page, pageCount)}
        pageCount={pageCount}
        total={list.total}
        noun="records"
      />
    </div>
  )
}
