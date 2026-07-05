import TaskCard from "./TaskCard";

export default function TaskList({ tasks = [], onEdit, onDelete, onToggleStatus }) {
  const hasTasks = tasks.length > 0;

  return (
    <section className="rounded-panel border border-white/10 bg-slate-900/70 p-4 shadow-soft sm:p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-text-secondary">Your tasks</p>
          <h3 className="text-lg font-semibold text-foreground">Task List</h3>
        </div>
        <span className="inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-text-secondary">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </span>
      </div>

      {hasTasks ? (
        <div className="grid gap-3">
          {tasks.map((task) => (
            <TaskCard 
            key={task.id} 
            task={task} 
            onEdit={onEdit} 
            onDelete={onDelete}
            onToggleStatus={onToggleStatus} />
          ))}
        </div>
      ) : (
        <div className="rounded-panel border border-dashed border-white/15 bg-background/60 p-6 text-center">
          <h4 className="text-base font-semibold">No tasks yet</h4>
          <p className="mt-2 text-sm text-text-secondary">
            Create your first task to start planning your study workflow.
          </p>
        </div>
      )}
    </section>
  );
}
