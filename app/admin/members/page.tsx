import type { Metadata } from "next"
import Link from "next/link"
import {
  listVisibleMembers,
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
  const [viewer, list, types] = await Promise.all([
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
    <div className="min-w-0">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
            Members
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {list.total} records visible for your role.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex">
          <Link
            href={`/admin/members/export?${exportQuery.toString()}`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full justify-center sm:w-auto"
            )}
          >
            Export CSV
          </Link>
          {canEdit && (
            <Link
              href="/admin/members/new"
              className={cn(buttonVariants(), "w-full justify-center sm:w-auto")}
            >
              Add member
            </Link>
          )}
        </div>
      </div>

      <form
        className="mb-5 grid max-w-full gap-3 rounded-2xl border border-border/80 bg-white p-3 sm:mb-6 sm:grid-cols-2 sm:p-4 lg:grid-cols-4"
        action="/admin/members"
      >
        <Input name="q" placeholder="Search name" defaultValue={params.q} className="min-w-0" />
        <Input
          name="institute"
          placeholder="Institute"
          defaultValue={params.institute}
          className="min-w-0"
        />
        <Select name="type" defaultValue={params.type ?? ""} className="min-w-0">
          <option value="">All membership types</option>
          {types.map((t) => (
            <option key={t.id} value={t.code}>
              {t.name}
            </option>
          ))}
        </Select>
        <div className="flex min-w-0 gap-2">
          <Input
            name="batch"
            placeholder="Batch"
            defaultValue={params.batch}
            className="min-w-0"
          />
          <button
            type="submit"
            className={cn(buttonVariants(), "h-auto shrink-0")}
          >
            Filter
          </button>
        </div>
      </form>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {list.members.map((m) => (
          <Link
            key={m.id}
            href={`/admin/members/${m.id}`}
            className="block rounded-2xl border border-border/80 bg-white p-4 shadow-sm shadow-ink/4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-ink">
                  {m.name || "—"}
                  {m.needs_review && (
                    <span className="ml-2 text-[11px] tracking-wide text-destructive uppercase">
                      Review
                    </span>
                  )}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {m.member_code ?? "No ID"} · {m.status ?? "—"}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                {m.member_type_name ?? m.member_type ?? "—"}
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {m.institute_name ?? "—"}
              {m.batch_year ? ` · Batch ${m.batch_year}` : ""}
            </p>
          </Link>
        ))}
        {list.members.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border bg-white px-4 py-10 text-center text-sm text-muted-foreground">
            No members match this search.
          </p>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-border/80 bg-white md:block">
        <table className="w-full min-w-160 text-left text-sm">
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
                  <Link
                    href={`/admin/members/${m.id}`}
                    className="hover:text-primary"
                  >
                    {m.name || "—"}
                    {m.needs_review && (
                      <span className="ml-2 text-[11px] tracking-wide text-destructive uppercase">
                        Review
                      </span>
                    )}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {m.member_code ?? "—"}
                </td>
                <td className="px-4 py-3">
                  {m.member_type_name ?? m.member_type ?? "—"}
                </td>
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
