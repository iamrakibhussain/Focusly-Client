/*
TaskForm.jsx
Purpose:
- Handle create task and edit task in one reusable form.

Requirements:
- Accept initial task data for edit mode.
- Support task title, description, priority, due date, category, tags, and completion state.
- Validate required fields before submit.
- Show loading and error states when API is connected.

Challenges to solve later:
- Keep create and edit mode in one component without making it messy.
- Sync form state when a task is selected for editing.
- Keep validation consistent with backend rules.
- Reset form cleanly after successful submit.
*/

export default function TaskForm() {
  return (
    <section className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
      <div className="space-y-2">
        <p className="text-sm text-text-secondary">TaskForm scaffold</p>
        <h3 className="text-lg font-semibold">Create / Edit Task</h3>
        <p className="text-sm text-text-secondary">
          This component will later handle task creation and editing.
        </p>
      </div>
    </section>
  );
}
