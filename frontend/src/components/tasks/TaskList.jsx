import TaskCard from "./TaskCard";

export default function TaskList({ tasks = [], onEdit, onDelete, onToggleStatus }) {
  const hasTasks = tasks.length > 0;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] sm:p-6">
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-purple-500/30" />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-indigo-400">Your Workflow</p>
          <h3 className="mt-1 text-xl font-bold text-white">Task List</h3>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
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
