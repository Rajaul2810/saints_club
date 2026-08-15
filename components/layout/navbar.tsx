"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  Menu,
  X,
  ChevronDown,
  Landmark,
  Sparkles,
  BookOpen,
  CalendarDays,
  Scale,
  Bell,
  Users,
  ClipboardList,
} from "lucide-react"
import { Logo } from "@/components/layout/logo"
import { navLinks, type NavChild } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

const childIcon: Record<string, typeof Landmark> = {
  "/about": BookOpen,
  "/committee": Landmark,
  "/about#founders": Users,
  "/facilities": Sparkles,
  "/events": CalendarDays,
  "/booking": ClipboardList,
  "/governance": Scale,
  "/notices": Bell,
}

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/55 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href ||
                  Boolean(
                    link.children?.some((c) =>
                      pathname.startsWith(c.href.split("#")[0])
                    )
                  )

            if (link.children) {
              return (
                <div key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    className={cn(
                      "inline-flex items-center gap-1 text-sm transition-colors",
                      active
                        ? "font-medium text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                    <ChevronDown className="size-3.5 transition group-hover:rotate-180" />
                  </Link>
                  <div className="invisible absolute top-full left-0 z-50 w-72 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="rounded-2xl bg-white/90 p-2 shadow-lg ring-1 ring-foreground/5 backdrop-blur-xl">
                      {link.children.map((child) => (
                        <AboutItem key={child.href} child={child} />
                      ))}
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors",
                  active
                    ? "font-medium text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/membership"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden sm:inline-flex"
            )}
          >
            Join
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/40 bg-white/80 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="py-1">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenGroup((v) => (v === link.href ? null : link.href))
                    }
                    className="flex w-full items-center justify-between py-2.5 text-left text-base"
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "size-4 transition",
                        openGroup === link.href && "rotate-180"
                      )}
                    />
                  </button>
                  {openGroup === link.href && (
                    <div className="mb-2 ml-1 border-l border-primary/20 pl-3">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="block py-2 text-sm text-muted-foreground"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-base"
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href="/membership"
              onClick={() => setOpen(false)}
              className="mt-2 py-2.5 text-base font-medium text-primary"
            >
              Join
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

function AboutItem({ child }: { child: NavChild }) {
  const Icon = childIcon[child.href] ?? BookOpen
  return (
    <Link
      href={child.href}
      className="flex gap-3 rounded-xl px-3 py-2.5 transition hover:bg-primary/10"
    >
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-3.5" />
      </span>
      <span>
        <span className="block text-sm font-medium">{child.label}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">
          {child.description}
        </span>
      </span>
    </Link>
  )
}
