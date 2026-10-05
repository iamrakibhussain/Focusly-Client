import { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const initialFormData = {
  title: "",
  targetAmount: "",
  unit: "units",
  type: "DAILY",
  endDate: "",
};

const typeOptions = [
  { value: "DAILY", label: "Daily" },
  { value: "WEEKLY", label: "Weekly" },
  { value: "MONTHLY", label: "Monthly" },
  { value: "CUSTOM", label: "Custom" },
];

function formatDateForInput(dateValue) {
  if (!dateValue) return "";
  const parsedDate = new Date(dateValue);
  if (Number.isNaN(parsedDate.getTime())) return "";
  return parsedDate.toISOString().slice(0, 10);
}

function buildFormData(goal, initialData = {}) {
  if (!goal) {
    return { ...initialFormData, ...initialData };
  }
  return {
    title: goal.title || "",
    targetAmount: goal.targetAmount || "",
    unit: goal.unit || "units",
    type: goal.type || "DAILY",
    endDate: formatDateForInput(goal.endDate),
  };
}

export default function GoalForm({ onGoalCreated, editingGoal, onCancelEdit, initialData = {}, onSuccess }) {
  const [formData, setFormData] = useState(() => buildFormData(editingGoal, initialData));
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = Boolean(editingGoal);
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(current => ({ ...current, [name]: value }));
    if (errors[name]) setErrors(current => ({ ...current, [name]: "" }));
    if (feedback.type) setFeedback({ type: "", text: "" });
  };

  const validateForm = () => {
    const nextErrors = {};
    const trimmedTitle = formData.title.trim();

    if (!trimmedTitle) nextErrors.title = "Goal title is required.";
    else if (trimmedTitle.length < 3) nextErrors.title = "Title should be at least 3 characters.";
    else if (trimmedTitle.length > 80) nextErrors.title = "Title should stay within 80 characters.";

    if (!formData.targetAmount || isNaN(formData.targetAmount) || Number(formData.targetAmount) <= 0) {
      nextErrors.targetAmount = "Please enter a valid target amount (> 0).";
    }

    if (!formData.unit.trim()) nextErrors.unit = "Unit is required.";

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
        targetAmount: Number(formData.targetAmount),
        unit: formData.unit.trim(),
        type: formData.type,
        ...(formData.endDate ? { endDate: new Date(formData.endDate).toISOString() } : {}),
      };

      const url = isEditMode ? `${API_BASE_URL}/api/goals/${editingGoal.id}` : `${API_BASE_URL}/api/goals`;
      const method = isEditMode ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        setFeedback({ type: "error", text: result.message || "Goal could not be saved." });
        return;
      }

      setFeedback({ type: "success", text: result.message || (isEditMode ? "Goal updated successfully." : "Goal created successfully.") });
      setFormData(initialFormData);
      onCancelEdit?.();
      onTaskCreated?.();
      onSuccess?.();
    } catch (error) {
      setFeedback({ type: "error", text: error.message || "Something went wrong." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-y-auto max-h-[90vh] rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-2xl transition-all scrollbar-hide">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500" />
      <div className="p-4 sm:p-5">
        <div className="mb-5 flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-orange-400">Goal Builder</p>
          <h3 className="text-lg font-semibold text-white sm:text-xl">
            {isEditMode ? "Edit Goal" : "Create New Goal"}
          </h3>
          <p className="max-w-2xl text-sm leading-6 text-slate-400">
            {isEditMode ? "Update the selected goal." : "Set a new target to keep your progress on track."}
          </p>
        </div>

        {feedback.text && feedback.type === "success" && (
          <div className="mb-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            {feedback.text}
          </div>
        )}
        {feedback.text && feedback.type === "error" && (
          <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {feedback.text}
          </div>
        )}

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium text-white">Title</label>
            <input
              id="title" name="title" type="text" placeholder="e.g. Read 50 pages"
              value={formData.title} onChange={handleChange} autoComplete="off" maxLength={80}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400"
            />
            {errors.title && <p className="text-sm text-red-300">{errors.title}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="targetAmount" className="text-sm font-medium text-white">Target Amount</label>
              <input
                id="targetAmount" name="targetAmount" type="number" placeholder="e.g. 50" min="1"
                value={formData.targetAmount} onChange={handleChange}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400"
              />
              {errors.targetAmount && <p className="text-sm text-red-300">{errors.targetAmount}</p>}
            </div>

            <div className="grid gap-2">
              <label htmlFor="unit" className="text-sm font-medium text-white">Unit</label>
              <input
                id="unit" name="unit" type="text" placeholder="e.g. pages, hours"
                value={formData.unit} onChange={handleChange}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400"
              />
              {errors.unit && <p className="text-sm text-red-300">{errors.unit}</p>}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="type" className="text-sm font-medium text-white">Type</label>
              <select
                id="type" name="type" value={formData.type} onChange={handleChange}
                className="rounded-xl border border-white/10 bg-[#1e293b] px-4 py-3 text-white outline-none transition focus:border-orange-400"
              >
                {typeOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="endDate" className="text-sm font-medium text-white">End Date (Optional)</label>
              <input
                id="endDate" name="endDate" type="date"
                value={formData.endDate} onChange={handleChange}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-orange-400"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              type="submit" disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-4 py-3 font-medium text-white transition hover:bg-orange-600 disabled:opacity-70 sm:w-auto"
            >
              {isSubmitting ? "Saving..." : isEditMode ? "Update Goal" : "Save Goal"}
            </button>

            <button
              type="button" onClick={() => onCancelEdit?.()}
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-medium text-slate-300 transition hover:bg-white/10 hover:text-white sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
