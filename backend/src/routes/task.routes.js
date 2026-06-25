import express from "express"
import { tokenVerifyLogic } from "../middlewares/auth.middleware.js"
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/task.controller.js"

const taskRouter = express.Router()

taskRouter.post("/", tokenVerifyLogic, createTask)
taskRouter.get("/", tokenVerifyLogic, getTasks)
taskRouter.put("/:id", tokenVerifyLogic, updateTask)
taskRouter.delete("/:id", tokenVerifyLogic, deleteTask)

export default taskRouter
