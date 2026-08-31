export const MEMBER_TYPE_ORDER = [
  "FM",
  "DM",
  "LM",
  "PM",
  "PT",
  "HM",
  "NR",
  "AS",
  "SM",
  "CR",
  "CNBL",
  "NONM",
  "SCL",
] as const

export function sortMemberTypes<T extends { code: string }>(types: T[]): T[] {
  return [...types].sort((a, b) => {
    const ia = MEMBER_TYPE_ORDER.indexOf(a.code as (typeof MEMBER_TYPE_ORDER)[number])
    const ib = MEMBER_TYPE_ORDER.indexOf(b.code as (typeof MEMBER_TYPE_ORDER)[number])
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
  })
}
