"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Contact, Deal, Activity } from './crm-types'
import { demoContacts, demoDeals, demoActivities, generateId } from './crm-store'
import { calculateCRMStats, type CRMStats } from './crm-stats'

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
  
  // Stats
  stats: CRMStats
}

const CRMContext = createContext<CRMContextType | undefined>(undefined)

export function CRMProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>(demoContacts)
  const [deals, setDeals] = useState<Deal[]>(demoDeals)
  const [activities, setActivities] = useState<Activity[]>(demoActivities)
  
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
  
  const stats = calculateCRMStats(contacts, deals, activities)
  
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
