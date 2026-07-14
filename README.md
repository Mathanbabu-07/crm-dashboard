# CRM Dashboard

A modern, responsive, and production-grade CRM (Customer Relationship Management) dashboard built for managing SaaS customers and orders. This project features a beautiful UI, optimistic state updates, accessible components, and a fully mocked API layer with simulated latency.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui & Radix UI
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Forms & Validation:** React Hook Form + Zod
- **Tables:** TanStack Table v8
- **Charts:** Recharts

## Setup & Run Instructions

```bash
# Clone the repository
git clone https://github.com/Mathanbabu-07/crm-dashboard.git

# Navigate into the project folder
cd crm-dashboard

# Install dependencies (Node v18+ required)
npm install

# Run the development server
npm run dev
```

To build and run the production-optimized version:
```bash
npm run build
npm run start
```

## Demo Login Credentials

Any valid email and password (minimum 8 characters) will work for the mock login, for example:
- **Email:** `demo@example.com`
- **Password:** `password123`

## Folder Structure Overview

- `app/`: Next.js App Router layout, page components, and global error boundaries.
- `components/`: Modular React components.
  - `ui/`: Raw shadcn/ui primitives.
  - `layout/`: Topbar, Sidebar, and Page Shell.
  - `dashboard/`: KPI cards, charts, and activity feeds.
  - `customers/` & `orders/`: Entity-specific table components and columns.
  - `shared/`: Generic `DataTable`, badges, empty states, and skeletons.
- `data/`: Mock JSON data driving the application.
- `lib/`: Utilities, Zustand stores, Zod validators, TypeScript types, and the Mock API layer.

## Assumptions & Known Limitations
- **No Backend:** All data is fetched from static JSON files using a `mock-api.ts` layer that simulates network latency and random errors. 
- **Volatile State:** Changes made to orders (like deleting or updating status) are optimistic UI updates handled locally; they will reset if the page is hard-refreshed.
- **Client-Side Auth:** The login form is for demonstration purposes only. It uses client-side validation and local state, and is not secure for a real production environment.

## AI Usage Disclosure

- **Which AI tools were used:** 
  - [TODO: Fill this in]
- **What tasks the AI assisted with (per step, briefly):** 
  - [TODO: Fill this in]
- **What I wrote/decided myself:** 
  - [TODO: Fill this in]
- **One technical decision made independently, and why:** 
  - [TODO: Fill this in]

## Vercel Deployment Steps

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Log in to [Vercel](https://vercel.com/) and click **Add New... > Project**.
3. Import the `crm-dashboard` repository from your Git provider.
4. Leave all build settings as their defaults (Framework Preset: Next.js, Build Command: `next build`).
5. Click **Deploy**. Vercel will automatically build and host the application, providing a live `.vercel.app` URL.

*(Note: There are no hardcoded `localhost` environment variables in this project; it will work identically in production on Vercel).*
