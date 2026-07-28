# MEMORY.md - Long-Term Memory

Stable facts about **amazecrm/amazecrm**. Update when architecture or workflow changes.

## Product

- **AmazeCRM** — browser CRM demo built with Next.js App Router.
- Entities: `Contact`, `Deal`, `Activity` (`lib/crm-types.ts`).
- All CRM data lives in **React state** via `CRMProvider` (`lib/crm-context.tsx`), initialized from `lib/crm-store.ts` demo arrays.
- Refreshing the page resets to demo data (no localStorage persistence).

## Auth

- **Not real.** `/login` fakes delay and navigates to `/dashboard`.
- `lib/auth-context.tsx` defines `AuthProvider` + demo user “Grace Wagner” but is not wired through the login page today.
- Sidebar logout navigates to `/` (landing).

## Tech stack

- Next.js **16.2.x**, React **19**, TypeScript **5.7**, Tailwind **4**
- UI: shadcn/ui (new-york), Radix, lucide icons, recharts on dashboard
- Package manager: **pnpm**
- Analytics: `@vercel/analytics` in production only (`app/layout.tsx`)

## Layout conventions

- Marketing: `app/page.tsx` at `/`
- App shell: `app/dashboard/layout.tsx` wraps `CRMProvider` + sidebar
- Path alias `@/*` → repository root

## Extension points (not built yet)

- REST/GraphQL API, database, real OAuth
- Server Actions for mutations
- Tests (no `test` script in `package.json`)
- E2E / CI config in-repo

## Agent workspace

- Bootstrap docs live in `factory-workspaces/amazecrm-dev/`
- Workflows live in `factory-workflows/` (publish into this workspace)
- Daytona provider; GitHub repo `amazecrm/amazecrm` with write access (`elasticclaw-config.yaml`)

## Gotchas

- `auth-context` logout uses `router.push("/landing")` but landing route is `/` — fix if touching auth.
- `styles/globals.css` exists alongside `app/globals.css`; dashboard theming uses `app/globals.css`.
- Do not commit `.env*.local`, `node_modules`, `.next/`.

## Decisions log

_(Agent: append dated one-liners for choices the human confirms, e.g. “2026-05-19 — use localStorage for contacts persistence”.)_
