/*
File Purpose:
Goals page composition. Organizes goal tracking, progress, and milestone sections.

Connected With:
- frontend/src/components/goals/*

Current Role:
- Page structure only; real goals data will connect later.
*/
import { useEffect, useState, useCallback, useMemo } from "react";
import GoalsHeader from "../components/goals/GoalsHeader";
import GoalSummaryGrid from "../components/goals/GoalSummaryGrid";
import CurrentGoalsList from "../components/goals/CurrentGoalsList";
import GoalProgressPanel from "../components/goals/GoalProgressPanel";
import GoalMilestones from "../components/goals/GoalMilestones";
import GoalModal from "../components/goals/GoalModal";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const fetchGoals = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/goals`, {
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error("Failed to fetch goals");
      }
      const result = await response.json();
      setGoals(result.goals || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const handleCreateNew = () => {
    setEditingGoal(null);
    setIsModalOpen(true);
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  const handleDeleteGoal = async (id) => {
    if (!window.confirm("Are you sure you want to delete this goal?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/goals/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (res.ok) {
        fetchGoals();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateProgress = async (id, newProgress) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/goals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ currentProgress: newProgress })
      });
      if (res.ok) {
        fetchGoals();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const completedGoals = useMemo(() => goals.filter(g => g.isCompleted), [goals]);
  const activeGoals = useMemo(() => goals.filter(g => !g.isCompleted), [goals]);

  return (
    <section className="space-y-6 pb-10">
      <GoalsHeader onNewGoal={handleCreateNew} />
      
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      <GoalSummaryGrid goals={goals} />

      <div className="grid gap-4 lg:grid-cols-2">
        <CurrentGoalsList 
          goals={activeGoals} 
          isLoading={isLoading} 
          onEdit={handleEditGoal}
          onDelete={handleDeleteGoal}
          onUpdateProgress={handleUpdateProgress}
        />
        <GoalProgressPanel goals={activeGoals} />
      </div>

      <GoalMilestones goals={completedGoals} isLoading={isLoading} />

      <GoalModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchGoals}
        editingGoal={editingGoal}
      />
    </section>
  );
}
