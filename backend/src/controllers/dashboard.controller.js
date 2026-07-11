/*
File Purpose:
Expose dashboard summary data for the authenticated user.

Connected With:
- backend/src/services/dashboard.service.js
- backend/src/routes/dashboard.routes.js
*/
import { getDashboardStatsService } from "../services/dashboard.service.js";

export async function getDashboardStats(req, res) {
  try {
    const userId = req.user.userId;
    const dashboardData = await getDashboardStatsService(userId);

    return res.status(200).json({
      success: true,
      ...dashboardData,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}
