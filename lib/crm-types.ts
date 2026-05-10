export interface Contact {
  id: string
  name: string
  email: string
  company: string
  phone: string
  status: 'lead' | 'prospect' | 'customer' | 'churned'
  avatar?: string
  createdAt: Date
  lastContact?: Date
  notes?: string
}

export interface Deal {
  id: string
  title: string
  value: number
  stage: 'discovery' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost'
  contactId: string
  probability: number
  expectedCloseDate: Date
  createdAt: Date
  notes?: string
}

export interface Activity {
  id: string
  type: 'call' | 'email' | 'meeting' | 'task' | 'note'
  title: string
  description?: string
  contactId?: string
  dealId?: string
  completed: boolean
  dueDate?: Date
  createdAt: Date
}

export type DealStage = Deal['stage']
export type ContactStatus = Contact['status']
export type ActivityType = Activity['type']

export const DEAL_STAGES: { value: DealStage; label: string; color: string }[] = [
  { value: 'discovery', label: 'Discovery', color: 'bg-chart-3' },
  { value: 'proposal', label: 'Proposal', color: 'bg-chart-2' },
  { value: 'negotiation', label: 'Negotiation', color: 'bg-chart-4' },
  { value: 'closed-won', label: 'Closed Won', color: 'bg-chart-5' },
  { value: 'closed-lost', label: 'Closed Lost', color: 'bg-destructive' },
]

export const CONTACT_STATUSES: { value: ContactStatus; label: string }[] = [
  { value: 'lead', label: 'Lead' },
  { value: 'prospect', label: 'Prospect' },
  { value: 'customer', label: 'Customer' },
  { value: 'churned', label: 'Churned' },
]

export const ACTIVITY_TYPES: { value: ActivityType; label: string; icon: string }[] = [
  { value: 'call', label: 'Call', icon: 'phone' },
  { value: 'email', label: 'Email', icon: 'mail' },
  { value: 'meeting', label: 'Meeting', icon: 'calendar' },
  { value: 'task', label: 'Task', icon: 'check-square' },
  { value: 'note', label: 'Note', icon: 'file-text' },
]
