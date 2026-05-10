"use client"

import { ActivitiesList } from "@/components/activities-list"
import { useCRM } from "@/lib/crm-context"

export default function ActivitiesPage() {
  const { stats } = useCRM()

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Activities</h1>
          <p className="text-muted-foreground">
            Track calls, emails, meetings, and tasks. Work together, good!
          </p>
        </div>
        {stats.pendingActivities > 0 && (
          <div className="rounded-lg bg-primary/10 px-4 py-2 border border-primary/20">
            <p className="text-sm font-medium text-primary">
              {stats.pendingActivities} pending{" "}
              {stats.pendingActivities === 1 ? "activity" : "activities"}
            </p>
          </div>
        )}
      </div>

      <ActivitiesList />
    </div>
  )
}
