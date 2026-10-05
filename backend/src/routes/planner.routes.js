import { Router } from "express";
import { getPlannerData } from "../controllers/planner.controller.js";
import { tokenVerifyLogic } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(tokenVerifyLogic);

router.get("/", getPlannerData);

export default router;
