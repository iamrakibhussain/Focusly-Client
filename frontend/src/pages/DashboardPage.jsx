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
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatCard from "../components/dashboard/StatCard";
import TodayPlanSection from "../components/dashboard/TodayPlanSection";
import DeadlineSection from "../components/dashboard/DeadlineSection";
import TaskOverviewSection from "../components/dashboard/TaskOverviewSection";
import FocusSessionCard from "../components/dashboard/FocusSessionCard";
import AnalyticsSection from "../components/dashboard/AnalyticsSection";
import GoalsSection from "../components/dashboard/GoalsSection";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import EmptyStateCard from "../components/dashboard/EmptyStateCard";
import useAuth from "../hook/useAuth.js";
import { getDashboardStats } from "../services/dashboardService.js";


export default function DashboardPage() {
  const [stats, setStats] = useState([])
  const [isStatsLoading, setIsStatsLoading] = useState(true)

  const now = new Date();
  const currentHour = now.getHours();
  const greetings = ["Good Morning", "Good Afternoon", "Good Evening"];
  const greeting = currentHour < 12 ? greetings[0] : currentHour < 18 ? greetings[1] : greetings[2];
  const formattedDate = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const { user, isLoading } = useAuth();

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getDashboardStats()
        setStats(data)
      }
      catch (error) {
        console.error("Error fetching dashboard stats:", error)
      } finally {
        setIsStatsLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <section className="space-y-6">
      <DashboardHeader
        greeting={greeting}
        userName={user?.name || "User"}
        dateLabel={formattedDate}
        onQuickAction={() => { }}
        quickActionLabel="+ Add Task"
      />

      {isStatsLoading ? (
        <div className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
          <p className="text-sm text-text-secondary">Loading dashboard stats...</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              helperText={stat.helperText}
              trend={stat.trend}
            />
          ))}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <TodayPlanSection />
        <DeadlineSection />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <TaskOverviewSection />
        <FocusSessionCard />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <AnalyticsSection />
        <GoalsSection />
      </div>

      <ActivityFeed />

      <EmptyStateCard
        title="No extra items right now"
        description="This space is ready for future dashboard content or a smarter empty-state view."
      />

      {isLoading ? (
        <p className="text-sm text-text-secondary">Loading your profile...</p>
      ) : null}
    </section>
  );
}
