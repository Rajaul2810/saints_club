import { createClient } from "@supabase/supabase-js"

const email = process.argv[2]
if (!email) {
  console.error("Usage: npx tsx scripts/promote-superadmin.ts user@example.com")
  process.exit(1)
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
  process.exit(1)
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const { data: users, error } = await supabase.auth.admin.listUsers()
if (error) {
  console.error(error.message)
  process.exit(1)
}
const user = users.users.find((u) => u.email?.toLowerCase() === email.toLowerCase())
if (!user) {
  console.error("No auth user with that email. Create the user in Supabase Auth first.")
  process.exit(1)
}

const { error: upErr } = await supabase
  .from("profiles")
  .update({ role: "super_admin" })
  .eq("id", user.id)

if (upErr) {
  console.error(upErr.message)
  process.exit(1)
}

console.log(`Promoted ${email} to super_admin`)
