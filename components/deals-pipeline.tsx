"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { formatCurrency, formatDate } from "@/lib/crm-store"
import { Deal, DEAL_STAGES, DealStage } from "@/lib/crm-types"
import { DealFormDialog } from "./deal-form-dialog"
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Plus,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"

const stageColors: Record<DealStage, string> = {
  discovery: "border-chart-3/50",
  proposal: "border-chart-2/50",
  negotiation: "border-chart-4/50",
  "closed-won": "border-chart-5/50",
  "closed-lost": "border-destructive/50",
}

const stageHeaderColors: Record<DealStage, string> = {
  discovery: "bg-chart-3/10",
  proposal: "bg-chart-2/10",
  negotiation: "bg-chart-4/10",
  "closed-won": "bg-chart-5/10",
  "closed-lost": "bg-destructive/10",
}

export function DealsPipeline() {
  const { deals, updateDeal, deleteDeal, getContact } = useCRM()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null)
  const [defaultStage, setDefaultStage] = useState<DealStage>("discovery")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [dealToDelete, setDealToDelete] = useState<Deal | null>(null)

  const handleAddNew = (stage: DealStage) => {
    setEditingDeal(null)
    setDefaultStage(stage)
    setDialogOpen(true)
  }

  const handleEdit = (deal: Deal) => {
    setEditingDeal(deal)
    setDialogOpen(true)
  }

  const handleDelete = (deal: Deal) => {
    setDealToDelete(deal)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (dealToDelete) {
      deleteDeal(dealToDelete.id)
    }
    setDeleteDialogOpen(false)
    setDealToDelete(null)
  }

  const moveToStage = (deal: Deal, stage: DealStage) => {
    const probability =
      stage === "closed-won"
        ? 100
        : stage === "closed-lost"
        ? 0
        : deal.probability
    updateDeal(deal.id, { stage, probability })
  }

  const getNextStage = (current: DealStage): DealStage | null => {
    const stages: DealStage[] = ["discovery", "proposal", "negotiation", "closed-won"]
    const idx = stages.indexOf(current)
    return idx < stages.length - 1 ? stages[idx + 1] : null
  }

  const getPrevStage = (current: DealStage): DealStage | null => {
    const stages: DealStage[] = ["discovery", "proposal", "negotiation"]
    const idx = stages.indexOf(current)
    return idx > 0 ? stages[idx - 1] : null
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 overflow-x-auto pb-4">
        {DEAL_STAGES.map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage.value)
          const totalValue = stageDeals.reduce((sum, d) => sum + d.value, 0)

          return (
            <div key={stage.value} className="w-[320px] shrink-0">
              <Card className={cn("border-t-2", stageColors[stage.value])}>
                <CardHeader
                  className={cn(
                    "py-3 px-4",
                    stageHeaderColors[stage.value]
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-sm font-medium">
                        {stage.label}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {stageDeals.length} deals · {formatCurrency(totalValue)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleAddNew(stage.value)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 p-3">
                  {stageDeals.length === 0 ? (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                      No deals in this stage
                    </p>
                  ) : (
                    stageDeals.map((deal) => {
                      const contact = getContact(deal.contactId)
                      const nextStage = getNextStage(deal.stage)
                      const prevStage = getPrevStage(deal.stage)

                      return (
                        <Card
                          key={deal.id}
                          className="cursor-pointer transition-colors hover:bg-muted/50"
                        >
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="space-y-1.5 flex-1">
                                <p className="font-medium text-sm leading-tight">
                                  {deal.title}
                                </p>
                                {contact && (
                                  <p className="text-xs text-muted-foreground">
                                    {contact.name} · {contact.company}
                                  </p>
                                )}
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 shrink-0"
                                  >
                                    <MoreHorizontal className="h-3 w-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => handleEdit(deal)}
                                  >
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  {prevStage && (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        moveToStage(deal, prevStage)
                                      }
                                    >
                                      <ArrowLeft className="mr-2 h-4 w-4" />
                                      Move to{" "}
                                      {
                                        DEAL_STAGES.find(
                                          (s) => s.value === prevStage
                                        )?.label
                                      }
                                    </DropdownMenuItem>
                                  )}
                                  {nextStage && (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        moveToStage(deal, nextStage)
                                      }
                                    >
                                      <ArrowRight className="mr-2 h-4 w-4" />
                                      Move to{" "}
                                      {
                                        DEAL_STAGES.find(
                                          (s) => s.value === nextStage
                                        )?.label
                                      }
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => handleDelete(deal)}
                                    className="text-destructive focus:text-destructive"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                              <p className="text-sm font-semibold">
                                {formatCurrency(deal.value)}
                              </p>
                              <Badge
                                variant="secondary"
                                className="text-[10px]"
                              >
                                {deal.probability}% likely
                              </Badge>
                            </div>

                            <p className="mt-2 text-[10px] text-muted-foreground">
                              Close by {formatDate(deal.expectedCloseDate)}
                            </p>
                          </CardContent>
                        </Card>
                      )
                    })
                  )}
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>

      <DealFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        deal={editingDeal}
        defaultStage={defaultStage}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Deal</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{dealToDelete?.title}&quot;?
              This will also remove all associated activities. This action
              cannot be undone.
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
