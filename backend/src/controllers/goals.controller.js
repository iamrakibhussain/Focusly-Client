import { createGoalService, getGoalsService, updateGoalService, deleteGoalService } from "../services/goals.service.js";

export async function createGoal(req, res) {
    try {
        const userId = req.user.userId;
        const { title, targetAmount, unit, type, endDate } = req.body;

        if (!title || !targetAmount) {
            return res.status(400).json({
                success: false,
                message: "Title and target amount are required"
            });
        }

        const validTypes = ["DAILY", "WEEKLY", "MONTHLY", "CUSTOM"];
        if (type && !validTypes.includes(type)) {
            return res.status(400).json({ success: false, message: "Invalid goal type" });
        }

        const goal = await createGoalService({
            title,
            targetAmount: parseInt(targetAmount, 10),
            unit: unit || "units",
            type: type || "DAILY",
            endDate: endDate ? new Date(endDate) : null,
            userId,
        });

        return res.status(201).json({
            success: true,
            message: "Goal created successfully!",
            goal
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export async function getGoals(req, res) {
    try {
        const userId = req.user.userId;
        const goals = await getGoalsService(userId);
        return res.status(200).json({
            success: true,
            goals
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export async function updateGoal(req, res) {
    try {
        const userId = req.user.userId;
        const { id } = req.params;
        const { title, targetAmount, currentProgress, unit, type, endDate, isCompleted } = req.body;

        const validTypes = ["DAILY", "WEEKLY", "MONTHLY", "CUSTOM"];
        if (type && !validTypes.includes(type)) {
            return res.status(400).json({ success: false, message: "Invalid goal type" });
        }

        const updatedGoal = await updateGoalService(id, userId, {
            title,
            targetAmount: targetAmount !== undefined ? parseInt(targetAmount, 10) : undefined,
            currentProgress: currentProgress !== undefined ? parseInt(currentProgress, 10) : undefined,
            unit,
            type,
            endDate: endDate ? new Date(endDate) : undefined,
            isCompleted
        });

        return res.status(200).json({
            success: true,
            message: "Goal updated successfully!",
            goal: updatedGoal,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
}

export async function deleteGoal(req, res) {
    try {
        const userId = req.user.userId;
        const { id } = req.params;

        await deleteGoalService(id, userId);

        return res.status(200).json({
            success: true,
            message: "Goal deleted successfully!",
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
}
