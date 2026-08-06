import type { Activity, Contact, Deal } from './crm-types'

export interface CRMStats {
  totalContacts: number
  totalDeals: number
  totalPipeline: number
  totalWon: number
  conversionRate: number
  pendingActivities: number
}

export function calculateCRMStats(
  contacts: Contact[],
  deals: Deal[],
  activities: Activity[],
): CRMStats {
  const wonDeals = deals.filter(deal => deal.stage === 'closed-won')
  const lostDeals = deals.filter(deal => deal.stage === 'closed-lost')
  const openDeals = deals.filter(
    deal => !['closed-won', 'closed-lost'].includes(deal.stage),
  )
  const closedDealsCount = wonDeals.length + lostDeals.length

  return {
    totalContacts: contacts.length,
    totalDeals: deals.length,
    totalPipeline: openDeals.reduce((sum, deal) => sum + deal.value, 0),
    totalWon: wonDeals.reduce((sum, deal) => sum + deal.value, 0),
    conversionRate: closedDealsCount > 0
      ? Math.round((wonDeals.length / closedDealsCount) * 100)
      : 0,
    pendingActivities: activities.filter(activity => !activity.completed).length,
  }
}
