import { isSupabaseConfigured } from "@/lib/supabase/env"
import { createClient } from "@/lib/supabase/server"
import type { VisibleMember } from "@/lib/members/fields"
import { sortMemberTypes } from "@/lib/members/types"

export const MEMBER_PAGE_SIZE = 25
export const MEMBER_EXPORT_LIMIT = 10000

export type MemberFilters = {
  query?: string
  institute?: string
  type?: string
  batch?: number
  includeInactive?: boolean
  limit?: number
  offset?: number
}

export type MemberListResult = {
  members: VisibleMember[]
  total: number
  limit: number
  offset: number
}

export function parsePage(raw?: string): number {
  const n = raw ? Number.parseInt(raw, 10) : 1
  return Number.isFinite(n) && n > 0 ? n : 1
}

function emptyList(limit: number, offset: number): MemberListResult {
  return { members: [], total: 0, limit, offset }
}

function parseListPayload(
  data: unknown,
  fallbackLimit: number,
  fallbackOffset: number
): MemberListResult {
  let parsed: unknown = data
  if (typeof data === "string") {
    try {
      parsed = JSON.parse(data)
    } catch {
      return emptyList(fallbackLimit, fallbackOffset)
    }
  }
  if (Array.isArray(parsed)) {
    return {
      members: parsed as VisibleMember[],
      total: parsed.length,
      limit: fallbackLimit,
      offset: fallbackOffset,
    }
  }
  if (parsed && typeof parsed === "object" && "items" in parsed) {
    const obj = parsed as {
      items?: unknown
      total?: unknown
      limit?: unknown
      offset?: unknown
    }
    const members = Array.isArray(obj.items) ? (obj.items as VisibleMember[]) : []
    return {
      members,
      total: typeof obj.total === "number" ? obj.total : members.length,
      limit: typeof obj.limit === "number" ? obj.limit : fallbackLimit,
      offset: typeof obj.offset === "number" ? obj.offset : fallbackOffset,
    }
  }
  return emptyList(fallbackLimit, fallbackOffset)
}

export async function listVisibleMembers(
  filters: MemberFilters = {}
): Promise<MemberListResult> {
  const limit = filters.limit ?? MEMBER_PAGE_SIZE
  const offset = filters.offset ?? 0
  if (!isSupabaseConfigured()) return emptyList(limit, offset)
  const supabase = await createClient()
  const { data, error } = await supabase.rpc("list_members", {
    p_query: filters.query || null,
    p_institute_code: filters.institute || null,
    p_type_code: filters.type || null,
    p_batch_year: filters.batch ?? null,
    p_include_inactive: filters.includeInactive ?? false,
    p_limit: limit,
    p_offset: offset,
  })
  if (error) {
    console.error("list_members", error.message)
    return emptyList(limit, offset)
  }
  return parseListPayload(data, limit, offset)
}

export async function getVisibleMember(id: string): Promise<VisibleMember | null> {
  if (!isSupabaseConfigured()) return null
  const supabase = await createClient()
  const { data, error } = await supabase.rpc("get_member", { p_id: id })
  if (error) {
    console.error("get_member", error.message)
    return null
  }
  return (data as VisibleMember | null) ?? null
}

export async function getQuotaStats() {
  if (!isSupabaseConfigured()) return null
  const supabase = await createClient()
  const { data, error } = await supabase.rpc("quota_stats")
  if (error) {
    console.error("quota_stats", error.message)
    return null
  }
  return data as {
    general: { used: number; max: number }
    types: { code: string; name: string; used: number; max: number | null }[]
  }
}

export async function listMemberTypes() {
  if (!isSupabaseConfigured()) return []
  const supabase = await createClient()
  const { data } = await supabase
    .from("member_types")
    .select("id, code, name, quota_max, has_voting_rights, is_organisation")
  return sortMemberTypes(data ?? [])
}

export async function listInstitutes() {
  if (!isSupabaseConfigured()) return []
  const supabase = await createClient()
  const { data } = await supabase
    .from("institutes")
    .select("id, code, name, is_eligible")
    .order("name")
  return data ?? []
}
