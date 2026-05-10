"use client"

import { DealsPipeline } from "@/components/deals-pipeline"
import { useCRM } from "@/lib/crm-context"
import { formatCurrency } from "@/lib/crm-store"

export default function DealsPage() {
  const { stats } = useCRM()

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Deals</h1>
          <p className="text-muted-foreground">
            Manage your sales pipeline. Understand, good!
          </p>
        </div>
        <div className="rounded-lg bg-card p-4 border border-border">
          <p className="text-sm text-muted-foreground">Pipeline Value</p>
          <p className="text-2xl font-bold">{formatCurrency(stats.totalPipeline)}</p>
        </div>
      </div>

      <DealsPipeline />
    </div>
  )
}
