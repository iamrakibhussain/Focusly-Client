/*
File Purpose:
Route guard for protected pages using shared auth state.

Connected With:
- frontend/src/hook/useAuth.js
- frontend/src/routes/AppRoutes.jsx
*/
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hook/useAuth.js";

export default function ProtectedRoute() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-text-secondary">
        Checking authentication...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
