/*
TaskEmptyState.jsx
Purpose:
- Show a friendly message when no tasks exist or no task matches filters.

Requirements:
- Provide a clear empty state message.
- Show helpful next action like "Create Task".
- Differentiate between "no tasks yet" and "no results found".

Challenges to solve later:
- Keep the empty state helpful without becoming cluttered.
- Reuse the same component for both blank state and filtered empty state.
*/

export default function TaskEmptyState() {
  return (
    <section className="rounded-panel border border-dashed border-white/15 bg-surface/60 p-8 text-center">
      <p className="text-sm text-text-secondary">TaskEmptyState scaffold</p>
      <h3 className="mt-2 text-lg font-semibold">No tasks yet</h3>
      <p className="mt-2 text-sm text-text-secondary">
        This component will later guide the user to create their first task.
      </p>
    </section>
  );
}
