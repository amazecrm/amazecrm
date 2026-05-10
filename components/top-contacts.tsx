"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useCRM } from "@/lib/crm-context"
import { formatCurrency } from "@/lib/crm-store"
import { cn } from "@/lib/utils"

const statusColors: Record<string, string> = {
  lead: "bg-chart-4/20 text-chart-4",
  prospect: "bg-chart-2/20 text-chart-2",
  customer: "bg-chart-5/20 text-chart-5",
  churned: "bg-destructive/20 text-destructive",
}

export function TopContacts() {
  const { contacts, deals } = useCRM()

  // Get contacts with their total deal values
  const contactsWithDeals = contacts.map((contact) => {
    const contactDeals = deals.filter((d) => d.contactId === contact.id)
    const totalValue = contactDeals.reduce((sum, d) => sum + d.value, 0)
    return { ...contact, totalValue, dealCount: contactDeals.length }
  })

  // Sort by total value and take top 5
  const topContacts = contactsWithDeals
    .sort((a, b) => b.totalValue - a.totalValue)
    .slice(0, 5)

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Top Contacts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topContacts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No contacts yet.</p>
        ) : (
          topContacts.map((contact) => {
            const initials = contact.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)

            return (
              <Link
                key={contact.id}
                href={`/contacts/${contact.id}`}
                className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
              >
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-tight">
                    {contact.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {contact.company}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {formatCurrency(contact.totalValue)}
                  </p>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-[10px] capitalize",
                      statusColors[contact.status]
                    )}
                  >
                    {contact.status}
                  </Badge>
                </div>
              </Link>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}
