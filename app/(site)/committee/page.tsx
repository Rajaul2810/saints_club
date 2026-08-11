import type { Metadata } from "next"
import { CommitteeView } from "@/components/committee/committee-view"

export const metadata: Metadata = { title: "Committee" }

export default function CommitteePage() {
  return <CommitteeView />
}
