import type { Metadata } from "next"
import { PageHero } from "@/components/shared/section-heading"
import { GalleryGrid } from "@/components/gallery/gallery-grid"

export const metadata: Metadata = { title: "Gallery" }

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Club life"
        title="Gallery"
        description="A demo collection of dining, facilities, sports, and member moments from around the house."
      />

      <section className="bg-[linear-gradient(180deg,var(--mist)_0%,transparent_18%)] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <GalleryGrid />
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Demo images for layout preview — replace with Club photography later.
          </p>
        </div>
      </section>
    </>
  )
}
