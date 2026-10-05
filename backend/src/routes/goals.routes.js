import express from "express";
import { tokenVerifyLogic } from "../middlewares/auth.middleware.js";
import { createGoal, getGoals, updateGoal, deleteGoal } from "../controllers/goals.controller.js";

const goalsRouter = express.Router();

goalsRouter.post("/", tokenVerifyLogic, createGoal);
goalsRouter.get("/", tokenVerifyLogic, getGoals);
goalsRouter.put("/:id", tokenVerifyLogic, updateGoal);
goalsRouter.delete("/:id", tokenVerifyLogic, deleteGoal);

export default goalsRouter;
