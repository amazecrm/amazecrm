"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCRM } from "@/lib/crm-context"
import { formatCurrency } from "@/lib/crm-store"
import { DEAL_STAGES } from "@/lib/crm-types"
import { cn } from "@/lib/utils"

export function DealsOverview() {
  const { deals } = useCRM()

  // Calculate deals per stage
  const stageData = DEAL_STAGES.map((stage) => {
    const stageDeals = deals.filter((d) => d.stage === stage.value)
    const total = stageDeals.reduce((sum, d) => sum + d.value, 0)
    return {
      ...stage,
      count: stageDeals.length,
      total,
    }
  })

  const maxTotal = Math.max(...stageData.map((s) => s.total), 1)

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Pipeline Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stageData.map((stage) => (
          <div key={stage.value} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className={cn("h-2 w-2 rounded-full", stage.color)} />
                <span className="font-medium">{stage.label}</span>
                <span className="text-muted-foreground">({stage.count})</span>
              </div>
              <span className="font-medium">{formatCurrency(stage.total)}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className={cn("h-full transition-all duration-500", stage.color)}
                style={{ width: `${(stage.total / maxTotal) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
