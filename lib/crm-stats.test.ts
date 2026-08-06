import { describe, expect, it } from 'vitest'

import type { Activity, Contact, Deal, DealStage } from './crm-types'
import { calculateCRMStats } from './crm-stats'

const createdAt = new Date('2026-01-01T00:00:00.000Z')

function createContact(id: string): Contact {
  return {
    id,
    name: `Contact ${id}`,
    email: `${id}@example.com`,
    company: 'AmazeCRM',
    phone: '555-0100',
    status: 'lead',
    createdAt,
  }
}

function createDeal(id: string, stage: DealStage, value: number): Deal {
  return {
    id,
    title: `Deal ${id}`,
    value,
    stage,
    contactId: 'contact-1',
    probability: 50,
    expectedCloseDate: createdAt,
    createdAt,
  }
}

function createActivity(id: string, completed: boolean): Activity {
  return {
    id,
    type: 'task',
    title: `Activity ${id}`,
    completed,
    createdAt,
  }
}

describe('calculateCRMStats', () => {
  it('returns zero values when the CRM has no records', () => {
    expect(calculateCRMStats([], [], [])).toEqual({
      totalContacts: 0,
      totalDeals: 0,
      totalPipeline: 0,
      totalWon: 0,
      conversionRate: 0,
      pendingActivities: 0,
    })
  })

  it('calculates totals, pipeline value, won value, conversion, and pending activities', () => {
    const contacts = [createContact('contact-1'), createContact('contact-2')]
    const deals = [
      createDeal('discovery', 'discovery', 1_200),
      createDeal('proposal', 'proposal', 300),
      createDeal('negotiation', 'negotiation', 500),
      createDeal('won-1', 'closed-won', 800),
      createDeal('won-2', 'closed-won', 200),
      createDeal('lost', 'closed-lost', 400),
    ]
    const activities = [
      createActivity('pending-1', false),
      createActivity('complete', true),
      createActivity('pending-2', false),
    ]

    expect(calculateCRMStats(contacts, deals, activities)).toEqual({
      totalContacts: 2,
      totalDeals: 6,
      totalPipeline: 2_000,
      totalWon: 1_000,
      conversionRate: 67,
      pendingActivities: 2,
    })
  })

  it('returns a zero conversion rate when there are no closed deals', () => {
    const deals = [
      createDeal('discovery', 'discovery', 100),
      createDeal('proposal', 'proposal', 200),
    ]

    expect(calculateCRMStats([], deals, [])).toMatchObject({
      totalPipeline: 300,
      conversionRate: 0,
    })
  })

  it('returns zero won value and conversion when every closed deal is lost', () => {
    const deals = [
      createDeal('lost-1', 'closed-lost', 100),
      createDeal('lost-2', 'closed-lost', 200),
    ]

    expect(calculateCRMStats([], deals, [])).toMatchObject({
      totalPipeline: 0,
      totalWon: 0,
      conversionRate: 0,
    })
  })

  it('does not include open deals in the closed-deal conversion rate', () => {
    const deals = [
      createDeal('open-1', 'discovery', 100),
      createDeal('open-2', 'proposal', 100),
      createDeal('won', 'closed-won', 100),
    ]

    expect(calculateCRMStats([], deals, []).conversionRate).toBe(100)
  })

  it.each<DealStage>(['discovery', 'proposal', 'negotiation'])(
    'includes a %s deal in pipeline value but not won value',
    stage => {
      const stats = calculateCRMStats(
        [],
        [createDeal(stage, stage, 250)],
        [],
      )

      expect(stats).toMatchObject({
        totalDeals: 1,
        totalPipeline: 250,
        totalWon: 0,
        conversionRate: 0,
      })
    },
  )

  it.each([
    ['closed-won', 250, 100],
    ['closed-lost', 0, 0],
  ] as const)(
    'excludes a %s deal from pipeline value',
    (stage, totalWon, conversionRate) => {
      const stats = calculateCRMStats(
        [],
        [createDeal(stage, stage, 250)],
        [],
      )

      expect(stats).toMatchObject({
        totalPipeline: 0,
        totalWon,
        conversionRate,
      })
    },
  )

  it.each([
    ['one win and one loss', ['closed-won', 'closed-lost'], 50],
    [
      'one win and two losses',
      ['closed-won', 'closed-lost', 'closed-lost'],
      33,
    ],
    [
      'two wins and one loss',
      ['closed-won', 'closed-won', 'closed-lost'],
      67,
    ],
  ] as const)('calculates conversion for %s', (_, stages, expected) => {
    const deals = stages.map((stage, index) =>
      createDeal(`closed-${index}`, stage, 100),
    )

    expect(calculateCRMStats([], deals, []).conversionRate).toBe(expected)
  })

  it('counts only incomplete activities as pending', () => {
    const activities = [
      createActivity('complete-1', true),
      createActivity('pending-1', false),
      createActivity('complete-2', true),
      createActivity('pending-2', false),
      createActivity('pending-3', false),
    ]

    expect(calculateCRMStats([], [], activities).pendingActivities).toBe(3)
  })
})
