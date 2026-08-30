import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { isStaffRole, type AppRole } from "@/lib/auth/roles"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/account"

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        await supabase.rpc("link_profile_member")
        await supabase
          .from("profiles")
          .update({ last_login_at: new Date().toISOString() })
          .eq("id", user.id)
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle()
        const dest =
          next && next !== "/account"
            ? next
            : isStaffRole(profile?.role as AppRole)
              ? "/admin"
              : "/account"
        return NextResponse.redirect(`${origin}${dest}`)
      }
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`)
}
