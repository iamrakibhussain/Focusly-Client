import TaskFilters from "../components/tasks/TaskFilters";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import TaskEmptyState from "../components/tasks/TaskEmptyState";
/*
TasksPage.jsx
Purpose:
- This is the page-level orchestration file for the full task management feature.

What should live here:
- Page title and top-level layout.
- Task stats, filters, list, form, and empty state composition.
- Page-level state management and API hook integration later.

What should NOT live here:
- Deep UI implementation for each task item.
- Large form markup.
- API request details spread across the page.

Challenge reminder:
- Keep this page clean and use the components inside /components/tasks.
- Let this file coordinate the feature, not own every detail.
*/

export default function TasksPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm text-text-secondary">Workflow</p>
        <h2 className="text-3xl font-semibold">Tasks</h2>
      </div>

      <div className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
        <p className="text-text-secondary">Manage assignments, deadlines, and daily study tasks.</p>
      </div>
      <TaskFilters />
      <TaskForm />
      <TaskList />
      <TaskEmptyState />
    </section>
  );
}
