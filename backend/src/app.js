import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";

import authRouter from './routes/auth.routes.js'
import taskRouter from './routes/task.routes.js'
import dashboardRouter from './routes/dashboard.routes.js'
import plannerRouter from './routes/planner.routes.js'
import goalsRouter from './routes/goals.routes.js'
import analyticsRouter from './routes/analytics.routes.js'
import settingsRouter from './routes/settings.routes.js'

import { xssSanitizer } from "./middlewares/xss.middleware.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Security Middlewares
app.use(helmet()); 
app.use(hpp()); 

// Global Rate Limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { success: false, message: "Too many requests, please try again later." }
});
app.use("/api/", globalLimiter);

app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials: true,
}))
app.use(cookieParser());
app.use(express.json({ limit: "10kb" })); 

// Data Sanitization against XSS
app.use(xssSanitizer);

app.use("/api/auth", authRouter)
app.use("/api/tasks", taskRouter)
app.use("/api/dashboard", dashboardRouter)
app.use("/api/planner", plannerRouter)
app.use("/api/goals", goalsRouter)
app.use("/api/analytics", analyticsRouter)
app.use("/api/settings", settingsRouter)

app.get("/", (req, res) => {
  res.send("Hello from Focusly Server!");
});

// Global Error Handler (Should be the last middleware)
app.use(globalErrorHandler);

export default app;
