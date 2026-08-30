import { writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import xlsx from "xlsx"
import { createClient } from "@supabase/supabase-js"

const { readFile, utils } = xlsx
const root = dirname(fileURLToPath(import.meta.url))
const file = join(root, "../lib/member_data (07 Agust 26).xlsx")

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
    "others",
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
  skippedNid: number
}

function clean(value: unknown): string | null {
  if (value == null) return null
  if (value instanceof Date) return null
  const s = String(value).trim()
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
  const { date } = parseDob(value)
  return date
}

function parseBatch(value: unknown): number | null {
  if (value == null || value === "") return null
  const n = Number.parseInt(String(value), 10)
  if (!Number.isFinite(n) || n < 1900 || n > 2100) return null
  return n
}

function instituteFromCode(memberCode: string | null): string | null {
  if (!memberCode || !memberCode.includes("-")) return null
  return memberCode.split("-").pop() ?? null
}

function instituteFromName(name: string | null): string {
  if (!name) return "CU"
  const n = name.toLowerCase()
  if (n.includes("greenherald")) return "GI"
  if (n.includes("gregory")) return "SG"
  if (n.includes("joseph") && !n.includes("dinajpur")) return "SJ"
  if (n.includes("holy cross")) return "HC"
  if (n.includes("francis xavier") || n.includes("st. francis")) return "SF"
  if (n.includes("placid")) return "SP"
  if (n.includes("scholastica")) return "SS"
  return "CU"
}

function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/)
  if (parts.length === 1) return { first: parts[0], last: "" }
  return { first: parts.slice(0, -1).join(" "), last: parts.at(-1) ?? "" }
}

function looksStripped(first: string | null, last: string | null) {
  const blob = `${first ?? ""}${last ?? ""}`
  return /[a-z][A-Z]/.test(blob) || /(LM|PM|DM|male|female)\d{4}/i.test(blob)
}

function env(name: string) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing ${name}`)
  return v
}

async function main() {
  const url = env("NEXT_PUBLIC_SUPABASE_URL")
  const key = env("SUPABASE_SERVICE_ROLE_KEY")
  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const { data: types } = await supabase.from("member_types").select("id, code")
  const { data: institutes } = await supabase.from("institutes").select("id, code")
  const typeId = Object.fromEntries((types ?? []).map((t) => [t.code, t.id]))
  const instId = Object.fromEntries((institutes ?? []).map((i) => [i.code, i.id]))

  const wb = readFile(file, { cellDates: true })
  const sheet = wb.Sheets[wb.SheetNames[0]]
  const rows = utils.sheet_to_json<(unknown | null)[]>(sheet, {
    header: 1,
    defval: null,
    raw: true,
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
    skippedNid: 0,
  }

  type Prepared = {
    member_code: string
    first_name: string | null
    last_name: string | null
    member_type_id: string | null
    institute_id: string | null
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
  let altIndex = 0
  let inAlt = false

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    if (!row || row.every((c) => c == null || c === "")) continue
    report.totalRows += 1

    const firstCell = clean(row[0])
    if (firstCell && /^name$/i.test(firstCell)) {
      inAlt = true
      report.totalRows -= 1
      continue
    }

    const notes: string[] = []
    let memberCode: string | null = null
    let first: string | null = null
    let last: string | null = null
    let typeCode: string | null = null
    let gender: string | null = null
    let dobRaw: unknown = null
    let marital: string | null = null
    let anniversary: string | null = null
    let blood: string | null = null
    let nationality: string | null = null
    let jobTitle: string | null = null
    let organisation: string | null = null
    let jobLocation: string | null = null
    let phone: string | null = null
    let email: string | null = null
    let address: string | null = null
    let batch: number | null = null
    let instituteCode: string | null = null
    let status = "active"

    const looksMain = Boolean(firstCell && /^[A-Z]{2,4}\d{3,}/.test(firstCell))

    if (!inAlt && looksMain && firstCell) {
      memberCode = firstCell
      first = clean(row[1])
      last = clean(row[2])
      typeCode = clean(row[3])?.toUpperCase() ?? firstCell.replace(/\d.*$/, "")
      gender = clean(row[4])?.toLowerCase() ?? null
      dobRaw = row[5]
      marital = clean(row[6])?.toLowerCase() ?? null
      anniversary = parseAnniversary(row[7])
      blood = clean(row[8])
      nationality = clean(row[9])
      jobTitle = clean(row[10])
      organisation = clean(row[11])
      jobLocation = clean(row[12])
      phone = clean(row[13])
      email = clean(row[14])
      address = clean(row[15])
      batch = parseBatch(row[16])
      const instName = clean(row[17])
      const statusRaw = clean(row[18])?.toLowerCase()
      status = statusRaw === "inactive" ? "inactive" : "active"
      instituteCode = instituteFromCode(memberCode) ?? instituteFromName(instName)
    } else {
      inAlt = true
      const fullName = clean(row[0])
      if (!fullName) {
        report.rejected.push({ reason: "no_name", row: i + 1 })
        continue
      }
      altIndex += 1
      const parts = splitName(fullName)
      first = parts.first
      last = parts.last
      batch = parseBatch(row[1])
      const instName = clean(row[2])
      gender = clean(row[3])?.toLowerCase() ?? null
      dobRaw = row[4]
      if (row[5] != null && String(row[5]).trim() !== "") {
        report.skippedNid += 1
        notes.push("nid_present_not_imported")
      }
      typeCode = mapTypeName(clean(row[6]))
      phone = clean(row[7])
      instituteCode = instituteFromName(instName)
      memberCode = `IMP-${String(altIndex).padStart(4, "0")}`
      notes.push("imported_from_secondary_block")
    }

    if (typeof row[5] === "number" && row[5] > 1e9) report.skippedNid += 1

    const dob = parseDob(dobRaw)
    if (dob.flag) notes.push(dob.flag)
    if (!dob.date) report.missingDob += 1
    if (!phone) report.missingPhone += 1
    if (!email) report.missingEmail += 1

    if (!typeId[typeCode ?? ""]) {
      notes.push(`unknown_type:${typeCode}`)
      typeCode = typeCode && typeId[typeCode] ? typeCode : "AS"
    }
    if (instituteCode && !instId[instituteCode]) instituteCode = "CU"
    if (instituteCode === "CU") notes.push("non_eligible_or_unconfirmed_institute")

    const orgTypes = new Set(["CR", "CNBL", "NONM", "SCL"])
    const isOrg =
      orgTypes.has(typeCode ?? "") || gender === "not_applicable" || gender === "na"
    if (isOrg) notes.push("organisation_member")

    if (looksStripped(first, last)) notes.push("whitespace_stripped_name")

    const needsReview = notes.length > 0 || status === "needs_review"
    if (needsReview) {
      report.needsReview += 1
      status = status === "inactive" ? "inactive" : "needs_review"
    }

    if (phone) {
      const key = phone.replace(/\s+/g, "")
      const list = phones.get(key) ?? []
      list.push(memberCode ?? `row-${i}`)
      phones.set(key, list)
    }

    const tCode = typeCode ?? "AS"
    report.byType[tCode] = (report.byType[tCode] ?? 0) + 1
    const iCode = instituteCode ?? "CU"
    report.byInstitute[iCode] = (report.byInstitute[iCode] ?? 0) + 1

    prepared.push({
      member_code: memberCode!,
      first_name: first,
      last_name: last,
      member_type_id: typeId[tCode] ?? null,
      institute_id: instId[iCode] ?? instId.CU ?? null,
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
      status: status as Prepared["status"],
      is_organisation: isOrg,
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

  const chunk = 100
  for (let i = 0; i < prepared.length; i += chunk) {
    const slice = prepared.slice(i, i + chunk)
    const { error } = await supabase.from("members").upsert(
      slice.map(({ phone: _p, email: _e, ...rest }) => rest),
      { onConflict: "member_code" }
    )
    if (error) {
      report.rejected.push({ reason: "upsert_members", row: i, detail: error.message })
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
    const rows: { member_id: string; type: "phone" | "email"; value: string; is_primary: boolean }[] = []
    if (m.phone) rows.push({ member_id: memberId, type: "phone", value: m.phone, is_primary: true })
    if (m.email) rows.push({ member_id: memberId, type: "email", value: m.email, is_primary: true })
    return rows
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
    `- Source: \`lib/member_data (07 Agust 26).xlsx\``,
    `- Total source rows: ${report.totalRows}`,
    `- Imported: ${report.imported}`,
    `- Rejected: ${report.rejected.length}`,
    `- Needs review: ${report.needsReview}`,
    `- Missing email: ${report.missingEmail}`,
    `- Missing phone: ${report.missingPhone}`,
    `- Missing DOB: ${report.missingDob}`,
    `- NID values skipped (not stored): ${report.skippedNid}`,
    `- Duplicate mobiles: ${report.duplicateMobiles.length}`,
    "",
    "## Counts by membership type",
    ...Object.entries(report.byType)
      .sort()
      .map(([k, v]) => `- ${k}: ${v}`),
    "",
    "## Counts by institute suffix",
    ...Object.entries(report.byInstitute)
      .sort()
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
    "",
    "NID numbers were not imported. `-CU` and secondary-block rows are flagged `needs_review`.",
  ].join("\n")

  const out = join(root, "data-quality-report.md")
  writeFileSync(out, md)
  console.log(md)
  console.log(`\nWrote ${out}`)
}

function mapTypeName(name: string | null): string {
  if (!name) return "PM"
  const n = name.toLowerCase()
  if (n.startsWith("life")) return "LM"
  if (n.startsWith("donor")) return "DM"
  if (n.startsWith("permanent")) return "PM"
  if (n.startsWith("patron")) return "PT"
  if (n.startsWith("founder")) return "FM"
  if (n.startsWith("honor")) return "HM"
  if (n.startsWith("associate")) return "AS"
  if (n.startsWith("senior")) return "SM"
  if (n.startsWith("corporate")) return "CR"
  if (n.startsWith("non")) return "NR"
  return name.toUpperCase().slice(0, 4)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
