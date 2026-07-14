THIS PROMPT COVERS STEP 5: Settings Page + Final Polish + QA + Documentation + Deployment.

TASK PART A: SETTINGS PAGE (app/(dashboard)/settings/)

1. Profile form using React Hook Form + the existing Zod settings schema from lib/validators.ts
   - Fields: name, email, bio (and avatar if the schema supports it — otherwise skip)
   - Inline validation errors
   - Load current mock user data as default values on mount

2. Theme switcher
   - Reuse the exact same theme toggle logic from the Topbar (Step 2) — surface it here too as a proper
     settings control (e.g. Light/Dark/System radio group or switch), don't duplicate the underlying logic

3. Reset / Save behavior
   - Reset button: reverts form fields to last-saved values (not just blank)
   - Save button: validates, "saves" to mock state/localStorage, shows a success toast
   - Save button should show a brief loading state (reuse the mock-api latency pattern for consistency)
   - Disable Save if the form is unchanged from last-saved state (dirty-check via React Hook Form)

4. Responsive at 375px, consistent with the rest of the app's visual language

TASK PART B: FULL RESPONSIVE + QA PASS

1. Manually verify every page (Login, Dashboard, Customers, Orders, Settings) at 375px, 768px, 1024px,
   1440px — fix any overflow, cramped spacing, or broken layout found
2. Confirm every async section across the whole app has: a loading skeleton, an empty state where
   applicable, and doesn't hard-crash on the mock-api's simulated error case
3. Add a top-level error boundary (app/(dashboard)/error.tsx and/or app/error.tsx) so an unexpected error
   shows a friendly fallback UI instead of a blank/broken page
4. Add a not-found page (app/not-found.tsx) styled consistently with the app
5. Quick accessibility pass: color contrast on badges/text meets reasonable standards, all interactive
   elements have visible focus states, images/icons have alt text or aria-labels where meaningful
6. Animation consistency check: nothing janky, nothing overused — subtle and professional throughout

TASK PART C: DOCUMENTATION

Write a README.md at the project root with these sections:

1. Project overview (1-2 sentences on what this is)
2. Tech stack list
3. Setup & run instructions:
git clone <repo-url>
cd <project-folder>
npm install
npm run dev
   Include Node version requirement if relevant, and how to build for production (npm run build).
4. Demo login credentials (whatever was used/documented in Step 3)
5. Folder structure overview (brief, high-level — not a full file tree)
6. Assumptions & known limitations (be honest: e.g. "no real backend, all data is mocked and resets on
   refresh unless persisted to localStorage", "auth is client-side only and not secure for production",
   any features simplified from the original brief)
7. AI Usage Disclosure section — I will fill in the specifics myself afterward, but scaffold it with these
   headers so I remember to complete it:
   - Which AI tools were used
   - What tasks the AI assisted with (per step, briefly)
   - What I wrote/decided myself
   - One technical decision made independently, and why

Do NOT fabricate specific AI-usage claims in this section — leave it as a clearly marked TODO/placeholder
for me to fill in personally, since this needs to be accurate for the submission.

TASK PART D: DEPLOYMENT

1. Ensure the project builds cleanly with `npm run build` (fix any type errors, lint errors, or build
   warnings that surface)
2. Give me the exact steps to deploy to Vercel (CLI commands and/or dashboard steps) — I'll run the actual
   deployment myself so I have the live URL under my own account
3. Confirm there are no hardcoded localhost URLs or dev-only assumptions that would break in production

TASK PART E: GIT CLEANUP

1. Review commit history — if there are messy/redundant WIP commits from earlier steps, advise whether to
   leave them (shows real process) or squash (cleaner log) — grading rubric values "meaningful commits,"
   so lean toward keeping meaningful ones and only cleaning up genuine noise
2. Final commit for this step: "feat: settings page, responsive polish, error handling, and documentation"

CONSTRAINTS
- Do not touch Login, Dashboard Home, Customers, or Orders logic — only fix genuine responsive/QA bugs
  found in them during Part B, don't refactor working features
- Don't invent AI usage claims in the README — leave that section as a placeholder for me
- Don't deploy on my behalf — give me the steps, I'll run it under my own Vercel account so the URL and
  ownership are correct

DELIVERABLE / OUTPUT
When done, tell me:
1. Any responsive/bug fixes made during the QA pass (brief list)
2. Confirmation `npm run build` succeeds with no errors
3. The full README.md content
4. The exact Vercel deployment steps for me to run myself
5. The exact final commit message used