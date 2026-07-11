/*
File Purpose:
Application route map. Separates public and protected navigation.

Connected With:
- frontend/src/layouts/PublicLayout.jsx
- frontend/src/layouts/DashboardLayout.jsx
- frontend/src/components/ProtectedRoute.jsx
*/
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import TasksPage from "../pages/TasksPage";
import PlannerPage from "../pages/PlannerPage";
import GoalsPage from "../pages/GoalsPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import SettingsPage from "../pages/SettingsPage";
import DashboardLayout from "../layouts/DashboardLayout";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import PublicLayout from "../layouts/PublicLayout";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="planner" element={<PlannerPage />} />
          <Route path="goals" element={<GoalsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
