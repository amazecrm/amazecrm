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
import { Deal, DEAL_STAGES, DealStage } from "@/lib/crm-types"

interface DealFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  deal?: Deal | null
  defaultStage?: DealStage
}

export function DealFormDialog({
  open,
  onOpenChange,
  deal,
  defaultStage = "discovery",
}: DealFormDialogProps) {
  const { addDeal, updateDeal, contacts } = useCRM()
  const isEditing = !!deal

  const [formData, setFormData] = useState({
    title: "",
    value: "",
    stage: defaultStage as DealStage,
    contactId: "",
    probability: "50",
    expectedCloseDate: "",
    notes: "",
  })

  useEffect(() => {
    if (deal) {
      setFormData({
        title: deal.title,
        value: deal.value.toString(),
        stage: deal.stage,
        contactId: deal.contactId,
        probability: deal.probability.toString(),
        expectedCloseDate: deal.expectedCloseDate.toISOString().split("T")[0],
        notes: deal.notes || "",
      })
    } else {
      setFormData({
        title: "",
        value: "",
        stage: defaultStage,
        contactId: contacts[0]?.id || "",
        probability: "50",
        expectedCloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        notes: "",
      })
    }
  }, [deal, defaultStage, contacts])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const dealData = {
      title: formData.title,
      value: parseFloat(formData.value) || 0,
      stage: formData.stage,
      contactId: formData.contactId,
      probability: parseInt(formData.probability) || 50,
      expectedCloseDate: new Date(formData.expectedCloseDate),
      notes: formData.notes || undefined,
    }

    if (isEditing && deal) {
      updateDeal(deal.id, dealData)
    } else {
      addDeal(dealData)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Deal" : "Add New Deal"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update the deal information below."
                : "Fill in the details to create a new deal. Good, good!"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Deal Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Spacecraft Navigation System"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="value">Value ($)</Label>
                <Input
                  id="value"
                  type="number"
                  min="0"
                  step="1000"
                  value={formData.value}
                  onChange={(e) =>
                    setFormData({ ...formData, value: e.target.value })
                  }
                  placeholder="100000"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="probability">Probability (%)</Label>
                <Input
                  id="probability"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.probability}
                  onChange={(e) =>
                    setFormData({ ...formData, probability: e.target.value })
                  }
                  placeholder="50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contact">Contact</Label>
                <Select
                  value={formData.contactId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, contactId: value })
                  }
                >
                  <SelectTrigger id="contact">
                    <SelectValue placeholder="Select contact" />
                  </SelectTrigger>
                  <SelectContent>
                    {contacts.map((contact) => (
                      <SelectItem key={contact.id} value={contact.id}>
                        {contact.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stage">Stage</Label>
                <Select
                  value={formData.stage}
                  onValueChange={(value: DealStage) =>
                    setFormData({ ...formData, stage: value })
                  }
                >
                  <SelectTrigger id="stage">
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEAL_STAGES.map((stage) => (
                      <SelectItem key={stage.value} value={stage.value}>
                        {stage.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="expectedCloseDate">Expected Close Date</Label>
              <Input
                id="expectedCloseDate"
                type="date"
                value={formData.expectedCloseDate}
                onChange={(e) =>
                  setFormData({ ...formData, expectedCloseDate: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Add any relevant notes..."
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
              {isEditing ? "Save Changes" : "Create Deal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
