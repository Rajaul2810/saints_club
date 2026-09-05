"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useId, useRef, useState } from "react"
import {
  Menu,
  X,
  ChevronDown,
  Landmark,
  BookOpen,
  Users,
  UserPlus,
  Sparkles,
  Images,
  CalendarDays,
  type LucideIcon,
} from "lucide-react"
import { Logo } from "@/components/layout/logo"
import { navLinks, type NavChild, type NavLink } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

const childIcons: Record<string, LucideIcon> = {
  "/about": BookOpen,
  "/committee": Landmark,
  "/about#founders": Users,
  "/membership": UserPlus,
  "/members": Users,
  "/facilities": Sparkles,
  "/gallery": Images,
  "/activities": CalendarDays,
}

function pathOf(href: string) {
  return href.split("#")[0]
}

function isLinkActive(pathname: string, link: NavLink) {
  if (link.href === "/") return pathname === "/"
  if (pathname === link.href || pathname.startsWith(`${link.href}/`)) return true
  return Boolean(
    link.children?.some((child) => {
      const base = pathOf(child.href)
      return pathname === base || pathname.startsWith(`${base}/`)
    })
  )
}

function isChildActive(pathname: string, href: string) {
  const base = pathOf(href)
  return pathname === base || pathname.startsWith(`${base}/`)
}

export function Navbar({ auth }: { auth?: ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  useEffect(() => {
    setMobileOpen(false)
    setOpenGroup(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-white/95 shadow-[0_1px_0_rgb(26_18_36/4%)] backdrop-blur-md supports-backdrop-filter:bg-white/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5 sm:px-8">
        <Logo className="shrink-0" />

        <DesktopNav pathname={pathname} />

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {auth}
          <Link
            href="/membership"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden sm:inline-flex shadow-none"
            )}
          >
            Join
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="text-ink hover:bg-primary/10 hover:text-primary lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <MobileNav
          pathname={pathname}
          openGroup={openGroup}
          setOpenGroup={setOpenGroup}
          onClose={() => setMobileOpen(false)}
        />
      )}
    </header>
  )
}

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <nav
      className="ml-2 hidden items-center gap-0.5 lg:flex"
      aria-label="Primary"
    >
      {navLinks.map((link) =>
        link.children ? (
          <DesktopDropdown key={link.href} link={link} pathname={pathname} />
        ) : (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isLinkActive(pathname, link)
                ? "bg-primary/10 text-primary"
                : "text-ink/70 hover:bg-mist hover:text-ink"
            )}
          >
            {link.label}
          </Link>
        )
      )}
    </nav>
  )
}

function DesktopDropdown({
  link,
  pathname,
}: {
  link: NavLink
  pathname: string
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const active = isLinkActive(pathname, link)
  const children = link.children ?? []

  useEffect(() => {
    if (!open) return

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          active || open
            ? "bg-primary/10 text-primary"
            : "text-ink/70 hover:bg-mist hover:text-ink"
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        {link.label}
        <ChevronDown
          className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      <div
        id={menuId}
        role="menu"
        hidden={!open}
        className={cn(
          "absolute top-full left-0 z-50 w-72 pt-2",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <div className="rounded-xl border border-border bg-white p-1.5 shadow-lg shadow-ink/8">
          {children.map((child) => (
            <DropdownItem
              key={child.href}
              child={child}
              active={isChildActive(pathname, child.href)}
              onNavigate={() => setOpen(false)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function MobileNav({
  pathname,
  openGroup,
  setOpenGroup,
  onClose,
}: {
  pathname: string
  openGroup: string | null
  setOpenGroup: (value: string | null) => void
  onClose: () => void
}) {
  return (
    <div
      id="mobile-nav"
      className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-white lg:hidden"
    >
      <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8" aria-label="Mobile">
        {navLinks.map((link) =>
          link.children ? (
            <div key={link.href} className="border-b border-border/70 last:border-b-0">
              <button
                type="button"
                onClick={() =>
                  setOpenGroup(openGroup === link.href ? null : link.href)
                }
                className={cn(
                  "flex w-full items-center justify-between py-3.5 text-left text-[15px] font-medium",
                  isLinkActive(pathname, link) ? "text-primary" : "text-ink"
                )}
                aria-expanded={openGroup === link.href}
              >
                {link.label}
                <ChevronDown
                  className={cn(
                    "size-4 text-ink/45 transition-transform duration-200",
                    openGroup === link.href && "rotate-180 text-primary"
                  )}
                />
              </button>
              {openGroup === link.href && (
                <div className="mb-3 space-y-0.5 rounded-xl bg-mist/70 p-1.5">
                  {link.children.map((child) => (
                    <DropdownItem
                      key={child.href}
                      child={child}
                      active={isChildActive(pathname, child.href)}
                      onNavigate={onClose}
                      compact
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "border-b border-border/70 py-3.5 text-[15px] font-medium last:border-b-0",
                isLinkActive(pathname, link) ? "text-primary" : "text-ink"
              )}
            >
              {link.label}
            </Link>
          )
        )}

        <div className="mt-4 grid gap-2 pb-2 sm:hidden">
          <Link
            href="/login"
            onClick={onClose}
            className={cn(buttonVariants({ variant: "outline" }), "w-full")}
          >
            Sign in
          </Link>
          <Link
            href="/membership"
            onClick={onClose}
            className={cn(buttonVariants(), "w-full")}
          >
            Join
          </Link>
        </div>
      </nav>
    </div>
  )
}

function DropdownItem({
  child,
  active,
  onNavigate,
  compact = false,
}: {
  child: NavChild
  active: boolean
  onNavigate?: () => void
  compact?: boolean
}) {
  const Icon = childIcons[child.href] ?? BookOpen

  return (
    <Link
      href={child.href}
      role="menuitem"
      onClick={onNavigate}
      className={cn(
        "flex gap-3 rounded-lg px-3 transition-colors",
        compact ? "py-2.5" : "py-2.5",
        active
          ? "bg-primary/10 text-primary"
          : "text-ink hover:bg-mist hover:text-ink"
      )}
    >
      <span
        className={cn(
          "mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg",
          active ? "bg-primary text-white" : "bg-primary/10 text-primary"
        )}
      >
        <Icon className="size-3.5" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium">{child.label}</span>
        <span
          className={cn(
            "mt-0.5 block text-xs leading-snug",
            active ? "text-primary/75" : "text-muted-foreground"
          )}
        >
          {child.description}
        </span>
      </span>
    </Link>
  )
}
