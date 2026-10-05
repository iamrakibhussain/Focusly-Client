import { getAnalyticsOverview } from "../services/analytics.service.js";

export const getAnalytics = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const timeframe = req.query.timeframe || 'all';

    const data = await getAnalyticsOverview(userId, timeframe);
    
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};
