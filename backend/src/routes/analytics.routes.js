import express from "express";
import { tokenVerifyLogic } from "../middlewares/auth.middleware.js";
import { getAnalytics } from "../controllers/analytics.controller.js";

const router = express.Router();

router.use(tokenVerifyLogic); // Protect all routes

router.get("/", getAnalytics);

export default router;
