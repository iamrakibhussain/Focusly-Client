/*
TaskFilters.jsx
Purpose:
- Let the user filter tasks by priority, status, category, due date, and search term.

Requirements:
- Accept current filter values and change handlers.
- Support search input and filter dropdowns.
- Keep UI clear and easy to reset.

Challenges to solve later:
- Make filters reusable across dashboard views if needed.
- Keep filter state in the page, not duplicated in every child component.
- Prevent filter UI from becoming too crowded.
*/

export default function TaskFilters() {
  return (
    <section className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
      <div className="space-y-2">
        <p className="text-sm text-text-secondary">TaskFilters scaffold</p>
        <h3 className="text-lg font-semibold">Filters</h3>
        <p className="text-sm text-text-secondary">
          This component will later handle search, priority, status, and category filters.
        </p>
      </div>
    </section>
  );
}
