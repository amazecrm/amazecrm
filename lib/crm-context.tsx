"use client"

import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react'
import { Contact, Deal, Activity } from './crm-types'
import { demoContacts, demoDeals, demoActivities, generateId } from './crm-store'

export type SearchResult =
  | { type: 'contact'; item: Contact }
  | { type: 'deal'; item: Deal }
  | { type: 'activity'; item: Activity }
  | { type: 'company'; item: { name: string; contacts: Contact[] } }
  | { type: 'task'; item: Activity }
  | { type: 'note'; item: { title: string; content: string; source: Contact | Deal | Activity; sourceType: 'contact' | 'deal' | 'activity' } }

interface CRMContextType {
  // Contacts
  contacts: Contact[]
  addContact: (contact: Omit<Contact, 'id' | 'createdAt'>) => void
  updateContact: (id: string, contact: Partial<Contact>) => void
  deleteContact: (id: string) => void
  getContact: (id: string) => Contact | undefined
  
  // Deals
  deals: Deal[]
  addDeal: (deal: Omit<Deal, 'id' | 'createdAt'>) => void
  updateDeal: (id: string, deal: Partial<Deal>) => void
  deleteDeal: (id: string) => void
  getDeal: (id: string) => Deal | undefined
  
  // Activities
  activities: Activity[]
  addActivity: (activity: Omit<Activity, 'id' | 'createdAt'>) => void
  updateActivity: (id: string, activity: Partial<Activity>) => void
  deleteActivity: (id: string) => void
  toggleActivityComplete: (id: string) => void
  
  // Search
  search: (query: string) => SearchResult[]
  recentItems: SearchResult[]
  addRecentItem: (item: SearchResult) => void
  
  // Stats
  stats: {
    totalContacts: number
    totalDeals: number
    totalPipeline: number
    totalWon: number
    conversionRate: number
    pendingActivities: number
  }
}

const CRMContext = createContext<CRMContextType | undefined>(undefined)

export function CRMProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>(demoContacts)
  const [deals, setDeals] = useState<Deal[]>(demoDeals)
  const [activities, setActivities] = useState<Activity[]>(demoActivities)
  const [recentItems, setRecentItems] = useState<SearchResult[]>([])
  
  // Contact operations
  const addContact = useCallback((contact: Omit<Contact, 'id' | 'createdAt'>) => {
    const newContact: Contact = {
      ...contact,
      id: generateId(),
      createdAt: new Date(),
    }
    setContacts(prev => [...prev, newContact])
  }, [])
  
  const updateContact = useCallback((id: string, contact: Partial<Contact>) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, ...contact } : c))
  }, [])
  
  const deleteContact = useCallback((id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id))
    // Also remove associated deals and activities
    setDeals(prev => prev.filter(d => d.contactId !== id))
    setActivities(prev => prev.filter(a => a.contactId !== id))
  }, [])
  
  const getContact = useCallback((id: string) => {
    return contacts.find(c => c.id === id)
  }, [contacts])
  
  // Deal operations
  const addDeal = useCallback((deal: Omit<Deal, 'id' | 'createdAt'>) => {
    const newDeal: Deal = {
      ...deal,
      id: generateId(),
      createdAt: new Date(),
    }
    setDeals(prev => [...prev, newDeal])
  }, [])
  
  const updateDeal = useCallback((id: string, deal: Partial<Deal>) => {
    setDeals(prev => prev.map(d => d.id === id ? { ...d, ...deal } : d))
  }, [])
  
  const deleteDeal = useCallback((id: string) => {
    setDeals(prev => prev.filter(d => d.id !== id))
    setActivities(prev => prev.filter(a => a.dealId !== id))
  }, [])
  
  const getDeal = useCallback((id: string) => {
    return deals.find(d => d.id === id)
  }, [deals])
  
  // Activity operations
  const addActivity = useCallback((activity: Omit<Activity, 'id' | 'createdAt'>) => {
    const newActivity: Activity = {
      ...activity,
      id: generateId(),
      createdAt: new Date(),
    }
    setActivities(prev => [...prev, newActivity])
  }, [])
  
  const updateActivity = useCallback((id: string, activity: Partial<Activity>) => {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, ...activity } : a))
  }, [])
  
  const deleteActivity = useCallback((id: string) => {
    setActivities(prev => prev.filter(a => a.id !== id))
  }, [])
  
  const toggleActivityComplete = useCallback((id: string) => {
    setActivities(prev => prev.map(a => 
      a.id === id ? { ...a, completed: !a.completed } : a
    ))
  }, [])
  
  // Search functionality with fuzzy matching
  const search = useCallback((query: string): SearchResult[] => {
    if (!query.trim()) return []
    
    const normalizedQuery = query.toLowerCase().trim()
    const results: SearchResult[] = []
    const seenIds = new Set<string>()
    
    // Helper for fuzzy matching
    const matches = (text: string) => text.toLowerCase().includes(normalizedQuery)
    
    // Search contacts
    contacts.forEach(contact => {
      if (matches(contact.name) || matches(contact.email) || matches(contact.company)) {
        results.push({ type: 'contact', item: contact })
        seenIds.add(`contact-${contact.id}`)
      }
    })
    
    // Search companies (grouped by company name from contacts)
    const companyMap = new Map<string, Contact[]>()
    contacts.forEach(contact => {
      if (!companyMap.has(contact.company)) {
        companyMap.set(contact.company, [])
      }
      companyMap.get(contact.company)!.push(contact)
    })
    
    companyMap.forEach((companyContacts, companyName) => {
      if (matches(companyName) && !seenIds.has(`company-${companyName}`)) {
        results.push({ type: 'company', item: { name: companyName, contacts: companyContacts } })
        seenIds.add(`company-${companyName}`)
      }
    })
    
    // Search deals
    deals.forEach(deal => {
      const contact = contacts.find(c => c.id === deal.contactId)
      if (matches(deal.title) || (contact && matches(contact.name))) {
        results.push({ type: 'deal', item: deal })
        seenIds.add(`deal-${deal.id}`)
      }
    })
    
    // Search activities
    activities.forEach(activity => {
      const contact = activity.contactId ? contacts.find(c => c.id === activity.contactId) : undefined
      if (matches(activity.title) || (activity.description && matches(activity.description)) || (contact && matches(contact.name))) {
        results.push({ type: 'activity', item: activity })
        seenIds.add(`activity-${activity.id}`)
        
        // Also add as task if it's a task type
        if (activity.type === 'task') {
          results.push({ type: 'task', item: activity })
        }
      }
    })
    
    // Search notes from contacts
    contacts.forEach(contact => {
      if (contact.notes && matches(contact.notes)) {
        results.push({ 
          type: 'note', 
          item: { 
            title: `Note on ${contact.name}`, 
            content: contact.notes,
            source: contact,
            sourceType: 'contact'
          } 
        })
      }
    })
    
    // Search notes from deals
    deals.forEach(deal => {
      if (deal.notes && matches(deal.notes)) {
        const contact = contacts.find(c => c.id === deal.contactId)
        results.push({ 
          type: 'note', 
          item: { 
            title: `Note on ${deal.title}`, 
            content: deal.notes,
            source: { ...deal, contactName: contact?.name } as Deal & { contactName?: string },
            sourceType: 'deal'
          } 
        })
      }
    })
    
    // Search notes from activities (descriptions)
    activities.forEach(activity => {
      if (activity.description && matches(activity.description) && !matches(activity.title)) {
        results.push({ 
          type: 'note', 
          item: { 
            title: activity.title, 
            content: activity.description,
            source: activity,
            sourceType: 'activity'
          } 
        })
      }
    })
    
    return results.slice(0, 20) // Limit results
  }, [contacts, deals, activities])
  
  // Add to recent items
  const addRecentItem = useCallback((item: SearchResult) => {
    setRecentItems(prev => {
      // Remove if already exists
      const filtered = prev.filter(r => {
        if (r.type !== item.type) return true
        if ('id' in r.item && 'id' in item.item) {
          return r.item.id !== item.item.id
        }
        return true
      })
      // Add to front and limit to 10
      return [item, ...filtered].slice(0, 10)
    })
  }, [])
  
  // Calculate stats
  const wonDeals = deals.filter(d => d.stage === 'closed-won')
  const lostDeals = deals.filter(d => d.stage === 'closed-lost')
  const openDeals = deals.filter(d => !['closed-won', 'closed-lost'].includes(d.stage))
  
  const stats = {
    totalContacts: contacts.length,
    totalDeals: deals.length,
    totalPipeline: openDeals.reduce((sum, d) => sum + d.value, 0),
    totalWon: wonDeals.reduce((sum, d) => sum + d.value, 0),
    conversionRate: wonDeals.length + lostDeals.length > 0 
      ? Math.round((wonDeals.length / (wonDeals.length + lostDeals.length)) * 100) 
      : 0,
    pendingActivities: activities.filter(a => !a.completed).length,
  }
  
  return (
    <CRMContext.Provider value={{
      contacts,
      addContact,
      updateContact,
      deleteContact,
      getContact,
      deals,
      addDeal,
      updateDeal,
      deleteDeal,
      getDeal,
      activities,
      addActivity,
      updateActivity,
      deleteActivity,
      toggleActivityComplete,
      search,
      recentItems,
      addRecentItem,
      stats,
    }}>
      {children}
    </CRMContext.Provider>
  )
}

export function useCRM() {
  const context = useContext(CRMContext)
  if (context === undefined) {
    throw new Error('useCRM must be used within a CRMProvider')
  }
  return context
}
