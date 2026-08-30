import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "@/lib/supabase/env"

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })

  if (!isSupabaseConfigured()) return response

  const supabase = createServerClient(supabaseUrl(), supabaseAnonKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value)
        })
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options)
        })
        Object.entries(headers).forEach(([key, value]) => {
          response.headers.set(key, value)
        })
      },
    },
  })

  await supabase.auth.getClaims()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  const isAuthRoute = path.startsWith("/login") || path.startsWith("/auth")

  if (!user && (path.startsWith("/admin") || path.startsWith("/account"))) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    url.searchParams.set("next", path)
    return NextResponse.redirect(url)
  }

  if (user && isAuthRoute && path === "/login") {
    const url = request.nextUrl.clone()
    url.pathname = "/account"
    url.search = ""
    return NextResponse.redirect(url)
  }

  return response
}
