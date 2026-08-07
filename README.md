# AmazeCRM

**Amaze, good!** AmazeCRM is a lightweight Next.js CRM demo for managing
contacts, tracking deals, and completing follow-ups. It ships with seeded,
space-themed data and is ready to present locally.

## Quick start

Requires Node.js 20.9+ and pnpm.

```bash
corepack enable
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000), select **Get Started**, and
then select **Open demo workspace**. No account or password is required; the
entry page makes clear that this is a demo rather than a production sign-in.

## Persona: Ryland Grace

Ryland manages a small portfolio of high-value technical partnerships. He
needs to see pipeline health quickly, keep decision-maker context close to each
opportunity, and leave every deal with a clear next action.

## Five-minute demo script

1. **Start at the landing page.** Introduce AmazeCRM as one place to connect
   customer relationships, opportunities, and follow-up work. Select **Get
   Started**, then **Open demo workspace**.
2. **Review the Dashboard.** Show total contacts, pipeline value, won revenue,
   conversion rate, deal distribution, and recent activity. Ryland can see
   where to focus without assembling a report.
3. **Open Contacts.** Search for `Eva Stratt` and highlight her customer status,
   company, contact details, and edit action. This gives Ryland the context he
   needs before an ESA negotiation.
4. **Open Deals.** Find **Spacecraft Navigation System** in **Negotiation** and
   use its action menu to move it to **Closed Won**. The card moves, probability
   becomes 100%, and shared dashboard metrics update.
5. **Open Activities.** On the **Pending** tab, complete **Contract negotiation
   call with ESA**, which links Eva to the deal. The pending count updates,
   closing the loop from relationship to opportunity to action.

Return to **Dashboard** to show the updated business view. Refresh before the
next demo to restore the original seed data.

## Demo limitations

This is a frontend-only demo. CRM records live in React context, refreshes
restore the seed data, and demo access does not authenticate a user. There is
no backend API, database, multi-user synchronization, or production
authentication or authorization layer.

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```
