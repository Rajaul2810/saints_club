import { writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import xlsx from "xlsx"
import { createClient } from "@supabase/supabase-js"

const { readFile, utils } = xlsx
const root = dirname(fileURLToPath(import.meta.url))
const file = join(root, "../lib/member_data (07 Agust 26).xlsx - MembershipData.csv")

const PLACEHOLDERS = new Set(
  [
    "need-to-add",
    "no email found",
    "no contact found",
    "no address found",
    "n/a",
    "na",
    "unknown",
    "xx",
    "null",
    "-",
  ].map((s) => s.toLowerCase())
)

type Report = {
  totalRows: number
  imported: number
  rejected: { reason: string; row: number; detail?: string }[]
  byType: Record<string, number>
  byInstitute: Record<string, number>
  duplicateMobiles: { mobile: string; codes: string[] }[]
  missingEmail: number
  missingPhone: number
  missingDob: number
  needsReview: number
}

function clean(value: unknown): string | null {
  if (value == null || value === "") return null
  if (value instanceof Date) return null
  const s = String(value)
    .replace(/\u00a0/g, " ")
    .replace(/Â/g, "")
    .replace(/\s+/g, " ")
    .trim()
  if (!s || PLACEHOLDERS.has(s.toLowerCase())) return null
  return s
}

function parseDob(value: unknown): { date: string | null; flag: string | null } {
  if (value == null || value === "") return { date: null, flag: null }
  let d: Date | null = null
  if (value instanceof Date && !Number.isNaN(value.getTime())) d = value
  else {
    const s = String(value).trim()
    const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/)
    const dmy = s.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/)
    if (iso) d = new Date(`${iso[1]}-${iso[2]}-${iso[3]}T12:00:00Z`)
    else if (dmy) {
      d = new Date(
        `${dmy[3]}-${dmy[2].padStart(2, "0")}-${dmy[1].padStart(2, "0")}T12:00:00Z`
      )
    }
  }
  if (!d || Number.isNaN(d.getTime())) return { date: null, flag: "unparseable_dob" }
  const iso = d.toISOString().slice(0, 10)
  if (iso.startsWith("1901-01-01")) return { date: null, flag: null }
  const year = d.getUTCFullYear()
  if (year > 2010 || d.getTime() > Date.now()) return { date: iso, flag: "implausible_dob" }
  return { date: iso, flag: null }
}

function parseAnniversary(value: unknown): string | null {
  return parseDob(value).date
}

function parseBatch(value: unknown): number | null {
  if (value == null || value === "") return null
  const n = Number.parseInt(String(value), 10)
  if (!Number.isFinite(n) || n < 1900 || n > 2100) return null
  return n
}

function matchInstituteCode(name: string | null): string | null {
  if (!name) return null
  const n = name.toLowerCase()
  if (n === "others") return null
  if (n.includes("greenherald")) return "GI"
  if (n.includes("gregory")) return "SG"
  if (n.includes("holy cross")) return "HC"
  if (n.includes("placid")) return "SP"
  if (n.includes("scholastica")) return "SS"
  if (n.includes("francis xavier") && n.includes("girl")) return "SF"
  if (n.includes("joseph") && !n.includes("dinajpur") && !n.includes("khulna") && !n.includes("jessore")) {
    return "SJ"
  }
  return null
}

function env(name: string) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing ${name}`)
  return v
}

function cell(row: Record<string, unknown>, key: string): unknown {
  if (key in row) return row[key]
  const found = Object.keys(row).find((k) => k.replace(/^\uFEFF/, "") === key)
  return found ? row[found] : undefined
}

async function main() {
  const url = env("NEXT_PUBLIC_SUPABASE_URL")
  const key = env("SUPABASE_SERVICE_ROLE_KEY")
  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const { data: types } = await supabase
    .from("member_types")
    .select("id, code, is_organisation")
  const { data: institutes } = await supabase.from("institutes").select("id, code")
  const typeId = Object.fromEntries((types ?? []).map((t) => [t.code, t.id]))
  const typeIsOrg = Object.fromEntries(
    (types ?? []).map((t) => [t.code, t.is_organisation])
  )
  const instId = Object.fromEntries((institutes ?? []).map((i) => [i.code, i.id]))

  const wb = readFile(file)
  const sheet = wb.Sheets[wb.SheetNames[0]]
  const rows = utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: "",
    raw: false,
  })

  const report: Report = {
    totalRows: 0,
    imported: 0,
    rejected: [],
    byType: {},
    byInstitute: {},
    duplicateMobiles: [],
    missingEmail: 0,
    missingPhone: 0,
    missingDob: 0,
    needsReview: 0,
  }

  type Prepared = {
    member_code: string
    first_name: string | null
    last_name: string | null
    member_type_id: string | null
    institute_id: string | null
    institute_name: string | null
    batch_year: number | null
    gender: string | null
    dob: string | null
    marital_status: string | null
    anniversary: string | null
    blood_group: string | null
    nationality: string | null
    job_title: string | null
    organisation: string | null
    job_location: string | null
    address: string | null
    status: "active" | "inactive" | "needs_review"
    is_organisation: boolean
    needs_review: boolean
    review_notes: string | null
    phone: string | null
    email: string | null
  }

  const prepared: Prepared[] = []
  const phones = new Map<string, string[]>()
  const seenCodes = new Set<string>()

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const memberCode = clean(cell(row, "Member ID"))
    if (!memberCode) {
      report.rejected.push({ reason: "no_member_id", row: i + 2 })
      continue
    }
    report.totalRows += 1

    if (seenCodes.has(memberCode)) {
      report.rejected.push({ reason: "duplicate_member_id", row: i + 2, detail: memberCode })
      continue
    }
    seenCodes.add(memberCode)

    const notes: string[] = []
    const first = clean(cell(row, "First Name"))
    const last = clean(cell(row, "Last Name"))
    let typeCode = clean(cell(row, "Membership Type"))?.toUpperCase() ?? null
    const gender = clean(cell(row, "Gender"))?.toLowerCase() ?? null
    const dob = parseDob(cell(row, "Date of birth"))
    const marital = clean(cell(row, "Marital Status"))?.toLowerCase() ?? null
    const anniversary = parseAnniversary(cell(row, "Marriage Anniversary"))
    const blood = clean(cell(row, "Blood Group"))
    const nationality = clean(cell(row, "Nationality"))
    const jobTitle = clean(cell(row, "Job title"))
    const organisation = clean(cell(row, "Job Organization"))
    const jobLocation = clean(cell(row, "Job Location"))
    const phone = clean(cell(row, "Contact Numbers"))
    const email = clean(cell(row, "Emails"))
    const address = clean(cell(row, "Address"))
    const batch = parseBatch(cell(row, "Batch Number"))
    const instituteName = clean(cell(row, "Institute Name"))
    const statusRaw = clean(cell(row, "Membership Status"))?.toLowerCase()
    let status: Prepared["status"] = statusRaw === "inactive" ? "inactive" : "active"

    if (dob.flag) notes.push(dob.flag)
    if (!dob.date) report.missingDob += 1
    if (!phone) report.missingPhone += 1
    if (!email) report.missingEmail += 1

    if (!typeCode || !typeId[typeCode]) {
      notes.push(`unknown_type:${typeCode ?? "blank"}`)
      typeCode = "AS"
    }
    const linkedCode = matchInstituteCode(instituteName)

    if (phone) {
      const key = phone.replace(/\s+/g, "")
      const list = phones.get(key) ?? []
      list.push(memberCode)
      phones.set(key, list)
    }

    const tCode = typeCode
    report.byType[tCode] = (report.byType[tCode] ?? 0) + 1
    const instLabel = instituteName ?? "(none)"
    report.byInstitute[instLabel] = (report.byInstitute[instLabel] ?? 0) + 1

    const needsReview = notes.some((n) => n.startsWith("unknown_type"))
    if (needsReview) {
      report.needsReview += 1
      if (status === "active") status = "needs_review"
    }

    prepared.push({
      member_code: memberCode,
      first_name: first,
      last_name: last,
      member_type_id: typeId[tCode] ?? null,
      institute_id: linkedCode ? (instId[linkedCode] ?? null) : null,
      institute_name: instituteName,
      batch_year: batch,
      gender,
      dob: dob.date,
      marital_status: marital,
      anniversary,
      blood_group: blood,
      nationality,
      job_title: jobTitle,
      organisation,
      job_location: jobLocation,
      address,
      status,
      is_organisation: Boolean(typeIsOrg[tCode]),
      needs_review: needsReview,
      review_notes: notes.length ? notes.join("; ") : null,
      phone,
      email,
    })
  }

  for (const [mobile, codes] of phones) {
    if (codes.length > 1) report.duplicateMobiles.push({ mobile, codes })
  }
  const dupSet = new Set(report.duplicateMobiles.flatMap((d) => d.codes))
  for (const m of prepared) {
    if (dupSet.has(m.member_code)) {
      m.needs_review = true
      m.review_notes = [m.review_notes, "duplicate_mobile"].filter(Boolean).join("; ")
    }
  }
  report.needsReview = prepared.filter((m) => m.needs_review).length

  const chunk = 100
  const { error: clearError } = await supabase
    .from("members")
    .delete()
    .not("id", "is", null)
  if (clearError) {
    report.rejected.push({ reason: "delete_previous", row: 0, detail: clearError.message })
    throw new Error(`Could not clear previous members: ${clearError.message}`)
  }

  for (let i = 0; i < prepared.length; i += chunk) {
    const slice = prepared.slice(i, i + chunk)
    const { error } = await supabase.from("members").insert(
      slice.map(({ phone: _p, email: _e, ...rest }) => rest)
    )
    if (error) {
      report.rejected.push({ reason: "insert_members", row: i, detail: error.message })
      continue
    }
    report.imported += slice.length
  }

  const { data: inserted } = await supabase.from("members").select("id, member_code")
  const idByCode = Object.fromEntries(
    (inserted ?? []).map((m) => [m.member_code, m.id])
  )

  const contacts = prepared.flatMap((m) => {
    const memberId = idByCode[m.member_code]
    if (!memberId) return []
    const rowsOut: { member_id: string; type: "phone" | "email"; value: string; is_primary: boolean }[] = []
    if (m.phone) rowsOut.push({ member_id: memberId, type: "phone", value: m.phone, is_primary: true })
    if (m.email) rowsOut.push({ member_id: memberId, type: "email", value: m.email, is_primary: true })
    return rowsOut
  })

  await supabase.from("member_contacts").delete().neq("id", "00000000-0000-0000-0000-000000000000")
  for (let i = 0; i < contacts.length; i += chunk) {
    const { error } = await supabase.from("member_contacts").insert(contacts.slice(i, i + chunk))
    if (error) {
      report.rejected.push({ reason: "insert_contacts", row: i, detail: error.message })
    }
  }

  const md = [
    "# Member import data-quality report",
    "",
    `- Source: \`lib/member_data (07 Agust 26).xlsx - MembershipData.csv\``,
    `- Total source rows: ${report.totalRows}`,
    `- Imported: ${report.imported}`,
    `- Removed all previous member rows, then inserted this file only`,
    `- Rejected: ${report.rejected.length}`,
    `- Needs review: ${report.needsReview}`,
    `- Missing email: ${report.missingEmail}`,
    `- Missing phone: ${report.missingPhone}`,
    `- Missing DOB: ${report.missingDob}`,
    `- Duplicate mobiles: ${report.duplicateMobiles.length}`,
    "",
    "## Counts by membership type",
    ...Object.entries(report.byType)
      .sort()
      .map(([k, v]) => `- ${k}: ${v}`),
    "",
    "## Counts by institute name",
    ...Object.entries(report.byInstitute)
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => `- ${k}: ${v}`),
    "",
    "## Duplicate mobiles",
    ...(report.duplicateMobiles.length
      ? report.duplicateMobiles.map((d) => `- ${d.mobile}: ${d.codes.join(", ")}`)
      : ["- none"]),
    "",
    "## Rejects",
    ...(report.rejected.length
      ? report.rejected.map((r) => `- row ${r.row}: ${r.reason} ${r.detail ?? ""}`)
      : ["- none"]),
  ].join("\n")

  const out = join(root, "data-quality-report.md")
  writeFileSync(out, md)
  console.log(md)
  console.log(`\nWrote ${out}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
