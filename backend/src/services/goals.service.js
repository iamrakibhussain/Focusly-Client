import prisma from "../lib/prisma.js";

export async function createGoalService(data) {
    return await prisma.goal.create({ data });
}

export async function getGoalsService(userId) {
    return await prisma.goal.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" }
    });
}

export async function updateGoalService(id, userId, data) {
    const existingGoal = await prisma.goal.findFirst({
        where: { id, userId }
    });

    if (!existingGoal) {
        const error = new Error("Goal not found");
        error.statusCode = 404;
        throw error;
    }

    // Auto complete if progress reaches target
    if (data.currentProgress !== undefined) {
        const targetAmount = data.targetAmount || existingGoal.targetAmount;
        data.isCompleted = data.currentProgress >= targetAmount;
    }

    return await prisma.goal.update({
        where: { id },
        data
    });
}

export async function deleteGoalService(id, userId) {
    const existingGoal = await prisma.goal.findFirst({
        where: { id, userId }
    });

    if (!existingGoal) {
        const error = new Error("Goal not found");
        error.statusCode = 404;
        throw error;
    }

    return await prisma.goal.delete({
        where: { id }
    });
}
