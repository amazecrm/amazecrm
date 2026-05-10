"use client"

import { Contact, Deal, Activity } from './crm-types'

// Demo data - Rocky would approve of this collaborative approach!
export const demoContacts: Contact[] = [
  {
    id: '1',
    name: 'Dr. Eva Stratt',
    email: 'eva.stratt@esa.gov',
    company: 'European Space Agency',
    phone: '+1 555-0101',
    status: 'customer',
    createdAt: new Date('2024-01-15'),
    lastContact: new Date('2024-03-10'),
    notes: 'Key decision maker. Very direct communication style.',
  },
  {
    id: '2',
    name: 'Ryland Grace',
    email: 'r.grace@hailmary.org',
    company: 'Hail Mary Project',
    phone: '+1 555-0102',
    status: 'customer',
    createdAt: new Date('2024-02-20'),
    lastContact: new Date('2024-03-12'),
    notes: 'Science teacher turned astronaut. Great problem solver.',
  },
  {
    id: '3',
    name: 'Steve Hatch',
    email: 'steve@orbital.tech',
    company: 'Orbital Technologies',
    phone: '+1 555-0103',
    status: 'prospect',
    createdAt: new Date('2024-03-01'),
    notes: 'Interested in spacecraft navigation systems.',
  },
  {
    id: '4',
    name: 'Annie Shapiro',
    email: 'annie@mediaworks.com',
    company: 'MediaWorks PR',
    phone: '+1 555-0104',
    status: 'lead',
    createdAt: new Date('2024-03-05'),
  },
  {
    id: '5',
    name: 'Yao Li',
    email: 'yao.li@cnsa.gov.cn',
    company: 'China National Space',
    phone: '+86 555-0105',
    status: 'prospect',
    createdAt: new Date('2024-02-28'),
    lastContact: new Date('2024-03-08'),
    notes: 'Engineering director. Looking for collaboration opportunities.',
  },
  {
    id: '6',
    name: 'Dimitri Ilyukhina',
    email: 'dimitri@roscosmos.ru',
    company: 'Roscosmos',
    phone: '+7 555-0106',
    status: 'customer',
    createdAt: new Date('2024-01-10'),
    lastContact: new Date('2024-03-11'),
  },
]

export const demoDeals: Deal[] = [
  {
    id: '1',
    title: 'Spacecraft Navigation System',
    value: 2500000,
    stage: 'negotiation',
    contactId: '1',
    probability: 75,
    expectedCloseDate: new Date('2024-04-15'),
    createdAt: new Date('2024-02-01'),
    notes: 'Final contract review in progress.',
  },
  {
    id: '2',
    title: 'Astrophage Research Partnership',
    value: 5000000,
    stage: 'closed-won',
    contactId: '2',
    probability: 100,
    expectedCloseDate: new Date('2024-03-01'),
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '3',
    title: 'Orbital Sensor Array',
    value: 750000,
    stage: 'proposal',
    contactId: '3',
    probability: 50,
    expectedCloseDate: new Date('2024-05-01'),
    createdAt: new Date('2024-03-01'),
  },
  {
    id: '4',
    title: 'PR Campaign - Space Initiative',
    value: 150000,
    stage: 'discovery',
    contactId: '4',
    probability: 25,
    expectedCloseDate: new Date('2024-06-01'),
    createdAt: new Date('2024-03-05'),
  },
  {
    id: '5',
    title: 'Joint Mission Planning Software',
    value: 1800000,
    stage: 'proposal',
    contactId: '5',
    probability: 60,
    expectedCloseDate: new Date('2024-04-30'),
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '6',
    title: 'Launch Vehicle Integration',
    value: 3200000,
    stage: 'closed-won',
    contactId: '6',
    probability: 100,
    expectedCloseDate: new Date('2024-02-15'),
    createdAt: new Date('2024-01-05'),
  },
]

export const demoActivities: Activity[] = [
  {
    id: '1',
    type: 'meeting',
    title: 'Contract negotiation call with ESA',
    description: 'Discuss final terms for navigation system deal.',
    contactId: '1',
    dealId: '1',
    completed: false,
    dueDate: new Date('2024-03-15'),
    createdAt: new Date('2024-03-10'),
  },
  {
    id: '2',
    type: 'email',
    title: 'Send technical specifications',
    description: 'Follow up with detailed specs for orbital sensors.',
    contactId: '3',
    dealId: '3',
    completed: false,
    dueDate: new Date('2024-03-14'),
    createdAt: new Date('2024-03-11'),
  },
  {
    id: '3',
    type: 'call',
    title: 'Discovery call - MediaWorks',
    contactId: '4',
    dealId: '4',
    completed: true,
    dueDate: new Date('2024-03-12'),
    createdAt: new Date('2024-03-08'),
  },
  {
    id: '4',
    type: 'task',
    title: 'Prepare proposal for CNSA',
    description: 'Include collaboration benefits and timeline.',
    contactId: '5',
    dealId: '5',
    completed: false,
    dueDate: new Date('2024-03-18'),
    createdAt: new Date('2024-03-09'),
  },
  {
    id: '5',
    type: 'note',
    title: 'Research notes - Astrophage properties',
    description: 'Key findings from latest experiments.',
    contactId: '2',
    completed: true,
    createdAt: new Date('2024-03-07'),
  },
  {
    id: '6',
    type: 'meeting',
    title: 'Quarterly review - Roscosmos',
    contactId: '6',
    dealId: '6',
    completed: false,
    dueDate: new Date('2024-03-20'),
    createdAt: new Date('2024-03-10'),
  },
]

// Utility functions for generating IDs
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format date
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

// Format relative time
export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return formatDate(date)
}
