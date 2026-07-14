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


THIS PROMPT COVERS ONLY STEP 2: Design System & Theming.
Do not build the actual Login, Dashboard, Customers, Orders, or Settings page content/logic yet — that's
Steps 3-5. This step is the visual foundation and layout shell only, using placeholder/dummy content
where a real page would eventually go.

TASK: BUILD THE DESIGN SYSTEM & LAYOUT SHELL

1. Tailwind theme configuration
   - Define a color token system: primary, accent, success, warning, danger, neutral scale — for both
     light and dark mode
   - Pick a distinctive font pairing (heading + body) via next/font — not the default system font, this
     needs to look intentional
   - Define consistent border-radius, shadow, and spacing scale tokens
   - Explain your color/font choice briefly in the commit message or a short code comment

2. [x] Install/init shadcn/ui components we'll need across the app:
   button, input, card, table, dropdown-menu, dialog, drawer, badge, switch, tabs, avatar, skeleton,
   toast (or sonner), select, checkbox, separator

3. [x] Build the persistent app shell (components/layout/):
   - [x] Sidebar: collapsible, nav links to Dashboard, Customers, Orders, Settings (use lucide-react icons),
     active-route highlighting
   - [x] Topbar: search input (non-functional placeholder for now), theme toggle button, avatar/profile
     dropdown menu (mock user)
   - [x] A PageShell/DashboardLayout wrapper component that wraps sidebar + topbar + content area, responsive
     (sidebar collapses to a drawer/hamburger on mobile)
   - [x] Wire this shell into the (dashboard) route group layout.tsx so /dashboard, /customers, /orders,
     /settings all inherit it automatically

4. [x] Theme switching (next-themes)
   - [x] Set up ThemeProvider in root layout
   - [x] Theme toggle button in the topbar (sun/moon icon swap), persists across reload
   - [x] Verify shadcn components respect dark mode out of the box

5. [x] Motion system (lib/motion.ts)
   - [x] Define reusable Framer Motion variants: page fade/slide-in transition, card hover-lift, list stagger
     children
   - [x] Apply the page transition at the layout level so every route gets it automatically
   - [x] Keep it subtle — this is a professional SaaS product, not a flashy landing page

6. [x] Shared reusable components (components/shared/)
   - [x] Skeleton variants for: KPI card, table row, chart block, activity feed item (build these now so
     Steps 3-5 just import and use them)
   - [x] EmptyState component: icon + message + optional action button, reusable across customers/orders/
     activity feed when there's no data or filters return nothing

7. [x] Sanity check page
   - [x] Temporarily render the sidebar/topbar shell with dummy placeholder cards/text inside each of the 4
     dashboard routes, just enough to visually confirm the shell, theming, and responsiveness all work
   - [x] This placeholder content will be replaced by real pages in Steps 3-5, so keep it minimal (don't build
     real KPI logic here)

8. [x] Git
   - [x] One meaningful commit at the end: "feat: design system, theming, and app shell layout"

CONSTRAINTS
- Do not build real page logic (no real KPI cards with data, no real tables, no real forms) — placeholder
  content only, just enough to prove the shell/theme/motion system works
- Do not introduce new libraries beyond what's listed without asking first
- Keep the sidebar/topbar/theme system fully reusable — Steps 3-5 should never need to touch layout code,
  only page content inside it
- Confirm responsiveness at 375px, 768px, 1024px, 1440px before committing

DELIVERABLE / OUTPUT
When done, tell me:
1. What color palette and font pairing you chose, and why
2. Confirmation dark/light toggle works and persists on reload
3. Confirmation the app builds/runs with `npm run dev` with no errors
4. Screenshot description (or actual screenshot if supported) of the shell in both light and dark mode
5. The exact commit message used