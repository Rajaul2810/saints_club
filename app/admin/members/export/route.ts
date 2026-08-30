import { NextResponse } from "next/server"
import { listVisibleMembers, MEMBER_EXPORT_LIMIT } from "@/lib/members/queries"
import { requireStaff } from "@/lib/auth/session"
import { FIELD_KEYS, FIELD_LABELS } from "@/lib/members/fields"

export async function GET(request: Request) {
  await requireStaff()
  const { searchParams } = new URL(request.url)
  const batch = searchParams.get("batch")
  const { members } = await listVisibleMembers({
    query: searchParams.get("q") ?? undefined,
    institute: searchParams.get("institute") ?? undefined,
    type: searchParams.get("type") ?? undefined,
    batch: batch ? Number.parseInt(batch, 10) : undefined,
    includeInactive: true,
    limit: MEMBER_EXPORT_LIMIT,
    offset: 0,
  })

  const present = new Set<string>()
  for (const m of members) {
    for (const key of FIELD_KEYS) {
      if (key in m) present.add(key)
    }
  }
  const columns = FIELD_KEYS.filter((k) => present.has(k) || k === "first_name" || k === "last_name")
  const header = columns.map((c) => FIELD_LABELS[c])
  const lines = [
    header.join(","),
    ...members.map((m) =>
      columns
        .map((c) => {
          const record = m as unknown as Record<string, unknown>
          const value = record[c] ?? (c === "first_name" ? m.name : "")
          return csvCell(String(value ?? ""))
        })
        .join(",")
    ),
  ]

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=saints-club-members.csv",
    },
  })
}

function csvCell(value: string) {
  if (/[",\n]/.test(value)) return `"${value.replaceAll('"', '""')}"`
  return value
}
