"use client"

import { useState, type ReactNode } from "react"
import Image from "next/image"
import {
  CalendarDays,
  Newspaper,
  Users,
  Sparkles,
  Landmark,
  LayoutDashboard,
} from "lucide-react"
import {
  activities,
  committees,
  events,
  formatDate,
  members,
  news,
  notices,
} from "@/lib/data"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "members", label: "Members", icon: Users },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "news", label: "News", icon: Newspaper },
  { id: "notices", label: "Notices", icon: Newspaper },
  { id: "activities", label: "Activities", icon: Sparkles },
  { id: "committee", label: "Committee", icon: Landmark },
] as const

type TabId = (typeof tabs)[number]["id"]

export function AdminDashboard() {
  const [tab, setTab] = useState<TabId>("overview")
  const current = committees[0]

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[200px_1fr]">
      <aside>
        <p className="mb-3 text-[11px] tracking-[0.18em] text-gold uppercase">
          Manage
        </p>
        <nav className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 px-3 py-2 text-[13px] transition",
                tab === id
                  ? "bg-ink text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-ink"
              )}
            >
              <Icon className="size-3.5" />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <div>
        {tab === "overview" && (
          <div className="space-y-10">
            <header>
              <h1 className="font-display text-3xl tracking-tight text-ink">
                Overview
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Demonstration figures from local data. Connect a database for
                live records and authentication.
              </p>
            </header>
            <div className="grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Members", value: members.length },
                { label: "Events", value: events.length },
                { label: "News", value: news.length },
                { label: "Notices", value: notices.length },
                { label: "Programmes", value: activities.length },
              ].map((stat) => (
                <div key={stat.label} className="bg-white p-5">
                  <p className="text-[13px] text-muted-foreground">{stat.label}</p>
                  <p className="font-display mt-2 text-3xl tracking-tight text-ink">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="border border-border bg-white p-6">
              <h2 className="font-display text-xl tracking-tight text-ink">
                Committee {current.year}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {current.theme}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {current.members.map((m) => (
                  <div key={m.id} className="inline-flex items-center gap-2">
                    <Image
                      src={m.image}
                      alt={m.name}
                      width={28}
                      height={28}
                      className="size-7 object-cover"
                    />
                    <span className="text-sm">{m.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "members" && (
          <AdminTable
            title="Members"
            subtitle="Fellows and members"
            headers={["Member", "Standing", "Profession", "Since"]}
            rows={members.map((m) => [
              <Person key={m.id} name={m.name} image={m.image} />,
              m.role,
              m.profession,
              m.joined,
            ])}
          />
        )}

        {tab === "events" && (
          <AdminTable
            title="Events"
            subtitle="The programme"
            headers={["Event", "Date", "Category", "Location"]}
            rows={events.map((e) => [
              e.title,
              formatDate(e.date),
              e.category,
              e.location,
            ])}
          />
        )}

        {tab === "news" && (
          <AdminTable
            title="News"
            subtitle="Stories with a photograph"
            headers={["Title", "Tag", "Date", "Author"]}
            rows={news.map((n) => [
              n.title,
              n.tag,
              formatDate(n.date),
              n.author,
            ])}
          />
        )}

        {tab === "notices" && (
          <AdminTable
            title="Notices"
            subtitle="Secretariat — text only"
            headers={["Title", "Tag", "Date", "Author"]}
            rows={notices.map((n) => [
              n.title,
              n.tag,
              formatDate(n.date),
              n.author,
            ])}
          />
        )}

        {tab === "activities" && (
          <AdminTable
            title="Activities"
            subtitle="Standing programmes"
            headers={["Programme", "Schedule"]}
            rows={activities.map((a) => [a.title, a.schedule])}
          />
        )}

        {tab === "committee" && (
          <AdminTable
            title={`Committee ${current.year}`}
            subtitle={current.theme}
            headers={["Name", "Office", "Email"]}
            rows={current.members.map((m) => [
              <Person key={m.id} name={m.name} image={m.image} />,
              m.position,
              m.email,
            ])}
          />
        )}
      </div>
    </div>
  )
}

function Person({ name, image }: { name: string; image: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Image
        src={image}
        alt={name}
        width={28}
        height={28}
        className="size-7 object-cover"
      />
      <span>{name}</span>
    </span>
  )
}

function AdminTable({
  title,
  subtitle,
  headers,
  rows,
}: {
  title: string
  subtitle: string
  headers: string[]
  rows: ReactNode[][]
}) {
  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl tracking-tight text-ink">
            {title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <button
          type="button"
          className="bg-ink px-4 py-2 text-[13px] text-white hover:bg-ink-soft"
        >
          Add (demo)
        </button>
      </div>
      <div className="overflow-x-auto border border-border bg-white">
        <table className="w-full min-w-64 text-left text-sm">
          <thead className="border-b border-border text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
            <tr>
              {headers.map((h) => (
                <th key={h} className="px-4 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 align-middle">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
