/*
File Purpose:
Top section for the Planner page. Shows the page context, a short description,
and a quick action placeholder.

Connected With:
- frontend/src/pages/PlannerPage.jsx

Future Use:
- Dynamic week/date range, quick add schedule action.
*/
export default function PlannerHeader() {
  return (
    <header className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft sm:p-6">
      <p className="text-sm text-text-secondary">Schedule</p>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
        Planner
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary">
        Plan study sessions, organize your week, and keep your learning rhythm visible.
      </p>
    </header>
  );
}
