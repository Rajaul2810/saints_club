import Image from "next/image"
import Link from "next/link"
import { CalendarDays, Clock, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { type EventItem, formatDate } from "@/lib/data"

export function EventCard({ event }: { event: EventItem }) {
  return (
    <Card className="h-full gap-0 py-0">
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition duration-500 group-hover/card:scale-[1.03]"
          sizes="(max-width:768px) 100vw, 50vw"
        />
      </div>
      <CardHeader className="pt-5">
        <Badge>{event.category}</Badge>
        <CardTitle className="font-display mt-2 text-xl font-normal tracking-tight">
          <Link href="/events" className="hover:text-primary">
            {event.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {event.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex-wrap gap-x-4 gap-y-2 pb-5 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="size-3.5 text-primary" />
          {formatDate(event.date)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-3.5 text-primary" />
          {event.time}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="size-3.5 text-primary" />
          {event.location}
        </span>
      </CardFooter>
    </Card>
  )
}

export function EventRow({ event }: { event: EventItem }) {
  return (
    <Link href="/events" className="group flex gap-4 py-3.5">
      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div className="min-w-0">
        <Badge variant="secondary">{event.category}</Badge>
        <p className="mt-1.5 truncate text-sm font-medium group-hover:text-primary">
          {event.title}
        </p>
        <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3 text-primary" />
          {event.location}
        </p>
      </div>
    </Link>
  )
}
