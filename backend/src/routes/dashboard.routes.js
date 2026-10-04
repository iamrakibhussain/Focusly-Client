/*
File Purpose:
Dashboard API route definitions.

Connected With:
- backend/src/controllers/dashboard.controller.js
- backend/src/middlewares/auth.middleware.js
*/
import express from "express";
import { tokenVerifyLogic } from "../middlewares/auth.middleware.js";
import { getDashboardStats, getDashboardSummary, saveFocusSession } from "../controllers/dashboard.controller.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/stats", tokenVerifyLogic, getDashboardStats);
dashboardRouter.get("/summary", tokenVerifyLogic, getDashboardSummary);
dashboardRouter.post("/focus-session", tokenVerifyLogic, saveFocusSession);

export default dashboardRouter;
