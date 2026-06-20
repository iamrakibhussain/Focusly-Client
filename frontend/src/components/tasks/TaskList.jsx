/*
TaskList.jsx
Purpose:
- Render the full list of tasks.

Requirements:
- Accept a tasks array from the page or parent component.
- Render each task using TaskCard.
- Handle empty list state gracefully.
- Support filters and sorting later.

Challenges to solve later:
- Keep rendering fast when task count grows.
- Separate list rendering from API fetching.
- Add filter-aware and search-aware rendering without coupling logic.
*/

export default function TaskList() {
  return (
    <section className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
      <div className="space-y-2">
        <p className="text-sm text-text-secondary">TaskList scaffold</p>
        <h3 className="text-lg font-semibold">Task List</h3>
        <p className="text-sm text-text-secondary">
          This component will later render all tasks and handle empty states.
        </p>
      </div>
    </section>
  );
}
