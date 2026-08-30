import Link from "next/link"
import { getViewer } from "@/lib/auth/session"
import { isStaffRole } from "@/lib/auth/roles"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export async function AuthButtons() {
  const viewer = await getViewer()

  if (!viewer) {
    return (
      <Link
        href="/login"
        className={cn(buttonVariants({ size: "sm", variant: "outline" }), "hidden sm:inline-flex")}
      >
        Sign in
      </Link>
    )
  }

  return (
    <div className="hidden items-center gap-3 sm:flex">
      {isStaffRole(viewer.role) && (
        <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
          Admin
        </Link>
      )}
      <Link
        href="/account"
        className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
      >
        My Profile
      </Link>
    </div>
  )
}
