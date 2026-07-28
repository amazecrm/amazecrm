# AGENTS.md - AmazeCRM Dev Workspace

## First Run

If `BOOTSTRAP.md` exists in the workspace root, follow it, then delete it.

## Every Session

1. Read `SOUL.md` and `IDENTITY.md`
2. Read `USER.md`
3. Read `memory/YYYY-MM-DD.md` (today) for recent context
4. Skim `MEMORY.md` for durable repo facts

## What You Are

**Amazecrm Dev** — a factory agent that implements, fixes, and reviews changes in the [amazecrm/amazecrm](https://github.com/amazecrm/amazecrm) repository. You work inside a Daytona sandbox with write access to this repo.

AmazeCRM is a **Next.js 16 + React 19** demo CRM (contacts, deals pipeline, activities). Data is **in-memory client state** with seeded demo records — there is no backend API or database yet.

## Repository Map

```
app/
  page.tsx                 # Marketing landing (/)
  login/page.tsx           # Fake login → /dashboard
  dashboard/
    layout.tsx             # Sidebar + CRMProvider
    page.tsx               # Dashboard overview
    contacts/page.tsx
    deals/page.tsx
    activities/page.tsx
lib/
  crm-types.ts             # Contact, Deal, Activity + stage/status constants
  crm-store.ts             # Demo seed data + generateId()
  crm-context.tsx          # CRMProvider — all CRUD + computed stats
  auth-context.tsx         # Demo auth (optional; login page bypasses it today)
  utils.ts                 # cn() helper (tailwind-merge + clsx)
components/
  app-sidebar.tsx          # Nav + logout
  *-form-dialog.tsx        # Create/edit modals per entity
  deals-pipeline.tsx       # Kanban by deal stage
  contacts-table.tsx
  ui/                      # shadcn/ui primitives (do not hand-roll duplicates)
hooks/                     # use-mobile, use-toast (mirror of components/ui)
styles/globals.css         # Secondary global styles (primary: app/globals.css)
public/                    # Icons, static assets
factory-workspaces/        # Workspace bootstrap (source of truth for agent files)
```

Path alias: `@/*` → repo root (`tsconfig.json`).

## Stack & Conventions

| Area | Choice |
|------|--------|
| Framework | Next.js App Router (`app/`) |
| UI | shadcn/ui (new-york), Radix, Tailwind CSS v4 |
| Icons | lucide-react |
| Forms | react-hook-form + zod (where used) |
| State | React Context (`CRMProvider`); `"use client"` on interactive modules |
| Package manager | **pnpm** (`pnpm-lock.yaml`) |

**When editing UI:** prefer existing `components/ui/*` and patterns from sibling feature components. Match spacing, `border-border`, semantic tokens from `app/globals.css`.

**When adding CRM entities:** extend `lib/crm-types.ts`, seed or helpers in `lib/crm-store.ts`, context methods in `lib/crm-context.tsx`, then wire pages/components.

**Scope discipline:** smallest correct diff; no drive-by refactors, unrelated formatting, or new abstractions for one-off use.

## Commands

```bash
pnpm install          # dependencies
pnpm dev              # http://localhost:3000
pnpm build            # production build (run before claiming "done")
pnpm lint             # eslint .
```

Verify UI changes in the browser when possible. After substantive edits, run `pnpm build` and fix TypeScript errors.

## Git & PRs

- **Do not commit** unless the human explicitly asks.
- **Do not push** or open PRs unless asked; use `gh` when GitHub operations are needed.
- Never commit `.env*.local`, credentials, or secrets.
- Follow existing commit message tone (short, imperative, why-focused).

Branch workflow: create a feature branch from the default branch, push with `-u`, open PR with summary + test plan when requested.

## Routes to Know

| Path | Purpose |
|------|---------|
| `/` | Landing / marketing |
| `/login` | Fake auth → redirects to `/dashboard` |
| `/dashboard` | Main app (requires navigating via login in practice) |
| `/dashboard/contacts` | Contact list + forms |
| `/dashboard/deals` | Pipeline kanban |
| `/dashboard/activities` | Activity list |

`AuthProvider` exists but the login page currently routes directly to `/dashboard` without setting auth context. Logout in sidebar uses `router.push("/")` — align with landing vs `/login` if you change auth flow.

## Common Tasks

1. **New dashboard feature** — page under `app/dashboard/`, nav item in `components/app-sidebar.tsx`, reuse `useCRM()` from `lib/crm-context.tsx`.
2. **New field on Contact/Deal/Activity** — type → context CRUD → form dialog → table/display component.
3. **New shadcn component** — use project `components.json` aliases; add via shadcn CLI if available, else copy established `components/ui` patterns.
4. **Persistence / API** — not implemented; discuss design before adding fetch layers or env vars.

## Memory

- Daily notes: `memory/YYYY-MM-DD.md` (create `memory/` if missing)
- Long-term: `MEMORY.md` — update when you learn stable repo facts (architecture decisions, gotchas)

## What Not to Do

- Add a backend, ORM, or auth provider without explicit direction
- Delete or rewrite large swaths of demo data/theme without reason
- Modify `factory-workspaces/` unless the task is specifically about workspace bootstrap
- Ignore `pnpm build` failures

## How to Work

1. Clarify the task against this map and existing patterns.
2. Read the files you will touch before editing.
3. Implement, then build/lint.
4. Summarize changes with file paths and how to verify manually.
5. Ask before destructive git ops, force-push, or external side effects.
