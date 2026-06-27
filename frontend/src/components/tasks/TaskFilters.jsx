import { CalendarDays, RotateCcw, Search, SlidersHorizontal } from "lucide-react";

const priorityOptions = [
  { value: "ALL", label: "All priorities" },
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
];

const statusOptions = [
  { value: "ALL", label: "All statuses" },
  { value: "PENDING", label: "Pending" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "COMPLETED", label: "Completed" },
];

const controlClassName =
  "w-full rounded-control border border-white/10 bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-text-secondary/70 focus:border-primary focus:bg-background focus:shadow-[0_0_0_1px_rgba(79,70,229,0.18)]";

const labelClassName = "text-sm font-medium text-foreground";

export default function TaskFilters({ filters, onFilterChange, onReset }) {

  const handleFilterChange = (event) => {
    onFilterChange(event.target.name, event.target.value);
  };

  return (
    <section className="overflow-hidden rounded-panel border border-white/10 bg-surface/80 shadow-soft">
      <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-cyan-300" />

      <div className="p-5 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-accent">
              <SlidersHorizontal className="h-4 w-4" />
              Task Filters
            </p>
            <h3 className="text-xl font-semibold text-foreground">
              Refine your task list
            </h3>
            <p className="max-w-2xl text-sm leading-6 text-text-secondary">
              Search by title or description, then narrow tasks by priority,
              status, or due date.
            </p>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center gap-2 rounded-control border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-text-secondary transition hover:bg-white/10 hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            Reset filters
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-2 xl:col-span-2">
            <label htmlFor="search" className={labelClassName}>
              Search
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
              <input
                type="search"
                id="search"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search task title or description"
                className={`${controlClassName} pl-10`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="priority" className={labelClassName}>
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              className={controlClassName}
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className={labelClassName}>
              Status
            </label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className={controlClassName}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="dueDate" className={labelClassName}>
              Due date
            </label>
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={filters.dueDate}
                onChange={handleFilterChange}
                className={`${controlClassName} pl-10`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
