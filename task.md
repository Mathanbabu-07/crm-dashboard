ROLE & CONTEXT
Continuing work on the "Modern SaaS CRM Dashboard" internship take-home project.

PROJECT CONTEXT:
Building a production-grade CRM dashboard (not a basic CRUD app). Required pages: Login, Dashboard Home
(KPIs + charts + activity feed), Customers List (search/sort/filter/pagination), Orders Manager
(search/filter/edit status/delete), Settings (profile form, theme switcher). No backend — mock data only.
Fully responsive. Grading rubric emphasizes UI polish, component architecture, state management, UX
(loading/empty states), code quality.

Tech stack: Next.js (App Router, TypeScript), Tailwind CSS, shadcn/ui, Framer Motion, Zustand,
React Hook Form + Zod, TanStack Table v8, Recharts/Tremor, lucide-react, next-themes.

STEPS 1-2 ARE ALREADY DONE:
- Step 1: Folder structure scaffolded, mock JSON data exists (customers.json, orders.json, kpis.json,
  activity.json), lib/mock-api.ts has async functions with simulated latency/error states, Zustand stores
  (auth, ui) exist, Zod schemas for login/settings exist, shared TypeScript types exist in lib/types.ts.
- Step 2: Tailwind theme tokens (colors, font, radius, shadow) defined. shadcn/ui components installed
  (button, input, card, table, dropdown-menu, dialog, drawer, badge, switch, tabs, avatar, skeleton,
  toast, select, checkbox, separator). Persistent app shell built (Sidebar + Topbar + PageShell) and wired
  into the (dashboard) route group layout. Dark/light theme toggle working via next-themes. Motion system
  (lib/motion.ts) with page transitions, card hover-lift, list stagger. Shared Skeleton variants and
  EmptyState component built. Dashboard/Customers/Orders/Settings routes currently show placeholder dummy
  content inside the real shell — this placeholder content is what you're replacing now for the two pages
  in this step.

THIS PROMPT COVERS ONLY STEP 3: Login Page + Dashboard Home.
Do not build Customers, Orders, or Settings page logic yet — that's Steps 4-5.

TASK PART A: LOGIN PAGE (app/(auth)/login/)

1. [x] Build the login form using React Hook Form + the existing Zod login schema from lib/validators.ts
   - [x] Email field, password field, inline validation error messages (required, valid email format, min
     password length)
   - [x] Password visibility toggle (eye/eye-off icon inside the input)
   - [x] "Remember Me" checkbox
   - [x] Submit button with a loading state (disabled + spinner while "authenticating")

2. [x] Auth flow (mock)
   - [x] On submit, call authStore.login() with a simulated ~600ms delay (reuse the mock-api latency pattern)
   - [x] Accept any well-formed email/password combo as valid for this mock (or a hardcoded demo credential —
     your call, document whichever you choose)
   - [x] If "Remember Me" is checked, persist session to localStorage; otherwise sessionStorage or in-memory
     for the tab
   - [x] On success: redirect to /dashboard. On failure: show an inline error (e.g. toast or form-level error)
   - [x] Use Framer Motion for the form's entrance (reuse variants from lib/motion.ts)

3. [x] Route protection
   - [x] Any (dashboard) route should redirect unauthenticated users to /login
   - [x] /login should redirect already-authenticated users straight to /dashboard
   - [x] Implement this via middleware.ts or a client-side guard in the (dashboard) layout — pick whichever
     fits Next.js App Router best and explain your choice briefly

4. [x] Visual design
   - [x] Modern, centered auth card layout (not a bare unstyled form) — use the shadcn Card + Input +
     Button components and the design tokens from Step 2
   - [x] Fully responsive down to 375px

TASK PART B: DASHBOARD HOME (app/(dashboard)/dashboard/)

1. [x] Fetch data from the existing lib/mock-api.ts functions (getKpis, getActivity, and whatever you'll need
   for chart data — extend mock-api.ts/kpis.json if a chart needs time-series data not already there)

2. [x] KPI cards (4+): Total Revenue, Active Customers, New Customers (this period), Avg Order Value
   - [x] Each card: label, current value, trend delta (up/down arrow + %) vs previous period
   - [x] Use the KPI card Skeleton built in Step 2 while data is loading
   - [x] Stagger-animate the cards in on load (Step 2 motion variants)

3. [x] Interactive chart(s) — at least one, ideally two:
   - [x] Revenue trend (line or area chart) and/or Customer growth (bar chart) via Recharts/Tremor
   - [x] Responsive container, respects light/dark theme colors, has a loading skeleton state

4. [x] Recent activity feed
   - [x] List of recent events (new order, new customer, status change, etc.) from activity.json
   - [x] Each item: icon by type, message, relative timestamp ("2h ago")
   - [x] Use the activity feed item Skeleton from Step 2, list stagger animation

5. [x] Handle the mock-api's simulated error case for at least one of these sections (e.g. KPIs) — show a
   retry-able error state, not a crash, to demonstrate real error handling

6. [x] Fully responsive: KPI cards stack/reflow, chart scales down, activity feed remains readable at 375px

7. [/] Git
   - [ ] One meaningful commit: "feat: login page with auth flow, route protection, and dashboard home"

CONSTRAINTS
- Do not touch Customers/Orders/Settings pages — leave their Step-2 placeholder content as-is
- Do not modify the Sidebar/Topbar/PageShell layout code — only build content inside the existing shell
- Reuse Step 2's Skeleton, EmptyState, and motion variants rather than creating new one-off versions
- Keep auth fully mock/client-side — no real backend, no real password hashing, just enough to
  demonstrate the flow and route protection convincingly

DELIVERABLE / OUTPUT
When done, tell me:
1. What credential/rule you used for "successful" mock login (so I can test it)
2. Confirmation route protection works both ways (logged out → bounced to /login, logged in → can't sit
   on /login)
3. Confirmation the app builds/runs with `npm run dev` with no errors
4. Any change you made to mock-api.ts/kpis.json to support the chart data
5. The exact commit message used