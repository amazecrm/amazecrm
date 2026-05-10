"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCRM } from "@/lib/crm-context"
import { Activity, ACTIVITY_TYPES, ActivityType } from "@/lib/crm-types"

interface ActivityFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  activity?: Activity | null
}

export function ActivityFormDialog({
  open,
  onOpenChange,
  activity,
}: ActivityFormDialogProps) {
  const { addActivity, updateActivity, contacts, deals } = useCRM()
  const isEditing = !!activity

  const [formData, setFormData] = useState({
    type: "task" as ActivityType,
    title: "",
    description: "",
    contactId: "",
    dealId: "",
    dueDate: "",
    completed: false,
  })

  useEffect(() => {
    if (activity) {
      setFormData({
        type: activity.type,
        title: activity.title,
        description: activity.description || "",
        contactId: activity.contactId || "",
        dealId: activity.dealId || "",
        dueDate: activity.dueDate
          ? activity.dueDate.toISOString().split("T")[0]
          : "",
        completed: activity.completed,
      })
    } else {
      setFormData({
        type: "task",
        title: "",
        description: "",
        contactId: "",
        dealId: "",
        dueDate: new Date().toISOString().split("T")[0],
        completed: false,
      })
    }
  }, [activity])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const activityData = {
      type: formData.type,
      title: formData.title,
      description: formData.description || undefined,
      contactId: formData.contactId || undefined,
      dealId: formData.dealId || undefined,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
      completed: formData.completed,
    }

    if (isEditing && activity) {
      updateActivity(activity.id, activityData)
    } else {
      addActivity(activityData)
    }
    onOpenChange(false)
  }

  // Filter deals based on selected contact
  const availableDeals = formData.contactId
    ? deals.filter((d) => d.contactId === formData.contactId)
    : deals

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Activity" : "Add New Activity"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update the activity details below."
                : "Create a new activity to stay organized. Solve, good!"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: ActivityType) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ACTIVITY_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Follow up with prospect"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contact">Contact (Optional)</Label>
                <Select
                  value={formData.contactId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, contactId: value, dealId: "" })
                  }
                >
                  <SelectTrigger id="contact">
                    <SelectValue placeholder="Select contact" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {contacts.map((contact) => (
                      <SelectItem key={contact.id} value={contact.id}>
                        {contact.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="deal">Deal (Optional)</Label>
                <Select
                  value={formData.dealId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, dealId: value })
                  }
                >
                  <SelectTrigger id="deal">
                    <SelectValue placeholder="Select deal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {availableDeals.map((deal) => (
                      <SelectItem key={deal.id} value={deal.id}>
                        {deal.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Add details about this activity..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Save Changes" : "Create Activity"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
