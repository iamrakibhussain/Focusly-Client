import prisma from "../lib/prisma.js";


export async function createTaskService(data) {
    return await prisma.task.create({ data })
}


export async function getTasksService(userId) {
    return await prisma.task.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" }
    })
}

export async function updateTaskService(id, userId, data) {
    const existingTask = await prisma.task.findFirst({
        where: { id, userId }
    })

    if (!existingTask) {
        const error = new Error("Task not found")
        error.statusCode = 404
        throw error
    }

    return await prisma.task.update({
        where: { id },
        data
    })
}

export async function deleteTaskService(id, userId) {
    const existingTask = await prisma.task.findFirst({
        where: { id, userId }
    })

    if (!existingTask) {
        const error = new Error("Task not found")
        error.statusCode = 404
        throw error
    }

    return await prisma.task.delete({
        where: { id }
    })
}
