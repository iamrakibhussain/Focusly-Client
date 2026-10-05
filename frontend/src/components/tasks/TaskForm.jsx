import { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const initialFormData = {
  title: "",
  description: "",
  priority: "MEDIUM",
  status: "PENDING",
  deadline: "",
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

function formatDateForInput(dateValue) {
  if (!dateValue) {
    return "";
  }

  const parsedDate = new Date(dateValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toISOString().slice(0, 10);
}

function buildFormData(task, initialData = {}) {
  if (!task) {
    return { ...initialFormData, ...initialData };
  }

  return {
    title: task.title || "",
    description: task.description || "",
    priority: task.priority || "MEDIUM",
    status: task.status || "PENDING",
    deadline: formatDateForInput(task.deadline),
  };
}

export default function TaskForm({
  onTaskCreated,
  editingTask,
  onCancelEdit,
  initialData = {},
  onSuccess,
}) {
  const [formData, setFormData] = useState(() => buildFormData(editingTask, initialData));
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = Boolean(editingTask);
  const [feedback, setFeedback] = useState({
    type: "",
    text: "",
  });

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

    if (feedback.type) {
      setFeedback({
        type: "",
        text: "",
      });
    }
  };

  const validateForm = () => {
    const nextErrors = {};
    const trimmedTitle = formData.title.trim();
    const trimmedDescription = formData.description.trim();

    if (!trimmedTitle) {
      nextErrors.title = "Task title is required.";
    } else if (trimmedTitle.length < 3) {
      nextErrors.title = "Task title should be at least 3 characters.";
    } else if (trimmedTitle.length > 80) {
      nextErrors.title = "Task title should stay within 80 characters.";
    }

    if (trimmedDescription.length > 280) {
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
        ...(formData.deadline
          ? { deadline: new Date(formData.deadline).toISOString() }
          : {}),
      };
      const url = isEditMode
        ? `${API_BASE_URL}/api/tasks/${editingTask.id}`
        : `${API_BASE_URL}/api/tasks`;
      const method = isEditMode ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        setFeedback({
          type: "error",
          text: result.message || "Task could not be saved.",
        });
        return;
      }

      setFeedback({
        type: "success",
        text:
          result.message ||
          (isEditMode
            ? "Task updated successfully."
            : "Task created successfully."),
      });
      setFormData(initialFormData);
      setErrors({});
      onCancelEdit?.();
      await onTaskCreated?.();
    } catch (error) {
      setFeedback({
        type: "error",
        text: error.message || "Something went wrong.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setFeedback({
      type: "",
      text: "",
    });
    onCancelEdit?.();
  };

  return (
    <section
      id="task-form-section"
      className="relative overflow-y-auto max-h-[90vh] rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-2xl transition-all scrollbar-hide"
    >
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />
      <div className="p-4 sm:p-5">
        <div className="mb-5 flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
            Task Builder
          </p>
          <h3 className="text-lg font-semibold text-foreground sm:text-xl">
            {isEditMode ? "Edit Task" : "Create Task"}
          </h3>
          <p className="max-w-2xl text-sm leading-6 text-text-secondary">
            {isEditMode
              ? "Update the selected task and save your changes."
              : "Add a new study task with priority, status, and deadline in a clean workflow-friendly layout."}
          </p>
        </div>

        {feedback.text && feedback.type === "success" && (
          <div className="mb-4 rounded-control border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100">
            {feedback.text}
          </div>
        )}

        {feedback.text && feedback.type === "error" && (
          <div className="mb-4 rounded-control border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {feedback.text}
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
              autoComplete="off"
              minLength={3}
              maxLength={80}
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? "task-title-error" : undefined}
              className="rounded-control border border-white/10 bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-text-secondary focus:border-primary"
            />
            {errors.title && (
              <p id="task-title-error" className="text-sm text-red-300">
                {errors.title}
              </p>
            )}
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
              maxLength={280}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={errors.description ? "task-description-error" : undefined}
              className="rounded-control border border-white/10 bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-text-secondary focus:border-primary"
            />
            <div className="flex items-center justify-between gap-3 text-xs text-text-secondary">
              <p>Keep it short and clear for fast scanning.</p>
              <p>{formData.description.length}/280</p>
            </div>
            {errors.description && (
              <p id="task-description-error" className="text-sm text-red-300">
                {errors.description}
              </p>
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
            <label htmlFor="deadline" className="text-sm font-medium text-foreground">
              Deadline
            </label>
            <input
              id="deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              disabled={isSubmitting}
              className="rounded-control border border-white/10 bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-control bg-primary px-4 py-3 font-medium text-white shadow-glow transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {isSubmitting
                ? "Saving..."
                : isEditMode
                  ? "Update Task"
                  : "Save Task"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex w-full items-center justify-center rounded-control border border-white/10 bg-white/5 px-4 py-3 font-medium text-text-secondary transition hover:bg-white/10 hover:text-foreground sm:w-auto"
            >
              {isEditMode ? "Cancel Edit" : "Reset"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
