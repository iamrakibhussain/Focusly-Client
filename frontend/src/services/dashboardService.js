/*
File Purpose:
Frontend API layer for dashboard summary data.

Connected With:
- frontend/src/pages/DashboardPage.jsx
*/
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function getDashboardSummary() {
  const response = await fetch(`${API_BASE_URL}/api/dashboard/summary`, {
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch dashboard summary.");
  }

  return result.data || {};
}

export async function saveFocusSession(duration) {
  const response = await fetch(`${API_BASE_URL}/api/dashboard/focus-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ duration }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to save focus session.");
  }

  return result.data;
}
