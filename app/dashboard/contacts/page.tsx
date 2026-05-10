"use client"

import { ContactsTable } from "@/components/contacts-table"

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Contacts</h1>
        <p className="text-muted-foreground">
          Manage your contacts and relationships. Friend, good!
        </p>
      </div>

      <ContactsTable />
    </div>
  )
}
