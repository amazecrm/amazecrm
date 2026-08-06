# AmazeCRM

**Amaze, good!** AmazeCRM is a lightweight CRM demo for managing contacts,
tracking opportunities, and keeping follow-ups visible. It is built with
Next.js, React, TypeScript, Tailwind CSS, and shadcn/ui.

The demo ships with a playful, space-themed dataset so it is ready to present
as soon as the development server starts.

## What you can demo

- A dashboard with contact, pipeline, revenue, and conversion metrics
- Searchable contact management with create, edit, and delete flows
- A five-stage deal pipeline with linked contacts and stage updates
- Activity tracking for calls, emails, meetings, tasks, and notes
- Responsive navigation and a simulated sign-in experience

## Run locally

### Prerequisites

- Node.js 20.9 or newer
- Corepack (included with supported Node.js releases) or pnpm

### Setup

```bash
corepack enable
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Select **Get Started** or
**Sign in**, then use either sign-in option. Authentication is simulated, so
the prefilled email and password do not need to be changed.

Useful commands:

```bash
pnpm lint          # Run ESLint
pnpm typecheck     # Check TypeScript
pnpm test          # Run unit tests
pnpm test:e2e      # Run Playwright tests
pnpm build         # Create a production build
```

## Demo script

This walkthrough takes about five minutes. Start at `/` with a fresh page load
so the seeded data is in its original state.

### 1. Set the scene

> AmazeCRM gives a sales team one clear place to understand relationships,
> move opportunities forward, and act on the next follow-up.

On the landing page, call out the three core workflows: contacts, deals, and
activities. Select **Get Started**, then **Sign in** with the prefilled demo
credentials.

### 2. Read the business at a glance

On **Dashboard**, point out:

- Total contacts and open pipeline value
- Won revenue and conversion rate
- Deal distribution across the pipeline
- Top contacts and recent activity

> Ryland can begin the day with the state of the business already summarized,
> without assembling a report.

### 3. Find and update a relationship

Open **Contacts** and search for `Eva Stratt`. Highlight her company, customer
status, contact details, and the action menu. Choose **Edit**, mention that the
team can keep relationship notes and status current, then cancel to preserve
the seeded scenario.

For the create flow, select **Add Contact** and show the name, email, phone,
company, status, and notes fields. Cancel unless you want to demonstrate that
the table updates immediately.

### 4. Advance an opportunity

Open **Deals**. Explain that every column is a pipeline stage and each card
combines the opportunity value, probability, expected close date, and primary
contact.

Find **Spacecraft Navigation System** in **Negotiation**. Open its action menu
and choose **Move to Closed Won**. The card moves stages, its probability
becomes 100%, and dashboard metrics update from the same shared CRM state.

### 5. Complete the follow-up loop

Open **Activities**. Use the **Pending** tab to focus on outstanding work and
find **Contract negotiation call with ESA**, which is linked to both Eva Stratt
and the Spacecraft Navigation System deal. Select its checkbox to complete it;
the pending count and activity styling update immediately.

Select **Add Activity** to show how a follow-up can be assigned a type and due
date, linked to a contact and deal, and given supporting details.

### 6. Close the story

Return to **Dashboard** and summarize:

> One workflow connected the customer, opportunity, and next action. AmazeCRM
> keeps the context together, so Ryland knows what changed and what to do next.

Refresh the browser before the next presentation to restore the original demo
data.

## Persona walkthrough: Ryland Grace

### Persona

**Ryland Grace** is the demo account owner. He manages a small portfolio of
high-value, technical partnerships and needs to turn complex relationship
context into a clear next action.

His goals are to:

1. Understand pipeline health without building a report.
2. Keep decision-maker context close to each opportunity.
3. Move deals forward and make ownership of follow-up obvious.

### A day in Ryland's workflow

| Moment | Ryland's question | AmazeCRM workflow | Outcome |
| --- | --- | --- | --- |
| Morning review | Where should I focus today? | Review dashboard metrics, deal distribution, and recent activity. | He sees open opportunities and pending work in one view. |
| Account preparation | Who is driving the ESA opportunity? | Search Contacts for Eva Stratt and review her customer record. | He has the relationship context before the negotiation. |
| Deal progression | Did the navigation-system deal close? | Move Spacecraft Navigation System from Negotiation to Closed Won. | The pipeline, probability, and dashboard totals stay aligned. |
| Follow-through | Is the negotiation task still outstanding? | Complete the linked ESA activity from the Pending list. | The team sees that the next action is complete. |
| New work | What happens after the call? | Add an activity linked to Eva and the deal. | Customer, opportunity, and follow-up context remain connected. |

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Marketing landing page |
| `/login` | Simulated sign-in |
| `/dashboard` | CRM overview and metrics |
| `/dashboard/contacts` | Contact search and management |
| `/dashboard/deals` | Deal pipeline and stage management |
| `/dashboard/activities` | Activity search, filtering, and completion |

## Demo architecture and limitations

AmazeCRM is currently a frontend-only demo. Contacts, deals, and activities
are seeded from `lib/crm-store.ts` and held in React context by
`lib/crm-context.tsx`.

- Changes last only for the current page session; a refresh restores seed data.
- Sign-in is simulated and does not validate credentials.
- There is no backend API, database, multi-user synchronization, or production
  authorization layer.
- All sample records are demo-only and do not represent real CRM accounts.

## Project structure

```text
app/                 Next.js routes and layouts
components/          Feature components and shadcn/ui primitives
lib/crm-types.ts     CRM entity types and status/stage constants
lib/crm-store.ts     Seed data and formatting helpers
lib/crm-context.tsx  Client-side CRM state and operations
e2e/                 Playwright browser smoke tests
```
