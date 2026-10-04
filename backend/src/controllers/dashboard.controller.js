/*
File Purpose:
Expose dashboard summary data for the authenticated user.

Connected With:
- backend/src/services/dashboard.service.js
- backend/src/routes/dashboard.routes.js
*/
import { getDashboardStatsService, getDashboardSummaryService, saveFocusSessionService } from "../services/dashboard.service.js";

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

export async function getDashboardSummary(req, res) {
  try {
    const userId = req.user.userId;
    const summaryData = await getDashboardSummaryService(userId);

    return res.status(200).json({
      success: true,
      data: summaryData,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}

export async function saveFocusSession(req, res) {
  try {
    const userId = req.user.userId;
    const { duration } = req.body;
    if (!duration) return res.status(400).json({ success: false, message: 'Duration is required' });
    const session = await saveFocusSessionService(userId, duration);
    return res.status(201).json({ success: true, data: session });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, message: error.message || 'Internal server error' });
  }
}
