ROLE & CONTEXT
Continuing work on the "Modern SaaS CRM Dashboard" internship take-home project. All 5 required pages
plus a bonus Home page are complete. This prompt only ADDS visualization depth to the existing Dashboard
page — no new pages, no new KPI cards.


THIS PROMPT: ADD 3 NEW CHART BLOCKS TO DASHBOARD

1. Layout change (app/(dashboard)/dashboard/)
   - Keep Revenue Trend in its current position/size (left, large)
   - Below Revenue Trend, add a responsive grid for the 3 new chart blocks (e.g. 3-column on desktop,
     stacking to 1-column on mobile)
   - Recent Activity feed stays anchored right, spanning the full height of Revenue Trend + the new grid
     combined (so the right column reads as one tall card next to a taller left column) — if that's
     awkward with your current grid implementation, keep Activity Feed at its current height/position
     instead and just add the new charts below the full-width row; use your judgment on whichever reads
     cleaner, but don't shrink or restyle Activity Feed itself

2. Chart 1 — Customer Growth (bar chart)
   - Data: derive client-side from getCustomers() — group customers by the month of their createdAt
     field, count new customers per month (last 6 months)
   - Bar chart via Recharts, primary indigo/purple accent color, themed axis/gridline colors (see step 6)
   - Tooltip on hover shows exact count + month
   - Card title: "Customer Growth"

3. Chart 2 — Orders by Status (donut/pie chart)
   - Data: derive client-side from getOrders() — count orders grouped by status
     (pending/completed/cancelled/refunded)
   - Donut chart via Recharts (PieChart with innerRadius), each segment colored using the EXACT same
     color tokens as the status badges already used on the Orders page (pull these from wherever that
     badge color mapping is defined — reuse it, don't redefine a second color mapping)
   - Legend below or beside the donut showing status label + count
   - Tooltip on hover shows status + count + percentage
   - Click a segment -> navigate to /orders with the status filter pre-applied (reuse the existing Orders
     page filter-state mechanism, same pattern used for Home's "Pending Renewals" stat click-through if
     that exists, otherwise just set the appropriate filter state/query param Orders already reads)
   - Card title: "Orders by Status"

4. Chart 3 — Top Customers (mini leaderboard, not a full chart)
   - Data: derive client-side from getCustomers() — sort by totalSpend descending, take top 5
   - Render as a compact ranked list: rank number, avatar, name, totalSpend (formatted currency), maybe a
     tiny inline horizontal bar showing relative spend vs the #1 customer
   - Click a row -> opens that customer's detail drawer (reuse the existing Customers detail drawer
     component/logic — this is the one small cross-link mentioned above; import and reuse, don't rebuild)
   - Card title: "Top Customers"

5. Shared chart card wrapper
   - Build one small reusable ChartCard component (components/dashboard/) — title + content slot +
     consistent card styling — used by all 3 new blocks so they're visually uniform and don't each
     hand-roll their own card shell

6. Dark/light mode — IMPORTANT, this is where Recharts commonly breaks
   - Explicitly set axis text color, gridline stroke, and tooltip background/border/text color per theme
     (read the current theme via next-themes' useTheme or existing theme state, don't rely on Recharts
     defaults which will look wrong on dark backgrounds)
   - Donut segment colors should come from the status color tokens (already theme-aware if defined via
     Tailwind CSS variables) — verify they still read clearly on dark surfaces, adjust opacity/saturation
     if a color washes out
   - Verify Top Customers' avatar/text/mini-bar all look correct in both modes

7. Loading / empty / error states
   - Each of the 3 new charts gets a loading skeleton — reuse the Step 2 Skeleton component (a chart-
     shaped skeleton variant, same one Revenue Trend already uses if applicable), not a new one-off
   - If derived data is empty (e.g. no orders yet), show the existing EmptyState component scaled to fit
     the chart card size
   - Respect mock-api's existing simulated latency when fetching the underlying getCustomers()/
     getOrders() calls these charts depend on

8. Responsive
   - New chart grid stacks to single column on mobile (375px), each chart remains readable (donut legend
     wraps, bar chart labels don't overlap, Top Customers rows stay legible)
   - Verify at 375px, 768px, 1024px, 1440px

9. Animation
   - Stagger-animate the 3 new chart cards in on mount, consistent with existing motion variants
     (lib/motion.ts) — don't invent new animation timing/easing

10. Git
    - One commit: "feat: add customer growth, orders-by-status, and top customers charts to dashboard"

CONSTRAINTS
- Do not add new KPI cards to the top row
- Do not modify the existing Revenue Trend chart or Recent Activity feed beyond layout repositioning
  described in step 1
- Do not introduce new chart libraries — use whatever library the existing Revenue Trend chart already
  uses, for visual/API consistency
- Reuse existing status color tokens for the donut chart rather than defining new colors
- Reuse the existing Customers detail drawer for Top Customers click-through rather than building a
  second drawer

DELIVERABLE / OUTPUT
When done, tell me:
1. Confirmation the Orders-by-Status donut colors exactly match the badge colors used on the Orders page
2. Confirmation all 3 new charts render correctly and legibly in both dark and light mode (axis/gridline/
   tooltip colors specifically)
3. Confirmation the app builds/runs with `npm run dev` with no errors
4. Whether Recent Activity's layout/height needed adjustment to accommodate the new grid, and what you
   did
5. The exact commit message used