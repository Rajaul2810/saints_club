import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/env"

export async function createClient() {
  const cookieStore = await cookies()

  const supabase = createServerClient(supabaseUrl(), supabaseAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet, headers) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
          void headers
        } catch {
          // Called from a Server Component; proxy writes the cookies.
        }
      },
    },
  })

  await supabase.auth.getUser()
  return supabase
}
