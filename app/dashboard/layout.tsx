"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { CRMProvider } from "@/lib/crm-context"
import { Separator } from "@/components/ui/separator"
import { GlobalSearch, GlobalSearchTrigger } from "@/components/global-search"

function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b border-border px-6">
          <SidebarTrigger className="-ml-2" />
          <Separator orientation="vertical" className="h-6" />
          <div className="flex-1" />
          <GlobalSearchTrigger onClick={() => setSearchOpen(true)} />
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
        <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default function CRMLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CRMProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </CRMProvider>
  )
}
