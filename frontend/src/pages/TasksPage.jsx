/*
File Purpose:
Task management page composition with filters, form, list, and empty states.

Connected With:
- frontend/src/components/tasks/*
- frontend/src/hook/useAuth.js indirectly through dashboard nav only
*/
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
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    priority: "ALL",
    status: "ALL",
    dueDate: "",
  });

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

  const scrollToTaskForm = () => {
    document.getElementById("task-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
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

  const handleEditTask = (task) => {
    setEditingTask(task);
    scrollToTaskForm();
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  useEffect(() => {
    // Initial client-side fetch on page mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTasks();
  }, []);


  const handleDeleteTask = async (taskId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      setMessage("");
      setError(false);

      const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
        method: "DELETE",
        credentials: "include"
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Task could not be deleted.")
      }
      if (editingTask && editingTask.id === taskId) {
        setEditingTask(null)
      }
      await loadTasks()
    }
    catch (error) {
      setMessage(error.message)
      setError(true)
    }
  }

  const handleToggleTaskStatus = async (task) => {
    const toggledStatus = task.status === "COMPLETED" ? "PENDING" : "COMPLETED";

    try {
      setMessage("");
      setError(false);

      const response = await fetch(`${API_BASE_URL}/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          status: toggledStatus,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Status could not be updated.");
      }
      await loadTasks();
    }
    catch (error) {
      setMessage(error.message);
      setError(true);
    }
  }


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
    <section className="space-y-4 sm:space-y-6">
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent sm:text-sm">
          Workflow
        </p>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Tasks
        </h2>
      </div>

      <div className="rounded-panel border border-white/10 bg-surface/80 p-4 shadow-soft sm:p-5">
        <p className="text-sm leading-6 text-text-secondary sm:text-base">
          Manage assignments, deadlines, and daily study tasks.
        </p>
      </div>

      {message && error && (
        <div className="rounded-panel border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-200">
          {message}
        </div>
      )}

      <TaskFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      <div id="task-form">
        <TaskForm
          key={editingTask?.id || "create-task-form"}
          onTaskCreated={loadTasks}
          editingTask={editingTask}
          onCancelEdit={handleCancelEdit}
        />
      </div>

      {tasks.length === 0 ? (
        <TaskEmptyState type="empty" onAction={scrollToTaskForm} />
      ) : filteredTasks.length === 0 ? (
        <TaskEmptyState type="filtered" onAction={handleResetFilters} />
      ) : (
        <TaskList
          tasks={filteredTasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onToggleStatus={handleToggleTaskStatus}
        />
      )}
    </section>
  );
}
