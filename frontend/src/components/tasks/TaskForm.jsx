import { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const initialFormData = {
  title: "",
  description: "",
  priority: "MEDIUM",
  status: "PENDING",
  dueDate: "",
};

const priorityOptions = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
];

const statusOptions = [
  { value: "PENDING", label: "Pending" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
];

export default function TaskForm({ onTaskCreated }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }

    if (message) {
      setMessage("");
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.title.trim()) {
      nextErrors.title = "Task title is required.";
    }

    if (formData.description.length > 280) {
      nextErrors.description = "Description should stay within 280 characters.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        status: formData.status,
        ...(formData.dueDate ? { dueDate: new Date (formData.dueDate).toISOString() } : {}),
      };

      const response = await fetch(`${API_BASE_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "Task could not be created.");
        setErrors({ submit: result.message || "Task could not be created." });
        return
      }

      setMessage(result.message || "Task created successfully.");
      await onTaskCreated?.();
      setFormData(initialFormData);
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setMessage("");
  };

  return (
    <section className="overflow-hidden rounded-panel border border-white/10 bg-surface/80 shadow-soft">
      <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-cyan-300" />

      <div className="p-5">
        <div className="mb-5 flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
            Task Builder
          </p>
          <h3 className="text-xl font-semibold text-foreground">
            Create / Edit Task
          </h3>
          <p className="max-w-2xl text-sm leading-6 text-text-secondary">
            Add a new study task with priority, status, and deadline in a clean
            workflow-friendly layout.
          </p>
        </div>

        {message && (
          <div className="mb-4 rounded-control border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100">
            {message}
          </div>
        )}

        {errors.submit && (
          <div className="mb-4 rounded-control border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {errors.submit}
          </div>
        )}

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium text-foreground">
              Task Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. Finish math revision"
              value={formData.title}
              onChange={handleChange}
              className="rounded-control border border-white/10 bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-text-secondary focus:border-primary"
            />
            {errors.title && <p className="text-sm text-red-300">{errors.title}</p>}
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-foreground"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder="Add a short note about what needs to be done..."
              value={formData.description}
              onChange={handleChange}
              className="rounded-control border border-white/10 bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-text-secondary focus:border-primary"
            />
            <div className="flex items-center justify-between gap-3 text-xs text-text-secondary">
              <p>Keep it short and clear for fast scanning.</p>
              <p>{formData.description.length}/280</p>
            </div>
            {errors.description && (
              <p className="text-sm text-red-300">{errors.description}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <label
                htmlFor="priority"
                className="text-sm font-medium text-foreground"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="rounded-control border border-white/10 bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary"
              >
                {priorityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="status"
                className="text-sm font-medium text-foreground"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="rounded-control border border-white/10 bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="dueDate" className="text-sm font-medium text-foreground">
              Due Date
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              className="rounded-control border border-white/10 bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-control bg-primary px-4 py-3 font-medium text-white shadow-glow transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Saving..." : "Save Task"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center rounded-control border border-white/10 bg-white/5 px-4 py-3 font-medium text-text-secondary transition hover:bg-white/10 hover:text-foreground"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
