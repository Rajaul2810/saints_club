import Link from "next/link"
import { Bell, CalendarDays, UserRound } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { type Notice, formatDate } from "@/lib/data"

export function NoticeCard({ notice }: { notice: Notice }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-full bg-primary/10 text-primary">
            <Bell className="size-3.5" />
          </span>
          <Badge variant="secondary">{notice.tag}</Badge>
        </div>
        <CardTitle className="font-display mt-2 text-xl font-normal tracking-tight">
          <Link href="/notices" className="hover:text-primary">
            {notice.title}
          </Link>
        </CardTitle>
        <CardDescription>{notice.excerpt}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="size-3.5 text-primary" />
          {formatDate(notice.date)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <UserRound className="size-3.5 text-primary" />
          {notice.author}
        </span>
      </CardFooter>
    </Card>
  )
}
