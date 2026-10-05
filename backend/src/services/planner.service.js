import prisma from "../lib/prisma.js";

export async function getPlannerDataService(userId, startDate, endDate) {
    // Fetch tasks that have a deadline within the requested date range
    const tasks = await prisma.task.findMany({
        where: {
            userId,
            deadline: {
                gte: new Date(startDate),
                lte: new Date(endDate)
            }
        },
        orderBy: {
            deadline: "asc"
        }
    });

    // We can also fetch completed tasks or focus sessions in this date range if needed
    // For now, returning tasks scheduled in this range.
    
    return {
        tasks
    };
}
