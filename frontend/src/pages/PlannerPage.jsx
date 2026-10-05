/*
File Purpose:
Planner page composition. Shows schedule navigation, daily plan, and future placeholders.

Connected With:
- frontend/src/components/planner/*

Current Role:
- Page structure only; calendar and session data will be connected later.
*/
import { useEffect, useState, useMemo, useCallback } from "react";
import PlannerHeader from "../components/planner/PlannerHeader";
import WeekNavigator from "../components/planner/WeekNavigator";
import TodaySchedule from "../components/planner/TodaySchedule";
import PlannerCalendar from "../components/planner/PlannerCalendar";
import UpcomingSessions from "../components/planner/UpcomingSessions";
import PlannerQuickActions from "../components/planner/PlannerQuickActions";
import TaskModal from "../components/tasks/TaskModal";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function PlannerPage() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });
  
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    today.setDate(1);
    today.setHours(0, 0, 0, 0);
    return today;
  });

  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const fetchPlannerData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch data for the currently viewed month (plus a buffer of 7 days before and after for grid overflow)
      const start = new Date(currentMonth);
      start.setDate(start.getDate() - 7);
      
      const end = new Date(currentMonth);
      end.setMonth(end.getMonth() + 1);
      end.setDate(end.getDate() + 7);

      const response = await fetch(`${API_BASE_URL}/api/planner?startDate=${start.toISOString()}&endDate=${end.toISOString()}`, {
        credentials: "include"
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch planner data");
      }
      
      const result = await response.json();
      setTasks(result.data?.tasks || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [currentMonth]);

  useEffect(() => {
    fetchPlannerData();
  }, [fetchPlannerData]);

  // Derived state: Tasks for the selected date
  const selectedDateTasks = useMemo(() => {
    return tasks.filter(task => {
      if (!task.deadline) return false;
      const deadline = new Date(task.deadline);
      return (
        deadline.getDate() === selectedDate.getDate() &&
        deadline.getMonth() === selectedDate.getMonth() &&
        deadline.getFullYear() === selectedDate.getFullYear()
      );
    });
  }, [tasks, selectedDate]);

  return (
    <section className="space-y-6 sm:space-y-8 relative pb-10">
      <PlannerHeader />

      {error && (
        <div className="rounded-panel border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-200">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Week Nav & Today's Schedule */}
        <div className="space-y-6 lg:col-span-7 xl:col-span-8">
          <WeekNavigator 
            selectedDate={selectedDate} 
            onChangeDate={setSelectedDate} 
          />
          <TodaySchedule 
            selectedDate={selectedDate} 
            tasks={selectedDateTasks} 
            isLoading={isLoading} 
          />
        </div>

        {/* Right Column: Mini Calendar & Quick Actions */}
        <div className="space-y-6 lg:col-span-5 xl:col-span-4">
          <PlannerCalendar 
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
            selectedDate={selectedDate}
            onChangeDate={setSelectedDate}
            tasks={tasks}
          />
          <PlannerQuickActions 
            selectedDate={selectedDate} 
            onOpenTaskModal={() => setIsTaskModalOpen(true)}
          />
        </div>
      </div>
      
      {/* Full width bottom section */}
      <div className="mt-8">
        <UpcomingSessions tasks={tasks} selectedDate={selectedDate} />
      </div>

      <TaskModal 
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSuccess={fetchPlannerData}
        initialData={{ deadline: selectedDate.toISOString().slice(0, 10) }}
      />
    </section>
  );
}
