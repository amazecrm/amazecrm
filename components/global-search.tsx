"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useCRM, SearchResult } from "@/lib/crm-context"
import { 
  Users, 
  Building2, 
  Kanban, 
  FileText, 
  CheckSquare, 
  StickyNote,
  Clock,
  Search,
  ArrowRight
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/crm-store"
import { Contact, Deal, Activity } from "@/lib/crm-types"

interface GlobalSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const typeIcons = {
  contact: Users,
  company: Building2,
  deal: Kanban,
  activity: FileText,
  task: CheckSquare,
  note: StickyNote,
}

const typeLabels = {
  contact: "Contact",
  company: "Company",
  deal: "Deal",
  activity: "Activity",
  task: "Task",
  note: "Note",
}

const typeColors = {
  contact: "bg-blue-500/10 text-blue-500",
  company: "bg-purple-500/10 text-purple-500",
  deal: "bg-green-500/10 text-green-500",
  activity: "bg-orange-500/10 text-orange-500",
  task: "bg-yellow-500/10 text-yellow-500",
  note: "bg-gray-500/10 text-gray-500",
}

function getResultId(result: SearchResult): string {
  if (result.type === 'company') {
    return `company-${result.item.name}`
  }
  if (result.type === 'note') {
    return `note-${result.item.title}-${result.item.content.slice(0, 20)}`
  }
  return `${result.type}-${result.item.id}`
}

function getResultUrl(result: SearchResult): string {
  switch (result.type) {
    case 'contact':
      return `/dashboard/contacts`
    case 'company':
      return `/dashboard/contacts`
    case 'deal':
      return `/dashboard/deals`
    case 'activity':
    case 'task':
      return `/dashboard/activities`
    case 'note':
      if (result.item.sourceType === 'contact') return `/dashboard/contacts`
      if (result.item.sourceType === 'deal') return `/dashboard/deals`
      return `/dashboard/activities`
    default:
      return `/dashboard`
  }
}

function getResultTitle(result: SearchResult, contacts: Contact[]): string {
  switch (result.type) {
    case 'contact':
      return result.item.name
    case 'company':
      return result.item.name
    case 'deal': {
      const contact = contacts.find(c => c.id === result.item.contactId)
      return result.item.title
    }
    case 'activity':
    case 'task':
      return result.item.title
    case 'note':
      return result.item.title
    default:
      return "Unknown"
  }
}

function getResultSubtitle(result: SearchResult, contacts: Contact[]): string {
  switch (result.type) {
    case 'contact':
      return `${result.item.email} • ${result.item.company}`
    case 'company':
      return `${result.item.contacts.length} contact${result.item.contacts.length !== 1 ? 's' : ''}`
    case 'deal': {
      const contact = contacts.find(c => c.id === result.item.contactId)
      return `${formatCurrency(result.item.value)} • ${contact?.name || 'No contact'}`
    }
    case 'activity':
    case 'task': {
      const contact = result.item.contactId ? contacts.find(c => c.id === result.item.contactId) : null
      const parts = [result.item.type]
      if (contact) parts.push(contact.name)
      if (result.item.dueDate) {
        parts.push(new Date(result.item.dueDate).toLocaleDateString())
      }
      return parts.join(' • ')
    }
    case 'note':
      return result.item.content.slice(0, 60) + (result.item.content.length > 60 ? '...' : '')
    default:
      return ""
  }
}

export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const { search, recentItems, addRecentItem, contacts } = useCRM()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const router = useRouter()

  // Search when query changes
  useEffect(() => {
    if (query.trim()) {
      setResults(search(query))
    } else {
      setResults([])
    }
  }, [query, search])

  // Reset query when dialog closes
  useEffect(() => {
    if (!open) {
      setQuery("")
      setResults([])
    }
  }, [open])

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        onOpenChange(!open)
      }
      // ESC to close
      if (e.key === "Escape" && open) {
        onOpenChange(false)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, onOpenChange])

  const handleSelect = useCallback((result: SearchResult) => {
    addRecentItem(result)
    onOpenChange(false)
    router.push(getResultUrl(result))
  }, [addRecentItem, onOpenChange, router])

  // Group results by type
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = []
    }
    acc[result.type].push(result)
    return acc
  }, {} as Record<string, SearchResult[]>)

  // Type order for display
  const typeOrder: SearchResult['type'][] = ['contact', 'company', 'deal', 'activity', 'task', 'note']

  const showRecent = !query.trim() && recentItems.length > 0

  return (
    <CommandDialog 
      open={open} 
      onOpenChange={onOpenChange}
      title="Search"
      description="Search across contacts, companies, deals, activities, and notes"
    >
      <CommandInput 
        placeholder="Search contacts, companies, deals, notes..." 
        value={query}
        onValueChange={setQuery}
      />
      <CommandList className="max-h-[60vh]">
        <CommandEmpty>No results found.</CommandEmpty>
        
        {showRecent && (
          <CommandGroup heading="Recent">
            {recentItems.map((result) => {
              const Icon = typeIcons[result.type]
              return (
                <CommandItem
                  key={`recent-${getResultId(result)}`}
                  onSelect={() => handleSelect(result)}
                  className="flex items-center gap-3 py-2"
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-md ${typeColors[result.type]}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">
                        {getResultTitle(result, contacts)}
                      </span>
                      <Badge variant="secondary" className="text-[10px] px-1 py-0">
                        {typeLabels[result.type]}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {getResultSubtitle(result, contacts)}
                    </p>
                  </div>
                  <Clock className="h-3 w-3 text-muted-foreground" />
                </CommandItem>
              )
            })}
          </CommandGroup>
        )}

        {showRecent && results.length > 0 && <CommandSeparator />}

        {typeOrder.map((type) => {
          const typeResults = groupedResults[type]
          if (!typeResults || typeResults.length === 0) return null

          return (
            <CommandGroup key={type} heading={typeLabels[type]}>
              {typeResults.map((result) => {
                const Icon = typeIcons[type]
                return (
                  <CommandItem
                    key={getResultId(result)}
                    onSelect={() => handleSelect(result)}
                    className="flex items-center gap-3 py-2"
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-md ${typeColors[type]}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">
                          {getResultTitle(result, contacts)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {getResultSubtitle(result, contacts)}
                      </p>
                    </div>
                    <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-data-[selected=true]:opacity-100" />
                  </CommandItem>
                )
              })}
            </CommandGroup>
          )
        })}
      </CommandList>
    </CommandDialog>
  )
}

// Trigger button component for the header
export function GlobalSearchTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      <Search className="h-4 w-4" />
      <span className="hidden sm:inline">Search...</span>
      <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  )
}