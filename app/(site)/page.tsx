import { Hero } from "@/components/home/hero"
import {
  HomeIntro,
  HomePrinciples,
  HomeWelcome,
  HomeQuickLinks,
  HomeEvents,
  HomeNotices,
  HomeCta,
} from "@/components/home/sections"

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeIntro />
      <HomePrinciples />
      <HomeWelcome />
      <HomeQuickLinks />
      <HomeEvents />
      <HomeNotices />
      <HomeCta />
    </>
  )
}
