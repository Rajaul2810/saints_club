import type { Metadata } from "next"
import { CommitteeView } from "@/components/committee/committee-view"

export const metadata: Metadata = { title: "Board of Directors" }

export default function CommitteePage() {
  return <CommitteeView />
}
