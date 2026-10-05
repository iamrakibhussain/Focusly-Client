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
    deadline: "",
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
    const deadlineMatch = filters.deadline === "" || formatDateForFilter(task.deadline) === filters.deadline;

    return (
      priorityMatch &&
      statusMatch &&
      searchMatch &&
      deadlineMatch
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
      deadline: "",
    });
  };

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const openTaskModal = () => {
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
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
    setIsTaskModalOpen(true);
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
        setEditingTask(null);
        setIsTaskModalOpen(false);
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
    <section className="space-y-6 sm:space-y-8 relative">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-6 sm:p-10 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
        
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 text-indigo-400">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
            <p className="text-xs font-bold uppercase tracking-[0.2em]">
              Workflow
            </p>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Task Management
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Organize assignments, track deadlines, and conquer your daily study goals with precision.
          </p>
        </div>

        <div className="relative z-10">
          <button
            onClick={openTaskModal}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-indigo-500 p-4 px-8 font-medium text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] active:scale-95"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="relative flex items-center gap-2 font-bold tracking-wide">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              New Task
            </span>
          </button>
        </div>
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

      {tasks.length === 0 ? (
        <TaskEmptyState type="empty" onAction={openTaskModal} />
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

      {/* Modal Overlay for TaskForm */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="absolute inset-0" 
            onClick={closeTaskModal} 
            aria-label="Close modal"
          />
          <div className="relative z-10 w-full max-w-2xl animate-in zoom-in-95 duration-200">
            <button 
              onClick={closeTaskModal}
              className="absolute -top-3 -right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 border border-white/10 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors shadow-lg"
            >
              ✕
            </button>
            <TaskForm
              key={editingTask?.id || "create-task-form"}
              onTaskCreated={() => {
                loadTasks();
                closeTaskModal();
              }}
              editingTask={editingTask}
              onCancelEdit={closeTaskModal}
            />
          </div>
        </div>
      )}
    </section>
  );
}
