/*
File Purpose:
Frontend API layer for dashboard summary data.

Connected With:
- frontend/src/pages/DashboardPage.jsx later
*/
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function getDashboardStats() {
  const response = await fetch(`${API_BASE_URL}/api/dashboard/stats`, {
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch dashboard stats.");
  }

  return result.stats || [];
}
