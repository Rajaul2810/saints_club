export const APP_ROLES = [
  "super_admin",
  "secretariat",
  "committee_viewer",
  "member",
] as const

export type AppRole = (typeof APP_ROLES)[number]

export const STAFF_ROLES: AppRole[] = [
  "super_admin",
  "secretariat",
  "committee_viewer",
]

export const EDITOR_ROLES: AppRole[] = ["super_admin", "secretariat"]

export function isStaffRole(role: AppRole | null | undefined): boolean {
  return Boolean(role && STAFF_ROLES.includes(role))
}

export function isEditorRole(role: AppRole | null | undefined): boolean {
  return Boolean(role && EDITOR_ROLES.includes(role))
}

export function isSuperAdmin(role: AppRole | null | undefined): boolean {
  return role === "super_admin"
}

export function roleLabel(role: AppRole) {
  switch (role) {
    case "super_admin":
      return "Super Admin"
    case "secretariat":
      return "Secretariat"
    case "committee_viewer":
      return "Committee"
    case "member":
      return "Member"
  }
}
