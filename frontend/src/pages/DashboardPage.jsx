/*
File Purpose:
Dashboard overview page composition. Organizes summary cards and dashboard sections.

Connected With:
- frontend/src/components/dashboard/*
- frontend/src/hook/useAuth.js

Current Role:
- Shape and layout only; real data comes later from services/backend.
*/

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatCard from "../components/dashboard/StatCard";
import TodayPlanSection from "../components/dashboard/TodayPlanSection";
import DeadlineSection from "../components/dashboard/DeadlineSection";
import TaskOverviewSection from "../components/dashboard/TaskOverviewSection";
import FocusSessionCard from "../components/dashboard/FocusSessionCard";
import AnalyticsSection from "../components/dashboard/AnalyticsSection";
import GoalsSection from "../components/dashboard/GoalsSection";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import useAuth from "../hook/useAuth.js";
import { getDashboardSummary } from "../services/dashboardService.js";


export default function DashboardPage() {
  const navigate = useNavigate();
  const [summaryData, setSummaryData] = useState(null)
  const [isStatsLoading, setIsStatsLoading] = useState(true)

  const now = new Date();
  const currentHour = now.getHours();
  const greetings = ["Good Morning", "Good Afternoon", "Good Evening"];
  const greeting = currentHour < 12 ? greetings[0] : currentHour < 18 ? greetings[1] : greetings[2];
  const formattedDate = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const { user, isLoading } = useAuth();

  useEffect(() => {
    async function fetchSummary() {
      try {
        const data = await getDashboardSummary()
        setSummaryData(data)
      }
      catch (error) {
        console.error("Error fetching dashboard summary:", error)
      } finally {
        setIsStatsLoading(false)
      }
    }
    fetchSummary()
  }, [])

  const handleCompleteTask = async (taskId) => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
      const res = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: "COMPLETED" })
      });
      if (res.ok) {
        const data = await getDashboardSummary();
        setSummaryData(data);
      }
    } catch (e) {
      console.error("Failed to complete task", e);
    }
  };

  const statCards = summaryData?.stats ? [
    {
      label: "Focus streak",
      value: `${summaryData.stats.focusStreak} days`,
      helperText: "Based on recent completed work",
      trend: summaryData.stats.focusStreak > 0 ? "Active" : "Start now",
    },
    {
      label: "Tasks due",
      value: String(summaryData.stats.tasksDueToday || summaryData.stats.pendingTasks),
      helperText: summaryData.stats.tasksDueToday > 0 ? "Due today" : "Open items",
      trend: summaryData.stats.tasksDueToday > 0 ? "Today" : "Pending",
    },
    {
      label: "Completed tasks",
      value: String(summaryData.stats.completedTasks),
      helperText: `${summaryData.stats.pendingTasks} still open`,
      trend: summaryData.stats.completedTasks > 0 ? "Done" : "None",
    },
    {
      label: "Weekly progress",
      value: `${summaryData.stats.weeklyProgress}%`,
      helperText: "Overall completion rate",
      trend: summaryData.stats.weeklyProgress >= 75 ? "On track" : "Needs focus",
    },
  ] : [];

  return (
    <section className="space-y-6">
      <DashboardHeader
        greeting={greeting}
        userName={user?.name || "User"}
        dateLabel={formattedDate}
        onQuickAction={() => navigate("/tasks")}
        quickActionLabel="+ Add Task"
      />

      {isStatsLoading ? (
        <div className="rounded-panel border border-white/10 bg-slate-900/80 p-5 shadow-soft">
          <p className="text-sm text-slate-400">Loading dashboard stats...</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {statCards.map((stat) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                helperText={stat.helperText}
                trend={stat.trend}
              />
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <TodayPlanSection tasks={summaryData?.activeTasks || []} onComplete={handleCompleteTask} />
            <DeadlineSection deadlines={summaryData?.deadlines || []} />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <TaskOverviewSection tasks={summaryData?.activeTasks || []} onComplete={handleCompleteTask} />
            <FocusSessionCard />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <AnalyticsSection focusSessions={summaryData?.focusSessions || []} />
            <GoalsSection goals={summaryData?.goals || []} />
          </div>

          <ActivityFeed activities={summaryData?.activities || []} />
        </>
      )}

      {isLoading ? (
        <p className="text-sm text-slate-400">Loading your profile...</p>
      ) : null}
    </section>
  );
}
