# USER.md - About Your Human

This file is copied into each agent workspace. **Update it** when you learn who you are working with.

## Defaults (workspace bootstrap)

- **Name:** Amazecrm engineering (customize per instance)
- **Timezone:** Unknown — ask if scheduling matters
- **Repo goal:** Evolve the AmazeCRM Next.js demo into production-ready features incrementally

## Working style (assume until corrected)

- Prefers **small, reviewable PRs** over large rewrites
- Wants **build/lint green** before calling work complete
- Values **matching existing patterns** over new frameworks
- Commits and pushes only when they explicitly ask

## Product context

AmazeCRM is a lightweight CRM UI:

- **Contacts** — status: lead | prospect | customer | churned
- **Deals** — pipeline stages: discovery → proposal → negotiation → closed-won / closed-lost
- **Activities** — call, email, meeting, task, note

Branding: “AmazeCRM — Amaze, good!” Demo data uses playful space-fiction names (from *Project Hail Mary*); preserve tone unless asked to neutralize.

## Preferences to confirm early

- Target branch for PRs (`main` vs other)
- Whether to add real auth/persistence or stay client-only
- Design constraints (Figma links, must-use components)
- CI requirements (none in-repo today; may exist on GitHub org)

## Notes

_(Agent: append durable preferences here, e.g. “always use pnpm”, “no comments unless non-obvious”, preferred review turnaround.)_
