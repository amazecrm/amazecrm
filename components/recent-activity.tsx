"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useCRM } from "@/lib/crm-context"
import { formatRelativeTime } from "@/lib/crm-store"
import { Phone, Mail, Calendar, CheckSquare, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { ActivityType } from "@/lib/crm-types"

const activityIcons: Record<ActivityType, React.ElementType> = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  task: CheckSquare,
  note: FileText,
}

export function RecentActivity() {
  const { activities, toggleActivityComplete, getContact } = useCRM()

  // Get most recent activities sorted by date
  const recentActivities = [...activities]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5)

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivities.length === 0 ? (
          <p className="text-sm text-muted-foreground">No activities yet.</p>
        ) : (
          recentActivities.map((activity) => {
            const Icon = activityIcons[activity.type]
            const contact = activity.contactId ? getContact(activity.contactId) : null

            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
              >
                <Checkbox
                  checked={activity.completed}
                  onCheckedChange={() => toggleActivityComplete(activity.id)}
                  className="mt-1"
                />
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    activity.completed ? "bg-muted" : "bg-primary/10"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      activity.completed ? "text-muted-foreground" : "text-primary"
                    )}
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <p
                    className={cn(
                      "text-sm font-medium leading-tight",
                      activity.completed && "line-through text-muted-foreground"
                    )}
                  >
                    {activity.title}
                  </p>
                  <div className="flex items-center gap-2">
                    {contact && (
                      <span className="text-xs text-muted-foreground">
                        {contact.name}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {formatRelativeTime(activity.createdAt)}
                    </span>
                  </div>
                </div>
                <Badge variant="secondary" className="shrink-0 text-xs capitalize">
                  {activity.type}
                </Badge>
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}
