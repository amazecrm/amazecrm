"use client"

import { Users, DollarSign, TrendingUp, CheckCircle } from "lucide-react"
import { StatCard } from "@/components/stat-card"
import { RecentActivity } from "@/components/recent-activity"
import { DealsOverview } from "@/components/deals-overview"
import { TopContacts } from "@/components/top-contacts"
import { useCRM } from "@/lib/crm-context"
import { formatCurrency } from "@/lib/crm-store"

export default function DashboardPage() {
  const { stats } = useCRM()

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Amaze! Here&apos;s your CRM overview.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Contacts"
          value={stats.totalContacts}
          subtitle="Active relationships"
          icon={Users}
          trend={{ value: 12, label: "vs last month" }}
        />
        <StatCard
          title="Pipeline Value"
          value={formatCurrency(stats.totalPipeline)}
          subtitle="Open opportunities"
          icon={DollarSign}
          trend={{ value: 8, label: "vs last month" }}
        />
        <StatCard
          title="Won Revenue"
          value={formatCurrency(stats.totalWon)}
          subtitle="Closed deals"
          icon={TrendingUp}
          trend={{ value: 23, label: "vs last month" }}
        />
        <StatCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          subtitle="Win rate"
          icon={CheckCircle}
          trend={{ value: 5, label: "vs last month" }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DealsOverview />
        <TopContacts />
      </div>

      <RecentActivity />
    </div>
  )
}
