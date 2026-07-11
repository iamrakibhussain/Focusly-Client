/*
File Purpose:
Top section for the Goals page with page context and purpose.

Connected With:
- frontend/src/pages/GoalsPage.jsx

Future Use:
- Goal creation actions and target summaries.
*/
export default function GoalsHeader() {
  return (
    <header className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft sm:p-6">
      <p className="text-sm text-text-secondary">Direction</p>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
        Goals
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary">
        Track long-term learning goals, keep progress visible, and stay aligned with your targets.
      </p>
    </header>
  );
}
