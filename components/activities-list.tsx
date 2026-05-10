"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useCRM } from "@/lib/crm-context"
import { formatDate, formatRelativeTime } from "@/lib/crm-store"
import { Activity, ActivityType } from "@/lib/crm-types"
import { ActivityFormDialog } from "./activity-form-dialog"
import {
  Phone,
  Mail,
  Calendar,
  CheckSquare,
  FileText,
  MoreHorizontal,
  Pencil,
  Trash2,
  Search,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"

const activityIcons: Record<ActivityType, React.ElementType> = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  task: CheckSquare,
  note: FileText,
}

const activityColors: Record<ActivityType, string> = {
  call: "bg-chart-1/10 text-chart-1",
  email: "bg-chart-2/10 text-chart-2",
  meeting: "bg-chart-3/10 text-chart-3",
  task: "bg-chart-4/10 text-chart-4",
  note: "bg-chart-5/10 text-chart-5",
}

export function ActivitiesList() {
  const {
    activities,
    toggleActivityComplete,
    deleteActivity,
    getContact,
    getDeal,
  } = useCRM()
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [activityToDelete, setActivityToDelete] = useState<Activity | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const filteredActivities = activities
    .filter((activity) => {
      const matchesSearch =
        activity.title.toLowerCase().includes(search.toLowerCase()) ||
        activity.description?.toLowerCase().includes(search.toLowerCase())

      if (activeTab === "all") return matchesSearch
      if (activeTab === "pending") return matchesSearch && !activity.completed
      if (activeTab === "completed") return matchesSearch && activity.completed
      return matchesSearch && activity.type === activeTab
    })
    .sort((a, b) => {
      // Sort by: incomplete first, then by due date
      if (a.completed !== b.completed) return a.completed ? 1 : -1
      if (a.dueDate && b.dueDate) return a.dueDate.getTime() - b.dueDate.getTime()
      return b.createdAt.getTime() - a.createdAt.getTime()
    })

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity)
    setDialogOpen(true)
  }

  const handleDelete = (activity: Activity) => {
    setActivityToDelete(activity)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (activityToDelete) {
      deleteActivity(activityToDelete.id)
    }
    setDeleteDialogOpen(false)
    setActivityToDelete(null)
  }

  const handleAddNew = () => {
    setEditingActivity(null)
    setDialogOpen(true)
  }

  const pendingCount = activities.filter((a) => !a.completed).length
  const completedCount = activities.filter((a) => a.completed).length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search activities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add Activity
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All ({activities.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4 space-y-3">
          {filteredActivities.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">
                  {search
                    ? "No activities found matching your search."
                    : "No activities yet. Create your first activity!"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredActivities.map((activity) => {
              const Icon = activityIcons[activity.type]
              const contact = activity.contactId
                ? getContact(activity.contactId)
                : null
              const deal = activity.dealId ? getDeal(activity.dealId) : null
              const isOverdue =
                activity.dueDate &&
                !activity.completed &&
                activity.dueDate < new Date()

              return (
                <Card
                  key={activity.id}
                  className={cn(
                    "transition-colors",
                    activity.completed && "opacity-60"
                  )}
                >
                  <CardContent className="flex items-start gap-4 p-4">
                    <Checkbox
                      checked={activity.completed}
                      onCheckedChange={() =>
                        toggleActivityComplete(activity.id)
                      }
                      className="mt-1"
                    />

                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                        activityColors[activity.type]
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={cn(
                            "font-medium",
                            activity.completed &&
                              "line-through text-muted-foreground"
                          )}
                        >
                          {activity.title}
                        </p>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEdit(activity)}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(activity)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {activity.description && (
                        <p className="text-sm text-muted-foreground">
                          {activity.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <Badge
                          variant="secondary"
                          className={cn("text-xs capitalize", activityColors[activity.type])}
                        >
                          {activity.type}
                        </Badge>

                        {contact && (
                          <Badge variant="outline" className="text-xs">
                            {contact.name}
                          </Badge>
                        )}

                        {deal && (
                          <Badge variant="outline" className="text-xs">
                            {deal.title}
                          </Badge>
                        )}

                        {activity.dueDate && (
                          <span
                            className={cn(
                              "text-xs",
                              isOverdue
                                ? "text-destructive font-medium"
                                : "text-muted-foreground"
                            )}
                          >
                            {isOverdue ? "Overdue: " : "Due: "}
                            {formatDate(activity.dueDate)}
                          </span>
                        )}

                        <span className="text-xs text-muted-foreground">
                          Created {formatRelativeTime(activity.createdAt)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </TabsContent>
      </Tabs>

      <ActivityFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        activity={editingActivity}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Activity</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{activityToDelete?.title}
              &quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
