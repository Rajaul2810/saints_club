import type { ReactNode } from "react"
import Link from "next/link"
import { Logo } from "@/components/layout/logo"
import { clubInfo, footerLinks } from "@/lib/data"

function SocialIcon({
  label,
  href,
  children,
}: {
  label: string
  href: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid size-9 place-items-center border border-white/15 text-white/60 transition hover:border-white/40 hover:text-white"
    >
      {children}
    </a>
  )
}

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              {clubInfo.tagline}. Established {clubInfo.founded}. Membership by
              election.
            </p>
            <div className="mt-6 flex gap-2">
              <SocialIcon label="Instagram" href={clubInfo.socials.instagram}>
                <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </SocialIcon>
              <SocialIcon label="Facebook" href={clubInfo.socials.facebook}>
                <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor">
                  <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.2l.8-3H14V9z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="YouTube" href={clubInfo.socials.youtube}>
                <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor">
                  <path d="M22 12.2s0-3.2-.4-4.7c-.2-.8-.9-1.5-1.7-1.7C18.4 5.4 12 5.4 12 5.4s-6.4 0-7.9.4c-.8.2-1.5.9-1.7 1.7C2 9 2 12.2 2 12.2s0 3.2.4 4.7c.2.8.9 1.5 1.7 1.7 1.5.4 7.9.4 7.9.4s6.4 0 7.9-.4c.8-.2 1.5-.9 1.7-1.7.4-1.5.4-4.7.4-4.7zM10 15.2v-6l5.2 3-5.2 3z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-medium tracking-[0.18em] text-white/40 uppercase">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-medium tracking-[0.18em] text-white/40 uppercase">
              The House
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/65">
              <li>{clubInfo.address}</li>
              <li>
                <a href={`mailto:${clubInfo.email}`} className="hover:text-white">
                  {clubInfo.email}
                </a>
              </li>
              <li>
                <a href={`tel:${clubInfo.phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {clubInfo.phone}
                </a>
              </li>
              <li>{clubInfo.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Saints Club</p>
          <p>Demo content · Database to follow</p>
        </div>
      </div>
    </footer>
  )
}
