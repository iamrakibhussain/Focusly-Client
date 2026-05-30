import { Routes, Route } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import TasksPage from "../pages/TasksPage";
import PlannerPage from "../pages/PlannerPage";
import GoalsPage from "../pages/GoalsPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import SettingsPage from "../pages/SettingsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/planner" element={<PlannerPage />} />
      <Route path="/goals" element={<GoalsPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}
