import Image from "next/image"
import Link from "next/link"
import { CalendarDays, UserRound } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { type NewsItem, formatDate } from "@/lib/data"

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Card className="h-full gap-0 py-0">
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition duration-500 group-hover/card:scale-[1.03]"
          sizes="(max-width:768px) 100vw, 33vw"
        />
      </div>
      <CardHeader className="pt-5">
        <Badge>{item.tag}</Badge>
        <CardTitle className="font-display mt-2 text-xl font-normal tracking-tight">
          <Link href="/news" className="hover:text-primary">
            {item.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-3">{item.excerpt}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex-wrap gap-x-4 gap-y-2 pb-5 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="size-3.5 text-primary" />
          {formatDate(item.date)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <UserRound className="size-3.5 text-primary" />
          {item.author}
        </span>
      </CardFooter>
    </Card>
  )
}
