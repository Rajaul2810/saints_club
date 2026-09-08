import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { GovernanceRulePage } from "@/components/governance/rule-page"
import { getGovernanceRule, governanceRules } from "@/lib/data"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return governanceRules.map((rule) => ({ slug: rule.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const rule = getGovernanceRule(slug)
  if (!rule) return { title: "Governance" }
  return { title: rule.title }
}

export default async function GovernanceRuleRoute({ params }: Props) {
  const { slug } = await params
  const rule = getGovernanceRule(slug)
  if (!rule) notFound()
  return <GovernanceRulePage rule={rule} />
}
