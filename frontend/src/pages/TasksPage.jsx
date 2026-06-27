import { useEffect, useState } from "react";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import TaskEmptyState from "../components/tasks/TaskEmptyState";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    priority: "ALL",
    status: "ALL",
    dueDate: ""
  })

  const formatDateForFilter = (dateValue) => {
    if (!dateValue) return "";

    const parsedDate = new Date(dateValue);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toISOString().slice(0, 10);
  };

  const filteredTasks = tasks.filter((task) => {
    const searchMatch = task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      (task.description || "").toLowerCase().includes(filters.search.toLowerCase());
    const priorityMatch = filters.priority === "ALL" || task.priority === filters.priority;
    const statusMatch = filters.status === "ALL" || task.status === filters.status;
    const dueDateMatch = filters.dueDate === "" || formatDateForFilter(task.dueDate) === filters.dueDate;

    return (
      priorityMatch &&
      statusMatch &&
      searchMatch &&
      dueDateMatch
    );
  });


  const handleFilterChange = (name, value) => {
    setFilters((current) => ({
      ...current, [name]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      priority: "ALL",
      status: "ALL",
      dueDate: "",
    });
  };

  const loadTasks = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks`, {
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to load tasks");
      }

      setTasks(result.tasks || []);
      setError(false);
      setMessage("");
    } catch (err) {
      setMessage(err.message);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  if (isLoading) {
    return (
      <section className="space-y-6">
        <div>
          <p className="text-sm text-text-secondary">Workflow</p>
          <h2 className="text-3xl font-semibold">Tasks</h2>
        </div>

        <div className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
          <p className="text-text-secondary">Loading tasks...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm text-text-secondary">Workflow</p>
        <h2 className="text-3xl font-semibold">Tasks</h2>
      </div>

      <div className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
        <p className="text-text-secondary">
          Manage assignments, deadlines, and daily study tasks.
        </p>
      </div>

      {message && error && (
        <div className="rounded-panel border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
          {message}
        </div>
      )}

      <TaskFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      <TaskForm onTaskCreated={loadTasks} />

      {tasks.length === 0 ? (
        <TaskEmptyState />
      ) : filteredTasks.length === 0 ? (
        <div className="rounded-panel border border-dashed border-white/15 bg-surface/60 p-6 text-center">
          <h3 className="text-lg font-semibold">No matching tasks found</h3>
          <p className="mt-2 text-sm text-text-secondary">
            Try changing the search term or clearing the filters.
          </p>
        </div>
      ) : (
        <TaskList tasks={filteredTasks} />
      )}
    </section>
  );
}
