import { createTaskService, getTasksService, updateTaskService, deleteTaskService } from "../services/task.service.js"

export async function createTask(req, res) {

    try {
        const userId = req.user.userId
        const { title, description, priority, dueDate, status } = req.body
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            })
        }
        const task = await createTaskService({
            title,
            description,
            priority,
            dueDate,
            status,
            userId,
        })
        return res.status(201).json({
            success: true,
            message: "Task created successfully!",
            task
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export async function getTasks(req, res) {
    try {
        const userId = req.user.userId
        const tasks = await getTasksService(userId)
        return res.status(200).json({
            success: true,
            tasks
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export async function updateTask(req, res) {
    try {
        const userId = req.user.userId
        const { id } = req.params
        const { title, description, priority, dueDate, status } = req.body

        const updatedTask = await updateTaskService(id, userId, {
            title,
            description,
            priority,
            dueDate,
            status,
        })

        return res.status(200).json({
            success: true,
            message: "Task updated successfully!",
            task: updatedTask,
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal server error",
        })
    }
}

export async function deleteTask(req, res) {
    try {
        const userId = req.user.userId
        const { id } = req.params

        await deleteTaskService(id, userId)

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully!",
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal server error",
        })
    }
}
