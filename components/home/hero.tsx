import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { clubInfo } from "@/lib/data"

export function Hero() {
  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=2000&h=1400&fit=crop"
          alt="Saints Club Limited"
          fill
          priority
          className="object-cover object-center opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/55 to-ink/30" />
      </div>

      <div className="relative mx-auto flex min-h-[92svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-24 lg:justify-center">
        <div className="max-w-2xl">
          <p className="animate-rise text-[11px] font-medium tracking-[0.22em] text-white/55 uppercase">
            {clubInfo.name}
          </p>
          <h1 className="animate-rise-delay-1 font-display mt-5 text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Welcome to
            <span className="block italic">Saints Club Limited</span>
          </h1>
          <p className="animate-rise-delay-2 mt-6 max-w-lg text-[15px] leading-relaxed text-white/65">
            {clubInfo.tagline}
          </p>
          <div className="animate-rise-delay-3 mt-9 flex flex-wrap gap-3">
            <Link
              href="/membership"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-10 rounded-full bg-primary px-5 text-white hover:bg-primary/90"
              )}
            >
              Explore Membership
            </Link>
            <Link
              href="/facilities"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-10 rounded-full border-white/25 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white"
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
