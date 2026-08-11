import { Hero } from "@/components/home/hero"
import {
  HomeIntro,
  HomeEvents,
  HomeActivities,
  HomeNews,
  HomeNotices,
  HomeCta,
} from "@/components/home/sections"

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeIntro />
      <HomeEvents />
      <HomeActivities />
      <HomeNews />
      <HomeNotices />
      <HomeCta />
    </>
  )
}
