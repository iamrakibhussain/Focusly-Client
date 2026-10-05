import { CalendarDays, RotateCcw, Search, SlidersHorizontal, ChevronDown } from "lucide-react";

const priorityOptions = [
  { value: "ALL", label: "Priority" },
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
];

const statusOptions = [
  { value: "ALL", label: "Status" },
  { value: "PENDING", label: "Pending" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "COMPLETED", label: "Completed" },
];

export default function TaskFilters({ filters, onFilterChange, onReset }) {

  const handleFilterChange = (event) => {
    onFilterChange(event.target.name, event.target.value);
  };

  const hasActiveFilters = filters.search !== "" || filters.priority !== "ALL" || filters.status !== "ALL" || filters.deadline !== "";

  return (
    <section className="relative z-20 flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-3 backdrop-blur-md shadow-lg sm:flex-row sm:items-center">
      
      {/* Search Bar - Takes up remaining space */}
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="Search tasks..."
          className="w-full rounded-xl border border-white/5 bg-slate-950/50 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-indigo-500/50 focus:bg-slate-900 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)]"
        />
      </div>

      {/* Filters Container */}
      <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
        
        {/* Priority Dropdown */}
        <div className="relative">
          <select
            name="priority"
            value={filters.priority}
            onChange={handleFilterChange}
            className="appearance-none rounded-xl border border-white/5 bg-slate-950/50 py-2.5 pl-4 pr-10 text-sm text-slate-300 outline-none transition-all hover:bg-slate-900 focus:border-indigo-500/50 cursor-pointer"
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        </div>

        {/* Status Dropdown */}
        <div className="relative">
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="appearance-none rounded-xl border border-white/5 bg-slate-950/50 py-2.5 pl-4 pr-10 text-sm text-slate-300 outline-none transition-all hover:bg-slate-900 focus:border-indigo-500/50 cursor-pointer"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        </div>

        {/* Date Picker */}
        <div className="relative">
          <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="date"
            name="deadline"
            value={filters.deadline}
            onChange={handleFilterChange}
            className="rounded-xl border border-white/5 bg-slate-950/50 py-2.5 pl-9 pr-3 text-sm text-slate-300 outline-none transition-all hover:bg-slate-900 focus:border-indigo-500/50 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50 cursor-pointer"
          />
        </div>

        {/* Reset Button (Only shows when filters are active) */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            title="Clear filters"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 transition-all hover:bg-rose-500 hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}

      </div>
    </section>
  );
}
