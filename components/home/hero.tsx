import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { clubInfo } from "@/lib/data"

export function Hero() {
  return (
    <section className="relative isolate min-h-svh overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=2400&h=1600&fit=crop"
          alt="Dining at Saints Club"
          fill
          priority
          className="animate-hero-zoom object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/50 to-ink/25" />
        <div className="absolute inset-0 bg-linear-to-r from-ink/55 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20 lg:justify-center lg:pb-24">
        <div className="max-w-3xl">
          <p className="animate-rise text-[11px] font-medium tracking-[0.24em] text-white/60 uppercase">
            Established for alumni of seven schools
          </p>
          <h1 className="animate-rise-delay-1 font-display mt-4 text-5xl leading-[0.98] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.25rem]">
            Saints Club
            <span className="mt-1 block text-[0.72em] font-normal text-white/90 italic sm:mt-2">
              Limited
            </span>
          </h1>
          <p className="animate-rise-delay-2 mt-6 max-w-md text-[15px] leading-relaxed text-white/70 sm:text-base">
            {clubInfo.tagline}
          </p>
          <div className="animate-rise-delay-3 mt-9 flex flex-wrap gap-3">
            <Link
              href="/membership"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 rounded-full bg-primary px-6 text-white shadow-lg shadow-primary/25 hover:bg-primary/90"
              )}
            >
              Explore Membership
            </Link>
            <Link
              href="/facilities"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-11 rounded-full border-white/30 bg-white/5 px-6 text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
              )}
            >
              Club Facilities
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
