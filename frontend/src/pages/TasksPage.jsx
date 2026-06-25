import TaskFilters from "../components/tasks/TaskFilters";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import TaskEmptyState from "../components/tasks/TaskEmptyState";
import { useEffect, useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadTasks() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/tasks`, {
          credentials: "include",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load tasks");
        }

        if (ignore) return;

        setTasks(result.tasks || []);
        setError(false);
        setMessage("");
      } catch (err) {
        if (ignore) return;

        setMessage(err.message);
        setError(true);
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadTasks();

    return () => {
      ignore = true;
    };
  }, []);

  const taskCreated = async () => {
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
    <section className="space-y-6">
      <div>
        <p className="text-sm text-text-secondary">Workflow</p>
        <h2 className="text-3xl font-semibold">Tasks</h2>
      </div>
      <div className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
        <p className="text-text-secondary">Manage assignments, deadlines, and daily study tasks.</p>
      </div>

      {message && error && (
        <div className="rounded-panel border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
          {message}
        </div>
      )}

      <TaskFilters />
      <TaskForm onTaskCreated={taskCreated} />
      <TaskList tasks={tasks} />
      <TaskEmptyState />
    </section>
  );
}
