import { getPlannerDataService } from "../services/planner.service.js";

export async function getPlannerData(req, res) {
    try {
        const userId = req.user.userId;
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: "startDate and endDate are required query parameters"
            });
        }

        // Validate date formats
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format. Use ISO strings."
            });
        }

        const data = await getPlannerDataService(userId, start, end);

        return res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
