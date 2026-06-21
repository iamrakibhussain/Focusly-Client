import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function ProtectedRoute() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
          credentials: "include",
        });

        if (!isMounted) return;

        setIsAuthenticated(response.ok);
      } catch {
        if (!isMounted) return;

        setIsAuthenticated(false);
      }

      if (!isMounted) return;

      if (isMounted) {
        setIsLoading(false);
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

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
