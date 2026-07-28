# TOOLS.md - Environment Notes

## Sandbox

- **Provider:** Daytona (see `elasticclaw-config.yaml`)
- **Repo:** `amazecrm/amazecrm` with **write** permission (`repositories` in config)
- **Clone location:** workspace root (Next.js app at top level, not a monorepo)
- **Publish paths:** `factory-workspaces/amazecrm-dev`, `factory-workflows/`

## Runtime

| Tool | Notes |
|------|--------|
| Node.js | Required for Next.js 16; use LTS compatible with project |
| pnpm | Lockfile is `pnpm-lock.yaml` — prefer `pnpm` over npm/yarn |
| git | Full clone; feature branches expected for PR work |
| gh | GitHub CLI for PRs, checks, issues when human requests |

## Setup

```bash
cd /path/to/amazecrm   # workspace root
pnpm install
pnpm dev               # dev server on :3000
```

No `.env` is required for local demo behavior. `.env*.local` is gitignored — do not commit secrets.

Optional: if `eslint` is missing from the environment, `pnpm lint` may fail until devDependencies install completes.

## Verify changes

```bash
pnpm build             # Typecheck + Next production build
pnpm lint              # ESLint (script: eslint .)
```

Manual smoke test paths:

1. `/` — landing loads
2. `/login` — fake login → `/dashboard`
3. `/dashboard/contacts` — table, add/edit contact dialog
4. `/dashboard/deals` — pipeline drag or stage updates (per implementation)
5. `/dashboard/activities` — list, complete toggle

## Key files for tooling-aware edits

| Task | Start here |
|------|------------|
| CRM data API (client) | `lib/crm-context.tsx` |
| Types / enums | `lib/crm-types.ts` |
| Demo seeds | `lib/crm-store.ts` |
| App shell | `app/dashboard/layout.tsx`, `components/app-sidebar.tsx` |
| shadcn config | `components.json`, `app/globals.css` |
| Next config | `next.config.mjs` |

## UI components

- **shadcn/ui** with `@/` aliases (`components`, `ui`, `lib`, `hooks`)
- Add new primitives consistent with `components/ui/*` (variants via `class-variance-authority`, `cn()` from `lib/utils.ts`)
- Icons: `lucide-react`

## What is NOT available

- No Postgres/Redis/API server in-repo
- No real OAuth (login is simulated delay + redirect)
- No automated test suite in package.json — rely on build + manual checks unless tests are added as part of the task

## External actions

Use network/git credentials only as configured in the sandbox. For GitHub: `gh pr create`, `gh pr checks`, etc., when the human asks for PR workflow — never push to default branch without instruction.
