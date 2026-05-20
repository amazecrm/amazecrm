# AmazeCRM

A lightweight CRM demo built with Next.js App Router.

## Features

- **Contacts** — Manage leads, prospects, customers, and churned contacts
- **Deals** — Pipeline view with stages: discovery → proposal → negotiation → closed
- **Activities** — Track calls, emails, meetings, tasks, and notes

## Tech Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Client-side state with React Context
- In-memory demo data (resets on refresh)

## Development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm lint       # eslint
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Marketing landing page |
| `/login` | Demo login (simulated) |
| `/dashboard` | Main CRM dashboard |
| `/dashboard/contacts` | Contact management |
| `/dashboard/deals` | Deal pipeline |
| `/dashboard/activities` | Activity list |

## Architecture

- `lib/crm-types.ts` — TypeScript types and enums
- `lib/crm-store.ts` — Demo seed data
- `lib/crm-context.tsx` — React Context for CRUD operations
- `app/dashboard/` — Dashboard pages with sidebar layout
